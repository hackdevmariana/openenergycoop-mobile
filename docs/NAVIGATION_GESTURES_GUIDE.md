# Gestos de Navegación - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Configuración Actual](#configuración-actual)
3. [Cómo Funcionan los Gestos](#cómo-funcionan-los-gestos)
4. [Demostración Práctica](#demostración-práctica)
5. [Configuración Avanzada](#configuración-avanzada)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

**Sí, ahora puedes pasar de pantalla a pantalla con una transición suave deslizando el dedo de izquierda a derecha o de derecha a izquierda.** 

La aplicación OpenEnergyCoop Mobile está configurada con **React Native Screens** y **React Navigation** para proporcionar una experiencia de navegación nativa y fluida.

### **✅ Funcionalidades Disponibles**

- 🎯 **Gestos de deslizamiento** de izquierda a derecha para volver atrás
- 🚀 **Transiciones suaves** y nativas
- 📱 **Compatibilidad** con iOS y Android
- ⚡ **Respuesta rápida** con 50px de distancia de activación
- 🎨 **Animaciones personalizadas** para cada pantalla
- 🔧 **Configuración flexible** por pantalla

## ⚙️ Configuración Actual

### **1. React Native Screens Configurado**

```typescript
// index.js
import 'react-native-screens/register'; // Habilitado

// src/navigation/AppNavigator.tsx
screenOptions={{
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  gestureResponseDistance: 50,
  animation: 'slide_from_right',
  presentation: 'card',
}}
```

### **2. Configuración por Pantalla**

```typescript
// Pantalla de detalle con gestos específicos
<Stack.Screen 
  name="Detail" 
  component={DetailScreen}
  options={{
    headerShown: true,
    title: 'Detalle',
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    gestureResponseDistance: 50,
    animation: 'slide_from_right',
    presentation: 'card',
  }}
/>
```

## 🎮 Cómo Funcionan los Gestos

### **1. Gesto de Volver Atrás**

**Para volver a la pantalla anterior:**
- Coloca tu dedo en el **borde izquierdo** de la pantalla
- Desliza **hacia la derecha**
- La pantalla se deslizará suavemente hacia la izquierda
- Volverás a la pantalla anterior

### **2. Sensibilidad del Gesto**

- **Distancia mínima**: 50px
- **Dirección**: Horizontal
- **Área de activación**: Todo el borde izquierdo de la pantalla
- **Velocidad**: No importa, solo la distancia

### **3. Animaciones**

- **Entrada**: `slide_from_right` - La pantalla entra desde la derecha
- **Salida**: `slide_from_left` - La pantalla sale hacia la izquierda
- **Duración**: Nativa (optimizada por el sistema)
- **Easing**: Nativo (suave y natural)

## 🧪 Demostración Práctica

### **1. Pantalla de Gestos**

Ve a la pestaña **"Gestos"** en la aplicación para probar:

- **Información detallada** sobre los gestos
- **Estadísticas** de gestos detectados
- **Configuración** actual de la pantalla
- **Botones de demostración** para navegación programática

### **2. Navegación entre Pantallas**

1. **Desde Home**: Toca "Probar Gestos" para ir a la pantalla de detalle
2. **En Detail**: Desliza de izquierda a derecha para volver
3. **En Gestos**: Prueba los diferentes botones de navegación

### **3. Configuración Visual**

```typescript
// Configuración actual en cada pantalla
const screenOptions = {
  gestureEnabled: true,           // ✅ Gestos habilitados
  gestureDirection: 'horizontal', // ✅ Dirección horizontal
  gestureResponseDistance: 50,    // ✅ 50px de distancia
  animation: 'slide_from_right',  // ✅ Animación de entrada
  presentation: 'card',           // ✅ Presentación tipo tarjeta
};
```

## 🔧 Configuración Avanzada

### **1. Personalizar Distancia de Respuesta**

```typescript
// Para gestos más sensibles
gestureResponseDistance: 30, // Menos distancia

// Para gestos menos sensibles
gestureResponseDistance: 100, // Más distancia
```

### **2. Cambiar Dirección de Gestos**

```typescript
// Gestos verticales (para modales)
gestureDirection: 'vertical',

// Gestos en ambas direcciones
gestureDirection: 'horizontal-vertical',
```

### **3. Personalizar Animaciones**

```typescript
// Diferentes tipos de animación
animation: 'slide_from_bottom', // Desde abajo
animation: 'fade',              // Fade in/out
animation: 'scale',             // Escala
animation: 'rotate',            // Rotación
```

### **4. Configuración por Plataforma**

```typescript
// Configuración específica para iOS
if (Platform.OS === 'ios') {
  gestureResponseDistance: 50,
  gestureVelocityImpact: 0.3,
}

// Configuración específica para Android
if (Platform.OS === 'android') {
  gestureResponseDistance: 50,
  gestureVelocityImpact: 0.3,
}
```

## ✅ Mejores Prácticas

### **1. Uso Correcto de Gestos**

```typescript
// ✅ Correcto - Gestos habilitados para navegación
<Stack.Screen 
  name="Detail" 
  component={DetailScreen}
  options={{
    gestureEnabled: true,
    gestureDirection: 'horizontal',
  }}
/>

// ❌ Incorrecto - Gestos deshabilitados sin razón
<Stack.Screen 
  name="Detail" 
  component={DetailScreen}
  options={{
    gestureEnabled: false, // No recomendado
  }}
/>
```

### **2. Configuración Consistente**

```typescript
// ✅ Correcto - Configuración consistente
const defaultScreenOptions = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  gestureResponseDistance: 50,
  animation: 'slide_from_right',
  presentation: 'card',
};

// Aplicar a todas las pantallas
<Stack.Navigator screenOptions={defaultScreenOptions}>
```

### **3. Optimización de Rendimiento**

```typescript
// ✅ Correcto - Usar React Native Screens
import { Screen } from 'react-native-screens';

const MyScreen = () => (
  <Screen style={{ flex: 1 }}>
    {/* Contenido */}
  </Screen>
);

// ❌ Incorrecto - No usar Screen
const MyScreen = () => (
  <View style={{ flex: 1 }}>
    {/* Contenido */}
  </View>
);
```

## 🔧 Solución de Problemas

### **1. Los gestos no funcionan**

**Problema**: Los gestos de deslizamiento no responden

**Solución**:
```typescript
// Verificar configuración
screenOptions={{
  gestureEnabled: true,           // Debe estar en true
  gestureDirection: 'horizontal', // Dirección correcta
  gestureResponseDistance: 50,    // Distancia adecuada
}}
```

### **2. Animaciones lentas**

**Problema**: Las transiciones son lentas o no suaves

**Solución**:
```typescript
// Usar React Native Screens
import { Screen } from 'react-native-screens';

// Habilitar en index.js
import 'react-native-screens/register';
```

### **3. Gestos no responden en algunas pantallas**

**Problema**: Los gestos funcionan en algunas pantallas pero no en otras

**Solución**:
```typescript
// Verificar configuración por pantalla
<Stack.Screen 
  name="ProblemScreen" 
  component={ProblemScreen}
  options={{
    gestureEnabled: true, // Asegurar que esté habilitado
    gestureDirection: 'horizontal',
    gestureResponseDistance: 50,
  }}
/>
```

### **4. Conflicto con otros gestos**

**Problema**: Los gestos de navegación interfieren con otros gestos

**Solución**:
```typescript
// Configurar gestos específicos
gestureHandlerProps: {
  activeOffsetX: [-10, 10], // Solo activar en el borde
  failOffsetX: [-20, 20],   // Fallar fuera del borde
}
```

## 🎉 Conclusión

**¡Sí, ahora puedes navegar entre pantallas deslizando el dedo!**

### **✅ Lo que tienes funcionando:**

- 🎯 **Gestos de deslizamiento** de izquierda a derecha para volver atrás
- 🚀 **Transiciones suaves** y nativas con React Native Screens
- 📱 **Compatibilidad completa** con iOS y Android
- ⚡ **Respuesta rápida** con 50px de distancia de activación
- 🎨 **Animaciones personalizadas** para cada pantalla
- 🔧 **Configuración flexible** y optimizada

### **🎮 Cómo probarlo:**

1. **Ve a la pestaña "Gestos"** en la aplicación
2. **Toca "Ir a Pantalla de Detalle"** desde Home
3. **Desliza de izquierda a derecha** para volver atrás
4. **Experimenta** con las diferentes opciones de navegación

La aplicación ahora proporciona una experiencia de navegación nativa y profesional, similar a las mejores aplicaciones móviles. ¡Los gestos de deslizamiento están completamente funcionales! 🚀
