import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { notificationsConfig, getPlatformNotificationsConfig } from '../config/notifications';
import { usePostHogAnalytics } from './usePostHogAnalytics';
import { storageService } from '../services/storage';

// Tipos para el hook de notificaciones
export interface NotificationData {
  type: string;
  action: string;
  [key: string]: any;
}

export interface NotificationConfig {
  title: string;
  body: string;
  sound?: 'default' | 'alert' | null;
  priority?: 'default' | 'normal' | 'high';
  category?: string;
  icon?: string;
  color?: string;
  data?: NotificationData;
}

export interface ScheduledNotification {
  id: string;
  title: string;
  body: string;
  trigger: Notifications.NotificationTriggerInput;
  data?: NotificationData;
}

export interface NotificationPermission {
  granted: boolean;
  canAskAgain: boolean;
  status: Notifications.PermissionStatus;
}

export const useNotifications = () => {
  // Estado del hook
  const [notificationState, setNotificationState] = useState({
    isInitialized: false,
    isLoading: false,
    error: null as string | null,
    permission: null as NotificationPermission | null,
    token: null as string | null,
    lastNotification: null as Notifications.Notification | null,
    scheduledNotifications: [] as ScheduledNotification[],
  });

  // Referencias
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  // Hooks
  const { trackUserAction } = usePostHogAnalytics();

  // Configuración
  const config = useMemo(() => {
    return getPlatformNotificationsConfig();
  }, []);

  // Función para solicitar permisos
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      setNotificationState(prev => ({ ...prev, isLoading: true }));

      const { status, canAskAgain } = await Notifications.requestPermissionsAsync({
        ios: config.permissions.ios,
        android: config.permissions.android,
      });

      const permission: NotificationPermission = {
        granted: status === 'granted',
        canAskAgain,
        status,
      };

      setNotificationState(prev => ({ 
        ...prev, 
        permission,
        isLoading: false 
      }));

      if (permission.granted) {
        trackUserAction(config.analytics.events.permissionGranted);
        await generateToken();
      } else {
        trackUserAction(config.analytics.events.permissionDenied);
      }

      return permission.granted;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      setNotificationState(prev => ({ 
        ...prev, 
        error: 'Error al solicitar permisos de notificación',
        isLoading: false 
      }));
      return false;
    }
  }, [config, trackUserAction]);

  // Función para verificar permisos
  const checkPermissions = useCallback(async (): Promise<NotificationPermission> => {
    try {
      const { status, canAskAgain } = await Notifications.getPermissionsAsync();

      const permission: NotificationPermission = {
        granted: status === 'granted',
        canAskAgain,
        status,
      };

      setNotificationState(prev => ({ ...prev, permission }));
      return permission;
    } catch (error) {
      console.error('Error checking notification permissions:', error);
      throw error;
    }
  }, []);

  // Función para generar token
  const generateToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: config.tokens.push.fcm.projectId,
      });

      setNotificationState(prev => ({ ...prev, token: token.data }));
      
      // Guardar token en almacenamiento
      if (config.tokens.storage.enabled) {
        await storageService.setItem(config.tokens.storage.key, {
          token: token.data,
          timestamp: Date.now(),
        });
      }

      trackUserAction(config.analytics.events.tokenGenerated, { token: token.data });
      return token.data;
    } catch (error) {
      console.error('Error generating push token:', error);
      return null;
    }
  }, [config, trackUserAction]);

  // Función para enviar notificación local
  const sendLocalNotification = useCallback(async (
    notificationConfig: NotificationConfig
  ): Promise<string> => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationConfig.title,
          body: notificationConfig.body,
          sound: notificationConfig.sound,
          priority: notificationConfig.priority,
          categoryIdentifier: notificationConfig.category,
          data: notificationConfig.data,
        },
        trigger: null, // Enviar inmediatamente
      });

      trackUserAction(config.analytics.events.notificationReceived, {
        type: notificationConfig.data?.type,
        action: notificationConfig.data?.action,
      });

      return notificationId;
    } catch (error) {
      console.error('Error sending local notification:', error);
      throw error;
    }
  }, [config, trackUserAction]);

  // Función para programar notificación
  const scheduleNotification = useCallback(async (
    notificationConfig: NotificationConfig,
    trigger: Notifications.NotificationTriggerInput
  ): Promise<string> => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationConfig.title,
          body: notificationConfig.body,
          sound: notificationConfig.sound,
          priority: notificationConfig.priority,
          categoryIdentifier: notificationConfig.category,
          data: notificationConfig.data,
        },
        trigger,
      });

      const scheduledNotification: ScheduledNotification = {
        id: notificationId,
        title: notificationConfig.title,
        body: notificationConfig.body,
        trigger,
        data: notificationConfig.data,
      };

      setNotificationState(prev => ({
        ...prev,
        scheduledNotifications: [...prev.scheduledNotifications, scheduledNotification],
      }));

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      throw error;
    }
  }, []);

  // Función para cancelar notificación programada
  const cancelScheduledNotification = useCallback(async (notificationId: string): Promise<void> => {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);

      setNotificationState(prev => ({
        ...prev,
        scheduledNotifications: prev.scheduledNotifications.filter(
          notification => notification.id !== notificationId
        ),
      }));
    } catch (error) {
      console.error('Error canceling scheduled notification:', error);
      throw error;
    }
  }, []);

  // Función para cancelar todas las notificaciones programadas
  const cancelAllScheduledNotifications = useCallback(async (): Promise<void> => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();

      setNotificationState(prev => ({
        ...prev,
        scheduledNotifications: [],
      }));
    } catch (error) {
      console.error('Error canceling all scheduled notifications:', error);
      throw error;
    }
  }, []);

  // Función para obtener notificaciones programadas
  const getScheduledNotifications = useCallback(async (): Promise<ScheduledNotification[]> => {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      
      const scheduledNotifications: ScheduledNotification[] = notifications.map(notification => ({
        id: notification.identifier,
        title: notification.content.title || '',
        body: notification.content.body || '',
        trigger: notification.trigger,
        data: notification.content.data as NotificationData,
      }));

      setNotificationState(prev => ({
        ...prev,
        scheduledNotifications,
      }));

      return scheduledNotifications;
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      throw error;
    }
  }, []);

  // Función para enviar notificación de energía
  const sendEnergyNotification = useCallback(async (
    type: keyof typeof config.types.energy,
    customData?: Partial<NotificationData>
  ): Promise<string> => {
    const notificationConfig = config.types.energy[type];
    
    if (!notificationConfig) {
      throw new Error(`Tipo de notificación de energía no válido: ${type}`);
    }

    const data: NotificationData = {
      ...notificationConfig.data,
      ...customData,
    };

    return await sendLocalNotification({
      ...notificationConfig,
      data,
    });
  }, [config, sendLocalNotification]);

  // Función para enviar notificación del sistema
  const sendSystemNotification = useCallback(async (
    type: keyof typeof config.types.system,
    customData?: Partial<NotificationData>
  ): Promise<string> => {
    const notificationConfig = config.types.system[type];
    
    if (!notificationConfig) {
      throw new Error(`Tipo de notificación del sistema no válido: ${type}`);
    }

    const data: NotificationData = {
      ...notificationConfig.data,
      ...customData,
    };

    return await sendLocalNotification({
      ...notificationConfig,
      data,
    });
  }, [config, sendLocalNotification]);

  // Función para enviar notificación de seguridad
  const sendSecurityNotification = useCallback(async (
    type: keyof typeof config.types.security,
    customData?: Partial<NotificationData>
  ): Promise<string> => {
    const notificationConfig = config.types.security[type];
    
    if (!notificationConfig) {
      throw new Error(`Tipo de notificación de seguridad no válido: ${type}`);
    }

    const data: NotificationData = {
      ...notificationConfig.data,
      ...customData,
    };

    return await sendLocalNotification({
      ...notificationConfig,
      data,
    });
  }, [config, sendLocalNotification]);

  // Función para programar notificación recurrente
  const scheduleRecurringNotification = useCallback(async (
    type: keyof typeof config.scheduling.recurring,
    customData?: Partial<NotificationData>
  ): Promise<string> => {
    const notificationConfig = config.scheduling.recurring[type];
    
    if (!notificationConfig) {
      throw new Error(`Tipo de notificación recurrente no válido: ${type}`);
    }

    const data: NotificationData = {
      ...notificationConfig.data,
      ...customData,
    };

    return await scheduleNotification(
      {
        title: notificationConfig.title,
        body: notificationConfig.body,
        data,
      },
      notificationConfig.trigger
    );
  }, [config, scheduleNotification]);

  // Función para manejar respuesta de notificación
  const handleNotificationResponse = useCallback((response: Notifications.NotificationResponse) => {
    const { notification, actionIdentifier } = response;
    
    setNotificationState(prev => ({ ...prev, lastNotification: notification }));

    const data = notification.request.content.data as NotificationData;
    
    trackUserAction(config.analytics.events.notificationOpened, {
      type: data?.type,
      action: data?.action,
      actionIdentifier,
    });

    // Manejar acciones específicas
    if (data?.action) {
      switch (data.action) {
        case 'view_dashboard':
          // Navegar al dashboard
          break;
        case 'view_production':
          // Navegar a producción
          break;
        case 'view_maintenance':
          // Navegar a mantenimiento
          break;
        case 'view_issues':
          // Navegar a problemas
          break;
        case 'view_tips':
          // Navegar a consejos
          break;
        case 'view_bill':
          // Navegar a factura
          break;
        case 'view_offers':
          // Navegar a ofertas
          break;
        case 'view_event':
          // Navegar a evento
          break;
        case 'update_app':
          // Actualizar app
          break;
        case 'view_status':
          // Ver estado
          break;
        case 'report_error':
          // Reportar error
          break;
        case 'review_login':
          // Revisar login
          break;
        case 'confirm_change':
          // Confirmar cambio
          break;
        case 'verify_code':
          // Verificar código
          break;
        default:
          console.log('Acción de notificación no manejada:', data.action);
      }
    }
  }, [config, trackUserAction]);

  // Función para manejar notificación recibida
  const handleNotificationReceived = useCallback((notification: Notifications.Notification) => {
    setNotificationState(prev => ({ ...prev, lastNotification: notification }));

    const data = notification.request.content.data as NotificationData;
    
    trackUserAction(config.analytics.events.notificationReceived, {
      type: data?.type,
      action: data?.action,
    });

    // Mostrar alerta si está en primer plano
    if (notification.request.content.title) {
      Alert.alert(
        notification.request.content.title,
        notification.request.content.body,
        [
          {
            text: 'Ver',
            onPress: () => handleNotificationResponse({
              notification,
              actionIdentifier: 'default',
            }),
          },
          {
            text: 'Descartar',
            style: 'cancel',
            onPress: () => {
              trackUserAction(config.analytics.events.notificationDismissed, {
                type: data?.type,
                action: data?.action,
              });
            },
          },
        ]
      );
    }
  }, [config, trackUserAction, handleNotificationResponse]);

  // Función para configurar categorías
  const setupCategories = useCallback(async (): Promise<void> => {
    try {
      const categories = Object.values(config.categories).map(category => ({
        identifier: category.identifier,
        actions: category.actions,
      }));

      await Notifications.setNotificationCategoryAsync(categories);
    } catch (error) {
      console.error('Error setting up notification categories:', error);
    }
  }, [config]);

  // Función para inicializar notificaciones
  const initializeNotifications = useCallback(async (): Promise<void> => {
    try {
      setNotificationState(prev => ({ ...prev, isLoading: true }));

      // Verificar permisos
      const permission = await checkPermissions();

      if (!permission.granted) {
        const granted = await requestPermissions();
        if (!granted) {
          setNotificationState(prev => ({ 
            ...prev, 
            isLoading: false,
            error: 'Permisos de notificación denegados'
          }));
          return;
        }
      }

      // Configurar categorías
      await setupCategories();

      // Obtener token
      await generateToken();

      // Obtener notificaciones programadas
      await getScheduledNotifications();

      setNotificationState(prev => ({ 
        ...prev, 
        isInitialized: true,
        isLoading: false 
      }));
    } catch (error) {
      console.error('Error initializing notifications:', error);
      setNotificationState(prev => ({ 
        ...prev, 
        error: 'Error al inicializar notificaciones',
        isLoading: false 
      }));
    }
  }, [checkPermissions, requestPermissions, setupCategories, generateToken, getScheduledNotifications]);

  // Función para limpiar listeners
  const cleanup = useCallback(() => {
    if (notificationListener.current) {
      notificationListener.current.remove();
    }
    if (responseListener.current) {
      responseListener.current.remove();
    }
  }, []);

  // Efecto para configurar listeners
  useEffect(() => {
    // Listener para notificaciones recibidas
    notificationListener.current = Notifications.addNotificationReceivedListener(
      handleNotificationReceived
    );

    // Listener para respuestas de notificaciones
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    // Inicializar notificaciones
    initializeNotifications();

    // Cleanup al desmontar
    return cleanup;
  }, [handleNotificationReceived, handleNotificationResponse, initializeNotifications, cleanup]);

  return {
    // Estado
    notificationState,
    
    // Configuración
    config,
    
    // Funciones de permisos
    requestPermissions,
    checkPermissions,
    
    // Funciones de tokens
    generateToken,
    
    // Funciones de notificaciones
    sendLocalNotification,
    scheduleNotification,
    cancelScheduledNotification,
    cancelAllScheduledNotifications,
    getScheduledNotifications,
    
    // Funciones específicas por tipo
    sendEnergyNotification,
    sendSystemNotification,
    sendSecurityNotification,
    scheduleRecurringNotification,
    
    // Funciones de configuración
    setupCategories,
    initializeNotifications,
    
    // Función de limpieza
    cleanup,
  };
};
