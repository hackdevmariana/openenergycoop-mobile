import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Switch } from 'react-native-paper';
import CustomSplashScreen from './CustomSplashScreen';
import { useSplashScreen, useDynamicSplashTheme, SEASONAL_THEMES, SPECIAL_THEMES } from '../config/splashScreen';
import { useTheme } from '../hooks/useTheme';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const SplashScreenDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { getCurrentTheme, getCurrentSeason, getCurrentTime } = useSplashScreen();
  const { getSpecialTheme } = useDynamicSplashTheme();

  const [showSplash, setShowSplash] = useState(false);
  const [splashConfig, setSplashConfig] = useState({
    duration: 3000,
    showProgress: true,
    enableAnimations: true,
    customTheme: null,
  });

  // Track carga de pantalla
  React.useEffect(() => {
    trackUserAction('splash_demo_viewed', {
      screen_name: 'Splash Screen Demo',
      demo_mode: true,
    });
  }, []);

  const handleShowSplash = (config?: any) => {
    if (config) {
      setSplashConfig(config);
    }
    setShowSplash(true);
    
    trackUserAction('splash_screen_triggered', {
      config: config || splashConfig,
      demo_mode: true,
    });
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
    
    trackUserAction('splash_screen_finished', {
      demo_mode: true,
    });
  };

  const showSeasonalSplash = (season: string) => {
    const theme = SEASONAL_THEMES[season];
    handleShowSplash({
      ...splashConfig,
      customTheme: theme,
      duration: 2500,
    });
  };

  const showSpecialSplash = (theme: string) => {
    const specialTheme = SPECIAL_THEMES[theme];
    handleShowSplash({
      ...splashConfig,
      customTheme: specialTheme,
      duration: 4000,
    });
  };

  const showCustomSplash = () => {
    const customTheme = {
      background: '#1C1C1E',
      primaryColor: '#FFD700',
      secondaryColor: '#87CEEB',
      text: '#FFFFFF',
      icon: '⚡',
      message: 'Energía personalizada para ti',
    };
    
    handleShowSplash({
      ...splashConfig,
      customTheme,
      duration: 3500,
    });
  };

  const currentTheme = getCurrentTheme();
  const currentSeason = getCurrentSeason();
  const currentTime = getCurrentTime();
  const specialTheme = getSpecialTheme();

  return (
    <>
      {showSplash && (
        <CustomSplashScreen
          onFinish={handleSplashFinish}
          duration={splashConfig.duration}
          showProgress={splashConfig.showProgress}
          enableAnimations={splashConfig.enableAnimations}
          customTheme={splashConfig.customTheme}
        />
      )}

      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-text">
              Splash Screen Demo
            </Text>
            <Text className="text-text-secondary">
              Demostración de pantalla de carga personalizada
            </Text>
          </View>

          {/* Estado actual */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Estado Actual</Title>
              
              <View className="mt-4 space-y-2">
                <Text className={themedClasses.textSecondary}>
                  Temporada: {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Hora del día: {currentTime}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Tema especial: {specialTheme ? 'Activo' : 'No activo'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Icono actual: {currentTheme.icon}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Mensaje: {currentTheme.message}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Splash Screen Básico */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Splash Screen Básico</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Muestra el splash screen con la configuración actual
              </Paragraph>
              
              <TouchableOpacity 
                className={themedClasses.btnPrimary + ' mt-4'}
                onPress={() => handleShowSplash()}
              >
                <Text className="text-white font-medium text-center">
                  Mostrar Splash Screen
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Temas Estacionales */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Temas Estacionales</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Diferentes temas según la temporada del año
              </Paragraph>
              
              <View className="mt-4 space-y-2">
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSeasonalSplash('spring')}
                >
                  <Text className="font-medium text-center">🌸 Primavera</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSeasonalSplash('summer')}
                >
                  <Text className="font-medium text-center">☀️ Verano</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSeasonalSplash('autumn')}
                >
                  <Text className="font-medium text-center">🍂 Otoño</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSeasonalSplash('winter')}
                >
                  <Text className="font-medium text-center">❄️ Invierno</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Temas Especiales */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Temas Especiales</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Temas para ocasiones especiales y eventos
              </Paragraph>
              
              <View className="mt-4 space-y-2">
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSpecialSplash('earth_day')}
                >
                  <Text className="font-medium text-center">🌍 Día de la Tierra</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSpecialSplash('energy_saving')}
                >
                  <Text className="font-medium text-center">💡 Ahorro de Energía</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => showSpecialSplash('sustainability')}
                >
                  <Text className="font-medium text-center">🌱 Sostenibilidad</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Tema Personalizado */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Tema Personalizado</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Tema completamente personalizado con colores y mensaje únicos
              </Paragraph>
              
              <TouchableOpacity 
                className={themedClasses.btnPrimary + ' mt-4'}
                onPress={showCustomSplash}
              >
                <Text className="text-white font-medium text-center">
                  Mostrar Tema Personalizado
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          {/* Configuraciones */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Configuraciones</Title>
              
              <View className="mt-4 space-y-3">
                <View className="flex-row items-center justify-between">
                  <Text className={themedClasses.textSecondary}>Mostrar progreso</Text>
                  <Switch
                    value={splashConfig.showProgress}
                    onValueChange={(value) => setSplashConfig(prev => ({ ...prev, showProgress: value }))}
                    color="#007AFF"
                  />
                </View>
                
                <View className="flex-row items-center justify-between">
                  <Text className={themedClasses.textSecondary}>Animaciones</Text>
                  <Switch
                    value={splashConfig.enableAnimations}
                    onValueChange={(value) => setSplashConfig(prev => ({ ...prev, enableAnimations: value }))}
                    color="#007AFF"
                  />
                </View>
              </View>
              
              <View className="mt-4">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Duración: {splashConfig.duration}ms
                </Text>
                <TouchableOpacity 
                  className={themedClasses.btnSecondary}
                  onPress={() => {
                    const newDuration = splashConfig.duration === 3000 ? 5000 : 3000;
                    setSplashConfig(prev => ({ ...prev, duration: newDuration }));
                  }}
                >
                  <Text className="font-medium text-center">
                    Cambiar Duración ({splashConfig.duration === 3000 ? 'Corta' : 'Larga'})
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          {/* Información */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Características</Title>
              
              <View className="mt-4 space-y-2">
                <Text className={themedClasses.textSecondary}>
                  • Temas dinámicos según temporada y hora
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Temas especiales para eventos importantes
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Animaciones suaves y fluidas
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Barra de progreso opcional
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Personalización completa de colores
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Integración con analytics
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Efectos visuales avanzados
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Text className={themedClasses.textSecondary + ' text-center'}>
              El Splash Screen proporciona una experiencia de carga personalizada
            </Text>
            <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
              Similar al logo dinámico de Google, adaptándose a fechas y eventos especiales
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SplashScreenDemo;
