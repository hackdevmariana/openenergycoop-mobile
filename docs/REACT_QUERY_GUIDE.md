# Guía de React Query en OpenEnergyCoop Mobile

## ¿Qué es React Query?

React Query (ahora @tanstack/react-query) es una biblioteca que facilita el manejo de estado del servidor en aplicaciones React/React Native. Proporciona:

- **Caché inteligente** de datos del servidor
- **Sincronización automática** en segundo plano
- **Manejo de estados** de carga, error y éxito
- **Optimistic updates** para mejor UX
- **Invalidación automática** de caché

## Configuración

### 1. QueryProvider

El `QueryProvider` está configurado en `src/providers/QueryProvider.tsx` con opciones optimizadas para React Native:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: 3,
      refetchOnWindowFocus: false, // Deshabilitado en React Native
    },
  },
});
```

### 2. Hooks Personalizados

Se han creado hooks genéricos en `src/hooks/useApi.ts`:

- `useApiQuery` - Para GET requests
- `useApiMutation` - Para POST/PUT/DELETE requests
- `useInvalidateQueries` - Para invalidar caché
- `usePrefetchQuery` - Para precargar datos

## Uso Básico

### 1. Hacer una Query (GET)

```typescript
import { useApiQuery } from '../hooks/useApi';
import { apiService, queryKeys } from '../services/api';

function MyComponent() {
  const { data, isLoading, error, refetch } = useApiQuery(
    queryKeys.users.lists(),
    apiService.getUsers
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <UserList users={data} />;
}
```

### 2. Hacer una Mutation (POST/PUT/DELETE)

```typescript
import { useApiMutation } from '../hooks/useApi';

function CreateUserForm() {
  const createUserMutation = useApiMutation(
    (userData) => apiService.createUser(userData),
    {
      invalidateQueries: [queryKeys.users.lists()],
      onSuccess: (data) => {
        console.log('Usuario creado:', data);
      },
    }
  );

  const handleSubmit = (userData) => {
    createUserMutation.mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={createUserMutation.isPending}>
        {createUserMutation.isPending ? 'Creando...' : 'Crear Usuario'}
      </button>
    </form>
  );
}
```

## Estructura de Archivos

```
src/
├── providers/
│   └── QueryProvider.tsx          # Configuración principal de React Query
├── hooks/
│   ├── useApi.ts                  # Hooks genéricos
│   └── useUsers.ts               # Hooks específicos para usuarios
├── services/
│   └── api.ts                    # Servicios de API y query keys
└── components/
    └── UsersList.tsx             # Ejemplo de componente usando React Query
```

## Query Keys

Las query keys se organizan jerárquicamente para facilitar la invalidación:

```typescript
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
};
```

## Patrones Recomendados

### 1. Separación de Responsabilidades

- **Services**: Lógica de API y query keys
- **Hooks**: Lógica de React Query
- **Components**: UI y uso de hooks

### 2. Manejo de Errores

```typescript
const { data, error, isLoading } = useApiQuery(
  queryKeys.users.lists(),
  apiService.getUsers
);

if (error) {
  return (
    <View>
      <Text>Error: {error.message}</Text>
      <Button onPress={() => refetch()}>Reintentar</Button>
    </View>
  );
}
```

### 3. Optimistic Updates

```typescript
const updateUserMutation = useApiMutation(
  ({ id, userData }) => apiService.updateUser(id, userData),
  {
    onMutate: async (variables) => {
      // Cancelar queries en curso
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(variables.id) });
      
      // Snapshot del valor anterior
      const previousUser = queryClient.getQueryData(queryKeys.users.detail(variables.id));
      
      // Optimistic update
      queryClient.setQueryData(queryKeys.users.detail(variables.id), (old) => ({
        ...old,
        ...variables.userData,
      }));
      
      return { previousUser };
    },
    onError: (err, variables, context) => {
      // Revertir en caso de error
      if (context?.previousUser) {
        queryClient.setQueryData(
          queryKeys.users.detail(variables.id),
          context.previousUser
        );
      }
    },
  }
);
```

## DevTools

En desarrollo, las React Query DevTools están disponibles automáticamente. Puedes acceder a ellas para:

- Ver el estado del caché
- Inspeccionar queries activas
- Forzar refetch
- Invalidar queries manualmente

## Mejores Prácticas

1. **Usar query keys consistentes** y organizadas jerárquicamente
2. **Configurar staleTime y gcTime** apropiadamente para tu caso de uso
3. **Manejar errores** de forma consistente
4. **Usar optimistic updates** para mejor UX
5. **Invalidar queries relacionadas** después de mutations
6. **Prefetch datos** cuando sea posible para mejor rendimiento

## Ejemplos Completos

Ver `src/components/UsersList.tsx` para un ejemplo completo de cómo usar React Query en un componente real.
