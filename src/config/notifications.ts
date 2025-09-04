import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configuración para expo-notifications
export const NOTIFICATIONS_CONFIG = {
  // Configuración básica
  basic: {
    enabled: true,
    version: '0.31.4',
    platform: {
      ios: {
        supported: true,
        minVersion: '12.0',
        requiresPermissions: true,
      },
      android: {
        supported: true,
        minVersion: '21',
        requiresPermissions: true,
      },
    },
  },

  // Configuración de comportamiento
  behavior: {
    // Comportamiento cuando la app está en primer plano
    foreground: {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    },

    // Comportamiento cuando la app está en segundo plano
    background: {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    },

    // Comportamiento cuando la app está cerrada
    killed: {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    },
  },

  // Configuración de tipos de notificaciones
  types: {
    // Notificaciones de energía
    energy: {
      // Alertas de consumo alto
      highConsumption: {
        title: 'Consumo Alto Detectado',
        body: 'Tu consumo de energía ha superado el umbral establecido',
        sound: 'default',
        priority: 'high',
        category: 'energy_alert',
        icon: '⚡',
        color: '#FF3B30',
        data: {
          type: 'high_consumption',
          action: 'view_dashboard',
        },
      },

      // Alertas de producción baja
      lowProduction: {
        title: 'Producción Baja',
        body: 'La producción de energía renovable está por debajo del esperado',
        sound: 'default',
        priority: 'high',
        category: 'energy_alert',
        icon: '🌞',
        color: '#FF9500',
        data: {
          type: 'low_production',
          action: 'view_production',
        },
      },

      // Mantenimiento programado
      maintenance: {
        title: 'Mantenimiento Programado',
        body: 'Se realizará mantenimiento en tu instalación de energía',
        sound: 'default',
        priority: 'normal',
        category: 'maintenance',
        icon: '🔧',
        color: '#007AFF',
        data: {
          type: 'maintenance',
          action: 'view_maintenance',
        },
      },

      // Fallos del sistema
      systemFailure: {
        title: 'Fallo del Sistema',
        body: 'Se ha detectado un fallo en tu instalación de energía',
        sound: 'alert',
        priority: 'high',
        category: 'system_alert',
        icon: '🚨',
        color: '#FF3B30',
        data: {
          type: 'system_failure',
          action: 'view_issues',
        },
      },

      // Eficiencia energética
      efficiency: {
        title: 'Mejora tu Eficiencia',
        body: 'Obtén consejos para mejorar tu eficiencia energética',
        sound: 'default',
        priority: 'normal',
        category: 'tips',
        icon: '💡',
        color: '#34C759',
        data: {
          type: 'efficiency_tip',
          action: 'view_tips',
        },
      },

      // Facturación
      billing: {
        title: 'Nueva Factura Disponible',
        body: 'Tu factura de energía está lista para revisar',
        sound: 'default',
        priority: 'normal',
        category: 'billing',
        icon: '📄',
        color: '#5856D6',
        data: {
          type: 'billing',
          action: 'view_bill',
        },
      },

      // Ofertas y promociones
      offers: {
        title: 'Oferta Especial',
        body: 'Descubre nuestras mejores ofertas en energía renovable',
        sound: 'default',
        priority: 'low',
        category: 'offers',
        icon: '🎉',
        color: '#FF2D92',
        data: {
          type: 'offer',
          action: 'view_offers',
        },
      },

      // Eventos y webinars
      events: {
        title: 'Evento Próximo',
        body: 'No te pierdas nuestro próximo evento sobre energía sostenible',
        sound: 'default',
        priority: 'normal',
        category: 'events',
        icon: '📅',
        color: '#AF52DE',
        data: {
          type: 'event',
          action: 'view_event',
        },
      },
    },

    // Notificaciones del sistema
    system: {
      // Actualizaciones de la app
      appUpdate: {
        title: 'Actualización Disponible',
        body: 'Una nueva versión de la aplicación está disponible',
        sound: 'default',
        priority: 'normal',
        category: 'system',
        icon: '🔄',
        color: '#007AFF',
        data: {
          type: 'app_update',
          action: 'update_app',
        },
      },

      // Mantenimiento del servidor
      serverMaintenance: {
        title: 'Mantenimiento del Servidor',
        body: 'El servidor estará en mantenimiento programado',
        sound: 'default',
        priority: 'normal',
        category: 'system',
        icon: '🛠️',
        color: '#FF9500',
        data: {
          type: 'server_maintenance',
          action: 'view_status',
        },
      },

      // Errores del sistema
      systemError: {
        title: 'Error del Sistema',
        body: 'Se ha producido un error en el sistema',
        sound: 'alert',
        priority: 'high',
        category: 'system',
        icon: '⚠️',
        color: '#FF3B30',
        data: {
          type: 'system_error',
          action: 'report_error',
        },
      },
    },

    // Notificaciones de seguridad
    security: {
      // Inicio de sesión sospechoso
      suspiciousLogin: {
        title: 'Inicio de Sesión Sospechoso',
        body: 'Se detectó un inicio de sesión desde una ubicación inusual',
        sound: 'alert',
        priority: 'high',
        category: 'security',
        icon: '🔒',
        color: '#FF3B30',
        data: {
          type: 'suspicious_login',
          action: 'review_login',
        },
      },

      // Cambio de contraseña
      passwordChange: {
        title: 'Contraseña Cambiada',
        body: 'Tu contraseña ha sido cambiada exitosamente',
        sound: 'default',
        priority: 'normal',
        category: 'security',
        icon: '🔐',
        color: '#34C759',
        data: {
          type: 'password_change',
          action: 'confirm_change',
        },
      },

      // Verificación de dos factores
      twoFactorAuth: {
        title: 'Verificación Requerida',
        body: 'Ingresa el código de verificación para completar el inicio de sesión',
        sound: 'default',
        priority: 'high',
        category: 'security',
        icon: '🔑',
        color: '#007AFF',
        data: {
          type: 'two_factor_auth',
          action: 'verify_code',
        },
      },
    },
  },

  // Configuración de categorías
  categories: {
    // Categoría de alertas de energía
    energy_alert: {
      identifier: 'energy_alert',
      actions: [
        {
          identifier: 'view_dashboard',
          buttonTitle: 'Ver Dashboard',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'dismiss',
          buttonTitle: 'Descartar',
          options: {
            isDestructive: true,
            isAuthenticationRequired: false,
          },
        },
      ],
    },

    // Categoría de mantenimiento
    maintenance: {
      identifier: 'maintenance',
      actions: [
        {
          identifier: 'view_maintenance',
          buttonTitle: 'Ver Detalles',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'reschedule',
          buttonTitle: 'Reprogramar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
      ],
    },

    // Categoría de alertas del sistema
    system_alert: {
      identifier: 'system_alert',
      actions: [
        {
          identifier: 'view_issues',
          buttonTitle: 'Ver Problemas',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'contact_support',
          buttonTitle: 'Contactar Soporte',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
      ],
    },

    // Categoría de consejos
    tips: {
      identifier: 'tips',
      actions: [
        {
          identifier: 'view_tips',
          buttonTitle: 'Ver Consejos',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'save_tip',
          buttonTitle: 'Guardar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
      ],
    },

    // Categoría de facturación
    billing: {
      identifier: 'billing',
      actions: [
        {
          identifier: 'view_bill',
          buttonTitle: 'Ver Factura',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
        {
          identifier: 'download_bill',
          buttonTitle: 'Descargar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
      ],
    },

    // Categoría de ofertas
    offers: {
      identifier: 'offers',
      actions: [
        {
          identifier: 'view_offers',
          buttonTitle: 'Ver Ofertas',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'claim_offer',
          buttonTitle: 'Reclamar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
      ],
    },

    // Categoría de eventos
    events: {
      identifier: 'events',
      actions: [
        {
          identifier: 'view_event',
          buttonTitle: 'Ver Evento',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'register_event',
          buttonTitle: 'Registrarse',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
      ],
    },

    // Categoría del sistema
    system: {
      identifier: 'system',
      actions: [
        {
          identifier: 'update_app',
          buttonTitle: 'Actualizar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'view_status',
          buttonTitle: 'Ver Estado',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
      ],
    },

    // Categoría de seguridad
    security: {
      identifier: 'security',
      actions: [
        {
          identifier: 'review_login',
          buttonTitle: 'Revisar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
        {
          identifier: 'confirm_change',
          buttonTitle: 'Confirmar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
        {
          identifier: 'verify_code',
          buttonTitle: 'Verificar',
          options: {
            isDestructive: false,
            isAuthenticationRequired: true,
          },
        },
      ],
    },
  },

  // Configuración de programación
  scheduling: {
    // Configuración de notificaciones recurrentes
    recurring: {
      // Notificación diaria de consumo
      dailyConsumption: {
        title: 'Resumen Diario',
        body: 'Revisa tu consumo de energía del día',
        trigger: {
          hour: 20,
          minute: 0,
          repeats: true,
        },
        data: {
          type: 'daily_summary',
          action: 'view_summary',
        },
      },

      // Notificación semanal de eficiencia
      weeklyEfficiency: {
        title: 'Consejo Semanal',
        body: 'Descubre cómo mejorar tu eficiencia energética',
        trigger: {
          weekday: 1, // Lunes
          hour: 9,
          minute: 0,
          repeats: true,
        },
        data: {
          type: 'weekly_tip',
          action: 'view_tip',
        },
      },

      // Notificación mensual de facturación
      monthlyBilling: {
        title: 'Factura Mensual',
        body: 'Tu factura de energía está lista',
        trigger: {
          day: 1,
          hour: 8,
          minute: 0,
          repeats: true,
        },
        data: {
          type: 'monthly_bill',
          action: 'view_bill',
        },
      },
    },

    // Configuración de notificaciones basadas en eventos
    eventBased: {
      // Umbral de consumo alto
      highConsumptionThreshold: {
        title: 'Consumo Alto',
        body: 'Has superado el 80% de tu consumo promedio',
        data: {
          type: 'consumption_threshold',
          action: 'view_consumption',
        },
      },

      // Caída de producción
      productionDrop: {
        title: 'Producción Baja',
        body: 'La producción ha caído un 20%',
        data: {
          type: 'production_drop',
          action: 'view_production',
        },
      },

      // Mantenimiento próximo
      maintenanceReminder: {
        title: 'Mantenimiento Próximo',
        body: 'El mantenimiento programado está a 24 horas',
        data: {
          type: 'maintenance_reminder',
          action: 'view_maintenance',
        },
      },
    },
  },

  // Configuración de permisos
  permissions: {
    // Configuración de permisos por plataforma
    ios: {
      alert: true,
      badge: true,
      sound: true,
      criticalAlert: false,
      provisional: false,
      announcement: false,
    },

    android: {
      alert: true,
      badge: true,
      sound: true,
      vibrate: true,
      priority: 'high',
    },
  },

  // Configuración de tokens
  tokens: {
    // Configuración de tokens push
    push: {
      // Configuración de FCM (Firebase Cloud Messaging)
      fcm: {
        enabled: true,
        projectId: process.env.FCM_PROJECT_ID || '',
        apiKey: process.env.FCM_API_KEY || '',
        senderId: process.env.FCM_SENDER_ID || '',
      },

      // Configuración de APNS (Apple Push Notification Service)
      apns: {
        enabled: Platform.OS === 'ios',
        keyId: process.env.APNS_KEY_ID || '',
        teamId: process.env.APNS_TEAM_ID || '',
        bundleId: process.env.APNS_BUNDLE_ID || '',
      },
    },

    // Configuración de almacenamiento de tokens
    storage: {
      enabled: true,
      key: 'push_notification_token',
      expiration: 30 * 24 * 60 * 60 * 1000, // 30 días
    },
  },

  // Configuración de analytics
  analytics: {
    enabled: true,
    events: {
      notificationReceived: 'notification_received',
      notificationOpened: 'notification_opened',
      notificationDismissed: 'notification_dismissed',
      permissionGranted: 'notification_permission_granted',
      permissionDenied: 'notification_permission_denied',
      tokenGenerated: 'notification_token_generated',
      tokenRefreshed: 'notification_token_refreshed',
    },
  },

  // Configuración de accesibilidad
  accessibility: {
    enabled: true,
    features: {
      screenReader: true,
      voiceOver: true,
      talkBack: true,
      highContrast: true,
      largeText: true,
    },
    announcements: {
      notificationReceived: 'Notificación recibida',
      notificationOpened: 'Notificación abierta',
      permissionGranted: 'Permisos de notificación concedidos',
      permissionDenied: 'Permisos de notificación denegados',
    },
  },

  // Configuración de debugging
  debugging: {
    enabled: false,
    features: {
      logNotifications: false,
      logTokens: false,
      logPermissions: false,
      logScheduling: false,
    },
    logging: {
      level: 'error', // 'debug' | 'info' | 'warn' | 'error'
      includeTimestamps: true,
      includeStackTraces: false,
    },
  },
};

// Configuraciones específicas por plataforma
export const PLATFORM_NOTIFICATIONS_CONFIG = {
  ios: {
    ...NOTIFICATIONS_CONFIG,
    permissions: {
      ...NOTIFICATIONS_CONFIG.permissions,
      ios: {
        ...NOTIFICATIONS_CONFIG.permissions.ios,
        criticalAlert: false,
        provisional: false,
        announcement: false,
      },
    },
    behavior: {
      ...NOTIFICATIONS_CONFIG.behavior,
      foreground: {
        ...NOTIFICATIONS_CONFIG.behavior.foreground,
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      },
    },
  },
  android: {
    ...NOTIFICATIONS_CONFIG,
    permissions: {
      ...NOTIFICATIONS_CONFIG.permissions,
      android: {
        ...NOTIFICATIONS_CONFIG.permissions.android,
        priority: 'high',
        vibrate: true,
      },
    },
    behavior: {
      ...NOTIFICATIONS_CONFIG.behavior,
      foreground: {
        ...NOTIFICATIONS_CONFIG.behavior.foreground,
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      },
    },
  },
};

// Función para obtener configuración según plataforma
export const getPlatformNotificationsConfig = () => {
  return PLATFORM_NOTIFICATIONS_CONFIG[Platform.OS] || NOTIFICATIONS_CONFIG;
};

// Función para obtener configuración completa
export const getCompleteNotificationsConfig = () => {
  return getPlatformNotificationsConfig();
};

// Exportar configuración por defecto
export const notificationsConfig = getCompleteNotificationsConfig();

// Configurar comportamiento por defecto de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: notificationsConfig.behavior.foreground.shouldShowAlert,
    shouldPlaySound: notificationsConfig.behavior.foreground.shouldPlaySound,
    shouldSetBadge: notificationsConfig.behavior.foreground.shouldSetBadge,
  }),
});
