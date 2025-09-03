# Guía de Axios en OpenEnergyCoop Mobile

## ¿Qué es Axios?

Axios es una biblioteca HTTP cliente basada en Promesas que facilita el manejo de peticiones HTTP en JavaScript/TypeScript. En este proyecto, se ha configurado con interceptores, manejo de errores y tipado completo.

## Configuración

### 1. Cliente Axios Configurado

El cliente axios está configurado en `src/lib/axios.ts` con:

- **Interceptores** para requests y responses
- **Manejo automático de errores** por código de estado
- **Logs en desarrollo** para debugging
- **Configuración de timeout** y headers
- **Soporte para autenticación** con tokens

### 2. URLs de API

```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' // Desarrollo
  : 'https://api.openenergycoop.com'; // Producción
```

## Estructura de Archivos

```
src/
├── lib/
│   └── axios.ts                 # Configuración principal de axios
├── services/
│   ├── apiClient.ts             # Servicios de API usando axios
│   └── api.ts                   # Servicios legacy (fetch)
└── hooks/
    ├── useUsers.ts              # Hooks para usuarios
    ├── useEnergyData.ts         # Hooks para datos de energía
    └── useDashboard.ts         # Hooks para dashboard y auth
```

## Características Principales

### 1. Interceptores

#### Request Interceptor
```typescript
apiClient.interceptors.request.use(
  (config) => {
    // Log de requests en desarrollo
    if (__DEV__) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    // Agregar token de autenticación
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

#### Response Interceptor
```typescript
apiClient.interceptors.response.use(
  (response) => {
    // Log de responses en desarrollo
    if (__DEV__) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Manejo automático de errores por código de estado
    if (error.response) {
      switch (error.response.status) {
        case 401: handleUnauthorized(); break;
        case 403: handleForbidden(); break;
        case 404: handleNotFound(); break;
        case 422: handleValidationError(error.response.data); break;
        case 500: handleServerError(); break;
        default: handleGenericError(error);
      }
    }
    return Promise.reject(error);
  }
);
```

### 2. Manejo de Errores

El sistema maneja automáticamente diferentes tipos de errores:

- **401 Unauthorized**: Token expirado o inválido
- **403 Forbidden**: Acceso denegado
- **404 Not Found**: Recurso no encontrado
- **422 Validation Error**: Errores de validación
- **500 Server Error**: Error interno del servidor
- **Network Error**: Sin conexión al servidor

### 3. Tipado Completo

```typescript
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  code?: string;
}
```

## Uso en Servicios

### 1. Servicio de API

```typescript
class ApiService {
  async getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', {
      params,
    });
    return response.data.data;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users', userData);
    return response.data.data;
  }
}
```

### 2. Hooks con React Query

```typescript
export function useUsers(params?: QueryParams) {
  return useApiQuery(
    queryKeys.users.list(params || {}),
    () => apiService.getUsers(params),
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  );
}
```

## Ejemplos de Uso

### 1. GET Request con Parámetros

```typescript
// Obtener usuarios con paginación y filtros
const { data, isLoading, error } = useUsers({
  page: 1,
  limit: 10,
  search: 'john',
  sortBy: 'name',
  sortOrder: 'asc'
});
```

### 2. POST Request

```typescript
const createUserMutation = useCreateUser();

const handleCreateUser = (userData: CreateUserRequest) => {
  createUserMutation.mutate(userData, {
    onSuccess: (data) => {
      console.log('Usuario creado:', data);
    },
    onError: (error) => {
      console.error('Error:', error.message);
    }
  });
};
```

### 3. PUT Request

```typescript
const updateUserMutation = useUpdateUser();

const handleUpdateUser = (id: string, userData: UpdateUserRequest) => {
  updateUserMutation.mutate({ id, userData });
};
```

### 4. DELETE Request

```typescript
const deleteUserMutation = useDeleteUser();

const handleDeleteUser = (id: string) => {
  deleteUserMutation.mutate(id);
};
```

## Configuración Avanzada

### 1. Timeout Personalizado

```typescript
const response = await apiClient.get('/slow-endpoint', {
  timeout: 30000 // 30 segundos
});
```

### 2. Headers Personalizados

```typescript
const response = await apiClient.post('/upload', data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});
```

### 3. Cancelación de Requests

```typescript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const response = await apiClient.get('/endpoint', {
  cancelToken: source.token
});

// Cancelar request
source.cancel('Request cancelled');
```

## Mejores Prácticas

### 1. Manejo de Errores

```typescript
try {
  const response = await apiService.getUsers();
  // Manejar respuesta exitosa
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Error específico de axios
    console.error('Axios error:', error.response?.data);
  } else {
    // Otro tipo de error
    console.error('Generic error:', error);
  }
}
```

### 2. Retry Logic

```typescript
const response = await apiClient.get('/endpoint', {
  retry: 3,
  retryDelay: 1000,
});
```

### 3. Cache de Requests

```typescript
// Usar React Query para cache automático
const { data } = useApiQuery(
  queryKeys.users.lists(),
  () => apiService.getUsers(),
  {
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,  // 10 minutos
  }
);
```

## Debugging

### 1. Logs en Desarrollo

En modo desarrollo, axios registra automáticamente:

- Requests con método, URL y datos
- Responses con status y datos
- Errores con detalles completos

### 2. Network Inspector

Para debugging avanzado, puedes usar:

- React Native Debugger
- Flipper
- Chrome DevTools (en desarrollo)

## Migración desde Fetch

Si tienes código usando `fetch`, puedes migrar fácilmente:

```typescript
// Antes (fetch)
const response = await fetch('/api/users');
const data = await response.json();

// Después (axios)
const response = await apiClient.get('/users');
const data = response.data.data;
```

## Configuración de Entorno

### 1. Variables de Entorno

```typescript
// Puedes usar variables de entorno para diferentes URLs
const API_BASE_URL = process.env.API_URL || 'https://api.openenergycoop.com';
```

### 2. Configuración por Entorno

```typescript
const config = {
  development: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://api.openenergycoop.com',
    timeout: 15000,
  },
};
```

## Seguridad

### 1. Tokens de Autenticación

```typescript
// Configurar token automáticamente
apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### 2. HTTPS en Producción

```typescript
// Asegurar HTTPS en producción
if (!__DEV__) {
  apiClient.defaults.baseURL = apiClient.defaults.baseURL?.replace('http://', 'https://');
}
```

## Próximos Pasos

1. **Implementar autenticación** con AsyncStorage/SecureStore
2. **Configurar refresh tokens** automático
3. **Agregar offline support** con cache persistente
4. **Implementar retry logic** más sofisticada
5. **Agregar request/response transformers** para normalización de datos
