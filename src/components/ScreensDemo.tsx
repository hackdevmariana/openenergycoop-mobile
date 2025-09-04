import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useScreens } from '../hooks/useScreens';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const ScreensDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    deviceInfo,
    getScreenConfig,
    getPlatformScreenConfig,
    getThemeScreenConfig,
    createScreenOptions,
    createMainScreenOptions,
    createSettingsScreenOptions,
    createModalScreenOptions,
    createFullScreenOptions,
    createTransparentScreenOptions,
    createThemedScreenOptions,
    createPlatformScreenOptions,
    createOrientationScreenOptions,
    createSizeScreenOptions,
    createCustomAnimationOptions,
    createCustomGestureOptions,
    createCustomPresentationOptions,
    createAccessibilityScreenOptions,
    createPerformanceScreenOptions,
    createCompleteScreenOptions,
    getAnimationConfig,
    getGestureConfig,
    getPresentationConfig,
    getAccessibilityConfig,
    getPerformanceConfig,
    getMonitoringConfig,
    getOptimizationConfig,
    getCacheConfig,
    getPreloadConfig,
    getLazyLoadingConfig,
    getMemoryConfig,
    getMetricsConfig,
    getLoggingConfig,
    getLimitsConfig,
    getWorkletsConfig,
    getOptimizationsConfig,
    getCacheConfigBasic,
    getDeviceCompleteConfig,
  } = useScreens();

  // Estados para controlar demostraciones
  const [currentScreen, setCurrentScreen] = useState<'home' | 'dashboard' | 'settings' | 'charts'>('home');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const [currentAnimation, setCurrentAnimation] = useState<'slide_from_right' | 'slide_from_left' | 'slide_from_bottom' | 'fade'>('slide_from_right');
  const [currentGesture, setCurrentGesture] = useState<'main' | 'modal' | 'bottomSheet' | 'settings'>('main');
  const [currentPresentation, setCurrentPresentation] = useState<'default' | 'modal' | 'transparent' | 'fullScreen'>('default');

  // Configuraciones de ejemplo
  const screenConfig = getScreenConfig(currentScreen);
  const platformConfig = getPlatformScreenConfig(currentScreen);
  const themeConfig = getThemeScreenConfig(currentScreen, currentTheme);
  const animationConfig = getAnimationConfig(currentAnimation);
  const gestureConfig = getGestureConfig(currentGesture);
  const presentationConfig = getPresentationConfig(currentPresentation);
  const accessibilityConfig = getAccessibilityConfig();
  const performanceConfig = getPerformanceConfig();
  const deviceCompleteConfig = getDeviceCompleteConfig();

  // Opciones de ejemplo
  const screenOptions = createScreenOptions(currentScreen);
  const mainScreenOptions = createMainScreenOptions(currentScreen);
  const settingsScreenOptions = createSettingsScreenOptions(currentScreen);
  const modalScreenOptions = createModalScreenOptions(currentScreen);
  const fullScreenOptions = createFullScreenOptions(currentScreen);
  const transparentScreenOptions = createTransparentScreenOptions(currentScreen);
  const themedScreenOptions = createThemedScreenOptions(currentScreen, currentTheme);
  const platformScreenOptions = createPlatformScreenOptions(currentScreen);
  const orientationScreenOptions = createOrientationScreenOptions(currentScreen);
  const sizeScreenOptions = createSizeScreenOptions(currentScreen);
  const customAnimationOptions = createCustomAnimationOptions(currentScreen, currentAnimation);
  const customGestureOptions = createCustomGestureOptions(currentScreen, currentGesture);
  const customPresentationOptions = createCustomPresentationOptions(currentScreen, currentPresentation);
  const accessibilityScreenOptions = createAccessibilityScreenOptions(currentScreen);
  const performanceScreenOptions = createPerformanceScreenOptions(currentScreen);
  const completeScreenOptions = createCompleteScreenOptions(currentScreen, {
    theme: currentTheme,
    animationType: currentAnimation,
    gestureType: currentGesture,
    presentationType: currentPresentation,
    accessibility: true,
    performance: true,
  });

  const handleScreenChange = (screen: typeof currentScreen) => {
    setCurrentScreen(screen);
    trackUserAction('screen_changed', { screen });
  };

  const handleThemeChange = (theme: typeof currentTheme) => {
    setCurrentTheme(theme);
    trackUserAction('theme_changed', { theme });
  };

  const handleAnimationChange = (animation: typeof currentAnimation) => {
    setCurrentAnimation(animation);
    trackUserAction('animation_changed', { animation });
  };

  const handleGestureChange = (gesture: typeof currentGesture) => {
    setCurrentGesture(gesture);
    trackUserAction('gesture_changed', { gesture });
  };

  const handlePresentationChange = (presentation: typeof currentPresentation) => {
    setCurrentPresentation(presentation);
    trackUserAction('presentation_changed', { presentation });
  };

  const screens = [
    { key: 'home', label: 'Inicio', icon: '🏠' },
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'settings', label: 'Configuración', icon: '⚙️' },
    { key: 'charts', label: 'Gráficos', icon: '📈' },
  ] as const;

  const themes = [
    { key: 'light', label: 'Claro', icon: '☀️' },
    { key: 'dark', label: 'Oscuro', icon: '🌙' },
  ] as const;

  const animations = [
    { key: 'slide_from_right', label: 'Derecha', icon: '➡️' },
    { key: 'slide_from_left', label: 'Izquierda', icon: '⬅️' },
    { key: 'slide_from_bottom', label: 'Abajo', icon: '⬇️' },
    { key: 'fade', label: 'Fade', icon: '✨' },
  ] as const;

  const gestures = [
    { key: 'main', label: 'Principal', icon: '📱' },
    { key: 'modal', label: 'Modal', icon: '📋' },
    { key: 'bottomSheet', label: 'Bottom Sheet', icon: '📄' },
    { key: 'settings', label: 'Configuración', icon: '⚙️' },
  ] as const;

  const presentations = [
    { key: 'default', label: 'Por Defecto', icon: '📱' },
    { key: 'modal', label: 'Modal', icon: '📋' },
    { key: 'transparent', label: 'Transparente', icon: '👻' },
    { key: 'fullScreen', label: 'Pantalla Completa', icon: '🖥️' },
  ] as const;

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              React Native Screens Demo
            </Title>
            <Paragraph className="text-text-secondary">
              Demostración de React Native Screens para diferentes configuraciones y optimizaciones
            </Paragraph>
          </View>

          {/* Información del dispositivo */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title>Información del Dispositivo</Title>
              <Paragraph>Plataforma: {deviceInfo.platform}</Paragraph>
              <Paragraph>Tamaño de pantalla: {deviceInfo.screenSize}</Paragraph>
              <Paragraph>Orientación: {deviceInfo.orientation}</Paragraph>
              <Paragraph>Ancho: {deviceInfo.width}px</Paragraph>
              <Paragraph>Alto: {deviceInfo.height}px</Paragraph>
            </Card.Content>
          </Card>

          {/* Selector de pantalla */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Selector de Pantalla</Title>
              <Paragraph>Pantalla actual: {currentScreen}</Paragraph>
              
              <View className="mt-4 flex-row flex-wrap gap-2">
                {screens.map((screen) => (
                  <TouchableOpacity
                    key={screen.key}
                    className={`px-3 py-2 rounded ${
                      currentScreen === screen.key
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleScreenChange(screen.key)}
                  >
                    <Text className={`font-medium text-center ${
                      currentScreen === screen.key ? 'text-white' : ''
                    }`}>
                      {screen.icon} {screen.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Selector de tema */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Selector de Tema</Title>
              <Paragraph>Tema actual: {currentTheme}</Paragraph>
              
              <View className="mt-4 flex-row flex-wrap gap-2">
                {themes.map((theme) => (
                  <TouchableOpacity
                    key={theme.key}
                    className={`px-3 py-2 rounded ${
                      currentTheme === theme.key
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleThemeChange(theme.key)}
                  >
                    <Text className={`font-medium text-center ${
                      currentTheme === theme.key ? 'text-white' : ''
                    }`}>
                      {theme.icon} {theme.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Selector de animación */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Selector de Animación</Title>
              <Paragraph>Animación actual: {currentAnimation}</Paragraph>
              
              <View className="mt-4 flex-row flex-wrap gap-2">
                {animations.map((animation) => (
                  <TouchableOpacity
                    key={animation.key}
                    className={`px-3 py-2 rounded ${
                      currentAnimation === animation.key
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleAnimationChange(animation.key)}
                  >
                    <Text className={`font-medium text-center ${
                      currentAnimation === animation.key ? 'text-white' : ''
                    }`}>
                      {animation.icon} {animation.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Selector de gestos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Selector de Gestos</Title>
              <Paragraph>Gesto actual: {currentGesture}</Paragraph>
              
              <View className="mt-4 flex-row flex-wrap gap-2">
                {gestures.map((gesture) => (
                  <TouchableOpacity
                    key={gesture.key}
                    className={`px-3 py-2 rounded ${
                      currentGesture === gesture.key
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleGestureChange(gesture.key)}
                  >
                    <Text className={`font-medium text-center ${
                      currentGesture === gesture.key ? 'text-white' : ''
                    }`}>
                      {gesture.icon} {gesture.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Selector de presentación */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Selector de Presentación</Title>
              <Paragraph>Presentación actual: {currentPresentation}</Paragraph>
              
              <View className="mt-4 flex-row flex-wrap gap-2">
                {presentations.map((presentation) => (
                  <TouchableOpacity
                    key={presentation.key}
                    className={`px-3 py-2 rounded ${
                      currentPresentation === presentation.key
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handlePresentationChange(presentation.key)}
                  >
                    <Text className={`font-medium text-center ${
                      currentPresentation === presentation.key ? 'text-white' : ''
                    }`}>
                      {presentation.icon} {presentation.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de pantalla */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Pantalla</Title>
              <Paragraph>Configuración actual para: {currentScreen}</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración Base:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Nombre: {screenConfig.name}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Título: {screenConfig.options.title}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Animación: {screenConfig.options.animation}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Gestos habilitados: {screenConfig.options.gestureEnabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Preload: {screenConfig.preload ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Cache: {screenConfig.cache ? 'Sí' : 'No'}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de animación */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Animación</Title>
              <Paragraph>Animación actual: {currentAnimation}</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración de Animación:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Tipo: {animationConfig.type}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Dirección: {animationConfig.direction}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Duración: {animationConfig.duration}ms
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Easing: {animationConfig.easing}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de gestos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Gestos</Title>
              <Paragraph>Gesto actual: {currentGesture}</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración de Gestos:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Habilitado: {gestureConfig.gestureEnabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Dirección: {gestureConfig.gestureDirection}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Distancia de respuesta: {gestureConfig.gestureResponseDistance}px
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de presentación */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Presentación</Title>
              <Paragraph>Presentación actual: {currentPresentation}</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración de Presentación:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Tipo: {presentationConfig.presentation}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Animación: {presentationConfig.animation}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Gestos habilitados: {presentationConfig.gestureEnabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Dirección de gestos: {presentationConfig.gestureDirection}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de accesibilidad */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Accesibilidad</Title>
              <Paragraph>Configuración para: {deviceInfo.screenSize}</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración de Accesibilidad:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Habilitado: {accessibilityConfig.enabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Animación: {accessibilityConfig.animation}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Duración: {accessibilityConfig.duration}ms
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Easing: {accessibilityConfig.easing}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de rendimiento */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Rendimiento</Title>
              <Paragraph>Configuración de optimización</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración de Rendimiento:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Worklets habilitados: {performanceConfig.worklets.enabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Cache habilitado: {performanceConfig.cache.enabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Tamaño máximo de cache: {performanceConfig.cache.maxSize}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Pantallas concurrentes máximas: {performanceConfig.limits.maxConcurrentScreens}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Pantallas de preload máximas: {performanceConfig.limits.maxPreloadScreens}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Opciones de pantalla */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Opciones de Pantalla</Title>
              <Paragraph>Opciones generadas para: {currentScreen}</Paragraph>
              
              <View className="mt-4 space-y-4">
                <View className="p-4 bg-surface rounded-md">
                  <Text className={themedClasses.textSecondary + ' mb-2'}>
                    Opciones Básicas:
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Título: {screenOptions.title}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Animación: {screenOptions.animation}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Gestos habilitados: {screenOptions.gestureEnabled ? 'Sí' : 'No'}
                  </Text>
                </View>

                <View className="p-4 bg-surface rounded-md">
                  <Text className={themedClasses.textSecondary + ' mb-2'}>
                    Opciones con Tema ({currentTheme}):
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Color de header: {themedScreenOptions.headerTintColor}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Color de fondo: {themedScreenOptions.cardStyle?.backgroundColor}
                  </Text>
                </View>

                <View className="p-4 bg-surface rounded-md">
                  <Text className={themedClasses.textSecondary + ' mb-2'}>
                    Opciones Completas:
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Título: {completeScreenOptions.title}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Animación: {completeScreenOptions.animation}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Presentación: {completeScreenOptions.presentation}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Gestos habilitados: {completeScreenOptions.gestureEnabled ? 'Sí' : 'No'}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración completa */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración Completa</Title>
              <Paragraph>Configuración detallada del sistema</Paragraph>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración del Sistema:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Pantallas configuradas: {Object.keys(deviceCompleteConfig.screenConfigs).length}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Animaciones disponibles: {Object.keys(deviceCompleteConfig.animationConfigs.enter).length}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Gestos configurados: {Object.keys(deviceCompleteConfig.gestureConfigs.navigation.specific).length}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Presentaciones disponibles: {Object.keys(deviceCompleteConfig.presentationConfigs.card).length}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Cache habilitado: {deviceCompleteConfig.cacheConfig.enabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Preload habilitado: {deviceCompleteConfig.preloadConfig.enabled ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Lazy loading habilitado: {deviceCompleteConfig.lazyLoadingConfig.enabled ? 'Sí' : 'No'}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              React Native Screens está configurado y funcionando
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Todas las pantallas están optimizadas para rendimiento y accesibilidad
            </Paragraph>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ScreensDemo;
