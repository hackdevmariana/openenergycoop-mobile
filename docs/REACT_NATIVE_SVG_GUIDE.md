# React Native SVG - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración del Sistema](#configuración-del-sistema)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

**React Native SVG** es una biblioteca que permite usar gráficos SVG (Scalable Vector Graphics) en aplicaciones React Native. Proporciona componentes nativos para renderizar SVG de manera eficiente y con excelente rendimiento.

### **✅ Funcionalidades Principales**

- 🎨 **Gráficos vectoriales escalables** sin pérdida de calidad
- 📱 **Rendimiento nativo** optimizado para móviles
- 🔧 **Configuración flexible** por plataforma y tamaño de pantalla
- 🎯 **Colores temáticos** específicos para energía y estados
- 🚀 **Animaciones integradas** con react-native-reanimated
- 📊 **Gradientes y patrones** predefinidos
- ♿ **Accesibilidad completa** integrada
- 🔒 **Seguridad** con validación y sanitización

## ⚙️ Instalación y Configuración

### **1. Instalación**

```bash
npm install react-native-svg
```

### **2. Verificación de Instalación**

```json
// package.json
{
  "dependencies": {
    "react-native-svg": "^15.12.1"
  }
}
```

### **3. Configuración Automática**

React Native SVG se configura automáticamente con autolinking en React Native 0.60+. No requiere configuración manual adicional.

## 🔧 Configuración del Sistema

### **1. Configuración Centralizada**

```typescript
// src/config/svg.ts
import { Platform, Dimensions } from 'react-native';

export const SVG_CONFIG = {
  basic: {
    enabled: true,
    version: '15.12.1',
    platform: {
      ios: { supported: true, minVersion: '12.0' },
      android: { supported: true, minVersion: '21' },
    },
  },
  performance: {
    optimization: {
      enableOptimization: true,
      useNativeDriver: true,
      enableHardwareAcceleration: true,
    },
    cache: {
      enableCache: true,
      maxCacheSize: 100,
      cacheExpiration: 300000,
    },
  },
  // ... más configuraciones
};
```

### **2. Configuración por Plataforma**

```typescript
export const PLATFORM_SVG_CONFIG = {
  ios: {
    ...SVG_CONFIG,
    performance: {
      ...SVG_CONFIG.performance,
      useMetalRenderer: true,
      enableHardwareAcceleration: true,
    },
  },
  android: {
    ...SVG_CONFIG,
    performance: {
      ...SVG_CONFIG.performance,
      useOpenGLRenderer: true,
      enableHardwareAcceleration: true,
    },
  },
};
```

### **3. Configuración Responsiva**

```typescript
export const SCREEN_SIZE_SVG_CONFIG = {
  small: {
    components: {
      Svg: {
        variants: {
          small: { width: 12, height: 12 },
          medium: { width: 16, height: 16 },
          large: { width: 24, height: 24 },
          xlarge: { width: 32, height: 32 },
        },
      },
    },
  },
  // ... más tamaños
};
```

## 🎣 Hook Personalizado

### **1. Hook Principal**

```typescript
// src/hooks/useSVG.ts
import { useCallback, useMemo, useRef, useState } from 'react';
import { svgConfig } from '../config/svg';

export const useSVG = () => {
  const [svgState, setSvgState] = useState({
    isLoaded: false,
    isLoading: false,
    error: null,
    dimensions: { width: 0, height: 0 },
    viewBox: '0 0 100 100',
  });

  const svgRef = useRef<any>(null);
  const config = useMemo(() => getPlatformSVGConfig(), []);

  // Funciones de creación de elementos
  const createSVGElement = useCallback((
    type: SVGElement['type'],
    props: Record<string, any> = {},
    children?: SVGElement[]
  ): SVGElement => {
    const defaultProps = config.components[type]?.defaultProps || {};
    
    return {
      id: props.id || `${type}_${Date.now()}`,
      type,
      props: { ...defaultProps, ...props },
      children,
    };
  }, [config]);

  // Funciones específicas
  const createPath = useCallback((d: string, props = {}) => {
    return createSVGElement('path', { d, ...props });
  }, [createSVGElement]);

  const createCircle = useCallback((cx: number, cy: number, r: number, props = {}) => {
    return createSVGElement('circle', { cx, cy, r, ...props });
  }, [createSVGElement]);

  // ... más funciones

  return {
    svgState,
    svgRef,
    config,
    createSVGElement,
    createPath,
    createCircle,
    // ... más funciones
  };
};
```

### **2. Funciones de Colores**

```typescript
// Funciones para obtener colores temáticos
const getEnergyColors = useCallback((type: keyof typeof config.colors.energy) => {
  return config.colors.energy[type];
}, [config.colors.energy]);

const getStatusColors = useCallback((type: keyof typeof config.colors.status) => {
  return config.colors.status[type];
}, [config.colors.status]);

const getConsumptionColors = useCallback((type: keyof typeof config.colors.consumption) => {
  return config.colors.consumption[type];
}, [config.colors.consumption]);
```

### **3. Funciones de Animación**

```typescript
// Funciones para crear animaciones
const createAnimation = useCallback((
  type: SVGAnimation['type'],
  duration: number,
  options: Partial<SVGAnimation> = {}
): SVGAnimation => {
  const baseAnimation = config.animations[type] || config.animations.basic;
  
  return {
    type,
    duration,
    delay: options.delay || baseAnimation.delay,
    repeat: options.repeat || baseAnimation.repeat,
    easing: options.easing || baseAnimation.easing,
  };
}, [config.animations]);

const createEnergyAnimation = useCallback((
  type: keyof typeof config.animations.energy,
  options: Partial<SVGAnimation> = {}
): SVGAnimation => {
  const energyAnimation = config.animations.energy[type];
  
  return {
    type: type as SVGAnimation['type'],
    duration: energyAnimation.duration,
    delay: options.delay || energyAnimation.delay,
    repeat: options.repeat || energyAnimation.repeat,
    easing: options.easing || energyAnimation.easing,
  };
}, [config.animations.energy]);
```

## 🧪 Componente de Demostración

### **1. Componente Principal**

```typescript
// src/components/SVGDemo.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Svg, { Path, Circle, Rect, Line, Text as SVGText, G, Defs, LinearGradient, RadialGradient, Stop } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { useSVG } from '../hooks/useSVG';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const SVGDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    svgState,
    svgRef,
    config,
    createPath,
    createCircle,
    createRect,
    createLine,
    createText,
    getEnergyColors,
    getStatusColors,
    validateSVG,
    sanitizeSVG,
  } = useSVG();

  const [currentDemo, setCurrentDemo] = useState<'basic' | 'energy' | 'gradients' | 'animations' | 'complex'>('basic');
  const [svgSize, setSvgSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');

  // ... implementación del componente
};
```

### **2. Demostraciones Disponibles**

```typescript
// Demostración básica
const renderBasicDemo = () => (
  <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
    <Defs>
      <LinearGradient id="basicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={getStatusColors('info')} />
        <Stop offset="100%" stopColor={getStatusColors('success')} />
      </LinearGradient>
    </Defs>
    
    <Rect x="0" y="0" width="100" height="100" fill="url(#basicGradient)" opacity="0.1" />
    
    {basicElements.map((element, index) => {
      const sanitizedElement = sanitizeSVG(element);
      
      switch (sanitizedElement.type) {
        case 'path':
          return <Path key={index} {...sanitizedElement.props} />;
        case 'circle':
          return <Circle key={index} {...sanitizedElement.props} />;
        case 'rect':
          return <Rect key={index} {...sanitizedElement.props} />;
        case 'line':
          return <Line key={index} {...sanitizedElement.props} />;
        case 'text':
          return <SVGText key={index} {...sanitizedElement.props}>{sanitizedElement.props.children}</SVGText>;
        default:
          return null;
      }
    })}
  </Svg>
);

// Demostración de energía
const renderEnergyDemo = () => (
  <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
    <Defs>
      <RadialGradient id="solarGradient" cx="50%" cy="30%" r="50%">
        <Stop offset="0%" stopColor={getEnergyColors('solar')} />
        <Stop offset="100%" stopColor={getEnergyColors('solar')} stopOpacity="0.3" />
      </RadialGradient>
      <LinearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor={getEnergyColors('wind')} />
        <Stop offset="100%" stopColor={getEnergyColors('wind')} stopOpacity="0.5" />
      </LinearGradient>
    </Defs>
    
    <Rect x="0" y="0" width="100" height="100" fill="#f8f9fa" />
    
    {energyElements.map((element, index) => {
      const sanitizedElement = sanitizeSVG(element);
      
      switch (sanitizedElement.type) {
        case 'path':
          return <Path key={index} {...sanitizedElement.props} />;
        case 'circle':
          return <Circle key={index} {...sanitizedElement.props} />;
        case 'rect':
          return <Rect key={index} {...sanitizedElement.props} />;
        default:
          return null;
      }
    })}
    
    <SVGText x="50" y="95" fill={getEnergyColors('solar')} fontSize="8" textAnchor="middle">
      Energía Solar
    </SVGText>
    <SVGText x="25" y="85" fill={getEnergyColors('wind')} fontSize="6" textAnchor="middle">
      Viento
    </SVGText>
    <SVGText x="75" y="85" fill={getEnergyColors('hydro')} fontSize="6" textAnchor="middle">
      Hidro
    </SVGText>
  </Svg>
);
```

## 🎯 Casos de Uso

### **1. Iconos Personalizados**

```typescript
// Crear iconos SVG personalizados
const EnergyIcon: React.FC<{ type: 'solar' | 'wind' | 'hydro', size?: number }> = ({ type, size = 24 }) => {
  const { getEnergyColors } = useSVG();
  const color = getEnergyColors(type);
  
  const iconPaths = {
    solar: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
    wind: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
    hydro: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
  };
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d={iconPaths[type]} fill={color} />
    </Svg>
  );
};
```

### **2. Gráficos de Energía**

```typescript
// Gráfico de consumo de energía
const EnergyConsumptionChart: React.FC<{ data: number[] }> = ({ data }) => {
  const { getConsumptionColors, createPath } = useSVG();
  
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 80;
    return `${x},${y}`;
  }).join(' ');
  
  const pathData = `M ${points}`;
  
  return (
    <Svg width="100%" height="200" viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="consumptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={getConsumptionColors('low')} />
          <Stop offset="50%" stopColor={getConsumptionColors('medium')} />
          <Stop offset="100%" stopColor={getConsumptionColors('high')} />
        </LinearGradient>
      </Defs>
      
      <Path d={pathData} stroke="url(#consumptionGradient)" strokeWidth="2" fill="none" />
      <Path d={`${pathData} L 100,100 L 0,100 Z`} fill="url(#consumptionGradient)" opacity="0.3" />
    </Svg>
  );
};
```

### **3. Indicadores de Estado**

```typescript
// Indicador de estado circular
const StatusIndicator: React.FC<{ status: 'success' | 'warning' | 'error', value: number }> = ({ status, value }) => {
  const { getStatusColors, createCircle } = useSVG();
  const color = getStatusColors(status);
  
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#e0e0e0"
        strokeWidth="8"
        fill="none"
      />
      <Circle
        cx="50"
        cy="50"
        r={radius}
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <SVGText x="50" y="55" fill={color} fontSize="12" textAnchor="middle">
        {value}%
      </SVGText>
    </Svg>
  );
};
```

### **4. Animaciones SVG**

```typescript
// Animación de carga con SVG
const LoadingSpinner: React.FC = () => {
  const { getStatusColors, createAnimation } = useSVG();
  const color = getStatusColors('info');
  
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <Defs>
        <LinearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} />
          <Stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </LinearGradient>
      </Defs>
      
      <Circle
        cx="25"
        cy="25"
        r="20"
        stroke="url(#spinnerGradient)"
        strokeWidth="4"
        fill="none"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        strokeLinecap="round"
      >
        {/* Aquí irían las animaciones con react-native-reanimated */}
      </Circle>
    </Svg>
  );
};
```

## ✅ Mejores Prácticas

### **1. Optimización de Rendimiento**

```typescript
// ✅ Correcto - Usar memoización para elementos complejos
const ComplexSVG = React.memo(() => {
  const { createPath, createCircle } = useSVG();
  
  const elements = useMemo(() => [
    createPath('M10 10 L90 90', { stroke: '#007AFF' }),
    createCircle(50, 50, 30, { fill: '#34C759' }),
  ], [createPath, createCircle]);
  
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      {elements.map((element, index) => (
        <Path key={index} {...element.props} />
      ))}
    </Svg>
  );
});

// ❌ Incorrecto - Recrear elementos en cada render
const BadSVG = () => {
  const elements = [
    createPath('M10 10 L90 90', { stroke: '#007AFF' }),
    createCircle(50, 50, 30, { fill: '#34C759' }),
  ]; // Se recrea en cada render
};
```

### **2. Validación y Seguridad**

```typescript
// ✅ Correcto - Validar y sanitizar SVG
const SafeSVG: React.FC<{ svgData: SVGElement }> = ({ svgData }) => {
  const { validateSVG, sanitizeSVG } = useSVG();
  
  const isValid = validateSVG(svgData);
  const sanitizedData = sanitizeSVG(svgData);
  
  if (!isValid) {
    return <Text>SVG inválido</Text>;
  }
  
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      {/* Renderizar sanitizedData */}
    </Svg>
  );
};

// ❌ Incorrecto - Renderizar SVG sin validar
const UnsafeSVG: React.FC<{ svgData: SVGElement }> = ({ svgData }) => {
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      {/* Renderizar svgData directamente sin validar */}
    </Svg>
  );
};
```

### **3. Responsive Design**

```typescript
// ✅ Correcto - SVG responsivo
const ResponsiveSVG: React.FC = () => {
  const { calculateResponsiveDimensions } = useSVG();
  const { width: screenWidth } = Dimensions.get('window');
  
  const { width, height, scale } = calculateResponsiveDimensions(100, 100, screenWidth);
  
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100">
      {/* Contenido SVG */}
    </Svg>
  );
};

// ❌ Incorrecto - Tamaño fijo
const FixedSVG: React.FC = () => {
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      {/* Contenido SVG con tamaño fijo */}
    </Svg>
  );
};
```

### **4. Accesibilidad**

```typescript
// ✅ Correcto - SVG accesible
const AccessibleSVG: React.FC = () => {
  return (
    <Svg 
      width="100" 
      height="100" 
      viewBox="0 0 100 100"
      accessible={true}
      accessibilityLabel="Gráfico de consumo de energía"
      accessibilityHint="Muestra el consumo de energía en tiempo real"
    >
      <Circle cx="50" cy="50" r="40" fill="#007AFF" />
      <SVGText x="50" y="55" fill="white" fontSize="12" textAnchor="middle">
        Energía
      </SVGText>
    </Svg>
  );
};

// ❌ Incorrecto - SVG sin accesibilidad
const InaccessibleSVG: React.FC = () => {
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="40" fill="#007AFF" />
    </Svg>
  );
};
```

## 🔧 Solución de Problemas

### **1. SVG no se renderiza**

**Problema**: El SVG no aparece en la pantalla

**Solución**:
```typescript
// Verificar que el componente Svg esté importado correctamente
import Svg from 'react-native-svg';

// Asegurar que tenga dimensiones válidas
<Svg width="100" height="100" viewBox="0 0 100 100">
  <Circle cx="50" cy="50" r="40" fill="red" />
</Svg>
```

### **2. Elementos SVG no visibles**

**Problema**: Los elementos dentro del SVG no son visibles

**Solución**:
```typescript
// Verificar que los elementos tengan propiedades válidas
<Circle cx="50" cy="50" r="40" fill="red" stroke="black" strokeWidth="2" />

// Asegurar que el viewBox incluya todos los elementos
<Svg width="100" height="100" viewBox="0 0 100 100">
  {/* Elementos dentro del viewBox */}
</Svg>
```

### **3. Gradientes no funcionan**

**Problema**: Los gradientes no se aplican correctamente

**Solución**:
```typescript
// Definir gradientes en Defs
<Svg width="100" height="100" viewBox="0 0 100 100">
  <Defs>
    <LinearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <Stop offset="0%" stopColor="red" />
      <Stop offset="100%" stopColor="blue" />
    </LinearGradient>
  </Defs>
  
  <Circle cx="50" cy="50" r="40" fill="url(#myGradient)" />
</Svg>
```

### **4. Animaciones no funcionan**

**Problema**: Las animaciones SVG no se ejecutan

**Solución**:
```typescript
// Usar react-native-reanimated para animaciones
import Animated, { useSharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedSVG: React.FC = () => {
  const radius = useSharedValue(20);
  
  const animatedProps = useAnimatedProps(() => ({
    r: radius.value,
  }));
  
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      <AnimatedCircle cx="50" cy="50" fill="red" animatedProps={animatedProps} />
    </Svg>
  );
};
```

### **5. Rendimiento lento**

**Problema**: SVG complejos causan lentitud

**Solución**:
```typescript
// Optimizar con memoización y lazy loading
const OptimizedSVG = React.memo(() => {
  const elements = useMemo(() => {
    // Crear elementos solo cuando sea necesario
    return createComplexElements();
  }, []);
  
  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      {elements}
    </Svg>
  );
});

// Usar lazy loading para SVGs grandes
const LazySVG = React.lazy(() => import('./LargeSVG'));
```

### **6. Errores de TypeScript**

**Problema**: Errores de tipos en TypeScript

**Solución**:
```typescript
// Definir tipos personalizados
interface SVGElement {
  id: string;
  type: 'path' | 'circle' | 'rect' | 'line' | 'text' | 'g';
  props: Record<string, any>;
  children?: SVGElement[];
}

// Usar tipos en el hook
const createSVGElement = useCallback((
  type: SVGElement['type'],
  props: Record<string, any> = {},
  children?: SVGElement[]
): SVGElement => {
  // Implementación
}, []);
```

## 🎉 Conclusión

**React Native SVG** proporciona capacidades poderosas para crear gráficos vectoriales escalables en aplicaciones móviles. Con la configuración adecuada y las mejores prácticas, puedes crear experiencias visuales ricas y optimizadas.

### **✅ Beneficios del Sistema:**

- 🎨 **Gráficos vectoriales** sin pérdida de calidad
- 📱 **Rendimiento nativo** optimizado
- 🔧 **Configuración flexible** por plataforma
- 🎯 **Colores temáticos** específicos
- 🚀 **Animaciones integradas** con Reanimated
- 📊 **Gradientes y patrones** predefinidos
- ♿ **Accesibilidad completa** integrada
- 🔒 **Seguridad** con validación

### **🎮 Cómo Usar:**

1. **Ve a la pestaña "SVG"** en la aplicación
2. **Selecciona el tipo** de demostración
3. **Cambia el tamaño** del SVG
4. **Prueba las funciones** de exportación
5. **Experimenta** con diferentes elementos

El sistema está completamente configurado y listo para crear gráficos SVG avanzados. ¡React Native SVG está funcional y optimizado! 🚀
