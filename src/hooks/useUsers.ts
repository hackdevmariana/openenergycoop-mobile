import { useApiQuery, useApiMutation } from './useApi';
import { 
  apiService, 
  queryKeys, 
  CreateUserRequest, 
  UpdateUserRequest,
  QueryParams
} from '../services/apiClient';

// Hook para obtener usuarios con paginación
export function useUsers(params?: QueryParams) {
  return useApiQuery(
    queryKeys.users.list(params || {}),
    () => apiService.getUsers(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
    }
  );
}

// Hook para obtener un usuario específico
export function useUser(id: string) {
  return useApiQuery(
    queryKeys.users.detail(id),
    () => apiService.getUserById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  );
}

// Hook para obtener estadísticas de un usuario
export function useUserStats(userId: string) {
  return useApiQuery(
    queryKeys.users.stats(userId),
    () => apiService.getUserStats(userId),
    {
      enabled: !!userId,
      staleTime: 2 * 60 * 1000, // 2 minutos para stats
      gcTime: 5 * 60 * 1000,
    }
  );
}

// Hook para crear un usuario
export function useCreateUser() {
  return useApiMutation(
    (userData: CreateUserRequest) => apiService.createUser(userData),
    {
      invalidateQueries: [queryKeys.users.lists()],
      onSuccess: (data, _variables) => {
        console.log('Usuario creado exitosamente:', data);
      },
      onError: (error, _variables) => {
        console.error('Error al crear usuario:', error);
      },
    }
  );
}

// Hook para actualizar un usuario
export function useUpdateUser() {
  return useApiMutation(
    ({ id, userData }: { id: string; userData: UpdateUserRequest }) =>
      apiService.updateUser(id, userData),
    {
      invalidateQueries: [queryKeys.users.lists()],
      onSuccess: (data, variables) => {
        console.log('Usuario actualizado exitosamente:', data);
        // Invalidar también la query específica del usuario
        return [queryKeys.users.detail(variables.id)];
      },
      onError: (error, _variables) => {
        console.error('Error al actualizar usuario:', error);
      },
    }
  );
}

// Hook para eliminar un usuario
export function useDeleteUser() {
  return useApiMutation(
    (id: string) => apiService.deleteUser(id),
    {
      invalidateQueries: [queryKeys.users.lists()],
      onSuccess: (_data, variables) => {
        console.log('Usuario eliminado exitosamente:', variables);
      },
      onError: (error, _variables) => {
        console.error('Error al eliminar usuario:', error);
      },
    }
  );
}
