import * as Sentry from '@sentry/react-native';
import { Platform } from 'react-native';

// Configuración de Sentry
export const initSentry = () => {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN_HERE', // Reemplazar con tu DSN real
    
    // Configuración básica
    debug: __DEV__, // Habilitar debug solo en desarrollo
    environment: __DEV__ ? 'development' : 'production',
    release: '1.0.0', // Versión de la app
    
    // Configuración de muestreo
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    profilesSampleRate: __DEV__ ? 1.0 : 0.1,
    
    // Configuración de breadcrumbs
    enableAutoSessionTracking: true,
    attachStacktrace: true,
    
    // Configuración de contexto
    beforeSend(event) {
      // Filtrar eventos sensibles
      if (event.request?.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['Authorization'];
      }
      return event;
    },
    
    // Configuración de integraciones
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: ['localhost', 'your-api-domain.com'],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    
    // Configuración específica por plataforma
    ...(Platform.OS === 'android' && {
      enableNativeCrashHandling: true,
    }),
    
    // Configuración de errores
    ignoreErrors: [
      // Errores que queremos ignorar
      'Network request failed',
      'Timeout',
    ],
    
    // Configuración de contexto adicional
    initialScope: {
      tags: {
        platform: Platform.OS,
        version: '1.0.0',
      },
      user: {
        id: 'anonymous',
      },
    },
  });
};

// Función para establecer usuario
export const setSentryUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user);
};

// Función para agregar contexto
export const setSentryContext = (name: string, data: any) => {
  Sentry.setContext(name, data);
};

// Función para agregar tags
export const setSentryTag = (key: string, value: string) => {
  Sentry.setTag(key, value);
};

// Función para capturar errores manualmente
export const captureException = (error: Error, context?: any) => {
  if (context) {
    Sentry.withScope((scope) => {
      scope.setContext('additional', context);
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
};

// Función para capturar mensajes
export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  Sentry.captureMessage(message, level);
};

// Función para agregar breadcrumbs
export const addBreadcrumb = (breadcrumb: Sentry.Breadcrumb) => {
  Sentry.addBreadcrumb(breadcrumb);
};

// Función para iniciar transacción
export const startTransaction = (name: string, operation: string) => {
  return Sentry.startTransaction({
    name,
    op: operation,
  });
};

// Función para configurar scope
export const configureScope = (callback: (scope: Sentry.Scope) => void) => {
  Sentry.configureScope(callback);
};

// Función para limpiar contexto
export const clearSentryContext = () => {
  Sentry.setUser(null);
  Sentry.setContext('user', null);
  Sentry.setContext('app', null);
};

// Función para obtener el cliente de Sentry
export const getSentryClient = () => {
  return Sentry.getCurrentHub().getClient();
};

// Función para verificar si Sentry está habilitado
export const isSentryEnabled = () => {
  return Sentry.getCurrentHub().getClient() !== undefined;
};

// Configuración por defecto
export const defaultSentryConfig = {
  dsn: 'YOUR_SENTRY_DSN_HERE',
  environment: __DEV__ ? 'development' : 'production',
  release: '1.0.0',
  debug: __DEV__,
  tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  profilesSampleRate: __DEV__ ? 1.0 : 0.1,
  enableAutoSessionTracking: true,
  attachStacktrace: true,
};
