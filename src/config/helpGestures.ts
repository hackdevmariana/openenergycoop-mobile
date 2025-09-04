import { Platform, Dimensions } from 'react-native';

// Configuración de gestos de ayuda
export const HELP_GESTURES_CONFIG = {
  // Gesto principal de ayuda (deslizar hacia abajo desde la parte superior)
  helpSwipe: {
    enabled: true,
    direction: 'vertical',
    startArea: 'top', // Área de inicio en la parte superior
    minDistance: 80, // Distancia mínima para activar
    maxDistance: 200, // Distancia máxima
    velocity: 500, // Velocidad mínima
    duration: 300, // Duración máxima del gesto
    triggerZone: {
      top: 0,
      bottom: 100, // Solo los primeros 100px de la pantalla
      left: 0,
      right: '100%',
    },
  },

  // Gesto de ayuda contextual (doble toque largo)
  contextualHelp: {
    enabled: true,
    type: 'longPress',
    duration: 1000, // 1 segundo de presión
    maxDistance: 10, // Máxima distancia de movimiento
    feedback: {
      haptic: true,
      visual: true,
      sound: false,
    },
  },

  // Gesto de ayuda rápida (deslizar desde el borde derecho)
  quickHelp: {
    enabled: true,
    direction: 'horizontal',
    startArea: 'right',
    minDistance: 60,
    maxDistance: 150,
    velocity: 400,
    triggerZone: {
      top: 0,
      bottom: '100%',
      left: '80%', // Solo el 20% derecho de la pantalla
      right: '100%',
    },
  },

  // Gesto de ayuda de pantalla completa (deslizar desde esquina)
  fullScreenHelp: {
    enabled: true,
    direction: 'diagonal',
    startArea: 'topRight',
    minDistance: 100,
    maxDistance: 250,
    velocity: 300,
    triggerZone: {
      top: 0,
      bottom: 150,
      left: '70%',
      right: '100%',
    },
  },

  // Configuración por plataforma
  platform: {
    ios: {
      hapticFeedback: true,
      soundFeedback: false,
      visualFeedback: true,
      gestureSensitivity: 'high',
    },
    android: {
      hapticFeedback: true,
      soundFeedback: true,
      visualFeedback: true,
      gestureSensitivity: 'medium',
    },
  },

  // Configuración de animaciones de ayuda
  animations: {
    helpPanel: {
      enter: {
        type: 'slide',
        direction: 'top',
        duration: 300,
        easing: 'easeOut',
      },
      exit: {
        type: 'slide',
        direction: 'top',
        duration: 250,
        easing: 'easeIn',
      },
    },
    tooltip: {
      enter: {
        type: 'fade',
        duration: 200,
        easing: 'easeOut',
      },
      exit: {
        type: 'fade',
        duration: 150,
        easing: 'easeIn',
      },
    },
    highlight: {
      enter: {
        type: 'scale',
        duration: 300,
        easing: 'easeOut',
      },
      exit: {
        type: 'scale',
        duration: 200,
        easing: 'easeIn',
      },
    },
  },

  // Configuración de contenido de ayuda
  content: {
    // Ayuda general por pantalla
    screens: {
      home: {
        title: 'Pantalla de Inicio',
        description: 'Esta es la pantalla principal de la aplicación',
        sections: [
          {
            title: 'Acciones Rápidas',
            description: 'Accede a las funciones más importantes',
            elements: ['Ver Dashboard', 'Probar Gestos', 'Cambiar Tema'],
          },
          {
            title: 'Estado del Sistema',
            description: 'Información sobre el estado actual',
            elements: ['Conexión', 'Tema', 'Última actualización'],
          },
          {
            title: 'Estadísticas',
            description: 'Datos de consumo y producción',
            elements: ['Consumo', 'Producción', 'Eficiencia'],
          },
        ],
        gestures: [
          {
            gesture: 'Deslizar hacia abajo desde arriba',
            action: 'Mostrar ayuda completa',
          },
          {
            gesture: 'Doble toque largo en elementos',
            action: 'Ayuda contextual',
          },
          {
            gesture: 'Deslizar desde el borde derecho',
            action: 'Ayuda rápida',
          },
        ],
      },
      dashboard: {
        title: 'Dashboard',
        description: 'Panel de control y análisis de datos',
        sections: [
          {
            title: 'Gráficos',
            description: 'Visualización de datos de energía',
            elements: ['Consumo', 'Producción', 'Tendencias'],
          },
          {
            title: 'Métricas',
            description: 'Indicadores clave de rendimiento',
            elements: ['Eficiencia', 'Ahorro', 'Objetivos'],
          },
        ],
        gestures: [
          {
            gesture: 'Deslizar hacia abajo desde arriba',
            action: 'Mostrar ayuda completa',
          },
          {
            gesture: 'Toque largo en gráficos',
            action: 'Detalles del gráfico',
          },
        ],
      },
      gestures: {
        title: 'Demostración de Gestos',
        description: 'Prueba los gestos de navegación',
        sections: [
          {
            title: 'Gestos de Navegación',
            description: 'Cómo navegar entre pantallas',
            elements: ['Deslizar izquierda-derecha', 'Botones de navegación'],
          },
          {
            title: 'Configuración',
            description: 'Ajustes de gestos y animaciones',
            elements: ['Sensibilidad', 'Animaciones', 'Dirección'],
          },
        ],
        gestures: [
          {
            gesture: 'Deslizar hacia abajo desde arriba',
            action: 'Mostrar ayuda completa',
          },
          {
            gesture: 'Deslizar desde esquina superior derecha',
            action: 'Modo tutorial',
          },
        ],
      },
      detail: {
        title: 'Pantalla de Detalle',
        description: 'Información detallada y navegación',
        sections: [
          {
            title: 'Navegación',
            description: 'Cómo volver atrás y navegar',
            elements: ['Gesto de volver', 'Botones de navegación'],
          },
          {
            title: 'Configuración',
            description: 'Ajustes de la pantalla',
            elements: ['Gestos', 'Animaciones', 'Presentación'],
          },
        ],
        gestures: [
          {
            gesture: 'Deslizar hacia abajo desde arriba',
            action: 'Mostrar ayuda completa',
          },
          {
            gesture: 'Deslizar desde el borde derecho',
            action: 'Opciones rápidas',
          },
        ],
      },
    },

    // Ayuda contextual por elemento
    elements: {
      button: {
        title: 'Botón',
        description: 'Elemento interactivo para realizar acciones',
        usage: 'Toca para ejecutar la acción',
        tips: [
          'Mantén presionado para ver opciones adicionales',
          'Doble toque para acción rápida',
        ],
      },
      card: {
        title: 'Tarjeta',
        description: 'Contenedor de información agrupada',
        usage: 'Muestra contenido relacionado',
        tips: [
          'Desliza para ver más contenido',
          'Toque largo para opciones',
        ],
      },
      chart: {
        title: 'Gráfico',
        description: 'Visualización de datos',
        usage: 'Muestra tendencias y comparaciones',
        tips: [
          'Toque para ver detalles',
          'Desliza para cambiar período',
          'Pellizca para zoom',
        ],
      },
      navigation: {
        title: 'Navegación',
        description: 'Sistema de navegación entre pantallas',
        usage: 'Mueve entre diferentes secciones',
        tips: [
          'Desliza de izquierda a derecha para volver',
          'Usa las pestañas para navegación rápida',
        ],
      },
    },

    // Mensajes de ayuda general
    general: {
      welcome: 'Bienvenido a OpenEnergyCoop',
      helpAvailable: 'Ayuda disponible en cualquier momento',
      gestureHint: 'Desliza hacia abajo desde arriba para ayuda',
      contextualHint: 'Mantén presionado para ayuda contextual',
      quickHint: 'Desliza desde el borde derecho para ayuda rápida',
    },
  },

  // Configuración de feedback
  feedback: {
    haptic: {
      enabled: true,
      types: {
        success: 'success',
        warning: 'warning',
        error: 'error',
        light: 'light',
        medium: 'medium',
        heavy: 'heavy',
      },
    },
    visual: {
      enabled: true,
      types: {
        highlight: {
          backgroundColor: 'rgba(0, 122, 255, 0.2)',
          borderColor: '#007AFF',
          borderWidth: 2,
          borderRadius: 8,
        },
        pulse: {
          scale: 1.1,
          duration: 1000,
          repeat: 3,
        },
        shake: {
          translateX: [-10, 10],
          duration: 100,
          repeat: 3,
        },
      },
    },
    sound: {
      enabled: false,
      types: {
        tap: 'tap.mp3',
        success: 'success.mp3',
        error: 'error.mp3',
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
      largeText: true,
      highContrast: true,
      reduceMotion: true,
    },
    announcements: {
      helpActivated: 'Ayuda activada',
      helpDeactivated: 'Ayuda desactivada',
      contextualHelp: 'Ayuda contextual disponible',
      gestureDetected: 'Gesto de ayuda detectado',
    },
  },

  // Configuración de rendimiento
  performance: {
    enabled: true,
    optimizations: {
      lazyLoading: true,
      caching: true,
      preloading: false,
      debouncing: true,
    },
    limits: {
      maxHelpPanels: 3,
      maxTooltips: 5,
      maxHighlights: 10,
      cacheSize: 50,
    },
  },
};

// Configuraciones específicas por tipo de ayuda
export const HELP_TYPES = {
  // Panel de ayuda completo
  fullPanel: {
    type: 'panel',
    position: 'top',
    animation: 'slide',
    duration: 300,
    overlay: true,
    dismissible: true,
    gestures: ['swipeDown', 'tapOutside'],
  },

  // Tooltip contextual
  tooltip: {
    type: 'tooltip',
    position: 'auto',
    animation: 'fade',
    duration: 200,
    overlay: false,
    dismissible: true,
    gestures: ['tapOutside', 'swipe'],
  },

  // Highlight de elemento
  highlight: {
    type: 'highlight',
    position: 'element',
    animation: 'scale',
    duration: 300,
    overlay: false,
    dismissible: false,
    gestures: ['auto'],
  },

  // Guía paso a paso
  tutorial: {
    type: 'tutorial',
    position: 'overlay',
    animation: 'fade',
    duration: 500,
    overlay: true,
    dismissible: true,
    gestures: ['tapOutside', 'swipe'],
  },

  // Ayuda rápida
  quick: {
    type: 'quick',
    position: 'right',
    animation: 'slide',
    duration: 250,
    overlay: false,
    dismissible: true,
    gestures: ['swipeLeft', 'tapOutside'],
  },
};

// Configuraciones específicas por pantalla
export const SCREEN_HELP_CONFIGS = {
  home: {
    gestures: ['helpSwipe', 'contextualHelp', 'quickHelp'],
    content: HELP_GESTURES_CONFIG.content.screens.home,
    elements: ['button', 'card', 'navigation'],
  },
  dashboard: {
    gestures: ['helpSwipe', 'contextualHelp'],
    content: HELP_GESTURES_CONFIG.content.screens.dashboard,
    elements: ['chart', 'card', 'navigation'],
  },
  gestures: {
    gestures: ['helpSwipe', 'fullScreenHelp'],
    content: HELP_GESTURES_CONFIG.content.screens.gestures,
    elements: ['button', 'card', 'navigation'],
  },
  detail: {
    gestures: ['helpSwipe', 'quickHelp'],
    content: HELP_GESTURES_CONFIG.content.screens.detail,
    elements: ['button', 'card', 'navigation'],
  },
};

// Función para obtener configuración de ayuda por pantalla
export const getHelpConfig = (screenName: keyof typeof SCREEN_HELP_CONFIGS) => {
  return SCREEN_HELP_CONFIGS[screenName] || SCREEN_HELP_CONFIGS.home;
};

// Función para obtener configuración de gestos
export const getGestureConfig = (gestureType: keyof typeof HELP_GESTURES_CONFIG) => {
  return HELP_GESTURES_CONFIG[gestureType];
};

// Función para obtener configuración de ayuda por elemento
export const getElementHelpConfig = (elementType: keyof typeof HELP_GESTURES_CONFIG.content.elements) => {
  return HELP_GESTURES_CONFIG.content.elements[elementType];
};

// Exportar configuración completa
export const helpGesturesConfig = {
  gestures: HELP_GESTURES_CONFIG,
  types: HELP_TYPES,
  screens: SCREEN_HELP_CONFIGS,
  getHelpConfig,
  getGestureConfig,
  getElementHelpConfig,
};
