import { useCallback, useMemo, useEffect } from 'react';
import { enableScreens, Screen } from 'react-native-screens';
import { Platform, Dimensions } from 'react-native';
import { screensConfig } from '../config/screens';

// Habilitar React Native Screens
enableScreens(true);

// Hook principal para react-native-screens
export const useScreens = () => {
  // Información del dispositivo
  const deviceInfo = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const isLandscape = width > height;
    const minDimension = Math.min(width, height);
    
    // Determinar tamaño de pantalla
    let screenSize: 'small' | 'medium' | 'large';
    if (minDimension < 375) {
      screenSize = 'small';
    } else if (minDimension < 768) {
      screenSize = 'medium';
    } else {
      screenSize = 'large';
    }
    
    // Determinar orientación
    const orientation: 'portrait' | 'landscape' = isLandscape ? 'landscape' : 'portrait';
    
    return {
      width,
      height,
      isLandscape,
      minDimension,
      screenSize,
      orientation,
      platform: Platform.OS,
    };
  }, []);

  // Función para obtener configuración de pantalla
  const getScreenConfig = useCallback((
    screenName: keyof typeof screensConfig.screens,
    screenType?: keyof typeof screensConfig.screenTypeConfigs,
    orientation?: 'portrait' | 'landscape',
    screenSize?: 'small' | 'medium' | 'large'
  ) => {
    return screensConfig.getScreenConfig(
      screenName,
      screenType,
      orientation || deviceInfo.orientation,
      screenSize || deviceInfo.screenSize
    );
  }, [deviceInfo]);

  // Función para obtener configuración específica por plataforma
  const getPlatformScreenConfig = useCallback((
    screenName: keyof typeof screensConfig.screens,
    platform?: 'ios' | 'android'
  ) => {
    return screensConfig.getPlatformScreenConfig(screenName, platform);
  }, []);

  // Función para obtener configuración específica por tema
  const getThemeScreenConfig = useCallback((
    screenName: keyof typeof screensConfig.screens,
    theme: 'light' | 'dark'
  ) => {
    return screensConfig.getThemeScreenConfig(screenName, theme);
  }, []);

  // Función para crear opciones de pantalla
  const createScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla principal
  const createMainScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, 'main');
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla de configuración
  const createSettingsScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, 'settings');
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla modal
  const createModalScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, 'modal');
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla de pantalla completa
  const createFullScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, 'fullScreen');
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla transparente
  const createTransparentScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, 'transparent');
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para obtener configuración de animación
  const getAnimationConfig = useCallback((
    animationType: keyof typeof screensConfig.animations.enter
  ) => {
    return screensConfig.animations.enter[animationType];
  }, []);

  // Función para obtener configuración de gestos
  const getGestureConfig = useCallback((
    gestureType: keyof typeof screensConfig.gestures.navigation.specific
  ) => {
    return screensConfig.gestures.navigation.specific[gestureType];
  }, []);

  // Función para obtener configuración de presentación
  const getPresentationConfig = useCallback((
    presentationType: keyof typeof screensConfig.presentation.card
  ) => {
    return screensConfig.presentation.card[presentationType];
  }, []);

  // Función para obtener configuración de accesibilidad
  const getAccessibilityConfig = useCallback(() => {
    const { screenSize } = deviceInfo;
    
    if (screenSize === 'large') {
      return screensConfig.accessibility.largeScreen;
    } else if (screenSize === 'small') {
      return screensConfig.accessibility.smallScreen;
    }
    
    return screensConfig.accessibility.reducedMotion;
  }, [deviceInfo]);

  // Función para obtener configuración de rendimiento
  const getPerformanceConfig = useCallback(() => {
    return screensConfig.performanceConfig;
  }, []);

  // Función para obtener configuración de monitoreo
  const getMonitoringConfig = useCallback(() => {
    return screensConfig.performance.monitoring;
  }, []);

  // Función para obtener configuración de optimización
  const getOptimizationConfig = useCallback(() => {
    return screensConfig.performance.optimization;
  }, []);

  // Función para obtener configuración de cache
  const getCacheConfig = useCallback(() => {
    return screensConfig.performance.optimization.cache;
  }, []);

  // Función para obtener configuración de preload
  const getPreloadConfig = useCallback(() => {
    return screensConfig.performance.optimization.preload;
  }, []);

  // Función para obtener configuración de lazy loading
  const getLazyLoadingConfig = useCallback(() => {
    return screensConfig.performance.optimization.lazyLoading;
  }, []);

  // Función para obtener configuración de memory management
  const getMemoryConfig = useCallback(() => {
    return screensConfig.performance.optimization.memory;
  }, []);

  // Función para obtener configuración de métricas
  const getMetricsConfig = useCallback(() => {
    return screensConfig.performance.monitoring.metrics;
  }, []);

  // Función para obtener configuración de logging
  const getLoggingConfig = useCallback(() => {
    return screensConfig.performance.monitoring.logging;
  }, []);

  // Función para obtener configuración de límites
  const getLimitsConfig = useCallback(() => {
    return screensConfig.performanceConfig.limits;
  }, []);

  // Función para obtener configuración de worklets
  const getWorkletsConfig = useCallback(() => {
    return screensConfig.performanceConfig.worklets;
  }, []);

  // Función para obtener configuración de optimizaciones
  const getOptimizationsConfig = useCallback(() => {
    return screensConfig.performanceConfig.optimizations;
  }, []);

  // Función para obtener configuración de cache
  const getCacheConfigBasic = useCallback(() => {
    return screensConfig.performanceConfig.cache;
  }, []);

  // Función para obtener configuración completa del dispositivo
  const getDeviceCompleteConfig = useCallback(() => {
    return {
      deviceInfo,
      screenConfigs: screensConfig.screens,
      animationConfigs: screensConfig.animations,
      gestureConfigs: screensConfig.gestures,
      presentationConfigs: screensConfig.presentation,
      accessibilityConfig: getAccessibilityConfig(),
      performanceConfig: getPerformanceConfig(),
      monitoringConfig: getMonitoringConfig(),
      optimizationConfig: getOptimizationConfig(),
      cacheConfig: getCacheConfig(),
      preloadConfig: getPreloadConfig(),
      lazyLoadingConfig: getLazyLoadingConfig(),
      memoryConfig: getMemoryConfig(),
      metricsConfig: getMetricsConfig(),
      loggingConfig: getLoggingConfig(),
      limitsConfig: getLimitsConfig(),
      workletsConfig: getWorkletsConfig(),
      optimizationsConfig: getOptimizationsConfig(),
      cacheConfigBasic: getCacheConfigBasic(),
    };
  }, [
    deviceInfo,
    getAccessibilityConfig,
    getPerformanceConfig,
    getMonitoringConfig,
    getOptimizationConfig,
    getCacheConfig,
    getPreloadConfig,
    getLazyLoadingConfig,
    getMemoryConfig,
    getMetricsConfig,
    getLoggingConfig,
    getLimitsConfig,
    getWorkletsConfig,
    getOptimizationsConfig,
    getCacheConfigBasic,
  ]);

  // Función para crear opciones de pantalla con tema
  const createThemedScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    theme: 'light' | 'dark',
    customOptions?: any
  ) => {
    const config = getThemeScreenConfig(screenName, theme);
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getThemeScreenConfig]);

  // Función para crear opciones de pantalla con plataforma
  const createPlatformScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    platform?: 'ios' | 'android',
    customOptions?: any
  ) => {
    const config = getPlatformScreenConfig(screenName, platform);
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getPlatformScreenConfig]);

  // Función para crear opciones de pantalla con orientación
  const createOrientationScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    orientation?: 'portrait' | 'landscape',
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, undefined, orientation);
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla con tamaño
  const createSizeScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    screenSize?: 'small' | 'medium' | 'large',
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName, undefined, undefined, screenSize);
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  // Función para crear opciones de pantalla con animación personalizada
  const createCustomAnimationOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    animationType: keyof typeof screensConfig.animations.enter,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    const animationConfig = getAnimationConfig(animationType);
    
    return {
      ...config.options,
      animation: animationType,
      ...animationConfig,
      ...customOptions,
    };
  }, [getScreenConfig, getAnimationConfig]);

  // Función para crear opciones de pantalla con gestos personalizados
  const createCustomGestureOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    gestureType: keyof typeof screensConfig.gestures.navigation.specific,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    const gestureConfig = getGestureConfig(gestureType);
    
    return {
      ...config.options,
      ...gestureConfig,
      ...customOptions,
    };
  }, [getScreenConfig, getGestureConfig]);

  // Función para crear opciones de pantalla con presentación personalizada
  const createCustomPresentationOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    presentationType: keyof typeof screensConfig.presentation.card,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    const presentationConfig = getPresentationConfig(presentationType);
    
    return {
      ...config.options,
      ...presentationConfig,
      ...customOptions,
    };
  }, [getScreenConfig, getPresentationConfig]);

  // Función para crear opciones de pantalla con accesibilidad
  const createAccessibilityScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    const accessibilityConfig = getAccessibilityConfig();
    
    return {
      ...config.options,
      ...accessibilityConfig,
      ...customOptions,
    };
  }, [getScreenConfig, getAccessibilityConfig]);

  // Función para crear opciones de pantalla con rendimiento optimizado
  const createPerformanceScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    const performanceConfig = getPerformanceConfig();
    
    return {
      ...config.options,
      ...performanceConfig,
      ...customOptions,
    };
  }, [getScreenConfig, getPerformanceConfig]);

  // Función para crear opciones de pantalla completas
  const createCompleteScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    options: {
      theme?: 'light' | 'dark';
      platform?: 'ios' | 'android';
      orientation?: 'portrait' | 'landscape';
      screenSize?: 'small' | 'medium' | 'large';
      animationType?: keyof typeof screensConfig.animations.enter;
      gestureType?: keyof typeof screensConfig.gestures.navigation.specific;
      presentationType?: keyof typeof screensConfig.presentation.card;
      accessibility?: boolean;
      performance?: boolean;
      customOptions?: any;
    } = {}
  ) => {
    const {
      theme,
      platform,
      orientation,
      screenSize,
      animationType,
      gestureType,
      presentationType,
      accessibility = false,
      performance = false,
      customOptions = {},
    } = options;

    let config = getScreenConfig(screenName, undefined, orientation, screenSize);

    if (theme) {
      const themeConfig = getThemeScreenConfig(screenName, theme);
      config = { ...config, options: { ...config.options, ...themeConfig.options } };
    }

    if (platform) {
      const platformConfig = getPlatformScreenConfig(screenName, platform);
      config = { ...config, options: { ...config.options, ...platformConfig.options } };
    }

    if (animationType) {
      const animationConfig = getAnimationConfig(animationType);
      config = { ...config, options: { ...config.options, animation: animationType, ...animationConfig } };
    }

    if (gestureType) {
      const gestureConfig = getGestureConfig(gestureType);
      config = { ...config, options: { ...config.options, ...gestureConfig } };
    }

    if (presentationType) {
      const presentationConfig = getPresentationConfig(presentationType);
      config = { ...config, options: { ...config.options, ...presentationConfig } };
    }

    if (accessibility) {
      const accessibilityConfig = getAccessibilityConfig();
      config = { ...config, options: { ...config.options, ...accessibilityConfig } };
    }

    if (performance) {
      const performanceConfig = getPerformanceConfig();
      config = { ...config, options: { ...config.options, ...performanceConfig } };
    }

    return {
      ...config.options,
      ...customOptions,
    };
  }, [
    getScreenConfig,
    getThemeScreenConfig,
    getPlatformScreenConfig,
    getAnimationConfig,
    getGestureConfig,
    getPresentationConfig,
    getAccessibilityConfig,
    getPerformanceConfig,
  ]);

  // Efecto para inicializar React Native Screens
  useEffect(() => {
    // Habilitar React Native Screens
    enableScreens(true);
    
    // Configurar opciones por defecto
    const defaultOptions = {
      headerShown: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
      animation: 'slide_from_right',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    };
    
    // Aplicar configuración por plataforma
    if (Platform.OS === 'android') {
      defaultOptions.headerStyle.elevation = 0;
      defaultOptions.headerStyle.shadowOpacity = 0;
    }
    
    return () => {
      // Cleanup si es necesario
    };
  }, []);

  return {
    // Información del dispositivo
    deviceInfo,
    
    // Funciones de configuración
    getScreenConfig,
    getPlatformScreenConfig,
    getThemeScreenConfig,
    
    // Funciones de creación de opciones
    createScreenOptions,
    createMainScreenOptions,
    createSettingsScreenOptions,
    createModalScreenOptions,
    createFullScreenOptions,
    createTransparentScreenOptions,
    createThemedScreenOptions,
    createPlatformScreenOptions,
    createOrientationScreenOptions,
    createSizeScreenOptions,
    createCustomAnimationOptions,
    createCustomGestureOptions,
    createCustomPresentationOptions,
    createAccessibilityScreenOptions,
    createPerformanceScreenOptions,
    createCompleteScreenOptions,
    
    // Funciones de configuración específica
    getAnimationConfig,
    getGestureConfig,
    getPresentationConfig,
    getAccessibilityConfig,
    getPerformanceConfig,
    getMonitoringConfig,
    getOptimizationConfig,
    getCacheConfig,
    getPreloadConfig,
    getLazyLoadingConfig,
    getMemoryConfig,
    getMetricsConfig,
    getLoggingConfig,
    getLimitsConfig,
    getWorkletsConfig,
    getOptimizationsConfig,
    getCacheConfigBasic,
    getDeviceCompleteConfig,
    
    // Configuración completa
    screensConfig,
  };
};
