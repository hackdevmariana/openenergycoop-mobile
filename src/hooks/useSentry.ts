import { useCallback, useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import {
  captureException,
  captureMessage,
  setSentryUser,
  setSentryContext,
  setSentryTag,
  addBreadcrumb,
  startTransaction,
  configureScope,
  clearSentryContext,
  isSentryEnabled,
} from '../config/sentry';

// Hook principal para Sentry
export const useSentry = () => {
  const { currentTheme, language, isOnline } = useAppStore();

  // Configurar contexto automáticamente
  useEffect(() => {
    if (isSentryEnabled()) {
      configureScope((scope) => {
        scope.setContext('app', {
          theme: currentTheme,
          language,
          isOnline,
        });
        
        scope.setTag('theme', currentTheme);
        scope.setTag('language', language);
        scope.setTag('online', isOnline.toString());
      });
    }
  }, [currentTheme, language, isOnline]);

  // Función para capturar errores
  const captureError = useCallback((error: Error, context?: any) => {
    captureException(error, context);
  }, []);

  // Función para capturar mensajes
  const captureInfo = useCallback((message: string, context?: any) => {
    captureMessage(message, 'info');
    if (context) {
      setSentryContext('info', context);
    }
  }, []);

  // Función para capturar warnings
  const captureWarning = useCallback((message: string, context?: any) => {
    captureMessage(message, 'warning');
    if (context) {
      setSentryContext('warning', context);
    }
  }, []);

  // Función para establecer usuario
  const setUser = useCallback((user: { id: string; email?: string; username?: string }) => {
    setSentryUser(user);
  }, []);

  // Función para agregar contexto
  const setContext = useCallback((name: string, data: any) => {
    setSentryContext(name, data);
  }, []);

  // Función para agregar tags
  const setTag = useCallback((key: string, value: string) => {
    setSentryTag(key, value);
  }, []);

  // Función para agregar breadcrumbs
  const addBreadcrumb = useCallback((message: string, category: string, data?: any) => {
    addBreadcrumb({
      message,
      category,
      data,
      level: 'info',
    });
  }, []);

  // Función para iniciar transacción
  const startTransaction = useCallback((name: string, operation: string) => {
    return startTransaction(name, operation);
  }, []);

  // Función para limpiar contexto
  const clearContext = useCallback(() => {
    clearSentryContext();
  }, []);

  return {
    captureError,
    captureInfo,
    captureWarning,
    setUser,
    setContext,
    setTag,
    addBreadcrumb,
    startTransaction,
    clearContext,
    isEnabled: isSentryEnabled(),
  };
};

// Hook para monitoreo de navegación
export const useSentryNavigation = () => {
  const { addBreadcrumb, setTag } = useSentry();

  const trackNavigation = useCallback((routeName: string, params?: any) => {
    addBreadcrumb(`Navegación a ${routeName}`, 'navigation', {
      route: routeName,
      params,
      timestamp: new Date().toISOString(),
    });

    setTag('current_route', routeName);
  }, [addBreadcrumb, setTag]);

  const trackScreenView = useCallback((screenName: string) => {
    addBreadcrumb(`Vista de pantalla: ${screenName}`, 'screen', {
      screen: screenName,
      timestamp: new Date().toISOString(),
    });
  }, [addBreadcrumb]);

  return {
    trackNavigation,
    trackScreenView,
  };
};

// Hook para monitoreo de API
export const useSentryAPI = () => {
  const { captureError, addBreadcrumb, startTransaction } = useSentry();

  const trackAPICall = useCallback(async (
    url: string,
    method: string,
    apiCall: () => Promise<any>
  ) => {
    const transaction = startTransaction(`API ${method} ${url}`, 'http.request');
    
    try {
      addBreadcrumb(`Iniciando llamada API: ${method} ${url}`, 'api', {
        url,
        method,
        timestamp: new Date().toISOString(),
      });

      const result = await apiCall();

      addBreadcrumb(`API exitosa: ${method} ${url}`, 'api', {
        url,
        method,
        status: 'success',
        timestamp: new Date().toISOString(),
      });

      transaction.setStatus('ok');
      return result;
    } catch (error) {
      addBreadcrumb(`Error en API: ${method} ${url}`, 'api', {
        url,
        method,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });

      captureError(error instanceof Error ? error : new Error('API Error'), {
        url,
        method,
        type: 'api_error',
      });

      transaction.setStatus('internal_error');
      throw error;
    } finally {
      transaction.finish();
    }
  }, [captureError, addBreadcrumb, startTransaction]);

  return {
    trackAPICall,
  };
};

// Hook para monitoreo de errores de React
export const useSentryErrorBoundary = () => {
  const { captureError, setContext } = useSentry();

  const handleError = useCallback((error: Error, errorInfo: any) => {
    setContext('error_boundary', {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    captureError(error, {
      type: 'react_error_boundary',
      componentStack: errorInfo.componentStack,
    });
  }, [captureError, setContext]);

  return {
    handleError,
  };
};

// Hook para monitoreo de rendimiento
export const useSentryPerformance = () => {
  const { startTransaction, addBreadcrumb } = useSentry();

  const trackOperation = useCallback(async <T>(
    name: string,
    operation: string,
    fn: () => Promise<T>
  ): Promise<T> => {
    const transaction = startTransaction(name, operation);
    
    try {
      addBreadcrumb(`Iniciando operación: ${name}`, 'performance', {
        operation,
        timestamp: new Date().toISOString(),
      });

      const result = await fn();

      addBreadcrumb(`Operación completada: ${name}`, 'performance', {
        operation,
        status: 'success',
        timestamp: new Date().toISOString(),
      });

      transaction.setStatus('ok');
      return result;
    } catch (error) {
      addBreadcrumb(`Error en operación: ${name}`, 'performance', {
        operation,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });

      transaction.setStatus('internal_error');
      throw error;
    } finally {
      transaction.finish();
    }
  }, [startTransaction, addBreadcrumb]);

  return {
    trackOperation,
  };
};

// Hook para monitoreo de eventos de usuario
export const useSentryUserEvents = () => {
  const { addBreadcrumb, setTag } = useSentry();

  const trackUserAction = useCallback((action: string, data?: any) => {
    addBreadcrumb(`Acción de usuario: ${action}`, 'user_action', {
      action,
      data,
      timestamp: new Date().toISOString(),
    });

    setTag('last_user_action', action);
  }, [addBreadcrumb, setTag]);

  const trackUserFlow = useCallback((flow: string, step: string, data?: any) => {
    addBreadcrumb(`Flujo de usuario: ${flow} - ${step}`, 'user_flow', {
      flow,
      step,
      data,
      timestamp: new Date().toISOString(),
    });

    setTag('current_flow', flow);
    setTag('current_step', step);
  }, [addBreadcrumb, setTag]);

  return {
    trackUserAction,
    trackUserFlow,
  };
};
