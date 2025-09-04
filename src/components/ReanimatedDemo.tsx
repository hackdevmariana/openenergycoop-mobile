import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  runOnJS,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useReanimated } from '../hooks/useReanimated';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { reanimatedConfig } from '../config/reanimated';

const ReanimatedDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    createEnterAnimation,
    createExitAnimation,
    createPressAnimation,
    createEnergyAnimation,
    createConsumptionAnimation,
    createParticleEffect,
    createConfettiEffect,
    createRippleEffect,
    createTransitionAnimation,
    createSpringAnimation,
    createSequenceAnimation,
    resetAnimations,
    animatedStyle,
    screenWidth,
    screenHeight,
  } = useReanimated();

  // Estados para controlar animaciones
  const [isVisible, setIsVisible] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [currentEnergyType, setCurrentEnergyType] = useState<'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal'>('solar');
  const [currentConsumptionLevel, setCurrentConsumptionLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [showParticles, setShowParticles] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  // Valores compartidos para animaciones específicas
  const progressValue = useSharedValue(0);
  const rotationValue = useSharedValue(0);
  const bounceValue = useSharedValue(0);
  const waveValue = useSharedValue(0);

  // Estilos animados específicos
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value * 100}%`,
      backgroundColor: interpolate(
        progressValue.value,
        [0, 0.5, 1],
        ['#4CAF50', '#FF9800', '#F44336'],
        Extrapolate.CLAMP
      ),
    };
  });

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotationValue.value}deg` }],
    };
  });

  const bounceStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bounceValue.value }],
    };
  });

  const waveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: waveValue.value }],
    };
  });

  // Efectos iniciales
  useEffect(() => {
    // Animación de entrada para el componente
    createEnterAnimation('energyCard');
    
    // Iniciar animaciones de demostración
    startDemoAnimations();
  }, []);

  const startDemoAnimations = () => {
    // Animación de progreso
    progressValue.value = withTiming(0.75, {
      duration: 2000,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });

    // Animación de rotación
    rotationValue.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );

    // Animación de rebote
    bounceValue.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 500, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) })
      ),
      -1,
      true
    );

    // Animación de onda
    waveValue.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  };

  const handleEnergyTypeChange = (energyType: typeof currentEnergyType) => {
    setCurrentEnergyType(energyType);
    createEnergyAnimation(energyType, 'pulse');
    trackUserAction('energy_animation_changed', { energyType });
  };

  const handleConsumptionLevelChange = (level: typeof currentConsumptionLevel) => {
    setCurrentConsumptionLevel(level);
    createConsumptionAnimation(level, 'alert');
    trackUserAction('consumption_animation_changed', { level });
  };

  const handleToggleVisibility = () => {
    if (isVisible) {
      createExitAnimation('energyCard', undefined, undefined, () => {
        runOnJS(setIsVisible)(false);
      });
    } else {
      setIsVisible(true);
      setTimeout(() => {
        createEnterAnimation('energyCard');
      }, 100);
    }
    trackUserAction('visibility_toggled', { isVisible: !isVisible });
  };

  const handlePressAnimation = () => {
    setIsPressed(true);
    createPressAnimation('actionButton', true);
    setTimeout(() => {
      setIsPressed(false);
      createPressAnimation('actionButton', false);
    }, 150);
    trackUserAction('press_animation_triggered', {});
  };

  const handleParticleEffect = () => {
    setShowParticles(true);
    const particles = createParticleEffect(currentEnergyType);
    if (particles) {
      particles.forEach(particle => particle.startAnimation());
    }
    setTimeout(() => setShowParticles(false), 3000);
    trackUserAction('particle_effect_triggered', { energyType: currentEnergyType });
  };

  const handleConfettiEffect = () => {
    setShowConfetti(true);
    const confetti = createConfettiEffect('celebration');
    if (confetti) {
      confetti.forEach(conf => conf.startAnimation());
    }
    setTimeout(() => setShowConfetti(false), 3000);
    trackUserAction('confetti_effect_triggered', { type: 'celebration' });
  };

  const handleRippleEffect = () => {
    setShowRipple(true);
    const ripples = createRippleEffect('button');
    if (ripples) {
      ripples.forEach(ripple => ripple.startAnimation());
    }
    setTimeout(() => setShowRipple(false), 1000);
    trackUserAction('ripple_effect_triggered', { type: 'button' });
  };

  const handleSpringAnimation = () => {
    createSpringAnimation({ scale: 1.2, rotation: 180 }, 10, 100);
    setTimeout(() => {
      createSpringAnimation({ scale: 1, rotation: 0 }, 10, 100);
    }, 500);
    trackUserAction('spring_animation_triggered', {});
  };

  const handleSequenceAnimation = () => {
    createSequenceAnimation([
      {
        type: 'timing',
        toValues: { scale: 1.3, opacity: 0.8 },
        duration: 300,
      },
      {
        type: 'spring',
        toValues: { scale: 1, opacity: 1 },
        delay: 100,
      },
      {
        type: 'timing',
        toValues: { translateY: -20 },
        duration: 200,
        delay: 200,
      },
      {
        type: 'spring',
        toValues: { translateY: 0 },
        delay: 300,
      },
    ]);
    trackUserAction('sequence_animation_triggered', {});
  };

  const handleResetAnimations = () => {
    resetAnimations();
    progressValue.value = 0;
    rotationValue.value = 0;
    bounceValue.value = 0;
    waveValue.value = 0;
    startDemoAnimations();
    trackUserAction('animations_reset', {});
  };

  const energyTypes = ['solar', 'wind', 'hydro', 'nuclear', 'biomass', 'geothermal'] as const;
  const consumptionLevels = ['low', 'medium', 'high', 'critical'] as const;

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Title className="text-2xl font-bold mb-2">
            React Native Reanimated Demo
          </Title>
          <Paragraph className="text-text-secondary">
            Demostración de animaciones avanzadas y efectos visuales para la aplicación de energía
          </Paragraph>
        </View>

        {/* Información de pantalla */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title>Información de Pantalla</Title>
            <Paragraph>Ancho: {screenWidth}px</Paragraph>
            <Paragraph>Alto: {screenHeight}px</Paragraph>
            <Paragraph>Relación: {(screenWidth / screenHeight).toFixed(2)}</Paragraph>
          </Card.Content>
        </Card>

        {/* Animaciones básicas */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Animaciones Básicas</Title>
            <Paragraph>Animaciones fundamentales con valores compartidos</Paragraph>
            
            <View className="mt-4 space-y-4">
              {/* Barra de progreso animada */}
              <View>
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Progreso de Energía: {Math.round(progressValue.value * 100)}%
                </Text>
                <View className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <Animated.View className="h-full rounded-full" style={progressStyle} />
                </View>
              </View>

              {/* Elemento rotatorio */}
              <View className="items-center">
                <Text className={themedClasses.textSecondary + ' mb-2'}>Elemento Rotatorio</Text>
                <Animated.View style={rotationStyle}>
                  <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
                    <Text className="text-white font-bold">⚡</Text>
                  </View>
                </Animated.View>
              </View>

              {/* Elemento con rebote */}
              <View className="items-center">
                <Text className={themedClasses.textSecondary + ' mb-2'}>Elemento con Rebote</Text>
                <Animated.View style={bounceStyle}>
                  <View className="w-16 h-16 bg-secondary rounded-full items-center justify-center">
                    <Text className="text-white font-bold">🔋</Text>
                  </View>
                </Animated.View>
              </View>

              {/* Elemento con onda */}
              <View className="items-center">
                <Text className={themedClasses.textSecondary + ' mb-2'}>Elemento con Onda</Text>
                <Animated.View style={waveStyle}>
                  <View className="w-16 h-16 bg-tertiary rounded-full items-center justify-center">
                    <Text className="text-white font-bold">💧</Text>
                  </View>
                </Animated.View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Animaciones de energía */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Animaciones de Energía</Title>
            <Paragraph>Animaciones específicas para diferentes tipos de energía</Paragraph>
            
            <View className="mt-4">
              <Text className={themedClasses.textSecondary + ' mb-2'}>
                Tipo de Energía: {currentEnergyType.toUpperCase()}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {energyTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    className={`px-3 py-2 rounded ${
                      currentEnergyType === type
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleEnergyTypeChange(type)}
                  >
                    <Text className={`font-medium text-center ${
                      currentEnergyType === type ? 'text-white' : ''
                    }`}>
                      {type === 'solar' && '🌞'}
                      {type === 'wind' && '💨'}
                      {type === 'hydro' && '💧'}
                      {type === 'nuclear' && '☢️'}
                      {type === 'biomass' && '🌱'}
                      {type === 'geothermal' && '🌋'}
                      {' '}{type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Animaciones de consumo */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Animaciones de Consumo</Title>
            <Paragraph>Animaciones para diferentes niveles de consumo energético</Paragraph>
            
            <View className="mt-4">
              <Text className={themedClasses.textSecondary + ' mb-2'}>
                Nivel de Consumo: {currentConsumptionLevel.toUpperCase()}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {consumptionLevels.map((level) => (
                  <TouchableOpacity
                    key={level}
                    className={`px-3 py-2 rounded ${
                      currentConsumptionLevel === level
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleConsumptionLevelChange(level)}
                  >
                    <Text className={`font-medium text-center ${
                      currentConsumptionLevel === level ? 'text-white' : ''
                    }`}>
                      {level === 'low' && '🟢'}
                      {level === 'medium' && '🟡'}
                      {level === 'high' && '🟠'}
                      {level === 'critical' && '🔴'}
                      {' '}{level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Efectos visuales */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Efectos Visuales</Title>
            <Paragraph>Efectos especiales para mejorar la experiencia de usuario</Paragraph>
            
            <View className="mt-4 space-y-3">
              <Button
                mode="contained"
                onPress={handleParticleEffect}
                disabled={showParticles}
                className="mb-2"
              >
                {showParticles ? 'Partículas Activas...' : 'Efecto de Partículas'}
              </Button>
              
              <Button
                mode="contained"
                onPress={handleConfettiEffect}
                disabled={showConfetti}
                className="mb-2"
              >
                {showConfetti ? 'Confeti Activo...' : 'Efecto de Confeti'}
              </Button>
              
              <Button
                mode="contained"
                onPress={handleRippleEffect}
                disabled={showRipple}
                className="mb-2"
              >
                {showRipple ? 'Ondas Activas...' : 'Efecto de Ondas'}
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Animaciones avanzadas */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Animaciones Avanzadas</Title>
            <Paragraph>Animaciones complejas y secuencias</Paragraph>
            
            <View className="mt-4 space-y-3">
              <Button
                mode="contained"
                onPress={handleSpringAnimation}
                className="mb-2"
              >
                Animación Spring
              </Button>
              
              <Button
                mode="contained"
                onPress={handleSequenceAnimation}
                className="mb-2"
              >
                Animación en Secuencia
              </Button>
              
              <Button
                mode="contained"
                onPress={handlePressAnimation}
                className="mb-2"
              >
                Animación de Presión
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Control de visibilidad */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Control de Visibilidad</Title>
            <Paragraph>Mostrar y ocultar elementos con animaciones</Paragraph>
            
            <View className="mt-4">
              <Button
                mode="contained"
                onPress={handleToggleVisibility}
                className="mb-4"
              >
                {isVisible ? 'Ocultar Elemento' : 'Mostrar Elemento'}
              </Button>
              
              {isVisible && (
                <Animated.View style={animatedStyle}>
                  <View className="p-4 bg-surface rounded-md border border-border">
                    <Text className={themedClasses.textPrimary + ' text-center'}>
                      Elemento Animado
                    </Text>
                    <Text className={themedClasses.textSecondary + ' text-center mt-2'}>
                      Este elemento aparece y desaparece con animaciones suaves
                    </Text>
                  </View>
                </Animated.View>
              )}
            </View>
          </Card.Content>
        </Card>

        {/* Configuración de animaciones */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Configuración</Title>
            <Paragraph>Configuración y control de animaciones</Paragraph>
            
            <View className="mt-4">
              <Button
                mode="contained"
                onPress={handleResetAnimations}
                className="mb-2"
              >
                Resetear Todas las Animaciones
              </Button>
              
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Configuración Actual:
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Tipo de energía: {currentEnergyType}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Nivel de consumo: {currentConsumptionLevel}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Elemento visible: {isVisible ? 'Sí' : 'No'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Efectos activos: {[showParticles, showConfetti, showRipple].filter(Boolean).length}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Información de rendimiento */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>Información de Rendimiento</Title>
            <Paragraph>Configuración de rendimiento y optimizaciones</Paragraph>
            
            <View className="mt-4 p-4 bg-surface rounded-md">
              <Text className={themedClasses.textSecondary + ' mb-2'}>
                Configuración de Rendimiento:
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Native Driver: Habilitado
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Worklets: Habilitados
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Cache: Habilitado
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Debug Mode: {__DEV__ ? 'Habilitado' : 'Deshabilitado'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View className="mt-6 p-4 bg-surface rounded-md">
          <Paragraph className="text-center">
            React Native Reanimated está configurado y funcionando
          </Paragraph>
          <Paragraph className="text-center mt-2">
            Todas las animaciones se ejecutan en el hilo nativo para mejor rendimiento
          </Paragraph>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReanimatedDemo;
