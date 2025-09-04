# Sistema de Temas - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Configuración de Temas](#configuración-de-temas)
4. [Hooks de Temas](#hooks-de-temas)
5. [Componentes](#componentes)
6. [Integración](#integración)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

El sistema de temas de OpenEnergyCoop Mobile proporciona un control completo sobre la apariencia de la aplicación, permitiendo cambiar entre modo claro, oscuro y seguir las preferencias del sistema operativo.

### Características Principales

- ✅ **3 modos de tema**: Claro, Oscuro, Sistema
- ✅ **Cambio dinámico**: Transiciones suaves entre temas
- ✅ **Persistencia**: Guardado automático de preferencias
- ✅ **Colores específicos**: Paleta optimizada para energía
- ✅ **Tipografía**: Sistema de texto consistente
- ✅ **Sombras**: Efectos visuales adaptativos
- ✅ **Componentes**: Estilos predefinidos
- ✅ **Gradientes**: Efectos visuales avanzados

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos

```
src/
├── config/
│   └── theme.ts              # Configuración principal de temas
├── hooks/
│   └── useTheme.ts            # Hooks para gestión de temas
├── components/
│   ├── ThemeSelector.tsx      # Selector de tema
│   └── ThemeDemo.tsx          # Demostración de temas
└── stores/
    └── appStore.ts            # Estado global de temas
```

### Flujo de Datos

```
App Store → Theme Hook → Components → UI
     ↓           ↓           ↓       ↓
Persistencia → React Native → Styles → Render
```

## ⚙️ Configuración de Temas

### 1. Configuración Básica

```typescript
// src/config/theme.ts
import { Dimensions } from 'react-native';

// Tipos para temas
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

// Colores base del sistema
const colors = {
  primary: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  // ... más colores
};

// Crear tema completo
export const createTheme = (colorScheme: ColorScheme) => {
  return {
    mode: colorScheme,
    colors: getThemeColors(colorScheme),
    shadows: getThemeShadows(colorScheme),
    spacing,
    borderRadius,
    typography,
    dimensions: { width, height },
  };
};
```

### 2. Paleta de Colores

#### Colores Principales
- **Primary**: Azul principal (#007AFF / #0A84FF)
- **Secondary**: Púrpura secundario (#5856D6 / #5E5CE6)
- **Accent**: Naranja de acento (#FF9500 / #FF9F0A)

#### Colores de Estado
- **Success**: Verde de éxito (#34C759 / #30D158)
- **Warning**: Naranja de advertencia (#FF9500 / #FF9F0A)
- **Error**: Rojo de error (#FF3B30 / #FF453A)
- **Info**: Azul de información (#007AFF / #0A84FF)

#### Colores de Energía
- **Solar**: Amarillo dorado (#FFD700)
- **Wind**: Azul cielo (#87CEEB)
- **Hydro**: Azul marino (#4169E1)
- **Battery**: Verde lima (#32CD32)
- **Grid**: Rojo coral (#FF6347)

### 3. Tipografía

```typescript
const typography = {
  sizes: {
    xs: 12,    // Caption
    sm: 14,    // Body small
    md: 16,    // Body
    lg: 18,    // H3
    xl: 20,    // H2
    xxl: 24,   // H1
    xxxl: 32,  // Display
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};
```

### 4. Espaciado y Bordes

```typescript
const spacing = {
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  xxl: 48, // 48px
};

const borderRadius = {
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 12,   // 12px
  lg: 16,   // 16px
  xl: 24,   // 24px
  full: 9999, // Circular
};
```

## 🎣 Hooks de Temas

### 1. Hook Principal: useTheme

```typescript
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const {
    theme,           // Tema completo
    themeMode,       // Modo actual ('light' | 'dark' | 'system')
    effectiveMode,   // Modo efectivo ('light' | 'dark')
    changeThemeMode, // Función para cambiar modo
    toggleTheme,     // Función para alternar
    isDarkMode,      // Función para verificar modo oscuro
    isLightMode,     // Función para verificar modo claro
    getColor,        // Función para obtener color
    getShadow,       // Función para obtener sombra
  } = useTheme();

  return (
    <View style={{ backgroundColor: getColor('background') }}>
      <Text style={{ color: getColor('text') }}>
        Modo actual: {themeMode}
      </Text>
    </View>
  );
};
```

### 2. Hook de Colores de Energía

```typescript
import { useEnergyColors } from '../hooks/useTheme';

const EnergyComponent = () => {
  const energyColors = useEnergyColors();
  
  return (
    <View>
      <Icon name="sun" color={energyColors.solar} />
      <Icon name="wind" color={energyColors.wind} />
      <Icon name="battery" color={energyColors.battery} />
    </View>
  );
};
```

### 3. Hook de Gradientes

```typescript
import { useGradients } from '../hooks/useTheme';

const GradientComponent = () => {
  const gradients = useGradients();
  
  return (
    <View style={{ backgroundColor: gradients.primary[0] }}>
      <Text>Gradiente Primario</Text>
    </View>
  );
};
```

### 4. Hook de Estilos de Texto

```typescript
import { useTextStyles } from '../hooks/useTheme';

const TextComponent = () => {
  const textStyles = useTextStyles();
  
  return (
    <View>
      <Text style={textStyles.h1}>Título Principal</Text>
      <Text style={textStyles.body}>Texto de cuerpo</Text>
      <Text style={textStyles.caption}>Texto pequeño</Text>
    </View>
  );
};
```

### 5. Hook de Estilos de Componentes

```typescript
import { useComponentStyles } from '../hooks/useTheme';

const ComponentExample = () => {
  const componentStyles = useComponentStyles();
  
  return (
    <View>
      <View style={componentStyles.card}>
        <Text>Contenido de la tarjeta</Text>
      </View>
      <View style={componentStyles.divider} />
    </View>
  );
};
```

## 🧩 Componentes

### 1. ThemeSelector

Componente para seleccionar y cambiar el tema:

```typescript
import ThemeSelector from '../components/ThemeSelector';

const SettingsScreen = () => {
  return (
    <ScrollView>
      <ThemeSelector />
    </ScrollView>
  );
};
```

**Características:**
- ✅ Selección de modo (Claro/Oscuro/Sistema)
- ✅ Cambio rápido con botón toggle
- ✅ Vista previa de colores
- ✅ Información del tema actual

### 2. ThemeDemo

Componente de demostración para mostrar todas las capacidades:

```typescript
import ThemeDemo from '../components/ThemeDemo';

const DemoScreen = () => {
  return <ThemeDemo />;
};
```

**Secciones incluidas:**
- ✅ Información del tema
- ✅ Paleta de colores
- ✅ Colores de energía
- ✅ Gradientes
- ✅ Tipografía
- ✅ Componentes
- ✅ Sombras

## 🔗 Integración

### 1. Integración con App.tsx

```typescript
// App.tsx
import { useLoadTheme } from './src/hooks/useTheme';

function App() {
  const { isLoading } = useLoadTheme();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <QueryProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </QueryProvider>
  );
}
```

### 2. Integración con Navegación

```typescript
// src/navigation/AppNavigator.tsx
import { useTheme } from '../hooks/useTheme';

const AppNavigator = () => {
  const { getColor } = useTheme();
  
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: getColor('primary'),
          background: getColor('background'),
          card: getColor('card'),
          text: getColor('text'),
          border: getColor('border'),
          notification: getColor('accent'),
        },
      }}
    >
      <MainTabNavigator />
    </NavigationContainer>
  );
};
```

### 3. Integración con React Native Paper

```typescript
// src/providers/PaperProvider.tsx
import { useTheme } from '../hooks/useTheme';

export const PaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getColor, isDarkMode } = useTheme();
  
  const paperTheme = {
    dark: isDarkMode(),
    colors: {
      primary: getColor('primary'),
      accent: getColor('accent'),
      background: getColor('background'),
      surface: getColor('surface'),
      error: getColor('error'),
      text: getColor('text'),
      onSurface: getColor('text'),
      disabled: getColor('textTertiary'),
      placeholder: getColor('textSecondary'),
      backdrop: getColor('background') + '80',
    },
  };
  
  return (
    <Provider theme={paperTheme}>
      {children}
    </Provider>
  );
};
```

### 4. Integración con Lucide Icons

```typescript
// Componente con iconos temáticos
const IconComponent = () => {
  const { getColor } = useTheme();
  
  return (
    <View>
      <Icon 
        name="home" 
        size={24} 
        color={getColor('primary')} 
      />
      <Icon 
        name="settings" 
        size={20} 
        color={getColor('textSecondary')} 
      />
    </View>
  );
};
```

## ✅ Mejores Prácticas

### 1. Uso de Colores

```typescript
// ✅ Correcto - Usar getColor con fallback
const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor('background', '#FFFFFF'),
    borderColor: getColor('border', '#E5E7EB'),
  },
});

// ❌ Incorrecto - Colores hardcodeados
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
});
```

### 2. Uso de Sombras

```typescript
// ✅ Correcto - Usar getShadow
const styles = StyleSheet.create({
  card: {
    ...getShadow('medium'),
  },
});

// ❌ Incorrecto - Sombras hardcodeadas
const styles = StyleSheet.create({
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
```

### 3. Uso de Tipografía

```typescript
// ✅ Correcto - Usar textStyles
const styles = StyleSheet.create({
  title: {
    ...textStyles.h1,
  },
  body: {
    ...textStyles.body,
  },
});

// ❌ Incorrecto - Estilos hardcodeados
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});
```

### 4. Uso de Espaciado

```typescript
// ✅ Correcto - Usar theme.spacing
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
});

// ❌ Incorrecto - Valores hardcodeados
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
  },
});
```

### 5. Uso de Bordes

```typescript
// ✅ Correcto - Usar theme.borderRadius
const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.md,
  },
  button: {
    borderRadius: theme.borderRadius.full,
  },
});

// ❌ Incorrecto - Valores hardcodeados
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  button: {
    borderRadius: 9999,
  },
});
```

## 🔧 Solución de Problemas

### 1. Tema no se aplica

**Problema:** Los cambios de tema no se reflejan en la UI

**Solución:**
```typescript
// Verificar que el hook se está usando correctamente
const { theme, getColor } = useTheme();

// Asegurar que los estilos se actualizan
const styles = StyleSheet.create({
  container: {
    backgroundColor: getColor('background'),
  },
});
```

### 2. Colores no cambian

**Problema:** Los colores permanecen fijos

**Solución:**
```typescript
// Usar getColor en lugar de colores hardcodeados
const styles = StyleSheet.create({
  text: {
    color: getColor('text'), // ✅ Correcto
    // color: '#000000',    // ❌ Incorrecto
  },
});
```

### 3. Transiciones no suaves

**Problema:** Los cambios de tema son abruptos

**Solución:**
```typescript
// Usar Animated para transiciones suaves
import { Animated } from 'react-native';

const [fadeAnim] = useState(new Animated.Value(1));

const animateThemeChange = () => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 150,
    useNativeDriver: true,
  }).start(() => {
    changeThemeMode(newMode);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  });
};
```

### 4. Persistencia no funciona

**Problema:** Las preferencias de tema no se guardan

**Solución:**
```typescript
// Verificar que useLoadTheme se está usando en App.tsx
import { useLoadTheme } from './src/hooks/useTheme';

function App() {
  const { isLoading } = useLoadTheme();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return <AppContent />;
}
```

### 5. Performance lenta

**Problema:** La aplicación se vuelve lenta con cambios de tema

**Solución:**
```typescript
// Usar useMemo para estilos costosos
const styles = useMemo(() => StyleSheet.create({
  container: {
    backgroundColor: getColor('background'),
    // ... otros estilos
  },
}), [getColor]);

// Usar React.memo para componentes que no necesitan re-renderizar
const ThemedComponent = React.memo(({ children }) => {
  const { getColor } = useTheme();
  
  return (
    <View style={{ backgroundColor: getColor('background') }}>
      {children}
    </View>
  );
});
```

## 📚 Ejemplos de Uso

### 1. Componente Básico

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const BasicComponent = () => {
  const { getColor, theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: getColor('background'),
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
    },
    title: {
      color: getColor('text'),
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
    },
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Título del Componente</Text>
    </View>
  );
};
```

### 2. Componente con Iconos

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../config/lucide';
import { useTheme } from '../hooks/useTheme';

const IconButton = ({ icon, label, onPress }) => {
  const { getColor, theme } = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: getColor('primary'),
      borderRadius: theme.borderRadius.md,
    },
    icon: {
      marginRight: theme.spacing.sm,
    },
    label: {
      color: '#FFFFFF',
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
    },
  });
  
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={20} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};
```

### 3. Componente de Lista

```typescript
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const ThemedList = ({ data }) => {
  const { getColor, theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: getColor('background'),
    },
    item: {
      backgroundColor: getColor('card'),
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    title: {
      color: getColor('text'),
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
    },
    subtitle: {
      color: getColor('textSecondary'),
      fontSize: theme.typography.sizes.sm,
    },
  });
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
  
  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
```

## 🎉 Conclusión

El sistema de temas de OpenEnergyCoop Mobile proporciona:

- ✅ **Control completo** sobre la apariencia de la aplicación
- ✅ **Experiencia consistente** en todos los componentes
- ✅ **Performance optimizada** con hooks especializados
- ✅ **Fácil integración** con todos los sistemas existentes
- ✅ **Documentación completa** para desarrolladores
- ✅ **Componentes de demostración** para testing
- ✅ **Mejores prácticas** implementadas
- ✅ **Solución de problemas** documentada

El sistema está diseñado para ser escalable, mantenible y fácil de usar, proporcionando una base sólida para el diseño visual de la aplicación. 🌟
