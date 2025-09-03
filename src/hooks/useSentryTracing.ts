import { useCallback, useEffect, useRef } from 'react';
import * as Sentry from '@sentry/react-native';
import { useAppStore } from '../stores/appStore';

// Hook para tracing de componentes
export const useComponentTracing = (componentName: string) => {
  const transactionRef = useRef<Sentry.Transaction | null>(null);
  const { currentTheme, language } = useAppStore();

  useEffect(() => {
    // Iniciar transacción al montar el componente
    transactionRef.current = Sentry.startTransaction({
      name: `${componentName} Mount`,
      op: 'ui.component',
    });

    // Agregar contexto del componente
    transactionRef.current.setContext('component', {
      name: componentName,
      theme: currentTheme,
      language,
    });

    // Agregar breadcrumb
    Sentry.addBreadcrumb({
      message: `Componente ${componentName} montado`,
      category: 'component',
      level: 'info',
      data: {
        componentName,
        theme: currentTheme,
        language,
      },
    });

    return () => {
      // Finalizar transacción al desmontar
      if (transactionRef.current) {
        transactionRef.current.setStatus('ok');
        transactionRef.current.finish();
      }
    };
  }, [componentName, currentTheme, language]);

  // Función para agregar spans al componente
  const addSpan = useCallback((name: string, operation: string, data?: any) => {
    if (transactionRef.current) {
      const span = transactionRef.current.startChild({
        op: operation,
        description: name,
      });

      if (data) {
        span.setData('data', data);
      }

      return span;
    }
    return null;
  }, []);

  // Función para finalizar span
  const finishSpan = useCallback((span: Sentry.Span | null, status: 'ok' | 'error' = 'ok') => {
    if (span) {
      span.setStatus(status);
      span.finish();
    }
  }, []);

  return {
    addSpan,
    finishSpan,
    transaction: transactionRef.current,
  };
};

// Hook para tracing de operaciones asíncronas
export const useAsyncTracing = () => {
  const { currentTheme, language } = useAppStore();

  const traceAsync = useCallback(async <T>(
    name: string,
    operation: string,
    fn: () => Promise<T>,
    context?: any
  ): Promise<T> => {
    const transaction = Sentry.startTransaction({
      name,
      op: operation,
    });

    // Agregar contexto
    transaction.setContext('operation', {
      name,
      operation,
      theme: currentTheme,
      language,
      ...context,
    });

    try {
      // Agregar breadcrumb de inicio
      Sentry.addBreadcrumb({
        message: `Iniciando operación: ${name}`,
        category: 'operation',
        level: 'info',
        data: {
          operation,
          context,
        },
      });

      const result = await fn();

      // Agregar breadcrumb de éxito
      Sentry.addBreadcrumb({
        message: `Operación completada: ${name}`,
        category: 'operation',
        level: 'info',
        data: {
          operation,
          status: 'success',
        },
      });

      transaction.setStatus('ok');
      return result;
    } catch (error) {
      // Agregar breadcrumb de error
      Sentry.addBreadcrumb({
        message: `Error en operación: ${name}`,
        category: 'operation',
        level: 'error',
        data: {
          operation,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      transaction.setStatus('internal_error');
      throw error;
    } finally {
      transaction.finish();
    }
  }, [currentTheme, language]);

  return {
    traceAsync,
  };
};

// Hook para tracing de navegación
export const useNavigationTracing = () => {
  const navigationTransactionRef = useRef<Sentry.Transaction | null>(null);

  const startNavigationTrace = useCallback((routeName: string, params?: any) => {
    // Finalizar transacción anterior si existe
    if (navigationTransactionRef.current) {
      navigationTransactionRef.current.setStatus('ok');
      navigationTransactionRef.current.finish();
    }

    // Iniciar nueva transacción de navegación
    navigationTransactionRef.current = Sentry.startTransaction({
      name: `Navigation to ${routeName}`,
      op: 'navigation',
    });

    // Agregar contexto de navegación
    navigationTransactionRef.current.setContext('navigation', {
      route: routeName,
      params,
      timestamp: new Date().toISOString(),
    });

    // Agregar breadcrumb
    Sentry.addBreadcrumb({
      message: `Navegación iniciada: ${routeName}`,
      category: 'navigation',
      level: 'info',
      data: {
        route: routeName,
        params,
      },
    });

    return navigationTransactionRef.current;
  }, []);

  const finishNavigationTrace = useCallback((status: 'ok' | 'error' = 'ok') => {
    if (navigationTransactionRef.current) {
      navigationTransactionRef.current.setStatus(status);
      navigationTransactionRef.current.finish();
      navigationTransactionRef.current = null;
    }
  }, []);

  return {
    startNavigationTrace,
    finishNavigationTrace,
    currentTransaction: navigationTransactionRef.current,
  };
};

// Hook para tracing de rendimiento
export const usePerformanceTracing = () => {
  const { currentTheme, language } = useAppStore();

  const tracePerformance = useCallback(async <T>(
    name: string,
    operation: string,
    fn: () => Promise<T>,
    performanceContext?: any
  ): Promise<T> => {
    const transaction = Sentry.startTransaction({
      name,
      op: operation,
    });

    // Agregar contexto de rendimiento
    transaction.setContext('performance', {
      name,
      operation,
      theme: currentTheme,
      language,
      ...performanceContext,
    });

    const startTime = performance.now();

    try {
      const result = await fn();
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Agregar métricas de rendimiento
      transaction.setMeasurement('duration', duration, 'millisecond');

      // Agregar breadcrumb con métricas
      Sentry.addBreadcrumb({
        message: `Operación de rendimiento completada: ${name}`,
        category: 'performance',
        level: 'info',
        data: {
          operation,
          duration,
          startTime,
          endTime,
        },
      });

      transaction.setStatus('ok');
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Agregar métricas de error
      transaction.setMeasurement('duration', duration, 'millisecond');
      transaction.setMeasurement('error', 1, 'none');

      // Agregar breadcrumb de error
      Sentry.addBreadcrumb({
        message: `Error en operación de rendimiento: ${name}`,
        category: 'performance',
        level: 'error',
        data: {
          operation,
          duration,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      transaction.setStatus('internal_error');
      throw error;
    } finally {
      transaction.finish();
    }
  }, [currentTheme, language]);

  return {
    tracePerformance,
  };
};

// Hook para tracing de errores con contexto
export const useErrorTracing = () => {
  const { currentTheme, language } = useAppStore();

  const traceError = useCallback((error: Error, context?: any) => {
    const transaction = Sentry.startTransaction({
      name: `Error: ${error.name}`,
      op: 'error',
    });

    // Agregar contexto del error
    transaction.setContext('error', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      theme: currentTheme,
      language,
      ...context,
    });

    // Agregar breadcrumb del error
    Sentry.addBreadcrumb({
      message: `Error capturado: ${error.message}`,
      category: 'error',
      level: 'error',
      data: {
        errorName: error.name,
        errorMessage: error.message,
        context,
      },
    });

    // Capturar la excepción
    Sentry.captureException(error, {
      contexts: {
        error_tracing: {
          theme: currentTheme,
          language,
          ...context,
        },
      },
    });

    transaction.setStatus('internal_error');
    transaction.finish();
  }, [currentTheme, language]);

  return {
    traceError,
  };
};

// Hook para tracing de métricas personalizadas
export const useMetricsTracing = () => {
  const { currentTheme, language } = useAppStore();

  const traceMetric = useCallback((
    name: string,
    value: number,
    unit: string,
    context?: any
  ) => {
    const transaction = Sentry.startTransaction({
      name: `Metric: ${name}`,
      op: 'metric',
    });

    // Agregar medición
    transaction.setMeasurement(name, value, unit);

    // Agregar contexto
    transaction.setContext('metric', {
      name,
      value,
      unit,
      theme: currentTheme,
      language,
      ...context,
    });

    // Agregar breadcrumb
    Sentry.addBreadcrumb({
      message: `Métrica registrada: ${name} = ${value} ${unit}`,
      category: 'metric',
      level: 'info',
      data: {
        name,
        value,
        unit,
        context,
      },
    });

    transaction.setStatus('ok');
    transaction.finish();
  }, [currentTheme, language]);

  return {
    traceMetric,
  };
};

// Hook para tracing de eventos de usuario
export const useUserEventTracing = () => {
  const { currentTheme, language } = useAppStore();

  const traceUserEvent = useCallback((
    eventName: string,
    eventData?: any,
    userId?: string
  ) => {
    const transaction = Sentry.startTransaction({
      name: `User Event: ${eventName}`,
      op: 'user.event',
    });

    // Agregar contexto del evento
    transaction.setContext('user_event', {
      eventName,
      eventData,
      userId,
      theme: currentTheme,
      language,
      timestamp: new Date().toISOString(),
    });

    // Agregar breadcrumb
    Sentry.addBreadcrumb({
      message: `Evento de usuario: ${eventName}`,
      category: 'user_event',
      level: 'info',
      data: {
        eventName,
        eventData,
        userId,
      },
    });

    // Establecer usuario si se proporciona
    if (userId) {
      Sentry.setUser({ id: userId });
    }

    transaction.setStatus('ok');
    transaction.finish();
  }, [currentTheme, language]);

  return {
    traceUserEvent,
  };
};
