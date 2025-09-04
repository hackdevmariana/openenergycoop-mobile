import { useEffect, useCallback, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  usePostHog,
  ENERGY_EVENTS,
  ENERGY_PROPERTIES,
  trackEnergyEvent,
  trackChartEvent,
  trackNavigationEvent,
  trackThemeEvent,
  trackPerformanceEvent,
  trackErrorEvent,
} from '../config/posthog';
import { useTheme } from './useTheme';
import { useAppStore } from '../stores/appStore';

// Hook para analytics específicos de energía
export const usePostHogAnalytics = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { themeMode } = useTheme();
  const { userProfile, isOnline } = useAppStore();
  const posthog = usePostHog();
  const screenStartTime = useRef<number>(Date.now());
  const lastScreenName = useRef<string>('');

  // Track navegación automática
  useEffect(() => {
    const currentScreenName = route.name;
    const currentTime = Date.now();
    const timeSpent = currentTime - screenStartTime.current;

    // Track tiempo en pantalla anterior
    if (lastScreenName.current && timeSpent > 1000) {
      trackNavigationEvent(lastScreenName.current, undefined, {
        time_spent_ms: timeSpent,
        action: 'screen_exit',
      });
    }

    // Track nueva pantalla
    if (currentScreenName !== lastScreenName.current) {
      trackNavigationEvent(currentScreenName, lastScreenName.current, {
        action: 'screen_enter',
      });

      lastScreenName.current = currentScreenName;
      screenStartTime.current = currentTime;
    }

    return () => {
      const exitTime = Date.now();
      const totalTimeSpent = exitTime - screenStartTime.current;
      
      if (totalTimeSpent > 1000) {
        trackNavigationEvent(currentScreenName, undefined, {
          time_spent_ms: totalTimeSpent,
          action: 'screen_exit',
        });
      }
    };
  }, [route.name]);

  // Track cambios de tema
  useEffect(() => {
    if (themeMode) {
      trackThemeEvent(themeMode, {
        previous_theme: lastScreenName.current,
        user_id: userProfile?.id,
      });
    }
  }, [themeMode, userProfile?.id]);

  // Track estado de conexión
  useEffect(() => {
    posthog.trackEvent('connection_status_changed', {
      is_online: isOnline,
      user_id: userProfile?.id,
    });
  }, [isOnline, userProfile?.id]);

  // Track eventos de energía
  const trackEnergyConsumption = useCallback((
    energyType: string,
    consumption: number,
    unit: string = 'kWh',
    additionalProperties?: Record<string, any>
  ) => {
    trackEnergyEvent(ENERGY_EVENTS.ENERGY_CONSUMPTION_VIEWED, energyType, {
      consumption_value: consumption,
      consumption_unit: unit,
      timestamp: new Date().toISOString(),
      user_id: userProfile?.id,
      ...additionalProperties,
    });
  }, [userProfile?.id]);

  // Track eventos de gráficos
  const trackChartInteraction = useCallback((
    chartType: string,
    interactionType: string,
    additionalProperties?: Record<string, any>
  ) => {
    trackChartEvent(ENERGY_EVENTS.ENERGY_CHART_INTERACTION, chartType, {
      interaction_type: interactionType,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track zoom en gráficos
  const trackChartZoom = useCallback((
    chartType: string,
    zoomLevel: number,
    additionalProperties?: Record<string, any>
  ) => {
    trackChartEvent(ENERGY_EVENTS.CHART_ZOOM, chartType, {
      zoom_level: zoomLevel,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track pan en gráficos
  const trackChartPan = useCallback((
    chartType: string,
    panDirection: string,
    additionalProperties?: Record<string, any>
  ) => {
    trackChartEvent(ENERGY_EVENTS.CHART_PAN, chartType, {
      pan_direction: panDirection,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track tooltips en gráficos
  const trackChartTooltip = useCallback((
    chartType: string,
    dataPoint: any,
    additionalProperties?: Record<string, any>
  ) => {
    trackChartEvent(ENERGY_EVENTS.CHART_TOOLTIP_VIEWED, chartType, {
      data_point: dataPoint,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track clicks en leyenda
  const trackChartLegendClick = useCallback((
    chartType: string,
    legendItem: string,
    additionalProperties?: Record<string, any>
  ) => {
    trackChartEvent(ENERGY_EVENTS.CHART_LEGEND_CLICKED, chartType, {
      legend_item: legendItem,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track eventos de configuración
  const trackSettingsChange = useCallback((
    settingName: string,
    oldValue: any,
    newValue: any,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent(ENERGY_EVENTS.SETTINGS_CHANGED, {
      setting_name: settingName,
      old_value: oldValue,
      new_value: newValue,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de notificaciones
  const trackNotificationToggle = useCallback((
    notificationType: string,
    enabled: boolean,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent(ENERGY_EVENTS.NOTIFICATION_TOGGLED, {
      notification_type: notificationType,
      enabled: enabled,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de performance
  const trackScreenLoadTime = useCallback((
    screenName: string,
    loadTime: number,
    additionalProperties?: Record<string, any>
  ) => {
    trackPerformanceEvent(ENERGY_EVENTS.SCREEN_LOAD_TIME, loadTime, 'ms', {
      screen_name: screenName,
      user_id: userProfile?.id,
      ...additionalProperties,
    });
  }, [userProfile?.id]);

  // Track eventos de API
  const trackApiResponseTime = useCallback((
    endpoint: string,
    responseTime: number,
    statusCode: number,
    additionalProperties?: Record<string, any>
  ) => {
    trackPerformanceEvent(ENERGY_EVENTS.API_RESPONSE_TIME, responseTime, 'ms', {
      endpoint: endpoint,
      status_code: statusCode,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track errores de API
  const trackApiError = useCallback((
    endpoint: string,
    errorMessage: string,
    statusCode?: number,
    additionalProperties?: Record<string, any>
  ) => {
    trackErrorEvent(ENERGY_EVENTS.API_ERROR, errorMessage, undefined, {
      endpoint: endpoint,
      status_code: statusCode,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track errores de validación
  const trackValidationError = useCallback((
    fieldName: string,
    errorMessage: string,
    formName?: string,
    additionalProperties?: Record<string, any>
  ) => {
    trackErrorEvent(ENERGY_EVENTS.VALIDATION_ERROR, errorMessage, undefined, {
      field_name: fieldName,
      form_name: formName,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name]);

  // Track eventos de usuario
  const trackUserAction = useCallback((
    actionName: string,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent(`user_${actionName}`, {
      user_id: userProfile?.id,
      screen_name: route.name,
      timestamp: new Date().toISOString(),
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de onboarding
  const trackOnboardingStep = useCallback((
    stepName: string,
    stepNumber: number,
    totalSteps: number,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent('onboarding_step_completed', {
      step_name: stepName,
      step_number: stepNumber,
      total_steps: totalSteps,
      progress_percentage: (stepNumber / totalSteps) * 100,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de experimentos
  const trackExperimentExposure = useCallback((
    experimentName: string,
    variant: string,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent('experiment_exposure', {
      experiment_name: experimentName,
      variant: variant,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de engagement
  const trackEngagement = useCallback((
    engagementType: string,
    contentId?: string,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent('user_engagement', {
      engagement_type: engagementType,
      content_id: contentId,
      user_id: userProfile?.id,
      screen_name: route.name,
      timestamp: new Date().toISOString(),
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de retención
  const trackRetention = useCallback((
    retentionType: string,
    daysSinceFirstVisit: number,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent('user_retention', {
      retention_type: retentionType,
      days_since_first_visit: daysSinceFirstVisit,
      user_id: userProfile?.id,
      screen_name: route.name,
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  // Track eventos de conversión
  const trackConversion = useCallback((
    conversionType: string,
    value?: number,
    currency?: string,
    additionalProperties?: Record<string, any>
  ) => {
    posthog.trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency,
      user_id: userProfile?.id,
      screen_name: route.name,
      timestamp: new Date().toISOString(),
      ...additionalProperties,
    });
  }, [userProfile?.id, route.name, posthog]);

  return {
    // Eventos de energía
    trackEnergyConsumption,
    trackChartInteraction,
    trackChartZoom,
    trackChartPan,
    trackChartTooltip,
    trackChartLegendClick,
    
    // Eventos de configuración
    trackSettingsChange,
    trackNotificationToggle,
    
    // Eventos de performance
    trackScreenLoadTime,
    trackApiResponseTime,
    
    // Eventos de errores
    trackApiError,
    trackValidationError,
    
    // Eventos de usuario
    trackUserAction,
    trackOnboardingStep,
    trackExperimentExposure,
    trackEngagement,
    trackRetention,
    trackConversion,
    
    // Utilidades
    currentScreen: route.name,
    userProfile,
    isOnline,
    themeMode,
  };
};

// Hook para tracking automático de performance
export const usePerformanceTracking = () => {
  const { trackScreenLoadTime, trackApiResponseTime } = usePostHogAnalytics();
  const screenLoadStartTime = useRef<number>(Date.now());

  const startScreenLoad = useCallback(() => {
    screenLoadStartTime.current = Date.now();
  }, []);

  const endScreenLoad = useCallback((screenName: string) => {
    const loadTime = Date.now() - screenLoadStartTime.current;
    trackScreenLoadTime(screenName, loadTime);
  }, [trackScreenLoadTime]);

  const trackApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const startTime = Date.now();
    try {
      const result = await apiCall();
      const responseTime = Date.now() - startTime;
      trackApiResponseTime(endpoint, responseTime, 200);
      return result;
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      trackApiResponseTime(endpoint, responseTime, error.status || 500);
      throw error;
    }
  }, [trackApiResponseTime]);

  return {
    startScreenLoad,
    endScreenLoad,
    trackApiCall,
  };
};

// Hook para tracking de errores
export const useErrorTracking = () => {
  const { trackApiError, trackValidationError } = usePostHogAnalytics();

  const trackError = useCallback((
    error: Error,
    context?: string,
    additionalProperties?: Record<string, any>
  ) => {
    trackErrorEvent(
      'javascript_error',
      error.message,
      error.stack,
      {
        context,
        error_name: error.name,
        ...additionalProperties,
      }
    );
  }, [trackApiError, trackValidationError]);

  return {
    trackError,
    trackApiError,
    trackValidationError,
  };
};
