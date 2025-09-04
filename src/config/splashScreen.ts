import SplashScreen from 'react-native-splash-screen';
import { Platform } from 'react-native';

// Configuración del Splash Screen
export const SPLASH_SCREEN_CONFIG = {
  // Configuración general
  autoHide: true,
  hideOnTransition: true,
  
  // Configuración de animaciones
  animationDuration: 1000,
  fadeDuration: 500,
  
  // Configuración de personalización
  enableDynamicContent: true,
  enableSeasonalThemes: true,
  enableUserPreferences: true,
  
  // Configuración de branding
  brandColors: {
    primary: '#007AFF',
    secondary: '#34C759',
    accent: '#FF9500',
    background: '#FFFFFF',
    text: '#000000',
  },
  
  // Configuración de energía
  energyColors: {
    solar: '#FFD700',
    wind: '#87CEEB',
    hydro: '#4169E1',
    battery: '#32CD32',
    grid: '#FF6347',
  },
};

// Tipos de contenido dinámico
export const DYNAMIC_CONTENT_TYPES = {
  // Contenido estacional
  SEASONAL: {
    SPRING: 'spring',
    SUMMER: 'summer',
    AUTUMN: 'autumn',
    WINTER: 'winter',
  },
  
  // Contenido temático
  THEMATIC: {
    EARTH_DAY: 'earth_day',
    ENERGY_SAVING: 'energy_saving',
    SUSTAINABILITY: 'sustainability',
    GREEN_TECH: 'green_tech',
  },
  
  // Contenido personalizado
  CUSTOM: {
    USER_PREFERENCE: 'user_preference',
    TIME_BASED: 'time_based',
    LOCATION_BASED: 'location_based',
    WEATHER_BASED: 'weather_based',
  },
};

// Configuración de temas estacionales
export const SEASONAL_THEMES = {
  spring: {
    background: '#F0FFF0',
    primaryColor: '#228B22',
    secondaryColor: '#FF69B4',
    icon: '🌸',
    message: 'Energía renovable en primavera',
  },
  summer: {
    background: '#FFF8DC',
    primaryColor: '#FFD700',
    secondaryColor: '#87CEEB',
    icon: '☀️',
    message: 'Energía solar en verano',
  },
  autumn: {
    background: '#FFF5EE',
    primaryColor: '#8B4513',
    secondaryColor: '#FF6347',
    icon: '🍂',
    message: 'Energía sostenible en otoño',
  },
  winter: {
    background: '#F0F8FF',
    primaryColor: '#4169E1',
    secondaryColor: '#87CEEB',
    icon: '❄️',
    message: 'Energía eficiente en invierno',
  },
};

// Configuración de temas especiales
export const SPECIAL_THEMES = {
  earth_day: {
    background: '#E8F5E8',
    primaryColor: '#228B22',
    secondaryColor: '#32CD32',
    icon: '🌍',
    message: 'Celebrando el Día de la Tierra',
    duration: 24 * 60 * 60 * 1000, // 24 horas
  },
  energy_saving: {
    background: '#FFF8DC',
    primaryColor: '#FFD700',
    secondaryColor: '#FF6347',
    icon: '💡',
    message: 'Ahorra energía, salva el planeta',
    duration: 7 * 24 * 60 * 60 * 1000, // 1 semana
  },
  sustainability: {
    background: '#F0FFF0',
    primaryColor: '#228B22',
    secondaryColor: '#87CEEB',
    icon: '🌱',
    message: 'Construyendo un futuro sostenible',
    duration: 30 * 24 * 60 * 60 * 1000, // 1 mes
  },
};

// Hook para obtener tema dinámico
export const useDynamicSplashTheme = () => {
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  };

  const getSpecialTheme = () => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth();
    
    // Día de la Tierra (22 de abril)
    if (month === 3 && date === 22) {
      return SPECIAL_THEMES.earth_day;
    }
    
    // Semana de ahorro de energía (primer lunes de octubre)
    if (month === 9 && now.getDay() === 1) {
      return SPECIAL_THEMES.energy_saving;
    }
    
    return null;
  };

  // Obtener tema dinámico remoto (para eventos no programables)
  const getRemoteTheme = async () => {
    try {
      const { dynamicContentService } = await import('../services/dynamicContentService');
      const content = await dynamicContentService.getSplashContent();
      
      if (content) {
        return {
          background: content.colors.background,
          primaryColor: content.colors.primary,
          secondaryColor: content.colors.secondary,
          text: content.colors.text,
          icon: content.icon,
          message: content.message,
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error obteniendo tema remoto:', error);
      return null;
    }
  };

  // Obtener evento especial más relevante
  const getRelevantEvent = async (userCountry?: string) => {
    try {
      const { dynamicContentService } = await import('../services/dynamicContentService');
      const event = await dynamicContentService.getMostRelevantEvent(userCountry);
      
      if (event) {
        return {
          background: event.content.colors.background,
          primaryColor: event.content.colors.primary,
          secondaryColor: event.content.colors.secondary,
          text: event.content.colors.text,
          icon: event.content.icon,
          message: event.content.message,
          eventName: event.name,
          eventType: event.type,
        };
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error obteniendo evento relevante:', error);
      return null;
    }
  };

  const getThemeBasedOnTime = () => {
    const timeOfDay = getCurrentTime();
    const baseTheme = SEASONAL_THEMES[getCurrentSeason()];
    
    switch (timeOfDay) {
      case 'morning':
        return {
          ...baseTheme,
          background: '#FFF8DC',
          message: 'Buenos días, energía renovable te espera',
        };
      case 'afternoon':
        return {
          ...baseTheme,
          background: '#FFF5EE',
          message: 'Energía solar en su máximo esplendor',
        };
      case 'evening':
        return {
          ...baseTheme,
          background: '#F0F8FF',
          message: 'Preparando la energía para la noche',
        };
      case 'night':
        return {
          ...baseTheme,
          background: '#1C1C1E',
          text: '#FFFFFF',
          message: 'Energía eficiente durante la noche',
        };
      default:
        return baseTheme;
    }
  };

  return {
    getCurrentSeason,
    getCurrentTime,
    getSpecialTheme,
    getThemeBasedOnTime,
    getRemoteTheme,
    getRelevantEvent,
  };
};

// Funciones de control del Splash Screen
export const SplashScreenManager = {
  // Mostrar splash screen
  show: () => {
    try {
      SplashScreen.show();
      console.log('✅ Splash Screen mostrado');
    } catch (error) {
      console.error('❌ Error mostrando Splash Screen:', error);
    }
  },

  // Ocultar splash screen
  hide: () => {
    try {
      SplashScreen.hide();
      console.log('✅ Splash Screen ocultado');
    } catch (error) {
      console.error('❌ Error ocultando Splash Screen:', error);
    }
  },

  // Ocultar con animación
  hideWithAnimation: (duration: number = 500) => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
        console.log('✅ Splash Screen ocultado con animación');
      }, duration);
    } catch (error) {
      console.error('❌ Error ocultando Splash Screen con animación:', error);
    }
  },

  // Verificar si está visible
  isVisible: (): boolean => {
    try {
      // Esta función no existe en la API, pero podemos trackear el estado
      return false; // Por defecto asumimos que no está visible
    } catch (error) {
      console.error('❌ Error verificando visibilidad del Splash Screen:', error);
      return false;
    }
  },

  // Configurar tema dinámico
  setDynamicTheme: (theme: any) => {
    try {
      // Aquí podrías actualizar el tema del splash screen
      // Esto requeriría configuración nativa adicional
      console.log('🎨 Tema dinámico configurado:', theme);
    } catch (error) {
      console.error('❌ Error configurando tema dinámico:', error);
    }
  },

  // Configurar contenido personalizado
  setCustomContent: (content: {
    icon?: string;
    message?: string;
    colors?: {
      background?: string;
      primary?: string;
      secondary?: string;
      text?: string;
    };
  }) => {
    try {
      // Aquí podrías actualizar el contenido del splash screen
      console.log('🎨 Contenido personalizado configurado:', content);
    } catch (error) {
      console.error('❌ Error configurando contenido personalizado:', error);
    }
  },
};

// Hook para usar Splash Screen
export const useSplashScreen = () => {
  const { getCurrentSeason, getCurrentTime, getSpecialTheme, getThemeBasedOnTime, getRemoteTheme, getRelevantEvent } = useDynamicSplashTheme();

  const showSplashScreen = () => {
    SplashScreenManager.show();
  };

  const hideSplashScreen = () => {
    SplashScreenManager.hide();
  };

  const hideSplashScreenWithAnimation = (duration?: number) => {
    SplashScreenManager.hideWithAnimation(duration);
  };

  const getCurrentTheme = () => {
    // Prioridad: Tema especial > Tema basado en tiempo > Tema estacional
    const specialTheme = getSpecialTheme();
    if (specialTheme) {
      return specialTheme;
    }

    const timeBasedTheme = getThemeBasedOnTime();
    return timeBasedTheme;
  };

  const getDynamicTheme = async (userCountry?: string) => {
    try {
      // Prioridad: Evento remoto > Tema remoto > Tema local
      const relevantEvent = await getRelevantEvent(userCountry);
      if (relevantEvent) {
        return relevantEvent;
      }

      const remoteTheme = await getRemoteTheme();
      if (remoteTheme) {
        return remoteTheme;
      }

      // Fallback a tema local
      return getCurrentTheme();
    } catch (error) {
      console.error('❌ Error obteniendo tema dinámico:', error);
      return getCurrentTheme();
    }
  };

  const setSeasonalTheme = () => {
    const theme = getCurrentTheme();
    SplashScreenManager.setDynamicTheme(theme);
  };

  const setCustomTheme = (customTheme: any) => {
    SplashScreenManager.setCustomContent(customTheme);
  };

  const setDynamicTheme = async (userCountry?: string) => {
    try {
      const theme = await getDynamicTheme(userCountry);
      SplashScreenManager.setDynamicTheme(theme);
      return theme;
    } catch (error) {
      console.error('❌ Error configurando tema dinámico:', error);
      return null;
    }
  };

  return {
    showSplashScreen,
    hideSplashScreen,
    hideSplashScreenWithAnimation,
    getCurrentTheme,
    getDynamicTheme,
    setSeasonalTheme,
    setCustomTheme,
    setDynamicTheme,
    getCurrentSeason,
    getCurrentTime,
    getSpecialTheme,
    isVisible: SplashScreenManager.isVisible,
  };
};

// Configuración de animaciones
export const SPLASH_ANIMATIONS = {
  // Animaciones de entrada
  entrance: {
    fadeIn: {
      duration: 500,
      easing: 'ease-in',
    },
    slideUp: {
      duration: 800,
      easing: 'ease-out',
    },
    scaleIn: {
      duration: 600,
      easing: 'ease-out',
    },
  },
  
  // Animaciones de salida
  exit: {
    fadeOut: {
      duration: 500,
      easing: 'ease-out',
    },
    slideDown: {
      duration: 800,
      easing: 'ease-in',
    },
    scaleOut: {
      duration: 600,
      easing: 'ease-in',
    },
  },
  
  // Animaciones de contenido
  content: {
    logoPulse: {
      duration: 2000,
      easing: 'ease-in-out',
      repeat: true,
    },
    textFade: {
      duration: 1000,
      easing: 'ease-in',
      delay: 500,
    },
    iconRotate: {
      duration: 3000,
      easing: 'linear',
      repeat: true,
    },
  },
};

// Configuración de contenido dinámico
export const DYNAMIC_CONTENT_CONFIG = {
  // API para obtener contenido dinámico
  api: {
    baseUrl: 'https://api.openenergycoop.com/splash-content',
    timeout: 5000,
    retryAttempts: 3,
  },
  
  // Configuración de caché
  cache: {
    enabled: true,
    duration: 24 * 60 * 60 * 1000, // 24 horas
    key: 'splash_content_cache',
  },
  
  // Configuración de fallback
  fallback: {
    enabled: true,
    content: {
      icon: '⚡',
      message: 'Energía renovable para todos',
      colors: {
        background: '#FFFFFF',
        primary: '#007AFF',
        secondary: '#34C759',
        text: '#000000',
      },
    },
  },
};

// Configuración de personalización avanzada
export const ADVANCED_CUSTOMIZATION = {
  // Configuración de efectos visuales
  visualEffects: {
    blur: {
      enabled: true,
      intensity: 10,
    },
    gradient: {
      enabled: true,
      colors: ['#007AFF', '#34C759'],
      direction: 'to bottom',
    },
    shadow: {
      enabled: true,
      color: '#000000',
      opacity: 0.3,
      radius: 10,
    },
  },
  
  // Configuración de animaciones avanzadas
  advancedAnimations: {
    particleSystem: {
      enabled: false, // Requiere configuración nativa adicional
      particleCount: 50,
      particleColor: '#007AFF',
    },
    morphing: {
      enabled: false, // Requiere configuración nativa adicional
      duration: 2000,
    },
  },
  
  // Configuración de interactividad
  interactivity: {
    touchEnabled: false,
    gestureEnabled: false,
    hapticFeedback: false,
  },
};
