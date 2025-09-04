import { useCallback, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Platform, Dimensions } from 'react-native';
import { gestureConfig, COMPONENT_GESTURES, SCREEN_SIZE_GESTURES } from '../config/gestureHandler';

// Hook para crear gestos personalizados
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
          const { velocityX, velocityY, translationX, translationY } = event;
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
