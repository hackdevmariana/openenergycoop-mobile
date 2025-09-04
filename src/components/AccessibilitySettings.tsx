import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Card, Title, Paragraph, Slider, Button, Divider } from 'react-native-paper';
import { useAccessibility } from '../services/accessibilityService';
import { useTheme } from '../hooks/useTheme';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { accessibilityConfig } from '../config/accessibility';

const AccessibilitySettings: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    preferences,
    updateFontSize,
    updateFontSizeScale,
    updateLineHeight,
    updateContrast,
    toggleHighContrast,
    toggleBoldText,
    toggleReduceMotion,
    resetPreferences,
    getTextStyles,
    getDeviceInfo,
    getRecommendations,
    applyRecommendations,
  } = useAccessibility();

  const [fontSizeScale, setFontSizeScale] = useState(preferences.fontSizeScale);
  const [isApplyingRecommendations, setIsApplyingRecommendations] = useState(false);

  // Cargar recomendaciones al montar
  useEffect(() => {
    const recommendations = getRecommendations();
    if (recommendations.length > 0) {
      trackUserAction('accessibility_recommendations_shown', {
        recommendations_count: recommendations.length,
        recommendations: recommendations.map(r => r.type),
      });
    }
  }, []);

  const handleFontSizeChange = async (fontSize: 'small' | 'normal' | 'large' | 'extraLarge') => {
    try {
      await updateFontSize(fontSize);
      trackUserAction('font_size_changed', {
        new_size: fontSize,
        previous_size: preferences.fontSize,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo actualizar el tamaño de fuente');
    }
  };

  const handleFontSizeScaleChange = async (value: number) => {
    setFontSizeScale(value);
    try {
      await updateFontSizeScale(value);
      trackUserAction('font_size_scale_changed', {
        new_scale: value,
        previous_scale: preferences.fontSizeScale,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo actualizar la escala de fuente');
    }
  };

  const handleLineHeightChange = async (lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose') => {
    try {
      await updateLineHeight(lineHeight);
      trackUserAction('line_height_changed', {
        new_line_height: lineHeight,
        previous_line_height: preferences.lineHeight,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo actualizar la altura de línea');
    }
  };

  const handleContrastChange = async (contrast: 'low' | 'normal' | 'high' | 'veryHigh') => {
    try {
      await updateContrast(contrast);
      trackUserAction('contrast_changed', {
        new_contrast: contrast,
        previous_contrast: preferences.contrast,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo actualizar el contraste');
    }
  };

  const handleToggleHighContrast = async () => {
    try {
      await toggleHighContrast();
      trackUserAction('high_contrast_toggled', {
        enabled: !preferences.enableHighContrast,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo alternar el alto contraste');
    }
  };

  const handleToggleBoldText = async () => {
    try {
      await toggleBoldText();
      trackUserAction('bold_text_toggled', {
        enabled: !preferences.enableBoldText,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo alternar el texto en negrita');
    }
  };

  const handleToggleReduceMotion = async () => {
    try {
      await toggleReduceMotion();
      trackUserAction('reduce_motion_toggled', {
        enabled: !preferences.enableReduceMotion,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo alternar la reducción de movimiento');
    }
  };

  const handleResetPreferences = async () => {
    Alert.alert(
      '🔄 Restablecer Preferencias',
      '¿Estás seguro de que quieres restablecer todas las preferencias de accesibilidad a los valores por defecto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restablecer',
          style: 'destructive',
          onPress: async () => {
            try {
              await resetPreferences();
              setFontSizeScale(1.0);
              trackUserAction('accessibility_preferences_reset');
              Alert.alert('✅ Éxito', 'Preferencias restablecidas correctamente');
            } catch (error) {
              Alert.alert('❌ Error', 'No se pudieron restablecer las preferencias');
            }
          },
        },
      ]
    );
  };

  const handleApplyRecommendations = async () => {
    setIsApplyingRecommendations(true);
    try {
      await applyRecommendations();
      setFontSizeScale(preferences.fontSizeScale);
      trackUserAction('accessibility_recommendations_applied');
      Alert.alert('✅ Éxito', 'Recomendaciones aplicadas correctamente');
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudieron aplicar las recomendaciones');
    } finally {
      setIsApplyingRecommendations(false);
    }
  };

  // Obtener estilos de texto de ejemplo
  const getExampleTextStyles = (contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button') => {
    return getTextStyles(16, contentType);
  };

  // Obtener información del dispositivo
  const deviceInfo = getDeviceInfo();

  // Obtener recomendaciones
  const recommendations = getRecommendations();

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-text">
            Configuración de Accesibilidad
          </Text>
          <Text className="text-text-secondary">
            Personaliza el tamaño de texto y otras opciones de accesibilidad
          </Text>
        </View>

        {/* Información del dispositivo */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Información del Dispositivo</Title>
            
            <View className="mt-4 space-y-2">
              <Text className={themedClasses.textSecondary}>
                Pantalla: {deviceInfo.screenWidth} x {deviceInfo.screenHeight}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Densidad de píxeles: {deviceInfo.pixelDensity.toFixed(2)}x
              </Text>
              <Text className={themedClasses.textSecondary}>
                Orientación: {deviceInfo.isLandscape ? 'Horizontal' : 'Vertical'}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Relación de aspecto: {deviceInfo.aspectRatio.toFixed(2)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Tamaño de fuente */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Tamaño de Fuente</Title>
            <Paragraph className={themedClasses.textSecondary}>
              Ajusta el tamaño del texto para mejorar la legibilidad
            </Paragraph>
            
            <View className="mt-4 space-y-4">
              {/* Tamaños predefinidos */}
              <View>
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Tamaños predefinidos:
                </Text>
                <View className="flex-row space-x-2">
                  {(['small', 'normal', 'large', 'extraLarge'] as const).map((size) => (
                    <TouchableOpacity
                      key={size}
                      className={`px-3 py-2 rounded ${
                        preferences.fontSize === size
                          ? themedClasses.btnPrimary
                          : themedClasses.btnSecondary
                      }`}
                      onPress={() => handleFontSizeChange(size)}
                    >
                      <Text
                        className={`font-medium text-center ${
                          preferences.fontSize === size ? 'text-white' : ''
                        }`}
                      >
                        {size === 'small' && 'Pequeño'}
                        {size === 'normal' && 'Normal'}
                        {size === 'large' && 'Grande'}
                        {size === 'extraLarge' && 'Extra Grande'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Escala personalizada */}
              <View>
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Escala personalizada: {fontSizeScale.toFixed(1)}x
                </Text>
                <Slider
                  value={fontSizeScale}
                  onValueChange={handleFontSizeScaleChange}
                  minimumValue={accessibilityConfig.zoom.min}
                  maximumValue={accessibilityConfig.zoom.max}
                  step={accessibilityConfig.zoom.step}
                  minimumTrackTintColor={themedClasses.primaryColor}
                  maximumTrackTintColor={themedClasses.surfaceColor}
                  thumbTintColor={themedClasses.primaryColor}
                />
              </View>

              {/* Vista previa */}
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Vista previa:
                </Text>
                <Text style={getExampleTextStyles('title')} className="mb-2">
                  Título de ejemplo
                </Text>
                <Text style={getExampleTextStyles('body')} className="mb-2">
                  Este es un texto de ejemplo que muestra cómo se verá el contenido con la configuración actual.
                </Text>
                <Text style={getExampleTextStyles('caption')}>
                  Texto pequeño de ejemplo
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Altura de línea */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Altura de Línea</Title>
            <Paragraph className={themedClasses.textSecondary}>
              Ajusta el espaciado entre líneas para mejorar la legibilidad
            </Paragraph>
            
            <View className="mt-4 space-y-2">
              {(['tight', 'normal', 'relaxed', 'loose'] as const).map((lineHeight) => (
                <TouchableOpacity
                  key={lineHeight}
                  className={`p-3 rounded ${
                    preferences.lineHeight === lineHeight
                      ? themedClasses.btnPrimary
                      : themedClasses.btnSecondary
                  }`}
                  onPress={() => handleLineHeightChange(lineHeight)}
                >
                  <Text
                    className={`font-medium ${
                      preferences.lineHeight === lineHeight ? 'text-white' : ''
                    }`}
                  >
                    {lineHeight === 'tight' && 'Apretada'}
                    {lineHeight === 'normal' && 'Normal'}
                    {lineHeight === 'relaxed' && 'Relajada'}
                    {lineHeight === 'loose' && 'Suelta'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Contraste */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Contraste</Title>
            <Paragraph className={themedClasses.textSecondary}>
              Ajusta el nivel de contraste para mejorar la legibilidad
            </Paragraph>
            
            <View className="mt-4 space-y-2">
              {(['low', 'normal', 'high', 'veryHigh'] as const).map((contrast) => (
                <TouchableOpacity
                  key={contrast}
                  className={`p-3 rounded ${
                    preferences.contrast === contrast
                      ? themedClasses.btnPrimary
                      : themedClasses.btnSecondary
                  }`}
                  onPress={() => handleContrastChange(contrast)}
                >
                  <Text
                    className={`font-medium ${
                      preferences.contrast === contrast ? 'text-white' : ''
                    }`}
                  >
                    {contrast === 'low' && 'Bajo'}
                    {contrast === 'normal' && 'Normal'}
                    {contrast === 'high' && 'Alto'}
                    {contrast === 'veryHigh' && 'Muy Alto'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Opciones adicionales */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Opciones Adicionales</Title>
            
            <View className="mt-4 space-y-4">
              {/* Alto contraste */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={themedClasses.textPrimary + ' font-medium'}>
                    Alto Contraste
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Usar colores de máximo contraste
                  </Text>
                </View>
                <Switch
                  value={preferences.enableHighContrast}
                  onValueChange={handleToggleHighContrast}
                  trackColor={{ false: themedClasses.surfaceColor, true: themedClasses.primaryColor }}
                  thumbColor={preferences.enableHighContrast ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>

              <Divider />

              {/* Texto en negrita */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={themedClasses.textPrimary + ' font-medium'}>
                    Texto en Negrita
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Mostrar todo el texto en negrita
                  </Text>
                </View>
                <Switch
                  value={preferences.enableBoldText}
                  onValueChange={handleToggleBoldText}
                  trackColor={{ false: themedClasses.surfaceColor, true: themedClasses.primaryColor }}
                  thumbColor={preferences.enableBoldText ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>

              <Divider />

              {/* Reducir movimiento */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={themedClasses.textPrimary + ' font-medium'}>
                    Reducir Movimiento
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Minimizar animaciones y transiciones
                  </Text>
                </View>
                <Switch
                  value={preferences.enableReduceMotion}
                  onValueChange={handleToggleReduceMotion}
                  trackColor={{ false: themedClasses.surfaceColor, true: themedClasses.primaryColor }}
                  thumbColor={preferences.enableReduceMotion ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recomendaciones */}
        {recommendations.length > 0 && (
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Recomendaciones</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Basadas en tu dispositivo y configuración actual
              </Paragraph>
              
              <View className="mt-4 space-y-3">
                {recommendations.map((recommendation, index) => (
                  <View key={index} className="p-3 bg-surface rounded-md">
                    <Text className={themedClasses.textSecondary}>
                      {recommendation.message}
                    </Text>
                  </View>
                ))}
                
                <TouchableOpacity
                  className={themedClasses.btnPrimary}
                  onPress={handleApplyRecommendations}
                  disabled={isApplyingRecommendations}
                >
                  <Text className="text-white font-medium text-center">
                    {isApplyingRecommendations ? 'Aplicando...' : 'Aplicar Recomendaciones'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Acciones */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Acciones</Title>
            
            <View className="mt-4 space-y-3">
              <TouchableOpacity
                className={themedClasses.btnSecondary}
                onPress={handleResetPreferences}
              >
                <Text className="font-medium text-center">
                  🔄 Restablecer Preferencias
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View className="mt-6 p-4 bg-surface rounded-md">
          <Text className={themedClasses.textSecondary + ' text-center'}>
            Las configuraciones de accesibilidad se guardan automáticamente
          </Text>
          <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
            Diseñado para mejorar la experiencia de usuarios con problemas de visión
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccessibilitySettings;
