# NativeWind - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Integración con Temas](#integración-con-temas)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Clases CSS](#clases-css)
6. [Componentes](#componentes)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

NativeWind permite usar clases de Tailwind CSS directamente en React Native, proporcionando un sistema de estilos consistente y fácil de usar que se integra perfectamente con nuestro sistema de temas.

### Características Principales

- ✅ **Tailwind CSS**: Clases CSS completas en React Native
- ✅ **Temas Dinámicos**: Integración automática con sistema de temas
- ✅ **Performance**: Optimizado para React Native
- ✅ **TypeScript**: Soporte completo de tipos
- ✅ **Hooks Personalizados**: Utilidades para temas dinámicos
- ✅ **Componentes Predefinidos**: Clases temáticas listas para usar

## ⚙️ Instalación y Configuración

### 1. Dependencias Instaladas

```bash
npm install nativewind
npm install --save-dev tailwindcss
```

### 2. Configuración de Tailwind

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.js"
  ],
  theme: {
    extend: {
      // Colores del sistema de temas
      colors: {
        primary: {
          light: '#007AFF',
          dark: '#0A84FF',
          DEFAULT: '#007AFF',
        },
        // ... más colores
      },
      // Espaciado personalizado
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      // Bordes personalizados
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  presets: [require('nativewind/preset')],
}
```

### 3. Configuración de Babel

```javascript
// babel.config.js
module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'nativewind/preset',
  ],
};
```

### 4. Estilos CSS Globales

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Componentes personalizados */
@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded-md shadow-medium;
  }
  
  .card {
    @apply bg-card rounded-md p-4 shadow-medium;
  }
  
  .text-primary {
    @apply text-text font-medium;
  }
}
```

## 🎨 Integración con Temas

### 1. Hook Principal: useNativeWind

```typescript
import { useNativeWind } from '../hooks/useNativeWind';

const MyComponent = () => {
  const { 
    themedClasses, 
    getThemedClasses, 
    getEnergyClasses,
    getStateClasses 
  } = useNativeWind();

  return (
    <View className={themedClasses.container}>
      <Text className={themedClasses.textPrimary}>
        Texto temático
      </Text>
      <TouchableOpacity className={themedClasses.btnPrimary}>
        <Text className="text-white">Botón temático</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 2. Clases Temáticas Predefinidas

```typescript
const themedClasses = {
  // Contenedores
  container: 'bg-background flex-1',
  surface: 'bg-surface',
  card: 'bg-card rounded-md p-4 shadow-medium',
  cardElevated: 'bg-card rounded-md p-4 shadow-large',
  
  // Textos
  textPrimary: 'text-text font-medium',
  textSecondary: 'text-text-secondary text-sm',
  textTertiary: 'text-text-tertiary text-xs',
  
  // Botones
  btnPrimary: 'bg-primary text-white px-4 py-2 rounded-md shadow-medium',
  btnSecondary: 'bg-surface border border-border text-text px-4 py-2 rounded-md',
  btnAccent: 'bg-accent text-white px-4 py-2 rounded-md shadow-small',
  
  // Estados
  stateSuccess: 'bg-success text-white',
  stateWarning: 'bg-warning text-white',
  stateError: 'bg-error text-white',
  stateInfo: 'bg-info text-white',
  
  // Energía
  energySolar: 'bg-energy-solar',
  energyWind: 'bg-energy-wind',
  energyHydro: 'bg-energy-hydro',
  energyBattery: 'bg-energy-battery',
  energyGrid: 'bg-energy-grid',
};
```

## 🎣 Hooks Personalizados

### 1. useConditionalClasses

```typescript
import { useConditionalClasses } from '../hooks/useNativeWind';

const MyComponent = () => {
  const { conditionalClasses } = useConditionalClasses();
  
  return (
    <View className={conditionalClasses(
      'bg-white border-gray-200',
      'bg-gray-800 border-gray-700'
    ) + ' p-4 rounded-md border'}>
      <Text className={conditionalClasses(
        'text-black',
        'text-white'
      ) + ' font-medium'}>
        Contenido condicional
      </Text>
    </View>
  );
};
```

### 2. useThemedStyles

```typescript
import { useThemedStyles } from '../hooks/useNativeWind';

const MyComponent = () => {
  const { createStyle, createCardStyle, createButtonStyle } = useThemedStyles();
  
  return (
    <View style={createCardStyle()}>
      <Text style={createStyle({ fontSize: 16 })}>
        Estilo temático
      </Text>
      <TouchableOpacity style={createButtonStyle('primary')}>
        <Text>Botón temático</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 🎨 Clases CSS

### 1. Clases Básicas

```typescript
// Layout
<View className="flex-1 bg-background">
<View className="flex-row items-center justify-between">
<View className="p-4 m-2 rounded-md">

// Texto
<Text className="text-text font-bold text-lg">
<Text className="text-text-secondary text-sm">
<Text className="text-center font-medium">

// Espaciado
<View className="p-4 m-2">
<View className="px-6 py-3">
<View className="space-y-4">
```

### 2. Clases Temáticas

```typescript
// Contenedores temáticos
<View className={themedClasses.container}>
<View className={themedClasses.surface}>
<View className={themedClasses.card}>

// Textos temáticos
<Text className={themedClasses.textPrimary}>
<Text className={themedClasses.textSecondary}>
<Text className={themedClasses.textTertiary}>

// Botones temáticos
<TouchableOpacity className={themedClasses.btnPrimary}>
<TouchableOpacity className={themedClasses.btnSecondary}>
<TouchableOpacity className={themedClasses.btnAccent}>
```

### 3. Clases de Estado

```typescript
// Estados temáticos
<View className={themedClasses.stateSuccess}>
<View className={themedClasses.stateWarning}>
<View className={themedClasses.stateError}>
<View className={themedClasses.stateInfo}>

// Estados de energía
<View className={themedClasses.energySolar}>
<View className={themedClasses.energyWind}>
<View className={themedClasses.energyHydro}>
<View className={themedClasses.energyBattery}>
<View className={themedClasses.energyGrid}>
```

### 4. Clases Condicionales

```typescript
// Clases que cambian según el tema
<View className={conditionalClasses(
  'bg-white text-black',
  'bg-black text-white'
)}>

<Text className={conditionalClasses(
  'text-gray-800',
  'text-gray-200'
)}>
```

## 🧩 Componentes

### 1. NativeWindDemo

Componente de demostración completo:

```typescript
import NativeWindDemo from '../components/NativeWindDemo';

const DemoScreen = () => {
  return <NativeWindDemo />;
};
```

**Secciones incluidas:**
- ✅ Cambio de tema
- ✅ Clases temáticas básicas
- ✅ Botones temáticos
- ✅ Estados temáticos
- ✅ Colores de energía
- ✅ Tamaños y espaciado
- ✅ Sombras
- ✅ Formularios
- ✅ Clases condicionales
- ✅ Grid y layout
- ✅ Utilidades avanzadas

### 2. Ejemplos de Uso

#### Componente Básico

```typescript
const BasicComponent = () => {
  const { themedClasses } = useNativeWind();
  
  return (
    <View className={themedClasses.container}>
      <View className={themedClasses.card}>
        <Text className={themedClasses.textPrimary}>
          Título del componente
        </Text>
        <Text className={themedClasses.textSecondary}>
          Descripción del componente
        </Text>
        <TouchableOpacity className={themedClasses.btnPrimary}>
          <Text className="text-white font-medium">
            Acción
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
```

#### Componente con Estados

```typescript
const StateComponent = ({ state }: { state: 'success' | 'warning' | 'error' }) => {
  const { getStateClasses } = useNativeWind();
  
  return (
    <View className={getStateClasses(state) + ' p-3 rounded-md'}>
      <Text className="text-white font-medium">
        Estado: {state}
      </Text>
    </View>
  );
};
```

#### Componente de Energía

```typescript
const EnergyComponent = ({ type }: { type: 'solar' | 'wind' | 'hydro' }) => {
  const { getEnergyClasses } = useNativeWind();
  
  return (
    <View className={getEnergyClasses(type) + ' p-3 rounded-md'}>
      <Text className="font-medium">
        Energía {type}
      </Text>
    </View>
  );
};
```

## ✅ Mejores Prácticas

### 1. Uso de Clases Temáticas

```typescript
// ✅ Correcto - Usar clases temáticas
<View className={themedClasses.card}>
<Text className={themedClasses.textPrimary}>

// ❌ Incorrecto - Clases hardcodeadas
<View className="bg-white p-4 rounded-md">
<Text className="text-black font-medium">
```

### 2. Clases Condicionales

```typescript
// ✅ Correcto - Clases condicionales
<View className={conditionalClasses(
  'bg-white',
  'bg-black'
)}>

// ❌ Incorrecto - Lógica condicional manual
<View className={isDarkMode ? 'bg-black' : 'bg-white'}>
```

### 3. Organización de Clases

```typescript
// ✅ Correcto - Clases organizadas
<View className={`
  ${themedClasses.card}
  ${getSizeClasses('md')}
  ${getShadowClasses('medium')}
`}>

// ❌ Incorrecto - Clases desordenadas
<View className="bg-card rounded-md p-4 shadow-medium text-text">
```

### 4. Reutilización de Componentes

```typescript
// ✅ Correcto - Componente reutilizable
const ThemedCard = ({ children, elevated = false }) => {
  const { themedClasses } = useNativeWind();
  
  return (
    <View className={elevated ? themedClasses.cardElevated : themedClasses.card}>
      {children}
    </View>
  );
};

// ❌ Incorrecto - Repetición de código
<View className="bg-card rounded-md p-4 shadow-medium">
<View className="bg-card rounded-md p-4 shadow-medium">
<View className="bg-card rounded-md p-4 shadow-medium">
```

### 5. Performance

```typescript
// ✅ Correcto - Usar useMemo para clases costosas
const { themedClasses } = useNativeWind();
const cardClasses = useMemo(() => 
  `${themedClasses.card} ${getShadowClasses('large')}`, 
  [themedClasses.card, getShadowClasses]
);

// ❌ Incorrecto - Recalcular en cada render
const cardClasses = `${themedClasses.card} ${getShadowClasses('large')}`;
```

## 🔧 Solución de Problemas

### 1. Clases no se aplican

**Problema:** Las clases de NativeWind no se están aplicando

**Solución:**
```bash
# Verificar configuración de Babel
# babel.config.js debe incluir 'nativewind/preset'

# Verificar importación de CSS
# App.tsx debe importar './src/styles/global.css'

# Limpiar cache
npx react-native start --reset-cache
```

### 2. Temas no cambian

**Problema:** Las clases temáticas no cambian con el tema

**Solución:**
```typescript
// Verificar que se está usando useNativeWind
const { themedClasses } = useNativeWind();

// Usar clases temáticas en lugar de hardcodeadas
<View className={themedClasses.card}>
// En lugar de
<View className="bg-white p-4 rounded-md">
```

### 3. Performance lenta

**Problema:** La aplicación se vuelve lenta con muchas clases

**Solución:**
```typescript
// Usar useMemo para clases costosas
const cardClasses = useMemo(() => 
  `${themedClasses.card} ${getShadowClasses('large')}`, 
  [themedClasses.card, getShadowClasses]
);

// Usar React.memo para componentes
const ThemedComponent = React.memo(({ children }) => {
  const { themedClasses } = useNativeWind();
  
  return (
    <View className={themedClasses.container}>
      {children}
    </View>
  );
});
```

### 4. TypeScript errors

**Problema:** Errores de TypeScript con clases

**Solución:**
```typescript
// Agregar tipos para className
interface ThemedViewProps {
  className?: string;
  children: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({ className, children }) => {
  const { themedClasses } = useNativeWind();
  
  return (
    <View className={`${themedClasses.container} ${className || ''}`}>
      {children}
    </View>
  );
};
```

### 5. Clases no reconocidas

**Problema:** Tailwind no reconoce clases personalizadas

**Solución:**
```javascript
// Verificar content en tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.js"
  ],
  // ...
};
```

## 📚 Ejemplos de Uso

### 1. Lista Temática

```typescript
const ThemedList = ({ items }: { items: string[] }) => {
  const { themedClasses } = useNativeWind();
  
  return (
    <View className={themedClasses.container}>
      {items.map((item, index) => (
        <View key={index} className={themedClasses.card + ' mb-2'}>
          <Text className={themedClasses.textPrimary}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
```

### 2. Formulario Temático

```typescript
const ThemedForm = () => {
  const { themedClasses } = useNativeWind();
  const [value, setValue] = useState('');
  
  return (
    <View className={themedClasses.container}>
      <View className={themedClasses.card}>
        <Text className={themedClasses.textPrimary}>Formulario</Text>
        
        <TextInput
          value={value}
          onChangeText={setValue}
          className={themedClasses.input}
          placeholder="Escribe algo..."
        />
        
        <TouchableOpacity className={themedClasses.btnPrimary + ' mt-4'}>
          <Text className="text-white font-medium text-center">
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
```

### 3. Dashboard de Energía

```typescript
const EnergyDashboard = () => {
  const { themedClasses, getEnergyClasses } = useNativeWind();
  
  const energyData = [
    { type: 'solar', value: '2.4 kW', icon: 'sun' },
    { type: 'wind', value: '1.8 kW', icon: 'wind' },
    { type: 'battery', value: '85%', icon: 'battery' },
  ];
  
  return (
    <View className={themedClasses.container}>
      <Text className={themedClasses.textPrimary + ' text-xl font-bold mb-4'}>
        Dashboard de Energía
      </Text>
      
      {energyData.map((item, index) => (
        <View key={index} className={getEnergyClasses(item.type as any) + ' p-4 rounded-md mb-3'}>
          <View className="flex-row items-center">
            <Icon name={item.icon as any} size={24} color="#000000" className="mr-3" />
            <View>
              <Text className="font-medium">{item.type.toUpperCase()}</Text>
              <Text className="text-sm">{item.value}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
```

## 🎉 Conclusión

NativeWind proporciona:

- ✅ **Sistema de estilos consistente** con Tailwind CSS
- ✅ **Integración perfecta** con el sistema de temas
- ✅ **Performance optimizada** para React Native
- ✅ **Hooks personalizados** para temas dinámicos
- ✅ **Componentes predefinidos** listos para usar
- ✅ **TypeScript completo** con tipos seguros
- ✅ **Documentación detallada** para desarrolladores

El sistema está completamente integrado y listo para usar, proporcionando una experiencia de desarrollo moderna y eficiente. 🚀

