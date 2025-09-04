import { useCallback, useMemo, useRef, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Platform, Dimensions } from 'react-native';
import { helpGesturesConfig } from '../config/helpGestures';

// Tipos para el sistema de ayuda
export type HelpType = 'fullPanel' | 'tooltip' | 'highlight' | 'tutorial' | 'quick';
export type HelpGesture = 'helpSwipe' | 'contextualHelp' | 'quickHelp' | 'fullScreenHelp';

interface HelpState {
  isActive: boolean;
  currentType: HelpType | null;
  currentElement: string | null;
  position: { x: number; y: number };
  content: any;
}

interface HelpCallbacks {
  onHelpActivate?: (type: HelpType, element?: string) => void;
  onHelpDeactivate?: () => void;
  onGestureDetected?: (gesture: HelpGesture) => void;
  onElementHighlight?: (element: string) => void;
}

export const useHelpGestures = (
  screenName: keyof typeof helpGesturesConfig.screens,
  callbacks?: HelpCallbacks
) => {
  // Estado del sistema de ayuda
  const [helpState, setHelpState] = useState<HelpState>({
    isActive: false,
    currentType: null,
    currentElement: null,
    position: { x: 0, y: 0 },
    content: null,
  });

  // Referencias para gestos
  const gestureRef = useRef<Gesture>();
  const longPressRef = useRef<Gesture>();
  const quickHelpRef = useRef<Gesture>();
  const fullScreenHelpRef = useRef<Gesture>();

  // Configuración de ayuda para la pantalla actual
  const helpConfig = useMemo(() => {
    return helpGesturesConfig.getHelpConfig(screenName);
  }, [screenName]);

  // Configuración de gestos disponibles
  const gestureConfigs = useMemo(() => {
    const configs: Record<HelpGesture, any> = {} as any;
    helpConfig.gestures.forEach(gesture => {
      configs[gesture] = helpGesturesConfig.getGestureConfig(gesture);
    });
    return configs;
  }, [helpConfig.gestures]);

  // Función para activar ayuda
  const activateHelp = useCallback((type: HelpType, element?: string, position?: { x: number; y: number }) => {
    setHelpState(prev => ({
      ...prev,
      isActive: true,
      currentType: type,
      currentElement: element || null,
      position: position || prev.position,
      content: helpConfig.content,
    }));

    // Feedback háptico
    if (Platform.OS === 'ios') {
      // Haptic feedback para iOS
      const { Haptics } = require('expo-haptics');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Callback
    callbacks?.onHelpActivate?.(type, element);
  }, [helpConfig.content, callbacks]);

  // Función para desactivar ayuda
  const deactivateHelp = useCallback(() => {
    setHelpState(prev => ({
      ...prev,
      isActive: false,
      currentType: null,
      currentElement: null,
    }));

    // Callback
    callbacks?.onHelpDeactivate?.();
  }, [callbacks]);

  // Función para detectar gesto
  const handleGestureDetected = useCallback((gesture: HelpGesture) => {
    callbacks?.onGestureDetected?.(gesture);
    
    // Activar ayuda según el gesto
    switch (gesture) {
      case 'helpSwipe':
        activateHelp('fullPanel');
        break;
      case 'contextualHelp':
        activateHelp('tooltip');
        break;
      case 'quickHelp':
        activateHelp('quick');
        break;
      case 'fullScreenHelp':
        activateHelp('tutorial');
        break;
    }
  }, [activateHelp, callbacks]);

  // Gesto principal de ayuda (deslizar hacia abajo desde arriba)
  const helpSwipeGesture = useMemo(() => {
    if (!gestureConfigs.helpSwipe?.enabled) return null;

    const config = gestureConfigs.helpSwipe;
    
    return Gesture.Pan()
      .onBegin((event) => {
        // Verificar que el gesto comience en la zona de activación
        const { y } = event;
        if (y > config.triggerZone.bottom) {
          return false;
        }
      })
      .onUpdate((event) => {
        const { translationY, velocityY } = event;
        
        // Verificar distancia y velocidad
        if (translationY > config.minDistance && velocityY > config.velocity) {
          runOnJS(handleGestureDetected)('helpSwipe');
        }
      })
      .onEnd(() => {
        // Reset del gesto
      });
  }, [gestureConfigs.helpSwipe, handleGestureDetected]);

  // Gesto de ayuda contextual (toque largo)
  const contextualHelpGesture = useMemo(() => {
    if (!gestureConfigs.contextualHelp?.enabled) return null;

    const config = gestureConfigs.contextualHelp;
    
    return Gesture.LongPress()
      .minDuration(config.duration)
      .maxDistance(config.maxDistance)
      .onStart((event) => {
        const { x, y } = event;
        runOnJS(handleGestureDetected)('contextualHelp');
        runOnJS(activateHelp)('tooltip', undefined, { x, y });
      });
  }, [gestureConfigs.contextualHelp, handleGestureDetected, activateHelp]);

  // Gesto de ayuda rápida (deslizar desde el borde derecho)
  const quickHelpGesture = useMemo(() => {
    if (!gestureConfigs.quickHelp?.enabled) return null;

    const config = gestureConfigs.quickHelp;
    const screenWidth = Dimensions.get('window').width;
    
    return Gesture.Pan()
      .onBegin((event) => {
        // Verificar que el gesto comience en el borde derecho
        const { x } = event;
        const triggerZoneLeft = screenWidth * (config.triggerZone.left / 100);
        if (x < triggerZoneLeft) {
          return false;
        }
      })
      .onUpdate((event) => {
        const { translationX, velocityX } = event;
        
        // Verificar distancia y velocidad hacia la izquierda
        if (translationX < -config.minDistance && velocityX < -config.velocity) {
          runOnJS(handleGestureDetected)('quickHelp');
        }
      });
  }, [gestureConfigs.quickHelp, handleGestureDetected]);

  // Gesto de ayuda de pantalla completa (deslizar desde esquina)
  const fullScreenHelpGesture = useMemo(() => {
    if (!gestureConfigs.fullScreenHelp?.enabled) return null;

    const config = gestureConfigs.fullScreenHelp;
    const screenWidth = Dimensions.get('window').width;
    
    return Gesture.Pan()
      .onBegin((event) => {
        // Verificar que el gesto comience en la esquina superior derecha
        const { x, y } = event;
        const triggerZoneLeft = screenWidth * (config.triggerZone.left / 100);
        if (x < triggerZoneLeft || y > config.triggerZone.bottom) {
          return false;
        }
      })
      .onUpdate((event) => {
        const { translationX, translationY, velocityX, velocityY } = event;
        
        // Verificar movimiento diagonal
        const distance = Math.sqrt(translationX * translationX + translationY * translationY);
        const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        
        if (distance > config.minDistance && velocity > config.velocity) {
          runOnJS(handleGestureDetected)('fullScreenHelp');
        }
      });
  }, [gestureConfigs.fullScreenHelp, handleGestureDetected]);

  // Gesto compuesto que combina todos los gestos de ayuda
  const combinedHelpGesture = useMemo(() => {
    const gestures = [];
    
    if (helpSwipeGesture) gestures.push(helpSwipeGesture);
    if (contextualHelpGesture) gestures.push(contextualHelpGesture);
    if (quickHelpGesture) gestures.push(quickHelpGesture);
    if (fullScreenHelpGesture) gestures.push(fullScreenHelpGesture);
    
    return Gesture.Race(...gestures);
  }, [helpSwipeGesture, contextualHelpGesture, quickHelpGesture, fullScreenHelpGesture]);

  // Función para resaltar elemento
  const highlightElement = useCallback((element: string) => {
    callbacks?.onElementHighlight?.(element);
    activateHelp('highlight', element);
  }, [callbacks, activateHelp]);

  // Función para mostrar tooltip
  const showTooltip = useCallback((element: string, position: { x: number; y: number }) => {
    activateHelp('tooltip', element, position);
  }, [activateHelp]);

  // Función para mostrar tutorial
  const showTutorial = useCallback(() => {
    activateHelp('tutorial');
  }, [activateHelp]);

  // Función para mostrar ayuda rápida
  const showQuickHelp = useCallback(() => {
    activateHelp('quick');
  }, [activateHelp]);

  // Función para mostrar panel completo
  const showFullPanel = useCallback(() => {
    activateHelp('fullPanel');
  }, [activateHelp]);

  // Función para obtener contenido de ayuda por elemento
  const getElementHelp = useCallback((elementType: string) => {
    return helpGesturesConfig.getElementHelpConfig(elementType as any);
  }, []);

  // Función para verificar si un gesto está habilitado
  const isGestureEnabled = useCallback((gesture: HelpGesture) => {
    return helpConfig.gestures.includes(gesture);
  }, [helpConfig.gestures]);

  // Función para obtener configuración de gesto
  const getGestureConfig = useCallback((gesture: HelpGesture) => {
    return gestureConfigs[gesture];
  }, [gestureConfigs]);

  // Función para obtener contenido de ayuda actual
  const getCurrentHelpContent = useCallback(() => {
    if (!helpState.isActive) return null;
    
    switch (helpState.currentType) {
      case 'fullPanel':
        return helpConfig.content;
      case 'tooltip':
        return helpState.currentElement 
          ? getElementHelp(helpState.currentElement)
          : null;
      case 'highlight':
        return helpState.currentElement 
          ? getElementHelp(helpState.currentElement)
          : null;
      case 'tutorial':
        return {
          title: 'Tutorial',
          description: 'Guía paso a paso',
          steps: helpConfig.content.gestures || [],
        };
      case 'quick':
        return {
          title: 'Ayuda Rápida',
          description: 'Acceso rápido a funciones',
          actions: helpConfig.content.gestures || [],
        };
      default:
        return null;
    }
  }, [helpState, helpConfig.content, getElementHelp]);

  // Función para obtener posición de ayuda
  const getHelpPosition = useCallback(() => {
    return helpState.position;
  }, [helpState.position]);

  // Función para verificar si la ayuda está activa
  const isHelpActive = useCallback(() => {
    return helpState.isActive;
  }, [helpState.isActive]);

  // Función para obtener tipo de ayuda actual
  const getCurrentHelpType = useCallback(() => {
    return helpState.currentType;
  }, [helpState.currentType]);

  // Función para obtener elemento actual
  const getCurrentElement = useCallback(() => {
    return helpState.currentElement;
  }, [helpState.currentElement]);

  return {
    // Estado
    helpState,
    isHelpActive,
    getCurrentHelpType,
    getCurrentElement,
    getCurrentHelpContent,
    getHelpPosition,
    
    // Gestos
    combinedHelpGesture,
    helpSwipeGesture,
    contextualHelpGesture,
    quickHelpGesture,
    fullScreenHelpGesture,
    
    // Funciones de activación
    activateHelp,
    deactivateHelp,
    highlightElement,
    showTooltip,
    showTutorial,
    showQuickHelp,
    showFullPanel,
    
    // Funciones de utilidad
    getElementHelp,
    isGestureEnabled,
    getGestureConfig,
    
    // Configuración
    helpConfig,
    gestureConfigs,
  };
};
