import { PostHog } from 'posthog-react-native';
import { Platform } from 'react-native';

// Configuración de PostHog
export const POSTHOG_CONFIG = {
  // URL de tu instancia de PostHog (puede ser self-hosted o cloud)
  apiKey: process.env.POSTHOG_API_KEY || 'YOUR_POSTHOG_API_KEY',
  host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
  
  // Configuración específica para React Native
  enable: __DEV__ ? false : true, // Deshabilitar en desarrollo
  captureApplicationLifecycleEvents: true,
  recordScreenViews: true,
  enableAutomaticSessionRecording: false, // Deshabilitar grabación automática por privacidad
  
  // Configuración de eventos
  flushAt: 20, // Enviar eventos cada 20 eventos
  flushInterval: 30000, // Enviar eventos cada 30 segundos
  
  // Configuración de debug
  debug: __DEV__,
  
  // Configuración de persistencia
  persistence: 'localStorage',
  
  // Configuración de propiedades por defecto
  defaultProperties: {
    platform: Platform.OS,
    app_version: '1.0.0',
    app_name: 'OpenEnergyCoop Mobile',
  },
};

// Instancia global de PostHog
let posthogInstance: PostHog | null = null;

// Inicializar PostHog
export const initPostHog = async () => {
  try {
    if (!posthogInstance) {
      posthogInstance = new PostHog(POSTHOG_CONFIG.apiKey, {
        host: POSTHOG_CONFIG.host,
        enable: POSTHOG_CONFIG.enable,
        captureApplicationLifecycleEvents: POSTHOG_CONFIG.captureApplicationLifecycleEvents,
        recordScreenViews: POSTHOG_CONFIG.recordScreenViews,
        enableAutomaticSessionRecording: POSTHOG_CONFIG.enableAutomaticSessionRecording,
        flushAt: POSTHOG_CONFIG.flushAt,
        flushInterval: POSTHOG_CONFIG.flushInterval,
        debug: POSTHOG_CONFIG.debug,
        persistence: POSTHOG_CONFIG.persistence,
        defaultProperties: POSTHOG_CONFIG.defaultProperties,
      });

      await posthogInstance.init();
      
      if (__DEV__) {
        console.log('✅ PostHog inicializado correctamente');
      }
    }
    
    return posthogInstance;
  } catch (error) {
    console.error('❌ Error inicializando PostHog:', error);
    return null;
  }
};

// Obtener instancia de PostHog
export const getPostHog = (): PostHog | null => {
  return posthogInstance;
};

// Verificar si PostHog está habilitado
export const isPostHogEnabled = (): boolean => {
  return posthogInstance !== null && POSTHOG_CONFIG.enable;
};

// Eventos específicos para energía
export const ENERGY_EVENTS = {
  // Eventos de navegación
  SCREEN_VIEW: 'screen_view',
  NAVIGATION: 'navigation',
  
  // Eventos de energía
  ENERGY_CONSUMPTION_VIEWED: 'energy_consumption_viewed',
  ENERGY_COMPARISON_VIEWED: 'energy_comparison_viewed',
  ENERGY_DISTRIBUTION_VIEWED: 'energy_distribution_viewed',
  ENERGY_CHART_INTERACTION: 'energy_chart_interaction',
  
  // Eventos de gráficos
  CHART_ZOOM: 'chart_zoom',
  CHART_PAN: 'chart_pan',
  CHART_TOOLTIP_VIEWED: 'chart_tooltip_viewed',
  CHART_LEGEND_CLICKED: 'chart_legend_clicked',
  
  // Eventos de tema
  THEME_CHANGED: 'theme_changed',
  THEME_MODE_SELECTED: 'theme_mode_selected',
  
  // Eventos de usuario
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_PROFILE_UPDATED: 'user_profile_updated',
  
  // Eventos de configuración
  SETTINGS_CHANGED: 'settings_changed',
  NOTIFICATION_TOGGLED: 'notification_toggled',
  
  // Eventos de performance
  APP_LOAD_TIME: 'app_load_time',
  SCREEN_LOAD_TIME: 'screen_load_time',
  API_RESPONSE_TIME: 'api_response_time',
  
  // Eventos de errores
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
  VALIDATION_ERROR: 'validation_error',
};

// Propiedades específicas para energía
export const ENERGY_PROPERTIES = {
  // Tipos de energía
  ENERGY_TYPE: {
    SOLAR: 'solar',
    WIND: 'wind',
    HYDRO: 'hydro',
    BATTERY: 'battery',
    GRID: 'grid',
    NUCLEAR: 'nuclear',
    BIOMASS: 'biomass',
    GEOTHERMAL: 'geothermal',
  },
  
  // Tipos de gráficos
  CHART_TYPE: {
    LINE: 'line',
    BAR: 'bar',
    AREA: 'area',
    DONUT: 'donut',
    SCATTER: 'scatter',
  },
  
  // Períodos de tiempo
  TIME_PERIOD: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
  },
  
  // Temas
  THEME_MODE: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
};

// Funciones de utilidad para tracking
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
  userId?: string
) => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      if (userId) {
        posthog.identify(userId);
      }
      
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        ...properties,
      });
      
      if (__DEV__) {
        console.log(`📊 PostHog Event: ${eventName}`, properties);
      }
    }
  } catch (error) {
    console.error('❌ Error tracking event:', error);
  }
};

// Track eventos de energía
export const trackEnergyEvent = (
  eventName: string,
  energyType?: string,
  additionalProperties?: Record<string, any>
) => {
  trackEvent(eventName, {
    energy_type: energyType,
    ...additionalProperties,
  });
};

// Track eventos de gráficos
export const trackChartEvent = (
  eventName: string,
  chartType: string,
  additionalProperties?: Record<string, any>
) => {
  trackEvent(eventName, {
    chart_type: chartType,
    ...additionalProperties,
  });
};

// Track eventos de navegación
export const trackNavigationEvent = (
  screenName: string,
  previousScreen?: string,
  additionalProperties?: Record<string, any>
) => {
  trackEvent(ENERGY_EVENTS.NAVIGATION, {
    screen_name: screenName,
    previous_screen: previousScreen,
    ...additionalProperties,
  });
};

// Track eventos de tema
export const trackThemeEvent = (
  themeMode: string,
  additionalProperties?: Record<string, any>
) => {
  trackEvent(ENERGY_EVENTS.THEME_CHANGED, {
    theme_mode: themeMode,
    ...additionalProperties,
  });
};

// Track eventos de performance
export const trackPerformanceEvent = (
  metricName: string,
  value: number,
  unit: string = 'ms',
  additionalProperties?: Record<string, any>
) => {
  trackEvent(metricName, {
    value,
    unit,
    ...additionalProperties,
  });
};

// Track eventos de errores
export const trackErrorEvent = (
  errorType: string,
  errorMessage: string,
  errorStack?: string,
  additionalProperties?: Record<string, any>
) => {
  trackEvent(ENERGY_EVENTS.ERROR_OCCURRED, {
    error_type: errorType,
    error_message: errorMessage,
    error_stack: errorStack,
    ...additionalProperties,
  });
};

// Configurar usuario
export const setUser = (userId: string, userProperties?: Record<string, any>) => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      posthog.identify(userId, userProperties);
      
      if (__DEV__) {
        console.log(`👤 PostHog User: ${userId}`, userProperties);
      }
    }
  } catch (error) {
    console.error('❌ Error setting user:', error);
  }
};

// Configurar propiedades del usuario
export const setUserProperties = (properties: Record<string, any>) => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      posthog.set(properties);
      
      if (__DEV__) {
        console.log('👤 PostHog User Properties:', properties);
      }
    }
  } catch (error) {
    console.error('❌ Error setting user properties:', error);
  }
};

// Configurar propiedades del grupo
export const setGroupProperties = (
  groupType: string,
  groupKey: string,
  properties: Record<string, any>
) => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      posthog.group(groupType, groupKey, properties);
      
      if (__DEV__) {
        console.log(`👥 PostHog Group: ${groupType}/${groupKey}`, properties);
      }
    }
  } catch (error) {
    console.error('❌ Error setting group properties:', error);
  }
};

// Obtener propiedades del usuario
export const getUserProperties = async (): Promise<Record<string, any> | null> => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      return await posthog.getPersonProperties();
    }
    return null;
  } catch (error) {
    console.error('❌ Error getting user properties:', error);
    return null;
  }
};

// Limpiar datos del usuario
export const resetUser = () => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      posthog.reset();
      
      if (__DEV__) {
        console.log('🔄 PostHog User Reset');
      }
    }
  } catch (error) {
    console.error('❌ Error resetting user:', error);
  }
};

// Obtener ID del usuario
export const getUserId = async (): Promise<string | null> => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      return await posthog.getDistinctId();
    }
    return null;
  } catch (error) {
    console.error('❌ Error getting user ID:', error);
    return null;
  }
};

// Verificar si el usuario está en un experimento
export const isFeatureEnabled = (featureKey: string): boolean => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      return posthog.isFeatureEnabled(featureKey);
    }
    return false;
  } catch (error) {
    console.error('❌ Error checking feature flag:', error);
    return false;
  }
};

// Obtener valor de un experimento
export const getFeatureFlag = (featureKey: string): any => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      return posthog.getFeatureFlag(featureKey);
    }
    return null;
  } catch (error) {
    console.error('❌ Error getting feature flag:', error);
    return null;
  }
};

// Enviar eventos pendientes
export const flushEvents = () => {
  try {
    const posthog = getPostHog();
    if (posthog && isPostHogEnabled()) {
      posthog.flush();
      
      if (__DEV__) {
        console.log('📤 PostHog Events Flushed');
      }
    }
  } catch (error) {
    console.error('❌ Error flushing events:', error);
  }
};

// Configuración de experimentos
export const EXPERIMENT_CONFIG = {
  // Experimentos de UI
  UI_EXPERIMENTS: {
    NEW_CHART_DESIGN: 'new_chart_design',
    DARK_MODE_DEFAULT: 'dark_mode_default',
    SIMPLIFIED_NAVIGATION: 'simplified_navigation',
  },
  
  // Experimentos de funcionalidad
  FEATURE_EXPERIMENTS: {
    REAL_TIME_UPDATES: 'real_time_updates',
    ADVANCED_ANALYTICS: 'advanced_analytics',
    SOCIAL_FEATURES: 'social_features',
  },
  
  // Experimentos de onboarding
  ONBOARDING_EXPERIMENTS: {
    INTERACTIVE_TUTORIAL: 'interactive_tutorial',
    PROGRESSIVE_DISCLOSURE: 'progressive_disclosure',
    PERSONALIZED_CONTENT: 'personalized_content',
  },
};

// Hook para usar PostHog en componentes
export const usePostHog = () => {
  return {
    trackEvent,
    trackEnergyEvent,
    trackChartEvent,
    trackNavigationEvent,
    trackThemeEvent,
    trackPerformanceEvent,
    trackErrorEvent,
    setUser,
    setUserProperties,
    setGroupProperties,
    getUserProperties,
    resetUser,
    getUserId,
    isFeatureEnabled,
    getFeatureFlag,
    flushEvents,
    isEnabled: isPostHogEnabled,
  };
};
