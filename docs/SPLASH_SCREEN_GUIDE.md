# Splash Screen React Native - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración Nativa](#configuración-nativa)
4. [Componentes Personalizados](#componentes-personalizados)
5. [Temas Dinámicos](#temas-dinámicos)
6. [Animaciones](#animaciones)
7. [Personalización Avanzada](#personalización-avanzada)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

El **Splash Screen** (pantalla de carga) es la primera impresión que los usuarios tienen de tu aplicación. Es fundamental para la experiencia de usuario y el branding de tu marca.

### **¿Qué es el Splash Screen?**

- 📱 **Pantalla de carga**: Aparece mientras la app se inicializa
- 🎨 **Primera impresión**: Branding y experiencia visual
- ⚡ **Transición suave**: Del splash al contenido principal
- 🎯 **Personalización**: Como el logo dinámico de Google

### **¿Por qué es importante?**

#### **✅ Beneficios Principales**
- 🎨 **Branding consistente**: Refuerza la identidad de marca
- ⚡ **Percepción de velocidad**: Hace que la app parezca más rápida
- 🎯 **Experiencia profesional**: Transición suave y elegante
- 📱 **Nativo**: Integración perfecta con React Native
- 🌙 **Temas adaptativos**: Se adapta a modo claro/oscuro
- 🎪 **Contenido dinámico**: Como el logo de Google

## ⚙️ Instalación y Configuración

### 1. **Dependencias Instaladas**

```bash
npm install react-native-splash-screen
```

### 2. **Configuración Principal**

```typescript
// src/config/splashScreen.ts
export const SPLASH_SCREEN_CONFIG = {
  // Configuración general
  autoHide: true,
  hideOnTransition: true,
  
  // Configuración de animaciones
  animationDuration: 1000,
  fadeDuration: 500,
  
  // Configuración de personalización
  enableDynamicContent: true,
  enableSeasonalThemes: true,
  enableUserPreferences: true,
  
  // Configuración de branding
  brandColors: {
    primary: '#007AFF',
    secondary: '#34C759',
    accent: '#FF9500',
    background: '#FFFFFF',
    text: '#000000',
  },
  
  // Configuración de energía
  energyColors: {
    solar: '#FFD700',
    wind: '#87CEEB',
    hydro: '#4169E1',
    battery: '#32CD32',
    grid: '#FF6347',
  },
};
```

### 3. **Integración en App.tsx**

```typescript
import CustomSplashScreen from './src/components/CustomSplashScreen';

function AppContent({ isReady }: { isReady: boolean }) {
  const [showSplash, setShowSplash] = useState(true);

  if (!isReady) {
    return (
      <CustomSplashScreen
        onFinish={() => setShowSplash(false)}
        duration={3000}
        showProgress={true}
        enableAnimations={true}
      />
    );
  }

  if (showSplash) {
    return (
      <CustomSplashScreen
        onFinish={() => setShowSplash(false)}
        duration={2000}
        showProgress={false}
        enableAnimations={true}
      />
    );
  }
  
  return <AppNavigator />;
}
```

## 🔧 Configuración Nativa

### 1. **Android**

#### **Configurar en `android/app/src/main/res/layout/launch_screen.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/splash_background">

    <ImageView
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_centerInParent="true"
        android:src="@drawable/splash_logo" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@drawable/splash_logo"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="20dp"
        android:text="@string/app_name"
        android:textColor="@color/splash_text"
        android:textSize="24sp"
        android:textStyle="bold" />

</RelativeLayout>
```

#### **Configurar en `android/app/src/main/res/values/colors.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splash_background">#FFFFFF</color>
    <color name="splash_text">#007AFF</color>
    <color name="splash_primary">#007AFF</color>
    <color name="splash_secondary">#34C759</color>
</resources>
```

### 2. **iOS**

#### **Configurar en `ios/YourApp/LaunchScreen.storyboard`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="21507" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="21505"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="System colors in document" minToolsVersion="11.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <subviews>
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFit" horizontalHuggingPriority="251" verticalHuggingPriority="251" image="SplashLogo" translatesAutoresizingMaskIntoConstraints="NO" id="YRO-k0-Ey4">
                                <rect key="frame" x="96.666666666666686" y="326" width="200" height="200"/>
                                <constraints>
                                    <constraint firstAttribute="width" constant="200" id="1Gr-wE-7Yf"/>
                                    <constraint firstAttribute="height" constant="200" id="Q3B-4B-g5h"/>
                                </constraints>
                            </imageView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="Bcu-3y-fUS"/>
                        <color key="backgroundColor" systemColor="systemBackgroundColor"/>
                        <constraints>
                            <constraint firstItem="YRO-k0-Ey4" firstAttribute="centerX" secondItem="Ze5-6b-2t3" secondAttribute="centerX" id="3p8-FC-h8v"/>
                            <constraint firstItem="YRO-k0-Ey4" firstAttribute="centerY" secondItem="Ze5-6b-2t3" secondAttribute="centerY" id="vDu-zF-7Yf"/>
                        </constraints>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
    <resources>
        <image name="SplashLogo" width="200" height="200"/>
        <systemColor name="systemBackgroundColor">
            <color white="1" alpha="1" colorSpace="custom" customColorSpace="genericGamma22GrayColorSpace"/>
        </systemColor>
    </resources>
</document>
```

## 🧩 Componentes Personalizados

### 1. **CustomSplashScreen**

Componente principal del splash screen:

```typescript
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { useSplashScreen, useDynamicSplashTheme } from '../config/splashScreen';

const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({
  onFinish,
  duration = 3000,
  showProgress = true,
  enableAnimations = true,
  customTheme,
}) => {
  const { getCurrentTheme, setSeasonalTheme } = useSplashScreen();
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Configurar tema dinámico
  useEffect(() => {
    if (customTheme) {
      setCurrentTheme(customTheme);
    } else {
      setSeasonalTheme();
      setCurrentTheme(getCurrentTheme());
    }
  }, [customTheme]);

  // Animaciones de entrada
  useEffect(() => {
    if (enableAnimations) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [enableAnimations]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={[styles.icon, { color: currentTheme.primaryColor }]}>
          {currentTheme.icon}
        </Text>
        
        <Text style={[styles.logo, { color: currentTheme.primaryColor }]}>
          OpenEnergyCoop
        </Text>
        
        <Text style={[styles.message, { color: currentTheme.text }]}>
          {currentTheme.message}
        </Text>
      </Animated.View>
    </View>
  );
};
```

### 2. **Hook useSplashScreen**

```typescript
export const useSplashScreen = () => {
  const { getCurrentSeason, getCurrentTime, getSpecialTheme, getThemeBasedOnTime } = useDynamicSplashTheme();

  const showSplashScreen = () => {
    SplashScreenManager.show();
  };

  const hideSplashScreen = () => {
    SplashScreenManager.hide();
  };

  const hideSplashScreenWithAnimation = (duration?: number) => {
    SplashScreenManager.hideWithAnimation(duration);
  };

  const getCurrentTheme = () => {
    const specialTheme = getSpecialTheme();
    if (specialTheme) {
      return specialTheme;
    }
    return getThemeBasedOnTime();
  };

  return {
    showSplashScreen,
    hideSplashScreen,
    hideSplashScreenWithAnimation,
    getCurrentTheme,
    getCurrentSeason,
    getCurrentTime,
    getSpecialTheme,
  };
};
```

## 🎨 Temas Dinámicos

### 1. **Temas Estacionales**

```typescript
export const SEASONAL_THEMES = {
  spring: {
    background: '#F0FFF0',
    primaryColor: '#228B22',
    secondaryColor: '#FF69B4',
    icon: '🌸',
    message: 'Energía renovable en primavera',
  },
  summer: {
    background: '#FFF8DC',
    primaryColor: '#FFD700',
    secondaryColor: '#87CEEB',
    icon: '☀️',
    message: 'Energía solar en verano',
  },
  autumn: {
    background: '#FFF5EE',
    primaryColor: '#8B4513',
    secondaryColor: '#FF6347',
    icon: '🍂',
    message: 'Energía sostenible en otoño',
  },
  winter: {
    background: '#F0F8FF',
    primaryColor: '#4169E1',
    secondaryColor: '#87CEEB',
    icon: '❄️',
    message: 'Energía eficiente en invierno',
  },
};
```

### 2. **Temas Especiales**

```typescript
export const SPECIAL_THEMES = {
  earth_day: {
    background: '#E8F5E8',
    primaryColor: '#228B22',
    secondaryColor: '#32CD32',
    icon: '🌍',
    message: 'Celebrando el Día de la Tierra',
    duration: 24 * 60 * 60 * 1000, // 24 horas
  },
  energy_saving: {
    background: '#FFF8DC',
    primaryColor: '#FFD700',
    secondaryColor: '#FF6347',
    icon: '💡',
    message: 'Ahorra energía, salva el planeta',
    duration: 7 * 24 * 60 * 60 * 1000, // 1 semana
  },
  sustainability: {
    background: '#F0FFF0',
    primaryColor: '#228B22',
    secondaryColor: '#87CEEB',
    icon: '🌱',
    message: 'Construyendo un futuro sostenible',
    duration: 30 * 24 * 60 * 60 * 1000, // 1 mes
  },
};
```

### 3. **Temas Basados en Tiempo**

```typescript
const getThemeBasedOnTime = () => {
  const timeOfDay = getCurrentTime();
  const baseTheme = SEASONAL_THEMES[getCurrentSeason()];
  
  switch (timeOfDay) {
    case 'morning':
      return {
        ...baseTheme,
        background: '#FFF8DC',
        message: 'Buenos días, energía renovable te espera',
      };
    case 'afternoon':
      return {
        ...baseTheme,
        background: '#FFF5EE',
        message: 'Energía solar en su máximo esplendor',
      };
    case 'evening':
      return {
        ...baseTheme,
        background: '#F0F8FF',
        message: 'Preparando la energía para la noche',
      };
    case 'night':
      return {
        ...baseTheme,
        background: '#1C1C1E',
        text: '#FFFFFF',
        message: 'Energía eficiente durante la noche',
      };
    default:
      return baseTheme;
  }
};
```

## 🎬 Animaciones

### 1. **Configuración de Animaciones**

```typescript
export const SPLASH_ANIMATIONS = {
  // Animaciones de entrada
  entrance: {
    fadeIn: {
      duration: 500,
      easing: 'ease-in',
    },
    slideUp: {
      duration: 800,
      easing: 'ease-out',
    },
    scaleIn: {
      duration: 600,
      easing: 'ease-out',
    },
  },
  
  // Animaciones de salida
  exit: {
    fadeOut: {
      duration: 500,
      easing: 'ease-out',
    },
    slideDown: {
      duration: 800,
      easing: 'ease-in',
    },
    scaleOut: {
      duration: 600,
      easing: 'ease-in',
    },
  },
  
  // Animaciones de contenido
  content: {
    logoPulse: {
      duration: 2000,
      easing: 'ease-in-out',
      repeat: true,
    },
    textFade: {
      duration: 1000,
      easing: 'ease-in',
      delay: 500,
    },
    iconRotate: {
      duration: 3000,
      easing: 'linear',
      repeat: true,
    },
  },
};
```

### 2. **Implementación de Animaciones**

```typescript
// Animación de entrada
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

// Animación de salida
const handleExit = () => {
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
};
```

## 🎨 Personalización Avanzada

### 1. **Efectos Visuales**

```typescript
export const ADVANCED_CUSTOMIZATION = {
  // Configuración de efectos visuales
  visualEffects: {
    blur: {
      enabled: true,
      intensity: 10,
    },
    gradient: {
      enabled: true,
      colors: ['#007AFF', '#34C759'],
      direction: 'to bottom',
    },
    shadow: {
      enabled: true,
      color: '#000000',
      opacity: 0.3,
      radius: 10,
    },
  },
  
  // Configuración de animaciones avanzadas
  advancedAnimations: {
    particleSystem: {
      enabled: false,
      particleCount: 50,
      particleColor: '#007AFF',
    },
    morphing: {
      enabled: false,
      duration: 2000,
    },
  },
  
  // Configuración de interactividad
  interactivity: {
    touchEnabled: false,
    gestureEnabled: false,
    hapticFeedback: false,
  },
};
```

### 2. **Contenido Dinámico**

```typescript
export const DYNAMIC_CONTENT_CONFIG = {
  // API para obtener contenido dinámico
  api: {
    baseUrl: 'https://api.openenergycoop.com/splash-content',
    timeout: 5000,
    retryAttempts: 3,
  },
  
  // Configuración de caché
  cache: {
    enabled: true,
    duration: 24 * 60 * 60 * 1000, // 24 horas
    key: 'splash_content_cache',
  },
  
  // Configuración de fallback
  fallback: {
    enabled: true,
    content: {
      icon: '⚡',
      message: 'Energía renovable para todos',
      colors: {
        background: '#FFFFFF',
        primary: '#007AFF',
        secondary: '#34C759',
        text: '#000000',
      },
    },
  },
};
```

## ✅ Mejores Prácticas

### 1. **Duración Óptima**

```typescript
// ✅ Correcto - Duración apropiada
const SPLASH_DURATION = {
  MINIMUM: 1000, // Mínimo 1 segundo
  OPTIMAL: 2000, // Óptimo 2 segundos
  MAXIMUM: 5000, // Máximo 5 segundos
};

// ❌ Incorrecto - Duración muy larga
const SPLASH_DURATION = 10000; // 10 segundos es demasiado
```

### 2. **Animaciones Suaves**

```typescript
// ✅ Correcto - Animaciones fluidas
const animations = {
  fadeIn: {
    duration: 800,
    easing: 'ease-in',
  },
  scaleIn: {
    duration: 1000,
    easing: 'ease-out',
  },
};

// ❌ Incorrecto - Animaciones bruscas
const animations = {
  fadeIn: {
    duration: 100, // Muy rápido
    easing: 'linear', // Sin suavizado
  },
};
```

### 3. **Temas Responsivos**

```typescript
// ✅ Correcto - Temas adaptativos
const getResponsiveTheme = () => {
  const { width, height } = Dimensions.get('window');
  const isTablet = width > 768;
  
  return {
    ...baseTheme,
    iconSize: isTablet ? 120 : 80,
    fontSize: isTablet ? 32 : 24,
  };
};

// ❌ Incorrecto - Tamaños fijos
const theme = {
  iconSize: 80, // No se adapta
  fontSize: 24, // No se adapta
};
```

### 4. **Performance**

```typescript
// ✅ Correcto - Optimización de performance
const SplashScreen = React.memo(() => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return <SplashContent />;
});

// ❌ Incorrecto - Sin optimización
const SplashScreen = () => {
  // Sin memoización
  // Sin cleanup de timers
  return <SplashContent />;
};
```

## 🔧 Solución de Problemas

### 1. **Splash Screen no se muestra**

**Problema:** El splash screen no aparece

**Solución:**
```typescript
// Verificar configuración nativa
import SplashScreen from 'react-native-splash-screen';

// Mostrar manualmente
SplashScreen.show();

// Verificar archivos nativos
// android/app/src/main/res/layout/launch_screen.xml
// ios/YourApp/LaunchScreen.storyboard
```

### 2. **Splash Screen no se oculta**

**Problema:** El splash screen permanece visible

**Solución:**
```typescript
// Ocultar manualmente
SplashScreen.hide();

// Verificar timing
useEffect(() => {
  const timer = setTimeout(() => {
    SplashScreen.hide();
  }, 2000);
  
  return () => clearTimeout(timer);
}, []);
```

### 3. **Animaciones lentas**

**Problema:** Las animaciones son lentas o se traban

**Solución:**
```typescript
// Usar useNativeDriver
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 800,
  useNativeDriver: true, // ✅ Importante
}).start();

// Reducir complejidad
const simpleAnimation = {
  duration: 500,
  easing: 'ease-out',
};
```

### 4. **Temas no cambian**

**Problema:** Los temas dinámicos no se aplican

**Solución:**
```typescript
// Verificar lógica de temas
const getCurrentTheme = () => {
  const specialTheme = getSpecialTheme();
  if (specialTheme) {
    return specialTheme;
  }
  
  const timeBasedTheme = getThemeBasedOnTime();
  return timeBasedTheme;
};

// Forzar actualización
useEffect(() => {
  setCurrentTheme(getCurrentTheme());
}, []);
```

### 5. **Problemas de layout**

**Problema:** El contenido no se centra correctamente

**Solución:**
```typescript
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
});
```

## 📚 Ejemplos de Uso

### 1. **Splash Screen Básico**

```typescript
const BasicSplashScreen = () => {
  return (
    <CustomSplashScreen
      onFinish={() => console.log('Splash finished')}
      duration={2000}
      showProgress={false}
      enableAnimations={true}
    />
  );
};
```

### 2. **Splash Screen con Tema Estacional**

```typescript
const SeasonalSplashScreen = () => {
  const { getCurrentTheme } = useSplashScreen();
  const theme = getCurrentTheme();
  
  return (
    <CustomSplashScreen
      onFinish={() => console.log('Splash finished')}
      duration={3000}
      showProgress={true}
      enableAnimations={true}
      customTheme={theme}
    />
  );
};
```

### 3. **Splash Screen Personalizado**

```typescript
const CustomSplashScreen = () => {
  const customTheme = {
    background: '#1C1C1E',
    primaryColor: '#FFD700',
    secondaryColor: '#87CEEB',
    text: '#FFFFFF',
    icon: '⚡',
    message: 'Energía personalizada para ti',
  };
  
  return (
    <CustomSplashScreen
      onFinish={() => console.log('Splash finished')}
      duration={3500}
      showProgress={true}
      enableAnimations={true}
      customTheme={customTheme}
    />
  );
};
```

### 4. **Splash Screen con Analytics**

```typescript
const AnalyticsSplashScreen = () => {
  const { trackUserAction } = usePostHogAnalytics();
  
  const handleFinish = () => {
    trackUserAction('splash_screen_completed', {
      duration: 3000,
      theme: 'seasonal',
    });
  };
  
  return (
    <CustomSplashScreen
      onFinish={handleFinish}
      duration={3000}
      showProgress={true}
      enableAnimations={true}
    />
  );
};
```

## 🎉 Conclusión

El Splash Screen proporciona:

- ✅ **Experiencia profesional** de carga
- ✅ **Branding consistente** y memorable
- ✅ **Temas dinámicos** como Google Doodles
- ✅ **Animaciones fluidas** y suaves
- ✅ **Personalización completa** de colores y contenido
- ✅ **Integración nativa** con React Native
- ✅ **Analytics integrado** para tracking
- ✅ **Performance optimizada** para móviles

El sistema está completamente configurado y listo para usar, proporcionando una experiencia de carga moderna y personalizada que se adapta a fechas especiales y eventos, similar al logo dinámico de Google. 🚀
