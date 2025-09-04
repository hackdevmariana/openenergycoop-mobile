import { Platform, Dimensions } from 'react-native';

// Configuración general de Safe Area Context
export const SAFE_AREA_CONFIG = {
  // Configuración básica
  basic: {
    // Habilitar Safe Area Context
    enabled: true,
    
    // Configuración por plataforma
    platform: {
      ios: {
        // Configuración específica para iOS
        useSafeAreaInsets: true,
        edges: ['top', 'right', 'bottom', 'left'],
        minimumPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      android: {
        // Configuración específica para Android
        useSafeAreaInsets: true,
        edges: ['top', 'right', 'bottom', 'left'],
        minimumPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    },
    
    // Configuración de orientación
    orientation: {
      portrait: {
        // Configuración para orientación vertical
        edges: ['top', 'right', 'bottom', 'left'],
        minimumPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      landscape: {
        // Configuración para orientación horizontal
        edges: ['top', 'right', 'bottom', 'left'],
        minimumPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    },
  },
  
  // Configuración de componentes específicos
  components: {
    // Configuración para pantallas principales
    screen: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      style: {
        flex: 1,
      },
    },
    
    // Configuración para headers
    header: {
      edges: ['top', 'right', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      style: {
        backgroundColor: 'transparent',
      },
    },
    
    // Configuración para contenido principal
    content: {
      edges: ['right', 'left'],
      minimumPadding: {
        top: 0,
        right: 16,
        bottom: 0,
        left: 16,
      },
      style: {
        flex: 1,
      },
    },
    
    // Configuración para bottom sheets
    bottomSheet: {
      edges: ['bottom', 'right', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      style: {
        backgroundColor: 'transparent',
      },
    },
    
    // Configuración para modales
    modal: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      style: {
        flex: 1,
      },
    },
    
    // Configuración para floating action buttons
    fab: {
      edges: ['bottom', 'right'],
      minimumPadding: {
        top: 0,
        right: 16,
        bottom: 16,
        left: 0,
      },
      style: {
        position: 'absolute',
      },
    },
    
    // Configuración para tooltips
    tooltip: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
      },
      style: {
        position: 'absolute',
      },
    },
  },
  
  // Configuración de dispositivos específicos
  devices: {
    // Configuración para iPhone con notch
    iphoneNotch: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 44, // Altura del notch
        right: 0,
        bottom: 34, // Altura del home indicator
        left: 0,
      },
    },
    
    // Configuración para iPhone sin notch
    iphoneClassic: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 20, // Status bar
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    
    // Configuración para Android con notch
    androidNotch: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 24, // Status bar
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    
    // Configuración para Android clásico
    androidClassic: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 24, // Status bar
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    
    // Configuración para tablets
    tablet: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  },
  
  // Configuración de temas
  themes: {
    // Configuración para tema claro
    light: {
      backgroundColor: '#FFFFFF',
      statusBarStyle: 'dark-content',
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    
    // Configuración para tema oscuro
    dark: {
      backgroundColor: '#000000',
      statusBarStyle: 'light-content',
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  },
  
  // Configuración de accesibilidad
  accessibility: {
    // Configuración para usuarios con necesidades especiales
    reducedMotion: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      style: {
        // Estilos específicos para usuarios con necesidades especiales
      },
    },
    
    // Configuración para pantallas grandes
    largeScreen: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
      },
    },
    
    // Configuración para pantallas pequeñas
    smallScreen: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    },
  },
  
  // Configuración de rendimiento
  performance: {
    // Configuración para optimización de rendimiento
    optimization: {
      // Habilitar optimizaciones
      enabled: true,
      
      // Configuración de cache
      cache: {
        enabled: true,
        maxSize: 100,
        cleanupInterval: 60000, // 1 minuto
      },
      
      // Configuración de actualizaciones
      updates: {
        // Frecuencia de actualizaciones
        frequency: 'onChange',
        
        // Debounce para actualizaciones
        debounce: 100,
      },
    },
  },
};

// Configuraciones específicas por tipo de pantalla
export const SCREEN_SAFE_AREA_CONFIGS = {
  // Configuración para pantalla de inicio
  home: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
  
  // Configuración para pantalla de dashboard
  dashboard: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
  
  // Configuración para pantalla de configuración
  settings: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
  
  // Configuración para pantalla de perfil
  profile: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
  
  // Configuración para pantalla de gráficos
  charts: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 8,
      bottom: 0,
      left: 8,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
  
  // Configuración para pantalla de notificaciones
  notifications: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
};

// Configuraciones específicas por tipo de componente
export const COMPONENT_SAFE_AREA_CONFIGS = {
  // Configuración para botones de acción
  actionButton: {
    edges: ['bottom', 'right'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 16,
      left: 0,
    },
    style: {
      position: 'absolute',
      zIndex: 1000,
    },
  },
  
  // Configuración para barras de navegación
  navigationBar: {
    edges: ['top', 'right', 'left'],
    minimumPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
  },
  
  // Configuración para tab bars
  tabBar: {
    edges: ['bottom', 'right', 'left'],
    minimumPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    style: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
  },
  
  // Configuración para listas
  list: {
    edges: ['right', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para formularios
  form: {
    edges: ['right', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para modales
  modal: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    style: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  },
  
  // Configuración para tooltips
  tooltip: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 8,
      right: 8,
      bottom: 8,
      left: 8,
    },
    style: {
      position: 'absolute',
      zIndex: 1000,
    },
  },
};

// Configuraciones específicas por orientación
export const ORIENTATION_SAFE_AREA_CONFIGS = {
  // Configuración para orientación vertical
  portrait: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para orientación horizontal
  landscape: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 40,
      bottom: 0,
      left: 40,
    },
    style: {
      flex: 1,
    },
  },
};

// Configuraciones específicas por tamaño de pantalla
export const SCREEN_SIZE_SAFE_AREA_CONFIGS = {
  // Configuración para pantallas pequeñas (< 375px)
  small: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 8,
      bottom: 0,
      left: 8,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para pantallas medianas (375px - 768px)
  medium: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para pantallas grandes (> 768px)
  large: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 40,
      bottom: 0,
      left: 40,
    },
    style: {
      flex: 1,
    },
  },
};

// Configuraciones específicas por densidad de píxeles
export const PIXEL_DENSITY_SAFE_AREA_CONFIGS = {
  // Configuración para dispositivos de baja densidad
  low: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 8,
      bottom: 0,
      left: 8,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para dispositivos de densidad media
  medium: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 16,
      bottom: 0,
      left: 16,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para dispositivos de alta densidad
  high: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 24,
      bottom: 0,
      left: 24,
    },
    style: {
      flex: 1,
    },
  },
  
  // Configuración para dispositivos de muy alta densidad
  xhigh: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 0,
      right: 32,
      bottom: 0,
      left: 32,
    },
    style: {
      flex: 1,
    },
  },
};

// Configuración de rendimiento
export const PERFORMANCE_SAFE_AREA_CONFIG = {
  // Configuración de worklets
  worklets: {
    enabled: true,
    autoRun: true,
    debugMode: __DEV__,
  },
  
  // Configuración de cache
  cache: {
    enabled: true,
    maxSize: 100,
    cleanupInterval: 60000, // 1 minuto
  },
  
  // Configuración de optimizaciones
  optimizations: {
    useNativeDriver: true,
    reduceMotion: false,
    enableDebugging: __DEV__,
    enableProfiling: __DEV__,
  },
  
  // Configuración de límites
  limits: {
    maxConcurrentUpdates: 10,
    maxCacheSize: 100,
    maxWorklets: 20,
  },
};

// Función para obtener configuración dinámica
export const getSafeAreaConfig = (
  componentType: keyof typeof COMPONENT_SAFE_AREA_CONFIGS,
  screenType?: keyof typeof SCREEN_SAFE_AREA_CONFIGS,
  orientation?: 'portrait' | 'landscape',
  screenSize?: 'small' | 'medium' | 'large',
  pixelDensity?: 'low' | 'medium' | 'high' | 'xhigh'
) => {
  const { width, height } = Dimensions.get('window');
  const isLandscape = width > height;
  const currentOrientation = orientation || (isLandscape ? 'landscape' : 'portrait');
  
  // Determinar tamaño de pantalla si no se proporciona
  let currentScreenSize = screenSize;
  if (!currentScreenSize) {
    const minDimension = Math.min(width, height);
    if (minDimension < 375) {
      currentScreenSize = 'small';
    } else if (minDimension < 768) {
      currentScreenSize = 'medium';
    } else {
      currentScreenSize = 'large';
    }
  }
  
  // Determinar densidad de píxeles si no se proporciona
  let currentPixelDensity = pixelDensity;
  if (!currentPixelDensity) {
    const pixelRatio = require('react-native').PixelRatio.get();
    if (pixelRatio < 2) {
      currentPixelDensity = 'low';
    } else if (pixelRatio < 3) {
      currentPixelDensity = 'medium';
    } else if (pixelRatio < 4) {
      currentPixelDensity = 'high';
    } else {
      currentPixelDensity = 'xhigh';
    }
  }
  
  // Obtener configuraciones base
  const componentConfig = COMPONENT_SAFE_AREA_CONFIGS[componentType] || COMPONENT_SAFE_AREA_CONFIGS.content;
  const screenConfig = screenType ? SCREEN_SAFE_AREA_CONFIGS[screenType] : null;
  const orientationConfig = ORIENTATION_SAFE_AREA_CONFIGS[currentOrientation];
  const screenSizeConfig = SCREEN_SIZE_SAFE_AREA_CONFIGS[currentScreenSize];
  const pixelDensityConfig = PIXEL_DENSITY_SAFE_AREA_CONFIGS[currentPixelDensity];
  
  // Combinar configuraciones
  const mergedConfig = {
    edges: componentConfig.edges,
    minimumPadding: {
      top: Math.max(
        componentConfig.minimumPadding.top,
        screenConfig?.minimumPadding.top || 0,
        orientationConfig.minimumPadding.top,
        screenSizeConfig.minimumPadding.top,
        pixelDensityConfig.minimumPadding.top
      ),
      right: Math.max(
        componentConfig.minimumPadding.right,
        screenConfig?.minimumPadding.right || 0,
        orientationConfig.minimumPadding.right,
        screenSizeConfig.minimumPadding.right,
        pixelDensityConfig.minimumPadding.right
      ),
      bottom: Math.max(
        componentConfig.minimumPadding.bottom,
        screenConfig?.minimumPadding.bottom || 0,
        orientationConfig.minimumPadding.bottom,
        screenSizeConfig.minimumPadding.bottom,
        pixelDensityConfig.minimumPadding.bottom
      ),
      left: Math.max(
        componentConfig.minimumPadding.left,
        screenConfig?.minimumPadding.left || 0,
        orientationConfig.minimumPadding.left,
        screenSizeConfig.minimumPadding.left,
        pixelDensityConfig.minimumPadding.left
      ),
    },
    style: {
      ...componentConfig.style,
      ...(screenConfig?.style || {}),
      ...orientationConfig.style,
      ...screenSizeConfig.style,
      ...pixelDensityConfig.style,
    },
  };
  
  return mergedConfig;
};

// Función para obtener configuración específica por plataforma
export const getPlatformSafeAreaConfig = (
  componentType: keyof typeof COMPONENT_SAFE_AREA_CONFIGS,
  platform?: 'ios' | 'android'
) => {
  const currentPlatform = platform || Platform.OS;
  const platformConfig = SAFE_AREA_CONFIG.basic.platform[currentPlatform];
  
  const componentConfig = COMPONENT_SAFE_AREA_CONFIGS[componentType] || COMPONENT_SAFE_AREA_CONFIGS.content;
  
  return {
    edges: componentConfig.edges,
    minimumPadding: {
      top: Math.max(componentConfig.minimumPadding.top, platformConfig.minimumPadding.top),
      right: Math.max(componentConfig.minimumPadding.right, platformConfig.minimumPadding.right),
      bottom: Math.max(componentConfig.minimumPadding.bottom, platformConfig.minimumPadding.bottom),
      left: Math.max(componentConfig.minimumPadding.left, platformConfig.minimumPadding.left),
    },
    style: {
      ...componentConfig.style,
      ...platformConfig.style,
    },
  };
};

// Función para obtener configuración específica por tema
export const getThemeSafeAreaConfig = (
  componentType: keyof typeof COMPONENT_SAFE_AREA_CONFIGS,
  theme: 'light' | 'dark'
) => {
  const themeConfig = SAFE_AREA_CONFIG.themes[theme];
  const componentConfig = COMPONENT_SAFE_AREA_CONFIGS[componentType] || COMPONENT_SAFE_AREA_CONFIGS.content;
  
  return {
    edges: componentConfig.edges,
    minimumPadding: componentConfig.minimumPadding,
    style: {
      ...componentConfig.style,
      backgroundColor: themeConfig.backgroundColor,
    },
  };
};

// Exportar configuración completa
export const safeAreaConfig = {
  basic: SAFE_AREA_CONFIG.basic,
  components: SAFE_AREA_CONFIG.components,
  devices: SAFE_AREA_CONFIG.devices,
  themes: SAFE_AREA_CONFIG.themes,
  accessibility: SAFE_AREA_CONFIG.accessibility,
  performance: SAFE_AREA_CONFIG.performance,
  screenConfigs: SCREEN_SAFE_AREA_CONFIGS,
  componentConfigs: COMPONENT_SAFE_AREA_CONFIGS,
  orientationConfigs: ORIENTATION_SAFE_AREA_CONFIGS,
  screenSizeConfigs: SCREEN_SIZE_SAFE_AREA_CONFIGS,
  pixelDensityConfigs: PIXEL_DENSITY_SAFE_AREA_CONFIGS,
  performanceConfig: PERFORMANCE_SAFE_AREA_CONFIG,
  getSafeAreaConfig,
  getPlatformSafeAreaConfig,
  getThemeSafeAreaConfig,
};
