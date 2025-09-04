# PostHog React Native - Guía Completa para Analytics

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración de Eventos](#configuración-de-eventos)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Tipos de Eventos](#tipos-de-eventos)
6. [Experimentos y Feature Flags](#experimentos-y-feature-flags)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

PostHog React Native es una solución completa de analytics y experimentos A/B que se integra perfectamente con aplicaciones de energía, proporcionando insights detallados sobre el comportamiento de los usuarios y la optimización de la experiencia.

### **¿Por qué PostHog?**

#### **✅ Ventajas Principales**
- 📊 **Analytics completo**: Eventos, funnels, retención, cohortes
- 🧪 **Experimentos A/B**: Feature flags y testing
- 🔍 **Session recording**: Grabación de sesiones (opcional)
- 📱 **React Native nativo**: Optimizado para móviles
- 🔒 **Privacidad**: GDPR compliant, self-hosted disponible
- 🎯 **Eventos específicos**: Para aplicaciones de energía
- 📈 **Tiempo real**: Analytics en tiempo real
- 🎨 **Integración temática**: Con sistema de temas

#### **❌ Alternativas Menos Recomendadas**
- **Google Analytics**: Menos específico para móviles
- **Mixpanel**: Más costoso, menos funcionalidades
- **Amplitude**: Menos experimentos A/B
- **Firebase Analytics**: Limitado a Google ecosystem

## ⚙️ Instalación y Configuración

### 1. **Dependencias Instaladas**

```bash
npm install posthog-react-native
```

### 2. **Configuración Principal**

```typescript
// src/config/posthog.ts
export const POSTHOG_CONFIG = {
  apiKey: process.env.POSTHOG_API_KEY || 'YOUR_POSTHOG_API_KEY',
  host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
  
  // Configuración específica para React Native
  enable: __DEV__ ? false : true, // Deshabilitar en desarrollo
  captureApplicationLifecycleEvents: true,
  recordScreenViews: true,
  enableAutomaticSessionRecording: false, // Por privacidad
  
  // Configuración de eventos
  flushAt: 20, // Enviar eventos cada 20 eventos
  flushInterval: 30000, // Enviar eventos cada 30 segundos
  
  // Configuración de debug
  debug: __DEV__,
  
  // Configuración de persistencia
  persistence: 'localStorage',
  
  // Propiedades por defecto
  defaultProperties: {
    platform: Platform.OS,
    app_version: '1.0.0',
    app_name: 'OpenEnergyCoop Mobile',
  },
};
```

### 3. **Inicialización en App.tsx**

```typescript
import { initPostHog } from './src/config/posthog';

function App() {
  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        await initPostHog();
        console.log('✅ PostHog inicializado correctamente');
      } catch (error) {
        console.error('❌ Error inicializando PostHog:', error);
      }
    };

    initializeAnalytics();
  }, []);

  // ... resto del código
}
```

## 🎯 Configuración de Eventos

### 1. **Eventos Específicos para Energía**

```typescript
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
```

### 2. **Propiedades Específicas**

```typescript
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
```

## 🎣 Hooks Personalizados

### 1. **usePostHogAnalytics**

Hook principal para analytics específicos de energía:

```typescript
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const MyComponent = () => {
  const {
    trackEnergyConsumption,
    trackChartInteraction,
    trackSettingsChange,
    trackUserAction,
    currentScreen,
    userProfile,
    isOnline,
    themeMode,
  } = usePostHogAnalytics();

  // Track consumo de energía
  const handleEnergyView = () => {
    trackEnergyConsumption('solar', 15.5, 'kWh', {
      source: 'dashboard',
      time_period: 'daily',
    });
  };

  // Track interacción de gráfico
  const handleChartZoom = () => {
    trackChartInteraction('line', 'zoom', {
      zoom_level: 2.5,
      chart_data_points: 100,
    });
  };

  return (
    <View>
      {/* Componente */}
    </View>
  );
};
```

### 2. **usePerformanceTracking**

Hook para tracking automático de performance:

```typescript
import { usePerformanceTracking } from '../hooks/usePostHogAnalytics';

const MyScreen = () => {
  const { startScreenLoad, endScreenLoad, trackApiCall } = usePerformanceTracking();

  useEffect(() => {
    startScreenLoad();
    
    const loadData = async () => {
      try {
        const data = await trackApiCall(
          () => api.getEnergyData(),
          '/api/energy-data'
        );
        
        endScreenLoad('EnergyScreen');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <View>
      {/* Contenido de la pantalla */}
    </View>
  );
};
```

### 3. **useErrorTracking**

Hook para tracking de errores:

```typescript
import { useErrorTracking } from '../hooks/usePostHogAnalytics';

const MyComponent = () => {
  const { trackError, trackApiError, trackValidationError } = useErrorTracking();

  const handleApiCall = async () => {
    try {
      const data = await api.getData();
      // Procesar datos
    } catch (error) {
      trackApiError('/api/data', error.message, error.status);
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (!formData.email) {
      trackValidationError('email', 'Email es requerido', 'login_form');
      return;
    }
    
    // Continuar con envío
  };

  return (
    <View>
      {/* Componente */}
    </View>
  );
};
```

## 📊 Tipos de Eventos

### 1. **Eventos de Energía**

```typescript
// Track consumo de energía
trackEnergyConsumption('solar', 15.5, 'kWh', {
  time_period: 'daily',
  location: 'madrid',
  weather_conditions: 'sunny',
});

// Track visualización de gráficos
trackChartInteraction('line', 'zoom', {
  zoom_level: 2.5,
  data_points: 100,
  time_range: 'last_7_days',
});

// Track interacción con tooltips
trackChartTooltip('bar', {
  x: '2024-01-15',
  y: 25.3,
  energy_type: 'solar',
});
```

### 2. **Eventos de Navegación**

```typescript
// Track navegación automática (se hace automáticamente)
// Pero también puedes track manualmente:
trackNavigationEvent('EnergyDashboard', 'HomeScreen', {
  navigation_method: 'tab_press',
  time_spent_previous: 45000,
});
```

### 3. **Eventos de Usuario**

```typescript
// Track acciones del usuario
trackUserAction('button_clicked', {
  button_name: 'save_energy_preferences',
  screen_name: 'SettingsScreen',
  user_segment: 'power_user',
});

// Track onboarding
trackOnboardingStep('energy_tutorial', 2, 5, {
  tutorial_type: 'interactive',
  completion_rate: 40,
});
```

### 4. **Eventos de Performance**

```typescript
// Track tiempo de carga de pantalla
trackScreenLoadTime('EnergyDashboard', 1250, {
  network_speed: '4g',
  device_type: 'android',
});

// Track tiempo de respuesta de API
trackApiResponseTime('/api/energy-data', 450, 200, {
  data_size: '2.5kb',
  cache_hit: false,
});
```

### 5. **Eventos de Errores**

```typescript
// Track errores de API
trackApiError('/api/energy-data', 'Network timeout', 408, {
  retry_count: 3,
  user_agent: 'mobile_app',
});

// Track errores de validación
trackValidationError('email', 'Invalid email format', 'signup_form', {
  field_type: 'email',
  validation_rule: 'email_format',
});
```

## 🧪 Experimentos y Feature Flags

### 1. **Configuración de Experimentos**

```typescript
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
```

### 2. **Uso de Feature Flags**

```typescript
import { isFeatureEnabled, getFeatureFlag } from '../config/posthog';

const MyComponent = () => {
  const showNewChartDesign = isFeatureEnabled('new_chart_design');
  const chartVariant = getFeatureFlag('chart_design_variant');

  return (
    <View>
      {showNewChartDesign ? (
        <NewChartDesign variant={chartVariant} />
      ) : (
        <LegacyChartDesign />
      )}
    </View>
  );
};
```

### 3. **Tracking de Experimentos**

```typescript
const { trackExperimentExposure } = usePostHogAnalytics();

useEffect(() => {
  if (isFeatureEnabled('new_chart_design')) {
    trackExperimentExposure('new_chart_design', 'variant_a', {
      user_segment: 'power_user',
      chart_usage_frequency: 'daily',
    });
  }
}, []);
```

## ✅ Mejores Prácticas

### 1. **Nomenclatura de Eventos**

```typescript
// ✅ Correcto - Eventos descriptivos
trackEvent('energy_consumption_viewed', {
  energy_type: 'solar',
  consumption_value: 15.5,
  time_period: 'daily',
});

// ❌ Incorrecto - Eventos genéricos
trackEvent('click', {
  element: 'button',
});
```

### 2. **Propiedades Consistentes**

```typescript
// ✅ Correcto - Propiedades estructuradas
trackEvent('chart_interaction', {
  chart_type: 'line',
  interaction_type: 'zoom',
  zoom_level: 2.5,
  data_points: 100,
  user_id: userProfile?.id,
  screen_name: route.name,
  timestamp: new Date().toISOString(),
});

// ❌ Incorrecto - Propiedades inconsistentes
trackEvent('chart_interaction', {
  chart: 'line',
  action: 'zoom',
  level: 2.5,
});
```

### 3. **Performance**

```typescript
// ✅ Correcto - Usar useCallback para funciones de tracking
const trackEnergyEvent = useCallback((
  energyType: string,
  value: number
) => {
  trackEnergyConsumption(energyType, value, 'kWh', {
    source: 'manual_input',
  });
}, [trackEnergyConsumption]);

// ❌ Incorrecto - Crear función en cada render
const trackEnergyEvent = (energyType: string, value: number) => {
  trackEnergyConsumption(energyType, value, 'kWh');
};
```

### 4. **Privacidad**

```typescript
// ✅ Correcto - No trackear datos sensibles
trackEvent('user_action', {
  action_type: 'button_click',
  button_name: 'save_preferences',
  // NO incluir: email, password, personal_data
});

// ❌ Incorrecto - Trackear datos sensibles
trackEvent('user_action', {
  action_type: 'button_click',
  user_email: 'user@example.com', // ❌ Datos sensibles
  user_password: 'password123', // ❌ Datos sensibles
});
```

### 5. **Debug y Desarrollo**

```typescript
// ✅ Correcto - Deshabilitar en desarrollo
export const POSTHOG_CONFIG = {
  enable: __DEV__ ? false : true,
  debug: __DEV__,
  // ... otras configuraciones
};

// ✅ Correcto - Logs en desarrollo
if (__DEV__) {
  console.log(`📊 PostHog Event: ${eventName}`, properties);
}
```

## 🔧 Solución de Problemas

### 1. **Eventos no se envían**

**Problema:** Los eventos no aparecen en PostHog

**Solución:**
```typescript
// Verificar configuración
const posthog = getPostHog();
if (posthog && isPostHogEnabled()) {
  console.log('PostHog está habilitado');
} else {
  console.log('PostHog no está habilitado');
}

// Verificar API key
console.log('API Key:', POSTHOG_CONFIG.apiKey);

// Forzar envío de eventos
flushEvents();
```

### 2. **Eventos duplicados**

**Problema:** Los eventos se envían múltiples veces

**Solución:**
```typescript
// Usar useCallback para evitar recrear funciones
const trackEvent = useCallback((eventName: string, properties?: any) => {
  posthog.trackEvent(eventName, properties);
}, [posthog]);

// Verificar que no se llame en useEffect sin dependencias
useEffect(() => {
  trackEvent('screen_viewed'); // ✅ Correcto
}, []); // Sin dependencias

useEffect(() => {
  trackEvent('screen_viewed'); // ❌ Se ejecuta en cada render
}); // Sin array de dependencias
```

### 3. **Performance lenta**

**Problema:** La aplicación se vuelve lenta por tracking

**Solución:**
```typescript
// Configurar flush menos frecuente
export const POSTHOG_CONFIG = {
  flushAt: 50, // Enviar cada 50 eventos
  flushInterval: 60000, // Enviar cada minuto
  // ... otras configuraciones
};

// Usar debounce para eventos frecuentes
const debouncedTrackEvent = useMemo(
  () => debounce(trackEvent, 1000),
  [trackEvent]
);
```

### 4. **Errores de red**

**Problema:** Errores de red al enviar eventos

**Solución:**
```typescript
// Configurar retry y timeout
export const POSTHOG_CONFIG = {
  // ... otras configuraciones
  requestTimeout: 10000, // 10 segundos
  retryAttempts: 3,
};

// Manejar errores de red
try {
  await posthog.capture(eventName, properties);
} catch (error) {
  console.error('Error enviando evento:', error);
  // Opcional: guardar en local storage para reenvío posterior
}
```

### 5. **Eventos en modo offline**

**Problema:** Los eventos se pierden cuando no hay conexión

**Solución:**
```typescript
// Configurar persistencia
export const POSTHOG_CONFIG = {
  persistence: 'localStorage',
  // ... otras configuraciones
};

// Verificar conectividad
import NetInfo from '@react-native-community/netinfo';

const trackEventWithOfflineSupport = async (eventName: string, properties?: any) => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected) {
    trackEvent(eventName, properties);
  } else {
    // Guardar en local storage para envío posterior
    saveEventForLater(eventName, properties);
  }
};
```

## 📚 Ejemplos de Uso

### 1. **Dashboard de Energía**

```typescript
const EnergyDashboard = () => {
  const { trackEnergyConsumption, trackChartInteraction } = usePostHogAnalytics();

  useEffect(() => {
    // Track carga de dashboard
    trackUserAction('dashboard_viewed', {
      dashboard_type: 'energy_overview',
      user_segment: 'power_user',
    });
  }, []);

  const handleEnergyTypeClick = (energyType: string) => {
    trackEnergyConsumption(energyType, 0, 'kWh', {
      action: 'energy_type_selected',
      dashboard_section: 'energy_types',
    });
  };

  const handleChartZoom = (chartType: string, zoomLevel: number) => {
    trackChartInteraction(chartType, 'zoom', {
      zoom_level: zoomLevel,
      chart_data_points: 100,
    });
  };

  return (
    <View>
      {/* Dashboard content */}
    </View>
  );
};
```

### 2. **Configuración de Usuario**

```typescript
const UserSettings = () => {
  const { trackSettingsChange, trackNotificationToggle } = usePostHogAnalytics();

  const handleThemeChange = (oldTheme: string, newTheme: string) => {
    trackSettingsChange('theme_mode', oldTheme, newTheme, {
      setting_category: 'appearance',
      user_preference: newTheme,
    });
  };

  const handleNotificationToggle = (type: string, enabled: boolean) => {
    trackNotificationToggle(type, enabled, {
      notification_category: 'energy_alerts',
      user_segment: 'active_user',
    });
  };

  return (
    <View>
      {/* Settings content */}
    </View>
  );
};
```

### 3. **Onboarding**

```typescript
const OnboardingFlow = () => {
  const { trackOnboardingStep, trackExperimentExposure } = usePostHogAnalytics();
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepComplete = (stepName: string) => {
    trackOnboardingStep(stepName, currentStep, 5, {
      onboarding_type: 'energy_app_introduction',
      step_duration: 30000, // 30 segundos
    });

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleExperimentExposure = () => {
    if (isFeatureEnabled('interactive_tutorial')) {
      trackExperimentExposure('interactive_tutorial', 'variant_a', {
        user_segment: 'new_user',
        tutorial_completion_rate: 80,
      });
    }
  };

  return (
    <View>
      {/* Onboarding content */}
    </View>
  );
};
```

## 🎉 Conclusión

PostHog React Native proporciona:

- ✅ **Analytics completo** para aplicaciones de energía
- ✅ **Eventos específicos** para el dominio de energía
- ✅ **Experimentos A/B** para optimización
- ✅ **Performance tracking** automático
- ✅ **Error tracking** integrado
- ✅ **Hooks personalizados** para fácil uso
- ✅ **Privacidad y GDPR** compliance
- ✅ **Documentación completa** para desarrolladores

El sistema está completamente integrado y listo para usar, proporcionando insights valiosos sobre el comportamiento de los usuarios y la optimización de la experiencia en aplicaciones de energía. 🚀
