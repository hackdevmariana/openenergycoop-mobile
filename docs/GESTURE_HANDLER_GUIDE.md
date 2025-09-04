# React Native Gesture Handler - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración de Gestos](#configuración-de-gestos)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

**React Native Gesture Handler** es una biblioteca que proporciona una API nativa para gestos táctiles en React Native, reemplazando el sistema de gestos nativo de React Native con una implementación más robusta y flexible.

### **¿Por qué React Native Gesture Handler?**

#### **✅ Ventajas Principales**
- 🎯 **Gestos nativos**: Implementación nativa para mejor rendimiento
- 🔧 **Configuración flexible**: Configuración detallada para cada tipo de gesto
- 📱 **Multiplataforma**: Soporte completo para iOS y Android
- 🎨 **Gestos compuestos**: Combinación de múltiples gestos
- 📊 **Analytics integrado**: Seguimiento automático de gestos
- 🎮 **Gestos avanzados**: Pinch, rotation, fling, force touch
- 🔄 **Compatibilidad**: Funciona con React Navigation y otras librerías

#### **❌ Alternativas Menos Recomendadas**
- ❌ **PanResponder**: API más limitada y menos flexible
- ❌ **TouchableOpacity**: Solo gestos básicos de toque
- ❌ **Gesture API nativa**: Menos configuración y control

## ⚙️ Instalación y Configuración

### **1. Instalación**

```bash
npm install react-native-gesture-handler
```

### **2. Configuración de index.js**

```javascript
// index.js
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

### **3. Configuración de Android (MainActivity.kt)**

```kotlin
package com.openenergycoopmobile

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "OpenEnergyCoopMobile"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      RNGestureHandlerEnabledRootView(this, mainComponentName, fabricEnabled)
}
```

### **4. Configuración de iOS**

No se requieren cambios adicionales para iOS en React Native 0.81.1.

## 🎮 Configuración de Gestos

### **1. Configuración Básica**

```typescript
// src/config/gestureHandler.ts
export const GESTURE_CONFIG = {
  // Gestos de toque
  tap: {
    numberOfTaps: 1,
    maxDurationMs: 500,
    maxDelayMs: 500,
  },
  
  // Gestos de arrastre
  pan: {
    minDistance: 10,
    activeOffsetX: [-10, 10],
    activeOffsetY: [-10, 10],
    failOffsetX: [-20, 20],
    failOffsetY: [-20, 20],
  },
  
  // Gestos de pellizco
  pinch: {
    minDistance: 10,
    minPointers: 2,
    maxPointers: 2,
  },
  
  // Gestos de rotación
  rotation: {
    minDistance: 10,
    minPointers: 2,
    maxPointers: 2,
  },
  
  // Gestos de deslizamiento
  swipe: {
    minDistance: 50,
    minVelocity: 500,
    maxDurationMs: 500,
  },
  
  // Gestos de presión larga
  longPress: {
    minDurationMs: 500,
    maxDistance: 10,
  },
  
  // Gestos de fling
  fling: {
    minVelocity: 500,
    maxDurationMs: 500,
    numberOfPointers: 1,
  },
};
```

### **2. Configuración por Componente**

```typescript
export const COMPONENT_GESTURES = {
  // Gestos para botones
  button: {
    tap: true,
    longPress: true,
    pan: false,
    pinch: false,
    rotation: false,
    swipe: false,
  },
  
  // Gestos para imágenes
  image: {
    tap: true,
    doubleTap: true,
    longPress: true,
    pan: true,
    pinch: true,
    rotation: true,
    swipe: true,
  },
  
  // Gestos para listas
  list: {
    tap: true,
    longPress: true,
    pan: true,
    scroll: true,
    swipe: true,
  },
  
  // Gestos para tarjetas
  card: {
    tap: true,
    longPress: true,
    pan: true,
    swipe: true,
  },
};
```

### **3. Configuración por Tamaño de Pantalla**

```typescript
export const SCREEN_SIZE_GESTURES = {
  small: {
    // Pantallas pequeñas (< 320px)
    tap: { numberOfTaps: 1, maxDurationMs: 300 },
    pan: { minDistance: 15, activeOffsetX: [-15, 15], activeOffsetY: [-15, 15] },
    swipe: { minDistance: 60, minVelocity: 600 },
    longPress: { minDurationMs: 600 },
  },
  
  medium: {
    // Pantallas medianas (320px - 768px)
    tap: { numberOfTaps: 1, maxDurationMs: 500 },
    pan: { minDistance: 10, activeOffsetX: [-10, 10], activeOffsetY: [-10, 10] },
    swipe: { minDistance: 50, minVelocity: 500 },
    longPress: { minDurationMs: 500 },
  },
  
  large: {
    // Pantallas grandes (> 768px)
    tap: { numberOfTaps: 1, maxDurationMs: 400 },
    pan: { minDistance: 8, activeOffsetX: [-8, 8], activeOffsetY: [-8, 8] },
    swipe: { minDistance: 40, minVelocity: 400 },
    longPress: { minDurationMs: 400 },
  },
};
```

## 🎣 Hook Personalizado

### **1. Hook useGestureHandler**

```typescript
// src/hooks/useGestureHandler.ts
export const useGestureHandler = () => {
  // Obtener información del dispositivo
  const deviceInfo = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const isLandscape = width > height;
    const screenSize = width < 320 ? 'small' : width < 768 ? 'medium' : 'large';
    
    return {
      width,
      height,
      isLandscape,
      screenSize,
      platform: Platform.OS,
    };
  }, []);

  // Crear gesto de toque
  const createTapGesture = useCallback((
    onTap?: () => void,
    onDoubleTap?: () => void,
    config?: any
  ) => {
    const tapConfig = {
      ...gestureConfig.tap,
      ...SCREEN_SIZE_GESTURES[deviceInfo.screenSize].tap,
      ...config,
    };

    const tap = Gesture.Tap()
      .numberOfTaps(tapConfig.numberOfTaps)
      .maxDuration(tapConfig.maxDurationMs)
      .maxDelay(tapConfig.maxDelayMs)
      .onStart(() => {
        if (onTap) runOnJS(onTap)();
      });

    const doubleTap = onDoubleTap ? Gesture.Tap()
      .numberOfTaps(2)
      .maxDuration(tapConfig.maxDurationMs)
      .onStart(() => {
        runOnJS(onDoubleTap)();
      }) : null;

    return doubleTap ? Gesture.Race(tap, doubleTap) : tap;
  }, [deviceInfo.screenSize]);

  // Crear gesto de arrastre
  const createPanGesture = useCallback((
    onPanStart?: (event: any) => void,
    onPanUpdate?: (event: any) => void,
    onPanEnd?: (event: any) => void,
    config?: any
  ) => {
    const panConfig = {
      ...gestureConfig.pan,
      ...SCREEN_SIZE_GESTURES[deviceInfo.screenSize].pan,
      ...config,
    };

    return Gesture.Pan()
      .minDistance(panConfig.minDistance)
      .activeOffsetX(panConfig.activeOffsetX)
      .activeOffsetY(panConfig.activeOffsetY)
      .failOffsetX(panConfig.failOffsetX)
      .failOffsetY(panConfig.failOffsetY)
      .onStart((event) => {
        if (onPanStart) runOnJS(onPanStart)(event);
      })
      .onUpdate((event) => {
        if (onPanUpdate) runOnJS(onPanUpdate)(event);
      })
      .onEnd((event) => {
        if (onPanEnd) runOnJS(onPanEnd)(event);
      });
  }, [deviceInfo.screenSize]);

  // Crear gesto de pellizco
  const createPinchGesture = useCallback((
    onPinchStart?: (event: any) => void,
    onPinchUpdate?: (event: any) => void,
    onPinchEnd?: (event: any) => void,
    config?: any
  ) => {
    const pinchConfig = {
      ...gestureConfig.pinch,
      ...config,
    };

    return Gesture.Pinch()
      .minDistance(pinchConfig.minDistance)
      .minPointers(pinchConfig.minPointers)
      .maxPointers(pinchConfig.maxPointers)
      .onStart((event) => {
        if (onPinchStart) runOnJS(onPinchStart)(event);
      })
      .onUpdate((event) => {
        if (onPinchUpdate) runOnJS(onPinchUpdate)(event);
      })
      .onEnd((event) => {
        if (onPinchEnd) runOnJS(onPinchEnd)(event);
      });
  }, []);

  // Crear gesto de rotación
  const createRotationGesture = useCallback((
    onRotationStart?: (event: any) => void,
    onRotationUpdate?: (event: any) => void,
    onRotationEnd?: (event: any) => void,
    config?: any
  ) => {
    const rotationConfig = {
      ...gestureConfig.rotation,
      ...config,
    };

    return Gesture.Rotation()
      .minDistance(rotationConfig.minDistance)
      .minPointers(rotationConfig.minPointers)
      .maxPointers(rotationConfig.maxPointers)
      .onStart((event) => {
        if (onRotationStart) runOnJS(onRotationStart)(event);
      })
      .onUpdate((event) => {
        if (onRotationUpdate) runOnJS(onRotationUpdate)(event);
      })
      .onEnd((event) => {
        if (onRotationEnd) runOnJS(onRotationEnd)(event);
      });
  }, []);

  // Crear gesto de deslizamiento
  const createSwipeGesture = useCallback((
    onSwipe?: (direction: string) => void,
    config?: any
  ) => {
    const swipeConfig = {
      ...gestureConfig.swipe,
      ...SCREEN_SIZE_GESTURES[deviceInfo.screenSize].swipe,
      ...config,
    };

    return Gesture.Pan()
      .minDistance(swipeConfig.minDistance)
      .minVelocity(swipeConfig.minVelocity)
      .maxDuration(swipeConfig.maxDurationMs)
      .onEnd((event) => {
        if (onSwipe) {
          const { velocityX, velocityY } = event;
          const direction = Math.abs(velocityX) > Math.abs(velocityY)
            ? velocityX > 0 ? 'right' : 'left'
            : velocityY > 0 ? 'down' : 'up';
          runOnJS(onSwipe)(direction);
        }
      });
  }, [deviceInfo.screenSize]);

  // Crear gesto de presión larga
  const createLongPressGesture = useCallback((
    onLongPress?: () => void,
    config?: any
  ) => {
    const longPressConfig = {
      ...gestureConfig.longPress,
      ...SCREEN_SIZE_GESTURES[deviceInfo.screenSize].longPress,
      ...config,
    };

    return Gesture.LongPress()
      .minDuration(longPressConfig.minDurationMs)
      .maxDistance(longPressConfig.maxDistance)
      .onStart(() => {
        if (onLongPress) runOnJS(onLongPress)();
      });
  }, [deviceInfo.screenSize]);

  // Crear gesto de fling
  const createFlingGesture = useCallback((
    onFling?: (direction: string) => void,
    config?: any
  ) => {
    const flingConfig = {
      ...gestureConfig.fling,
      ...config,
    };

    return Gesture.Fling()
      .minVelocity(flingConfig.minVelocity)
      .maxDuration(flingConfig.maxDurationMs)
      .numberOfPointers(flingConfig.numberOfPointers)
      .onEnd((event) => {
        if (onFling) {
          const { velocityX, velocityY } = event;
          const direction = Math.abs(velocityX) > Math.abs(velocityY)
            ? velocityX > 0 ? 'right' : 'left'
            : velocityY > 0 ? 'down' : 'up';
          runOnJS(onFling)(direction);
        }
      });
  }, []);

  // Crear gesto compuesto
  const createCompositeGesture = useCallback((
    gestures: Gesture[],
    config?: any
  ) => {
    return Gesture.Simultaneous(...gestures);
  }, []);

  // Crear gesto secuencial
  const createSequentialGesture = useCallback((
    gestures: Gesture[],
    config?: any
  ) => {
    return Gesture.Sequence(...gestures);
  }, []);

  // Crear gesto de carrera
  const createRaceGesture = useCallback((
    gestures: Gesture[],
    config?: any
  ) => {
    return Gesture.Race(...gestures);
  }, []);

  // Obtener configuración de gestos para un componente
  const getComponentGestures = useCallback((
    componentType: keyof typeof COMPONENT_GESTURES
  ) => {
    return COMPONENT_GESTURES[componentType] || COMPONENT_GESTURES.button;
  }, []);

  // Crear gestos para un componente específico
  const createComponentGestures = useCallback((
    componentType: keyof typeof COMPONENT_GESTURES,
    handlers: {
      onTap?: () => void;
      onDoubleTap?: () => void;
      onLongPress?: () => void;
      onPan?: (event: any) => void;
      onPinch?: (event: any) => void;
      onRotation?: (event: any) => void;
      onSwipe?: (direction: string) => void;
      onFling?: (direction: string) => void;
    }
  ) => {
    const componentConfig = getComponentGestures(componentType);
    const gestures: Gesture[] = [];

    if (componentConfig.tap && handlers.onTap) {
      gestures.push(createTapGesture(handlers.onTap, handlers.onDoubleTap));
    }

    if (componentConfig.longPress && handlers.onLongPress) {
      gestures.push(createLongPressGesture(handlers.onLongPress));
    }

    if (componentConfig.pan && handlers.onPan) {
      gestures.push(createPanGesture(undefined, handlers.onPan));
    }

    if (componentConfig.pinch && handlers.onPinch) {
      gestures.push(createPinchGesture(undefined, handlers.onPinch));
    }

    if (componentConfig.rotation && handlers.onRotation) {
      gestures.push(createRotationGesture(undefined, handlers.onRotation));
    }

    if (componentConfig.swipe && handlers.onSwipe) {
      gestures.push(createSwipeGesture(handlers.onSwipe));
    }

    return gestures.length === 1 ? gestures[0] : createCompositeGesture(gestures);
  }, [getComponentGestures, createTapGesture, createLongPressGesture, createPanGesture, createPinchGesture, createRotationGesture, createSwipeGesture, createCompositeGesture]);

  return {
    // Información del dispositivo
    deviceInfo,
    
    // Gestos básicos
    createTapGesture,
    createPanGesture,
    createPinchGesture,
    createRotationGesture,
    createSwipeGesture,
    createLongPressGesture,
    createFlingGesture,
    
    // Gestos compuestos
    createCompositeGesture,
    createSequentialGesture,
    createRaceGesture,
    
    // Gestos por componente
    getComponentGestures,
    createComponentGestures,
    
    // Configuración
    gestureConfig,
  };
};
```

## 🧩 Componente de Demostración

### **1. GestureHandlerDemo Component**

```typescript
// src/components/GestureHandlerDemo.tsx
const GestureHandlerDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { 
    deviceInfo,
    createTapGesture,
    createPanGesture,
    createPinchGesture,
    createRotationGesture,
    createSwipeGesture,
    createLongPressGesture,
    createFlingGesture,
    createComponentGestures,
  } = useGestureHandler();

  const [gestureLog, setGestureLog] = useState<string[]>([]);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Función para agregar logs de gestos
  const addGestureLog = (gesture: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const log = `[${timestamp}] ${gesture}${details ? ` - ${JSON.stringify(details)}` : ''}`;
    setGestureLog(prev => [log, ...prev.slice(0, 9)]); // Mantener solo los últimos 10 logs
    trackUserAction('gesture_performed', { gesture, details });
  };

  // Gestos básicos
  const tapGesture = createTapGesture(
    () => addGestureLog('Tap'),
    () => addGestureLog('Double Tap')
  );

  const longPressGesture = createLongPressGesture(
    () => addGestureLog('Long Press')
  );

  const panGesture = createPanGesture(
    undefined,
    (event) => {
      setPosition({ x: event.translationX, y: event.translationY });
      addGestureLog('Pan Update', { x: event.translationX, y: event.translationY });
    }
  );

  const pinchGesture = createPinchGesture(
    undefined,
    (event) => {
      setScale(event.scale);
      addGestureLog('Pinch Update', { scale: event.scale });
    }
  );

  const rotationGesture = createRotationGesture(
    undefined,
    (event) => {
      setRotation(event.rotation);
      addGestureLog('Rotation Update', { rotation: event.rotation });
    }
  );

  const swipeGesture = createSwipeGesture(
    (direction) => {
      addGestureLog('Swipe', { direction });
      Alert.alert('Swipe Detectado', `Dirección: ${direction}`);
    }
  );

  const flingGesture = createFlingGesture(
    (direction) => {
      addGestureLog('Fling', { direction });
      Alert.alert('Fling Detectado', `Dirección: ${direction}`);
    }
  );

  // Gestos compuestos
  const imageGestures = createComponentGestures('image', {
    onTap: () => addGestureLog('Image Tap'),
    onDoubleTap: () => {
      setScale(scale === 1 ? 2 : 1);
      setRotation(0);
      addGestureLog('Image Double Tap - Reset');
    },
    onLongPress: () => addGestureLog('Image Long Press'),
    onPan: (event) => {
      setPosition({ x: event.translationX, y: event.translationY });
      addGestureLog('Image Pan', { x: event.translationX, y: event.translationY });
    },
    onPinch: (event) => {
      setScale(event.scale);
      addGestureLog('Image Pinch', { scale: event.scale });
    },
    onRotation: (event) => {
      setRotation(event.rotation);
      addGestureLog('Image Rotation', { rotation: event.rotation });
    },
    onSwipe: (direction) => {
      addGestureLog('Image Swipe', { direction });
      Alert.alert('Image Swipe', `Dirección: ${direction}`);
    },
  });

  const cardGestures = createComponentGestures('card', {
    onTap: () => addGestureLog('Card Tap'),
    onLongPress: () => addGestureLog('Card Long Press'),
    onSwipe: (direction) => {
      addGestureLog('Card Swipe', { direction });
      Alert.alert('Card Swipe', `Dirección: ${direction}`);
    },
  });

  const listGestures = createComponentGestures('list', {
    onTap: () => addGestureLog('List Item Tap'),
    onLongPress: () => addGestureLog('List Item Long Press'),
    onSwipe: (direction) => {
      addGestureLog('List Item Swipe', { direction });
      Alert.alert('List Item Swipe', `Dirección: ${direction}`);
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-text">
              React Native Gesture Handler Demo
            </Text>
            <Text className="text-text-secondary">
              Demostración de gestos táctiles y configuración avanzada
            </Text>
          </View>

          {/* Información del dispositivo */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Información del Dispositivo</Title>
              
              <View className="mt-4 space-y-2">
                <Text className={themedClasses.textSecondary}>
                  Pantalla: {deviceInfo.width} x {deviceInfo.height}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Tamaño: {deviceInfo.screenSize}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Orientación: {deviceInfo.isLandscape ? 'Horizontal' : 'Vertical'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Plataforma: {deviceInfo.platform}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Gestos básicos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Gestos Básicos</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Prueba los gestos básicos de toque, arrastre y pellizco
              </Paragraph>
              
              <View className="mt-4 space-y-4">
                {/* Tap y Double Tap */}
                <GestureDetector gesture={tapGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Tap / Double Tap
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Toca una vez para tap, dos veces para double tap
                    </Text>
                  </View>
                </GestureDetector>

                {/* Long Press */}
                <GestureDetector gesture={longPressGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Long Press
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Mantén presionado para long press
                    </Text>
                  </View>
                </GestureDetector>

                {/* Pan */}
                <GestureDetector gesture={panGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Pan (Arrastre)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Arrastra para mover: X: {position.x.toFixed(1)}, Y: {position.y.toFixed(1)}
                    </Text>
                  </View>
                </GestureDetector>

                {/* Swipe */}
                <GestureDetector gesture={swipeGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Swipe (Deslizamiento)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Desliza en cualquier dirección
                    </Text>
                  </View>
                </GestureDetector>

                {/* Fling */}
                <GestureDetector gesture={flingGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Fling (Lanzamiento)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Lanza con velocidad para fling
                    </Text>
                  </View>
                </GestureDetector>
              </View>
            </Card.Content>
          </Card>

          {/* Gestos avanzados */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Gestos Avanzados</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Gestos de pellizco y rotación para contenido multimedia
              </Paragraph>
              
              <View className="mt-4 space-y-4">
                {/* Pinch */}
                <GestureDetector gesture={pinchGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Pinch (Pellizco)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Escala: {scale.toFixed(2)}x
                    </Text>
                  </View>
                </GestureDetector>

                {/* Rotation */}
                <GestureDetector gesture={rotationGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Rotation (Rotación)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Rotación: {(rotation * 180 / Math.PI).toFixed(1)}°
                    </Text>
                  </View>
                </GestureDetector>
              </View>
            </Card.Content>
          </Card>

          {/* Gestos por componente */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Gestos por Componente</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Gestos preconfigurados para diferentes tipos de componentes
              </Paragraph>
              
              <View className="mt-4 space-y-4">
                {/* Image Gestures */}
                <GestureDetector gesture={imageGestures}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Image Component
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Tap, Double Tap (reset), Long Press, Pan, Pinch, Rotation, Swipe
                    </Text>
                    <Text className={themedClasses.textTertiary + ' mt-2'}>
                      Escala: {scale.toFixed(2)}x | Rotación: {(rotation * 180 / Math.PI).toFixed(1)}°
                    </Text>
                  </View>
                </GestureDetector>

                {/* Card Gestures */}
                <GestureDetector gesture={cardGestures}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Card Component
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Tap, Long Press, Swipe
                    </Text>
                  </View>
                </GestureDetector>

                {/* List Gestures */}
                <GestureDetector gesture={listGestures}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      List Item Component
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Tap, Long Press, Swipe
                    </Text>
                  </View>
                </GestureDetector>
              </View>
            </Card.Content>
          </Card>

          {/* Log de gestos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Log de Gestos</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Historial de gestos realizados
              </Paragraph>
              
              <View className="mt-4">
                {gestureLog.length === 0 ? (
                  <Text className={themedClasses.textTertiary + ' italic'}>
                    No se han realizado gestos aún
                  </Text>
                ) : (
                  <View className="space-y-1">
                    {gestureLog.map((log, index) => (
                      <Text key={index} className={themedClasses.textSecondary + ' text-sm'}>
                        {log}
                      </Text>
                    ))}
                  </View>
                )}
                
                {gestureLog.length > 0 && (
                  <Button
                    mode="outlined"
                    onPress={() => setGestureLog([])}
                    className="mt-4"
                  >
                    Limpiar Log
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>

          {/* Acciones */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Acciones</Title>
              
              <View className="mt-4 space-y-3">
                <Button
                  mode="contained"
                  onPress={() => {
                    setScale(1);
                    setRotation(0);
                    setPosition({ x: 0, y: 0 });
                    addGestureLog('Reset All');
                  }}
                >
                  Resetear Todo
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => {
                    Alert.alert(
                      'Información de Gestos',
                      `Dispositivo: ${deviceInfo.platform}\n` +
                      `Pantalla: ${deviceInfo.screenSize}\n` +
                      `Orientación: ${deviceInfo.isLandscape ? 'Horizontal' : 'Vertical'}\n` +
                      `Resolución: ${deviceInfo.width}x${deviceInfo.height}`
                    );
                  }}
                >
                  Información del Dispositivo
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Text className={themedClasses.textSecondary + ' text-center'}>
              React Native Gesture Handler está configurado y funcionando
            </Text>
            <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
              Todos los gestos se registran y analizan automáticamente
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};
```

## 🎯 Casos de Uso

### **1. Gestos en Imágenes**

```typescript
const ImageWithGestures: React.FC = () => {
  const { createComponentGestures } = useGestureHandler();
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const imageGestures = createComponentGestures('image', {
    onTap: () => console.log('Image tapped'),
    onDoubleTap: () => {
      setScale(scale === 1 ? 2 : 1);
      setRotation(0);
    },
    onLongPress: () => console.log('Image long pressed'),
    onPan: (event) => {
      // Mover imagen
    },
    onPinch: (event) => {
      setScale(event.scale);
    },
    onRotation: (event) => {
      setRotation(event.rotation);
    },
    onSwipe: (direction) => {
      console.log('Image swiped:', direction);
    },
  });

  return (
    <GestureDetector gesture={imageGestures}>
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        style={{
          width: 200,
          height: 200,
          transform: [
            { scale },
            { rotate: `${rotation}rad` },
          ],
        }}
      />
    </GestureDetector>
  );
};
```

### **2. Gestos en Listas**

```typescript
const ListWithGestures: React.FC = () => {
  const { createComponentGestures } = useGestureHandler();

  const listGestures = createComponentGestures('list', {
    onTap: () => console.log('List item tapped'),
    onLongPress: () => console.log('List item long pressed'),
    onSwipe: (direction) => {
      if (direction === 'left') {
        // Eliminar elemento
      } else if (direction === 'right') {
        // Marcar como favorito
      }
    },
  });

  return (
    <GestureDetector gesture={listGestures}>
      <View className="p-4 bg-surface rounded-md">
        <Text>List Item</Text>
      </View>
    </GestureDetector>
  );
};
```

### **3. Gestos en Tarjetas**

```typescript
const CardWithGestures: React.FC = () => {
  const { createComponentGestures } = useGestureHandler();

  const cardGestures = createComponentGestures('card', {
    onTap: () => console.log('Card tapped'),
    onLongPress: () => console.log('Card long pressed'),
    onSwipe: (direction) => {
      if (direction === 'up') {
        // Expandir tarjeta
      } else if (direction === 'down') {
        // Contraer tarjeta
      }
    },
  });

  return (
    <GestureDetector gesture={cardGestures}>
      <Card className="m-4">
        <Card.Content>
          <Title>Card Title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
    </GestureDetector>
  );
};
```

### **4. Gestos en Botones**

```typescript
const ButtonWithGestures: React.FC = () => {
  const { createComponentGestures } = useGestureHandler();

  const buttonGestures = createComponentGestures('button', {
    onTap: () => console.log('Button tapped'),
    onLongPress: () => console.log('Button long pressed'),
  });

  return (
    <GestureDetector gesture={buttonGestures}>
      <TouchableOpacity className="p-4 bg-primary rounded-md">
        <Text className="text-white font-medium">Button</Text>
      </TouchableOpacity>
    </GestureDetector>
  );
};
```

## ✅ Mejores Prácticas

### **1. Uso de GestureHandlerRootView**

```typescript
// ✅ Correcto - Envolver toda la app
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

// ❌ Incorrecto - No envolver la app
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### **2. Configuración de Gestos**

```typescript
// ✅ Correcto - Usar configuración personalizada
const { createTapGesture } = useGestureHandler();
const tapGesture = createTapGesture(
  () => console.log('Tap'),
  () => console.log('Double tap'),
  { maxDurationMs: 300 }
);

// ❌ Incorrecto - Usar configuración por defecto
const tapGesture = Gesture.Tap().onStart(() => console.log('Tap'));
```

### **3. Gestos Compuestos**

```typescript
// ✅ Correcto - Usar gestos compuestos
const { createComponentGestures } = useGestureHandler();
const imageGestures = createComponentGestures('image', {
  onTap: () => console.log('Tap'),
  onPinch: (event) => setScale(event.scale),
  onRotation: (event) => setRotation(event.rotation),
});

// ❌ Incorrecto - Crear gestos manualmente
const tapGesture = Gesture.Tap().onStart(() => console.log('Tap'));
const pinchGesture = Gesture.Pinch().onUpdate((event) => setScale(event.scale));
const compositeGesture = Gesture.Simultaneous(tapGesture, pinchGesture);
```

### **4. Manejo de Eventos**

```typescript
// ✅ Correcto - Usar runOnJS para callbacks
const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    runOnJS(setPosition)({ x: event.translationX, y: event.translationY });
  });

// ❌ Incorrecto - Llamar directamente
const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    setPosition({ x: event.translationX, y: event.translationY });
  });
```

## 🔧 Solución de Problemas

### **1. Gestos no funcionan**

**Problema**: Los gestos no se detectan

**Solución**:
```typescript
// Verificar que GestureHandlerRootView esté configurado
import 'react-native-gesture-handler';

// Envolver toda la app
<GestureHandlerRootView style={{ flex: 1 }}>
  {/* Tu app aquí */}
</GestureHandlerRootView>
```

### **2. Conflictos con React Navigation**

**Problema**: Los gestos no funcionan con React Navigation

**Solución**:
```typescript
// Usar GestureHandlerRootView en el nivel más alto
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* Navegación aquí */}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
```

### **3. Gestos no se detectan en Android**

**Problema**: Los gestos no funcionan en Android

**Solución**:
```kotlin
// Verificar MainActivity.kt
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      RNGestureHandlerEnabledRootView(this, mainComponentName, fabricEnabled)
}
```

### **4. Rendimiento lento**

**Problema**: Los gestos causan lag

**Solución**:
```typescript
// Usar useCallback para optimizar
const createTapGesture = useCallback((
  onTap?: () => void,
  config?: any
) => {
  return Gesture.Tap()
    .onStart(() => {
      if (onTap) runOnJS(onTap)();
    });
}, []);

// Usar useMemo para cachear gestos
const tapGesture = useMemo(() => createTapGesture(() => console.log('Tap')), [createTapGesture]);
```

### **5. Gestos no se cancelan correctamente**

**Problema**: Los gestos no se cancelan cuando deberían

**Solución**:
```typescript
// Configurar offsets correctamente
const panGesture = Gesture.Pan()
  .activeOffsetX([-10, 10])
  .activeOffsetY([-10, 10])
  .failOffsetX([-20, 20])
  .failOffsetY([-20, 20]);
```

## 🎉 Conclusión

React Native Gesture Handler proporciona:

- ✅ **Gestos nativos** con mejor rendimiento
- ✅ **Configuración flexible** para diferentes dispositivos
- ✅ **Gestos compuestos** para experiencias complejas
- ✅ **Integración perfecta** con React Navigation
- ✅ **Analytics automático** de gestos
- ✅ **Soporte multiplataforma** completo
- ✅ **API intuitiva** y fácil de usar
- ✅ **Optimización automática** para diferentes tamaños de pantalla

El sistema está completamente configurado y listo para usar, proporcionando una experiencia de gestos táctiles nativa y fluida. 🚀
