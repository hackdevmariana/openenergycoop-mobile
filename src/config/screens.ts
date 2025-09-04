import { Platform, Dimensions } from 'react-native';

// Configuración general de React Native Screens
export const SCREENS_CONFIG = {
  // Configuración básica
  basic: {
    // Habilitar React Native Screens
    enabled: true,
    
    // Configuración por plataforma
    platform: {
      ios: {
        // Configuración específica para iOS
        enableScreens: true,
        screenOptions: {
          // Opciones por defecto para iOS
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
        },
      },
      android: {
        // Configuración específica para Android
        enableScreens: true,
        screenOptions: {
          // Opciones por defecto para Android
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
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
        },
      },
    },
    
    // Configuración de rendimiento
    performance: {
      // Habilitar optimizaciones de rendimiento
      enabled: true,
      
      // Configuración de cache
      cache: {
        enabled: true,
        maxSize: 10,
        cleanupInterval: 300000, // 5 minutos
      },
      
      // Configuración de preload
      preload: {
        enabled: true,
        screens: ['home', 'dashboard', 'settings'],
        delay: 1000,
      },
      
      // Configuración de lazy loading
      lazyLoading: {
        enabled: true,
        threshold: 0.5,
        timeout: 5000,
      },
    },
  },
  
  // Configuración de pantallas específicas
  screens: {
    // Configuración para pantalla de inicio
    home: {
      name: 'Home',
      options: {
        title: 'Inicio',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#2196F3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: true,
      cache: true,
    },
    
    // Configuración para pantalla de dashboard
    dashboard: {
      name: 'Dashboard',
      options: {
        title: 'Dashboard',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#4CAF50',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: true,
      cache: true,
    },
    
    // Configuración para pantalla de configuración
    settings: {
      name: 'Settings',
      options: {
        title: 'Configuración',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#FF9800',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: false,
      cache: true,
    },
    
    // Configuración para pantalla de perfil
    profile: {
      name: 'Profile',
      options: {
        title: 'Perfil',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#9C27B0',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: false,
      cache: true,
    },
    
    // Configuración para pantalla de gráficos
    charts: {
      name: 'Charts',
      options: {
        title: 'Gráficos',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#E91E63',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: false,
      cache: true,
    },
    
    // Configuración para pantalla de notificaciones
    notifications: {
      name: 'Notifications',
      options: {
        title: 'Notificaciones',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#607D8B',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: false,
      cache: true,
    },
  },
  
  // Configuración de animaciones
  animations: {
    // Configuración para animaciones de entrada
    enter: {
      // Animación de deslizamiento desde la derecha
      slide_from_right: {
        type: 'slide',
        direction: 'right',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de deslizamiento desde la izquierda
      slide_from_left: {
        type: 'slide',
        direction: 'left',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de deslizamiento desde abajo
      slide_from_bottom: {
        type: 'slide',
        direction: 'bottom',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de deslizamiento desde arriba
      slide_from_top: {
        type: 'slide',
        direction: 'top',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de fade
      fade: {
        type: 'fade',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de escala
      scale: {
        type: 'scale',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de rotación
      rotate: {
        type: 'rotate',
        duration: 300,
        easing: 'ease',
      },
    },
    
    // Configuración para animaciones de salida
    exit: {
      // Animación de deslizamiento hacia la derecha
      slide_to_right: {
        type: 'slide',
        direction: 'right',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de deslizamiento hacia la izquierda
      slide_to_left: {
        type: 'slide',
        direction: 'left',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de deslizamiento hacia abajo
      slide_to_bottom: {
        type: 'slide',
        direction: 'bottom',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de deslizamiento hacia arriba
      slide_to_top: {
        type: 'slide',
        direction: 'top',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de fade
      fade: {
        type: 'fade',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de escala
      scale: {
        type: 'scale',
        duration: 300,
        easing: 'ease',
      },
      
      // Animación de rotación
      rotate: {
        type: 'rotate',
        duration: 300,
        easing: 'ease',
      },
    },
    
    // Configuración para animaciones de transición
    transition: {
      // Transición suave
      smooth: {
        duration: 300,
        easing: 'ease',
        type: 'slide',
        direction: 'right',
      },
      
      // Transición rápida
      fast: {
        duration: 200,
        easing: 'ease',
        type: 'slide',
        direction: 'right',
      },
      
      // Transición lenta
      slow: {
        duration: 500,
        easing: 'ease',
        type: 'slide',
        direction: 'right',
      },
      
      // Transición con bounce
      bounce: {
        duration: 400,
        easing: 'bounce',
        type: 'slide',
        direction: 'right',
      },
      
      // Transición con elastic
      elastic: {
        duration: 600,
        easing: 'elastic',
        type: 'slide',
        direction: 'right',
      },
    },
  },
  
  // Configuración de gestos
  gestures: {
    // Configuración para gestos de navegación
    navigation: {
      // Habilitar gestos
      enabled: true,
      
      // Configuración de gestos por plataforma
      platform: {
        ios: {
          // Gestos específicos para iOS
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
          gestureVelocityImpact: 0.3,
          gestureHandlerProps: {
            activeOffsetX: [-10, 10],
            activeOffsetY: [-10, 10],
            failOffsetX: [-20, 20],
            failOffsetY: [-20, 20],
          },
        },
        android: {
          // Gestos específicos para Android
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
          gestureVelocityImpact: 0.3,
          gestureHandlerProps: {
            activeOffsetX: [-10, 10],
            activeOffsetY: [-10, 10],
            failOffsetX: [-20, 20],
            failOffsetY: [-20, 20],
          },
        },
      },
      
      // Configuración de gestos específicos
      specific: {
        // Gestos para pantallas principales
        main: {
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        },
        
        // Gestos para modales
        modal: {
          gestureEnabled: true,
          gestureDirection: 'vertical',
          gestureResponseDistance: 100,
        },
        
        // Gestos para bottom sheets
        bottomSheet: {
          gestureEnabled: true,
          gestureDirection: 'vertical',
          gestureResponseDistance: 100,
        },
        
        // Gestos para pantallas de configuración
        settings: {
          gestureEnabled: false,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        },
      },
    },
    
    // Configuración de gestos de interacción
    interaction: {
      // Gestos de toque
      touch: {
        enabled: true,
        delay: 100,
        timeout: 5000,
      },
      
      // Gestos de presión
      pressure: {
        enabled: true,
        minForce: 0.5,
        maxForce: 1.0,
      },
      
      // Gestos de hover
      hover: {
        enabled: true,
        delay: 100,
        timeout: 1000,
      },
    },
  },
  
  // Configuración de presentación
  presentation: {
    // Configuración para presentación de tarjetas
    card: {
      // Presentación por defecto
      default: {
        presentation: 'card',
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
      
      // Presentación modal
      modal: {
        presentation: 'modal',
        animation: 'slide_from_bottom',
        gestureEnabled: true,
        gestureDirection: 'vertical',
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
      
      // Presentación transparente
      transparent: {
        presentation: 'transparentModal',
        animation: 'fade',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
      
      // Presentación de pantalla completa
      fullScreen: {
        presentation: 'fullScreenModal',
        animation: 'slide_from_bottom',
        gestureEnabled: true,
        gestureDirection: 'vertical',
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    
    // Configuración para presentación de tabs
    tabs: {
      // Presentación por defecto para tabs
      default: {
        presentation: 'card',
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  },
  
  // Configuración de accesibilidad
  accessibility: {
    // Configuración para usuarios con necesidades especiales
    reducedMotion: {
      // Configuración para usuarios con necesidades especiales
      enabled: true,
      animation: 'fade',
      duration: 100,
      easing: 'linear',
    },
    
    // Configuración para pantallas grandes
    largeScreen: {
      // Configuración para pantallas grandes
      enabled: true,
      animation: 'slide_from_right',
      duration: 300,
      easing: 'ease',
    },
    
    // Configuración para pantallas pequeñas
    smallScreen: {
      // Configuración para pantallas pequeñas
      enabled: true,
      animation: 'slide_from_right',
      duration: 250,
      easing: 'ease',
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
        maxSize: 10,
        cleanupInterval: 300000, // 5 minutos
      },
      
      // Configuración de preload
      preload: {
        enabled: true,
        screens: ['home', 'dashboard', 'settings'],
        delay: 1000,
      },
      
      // Configuración de lazy loading
      lazyLoading: {
        enabled: true,
        threshold: 0.5,
        timeout: 5000,
      },
      
      // Configuración de memory management
      memory: {
        enabled: true,
        maxScreens: 10,
        cleanupThreshold: 0.8,
        cleanupInterval: 60000, // 1 minuto
      },
    },
    
    // Configuración de monitoreo
    monitoring: {
      // Habilitar monitoreo
      enabled: true,
      
      // Configuración de métricas
      metrics: {
        // Métricas de rendimiento
        performance: {
          enabled: true,
          interval: 1000,
          threshold: 100,
        },
        
        // Métricas de memoria
        memory: {
          enabled: true,
          interval: 5000,
          threshold: 0.8,
        },
        
        // Métricas de batería
        battery: {
          enabled: true,
          interval: 10000,
          threshold: 0.2,
        },
      },
      
      // Configuración de logging
      logging: {
        // Habilitar logging
        enabled: __DEV__,
        
        // Configuración de niveles
        levels: {
          error: true,
          warn: true,
          info: __DEV__,
          debug: __DEV__,
        },
        
        // Configuración de formato
        format: {
          timestamp: true,
          level: true,
          message: true,
          data: true,
        },
      },
    },
  },
};

// Configuraciones específicas por tipo de pantalla
export const SCREEN_TYPE_CONFIGS = {
  // Configuración para pantallas principales
  main: {
    // Configuración para pantallas principales
    animation: 'slide_from_right',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'card',
    preload: true,
    cache: true,
  },
  
  // Configuración para pantallas de configuración
  settings: {
    // Configuración para pantallas de configuración
    animation: 'slide_from_right',
    gestureEnabled: false,
    gestureDirection: 'horizontal',
    presentation: 'card',
    preload: false,
    cache: true,
  },
  
  // Configuración para pantallas de modal
  modal: {
    // Configuración para pantallas de modal
    animation: 'slide_from_bottom',
    gestureEnabled: true,
    gestureDirection: 'vertical',
    presentation: 'modal',
    preload: false,
    cache: false,
  },
  
  // Configuración para pantallas de pantalla completa
  fullScreen: {
    // Configuración para pantallas de pantalla completa
    animation: 'slide_from_bottom',
    gestureEnabled: true,
    gestureDirection: 'vertical',
    presentation: 'fullScreenModal',
    preload: false,
    cache: false,
  },
  
  // Configuración para pantallas transparentes
  transparent: {
    // Configuración para pantallas transparentes
    animation: 'fade',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'transparentModal',
    preload: false,
    cache: false,
  },
};

// Configuraciones específicas por orientación
export const ORIENTATION_CONFIGS = {
  // Configuración para orientación vertical
  portrait: {
    // Configuración para orientación vertical
    animation: 'slide_from_right',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'card',
  },
  
  // Configuración para orientación horizontal
  landscape: {
    // Configuración para orientación horizontal
    animation: 'slide_from_right',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'card',
  },
};

// Configuraciones específicas por tamaño de pantalla
export const SCREEN_SIZE_CONFIGS = {
  // Configuración para pantallas pequeñas
  small: {
    // Configuración para pantallas pequeñas
    animation: 'slide_from_right',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'card',
    duration: 250,
  },
  
  // Configuración para pantallas medianas
  medium: {
    // Configuración para pantallas medianas
    animation: 'slide_from_right',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'card',
    duration: 300,
  },
  
  // Configuración para pantallas grandes
  large: {
    // Configuración para pantallas grandes
    animation: 'slide_from_right',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    presentation: 'card',
    duration: 350,
  },
};

// Configuración de rendimiento
export const PERFORMANCE_CONFIG = {
  // Configuración de worklets
  worklets: {
    enabled: true,
    autoRun: true,
    debugMode: __DEV__,
  },
  
  // Configuración de cache
  cache: {
    enabled: true,
    maxSize: 10,
    cleanupInterval: 300000, // 5 minutos
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
    maxConcurrentScreens: 5,
    maxCacheSize: 10,
    maxPreloadScreens: 3,
  },
};

// Función para obtener configuración dinámica
export const getScreenConfig = (
  screenName: keyof typeof SCREENS_CONFIG.screens,
  screenType?: keyof typeof SCREEN_TYPE_CONFIGS,
  orientation?: 'portrait' | 'landscape',
  screenSize?: 'small' | 'medium' | 'large'
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
  
  // Obtener configuraciones base
  const screenConfig = SCREENS_CONFIG.screens[screenName];
  const typeConfig = screenType ? SCREEN_TYPE_CONFIGS[screenType] : null;
  const orientationConfig = ORIENTATION_CONFIGS[currentOrientation];
  const screenSizeConfig = SCREEN_SIZE_CONFIGS[currentScreenSize];
  
  // Combinar configuraciones
  const mergedConfig = {
    ...screenConfig,
    options: {
      ...screenConfig.options,
      ...(typeConfig || {}),
      ...orientationConfig,
      ...screenSizeConfig,
    },
  };
  
  return mergedConfig;
};

// Función para obtener configuración específica por plataforma
export const getPlatformScreenConfig = (
  screenName: keyof typeof SCREENS_CONFIG.screens,
  platform?: 'ios' | 'android'
) => {
  const currentPlatform = platform || Platform.OS;
  const platformConfig = SCREENS_CONFIG.basic.platform[currentPlatform];
  
  const screenConfig = SCREENS_CONFIG.screens[screenName];
  
  return {
    ...screenConfig,
    options: {
      ...screenConfig.options,
      ...platformConfig.screenOptions,
    },
  };
};

// Función para obtener configuración específica por tema
export const getThemeScreenConfig = (
  screenName: keyof typeof SCREENS_CONFIG.screens,
  theme: 'light' | 'dark'
) => {
  const screenConfig = SCREENS_CONFIG.screens[screenName];
  
  const themeColors = theme === 'dark' ? {
    headerTintColor: '#FFFFFF',
    cardStyle: {
      backgroundColor: '#000000',
    },
  } : {
    headerTintColor: '#000000',
    cardStyle: {
      backgroundColor: '#FFFFFF',
    },
  };
  
  return {
    ...screenConfig,
    options: {
      ...screenConfig.options,
      ...themeColors,
    },
  };
};

// Exportar configuración completa
export const screensConfig = {
  basic: SCREENS_CONFIG.basic,
  screens: SCREENS_CONFIG.screens,
  animations: SCREENS_CONFIG.animations,
  gestures: SCREENS_CONFIG.gestures,
  presentation: SCREENS_CONFIG.presentation,
  accessibility: SCREENS_CONFIG.accessibility,
  performance: SCREENS_CONFIG.performance,
  screenTypeConfigs: SCREEN_TYPE_CONFIGS,
  orientationConfigs: ORIENTATION_CONFIGS,
  screenSizeConfigs: SCREEN_SIZE_CONFIGS,
  performanceConfig: PERFORMANCE_CONFIG,
  getScreenConfig,
  getPlatformScreenConfig,
  getThemeScreenConfig,
};
