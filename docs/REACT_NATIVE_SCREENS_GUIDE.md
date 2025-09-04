# React Native Screens - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración de Screens](#configuración-de-screens)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

**React Native Screens** es una biblioteca que proporciona componentes nativos para pantallas en React Native, mejorando significativamente el rendimiento y la experiencia de usuario en la navegación.

### **¿Por qué React Native Screens?**

#### **✅ Ventajas Principales**
- 🚀 **Rendimiento nativo**: Las pantallas se renderizan nativamente
- 📱 **Mejor experiencia**: Transiciones más fluidas y naturales
- 🔧 **Configuración flexible**: Configuración detallada para diferentes tipos de pantallas
- 🎯 **Optimizaciones automáticas**: Cache, preload y lazy loading
- 🎮 **Gestos nativos**: Gestos de navegación nativos
- 🎨 **Animaciones personalizadas**: Configuraciones específicas para animaciones
- 📊 **Monitoreo integrado**: Métricas de rendimiento y memoria
- 🔄 **Integración perfecta**: Con React Navigation y otras librerías

#### **❌ Alternativas Menos Recomendadas**
- ❌ **View nativo**: Menor rendimiento y experiencia
- ❌ **Configuración manual**: Propenso a errores y difícil de mantener
- ❌ **Sin optimizaciones**: No aprovecha las capacidades nativas

## ⚙️ Instalación y Configuración

### **1. Instalación**

```bash
npm install react-native-screens
```

### **2. Configuración en index.js**

```javascript
// index.js
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import 'react-native-screens/register'; // Importar antes de AppRegistry
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

## 🎨 Configuración de Screens

### **1. Configuración Básica**

```typescript
// src/config/screens.ts
import { Platform, Dimensions } from 'react-native';

export const SCREENS_CONFIG = {
  basic: {
    enabled: true,
    platform: {
      ios: {
        enableScreens: true,
        screenOptions: {
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: '#FFFFFF',
          },
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        },
      },
      android: {
        enableScreens: true,
        screenOptions: {
          headerShown: true,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: '#FFFFFF',
          },
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        },
      },
    },
    performance: {
      enabled: true,
      cache: {
        enabled: true,
        maxSize: 10,
        cleanupInterval: 300000, // 5 minutos
      },
      preload: {
        enabled: true,
        screens: ['home', 'dashboard', 'settings'],
        delay: 1000,
      },
      lazyLoading: {
        enabled: true,
        threshold: 0.5,
        timeout: 5000,
      },
    },
  },
  screens: {
    home: {
      name: 'Home',
      options: {
        title: 'Inicio',
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#2196F3',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animationTypeForReplace: 'push',
      },
      preload: true,
      cache: true,
    },
  },
};
```

## 🎣 Hook Personalizado

### **1. Hook useScreens**

```typescript
// src/hooks/useScreens.ts
import { useCallback, useMemo, useEffect } from 'react';
import { enableScreens, Screen } from 'react-native-screens';
import { Platform, Dimensions } from 'react-native';
import { screensConfig } from '../config/screens';

// Habilitar React Native Screens
enableScreens(true);

export const useScreens = () => {
  const deviceInfo = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const isLandscape = width > height;
    const minDimension = Math.min(width, height);
    
    let screenSize: 'small' | 'medium' | 'large';
    if (minDimension < 375) {
      screenSize = 'small';
    } else if (minDimension < 768) {
      screenSize = 'medium';
    } else {
      screenSize = 'large';
    }
    
    const orientation: 'portrait' | 'landscape' = isLandscape ? 'landscape' : 'portrait';
    
    return {
      width,
      height,
      isLandscape,
      minDimension,
      screenSize,
      orientation,
      platform: Platform.OS,
    };
  }, []);

  const getScreenConfig = useCallback((
    screenName: keyof typeof screensConfig.screens,
    screenType?: keyof typeof screensConfig.screenTypeConfigs,
    orientation?: 'portrait' | 'landscape',
    screenSize?: 'small' | 'medium' | 'large'
  ) => {
    return screensConfig.getScreenConfig(
      screenName,
      screenType,
      orientation || deviceInfo.orientation,
      screenSize || deviceInfo.screenSize
    );
  }, [deviceInfo]);

  const createScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    customOptions?: any
  ) => {
    const config = getScreenConfig(screenName);
    
    return {
      ...config.options,
      ...customOptions,
    };
  }, [getScreenConfig]);

  const createCompleteScreenOptions = useCallback((
    screenName: keyof typeof screensConfig.screens,
    options: {
      theme?: 'light' | 'dark';
      platform?: 'ios' | 'android';
      orientation?: 'portrait' | 'landscape';
      screenSize?: 'small' | 'medium' | 'large';
      animationType?: keyof typeof screensConfig.animations.enter;
      gestureType?: keyof typeof screensConfig.gestures.navigation.specific;
      presentationType?: keyof typeof screensConfig.presentation.card;
      accessibility?: boolean;
      performance?: boolean;
      customOptions?: any;
    } = {}
  ) => {
    const {
      theme,
      platform,
      orientation,
      screenSize,
      animationType,
      gestureType,
      presentationType,
      accessibility = false,
      performance = false,
      customOptions = {},
    } = options;

    let config = getScreenConfig(screenName, undefined, orientation, screenSize);

    if (theme) {
      const themeConfig = getThemeScreenConfig(screenName, theme);
      config = { ...config, options: { ...config.options, ...themeConfig.options } };
    }

    if (platform) {
      const platformConfig = getPlatformScreenConfig(screenName, platform);
      config = { ...config, options: { ...config.options, ...platformConfig.options } };
    }

    if (animationType) {
      const animationConfig = getAnimationConfig(animationType);
      config = { ...config, options: { ...config.options, animation: animationType, ...animationConfig } };
    }

    if (gestureType) {
      const gestureConfig = getGestureConfig(gestureType);
      config = { ...config, options: { ...config.options, ...gestureConfig } };
    }

    if (presentationType) {
      const presentationConfig = getPresentationConfig(presentationType);
      config = { ...config, options: { ...config.options, ...presentationConfig } };
    }

    if (accessibility) {
      const accessibilityConfig = getAccessibilityConfig();
      config = { ...config, options: { ...config.options, ...accessibilityConfig } };
    }

    if (performance) {
      const performanceConfig = getPerformanceConfig();
      config = { ...config, options: { ...config.options, ...performanceConfig } };
    }

    return {
      ...config.options,
      ...customOptions,
    };
  }, [
    getScreenConfig,
    getThemeScreenConfig,
    getPlatformScreenConfig,
    getAnimationConfig,
    getGestureConfig,
    getPresentationConfig,
    getAccessibilityConfig,
    getPerformanceConfig,
  ]);

  useEffect(() => {
    // Habilitar React Native Screens
    enableScreens(true);
    
    // Configurar opciones por defecto
    const defaultOptions = {
      headerShown: true,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
      animation: 'slide_from_right',
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    };
    
    // Aplicar configuración por plataforma
    if (Platform.OS === 'android') {
      defaultOptions.headerStyle.elevation = 0;
      defaultOptions.headerStyle.shadowOpacity = 0;
    }
    
    return () => {
      // Cleanup si es necesario
    };
  }, []);

  return {
    deviceInfo,
    getScreenConfig,
    createScreenOptions,
    createCompleteScreenOptions,
    screensConfig,
  };
};
```

## 🧩 Componente de Demostración

### **1. ScreensDemo Component**

```typescript
// src/components/ScreensDemo.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useScreens } from '../hooks/useScreens';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const ScreensDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    deviceInfo,
    getScreenConfig,
    createScreenOptions,
    createCompleteScreenOptions,
  } = useScreens();

  const [currentScreen, setCurrentScreen] = useState<'home' | 'dashboard' | 'settings' | 'charts'>('home');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const screenConfig = getScreenConfig(currentScreen);
  const screenOptions = createScreenOptions(currentScreen);
  const completeScreenOptions = createCompleteScreenOptions(currentScreen, {
    theme: currentTheme,
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
```

## 🎯 Casos de Uso

### **1. Pantalla Principal con Screens**

```typescript
const HomeScreen: React.FC = () => {
  const { createScreenOptions } = useScreens();

  const screenOptions = createScreenOptions('home');

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView>
        <View className="p-4">
          <Title>Pantalla de Inicio</Title>
          <Paragraph>Contenido optimizado con React Native Screens</Paragraph>
        </View>
      </ScrollView>
    </Screen>
  );
};
```

### **2. Pantalla con Configuración Completa**

```typescript
const DashboardScreen: React.FC = () => {
  const { createCompleteScreenOptions } = useScreens();

  const screenOptions = createCompleteScreenOptions('dashboard', {
    theme: 'dark',
    animationType: 'slide_from_bottom',
    gestureType: 'main',
    presentationType: 'default',
    accessibility: true,
    performance: true,
  });

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView>
        <View className="p-4">
          <Title>Dashboard</Title>
          <Paragraph>Pantalla con configuración completa</Paragraph>
        </View>
      </ScrollView>
    </Screen>
  );
};
```

### **3. Pantalla Modal con Screens**

```typescript
const ModalScreen: React.FC = () => {
  const { createModalScreenOptions } = useScreens();

  const screenOptions = createModalScreenOptions('settings');

  return (
    <Screen style={{ flex: 1 }}>
      <View className="p-4">
        <Title>Modal</Title>
        <Paragraph>Pantalla modal optimizada</Paragraph>
      </View>
    </Screen>
  );
};
```

## ✅ Mejores Prácticas

### **1. Uso del Componente Screen**

```typescript
// ✅ Correcto - Usar Screen para pantallas
const HomeScreen: React.FC = () => {
  return (
    <Screen style={{ flex: 1 }}>
      {/* Contenido */}
    </Screen>
  );
};

// ❌ Incorrecto - No usar Screen
const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Contenido */}
    </View>
  );
};
```

### **2. Configuración de Opciones**

```typescript
// ✅ Correcto - Usar funciones de configuración
const { createScreenOptions } = useScreens();
const screenOptions = createScreenOptions('home');

// ❌ Incorrecto - Configuración manual
const screenOptions = {
  title: 'Home',
  animation: 'slide_from_right',
  // Configuración hardcodeada
};
```

### **3. Optimización de Rendimiento**

```typescript
// ✅ Correcto - Usar configuración de rendimiento
const screenOptions = createCompleteScreenOptions('home', {
  performance: true,
  accessibility: true,
});

// ❌ Incorrecto - Sin optimizaciones
const screenOptions = {
  title: 'Home',
  // Sin optimizaciones
};
```

## 🔧 Solución de Problemas

### **1. Screens no funciona**

**Problema**: React Native Screens no se inicializa correctamente

**Solución**:
```javascript
// Verificar que esté importado en index.js
import 'react-native-screens/register'; // Debe estar antes de AppRegistry
import { AppRegistry } from 'react-native';
```

### **2. Pantallas no se optimizan**

**Problema**: Las pantallas no aprovechan las optimizaciones nativas

**Solución**:
```typescript
// Usar enableScreens al inicio
import { enableScreens } from 'react-native-screens';

enableScreens(true);
```

### **3. Configuración no se aplica**

**Problema**: La configuración personalizada no se aplica

**Solución**:
```typescript
// Usar funciones de configuración del hook
const { createScreenOptions } = useScreens();

const options = createScreenOptions('home', {
  customOption: 'value',
});
```

### **4. Problemas de rendimiento**

**Problema**: Problemas de rendimiento con Screens

**Solución**:
```typescript
// Usar configuración de rendimiento
const options = createCompleteScreenOptions('home', {
  performance: true,
  cache: true,
  preload: true,
});
```

## 🎉 Conclusión

React Native Screens proporciona:

- ✅ **Rendimiento nativo** con componentes optimizados
- ✅ **Mejor experiencia** con transiciones fluidas
- ✅ **Configuración flexible** para diferentes tipos de pantallas
- ✅ **Optimizaciones automáticas** de cache y preload
- ✅ **Gestos nativos** para navegación
- ✅ **Animaciones personalizadas** con configuraciones específicas
- ✅ **Monitoreo integrado** de rendimiento y memoria
- ✅ **Integración perfecta** con React Navigation

El sistema está completamente configurado y listo para usar, proporcionando una experiencia de navegación nativa y optimizada. 🚀
