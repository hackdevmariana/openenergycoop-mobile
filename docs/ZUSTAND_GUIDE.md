# Guía de Zustand en OpenEnergyCoop Mobile

## ¿Qué es Zustand?

Zustand es una biblioteca de gestión de estado ligera y fácil de usar para React. Proporciona una API simple para crear stores globales sin la complejidad de Redux o Context API.

## Características Principales

- **API Simple**: Sin providers, actions, o reducers complejos
- **TypeScript**: Soporte nativo con tipado completo
- **Persistencia**: Almacenamiento automático en AsyncStorage/localStorage
- **DevTools**: Integración con Redux DevTools
- **Rendimiento**: Re-renders optimizados con selectores

## Configuración

### 1. Stores Configurados

Se han creado tres stores principales:

- **AuthStore**: Manejo de autenticación y usuario
- **AppStore**: Estado general de la aplicación
- **EnergyStore**: Datos de energía y estadísticas

### 2. Persistencia

Los stores están configurados con persistencia automática:

```typescript
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Estado y acciones
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

## Estructura de Archivos

```
src/
├── stores/
│   ├── authStore.ts          # Store de autenticación
│   ├── appStore.ts           # Store de la aplicación
│   ├── energyStore.ts        # Store de energía
│   └── index.ts              # Exportaciones centralizadas
├── hooks/
│   └── useAuthWithStore.ts   # Hooks combinados con React Query
└── components/
    └── UserProfile.tsx       # Ejemplo de uso
```

## Uso Básico

### 1. Store Simple

```typescript
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### 2. Usar el Store

```typescript
function Counter() {
  const { count, increment, decrement } = useCounterStore();
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onPress={increment} title="+" />
      <Button onPress={decrement} title="-" />
    </View>
  );
}
```

## Stores Implementados

### 1. AuthStore

**Estado:**
- `user`: Usuario actual
- `token`: Token de autenticación
- `isAuthenticated`: Estado de autenticación
- `isLoading`: Estado de carga
- `error`: Errores de autenticación

**Acciones:**
- `login(user, token, refreshToken)`: Iniciar sesión
- `logout()`: Cerrar sesión
- `refreshAuth(token, refreshToken)`: Refrescar token
- `updateUser(userData)`: Actualizar usuario

**Uso:**
```typescript
const { user, isAuthenticated, login, logout } = useAuthStore();
```

### 2. AppStore

**Estado:**
- `isOnline`: Estado de conexión
- `currentTheme`: Tema actual
- `notifications`: Notificaciones
- `settings`: Configuración de la app

**Acciones:**
- `setTheme(theme)`: Cambiar tema
- `addNotification(notification)`: Agregar notificación
- `updateSettings(settings)`: Actualizar configuración

**Uso:**
```typescript
const { currentTheme, notifications, addNotification } = useAppStore();
```

### 3. EnergyStore

**Estado:**
- `energyData`: Datos de energía
- `dashboardStats`: Estadísticas del dashboard
- `filters`: Filtros aplicados
- `pagination`: Información de paginación

**Acciones:**
- `setEnergyData(data)`: Establecer datos
- `setFilters(filters)`: Aplicar filtros
- `setDashboardStats(stats)`: Actualizar estadísticas

**Uso:**
```typescript
const { energyData, filters, setFilters } = useEnergyStore();
```

## Selectores y Optimización

### 1. Selectores Básicos

```typescript
// Seleccionar solo lo que necesitas
const user = useAuthStore((state) => state.user);
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
```

### 2. Selectores Computados

```typescript
// Selector que calcula valores derivados
export const useUnreadNotifications = () => useAppStore((state) => 
  state.notifications.filter(n => !n.read)
);
```

### 3. Selectores con Parámetros

```typescript
// Selector que acepta parámetros
export const useEnergyDataByUser = (userId: string) => useEnergyStore((state) => 
  state.energyData.filter(item => item.userId === userId)
);
```

## Integración con React Query

### 1. Hooks Combinados

```typescript
export const useAuthWithStore = () => {
  const authStore = useAuthStore();
  const loginMutation = useLogin();
  
  const login = useCallback(async (credentials) => {
    try {
      const result = await loginMutation.mutateAsync(credentials);
      authStore.login(result.user, result.token, result.refreshToken);
      return result;
    } catch (error) {
      authStore.setError(error.message);
      throw error;
    }
  }, [authStore, loginMutation]);
  
  return {
    user: authStore.user,
    login,
    logout: authStore.logout,
  };
};
```

### 2. Sincronización de Estado

```typescript
// Actualizar Zustand cuando React Query actualiza datos
const { data: users } = useUsers();
const { setUsers } = useUsersStore();

useEffect(() => {
  if (users) {
    setUsers(users.data);
  }
}, [users, setUsers]);
```

## Persistencia

### 1. Configuración Básica

```typescript
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Estado
    }),
    {
      name: 'store-name',
      partialize: (state) => ({
        // Solo persistir ciertos campos
        user: state.user,
        settings: state.settings,
      }),
    }
  )
);
```

### 2. AsyncStorage en React Native

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    (set) => ({
      // Estado
    }),
    {
      name: 'store-name',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

## Middleware Útil

### 1. DevTools

```typescript
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    (set) => ({
      // Estado
    }),
    {
      name: 'store-name',
    }
  )
);
```

### 2. Immer (para actualizaciones inmutables)

```typescript
import { immer } from 'zustand/middleware/immer';

export const useStore = create(
  immer((set) => ({
    increment: () => set((state) => {
      state.count += 1;
    }),
  }))
);
```

## Patrones Recomendados

### 1. Separación de Responsabilidades

```typescript
// ✅ Bueno: Stores separados por dominio
const useAuthStore = create(() => ({ /* auth state */ }));
const useAppStore = create(() => ({ /* app state */ }));
const useEnergyStore = create(() => ({ /* energy state */ }));

// ❌ Malo: Un store gigante
const useStore = create(() => ({ 
  /* auth, app, energy, user, settings, etc. */ 
}));
```

### 2. Acciones Simples

```typescript
// ✅ Bueno: Acciones simples y directas
const increment = () => set((state) => ({ count: state.count + 1 }));

// ❌ Malo: Acciones complejas en el store
const complexAction = async (data) => {
  const result = await apiCall(data);
  set({ data: result });
};
```

### 3. Selectores Optimizados

```typescript
// ✅ Bueno: Selectores específicos
const user = useAuthStore((state) => state.user);
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

// ❌ Malo: Seleccionar todo el estado
const authState = useAuthStore();
```

## Debugging

### 1. Redux DevTools

```typescript
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    (set) => ({
      // Estado
    }),
    {
      name: 'store-name',
    }
  )
);
```

### 2. Logs en Desarrollo

```typescript
const useStore = create((set, get) => ({
  increment: () => {
    if (__DEV__) {
      console.log('Incrementing count');
    }
    set((state) => ({ count: state.count + 1 }));
  },
}));
```

## Migración desde Redux/Context

### 1. Desde Redux

```typescript
// Antes (Redux)
const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

// Después (Zustand)
const user = useAuthStore((state) => state.user);
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
```

### 2. Desde Context

```typescript
// Antes (Context)
const { user, setUser } = useContext(AuthContext);

// Después (Zustand)
const { user, setUser } = useAuthStore();
```

## Mejores Prácticas

### 1. Nomenclatura

```typescript
// ✅ Usar prefijo 'use' para hooks
const useAuthStore = create(() => ({}));
const useAppStore = create(() => ({}));

// ✅ Usar nombres descriptivos para acciones
const incrementCount = () => set((state) => ({ count: state.count + 1 }));
const updateUserProfile = (data) => set((state) => ({ user: { ...state.user, ...data } }));
```

### 2. Tipado

```typescript
// ✅ Definir interfaces claras
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;
```

### 3. Organización

```typescript
// ✅ Agrupar estado relacionado
const useStore = create((set) => ({
  // Estado
  user: null,
  isAuthenticated: false,
  
  // Acciones relacionadas con usuario
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Acciones relacionadas con configuración
  updateSettings: (settings) => set({ settings }),
}));
```

## Ejemplos Completos

Ver `src/components/UserProfile.tsx` para un ejemplo completo de cómo usar Zustand en un componente real.

## Próximos Pasos

1. **Implementar AsyncStorage** para persistencia en React Native
2. **Agregar DevTools** para debugging
3. **Configurar middleware** adicional según necesidades
4. **Optimizar selectores** para mejor rendimiento
5. **Implementar tests** para los stores
