import { useCallback, useMemo } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
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
import { Dimensions } from 'react-native';
import { reanimatedConfig } from '../config/reanimated';

// Hook principal para react-native-reanimated
export const useReanimated = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Valores compartidos básicos
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  // Configuración de animaciones
  const animationConfig = useMemo(() => reanimatedConfig.animations, []);
  const componentAnimations = useMemo(() => reanimatedConfig.componentAnimations, []);
  const visualEffects = useMemo(() => reanimatedConfig.visualEffects, []);

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
        if (key === 'scale') {
          scale.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        if (key === 'translateX') {
          translateX.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        if (key === 'translateY') {
          translateY.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        if (key === 'rotation') {
          rotation.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
      });
    }
  }, [componentAnimations, opacity, scale, translateX, translateY, rotation]);

  // Función para crear animaciones de salida
  const createExitAnimation = useCallback((
    type: keyof typeof componentAnimations,
    duration?: number,
    easing?: any,
    onComplete?: () => void
  ) => {
    const config = componentAnimations[type];
    if (!config?.exit) return;

    const animDuration = duration || config.exit.duration;
    const animEasing = easing || config.exit.easing;

    // Animar a valores de salida
    if (config.exit.targetValues) {
      Object.entries(config.exit.targetValues).forEach(([key, value]) => {
        if (key === 'opacity') {
          opacity.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          }, (finished) => {
            if (finished && onComplete) {
              runOnJS(onComplete)();
            }
          });
        }
        if (key === 'scale') {
          scale.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        if (key === 'translateX') {
          translateX.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        if (key === 'translateY') {
          translateY.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
        if (key === 'rotation') {
          rotation.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
      });
    }
  }, [componentAnimations, opacity, scale, translateX, translateY, rotation]);

  // Función para crear animaciones de presión
  const createPressAnimation = useCallback((
    type: keyof typeof componentAnimations,
    isPressed: boolean,
    duration?: number,
    easing?: any
  ) => {
    const config = componentAnimations[type];
    if (!config?.press) return;

    const animDuration = duration || config.press.duration;
    const animEasing = easing || config.press.easing;

    if (isPressed && config.press.targetValues) {
      Object.entries(config.press.targetValues).forEach(([key, value]) => {
        if (key === 'scale') {
          scale.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
      });
    } else if (!isPressed && config.release) {
      Object.entries(config.release.targetValues || { scale: 1 }).forEach(([key, value]) => {
        if (key === 'scale') {
          scale.value = withTiming(value as number, {
            duration: animDuration,
            easing: animEasing,
          });
        }
      });
    }
  }, [componentAnimations, scale]);

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

      case 'rotate':
        rotation.value = withRepeat(
          withTiming(360, { duration: 3000, easing }),
          -1,
          false
        );
        break;

      case 'bounce':
        translateY.value = withRepeat(
          withSequence(
            withTiming(-10, { duration: 500, easing }),
            withTiming(0, { duration: 500, easing })
          ),
          -1,
          true
        );
        break;

      case 'wave':
        translateX.value = withRepeat(
          withSequence(
            withTiming(-5, { duration: 1000, easing }),
            withTiming(5, { duration: 1000, easing })
          ),
          -1,
          true
        );
        break;

      case 'particles':
        // Animación compleja de partículas
        opacity.value = withRepeat(
          withSequence(
            withTiming(0.3, { duration: 500, easing }),
            withTiming(0.8, { duration: 500, easing })
          ),
          -1,
          true
        );
        break;
    }
  }, [animationConfig.easing.energy, scale, rotation, translateY, translateX, opacity]);

  // Función para crear animaciones de consumo
  const createConsumptionAnimation = useCallback((
    consumptionLevel: 'low' | 'medium' | 'high' | 'critical',
    animationType: 'progress' | 'alert' | 'pulse' | 'shake'
  ) => {
    const easing = animationConfig.easing.consumption[consumptionLevel];

    switch (animationType) {
      case 'progress':
        scale.value = withTiming(1, { duration: 500, easing });
        break;

      case 'alert':
        scale.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 200, easing }),
            withTiming(1, { duration: 200, easing })
          ),
          3,
          true
        );
        break;

      case 'pulse':
        opacity.value = withRepeat(
          withSequence(
            withTiming(0.7, { duration: 300, easing }),
            withTiming(1, { duration: 300, easing })
          ),
          -1,
          true
        );
        break;

      case 'shake':
        translateX.value = withRepeat(
          withSequence(
            withTiming(-5, { duration: 100, easing }),
            withTiming(5, { duration: 100, easing }),
            withTiming(-5, { duration: 100, easing }),
            withTiming(0, { duration: 100, easing })
          ),
          2,
          true
        );
        break;
    }
  }, [animationConfig.easing.consumption, scale, opacity, translateX]);

  // Función para crear efectos de partículas
  const createParticleEffect = useCallback((
    energyType: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal'
  ) => {
    const particleConfig = visualEffects.energyParticles[energyType];
    if (!particleConfig) return;

    // Crear múltiples partículas con diferentes configuraciones
    const particles = Array.from({ length: particleConfig.count }, (_, index) => {
      const particleOpacity = useSharedValue(particleConfig.opacity.min);
      const particleScale = useSharedValue(particleConfig.size.min);
      const particleTranslateX = useSharedValue(0);
      const particleTranslateY = useSharedValue(0);

      // Animar partícula
      const startAnimation = () => {
        particleOpacity.value = withTiming(particleConfig.opacity.max, {
          duration: 1000 + index * 50,
          easing: animationConfig.easing.energy[energyType],
        });

        particleScale.value = withTiming(particleConfig.size.max, {
          duration: 1000 + index * 50,
          easing: animationConfig.easing.energy[energyType],
        });

        particleTranslateX.value = withTiming(
          (Math.random() - 0.5) * 100,
          {
            duration: 1000 + index * 50,
            easing: animationConfig.easing.energy[energyType],
          }
        );

        particleTranslateY.value = withTiming(
          (Math.random() - 0.5) * 100,
          {
            duration: 1000 + index * 50,
            easing: animationConfig.easing.energy[energyType],
          }
        );
      };

      return {
        opacity: particleOpacity,
        scale: particleScale,
        translateX: particleTranslateX,
        translateY: particleTranslateY,
        startAnimation,
        color: particleConfig.colors[index % particleConfig.colors.length],
      };
    });

    return particles;
  }, [visualEffects.energyParticles, animationConfig.easing.energy]);

  // Función para crear efectos de confeti
  const createConfettiEffect = useCallback((
    type: 'celebration' | 'achievement'
  ) => {
    const confettiConfig = visualEffects.confetti[type];
    if (!confettiConfig) return;

    const confetti = Array.from({ length: confettiConfig.count }, (_, index) => {
      const confettiOpacity = useSharedValue(1);
      const confettiScale = useSharedValue(confettiConfig.size.min);
      const confettiTranslateX = useSharedValue(0);
      const confettiTranslateY = useSharedValue(0);
      const confettiRotation = useSharedValue(0);

      const startAnimation = () => {
        confettiOpacity.value = withTiming(0, {
          duration: 2000 + index * 20,
          easing: Easing.out(Easing.quad),
        });

        confettiScale.value = withTiming(confettiConfig.size.max, {
          duration: 1000 + index * 20,
          easing: Easing.out(Easing.quad),
        });

        confettiTranslateX.value = withTiming(
          (Math.random() - 0.5) * 200,
          {
            duration: 2000 + index * 20,
            easing: Easing.out(Easing.quad),
          }
        );

        confettiTranslateY.value = withTiming(
          -200 - Math.random() * 100,
          {
            duration: 2000 + index * 20,
            easing: Easing.out(Easing.quad),
          }
        );

        confettiRotation.value = withTiming(
          360 * (Math.random() + 1),
          {
            duration: 2000 + index * 20,
            easing: Easing.out(Easing.quad),
          }
        );
      };

      return {
        opacity: confettiOpacity,
        scale: confettiScale,
        translateX: confettiTranslateX,
        translateY: confettiTranslateY,
        rotation: confettiRotation,
        startAnimation,
        color: confettiConfig.colors[index % confettiConfig.colors.length],
      };
    });

    return confetti;
  }, [visualEffects.confetti]);

  // Función para crear efectos de ondas
  const createRippleEffect = useCallback((
    type: 'button' | 'card'
  ) => {
    const rippleConfig = visualEffects.ripple[type];
    if (!rippleConfig) return;

    const ripples = Array.from({ length: rippleConfig.count }, (_, index) => {
      const rippleScale = useSharedValue(rippleConfig.scale.min);
      const rippleOpacity = useSharedValue(rippleConfig.opacity.min);

      const startAnimation = () => {
        rippleScale.value = withTiming(rippleConfig.scale.max, {
          duration: rippleConfig.duration + index * 100,
          easing: Easing.out(Easing.quad),
        });

        rippleOpacity.value = withTiming(rippleConfig.opacity.max, {
          duration: rippleConfig.duration / 2 + index * 100,
          easing: Easing.out(Easing.quad),
        }, () => {
          rippleOpacity.value = withTiming(0, {
            duration: rippleConfig.duration / 2,
            easing: Easing.in(Easing.quad),
          });
        });
      };

      return {
        scale: rippleScale,
        opacity: rippleOpacity,
        startAnimation,
      };
    });

    return ripples;
  }, [visualEffects.ripple]);

  // Función para crear animaciones de transición
  const createTransitionAnimation = useCallback((
    fromValues: any,
    toValues: any,
    duration: number = 300,
    easing?: any
  ) => {
    const animEasing = easing || animationConfig.easing.app.enter;

    Object.entries(toValues).forEach(([key, value]) => {
      if (key === 'opacity') {
        opacity.value = withTiming(value as number, {
          duration,
          easing: animEasing,
        });
      }
      if (key === 'scale') {
        scale.value = withTiming(value as number, {
          duration,
          easing: animEasing,
        });
      }
      if (key === 'translateX') {
        translateX.value = withTiming(value as number, {
          duration,
          easing: animEasing,
        });
      }
      if (key === 'translateY') {
        translateY.value = withTiming(value as number, {
          duration,
          easing: animEasing,
        });
      }
      if (key === 'rotation') {
        rotation.value = withTiming(value as number, {
          duration,
          easing: animEasing,
        });
      }
    });
  }, [animationConfig.easing.app.enter, opacity, scale, translateX, translateY, rotation]);

  // Función para crear animaciones de spring
  const createSpringAnimation = useCallback((
    toValues: any,
    damping: number = 15,
    stiffness: number = 150
  ) => {
    Object.entries(toValues).forEach(([key, value]) => {
      if (key === 'opacity') {
        opacity.value = withSpring(value as number, {
          damping,
          stiffness,
        });
      }
      if (key === 'scale') {
        scale.value = withSpring(value as number, {
          damping,
          stiffness,
        });
      }
      if (key === 'translateX') {
        translateX.value = withSpring(value as number, {
          damping,
          stiffness,
        });
      }
      if (key === 'translateY') {
        translateY.value = withSpring(value as number, {
          damping,
          stiffness,
        });
      }
      if (key === 'rotation') {
        rotation.value = withSpring(value as number, {
          damping,
          stiffness,
        });
      }
    });
  }, [opacity, scale, translateX, translateY, rotation]);

  // Función para crear animaciones de secuencia
  const createSequenceAnimation = useCallback((
    animations: Array<{
      type: 'timing' | 'spring';
      toValues: any;
      duration?: number;
      easing?: any;
      delay?: number;
    }>
  ) => {
    animations.forEach((animation, index) => {
      const delay = animation.delay || 0;
      const totalDelay = delay + (index * 100);

      if (animation.type === 'timing') {
        setTimeout(() => {
          createTransitionAnimation(
            {},
            animation.toValues,
            animation.duration || 300,
            animation.easing
          );
        }, totalDelay);
      } else if (animation.type === 'spring') {
        setTimeout(() => {
          createSpringAnimation(animation.toValues);
        }, totalDelay);
      }
    });
  }, [createTransitionAnimation, createSpringAnimation]);

  // Función para crear animaciones de interpolación
  const createInterpolatedAnimation = useCallback((
    inputRange: number[],
    outputRange: number[],
    extrapolate: 'clamp' | 'extend' | 'identity' = 'clamp'
  ) => {
    return interpolate(
      opacity.value,
      inputRange,
      outputRange,
      Extrapolate[extrapolate.toUpperCase()]
    );
  }, [opacity]);

  // Función para resetear animaciones
  const resetAnimations = useCallback(() => {
    opacity.value = 1;
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    rotation.value = 0;
  }, [opacity, scale, translateX, translateY, rotation]);

  // Función para pausar animaciones
  const pauseAnimations = useCallback(() => {
    // Las animaciones se pausan automáticamente cuando se cancela
    // Esta función puede ser útil para casos específicos
  }, []);

  // Función para reanudar animaciones
  const resumeAnimations = useCallback(() => {
    // Las animaciones se reanudan automáticamente
    // Esta función puede ser útil para casos específicos
  }, []);

  // Estilos animados derivados
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  // Valores derivados para efectos complejos
  const derivedOpacity = useDerivedValue(() => {
    return opacity.value;
  });

  const derivedScale = useDerivedValue(() => {
    return scale.value;
  });

  return {
    // Valores compartidos
    opacity,
    scale,
    translateX,
    translateY,
    rotation,
    
    // Configuraciones
    animationConfig,
    componentAnimations,
    visualEffects,
    
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
    createInterpolatedAnimation,
    
    // Funciones de control
    resetAnimations,
    pauseAnimations,
    resumeAnimations,
    
    // Estilos y valores derivados
    animatedStyle,
    derivedOpacity,
    derivedScale,
    
    // Información de pantalla
    screenWidth,
    screenHeight,
  };
};
