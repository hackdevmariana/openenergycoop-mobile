import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useSplashScreen, useDynamicSplashTheme } from '../config/splashScreen';
import { useTheme } from '../hooks/useTheme';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { InteractiveComponent } from './splash/InteractiveComponents';

const { width, height } = Dimensions.get('window');

interface CustomSplashScreenProps {
  onFinish?: () => void;
  duration?: number;
  showProgress?: boolean;
  enableAnimations?: boolean;
  customTheme?: any;
}

const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({
  onFinish,
  duration = 3000,
  showProgress = true,
  enableAnimations = true,
  customTheme,
}) => {
  const { getCurrentTheme, getDynamicTheme, setSeasonalTheme } = useSplashScreen();
  const { getCurrentSeason, getCurrentTime } = useDynamicSplashTheme();
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();

  // Estados
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Track evento de splash screen
  useEffect(() => {
    trackUserAction('splash_screen_viewed', {
      theme: currentTheme,
      season: getCurrentSeason(),
      time_of_day: getCurrentTime(),
      duration: duration,
    });
  }, []);

  // Configurar tema dinámico
  useEffect(() => {
    const loadDynamicTheme = async () => {
      if (customTheme) {
        setCurrentTheme(customTheme);
      } else {
        try {
          // Intentar obtener tema dinámico remoto
          const dynamicTheme = await getDynamicTheme();
          if (dynamicTheme) {
            setCurrentTheme(dynamicTheme);
          } else {
            // Fallback a tema local
            setSeasonalTheme();
            setCurrentTheme(getCurrentTheme());
          }
        } catch (error) {
          console.error('❌ Error cargando tema dinámico:', error);
          // Fallback a tema local
          setSeasonalTheme();
          setCurrentTheme(getCurrentTheme());
        }
      }
    };

    loadDynamicTheme();
  }, [customTheme]);

  // Animaciones de entrada
  useEffect(() => {
    if (enableAnimations) {
      // Animación de fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // Animación de scale
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Animación de rotación del icono
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [enableAnimations]);

  // Progreso de carga
  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (duration / 100));
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration, showProgress]);

  // Ocultar splash screen después del tiempo especificado
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enableAnimations) {
        // Animación de salida
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsVisible(false);
          onFinish?.();
        });
      } else {
        setIsVisible(false);
        onFinish?.();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, enableAnimations, onFinish]);

  // Animación de progreso
  useEffect(() => {
    if (showProgress) {
      Animated.timing(progressAnim, {
        toValue: progress / 100,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, showProgress]);

  if (!isVisible) {
    return null;
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar
        barStyle={currentTheme.text === '#FFFFFF' ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme.background}
        translucent
      />

      {/* Contenido principal */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Icono principal */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <Text style={[styles.icon, { color: currentTheme.primaryColor }]}>
            {currentTheme.icon}
          </Text>
        </Animated.View>

        {/* Logo de la aplicación */}
        <View style={styles.logoContainer}>
          <Text style={[styles.logo, { color: currentTheme.primaryColor }]}>
            OpenEnergyCoop
          </Text>
          <Text style={[styles.tagline, { color: currentTheme.secondaryColor }]}>
            Energía Renovable
          </Text>
        </View>

        {/* Mensaje dinámico */}
        <Animated.View
          style={[
            styles.messageContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={[styles.message, { color: currentTheme.text || '#000000' }]}>
            {currentTheme.message}
          </Text>
        </Animated.View>

        {/* Componente interactivo */}
        {currentTheme.interactive && (
          <View style={styles.interactiveContainer}>
            <InteractiveComponent
              type={currentTheme.interactive.type}
              config={currentTheme.interactive.config}
              onComplete={() => {
                console.log('🎉 Evento interactivo completado');
                trackUserAction('interactive_event_completed', {
                  event_type: currentTheme.interactive.type,
                  event_name: currentTheme.eventName,
                });
              }}
            />
          </View>
        )}

        {/* Información adicional */}
        <View style={styles.infoContainer}>
          <Text style={[styles.season, { color: currentTheme.secondaryColor }]}>
            {getCurrentSeason().charAt(0).toUpperCase() + getCurrentSeason().slice(1)}
          </Text>
          <Text style={[styles.time, { color: currentTheme.secondaryColor }]}>
            {getCurrentTime()}
          </Text>
        </View>
      </Animated.View>

      {/* Barra de progreso */}
      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: currentTheme.secondaryColor }]}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: currentTheme.primaryColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: currentTheme.text || '#000000' }]}>
            {Math.round(progress)}%
          </Text>
        </View>
      )}

      {/* Efectos visuales adicionales */}
      <View style={styles.effectsContainer}>
        {/* Partículas de energía */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                backgroundColor: currentTheme.secondaryColor,
                left: `${20 + index * 15}%`,
                animationDelay: `${index * 200}ms`,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 30,
  },
  icon: {
    fontSize: 80,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  interactiveContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  season: {
    fontSize: 14,
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 100,
    left: 40,
    right: 40,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  effectsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    opacity: 0.6,
  },
});

export default CustomSplashScreen;
