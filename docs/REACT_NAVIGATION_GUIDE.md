# React Navigation - Guía Completa

## 📋 Tabla de Contenidos

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Tipos de Navegación](#tipos-de-navegación)
4. [Estructura de Archivos](#estructura-de-archivos)
5. [Uso Básico](#uso-básico)
6. [Hooks Personalizados](#hooks-personalizados)
7. [Navegación Avanzada](#navegación-avanzada)
8. [Integración con Estado](#integración-con-estado)
9. [Mejores Prácticas](#mejores-prácticas)
10. [Solución de Problemas](#solución-de-problemas)

## 🚀 Instalación

### Paquetes Instalados

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer
npm install react-native-screens react-native-safe-area-context
```

### Dependencias Principales

- **@react-navigation/native**: Núcleo de React Navigation
- **@react-navigation/native-stack**: Navegación tipo stack nativa
- **@react-navigation/bottom-tabs**: Navegación por pestañas inferiores
- **@react-navigation/drawer**: Navegación tipo drawer
- **react-native-screens**: Optimización de rendimiento
- **react-native-safe-area-context**: Manejo de áreas seguras

## ⚙️ Configuración

### 1. Configuración en App.tsx

```typescript
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <QueryProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryProvider>
  );
}
```

### 2. Tipos de Navegación

```typescript
// src/types/navigation.ts
export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: undefined;
  Splash: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Energy: undefined;
  Profile: undefined;
  Settings: undefined;
};
```

## 🧭 Tipos de Navegación

### 1. Stack Navigator

```typescript
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen name="Auth" component={AuthStack} />
  </Stack.Navigator>
);
```

### 2. Tab Navigator

```typescript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'home';
        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'homeOutline';
            break;
          case 'Dashboard':
            iconName = focused ? 'chart' : 'analytics';
            break;
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
  </Tab.Navigator>
);
```

### 3. Drawer Navigator

```typescript
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
);
```

## 📁 Estructura de Archivos

```
src/
├── navigation/
│   ├── AppNavigator.tsx          # Navegador principal
│   ├── AuthNavigator.tsx         # Navegador de autenticación
│   └── MainNavigator.tsx         # Navegador principal
├── screens/
│   ├── HomeScreen.tsx            # Pantalla de inicio
│   ├── DashboardScreen.tsx       # Pantalla de dashboard
│   ├── EnergyScreen.tsx          # Pantalla de energía
│   ├── ProfileScreen.tsx         # Pantalla de perfil
│   └── SettingsScreen.tsx        # Pantalla de configuración
├── hooks/
│   └── useNavigation.ts          # Hooks de navegación
└── types/
    └── navigation.ts             # Tipos de navegación
```

## 🎯 Uso Básico

### 1. Navegación Simple

```typescript
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <Button onPress={handlePress}>
      Ir al Dashboard
    </Button>
  );
};
```

### 2. Navegación con Parámetros

```typescript
const MyScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('EnergyDetails', {
      id: '123',
      title: 'Detalles de Energía',
    });
  };

  return (
    <Button onPress={handlePress}>
      Ver Detalles
    </Button>
  );
};
```

### 3. Obtener Parámetros

```typescript
import { useRoute } from '@react-navigation/native';

const EnergyDetailsScreen = () => {
  const route = useRoute();
  const { id, title } = route.params;

  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Título: {title}</Text>
    </View>
  );
};
```

## 🪝 Hooks Personalizados

### 1. Hook Principal

```typescript
// src/hooks/useNavigation.ts
export const useNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigate = useCallback((routeName: AppRoutes, params?: NavigationParams) => {
    navigation.navigate(routeName as never, params as never);
    addNavigationHistory(routeName, params);
  }, [navigation, addNavigationHistory]);

  return {
    navigate,
    push,
    replace,
    goBack,
    reset,
    canGoBack: navigation.canGoBack(),
  };
};
```

### 2. Hook para Parámetros

```typescript
export const useRouteParams = <T = any>() => {
  const route = useRoute();
  return route.params as T;
};
```

### 3. Hook para Navegación por Pestañas

```typescript
export const useTabNavigation = () => {
  const navigation = useRNNavigation();
  const { addNavigationHistory } = useAppStore();

  const navigateToTab = useCallback((tabName: string, params?: NavigationParams) => {
    navigation.navigate(tabName as never, params as never);
    addNavigationHistory(tabName as AppRoutes, params);
  }, [navigation, addNavigationHistory]);

  return { navigateToTab };
};
```

## 🚀 Navegación Avanzada

### 1. Navegación con Animaciones

```typescript
export const useAnimatedNavigation = () => {
  const navigation = useRNNavigation();

  const navigateWithAnimation = useCallback((
    routeName: AppRoutes, 
    params?: NavigationParams,
    animation?: 'slide' | 'fade' | 'none'
  ) => {
    navigation.navigate(routeName as never, params as never);
  }, [navigation]);

  return { navigateWithAnimation };
};
```

### 2. Navegación con Confirmación

```typescript
export const useConfirmNavigation = () => {
  const navigation = useRNNavigation();

  const navigateWithConfirmation = useCallback((
    routeName: AppRoutes,
    params?: NavigationParams,
    confirmMessage?: string
  ) => {
    if (confirmMessage) {
      Alert.alert('Confirmar', confirmMessage, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => navigation.navigate(routeName as never, params as never) },
      ]);
    } else {
      navigation.navigate(routeName as never, params as never);
    }
  }, [navigation]);

  return { navigateWithConfirmation };
};
```

### 3. Navegación con Persistencia

```typescript
export const usePersistentNavigation = () => {
  const navigation = useRNNavigation();
  const { saveNavigationState } = useAppStore();

  const navigateAndPersist = useCallback(async (
    routeName: AppRoutes,
    params?: NavigationParams
  ) => {
    navigation.navigate(routeName as never, params as never);
    await saveNavigationState();
  }, [navigation, saveNavigationState]);

  return { navigateAndPersist };
};
```

## 🔄 Integración con Estado

### 1. Store de Navegación

```typescript
// src/stores/appStore.ts
interface AppStore {
  // Estado de navegación
  navigationHistory: NavigationHistoryItem[];
  currentRoute: string;
  previousRoute?: string;
  navigationMetrics: NavigationMetrics;
  navigationLoading: NavigationLoadingState;

  // Acciones de navegación
  addNavigationHistory: (routeName: string, params?: any) => void;
  clearNavigationHistory: () => void;
  setCurrentRoute: (route: string) => void;
  setPreviousRoute: (route: string) => void;
  addNavigationMetric: (metric: Partial<NavigationMetrics>) => void;
  setNavigationLoading: (loading: boolean, message?: string) => void;
  isRouteAccessible: (routeName: string) => boolean;
}
```

### 2. Persistencia de Estado

```typescript
const saveNavigationState = async () => {
  try {
    const { navigationHistory, currentRoute, navigationMetrics } = get();
    await storageService.setItem(STORAGE_KEYS.NAVIGATION_HISTORY, navigationHistory);
    await storageService.setItem(STORAGE_KEYS.CURRENT_ROUTE, currentRoute);
    await storageService.setItem(STORAGE_KEYS.NAVIGATION_METRICS, navigationMetrics);
  } catch (error) {
    console.error('Error saving navigation state:', error);
  }
};
```

## 📱 Pantallas de Ejemplo

### 1. HomeScreen

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '../config/icons';
import { useAppStore } from '../stores/appStore';

const HomeScreen: React.FC = () => {
  const { currentTheme, setTheme } = useAppStore();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Bienvenido a OpenEnergyCoop
        </Title>
        
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">¡Hola! 👋</Title>
            <Paragraph>
              Estás en la pantalla de inicio. Desde aquí puedes acceder a todas las funcionalidades.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
```

### 2. DashboardScreen

```typescript
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '../config/icons';

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Dashboard
        </Title>
        
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Resumen del Día</Title>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text>Consumo Total:</Text>
                <Text className="font-bold text-red-500">15.2 kWh</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text>Producción Solar:</Text>
                <Text className="font-bold text-green-500">12.8 kWh</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
```

## ✅ Mejores Prácticas

### 1. Organización de Archivos

- **Separar navegadores**: Crear navegadores específicos para cada flujo
- **Pantallas modulares**: Cada pantalla debe ser independiente
- **Tipos centralizados**: Definir todos los tipos en un archivo

### 2. Navegación

- **Usar hooks personalizados**: Encapsular lógica de navegación
- **Validar parámetros**: Verificar que los parámetros sean correctos
- **Manejar errores**: Implementar manejo de errores en navegación

### 3. Rendimiento

- **Lazy loading**: Cargar pantallas solo cuando sea necesario
- **Memoización**: Usar React.memo para componentes de pantalla
- **Optimización de imágenes**: Optimizar iconos y recursos

### 4. Accesibilidad

- **Labels descriptivos**: Usar labels claros para elementos de navegación
- **Navegación por teclado**: Soportar navegación por teclado
- **Contraste adecuado**: Asegurar contraste suficiente en elementos

## 🔧 Solución de Problemas

### 1. Errores Comunes

#### Error: "Module '@react-navigation/native' has no exported member 'useNavigation'"

**Solución:**
```typescript
// Asegúrate de que el componente esté dentro de NavigationContainer
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
```

#### Error: "Type 'never' is not assignable to parameter of type"

**Solución:**
```typescript
// Usar type assertion
navigation.navigate(routeName as never, params as never);
```

#### Error: "Screen is not a navigator"

**Solución:**
```typescript
// Asegúrate de que el componente esté registrado correctamente
<Stack.Screen name="Home" component={HomeScreen} />
```

### 2. Debugging

#### Habilitar Debug Mode

```typescript
<NavigationContainer
  onStateChange={(state) => {
    console.log('Navigation state:', state);
  }}
>
  <AppNavigator />
</NavigationContainer>
```

#### Logging de Navegación

```typescript
const navigation = useNavigation();

useEffect(() => {
  const unsubscribe = navigation.addListener('state', (e) => {
    console.log('Navigation state changed:', e.data);
  });

  return unsubscribe;
}, [navigation]);
```

### 3. Optimización

#### Lazy Loading

```typescript
const HomeScreen = React.lazy(() => import('../screens/HomeScreen'));

<Stack.Screen 
  name="Home" 
  component={HomeScreen}
  options={{
    lazy: true,
  }}
/>
```

#### Memoización

```typescript
const HomeScreen = React.memo(() => {
  // Componente optimizado
});

export default HomeScreen;
```

## 📚 Recursos Adicionales

### Documentación Oficial

- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Guide](https://reactnavigation.org/docs/typescript/)
- [Performance Guide](https://reactnavigation.org/docs/performance/)

### Ejemplos de Código

- [Ejemplos oficiales](https://github.com/react-navigation/react-navigation/tree/main/example)
- [TypeScript ejemplos](https://github.com/react-navigation/react-navigation/tree/main/example/TypeScript)

### Herramientas Útiles

- [React Navigation DevTools](https://github.com/react-navigation/devtools)
- [React Navigation Testing](https://reactnavigation.org/docs/testing/)

## 🎉 Conclusión

React Navigation está completamente configurado y listo para usar en la aplicación OpenEnergyCoop Mobile. La implementación incluye:

- ✅ Navegación por pestañas
- ✅ Navegación tipo stack
- ✅ Hooks personalizados
- ✅ Integración con estado global
- ✅ Persistencia de navegación
- ✅ Tipos TypeScript completos
- ✅ Pantallas de ejemplo
- ✅ Documentación completa

La aplicación ahora tiene una estructura de navegación robusta y escalable que permite una experiencia de usuario fluida y profesional.
