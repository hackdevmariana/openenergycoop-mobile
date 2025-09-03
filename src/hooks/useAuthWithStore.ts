import { useCallback } from 'react';
import { useLogin, useRegister, useLogout, useRefreshToken } from './useDashboard';
import { useAuthStore } from '../stores/authStore';
import { useAppStore } from '../stores/appStore';
import { CreateUserRequest } from '../services/apiClient';

// Hook combinado para autenticación
export const useAuthWithStore = () => {
  const authStore = useAuthStore();
  const appStore = useAppStore();
  
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const refreshTokenMutation = useRefreshToken();

  // Login con manejo de estado
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      authStore.setLoading(true);
      appStore.setLoading(true, 'Iniciando sesión...');
      
      const result = await loginMutation.mutateAsync(credentials);
      
      // Actualizar estado de Zustand
      authStore.login(result.user, result.token, result.refreshToken);
      
      // Agregar notificación de éxito
      appStore.addNotification({
        type: 'success',
        title: 'Sesión iniciada',
        message: `Bienvenido, ${result.user.name}!`,
      });
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      
      // Actualizar estado de error
      authStore.setError(errorMessage);
      
      // Agregar notificación de error
      appStore.addNotification({
        type: 'error',
        title: 'Error de autenticación',
        message: errorMessage,
      });
      
      throw error;
    } finally {
      authStore.setLoading(false);
      appStore.clearLoading();
    }
  }, [authStore, appStore, loginMutation]);

  // Registro con manejo de estado
  const register = useCallback(async (userData: CreateUserRequest) => {
    try {
      authStore.setLoading(true);
      appStore.setLoading(true, 'Creando cuenta...');
      
      const result = await registerMutation.mutateAsync(userData);
      
      // Actualizar estado de Zustand
      authStore.login(result.user, result.token, result.refreshToken);
      
      // Agregar notificación de éxito
      appStore.addNotification({
        type: 'success',
        title: 'Cuenta creada',
        message: `¡Bienvenido a OpenEnergyCoop, ${result.user.name}!`,
      });
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear cuenta';
      
      // Actualizar estado de error
      authStore.setError(errorMessage);
      
      // Agregar notificación de error
      appStore.addNotification({
        type: 'error',
        title: 'Error de registro',
        message: errorMessage,
      });
      
      throw error;
    } finally {
      authStore.setLoading(false);
      appStore.clearLoading();
    }
  }, [authStore, appStore, registerMutation]);

  // Logout con manejo de estado
  const logout = useCallback(async () => {
    try {
      authStore.setLoading(true);
      appStore.setLoading(true, 'Cerrando sesión...');
      
      // Intentar hacer logout en el servidor
      await logoutMutation.mutateAsync(undefined);
    } catch (error) {
      // Incluso si falla el logout del servidor, limpiar el estado local
      console.warn('Error en logout del servidor:', error);
    } finally {
      // Limpiar estado local
      authStore.logout();
      
      // Agregar notificación
      appStore.addNotification({
        type: 'info',
        title: 'Sesión cerrada',
        message: 'Has cerrado sesión correctamente',
      });
      
      authStore.setLoading(false);
      appStore.clearLoading();
    }
  }, [authStore, appStore, logoutMutation]);

  // Refresh token con manejo de estado
  const refreshAuth = useCallback(async (refreshToken: string) => {
    try {
      const result = await refreshTokenMutation.mutateAsync(refreshToken);
      
      // Actualizar estado de Zustand
      authStore.refreshAuth(result.token, result.refreshToken);
      
      return result;
    } catch (error) {
      // Si falla el refresh, hacer logout
      authStore.logout();
      
      appStore.addNotification({
        type: 'error',
        title: 'Sesión expirada',
        message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      });
      
      throw error;
    }
  }, [authStore, appStore, refreshTokenMutation]);

  // Limpiar errores
  const clearError = useCallback(() => {
    authStore.clearError();
  }, [authStore]);

  return {
    // Estado
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    
    // Acciones
    login,
    register,
    logout,
    refreshAuth,
    clearError,
    
    // Acciones adicionales
    updateUser: authStore.updateUser,
    setUser: authStore.setUser,
  };
};

// Hook para verificar autenticación automáticamente
export const useAuthGuard = () => {
  const { isAuthenticated, token, refreshAuth } = useAuthWithStore();
  const refreshToken = useAuthStore((state) => state.refreshToken);
  
  // Verificar si el token está próximo a expirar
  const checkTokenExpiration = useCallback(() => {
    if (token && refreshToken) {
      try {
        // Implementación simplificada para verificar expiración
        // En producción, usarías una librería como jwt-decode
        console.log('Verificando expiración del token...');
        // Por ahora, refrescar cada 30 minutos
        setTimeout(() => {
          refreshAuth(refreshToken);
        }, 30 * 60 * 1000);
      } catch (error) {
        console.warn('Error al verificar expiración del token:', error);
      }
    }
  }, [token, refreshToken, refreshAuth]);

  return {
    isAuthenticated,
    checkTokenExpiration,
  };
};

// Hook para manejo de errores de autenticación
export const useAuthErrorHandler = () => {
  const { error, clearError } = useAuthWithStore();
  const { addNotification } = useAppStore();

  const handleAuthError = useCallback((authError: Error) => {
    const errorMessage = authError.message;
    
    // Agregar notificación de error
    addNotification({
      type: 'error',
      title: 'Error de autenticación',
      message: errorMessage,
    });
  }, [addNotification]);

  return {
    error,
    clearError,
    handleAuthError,
  };
};
