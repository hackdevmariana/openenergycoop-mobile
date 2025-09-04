import { Platform, Dimensions } from 'react-native';

// Configuración para react-native-svg
export const SVG_CONFIG = {
  // Configuración básica
  basic: {
    enabled: true,
    version: '15.12.1',
    platform: {
      ios: {
        supported: true,
        minVersion: '12.0',
      },
      android: {
        supported: true,
        minVersion: '21',
      },
    },
  },

  // Configuración de rendimiento
  performance: {
    // Optimización de renderizado
    optimization: {
      enableOptimization: true,
      useNativeDriver: true,
      enableHardwareAcceleration: true,
    },

    // Configuración de caché
    cache: {
      enableCache: true,
      maxCacheSize: 100, // Número máximo de SVGs en caché
      cacheExpiration: 300000, // 5 minutos en ms
    },

    // Configuración de memoria
    memory: {
      enableMemoryOptimization: true,
      maxMemoryUsage: 50 * 1024 * 1024, // 50MB
      cleanupInterval: 60000, // 1 minuto
    },

    // Configuración de renderizado
    rendering: {
      enableAsyncRendering: true,
      enableProgressiveRendering: true,
      renderQuality: 'high', // 'low' | 'medium' | 'high'
    },
  },

  // Configuración de componentes SVG
  components: {
    // Configuración de Svg
    Svg: {
      defaultProps: {
        width: '100%',
        height: '100%',
        viewBox: '0 0 100 100',
        preserveAspectRatio: 'xMidYMid meet',
      },
      variants: {
        small: {
          width: 16,
          height: 16,
        },
        medium: {
          width: 24,
          height: 24,
        },
        large: {
          width: 32,
          height: 32,
        },
        xlarge: {
          width: 48,
          height: 48,
        },
      },
    },

    // Configuración de Path
    Path: {
      defaultProps: {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 1,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      variants: {
        thin: {
          strokeWidth: 0.5,
        },
        normal: {
          strokeWidth: 1,
        },
        thick: {
          strokeWidth: 2,
        },
        bold: {
          strokeWidth: 3,
        },
      },
    },

    // Configuración de Circle
    Circle: {
      defaultProps: {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 1,
      },
    },

    // Configuración de Rect
    Rect: {
      defaultProps: {
        fill: 'none',
        stroke: '#000000',
        strokeWidth: 1,
        rx: 0,
        ry: 0,
      },
    },

    // Configuración de Line
    Line: {
      defaultProps: {
        stroke: '#000000',
        strokeWidth: 1,
        strokeLinecap: 'round',
      },
    },

    // Configuración de Text
    Text: {
      defaultProps: {
        fill: '#000000',
        fontSize: 12,
        fontFamily: 'System',
        textAnchor: 'start',
      },
    },
  },

  // Configuración de colores y temas
  colors: {
    // Colores de energía
    energy: {
      solar: '#FFD700',
      wind: '#87CEEB',
      hydro: '#4169E1',
      nuclear: '#FF6347',
      coal: '#696969',
      gas: '#FFA500',
    },

    // Colores de estado
    status: {
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
      info: '#007AFF',
      neutral: '#8E8E93',
    },

    // Colores de consumo
    consumption: {
      low: '#34C759',
      medium: '#FF9500',
      high: '#FF3B30',
      critical: '#FF0000',
    },

    // Colores de eficiencia
    efficiency: {
      excellent: '#34C759',
      good: '#30D158',
      average: '#FF9500',
      poor: '#FF3B30',
    },
  },

  // Configuración de animaciones
  animations: {
    // Configuración de animaciones básicas
    basic: {
      duration: 300,
      easing: 'easeInOut',
      delay: 0,
    },

    // Configuración de animaciones de energía
    energy: {
      pulse: {
        duration: 1000,
        easing: 'easeInOut',
        repeat: -1,
      },
      flow: {
        duration: 2000,
        easing: 'linear',
        repeat: -1,
      },
      spark: {
        duration: 500,
        easing: 'easeOut',
        repeat: 3,
      },
    },

    // Configuración de animaciones de carga
    loading: {
      spinner: {
        duration: 1000,
        easing: 'linear',
        repeat: -1,
      },
      progress: {
        duration: 500,
        easing: 'easeInOut',
      },
      wave: {
        duration: 1500,
        easing: 'easeInOut',
        repeat: -1,
      },
    },

    // Configuración de animaciones de transición
    transition: {
      fade: {
        duration: 200,
        easing: 'easeInOut',
      },
      scale: {
        duration: 300,
        easing: 'easeOut',
      },
      slide: {
        duration: 400,
        easing: 'easeInOut',
      },
    },
  },

  // Configuración de gradientes
  gradients: {
    // Gradientes de energía
    energy: {
      solar: {
        colors: ['#FFD700', '#FFA500', '#FF6347'],
        locations: [0, 0.5, 1],
      },
      wind: {
        colors: ['#87CEEB', '#4169E1', '#000080'],
        locations: [0, 0.5, 1],
      },
      hydro: {
        colors: ['#4169E1', '#0000CD', '#000080'],
        locations: [0, 0.5, 1],
      },
    },

    // Gradientes de estado
    status: {
      success: {
        colors: ['#34C759', '#30D158'],
        locations: [0, 1],
      },
      warning: {
        colors: ['#FF9500', '#FF8C00'],
        locations: [0, 1],
      },
      error: {
        colors: ['#FF3B30', '#FF0000'],
        locations: [0, 1],
      },
    },

    // Gradientes de consumo
    consumption: {
      low: {
        colors: ['#34C759', '#30D158'],
        locations: [0, 1],
      },
      medium: {
        colors: ['#FF9500', '#FF8C00'],
        locations: [0, 1],
      },
      high: {
        colors: ['#FF3B30', '#FF0000'],
        locations: [0, 1],
      },
    },
  },

  // Configuración de patrones
  patterns: {
    // Patrones de energía
    energy: {
      solar: {
        type: 'radial',
        spacing: 10,
        size: 5,
      },
      wind: {
        type: 'linear',
        spacing: 15,
        size: 3,
      },
      hydro: {
        type: 'wave',
        spacing: 20,
        size: 8,
      },
    },

    // Patrones de estado
    status: {
      success: {
        type: 'dots',
        spacing: 8,
        size: 2,
      },
      warning: {
        type: 'stripes',
        spacing: 12,
        size: 4,
      },
      error: {
        type: 'crosshatch',
        spacing: 10,
        size: 3,
      },
    },
  },

  // Configuración de accesibilidad
  accessibility: {
    enabled: true,
    features: {
      screenReader: true,
      voiceOver: true,
      talkBack: true,
      highContrast: true,
      reduceMotion: true,
    },
    announcements: {
      svgLoaded: 'Gráfico SVG cargado',
      svgError: 'Error al cargar el gráfico SVG',
      svgInteraction: 'Interacción con gráfico SVG',
    },
  },

  // Configuración de debugging
  debugging: {
    enabled: false,
    features: {
      logRendering: false,
      logPerformance: false,
      logErrors: true,
      showBoundingBox: false,
      showGrid: false,
    },
    logging: {
      level: 'error', // 'debug' | 'info' | 'warn' | 'error'
      includeTimestamps: true,
      includePerformance: false,
    },
  },

  // Configuración de exportación
  export: {
    // Configuración de exportación a PNG
    png: {
      enabled: true,
      quality: 1.0,
      scale: 2,
      backgroundColor: '#FFFFFF',
    },

    // Configuración de exportación a PDF
    pdf: {
      enabled: false,
      quality: 'high',
      scale: 1,
    },

    // Configuración de exportación a SVG
    svg: {
      enabled: true,
      includeMetadata: true,
      optimize: true,
    },
  },

  // Configuración de responsive
  responsive: {
    enabled: true,
    breakpoints: {
      small: 320,
      medium: 768,
      large: 1024,
      xlarge: 1200,
    },
    scaling: {
      mode: 'proportional', // 'proportional' | 'fixed' | 'adaptive'
      minScale: 0.5,
      maxScale: 2.0,
    },
  },

  // Configuración de seguridad
  security: {
    enabled: true,
    features: {
      sanitizeInput: true,
      validateAttributes: true,
      blockExternalResources: true,
      allowList: {
        elements: ['svg', 'path', 'circle', 'rect', 'line', 'text', 'g', 'defs', 'linearGradient', 'radialGradient', 'stop'],
        attributes: ['width', 'height', 'viewBox', 'fill', 'stroke', 'strokeWidth', 'd', 'cx', 'cy', 'r', 'x', 'y', 'x1', 'y1', 'x2', 'y2'],
      },
    },
  },
};

// Configuraciones específicas por plataforma
export const PLATFORM_SVG_CONFIG = {
  ios: {
    ...SVG_CONFIG,
    performance: {
      ...SVG_CONFIG.performance,
      useMetalRenderer: true,
      enableHardwareAcceleration: true,
    },
  },
  android: {
    ...SVG_CONFIG,
    performance: {
      ...SVG_CONFIG.performance,
      useOpenGLRenderer: true,
      enableHardwareAcceleration: true,
    },
  },
};

// Configuraciones específicas por tamaño de pantalla
export const SCREEN_SIZE_SVG_CONFIG = {
  small: {
    ...SVG_CONFIG,
    components: {
      ...SVG_CONFIG.components,
      Svg: {
        ...SVG_CONFIG.components.Svg,
        variants: {
          small: { width: 12, height: 12 },
          medium: { width: 16, height: 16 },
          large: { width: 24, height: 24 },
          xlarge: { width: 32, height: 32 },
        },
      },
    },
  },
  medium: {
    ...SVG_CONFIG,
    components: {
      ...SVG_CONFIG.components,
      Svg: {
        ...SVG_CONFIG.components.Svg,
        variants: {
          small: { width: 16, height: 16 },
          medium: { width: 24, height: 24 },
          large: { width: 32, height: 32 },
          xlarge: { width: 48, height: 48 },
        },
      },
    },
  },
  large: {
    ...SVG_CONFIG,
    components: {
      ...SVG_CONFIG.components,
      Svg: {
        ...SVG_CONFIG.components.Svg,
        variants: {
          small: { width: 20, height: 20 },
          medium: { width: 32, height: 32 },
          large: { width: 48, height: 48 },
          xlarge: { width: 64, height: 64 },
        },
      },
    },
  },
};

// Función para obtener configuración según plataforma
export const getPlatformSVGConfig = () => {
  return PLATFORM_SVG_CONFIG[Platform.OS] || SVG_CONFIG;
};

// Función para obtener configuración según tamaño de pantalla
export const getScreenSizeSVGConfig = () => {
  const { width } = Dimensions.get('window');
  if (width < 768) return SCREEN_SIZE_SVG_CONFIG.small;
  if (width < 1024) return SCREEN_SIZE_SVG_CONFIG.medium;
  return SCREEN_SIZE_SVG_CONFIG.large;
};

// Función para obtener configuración completa
export const getCompleteSVGConfig = () => {
  const platformConfig = getPlatformSVGConfig();
  const screenSizeConfig = getScreenSizeSVGConfig();
  
  return {
    ...platformConfig,
    components: {
      ...platformConfig.components,
      ...screenSizeConfig.components,
    },
  };
};

// Exportar configuración por defecto
export const svgConfig = getCompleteSVGConfig();
