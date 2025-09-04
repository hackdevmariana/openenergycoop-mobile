# Expo Notifications - Guía Completa

## 📋 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración del Sistema](#configuración-del-sistema)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General
**Expo Notifications** es una biblioteca que proporciona una API unificada para manejar notificaciones push y locales en aplicaciones React Native. Permite enviar notificaciones inmediatas, programadas y recurrentes con soporte completo para iOS y Android.

## 🔧 Instalación y Configuración

### 1. Instalación
```bash
npm install expo-notifications
```

### 2. Configuración de Plataforma
- **iOS**: Requiere configuración de APNS
- **Android**: Requiere configuración de FCM

## ⚙️ Configuración del Sistema

### Archivo: `src/config/notifications.ts`
Configuración centralizada para expo-notifications:

```typescript
export const NOTIFICATIONS_CONFIG = {
  basic: {
    enabled: true,
    version: '0.31.4',
  },
  behavior: {
    foreground: {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    },
  },
  types: {
    energy: {
      highConsumption: {
        title: 'Consumo Alto Detectado',
        body: 'Tu consumo de energía ha superado el umbral',
        sound: 'default',
        priority: 'high',
        category: 'energy_alert',
        icon: '⚡',
        color: '#FF3B30',
      },
      // ... más tipos
    },
  },
  categories: {
    energy_alert: {
      identifier: 'energy_alert',
      actions: [
        {
          identifier: 'view_dashboard',
          buttonTitle: 'Ver Dashboard',
          options: { isDestructive: false },
        },
      ],
    },
  },
  scheduling: {
    recurring: {
      dailyConsumption: {
        title: 'Resumen Diario',
        body: 'Revisa tu consumo de energía del día',
        trigger: { hour: 20, minute: 0, repeats: true },
      },
    },
  },
  permissions: {
    ios: { alert: true, badge: true, sound: true },
    android: { alert: true, badge: true, sound: true },
  },
};
```

## 🎣 Hook Personalizado

### Archivo: `src/hooks/useNotifications.ts`
Hook personalizado para manejar notificaciones:

```typescript
export const useNotifications = () => {
  const [notificationState, setNotificationState] = useState({
    isInitialized: false,
    permission: null,
    token: null,
    scheduledNotifications: [],
  });

  // Funciones principales
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }, []);

  const sendLocalNotification = useCallback(async (
    notificationConfig: NotificationConfig
  ): Promise<string> => {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationConfig.title,
        body: notificationConfig.body,
        sound: notificationConfig.sound,
        data: notificationConfig.data,
      },
      trigger: null,
    });
  }, []);

  const scheduleNotification = useCallback(async (
    notificationConfig: NotificationConfig,
    trigger: Notifications.NotificationTriggerInput
  ): Promise<string> => {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationConfig.title,
        body: notificationConfig.body,
        data: notificationConfig.data,
      },
      trigger,
    });
  }, []);

  return {
    notificationState,
    requestPermissions,
    sendLocalNotification,
    scheduleNotification,
    // ... más funciones
  };
};
```

## 🎨 Componente de Demostración

### Archivo: `src/components/NotificationsDemo.tsx`
Componente de demostración completo con 5 tipos de demo:

1. **Básico**: Permisos, tokens, notificaciones de prueba
2. **Energía**: Notificaciones específicas del sector energético
3. **Sistema**: Notificaciones del sistema y la aplicación
4. **Seguridad**: Notificaciones de seguridad de la cuenta
5. **Programación**: Notificaciones programadas y recurrentes

## 🎯 Casos de Uso

### 1. Notificación Inmediata
```typescript
const { sendLocalNotification } = useNotifications();

await sendLocalNotification({
  title: 'Alerta de Consumo',
  body: 'Has superado tu límite de consumo',
  sound: 'default',
  data: { type: 'consumption_alert' },
});
```

### 2. Notificación Programada
```typescript
const { scheduleNotification } = useNotifications();

await scheduleNotification(
  {
    title: 'Recordatorio',
    body: 'Revisa tu consumo de energía',
  },
  {
    type: 'timeInterval',
    seconds: 3600, // 1 hora
  }
);
```

### 3. Notificación Recurrente
```typescript
const { scheduleRecurringNotification } = useNotifications();

await scheduleRecurringNotification('dailyConsumption');
```

### 4. Notificación de Energía
```typescript
const { sendEnergyNotification } = useNotifications();

await sendEnergyNotification('highConsumption', {
  consumption: 150,
  threshold: 100,
});
```

## 🚀 Mejores Prácticas

### 1. Permisos
- Solicitar permisos al inicio de la app
- Manejar casos donde se denieguen permisos
- Proporcionar explicación clara del uso

### 2. Categorías
- Usar categorías para organizar notificaciones
- Proporcionar acciones relevantes
- Manejar respuestas de usuario

### 3. Programación
- Usar triggers apropiados para cada caso
- Evitar programar demasiadas notificaciones
- Limpiar notificaciones obsoletas

### 4. Analytics
- Trackear eventos de notificaciones
- Medir engagement con notificaciones
- Optimizar basado en datos

## 🔧 Solución de Problemas

### 1. Permisos Denegados
```typescript
const permission = await checkPermissions();
if (!permission.granted && permission.canAskAgain) {
  // Mostrar explicación antes de solicitar
  await requestPermissions();
}
```

### 2. Token No Generado
```typescript
const token = await generateToken();
if (!token) {
  // Verificar configuración de proyecto
  console.error('Error generating token');
}
```

### 3. Notificaciones No Recibidas
```typescript
// Verificar configuración de comportamiento
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

## 📚 Recursos Adicionales

- [Documentación oficial de expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Guía de configuración de APNS](https://docs.expo.dev/push-notifications/sending-notifications/)
- [Guía de configuración de FCM](https://docs.expo.dev/push-notifications/sending-notifications/)

## 🎉 Conclusión

Expo Notifications proporciona una solución robusta y completa para implementar notificaciones en aplicaciones React Native. Con la configuración adecuada y el hook personalizado, puedes crear experiencias de usuario ricas y funcionales para aplicaciones que requieren notificaciones push y locales.

La integración con el sistema de temas, analytics y accesibilidad asegura que las notificaciones se integren perfectamente con el resto de la aplicación OpenEnergyCoop Mobile.
