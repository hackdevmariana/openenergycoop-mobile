import { useNavigation as useRNNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAppStore } from '../stores/appStore';
import { NavigationParams, AppRoutes } from '../types/navigation';

// Hook principal para navegación
export const useNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigate = useCallback((routeName: AppRoutes, params?: NavigationParams) => {
    navigation.navigate(routeName as never, params as never);
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  const push = useCallback((routeName: AppRoutes, params?: NavigationParams) => {
    navigation.push(routeName as never, params as never);
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  const replace = useCallback((routeName: AppRoutes, params?: NavigationParams) => {
    navigation.replace(routeName as never, params as never);
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const reset = useCallback((routeName: AppRoutes, params?: NavigationParams) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName as never, params: params as never }],
    });
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  return {
    navigate,
    push,
    replace,
    goBack,
    reset,
    canGoBack: navigation.canGoBack(),
  };
};

// Hook para obtener parámetros de la ruta actual
export const useRouteParams = <T = any>() => {
  const route = useRoute();
  return route.params as T;
};

// Hook para navegación específica por pestañas
export const useTabNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigateToTab = useCallback((tabName: string, params?: NavigationParams) => {
    navigation.navigate(tabName as never, params as never);
    addNavigationHistory(tabName as AppRoutes, params);
  }, [navigation, addNavigationHistory]);

  return {
    navigateToTab,
  };
};

// Hook para navegación con animaciones personalizadas
export const useAnimatedNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigateWithAnimation = useCallback((
    routeName: AppRoutes, 
    params?: NavigationParams,
    _animation?: 'slide' | 'fade' | 'none'
  ) => {
    navigation.navigate(routeName as never, params as never);
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  return {
    navigateWithAnimation,
  };
};

// Hook para navegación con confirmación
export const useConfirmNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigateWithConfirmation = useCallback((
    routeName: AppRoutes,
    params?: NavigationParams,
    confirmMessage?: string
  ) => {
    if (confirmMessage) {
      // Aquí podrías mostrar un modal de confirmación
      console.log(`Confirmando navegación a ${routeName}: ${confirmMessage}`);
    }
    
    navigation.navigate(routeName as never, params as never);
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  return {
    navigateWithConfirmation,
  };
};

// Hook para navegación con persistencia
export const usePersistentNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory, saveNavigationState } = useAppStore();

  const navigateAndPersist = useCallback(async (
    routeName: AppRoutes,
    params?: NavigationParams
  ) => {
    navigation.navigate(routeName as never, params as never);
    addNavigationHistory(routeName, params);
    
    // Guardar estado de navegación
    await saveNavigationState();
  }, [navigation, addNavigationHistory, saveNavigationState]);

  return {
    navigateAndPersist,
  };
};

// Hook para navegación con métricas
export const useMetricsNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory, addNavigationMetric } = useAppStore();

  const navigateWithMetrics = useCallback((
    routeName: AppRoutes,
    params?: NavigationParams,
    metricData?: any
  ) => {
    const startTime = Date.now();
    
    navigation.navigate(routeName as never, params as never);
    addNavigationHistory(routeName, params);
    
    // Registrar métrica de navegación
    if (metricData) {
      addNavigationMetric({
        routeName,
        duration: Date.now() - startTime,
        ...metricData,
      });
    }
  }, [navigation, addNavigationHistory, addNavigationMetric]);

  return {
    navigateWithMetrics,
  };
};

// Hook para navegación con validación
export const useValidatedNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory, isRouteAccessible } = useAppStore();

  const navigateWithValidation = useCallback((
    routeName: AppRoutes,
    params?: NavigationParams
  ) => {
    // Validar si la ruta es accesible
    if (isRouteAccessible(routeName)) {
      navigation.navigate(routeName as never, params as never);
      addNavigationHistory(routeName, params);
    } else {
      console.warn(`Ruta ${routeName} no es accesible`);
      // Aquí podrías mostrar un mensaje de error o redirigir
    }
  }, [navigation, addNavigationHistory, isRouteAccessible]);

  return {
    navigateWithValidation,
  };
};

// Hook para navegación con deep linking
export const useDeepLinkNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigateWithDeepLink = useCallback((
    deepLink: string,
    params?: NavigationParams
  ) => {
    // Procesar deep link y navegar
    console.log(`Procesando deep link: ${deepLink}`);
    
    // Aquí podrías parsear el deep link y extraer la ruta
    const routeName = deepLink.split('/')[1] as AppRoutes;
    
    if (routeName) {
      navigation.navigate(routeName as never, params as never);
      addNavigationHistory(routeName, params);
    }
  }, [navigation, addNavigationHistory]);

  return {
    navigateWithDeepLink,
  };
};

// Hook para navegación con estado de carga
export const useLoadingNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory, setNavigationLoading } = useAppStore();

  const navigateWithLoading = useCallback(async (
    routeName: AppRoutes,
    params?: NavigationParams,
    loadingMessage?: string
  ) => {
    setNavigationLoading(true, loadingMessage);
    
    try {
      // Simular carga si es necesario
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigation.navigate(routeName as never, params as never);
      addNavigationHistory(routeName, params);
    } finally {
      setNavigationLoading(false);
    }
  }, [navigation, addNavigationHistory, setNavigationLoading]);

  return {
    navigateWithLoading,
  };
};
