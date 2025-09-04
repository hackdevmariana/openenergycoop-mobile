import { useCallback, useMemo } from 'react';
import { useSafeAreaInsets, useSafeAreaFrame } from 'react-native-safe-area-context';
import { Platform, Dimensions, PixelRatio } from 'react-native';
import { safeAreaConfig } from '../config/safeArea';

// Hook principal para react-native-safe-area-context
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  // Información del dispositivo
  const deviceInfo = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const pixelRatio = PixelRatio.get();
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
    
    // Determinar densidad de píxeles
    let pixelDensity: 'low' | 'medium' | 'high' | 'xhigh';
    if (pixelRatio < 2) {
      pixelDensity = 'low';
    } else if (pixelRatio < 3) {
      pixelDensity = 'medium';
    } else if (pixelRatio < 4) {
      pixelDensity = 'high';
    } else {
      pixelDensity = 'xhigh';
    }
    
    // Determinar orientación
    const orientation: 'portrait' | 'landscape' = isLandscape ? 'landscape' : 'portrait';
    
    // Determinar tipo de dispositivo
    let deviceType: 'iphoneNotch' | 'iphoneClassic' | 'androidNotch' | 'androidClassic' | 'tablet';
    if (Platform.OS === 'ios') {
      if (insets.top > 20) {
        deviceType = 'iphoneNotch';
      } else {
        deviceType = 'iphoneClassic';
      }
    } else if (Platform.OS === 'android') {
      if (insets.top > 24) {
        deviceType = 'androidNotch';
      } else {
        deviceType = 'androidClassic';
      }
    } else {
      deviceType = 'tablet';
    }
    
    return {
      width,
      height,
      pixelRatio,
      isLandscape,
      minDimension,
      screenSize,
      pixelDensity,
      orientation,
      deviceType,
      insets,
      frame,
    };
  }, [insets, frame]);

  // Función para obtener configuración de safe area
  const getSafeAreaConfig = useCallback((
    componentType: keyof typeof safeAreaConfig.componentConfigs,
    screenType?: keyof typeof safeAreaConfig.screenConfigs,
    orientation?: 'portrait' | 'landscape',
    screenSize?: 'small' | 'medium' | 'large',
    pixelDensity?: 'low' | 'medium' | 'high' | 'xhigh'
  ) => {
    return safeAreaConfig.getSafeAreaConfig(
      componentType,
      screenType,
      orientation || deviceInfo.orientation,
      screenSize || deviceInfo.screenSize,
      pixelDensity || deviceInfo.pixelDensity
    );
  }, [deviceInfo]);

  // Función para obtener configuración específica por plataforma
  const getPlatformSafeAreaConfig = useCallback((
    componentType: keyof typeof safeAreaConfig.componentConfigs,
    platform?: 'ios' | 'android'
  ) => {
    return safeAreaConfig.getPlatformSafeAreaConfig(componentType, platform);
  }, []);

  // Función para obtener configuración específica por tema
  const getThemeSafeAreaConfig = useCallback((
    componentType: keyof typeof safeAreaConfig.componentConfigs,
    theme: 'light' | 'dark'
  ) => {
    return safeAreaConfig.getThemeSafeAreaConfig(componentType, theme);
  }, []);

  // Función para obtener estilos de safe area
  const getSafeAreaStyles = useCallback((
    componentType: keyof typeof safeAreaConfig.componentConfigs,
    screenType?: keyof typeof safeAreaConfig.screenConfigs,
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    const config = getSafeAreaConfig(componentType, screenType);
    
    const padding = {
      paddingTop: Math.max(insets.top, config.minimumPadding.top, customPadding?.top || 0),
      paddingRight: Math.max(insets.right, config.minimumPadding.right, customPadding?.right || 0),
      paddingBottom: Math.max(insets.bottom, config.minimumPadding.bottom, customPadding?.bottom || 0),
      paddingLeft: Math.max(insets.left, config.minimumPadding.left, customPadding?.left || 0),
    };
    
    return {
      ...config.style,
      ...padding,
    };
  }, [insets, getSafeAreaConfig]);

  // Función para obtener estilos de safe area para pantallas
  const getScreenSafeAreaStyles = useCallback((
    screenType: keyof typeof safeAreaConfig.screenConfigs,
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('screen', screenType, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para contenido
  const getContentSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('content', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para headers
  const getHeaderSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('header', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para bottom sheets
  const getBottomSheetSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('bottomSheet', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para modales
  const getModalSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('modal', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para floating action buttons
  const getFabSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('fab', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para tooltips
  const getTooltipSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('tooltip', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para listas
  const getListSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('list', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para formularios
  const getFormSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('form', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para barras de navegación
  const getNavigationBarSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('navigationBar', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para tab bars
  const getTabBarSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('tabBar', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para botones de acción
  const getActionButtonSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('actionButton', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener información de insets
  const getInsetsInfo = useCallback(() => {
    return {
      top: insets.top,
      right: insets.right,
      bottom: insets.bottom,
      left: insets.left,
      total: {
        horizontal: insets.left + insets.right,
        vertical: insets.top + insets.bottom,
      },
    };
  }, [insets]);

  // Función para obtener información del frame
  const getFrameInfo = useCallback(() => {
    return {
      width: frame.width,
      height: frame.height,
      aspectRatio: frame.width / frame.height,
      isLandscape: frame.width > frame.height,
    };
  }, [frame]);

  // Función para verificar si hay notch
  const hasNotch = useCallback(() => {
    return insets.top > (Platform.OS === 'ios' ? 20 : 24);
  }, [insets.top]);

  // Función para verificar si hay home indicator
  const hasHomeIndicator = useCallback(() => {
    return insets.bottom > 0;
  }, [insets.bottom]);

  // Función para obtener altura del status bar
  const getStatusBarHeight = useCallback(() => {
    return insets.top;
  }, [insets.top]);

  // Función para obtener altura del home indicator
  const getHomeIndicatorHeight = useCallback(() => {
    return insets.bottom;
  }, [insets.bottom]);

  // Función para obtener ancho de los insets laterales
  const getLateralInsets = useCallback(() => {
    return {
      left: insets.left,
      right: insets.right,
      total: insets.left + insets.right,
    };
  }, [insets]);

  // Función para obtener altura de los insets verticales
  const getVerticalInsets = useCallback(() => {
    return {
      top: insets.top,
      bottom: insets.bottom,
      total: insets.top + insets.bottom,
    };
  }, [insets]);

  // Función para obtener área segura disponible
  const getAvailableArea = useCallback(() => {
    return {
      width: frame.width - insets.left - insets.right,
      height: frame.height - insets.top - insets.bottom,
      area: (frame.width - insets.left - insets.right) * (frame.height - insets.top - insets.bottom),
    };
  }, [frame, insets]);

  // Función para obtener configuración de accesibilidad
  const getAccessibilityConfig = useCallback(() => {
    const { screenSize, pixelDensity } = deviceInfo;
    
    if (screenSize === 'large') {
      return safeAreaConfig.accessibility.largeScreen;
    } else if (screenSize === 'small') {
      return safeAreaConfig.accessibility.smallScreen;
    }
    
    return safeAreaConfig.accessibility.reducedMotion;
  }, [deviceInfo]);

  // Función para obtener configuración de rendimiento
  const getPerformanceConfig = useCallback(() => {
    return safeAreaConfig.performanceConfig;
  }, []);

  // Función para obtener configuración de dispositivo específico
  const getDeviceConfig = useCallback(() => {
    const { deviceType } = deviceInfo;
    return safeAreaConfig.devices[deviceType];
  }, [deviceInfo]);

  // Función para obtener configuración de orientación específica
  const getOrientationConfig = useCallback(() => {
    const { orientation } = deviceInfo;
    return safeAreaConfig.orientationConfigs[orientation];
  }, [deviceInfo]);

  // Función para obtener configuración de tamaño de pantalla específico
  const getScreenSizeConfig = useCallback(() => {
    const { screenSize } = deviceInfo;
    return safeAreaConfig.screenSizeConfigs[screenSize];
  }, [deviceInfo]);

  // Función para obtener configuración de densidad de píxeles específica
  const getPixelDensityConfig = useCallback(() => {
    const { pixelDensity } = deviceInfo;
    return safeAreaConfig.pixelDensityConfigs[pixelDensity];
  }, [deviceInfo]);

  // Función para obtener configuración de tema específica
  const getThemeConfig = useCallback((theme: 'light' | 'dark') => {
    return safeAreaConfig.themes[theme];
  }, []);

  // Función para obtener configuración completa del dispositivo
  const getDeviceCompleteConfig = useCallback(() => {
    return {
      deviceInfo,
      insets: getInsetsInfo(),
      frame: getFrameInfo(),
      hasNotch: hasNotch(),
      hasHomeIndicator: hasHomeIndicator(),
      statusBarHeight: getStatusBarHeight(),
      homeIndicatorHeight: getHomeIndicatorHeight(),
      lateralInsets: getLateralInsets(),
      verticalInsets: getVerticalInsets(),
      availableArea: getAvailableArea(),
      accessibility: getAccessibilityConfig(),
      performance: getPerformanceConfig(),
      device: getDeviceConfig(),
      orientation: getOrientationConfig(),
      screenSize: getScreenSizeConfig(),
      pixelDensity: getPixelDensityConfig(),
    };
  }, [
    deviceInfo,
    getInsetsInfo,
    getFrameInfo,
    hasNotch,
    hasHomeIndicator,
    getStatusBarHeight,
    getHomeIndicatorHeight,
    getLateralInsets,
    getVerticalInsets,
    getAvailableArea,
    getAccessibilityConfig,
    getPerformanceConfig,
    getDeviceConfig,
    getOrientationConfig,
    getScreenSizeConfig,
    getPixelDensityConfig,
  ]);

  return {
    // Información del dispositivo
    deviceInfo,
    
    // Insets y frame
    insets,
    frame,
    
    // Funciones de configuración
    getSafeAreaConfig,
    getPlatformSafeAreaConfig,
    getThemeSafeAreaConfig,
    
    // Funciones de estilos específicos
    getSafeAreaStyles,
    getScreenSafeAreaStyles,
    getContentSafeAreaStyles,
    getHeaderSafeAreaStyles,
    getBottomSheetSafeAreaStyles,
    getModalSafeAreaStyles,
    getFabSafeAreaStyles,
    getTooltipSafeAreaStyles,
    getListSafeAreaStyles,
    getFormSafeAreaStyles,
    getNavigationBarSafeAreaStyles,
    getTabBarSafeAreaStyles,
    getActionButtonSafeAreaStyles,
    
    // Funciones de información
    getInsetsInfo,
    getFrameInfo,
    hasNotch,
    hasHomeIndicator,
    getStatusBarHeight,
    getHomeIndicatorHeight,
    getLateralInsets,
    getVerticalInsets,
    getAvailableArea,
    
    // Funciones de configuración específica
    getAccessibilityConfig,
    getPerformanceConfig,
    getDeviceConfig,
    getOrientationConfig,
    getScreenSizeConfig,
    getPixelDensityConfig,
    getThemeConfig,
    getDeviceCompleteConfig,
    
    // Configuración completa
    safeAreaConfig,
  };
};
