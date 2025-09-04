import { Easing } from 'react-native-reanimated';

// Configuración general de react-native-reanimated
export const REANIMATED_CONFIG = {
  // Configuración de animaciones básicas
  animations: {
    // Duración estándar para animaciones
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
      verySlow: 800,
    },
    
    // Easing functions predefinidas
    easing: {
      // Easing para elementos de energía
      energy: {
        solar: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Suave y natural
        wind: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Elástico
        hydro: Easing.bezier(0.55, 0.055, 0.675, 0.19), // Fluido
        nuclear: Easing.bezier(0.6, 0.04, 0.98, 0.335), // Potente
        biomass: Easing.bezier(0.25, 0.8, 0.25, 1), // Orgánico
        geothermal: Easing.bezier(0.77, 0, 0.175, 1), // Profundo
      },
      
      // Easing para estados de consumo
      consumption: {
        low: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Suave
        medium: Easing.bezier(0.55, 0.055, 0.675, 0.19), // Moderado
        high: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Intenso
        critical: Easing.bezier(0.6, 0.04, 0.98, 0.335), // Crítico
      },
      
      // Easing para estados de la aplicación
      app: {
        enter: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        exit: Easing.bezier(0.55, 0.055, 0.675, 0.19),
        bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
        elastic: Easing.bezier(0.77, 0, 0.175, 1),
      },
    },
  },
  
  // Configuración de gestos
  gestures: {
    // Sensibilidad de gestos
    sensitivity: {
      low: 0.5,
      normal: 1.0,
      high: 1.5,
      veryHigh: 2.0,
    },
    
    // Configuración de gestos específicos
    types: {
      // Gestos para paneles de energía
      energyPanel: {
        pan: {
          activeOffsetX: [-10, 10],
          activeOffsetY: [-10, 10],
          failOffsetX: [-20, 20],
          failOffsetY: [-20, 20],
        },
        pinch: {
          minDistance: 10,
          minPointers: 2,
          maxPointers: 2,
        },
        rotation: {
          minDistance: 10,
          minPointers: 2,
          maxPointers: 2,
        },
      },
      
      // Gestos para gráficos de consumo
      consumptionChart: {
        pan: {
          activeOffsetX: [-5, 5],
          activeOffsetY: [-5, 5],
          failOffsetX: [-15, 15],
          failOffsetY: [-15, 15],
        },
        pinch: {
          minDistance: 5,
          minPointers: 2,
          maxPointers: 2,
        },
      },
      
      // Gestos para botones de acción
      actionButton: {
        tap: {
          numberOfTaps: 1,
          maxDurationMs: 500,
          maxDelayMs: 500,
        },
        longPress: {
          minDurationMs: 500,
          maxDistance: 10,
        },
      },
    },
  },
  
  // Configuración de transiciones
  transitions: {
    // Transiciones de pantalla
    screen: {
      duration: 300,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    },
    
    // Transiciones de modal
    modal: {
      duration: 250,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    },
    
    // Transiciones de lista
    list: {
      duration: 200,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    },
    
    // Transiciones de splash screen
    splash: {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    },
  },
  
  // Configuración de efectos visuales
  effects: {
    // Efectos de partículas para energía
    particles: {
      solar: {
        count: 20,
        speed: 2,
        size: { min: 2, max: 6 },
        opacity: { min: 0.3, max: 0.8 },
      },
      wind: {
        count: 15,
        speed: 3,
        size: { min: 1, max: 4 },
        opacity: { min: 0.2, max: 0.6 },
      },
      hydro: {
        count: 25,
        speed: 1.5,
        size: { min: 3, max: 8 },
        opacity: { min: 0.4, max: 0.9 },
      },
    },
    
    // Efectos de confeti para celebraciones
    confetti: {
      count: 50,
      speed: 4,
      size: { min: 4, max: 12 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    },
    
    // Efectos de ondas para interacciones
    waves: {
      count: 3,
      duration: 1000,
      scale: { min: 1, max: 2 },
      opacity: { min: 0.8, max: 0 },
    },
  },
  
  // Configuración de rendimiento
  performance: {
    // Configuración de worklets
    worklets: {
      enabled: true,
      autoRun: true,
    },
    
    // Configuración de cache
    cache: {
      enabled: true,
      maxSize: 100,
    },
    
    // Configuración de optimizaciones
    optimizations: {
      useNativeDriver: true,
      reduceMotion: false,
      enableDebugging: __DEV__,
    },
  },
};

// Configuraciones específicas por tipo de componente
export const COMPONENT_ANIMATIONS = {
  // Animaciones para tarjetas de energía
  energyCard: {
    enter: {
      duration: 300,
      easing: REANIMATED_CONFIG.animations.easing.energy.solar,
      initialValues: {
        opacity: 0,
        scale: 0.8,
        translateY: 50,
      },
      targetValues: {
        opacity: 1,
        scale: 1,
        translateY: 0,
      },
    },
    exit: {
      duration: 250,
      easing: REANIMATED_CONFIG.animations.easing.app.exit,
      targetValues: {
        opacity: 0,
        scale: 0.8,
        translateY: -50,
      },
    },
    press: {
      duration: 100,
      easing: REANIMATED_CONFIG.animations.easing.app.bounce,
      targetValues: {
        scale: 0.95,
      },
    },
  },
  
  // Animaciones para botones de acción
  actionButton: {
    enter: {
      duration: 200,
      easing: REANIMATED_CONFIG.animations.easing.app.enter,
      initialValues: {
        opacity: 0,
        scale: 0.9,
      },
      targetValues: {
        opacity: 1,
        scale: 1,
      },
    },
    press: {
      duration: 150,
      easing: REANIMATED_CONFIG.animations.easing.app.bounce,
      targetValues: {
        scale: 0.9,
      },
    },
    release: {
      duration: 150,
      easing: REANIMATED_CONFIG.animations.easing.app.bounce,
      targetValues: {
        scale: 1,
      },
    },
  },
  
  // Animaciones para gráficos de consumo
  consumptionChart: {
    enter: {
      duration: 500,
      easing: REANIMATED_CONFIG.animations.easing.consumption.low,
      initialValues: {
        opacity: 0,
        scale: 0.8,
      },
      targetValues: {
        opacity: 1,
        scale: 1,
      },
    },
    update: {
      duration: 300,
      easing: REANIMATED_CONFIG.animations.easing.consumption.medium,
    },
  },
  
  // Animaciones para splash screen
  splashScreen: {
    enter: {
      duration: 1000,
      easing: REANIMATED_CONFIG.animations.easing.app.enter,
      initialValues: {
        opacity: 0,
        scale: 1.1,
      },
      targetValues: {
        opacity: 1,
        scale: 1,
      },
    },
    exit: {
      duration: 800,
      easing: REANIMATED_CONFIG.animations.easing.app.exit,
      targetValues: {
        opacity: 0,
        scale: 0.9,
      },
    },
  },
  
  // Animaciones para modales
  modal: {
    enter: {
      duration: 300,
      easing: REANIMATED_CONFIG.animations.easing.app.enter,
      initialValues: {
        opacity: 0,
        scale: 0.9,
        translateY: 100,
      },
      targetValues: {
        opacity: 1,
        scale: 1,
        translateY: 0,
      },
    },
    exit: {
      duration: 250,
      easing: REANIMATED_CONFIG.animations.easing.app.exit,
      targetValues: {
        opacity: 0,
        scale: 0.9,
        translateY: 100,
      },
    },
  },
  
  // Animaciones para listas
  list: {
    item: {
      enter: {
        duration: 200,
        easing: REANIMATED_CONFIG.animations.easing.app.enter,
        initialValues: {
          opacity: 0,
          translateX: -50,
        },
        targetValues: {
          opacity: 1,
          translateX: 0,
        },
      },
      exit: {
        duration: 150,
        easing: REANIMATED_CONFIG.animations.easing.app.exit,
        targetValues: {
          opacity: 0,
          translateX: 50,
        },
      },
    },
  },
};

// Configuraciones de gestos específicos
export const GESTURE_CONFIGS = {
  // Gestos para paneles de energía
  energyPanel: {
    pan: {
      activeOffsetX: [-10, 10],
      activeOffsetY: [-10, 10],
      failOffsetX: [-20, 20],
      failOffsetY: [-20, 20],
      minDistance: 10,
    },
    pinch: {
      minDistance: 10,
      minPointers: 2,
      maxPointers: 2,
    },
    rotation: {
      minDistance: 10,
      minPointers: 2,
      maxPointers: 2,
    },
  },
  
  // Gestos para gráficos
  chart: {
    pan: {
      activeOffsetX: [-5, 5],
      activeOffsetY: [-5, 5],
      failOffsetX: [-15, 15],
      failOffsetY: [-15, 15],
      minDistance: 5,
    },
    pinch: {
      minDistance: 5,
      minPointers: 2,
      maxPointers: 2,
    },
  },
  
  // Gestos para botones
  button: {
    tap: {
      numberOfTaps: 1,
      maxDurationMs: 500,
      maxDelayMs: 500,
    },
    longPress: {
      minDurationMs: 500,
      maxDistance: 10,
    },
  },
};

// Configuraciones de efectos visuales
export const VISUAL_EFFECTS = {
  // Efectos de partículas para tipos de energía
  energyParticles: {
    solar: {
      count: 20,
      speed: 2,
      size: { min: 2, max: 6 },
      opacity: { min: 0.3, max: 0.8 },
      colors: ['#FFD700', '#FFA500', '#FF8C00'],
    },
    wind: {
      count: 15,
      speed: 3,
      size: { min: 1, max: 4 },
      opacity: { min: 0.2, max: 0.6 },
      colors: ['#87CEEB', '#B0E0E6', '#ADD8E6'],
    },
    hydro: {
      count: 25,
      speed: 1.5,
      size: { min: 3, max: 8 },
      opacity: { min: 0.4, max: 0.9 },
      colors: ['#4682B4', '#5F9EA0', '#20B2AA'],
    },
    nuclear: {
      count: 10,
      speed: 1,
      size: { min: 4, max: 10 },
      opacity: { min: 0.5, max: 1 },
      colors: ['#FF6B6B', '#FF4500', '#DC143C'],
    },
    biomass: {
      count: 18,
      speed: 1.8,
      size: { min: 2, max: 5 },
      opacity: { min: 0.3, max: 0.7 },
      colors: ['#90EE90', '#32CD32', '#228B22'],
    },
    geothermal: {
      count: 12,
      speed: 2.5,
      size: { min: 3, max: 7 },
      opacity: { min: 0.4, max: 0.8 },
      colors: ['#FF8C00', '#FF7F50', '#FF6347'],
    },
  },
  
  // Efectos de confeti para eventos especiales
  confetti: {
    celebration: {
      count: 50,
      speed: 4,
      size: { min: 4, max: 12 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    },
    achievement: {
      count: 30,
      speed: 3,
      size: { min: 3, max: 8 },
      colors: ['#FFD700', '#FFA500', '#FF6347'],
    },
  },
  
  // Efectos de ondas para interacciones
  ripple: {
    button: {
      count: 3,
      duration: 1000,
      scale: { min: 1, max: 2 },
      opacity: { min: 0.8, max: 0 },
    },
    card: {
      count: 2,
      duration: 800,
      scale: { min: 1, max: 1.5 },
      opacity: { min: 0.6, max: 0 },
    },
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
    maxConcurrentAnimations: 10,
    maxGestureHandlers: 5,
    maxWorklets: 20,
  },
};

// Exportar configuración completa
export const reanimatedConfig = {
  animations: REANIMATED_CONFIG.animations,
  gestures: REANIMATED_CONFIG.gestures,
  transitions: REANIMATED_CONFIG.transitions,
  effects: REANIMATED_CONFIG.effects,
  performance: REANIMATED_CONFIG.performance,
  componentAnimations: COMPONENT_ANIMATIONS,
  gestureConfigs: GESTURE_CONFIGS,
  visualEffects: VISUAL_EFFECTS,
  performanceConfig: PERFORMANCE_CONFIG,
};
