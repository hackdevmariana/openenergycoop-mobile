import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Switch } from 'react-native-paper';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { useTheme } from '../hooks/useTheme';
import { ENERGY_EVENTS, ENERGY_PROPERTIES } from '../config/posthog';

const PostHogDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const {
    trackEnergyConsumption,
    trackChartInteraction,
    trackChartZoom,
    trackChartPan,
    trackChartTooltip,
    trackChartLegendClick,
    trackSettingsChange,
    trackNotificationToggle,
    trackUserAction,
    trackOnboardingStep,
    trackExperimentExposure,
    trackEngagement,
    trackRetention,
    trackConversion,
    trackApiError,
    trackValidationError,
    currentScreen,
    userProfile,
    isOnline,
    themeMode,
  } = usePostHogAnalytics();

  const [customEventName, setCustomEventName] = useState('');
  const [customProperties, setCustomProperties] = useState('');
  const [energyType, setEnergyType] = useState('solar');
  const [consumptionValue, setConsumptionValue] = useState('10.5');
  const [chartType, setChartType] = useState('line');
  const [showAnalytics, setShowAnalytics] = useState(true);

  // Track carga de pantalla
  useEffect(() => {
    trackUserAction('screen_viewed', {
      screen_name: 'PostHog Demo',
      demo_mode: true,
    });
  }, []);

  const handleTrackEnergyConsumption = () => {
    const value = parseFloat(consumptionValue);
    if (isNaN(value)) {
      Alert.alert('Error', 'Por favor ingresa un valor numérico válido');
      return;
    }

    trackEnergyConsumption(energyType, value, 'kWh', {
      demo_mode: true,
      source: 'manual_input',
    });

    Alert.alert('Evento Enviado', `Consumo de ${energyType}: ${value} kWh`);
  };

  const handleTrackChartInteraction = (interactionType: string) => {
    trackChartInteraction(chartType, interactionType, {
      demo_mode: true,
      interaction_source: 'demo_button',
    });

    Alert.alert('Evento Enviado', `Interacción de gráfico: ${interactionType}`);
  };

  const handleTrackCustomEvent = () => {
    if (!customEventName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre de evento');
      return;
    }

    let properties = {};
    if (customProperties.trim()) {
      try {
        properties = JSON.parse(customProperties);
      } catch (error) {
        Alert.alert('Error', 'Las propiedades deben ser JSON válido');
        return;
      }
    }

    trackUserAction(customEventName, {
      demo_mode: true,
      custom_properties: properties,
    });

    Alert.alert('Evento Enviado', `Evento personalizado: ${customEventName}`);
  };

  const handleTrackOnboardingStep = () => {
    trackOnboardingStep('posthog_demo', 1, 3, {
      demo_mode: true,
      step_description: 'Configuración de analytics',
    });

    Alert.alert('Evento Enviado', 'Paso de onboarding completado');
  };

  const handleTrackExperiment = () => {
    trackExperimentExposure('demo_experiment', 'variant_a', {
      demo_mode: true,
      experiment_description: 'Experimento de demostración',
    });

    Alert.alert('Evento Enviado', 'Exposición a experimento registrada');
  };

  const handleTrackEngagement = () => {
    trackEngagement('demo_interaction', 'posthog_demo_screen', {
      demo_mode: true,
      engagement_duration: 5000,
    });

    Alert.alert('Evento Enviado', 'Engagement registrado');
  };

  const handleTrackRetention = () => {
    trackRetention('daily_retention', 7, {
      demo_mode: true,
      retention_metric: 'daily_active_users',
    });

    Alert.alert('Evento Enviado', 'Retención registrada');
  };

  const handleTrackConversion = () => {
    trackConversion('demo_conversion', 99.99, 'USD', {
      demo_mode: true,
      conversion_source: 'demo_screen',
    });

    Alert.alert('Evento Enviado', 'Conversión registrada');
  };

  const handleTrackError = () => {
    trackValidationError('demo_field', 'Error de demostración', 'demo_form', {
      demo_mode: true,
      error_type: 'validation',
    });

    Alert.alert('Evento Enviado', 'Error de validación registrado');
  };

  const handleTrackApiError = () => {
    trackApiError('/api/demo', 'Error de API de demostración', 500, {
      demo_mode: true,
      error_type: 'api',
    });

    Alert.alert('Evento Enviado', 'Error de API registrado');
  };

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-text">
            PostHog Analytics Demo
          </Text>
          <Text className="text-text-secondary">
            Demostración de tracking de eventos y analytics
          </Text>
        </View>

        {/* Estado actual */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Estado Actual</Title>
            
            <View className="mt-4 space-y-2">
              <Text className={themedClasses.textSecondary}>
                Pantalla actual: {currentScreen}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Tema: {themeMode}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Conexión: {isOnline ? 'Online' : 'Offline'}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Usuario: {userProfile?.id || 'Anónimo'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos de Energía */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos de Energía</Title>
            
            <View className="mt-4 space-y-3">
              <TextInput
                label="Tipo de energía"
                value={energyType}
                onChangeText={setEnergyType}
                className={themedClasses.input}
              />
              
              <TextInput
                label="Consumo (kWh)"
                value={consumptionValue}
                onChangeText={setConsumptionValue}
                keyboardType="numeric"
                className={themedClasses.input}
              />
              
              <TouchableOpacity 
                className={themedClasses.btnPrimary}
                onPress={handleTrackEnergyConsumption}
              >
                <Text className="text-white font-medium text-center">
                  Track Consumo de Energía
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos de Gráficos */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos de Gráficos</Title>
            
            <View className="mt-4 space-y-2">
              <TextInput
                label="Tipo de gráfico"
                value={chartType}
                onChangeText={setChartType}
                className={themedClasses.input}
              />
              
              <View className="flex-row flex-wrap gap-2">
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => handleTrackChartInteraction('zoom')}
                >
                  <Text className="font-medium text-center">Zoom</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => handleTrackChartInteraction('pan')}
                >
                  <Text className="font-medium text-center">Pan</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => handleTrackChartInteraction('tooltip')}
                >
                  <Text className="font-medium text-center">Tooltip</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => handleTrackChartInteraction('legend_click')}
                >
                  <Text className="font-medium text-center">Leyenda</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos Personalizados */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos Personalizados</Title>
            
            <View className="mt-4 space-y-3">
              <TextInput
                label="Nombre del evento"
                value={customEventName}
                onChangeText={setCustomEventName}
                placeholder="ej: button_clicked"
                className={themedClasses.input}
              />
              
              <TextInput
                label="Propiedades (JSON opcional)"
                value={customProperties}
                onChangeText={setCustomProperties}
                placeholder='{"key": "value"}'
                multiline
                numberOfLines={3}
                className={themedClasses.input}
              />
              
              <TouchableOpacity 
                className={themedClasses.btnPrimary}
                onPress={handleTrackCustomEvent}
              >
                <Text className="text-white font-medium text-center">
                  Track Evento Personalizado
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos de Usuario */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos de Usuario</Title>
            
            <View className="mt-4 space-y-2">
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackOnboardingStep}
              >
                <Text className="font-medium text-center">Onboarding Step</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackExperiment}
              >
                <Text className="font-medium text-center">Experiment Exposure</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackEngagement}
              >
                <Text className="font-medium text-center">User Engagement</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackRetention}
              >
                <Text className="font-medium text-center">User Retention</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackConversion}
              >
                <Text className="font-medium text-center">Conversion</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos de Errores */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos de Errores</Title>
            
            <View className="mt-4 space-y-2">
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackError}
              >
                <Text className="font-medium text-center">Validation Error</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleTrackApiError}
              >
                <Text className="font-medium text-center">API Error</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Información */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Información</Title>
            
            <View className="mt-4 space-y-2">
              <Text className={themedClasses.textSecondary}>
                • Los eventos se envían automáticamente a PostHog
              </Text>
              <Text className={themedClasses.textSecondary}>
                • En modo desarrollo, los eventos se muestran en consola
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Los eventos incluyen contexto del usuario y pantalla
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Se pueden configurar experimentos y feature flags
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Analytics en tiempo real disponibles en dashboard
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View className="mt-6 p-4 bg-surface rounded-md">
          <Text className={themedClasses.textSecondary + ' text-center'}>
            PostHog proporciona analytics avanzados y experimentos A/B
          </Text>
          <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
            Perfecto para optimizar la experiencia de usuario en aplicaciones de energía
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostHogDemo;
