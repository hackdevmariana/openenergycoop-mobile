import { useApiQuery, useApiMutation } from './useApi';
import { 
  apiService, 
  queryKeys, 
  CreateUserRequest
} from '../services/apiClient';

// Hook para obtener estadísticas del dashboard
export function useDashboardStats() {
  return useApiQuery(
    queryKeys.dashboard.stats,
    () => apiService.getDashboardStats(),
    {
      staleTime: 1 * 60 * 1000, // 1 minuto para stats del dashboard
      gcTime: 3 * 60 * 1000,
    }
  );
}

// Hook para health check
export function useHealthCheck() {
  return useApiQuery(
    queryKeys.health.check,
    () => apiService.healthCheck(),
    {
      staleTime: 30 * 1000, // 30 segundos para health check
      gcTime: 2 * 60 * 1000,
      retry: 3,
      retryDelay: 1000,
    }
  );
}

// Hook para login
export function useLogin() {
  return useApiMutation(
    (credentials: { email: string; password: string }) => apiService.login(credentials),
    {
      onSuccess: (data, _variables) => {
        console.log('Login exitoso:', data.user.email);
        // Aquí podrías guardar el token en AsyncStorage/SecureStore
        // y actualizar el estado de autenticación
      },
      onError: (error, _variables) => {
        console.error('Error en login:', error);
      },
    }
  );
}

// Hook para registro
export function useRegister() {
  return useApiMutation(
    (userData: CreateUserRequest) => apiService.register(userData),
    {
      onSuccess: (data, _variables) => {
        console.log('Registro exitoso:', data.user.email);
        // Aquí podrías guardar el token y redirigir
      },
      onError: (error, _variables) => {
        console.error('Error en registro:', error);
      },
    }
  );
}

// Hook para logout
export function useLogout() {
  return useApiMutation(
    () => apiService.logout(),
    {
      onSuccess: (_data, _variables) => {
        console.log('Logout exitoso');
        // Aquí podrías limpiar el token y redirigir al login
      },
      onError: (error, _variables) => {
        console.error('Error en logout:', error);
        // Incluso si hay error, podrías limpiar el token localmente
      },
    }
  );
}

// Hook para refresh token
export function useRefreshToken() {
  return useApiMutation(
    (refreshToken: string) => apiService.refreshToken(refreshToken),
    {
      onSuccess: (_data, _variables) => {
        console.log('Token refrescado exitosamente');
        // Aquí podrías actualizar el token almacenado
      },
      onError: (error, _variables) => {
        console.error('Error al refrescar token:', error);
        // Aquí podrías redirigir al login
      },
    }
  );
}
