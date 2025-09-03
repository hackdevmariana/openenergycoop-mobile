# Guía de AsyncStorage - OpenEnergyCoop Mobile

## Descripción General

Esta aplicación utiliza `@react-native-async-storage/async-storage` para el almacenamiento local persistente de datos. Se ha implementado un sistema completo con:

- **Servicio centralizado** de almacenamiento
- **Hooks personalizados** para React
- **Integración con Zustand** para persistencia de estado
- **Funciones de utilidad** para gestión avanzada

## Instalación

El paquete ya está instalado en el proyecto:

```bash
npm install @react-native-async-storage/async-storage
```

## Configuración

### Autolinking

AsyncStorage se configura automáticamente en iOS y Android a través de autolinking. No requiere configuración manual adicional.

### Permisos

No se requieren permisos especiales para usar AsyncStorage.

## Arquitectura del Sistema

### 1. Servicio de Almacenamiento (`src/services/storage.ts`)

El servicio principal proporciona una interfaz completa para AsyncStorage:

```typescript
import { storageService, STORAGE_KEYS } from '../services/storage';

// Guardar un valor
await storageService.setItem('key', value);

// Obtener un valor
const value = await storageService.getItem('key');

// Eliminar un valor
await storageService.removeItem('key');
```

### 2. Hooks Personalizados (`src/hooks/useStorage.ts`)

Hooks de React para usar AsyncStorage de manera declarativa:

```typescript
import { useStorage, useAppSettings, useUserProfile } from '../hooks/useStorage';

// Hook genérico
const { value, setValue, loading, error } = useStorage('key', defaultValue);

// Hooks específicos
const { value: settings, setValue: setSettings } = useAppSettings();
const { value: profile, setValue: setProfile } = useUserProfile();
```

### 3. Integración con Zustand (`src/stores/appStore.ts`)

El store de la aplicación está integrado con AsyncStorage para persistencia automática.

## Claves de Almacenamiento Predefinidas

```typescript
export const STORAGE_KEYS = {
  // Configuración de la aplicación
  APP_SETTINGS: 'app_settings',
  USER_PREFERENCES: 'user_preferences',
  THEME_CONFIG: 'theme_config',
  LANGUAGE: 'language',
  
  // Datos de usuario
  USER_PROFILE: 'user_profile',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_SESSION: 'user_session',
  
  // Datos de energía
  ENERGY_DATA: 'energy_data',
  ENERGY_HISTORY: 'energy_history',
  ENERGY_PREFERENCES: 'energy_preferences',
  
  // Notificaciones
  NOTIFICATIONS: 'notifications',
  NOTIFICATION_SETTINGS: 'notification_settings',
  
  // Cache de datos
  API_CACHE: 'api_cache',
  DASHBOARD_CACHE: 'dashboard_cache',
  
  // Configuración de la aplicación
  ONBOARDING_COMPLETED: 'onboarding_completed',
  FIRST_LAUNCH: 'first_launch',
  APP_VERSION: 'app_version',
};
```

## Uso Básico

### Usando el Servicio Directamente

```typescript
import { storageService } from '../services/storage';

// Guardar datos
await storageService.setItem('user_profile', {
  name: 'Juan Pérez',
  email: 'juan@example.com',
  preferences: { theme: 'dark' }
});

// Obtener datos
const profile = await storageService.getItem('user_profile');

// Eliminar datos
await storageService.removeItem('user_profile');
```

### Usando Hooks de React

```typescript
import { useStorage } from '../hooks/useStorage';

const MyComponent = () => {
  const { value, setValue, loading, error } = useStorage('user_profile', {
    name: 'Usuario por defecto',
    email: 'default@example.com'
  });

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>Nombre: {value?.name}</Text>
      <Button onPress={() => setValue({ ...value, name: 'Nuevo Nombre' })}>
        Actualizar
      </Button>
    </View>
  );
};
```

### Usando Hooks Específicos

```typescript
import { useAppSettings, useUserProfile, useAuthToken } from '../hooks/useStorage';

const SettingsScreen = () => {
  const { value: settings, setValue: setSettings } = useAppSettings();
  const { value: profile, setValue: setProfile } = useUserProfile();
  const { value: token, setValue: setToken } = useAuthToken();

  const updateSettings = async () => {
    await setSettings({
      ...settings,
      enableNotifications: true,
      refreshInterval: 10
    });
  };

  return (
    <View>
      <Switch
        value={settings?.enableNotifications}
        onValueChange={(value) => setSettings({ ...settings, enableNotifications: value })}
      />
    </View>
  );
};
```

## Operaciones Avanzadas

### Múltiples Elementos

```typescript
// Guardar múltiples elementos
await storageService.setMultipleItems({
  'user_profile': profile,
  'app_settings': settings,
  'theme_config': theme
});

// Obtener múltiples elementos
const data = await storageService.getMultipleItems([
  'user_profile',
  'app_settings',
  'theme_config'
]);

// Eliminar múltiples elementos
await storageService.removeMultipleItems([
  'user_profile',
  'app_settings'
]);
```

### Búsqueda por Patrón

```typescript
// Obtener elementos que contengan 'cache'
const cacheData = await storageService.getItemsByPattern('cache');

// Eliminar elementos que contengan 'temp'
await storageService.removeItemsByPattern('temp');
```

### Gestión de Expiración

```typescript
// Verificar si un elemento ha expirado (24 horas)
const isExpired = await storageService.isItemExpired('api_cache', 24 * 60 * 60 * 1000);

// Limpiar elementos expirados (7 días)
await storageService.clearExpiredItems(7 * 24 * 60 * 60 * 1000);
```

### Información del Almacenamiento

```typescript
// Obtener todas las claves
const keys = await storageService.getAllKeys();

// Obtener el tamaño del almacenamiento
const size = await storageService.getStorageSize();

// Verificar si existe una clave
const exists = await storageService.hasKey('user_profile');

// Obtener información completa de un elemento
const info = await storageService.getItemInfo('user_profile');
```

## Limpieza y Mantenimiento

### Usando el Hook de Limpieza

```typescript
import { useStorageCleanup } from '../hooks/useStorage';

const CleanupComponent = () => {
  const { clearAll, clearCache, clearSession, clearExpired, clearing } = useStorageCleanup();

  return (
    <View>
      <Button onPress={clearCache} disabled={clearing}>
        Limpiar Cache
      </Button>
      <Button onPress={clearSession} disabled={clearing}>
        Limpiar Sesión
      </Button>
      <Button onPress={() => clearExpired(24 * 60 * 60 * 1000)} disabled={clearing}>
        Limpiar Expirados (24h)
      </Button>
      <Button onPress={clearAll} disabled={clearing}>
        Limpiar Todo
      </Button>
    </View>
  );
};
```

### Usando Funciones de Conveniencia

```typescript
import { storage } from '../services/storage';

// Limpiar datos de sesión
await storage.clearSession();

// Limpiar cache
await storage.clearCache();
```

## Integración con Zustand

El store de la aplicación está configurado para persistir automáticamente en AsyncStorage:

```typescript
import { useAppStore } from '../stores/appStore';

const AppComponent = () => {
  const { 
    currentTheme, 
    setTheme, 
    language, 
    setLanguage,
    loadFromStorage,
    saveToStorage,
    clearStorage 
  } = useAppStore();

  useEffect(() => {
    // Cargar datos al iniciar la app
    loadFromStorage();
  }, []);

  const changeTheme = async (theme) => {
    await setTheme(theme); // Se guarda automáticamente
  };

  return (
    <View>
      <Text>Tema actual: {currentTheme}</Text>
      <Button onPress={() => changeTheme('dark')}>
        Cambiar a Oscuro
      </Button>
    </View>
  );
};
```

## Mejores Prácticas

### 1. Manejo de Errores

```typescript
try {
  await storageService.setItem('key', value);
} catch (error) {
  console.error('Error saving to storage:', error);
  // Manejar el error apropiadamente
}
```

### 2. Validación de Datos

```typescript
const saveUserProfile = async (profile) => {
  if (!profile || !profile.name) {
    throw new Error('Perfil inválido');
  }
  
  await storageService.setItem('user_profile', profile);
};
```

### 3. Límites de Tamaño

```typescript
const saveLargeData = async (data) => {
  const dataSize = JSON.stringify(data).length;
  const maxSize = 6 * 1024 * 1024; // 6MB
  
  if (dataSize > maxSize) {
    throw new Error('Datos demasiado grandes');
  }
  
  await storageService.setItem('large_data', data);
};
```

### 4. Cache Inteligente

```typescript
const getCachedData = async (key, maxAge = 5 * 60 * 1000) => {
  const isExpired = await storageService.isItemExpired(key, maxAge);
  
  if (isExpired) {
    await storageService.removeItem(key);
    return null;
  }
  
  return await storageService.getItem(key);
};
```

## Casos de Uso Comunes

### 1. Configuración de Usuario

```typescript
const useUserSettings = () => {
  const { value: settings, setValue: setSettings } = useStorage('user_settings', {
    theme: 'light',
    language: 'es',
    notifications: true,
    autoRefresh: true
  });

  const updateTheme = async (theme) => {
    await setSettings({ ...settings, theme });
  };

  return { settings, updateTheme };
};
```

### 2. Cache de API

```typescript
const useApiCache = () => {
  const { value: cache, setValue: setCache } = useStorage('api_cache', {});

  const getCachedResponse = (endpoint) => {
    return cache[endpoint];
  };

  const setCachedResponse = async (endpoint, data) => {
    const newCache = { ...cache, [endpoint]: { data, timestamp: Date.now() } };
    await setCache(newCache);
  };

  return { getCachedResponse, setCachedResponse };
};
```

### 3. Historial de Navegación

```typescript
const useNavigationHistory = () => {
  const { value: history, setValue: setHistory } = useStorage('nav_history', []);

  const addToHistory = async (route) => {
    const newHistory = [route, ...history.filter(h => h !== route)].slice(0, 10);
    await setHistory(newHistory);
  };

  return { history, addToHistory };
};
```

## Solución de Problemas

### Error: "AsyncStorage is not available"

1. Verifica que el paquete esté instalado correctamente
2. Reinicia el Metro bundler
3. Limpia la cache: `npx react-native start --reset-cache`

### Datos no se persisten

1. Verifica que las operaciones sean asíncronas
2. Asegúrate de manejar los errores correctamente
3. Verifica que no haya conflictos de claves

### Rendimiento lento

1. Usa `multiGet` y `multiSet` para múltiples operaciones
2. Implementa cache inteligente con expiración
3. Limpia datos innecesarios regularmente

### Datos corruptos

1. Implementa validación de datos
2. Usa try-catch para manejar errores de parsing
3. Implementa backup y recuperación de datos

## Monitoreo y Debugging

### Información del Almacenamiento

```typescript
const debugStorage = async () => {
  const keys = await storageService.getAllKeys();
  const size = await storageService.getStorageSize();
  
  console.log('Claves:', keys);
  console.log('Tamaño:', (size / 1024).toFixed(2), 'KB');
  
  for (const key of keys) {
    const info = await storageService.getItemInfo(key);
    console.log(`${key}:`, info);
  }
};
```

### Logs de Actividad

```typescript
const storageWithLogs = {
  setItem: async (key, value) => {
    console.log('Guardando:', key, value);
    await storageService.setItem(key, value);
  },
  
  getItem: async (key) => {
    const value = await storageService.getItem(key);
    console.log('Obteniendo:', key, value);
    return value;
  }
};
```

## Consideraciones de Seguridad

### Datos Sensibles

- No almacenes contraseñas en texto plano
- Usa encriptación para datos sensibles
- Considera usar `react-native-keychain` para datos críticos

### Limpieza de Datos

- Implementa limpieza automática de datos expirados
- Proporciona opción para limpiar datos al cerrar sesión
- Respeta la privacidad del usuario

## Rendimiento

### Optimizaciones

1. **Operaciones en lote**: Usa `multiGet` y `multiSet`
2. **Cache inteligente**: Implementa expiración de datos
3. **Lazy loading**: Carga datos solo cuando sea necesario
4. **Compresión**: Considera comprimir datos grandes

### Límites

- AsyncStorage tiene límites de tamaño (varía por dispositivo)
- Las operaciones son asíncronas
- El rendimiento puede variar según el dispositivo

## Migración desde Otros Sistemas

### Desde AsyncStorage Legacy

```typescript
// Antes
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('key', JSON.stringify(value));

// Después
import { storageService } from '../services/storage';
await storageService.setItem('key', value);
```

### Desde LocalStorage (Web)

```typescript
// Antes (Web)
localStorage.setItem('key', JSON.stringify(value));
const value = JSON.parse(localStorage.getItem('key'));

// Después (React Native)
await storageService.setItem('key', value);
const value = await storageService.getItem('key');
```
