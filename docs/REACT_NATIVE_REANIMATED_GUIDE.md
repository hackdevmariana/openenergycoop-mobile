# React Native Reanimated - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración de Animaciones](#configuración-de-animaciones)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

**React Native Reanimated** es una biblioteca de animaciones para React Native que permite crear animaciones fluidas y de alto rendimiento ejecutándose en el hilo nativo, proporcionando una experiencia de usuario excepcional.

### **¿Por qué React Native Reanimated?**

#### **✅ Ventajas Principales**
- ⚡ **Rendimiento nativo**: Las animaciones se ejecutan en el hilo nativo
- 🎯 **API declarativa**: Sintaxis clara y fácil de usar
- 🔧 **Configuración flexible**: Múltiples tipos de animaciones y easing
- 📱 **Multiplataforma**: Funciona perfectamente en iOS y Android
- 🎮 **Efectos avanzados**: Partículas, confeti, ondas, etc.
- 🔄 **Integración perfecta**: Con React Native Gesture Handler
- 📊 **Analytics integrado**: Seguimiento automático de interacciones
- 🎨 **Easing personalizados**: Curvas de animación específicas para energía

#### **❌ Alternativas Menos Recomendadas**
- ❌ **Animated API nativo**: Menos flexible y peor rendimiento
- ❌ **Lottie**: Solo para animaciones predefinidas
- ❌ **React Native Animated**: Limitado y menos eficiente

## ⚙️ Instalación y Configuración

### **1. Instalación**

```bash
npm install react-native-reanimated
```

### **2. Configuración de Babel**

```javascript
// babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin', // Debe ser el último plugin
  ],
};
```

### **3. Configuración de index.js**

```javascript
// index.js
import 'react-native-gesture-handler';
import 'react-native-reanimated'; // Importar antes de AppRegistry
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

## 🎨 Configuración de Animaciones

### **1. Configuración Básica**

```typescript
// src/config/reanimated.ts
import { Easing } from 'react-native-reanimated';

export const REANIMATED_CONFIG = {
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
      verySlow: 800,
    },
    
    easing: {
      energy: {
        solar: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Suave y natural
        wind: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Elástico
        hydro: Easing.bezier(0.55, 0.055, 0.675, 0.19), // Fluido
        nuclear: Easing.bezier(0.6, 0.04, 0.98, 0.335), // Potente
        biomass: Easing.bezier(0.25, 0.8, 0.25, 1), // Orgánico
        geothermal: Easing.bezier(0.77, 0, 0.175, 1), // Profundo
      },
      
      consumption: {
        low: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Suave
        medium: Easing.bezier(0.55, 0.055, 0.675, 0.19), // Moderado
        high: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Intenso
        critical: Easing.bezier(0.6, 0.04, 0.98, 0.335), // Crítico
      },
    },
  },
};
```

### **2. Configuraciones de Componentes**

```typescript
export const COMPONENT_ANIMATIONS = {
  energyCard: {
    enter: {
      duration: 300,
      easing: REANIMATED_CONFIG.animations.easing.energy.solar,
      initialValues: {
        opacity: 0,
        scale: 0.8,
        translateY: 50,
      },
      targetValues: {
        opacity: 1,
        scale: 1,
        translateY: 0,
      },
    },
    exit: {
      duration: 250,
      easing: REANIMATED_CONFIG.animations.easing.app.exit,
      targetValues: {
        opacity: 0,
        scale: 0.8,
        translateY: -50,
      },
    },
    press: {
      duration: 100,
      easing: REANIMATED_CONFIG.animations.easing.app.bounce,
      targetValues: {
        scale: 0.95,
      },
    },
  },
};
```

## 🎣 Hook Personalizado

### **1. Hook useReanimated**

```typescript
// src/hooks/useReanimated.ts
export const useReanimated = () => {
  // Valores compartidos básicos
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Función para crear animaciones de entrada
  const createEnterAnimation = useCallback((
    type: keyof typeof componentAnimations,
    duration?: number,
    easing?: any
  ) => {
    const config = componentAnimations[type];
    if (!config?.enter) return;

    const animDuration = duration || config.enter.duration;
    const animEasing = easing || config.enter.easing;

    // Aplicar valores iniciales
    if (config.enter.initialValues) {
      Object.entries(config.enter.initialValues).forEach(([key, value]) => {
        if (key === 'opacity') opacity.value = value as number;
        if (key === 'scale') scale.value = value as number;
        if (key === 'translateX') translateX.value = value as number;
        if (key === 'translateY') translateY.value = value as number;
        if (key === 'rotation') rotation.value = value as number;
      });
    }

    // Animar a valores objetivo
    if (config.enter.targetValues) {
      Object.entries(config.enter.targetValues).forEach(([key, value]) => {
        if (key === 'opacity') {
          opacity.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        // ... más propiedades
      });
    }
  }, [componentAnimations, opacity, scale, translateX, translateY, rotation]);

  // Función para crear animaciones de energía específicas
  const createEnergyAnimation = useCallback((
    energyType: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal',
    animationType: 'pulse' | 'rotate' | 'bounce' | 'wave' | 'particles'
  ) => {
    const easing = animationConfig.easing.energy[energyType];

    switch (animationType) {
      case 'pulse':
        scale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: 1000, easing }),
            withTiming(1, { duration: 1000, easing })
          ),
          -1,
          true
        );
        break;
      // ... más casos
    }
  }, [animationConfig.easing.energy, scale, rotation, translateY, translateX, opacity]);

  return {
    // Valores compartidos
    opacity,
    scale,
    translateX,
    translateY,
    rotation,
    
    // Funciones de animación
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
    
    // Estilos y valores derivados
    animatedStyle,
    derivedOpacity,
    derivedScale,
  };
};
```

## 🧩 Componente de Demostración

### **1. ReanimatedDemo Component**

```typescript
// src/components/ReanimatedDemo.tsx
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
  const [currentEnergyType, setCurrentEnergyType] = useState<'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal'>('solar');
  const [currentConsumptionLevel, setCurrentConsumptionLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('low');

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

  // Efectos iniciales
  useEffect(() => {
    createEnterAnimation('energyCard');
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

  const handleParticleEffect = () => {
    const particles = createParticleEffect(currentEnergyType);
    if (particles) {
      particles.forEach(particle => particle.startAnimation());
    }
    trackUserAction('particle_effect_triggered', { energyType: currentEnergyType });
  };

  const handleConfettiEffect = () => {
    const confetti = createConfettiEffect('celebration');
    if (confetti) {
      confetti.forEach(conf => conf.startAnimation());
    }
    trackUserAction('confetti_effect_triggered', { type: 'celebration' });
  };

  const handleRippleEffect = () => {
    const ripples = createRippleEffect('button');
    if (ripples) {
      ripples.forEach(ripple => ripple.startAnimation());
    }
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
                className="mb-2"
              >
                Efecto de Partículas
              </Button>
              
              <Button
                mode="contained"
                onPress={handleConfettiEffect}
                className="mb-2"
              >
                Efecto de Confeti
              </Button>
              
              <Button
                mode="contained"
                onPress={handleRippleEffect}
                className="mb-2"
              >
                Efecto de Ondas
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
```

## 🎯 Casos de Uso

### **1. Animaciones de Tarjetas de Energía**

```typescript
const EnergyCard: React.FC<EnergyCardProps> = ({ energyType, efficiency, onPress }) => {
  const { createEnterAnimation, createPressAnimation, animatedStyle } = useReanimated();

  useEffect(() => {
    createEnterAnimation('energyCard');
  }, []);

  const handlePress = () => {
    createPressAnimation('energyCard', true);
    setTimeout(() => {
      createPressAnimation('energyCard', false);
    }, 150);
    onPress?.();
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress}>
        <Card>
          <Card.Content>
            <Title>{energyType} Energy</Title>
            <Paragraph>Efficiency: {efficiency}%</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};
```

### **2. Gráficos de Consumo Animados**

```typescript
const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ data, consumptionLevel }) => {
  const { createConsumptionAnimation, createTransitionAnimation } = useReanimated();
  const progressValue = useSharedValue(0);

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

  useEffect(() => {
    progressValue.value = withTiming(data.progress, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    });
    
    createConsumptionAnimation(consumptionLevel, 'progress');
  }, [data.progress, consumptionLevel]);

  return (
    <View>
      <Text>Consumption Progress</Text>
      <View className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <Animated.View className="h-full rounded-full" style={progressStyle} />
      </View>
    </View>
  );
};
```

### **3. Efectos de Celebración**

```typescript
const CelebrationEffect: React.FC<{ type: 'achievement' | 'milestone' }> = ({ type }) => {
  const { createConfettiEffect, createParticleEffect } = useReanimated();

  const handleCelebration = () => {
    // Efecto de confeti
    const confetti = createConfettiEffect(type);
    if (confetti) {
      confetti.forEach(conf => conf.startAnimation());
    }

    // Efecto de partículas
    const particles = createParticleEffect('solar');
    if (particles) {
      particles.forEach(particle => particle.startAnimation());
    }
  };

  return (
    <Button mode="contained" onPress={handleCelebration}>
      ¡Celebrar!
    </Button>
  );
};
```

### **4. Transiciones de Pantalla**

```typescript
const ScreenTransition: React.FC<ScreenTransitionProps> = ({ isVisible, children }) => {
  const { createEnterAnimation, createExitAnimation, animatedStyle } = useReanimated();

  useEffect(() => {
    if (isVisible) {
      createEnterAnimation('modal');
    } else {
      createExitAnimation('modal');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};
```

## ✅ Mejores Prácticas

### **1. Uso de useSharedValue**

```typescript
// ✅ Correcto - Usar valores compartidos
const opacity = useSharedValue(1);
const scale = useSharedValue(1);

// ❌ Incorrecto - Usar useState para animaciones
const [opacity, setOpacity] = useState(1);
const [scale, setScale] = useState(1);
```

### **2. Configuración de Easing**

```typescript
// ✅ Correcto - Usar easing específicos para energía
const easing = animationConfig.easing.energy.solar;
opacity.value = withTiming(1, { duration: 300, easing });

// ❌ Incorrecto - Usar easing genérico
opacity.value = withTiming(1, { duration: 300 });
```

### **3. Optimización de Rendimiento**

```typescript
// ✅ Correcto - Usar useCallback para funciones
const createAnimation = useCallback(() => {
  // Lógica de animación
}, [dependencies]);

// ❌ Incorrecto - Crear funciones en cada render
const createAnimation = () => {
  // Lógica de animación
};
```

### **4. Gestión de Efectos**

```typescript
// ✅ Correcto - Limpiar efectos
useEffect(() => {
  const particles = createParticleEffect('solar');
  particles.forEach(particle => particle.startAnimation());
  
  return () => {
    // Limpiar efectos al desmontar
  };
}, []);

// ❌ Incorrecto - No limpiar efectos
useEffect(() => {
  const particles = createParticleEffect('solar');
  particles.forEach(particle => particle.startAnimation());
}, []);
```

## 🔧 Solución de Problemas

### **1. Animaciones no se ejecutan**

**Problema**: Las animaciones no funcionan

**Solución**:
```typescript
// Verificar configuración de Babel
// babel.config.js debe tener 'react-native-reanimated/plugin' al final
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin', // Debe ser el último
  ],
};
```

### **2. Errores de worklets**

**Problema**: Errores relacionados con worklets

**Solución**:
```typescript
// Usar runOnJS para funciones de JavaScript
const handleComplete = () => {
  console.log('Animation completed');
};

opacity.value = withTiming(0, {
  duration: 300,
}, (finished) => {
  if (finished) {
    runOnJS(handleComplete)();
  }
});
```

### **3. Rendimiento lento**

**Problema**: Las animaciones causan lag

**Solución**:
```typescript
// Usar useNativeDriver cuando sea posible
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
    ],
  };
}, []);
```

### **4. Animaciones no se cancelan**

**Problema**: Las animaciones continúan después de desmontar

**Solución**:
```typescript
// Cancelar animaciones en cleanup
useEffect(() => {
  const animation = withTiming(1, { duration: 1000 });
  
  return () => {
    // Cancelar animación al desmontar
    cancelAnimation(animation);
  };
}, []);
```

### **5. Easing no funciona**

**Problema**: Los easing personalizados no se aplican

**Solución**:
```typescript
// Verificar importación de Easing
import { Easing } from 'react-native-reanimated';

const customEasing = Easing.bezier(0.25, 0.46, 0.45, 0.94);
opacity.value = withTiming(1, {
  duration: 300,
  easing: customEasing,
});
```

## 🎉 Conclusión

React Native Reanimated proporciona:

- ✅ **Rendimiento nativo** con ejecución en hilo nativo
- ✅ **API declarativa** fácil de usar
- ✅ **Easing personalizados** para diferentes tipos de energía
- ✅ **Efectos avanzados** como partículas y confeti
- ✅ **Integración perfecta** con React Native Gesture Handler
- ✅ **Analytics automático** de interacciones
- ✅ **Configuración flexible** para diferentes casos de uso
- ✅ **Optimizaciones de rendimiento** automáticas

El sistema está completamente configurado y listo para usar, proporcionando animaciones fluidas y de alto rendimiento para la aplicación de energía. 🚀
