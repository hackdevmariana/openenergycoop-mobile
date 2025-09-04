import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

// Configuración de gestos
export const GESTURE_CONFIG = {
  // Configuración de gestos de toque
  tap: {
    numberOfTaps: 1,
    maxDurationMs: 500,
    maxDelayMs: 500,
  },
  
  // Configuración de gestos de arrastre
  pan: {
    minDistance: 10,
    activeOffsetX: [-10, 10],
    activeOffsetY: [-10, 10],
    failOffsetX: [-20, 20],
    failOffsetY: [-20, 20],
  },
  
  // Configuración de gestos de pellizco
  pinch: {
    minDistance: 10,
    minPointers: 2,
    maxPointers: 2,
  },
  
  // Configuración de gestos de rotación
  rotation: {
    minDistance: 10,
    minPointers: 2,
    maxPointers: 2,
  },
  
  // Configuración de gestos de deslizamiento
  swipe: {
    minDistance: 50,
    minVelocity: 500,
    maxDurationMs: 500,
  },
  
  // Configuración de gestos de presión
  force: {
    minForce: 0.5,
    maxForce: 1.0,
  },
  
  // Configuración de gestos de fling
  fling: {
    minVelocity: 500,
    maxDurationMs: 500,
    numberOfPointers: 1,
  },
  
  // Configuración de gestos de long press
  longPress: {
    minDurationMs: 500,
    maxDistance: 10,
  },
  
  // Configuración de gestos de hover
  hover: {
    enabled: true,
    delayMs: 100,
  },
  
  // Configuración de gestos de scroll
  scroll: {
    enabled: true,
    simultaneousHandlers: [],
    waitFor: [],
  },
  
  // Configuración de gestos de native view
  nativeView: {
    enabled: true,
    shouldCancelWhenOutside: true,
  },
};

// Tipos de gestos disponibles
export type GestureType = 
  | 'tap'
  | 'doubleTap'
  | 'longPress'
  | 'pan'
  | 'pinch'
  | 'rotation'
  | 'swipe'
  | 'force'
  | 'fling'
  | 'hover'
  | 'scroll'
  | 'nativeView';

// Configuración de gestos para diferentes componentes
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
  
  // Gestos para mapas
  map: {
    tap: true,
    doubleTap: true,
    longPress: true,
    pan: true,
    pinch: true,
    rotation: true,
  },
  
  // Gestos para gráficos
  chart: {
    tap: true,
    longPress: true,
    pan: true,
    pinch: true,
    rotation: true,
  },
  
  // Gestos para modales
  modal: {
    tap: true,
    pan: true,
    swipe: true,
  },
  
  // Gestos para navegación
  navigation: {
    tap: true,
    longPress: true,
    pan: true,
    swipe: true,
  },
};

// Configuración de gestos para diferentes tamaños de pantalla
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

// Configuración de gestos para diferentes orientaciones
export const ORIENTATION_GESTURES = {
  portrait: {
    // Orientación vertical
    pan: { activeOffsetX: [-10, 10], activeOffsetY: [-10, 10] },
    swipe: { direction: 'up' | 'down' | 'left' | 'right' },
  },
  
  landscape: {
    // Orientación horizontal
    pan: { activeOffsetX: [-15, 15], activeOffsetY: [-5, 5] },
    swipe: { direction: 'left' | 'right' },
  },
};

// Configuración de gestos para diferentes temas
export const THEME_GESTURES = {
  light: {
    // Tema claro
    tap: { maxDurationMs: 500 },
    longPress: { minDurationMs: 500 },
  },
  
  dark: {
    // Tema oscuro
    tap: { maxDurationMs: 400 },
    longPress: { minDurationMs: 400 },
  },
};

// Configuración de gestos para diferentes idiomas
export const LANGUAGE_GESTURES = {
  ltr: {
    // Idiomas de izquierda a derecha
    swipe: { direction: 'left' | 'right' },
    pan: { activeOffsetX: [-10, 10] },
  },
  
  rtl: {
    // Idiomas de derecha a izquierda
    swipe: { direction: 'right' | 'left' },
    pan: { activeOffsetX: [10, -10] },
  },
};

// Configuración de gestos para diferentes estados
export const STATE_GESTURES = {
  normal: {
    // Estado normal
    tap: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
  },
  
  disabled: {
    // Estado deshabilitado
    tap: { enabled: false },
    pan: { enabled: false },
    swipe: { enabled: false },
  },
  
  loading: {
    // Estado de carga
    tap: { enabled: false },
    pan: { enabled: false },
    swipe: { enabled: false },
  },
  
  error: {
    // Estado de error
    tap: { enabled: true },
    pan: { enabled: false },
    swipe: { enabled: false },
  },
};

// Configuración de gestos para diferentes tipos de contenido
export const CONTENT_GESTURES = {
  text: {
    // Contenido de texto
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: false },
    swipe: { enabled: false },
  },
  
  image: {
    // Contenido de imagen
    tap: { enabled: true },
    doubleTap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    pinch: { enabled: true },
    rotation: { enabled: true },
  },
  
  video: {
    // Contenido de video
    tap: { enabled: true },
    doubleTap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    pinch: { enabled: true },
    rotation: { enabled: true },
  },
  
  audio: {
    // Contenido de audio
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: false },
    swipe: { enabled: false },
  },
  
  interactive: {
    // Contenido interactivo
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
    pinch: { enabled: true },
    rotation: { enabled: true },
  },
};

// Configuración de gestos para diferentes niveles de accesibilidad
export const ACCESSIBILITY_GESTURES = {
  low: {
    // Baja accesibilidad
    tap: { maxDurationMs: 1000, numberOfTaps: 1 },
    longPress: { minDurationMs: 1000 },
    pan: { minDistance: 20 },
    swipe: { minDistance: 80, minVelocity: 300 },
  },
  
  normal: {
    // Accesibilidad normal
    tap: { maxDurationMs: 500, numberOfTaps: 1 },
    longPress: { minDurationMs: 500 },
    pan: { minDistance: 10 },
    swipe: { minDistance: 50, minVelocity: 500 },
  },
  
  high: {
    // Alta accesibilidad
    tap: { maxDurationMs: 300, numberOfTaps: 1 },
    longPress: { minDurationMs: 300 },
    pan: { minDistance: 5 },
    swipe: { minDistance: 30, minVelocity: 700 },
  },
};

// Configuración de gestos para diferentes dispositivos
export const DEVICE_GESTURES = {
  phone: {
    // Dispositivos móviles
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
    swipe: { minDistance: 50 },
    pinch: { minDistance: 10 },
  },
  
  tablet: {
    // Tablets
    tap: { maxDurationMs: 400 },
    pan: { minDistance: 8 },
    swipe: { minDistance: 40 },
    pinch: { minDistance: 8 },
  },
  
  desktop: {
    // Dispositivos de escritorio
    tap: { maxDurationMs: 300 },
    pan: { minDistance: 5 },
    swipe: { minDistance: 30 },
    pinch: { minDistance: 5 },
  },
};

// Configuración de gestos para diferentes plataformas
export const PLATFORM_GESTURES = {
  ios: {
    // iOS
    tap: { maxDurationMs: 500 },
    longPress: { minDurationMs: 500 },
    pan: { minDistance: 10 },
    swipe: { minDistance: 50 },
  },
  
  android: {
    // Android
    tap: { maxDurationMs: 400 },
    longPress: { minDurationMs: 400 },
    pan: { minDistance: 8 },
    swipe: { minDistance: 40 },
  },
  
  web: {
    // Web
    tap: { maxDurationMs: 300 },
    longPress: { minDurationMs: 300 },
    pan: { minDistance: 5 },
    swipe: { minDistance: 30 },
  },
};

// Configuración de gestos para diferentes versiones de React Native
export const RN_VERSION_GESTURES = {
  '0.70': {
    // React Native 0.70
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.71': {
    // React Native 0.71
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.72': {
    // React Native 0.72
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.73': {
    // React Native 0.73
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.74': {
    // React Native 0.74
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.75': {
    // React Native 0.75
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.76': {
    // React Native 0.76
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.77': {
    // React Native 0.77
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.78': {
    // React Native 0.78
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.79': {
    // React Native 0.79
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.80': {
    // React Native 0.80
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
  
  '0.81': {
    // React Native 0.81
    tap: { maxDurationMs: 500 },
    pan: { minDistance: 10 },
  },
};

// Configuración de gestos para diferentes tipos de usuario
export const USER_GESTURES = {
  beginner: {
    // Usuario principiante
    tap: { maxDurationMs: 1000, numberOfTaps: 1 },
    longPress: { minDurationMs: 1000 },
    pan: { minDistance: 20 },
    swipe: { minDistance: 80, minVelocity: 300 },
  },
  
  intermediate: {
    // Usuario intermedio
    tap: { maxDurationMs: 500, numberOfTaps: 1 },
    longPress: { minDurationMs: 500 },
    pan: { minDistance: 10 },
    swipe: { minDistance: 50, minVelocity: 500 },
  },
  
  advanced: {
    // Usuario avanzado
    tap: { maxDurationMs: 300, numberOfTaps: 1 },
    longPress: { minDurationMs: 300 },
    pan: { minDistance: 5 },
    swipe: { minDistance: 30, minVelocity: 700 },
  },
  
  expert: {
    // Usuario experto
    tap: { maxDurationMs: 200, numberOfTaps: 1 },
    longPress: { minDurationMs: 200 },
    pan: { minDistance: 3 },
    swipe: { minDistance: 20, minVelocity: 1000 },
  },
};

// Configuración de gestos para diferentes contextos
export const CONTEXT_GESTURES = {
  home: {
    // Pantalla de inicio
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
  },
  
  detail: {
    // Pantalla de detalle
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
    pinch: { enabled: true },
    rotation: { enabled: true },
  },
  
  list: {
    // Pantalla de lista
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    scroll: { enabled: true },
    swipe: { enabled: true },
  },
  
  modal: {
    // Pantalla modal
    tap: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
  },
  
  navigation: {
    // Pantalla de navegación
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
  },
  
  settings: {
    // Pantalla de configuración
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: false },
    swipe: { enabled: false },
  },
  
  profile: {
    // Pantalla de perfil
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    swipe: { enabled: true },
  },
  
  search: {
    // Pantalla de búsqueda
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    scroll: { enabled: true },
  },
  
  chat: {
    // Pantalla de chat
    tap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    scroll: { enabled: true },
    swipe: { enabled: true },
  },
  
  media: {
    // Pantalla de medios
    tap: { enabled: true },
    doubleTap: { enabled: true },
    longPress: { enabled: true },
    pan: { enabled: true },
    pinch: { enabled: true },
    rotation: { enabled: true },
    swipe: { enabled: true },
  },
};

// Exportar configuración por defecto
export const gestureConfig = GESTURE_CONFIG;
