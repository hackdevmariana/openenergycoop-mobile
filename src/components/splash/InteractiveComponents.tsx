import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { CountdownConfig, ProgressConfig, AnimationConfig } from '../../services/dynamicContentService';

// Componente de cuenta atrás
interface CountdownProps {
  config: CountdownConfig;
  onComplete?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ config, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isComplete, setIsComplete] = useState(false);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetDate = new Date(config.targetDate);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsComplete(true);
        onComplete?.();
      }
    };

    // Calcular tiempo inicial
    calculateTimeLeft();
    
    // Actualizar cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [config.targetDate, onComplete]);

  // Animaciones
  useEffect(() => {
    if (config.animation.enabled) {
      switch (config.animation.type) {
        case 'pulse':
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseAnimation, {
                toValue: 1.1,
                duration: config.animation.duration,
                useNativeDriver: true,
              }),
              Animated.timing(pulseAnimation, {
                toValue: 1,
                duration: config.animation.duration,
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
          
        case 'bounce':
          Animated.loop(
            Animated.sequence([
              Animated.timing(pulseAnimation, {
                toValue: 1.2,
                duration: config.animation.duration / 2,
                useNativeDriver: true,
              }),
              Animated.timing(pulseAnimation, {
                toValue: 0.8,
                duration: config.animation.duration / 2,
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
          
        case 'shake':
          Animated.loop(
            Animated.sequence([
              Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
      }
    }
  }, [config.animation]);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const renderTimeUnit = (value: number, label: string) => {
    if (config.format === 'full' || config.format === label) {
      return (
        <View style={styles.timeUnit}>
          <Text style={[
            styles.timeValue,
            {
              fontSize: config.style.fontSize,
              fontWeight: config.style.fontWeight,
              color: config.style.color,
            }
          ]}>
            {formatTime(value)}
          </Text>
          {config.showLabels && (
            <Text style={[
              styles.timeLabel,
              {
                fontSize: config.style.fontSize * 0.6,
                color: config.style.color,
              }
            ]}>
              {label}
            </Text>
          )}
        </View>
      );
    }
    return null;
  };

  const containerStyle = [
    styles.countdownContainer,
    {
      backgroundColor: config.style.backgroundColor,
      borderRadius: config.style.borderRadius,
      padding: config.style.padding,
      transform: [
        { scale: pulseAnimation },
        { translateX: shakeAnimation },
      ],
    }
  ];

  if (isComplete) {
    return (
      <View style={containerStyle}>
        <Text style={[
          styles.completeText,
          {
            fontSize: config.style.fontSize,
            fontWeight: config.style.fontWeight,
            color: config.style.color,
          }
        ]}>
          ¡Ya está aquí! 🎉
        </Text>
      </View>
    );
  }

  return (
    <Animated.View style={containerStyle}>
      <View style={styles.timeContainer}>
        {renderTimeUnit(timeLeft.days, config.labels.days)}
        {renderTimeUnit(timeLeft.hours, config.labels.hours)}
        {renderTimeUnit(timeLeft.minutes, config.labels.minutes)}
        {renderTimeUnit(timeLeft.seconds, config.labels.seconds)}
      </View>
    </Animated.View>
  );
};

// Componente de barra de progreso
interface ProgressBarProps {
  config: ProgressConfig;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ config }) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const progress = config.current / config.total;
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [config.current, config.total]);

  return (
    <View style={styles.progressContainer}>
      <View style={[
        styles.progressBackground,
        {
          height: config.style.height,
          backgroundColor: config.style.backgroundColor,
          borderRadius: config.style.borderRadius,
        }
      ]}>
        <Animated.View style={[
          styles.progressFill,
          {
            width: progressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: config.style.progressColor,
            borderRadius: config.style.borderRadius,
          }
        ]} />
      </View>
      
      {config.showPercentage && (
        <Text style={styles.progressText}>
          {Math.round((config.current / config.total) * 100)}%
        </Text>
      )}
      
      <Text style={styles.progressUnit}>
        {config.current} / {config.total} {config.unit}
      </Text>
    </View>
  );
};

// Componente de partículas animadas
interface ParticlesProps {
  config: AnimationConfig;
}

export const Particles: React.FC<ParticlesProps> = ({ config }) => {
  const particles = useRef<Animated.Value[]>([]).current;
  
  useEffect(() => {
    // Crear partículas
    for (let i = 0; i < config.intensity; i++) {
      particles[i] = new Animated.Value(0);
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(particles[i], {
            toValue: 1,
            duration: config.duration,
            useNativeDriver: true,
          }),
          Animated.timing(particles[i], {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [config.intensity, config.duration]);

  const renderParticle = (index: number) => {
    const color = config.colors[index % config.colors.length];
    const size = Math.random() * 8 + 4;
    const startX = Math.random() * 300;
    const startY = Math.random() * 200;
    
    return (
      <Animated.View
        key={index}
        style={[
          styles.particle,
          {
            width: size,
            height: size,
            backgroundColor: color,
            left: startX,
            top: startY,
            opacity: particles[index],
            transform: [
              {
                translateY: particles[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
              {
                scale: particles[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.particlesContainer}>
      {Array.from({ length: config.intensity }, (_, index) => renderParticle(index))}
    </View>
  );
};

// Componente de confeti
interface ConfettiProps {
  config: AnimationConfig;
}

export const Confetti: React.FC<ConfettiProps> = ({ config }) => {
  const confettiPieces = useRef<Animated.Value[]>([]).current;
  
  useEffect(() => {
    // Crear piezas de confeti
    for (let i = 0; i < config.intensity; i++) {
      confettiPieces[i] = new Animated.Value(0);
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(confettiPieces[i], {
            toValue: 1,
            duration: config.duration,
            useNativeDriver: true,
          }),
          Animated.timing(confettiPieces[i], {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [config.intensity, config.duration]);

  const renderConfettiPiece = (index: number) => {
    const color = config.colors[index % config.colors.length];
    const size = Math.random() * 12 + 6;
    const startX = Math.random() * 300;
    const startY = -50;
    const endX = startX + (Math.random() - 0.5) * 200;
    const endY = 250;
    
    return (
      <Animated.View
        key={index}
        style={[
          styles.confettiPiece,
          {
            width: size,
            height: size,
            backgroundColor: color,
            left: startX,
            top: startY,
            opacity: confettiPieces[index],
            transform: [
              {
                translateX: confettiPieces[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, endX - startX],
                }),
              },
              {
                translateY: confettiPieces[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, endY - startY],
                }),
              },
              {
                rotate: confettiPieces[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.confettiContainer}>
      {Array.from({ length: config.intensity }, (_, index) => renderConfettiPiece(index))}
    </View>
  );
};

// Componente principal de interactividad
interface InteractiveComponentProps {
  type: 'countdown' | 'progress' | 'animation' | 'custom';
  config: CountdownConfig | ProgressConfig | AnimationConfig;
  onComplete?: () => void;
}

export const InteractiveComponent: React.FC<InteractiveComponentProps> = ({
  type,
  config,
  onComplete,
}) => {
  switch (type) {
    case 'countdown':
      return <Countdown config={config as CountdownConfig} onComplete={onComplete} />;
    case 'progress':
      return <ProgressBar config={config as ProgressConfig} />;
    case 'animation':
      const animationConfig = config as AnimationConfig;
      if (animationConfig.type === 'particles') {
        return <Particles config={animationConfig} />;
      } else if (animationConfig.type === 'confetti') {
        return <Confetti config={animationConfig} />;
      }
      return null;
    default:
      return null;
  }
};

// Estilos
const styles = StyleSheet.create({
  countdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  timeValue: {
    fontWeight: 'bold',
  },
  timeLabel: {
    marginTop: 4,
  },
  completeText: {
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progressBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  progressUnit: {
    fontSize: 14,
    marginTop: 4,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  confettiPiece: {
    position: 'absolute',
    borderRadius: 2,
  },
});
