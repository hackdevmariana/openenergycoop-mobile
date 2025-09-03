import { useState, useEffect, useCallback } from 'react';
import { secureStore, SECURE_KEYS } from '../lib/secureStore';

// Hook para manejar tokens de autenticación
export const useAuthTokens = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar tokens al inicializar
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const [token, refresh] = await Promise.all([
          secureStore.getAuthToken(),
          secureStore.getRefreshToken(),
        ]);
        
        setAuthToken(token);
        setRefreshToken(refresh);
      } catch (error) {
        console.error('Error cargando tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTokens();
  }, []);

  // Establecer token de autenticación
  const setToken = useCallback(async (token: string, expiresIn?: number) => {
    try {
      await secureStore.setAuthToken(token, expiresIn);
      setAuthToken(token);
    } catch (error) {
      console.error('Error estableciendo auth token:', error);
      throw error;
    }
  }, []);

  // Establecer refresh token
  const setRefresh = useCallback(async (token: string, expiresIn?: number) => {
    try {
      await secureStore.setRefreshToken(token, expiresIn);
      setRefreshToken(token);
    } catch (error) {
      console.error('Error estableciendo refresh token:', error);
      throw error;
    }
  }, []);

  // Limpiar tokens
  const clearTokens = useCallback(async () => {
    try {
      await secureStore.clearAuth();
      setAuthToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error('Error limpiando tokens:', error);
      throw error;
    }
  }, []);

  // Verificar si está autenticado
  const isAuthenticated = useCallback(() => {
    return authToken !== null;
  }, [authToken]);

  return {
    authToken,
    refreshToken,
    isLoading,
    setToken,
    setRefresh,
    clearTokens,
    isAuthenticated,
  };
};

// Hook para datos genéricos del SecureStore
export const useSecureData = <T = any>(key: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar datos al inicializar
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const value = await secureStore.getItem<T>(key);
        setData(value);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [key]);

  // Guardar datos
  const saveData = useCallback(async (value: T, options?: { expiresIn?: number }) => {
    try {
      await secureStore.setItem(key, value, options);
      setData(value);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [key]);

  // Eliminar datos
  const removeData = useCallback(async () => {
    try {
      await secureStore.removeItem(key);
      setData(null);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [key]);

  // Verificar si existe
  const hasData = useCallback(async () => {
    try {
      return await secureStore.hasItem(key);
    } catch (err) {
      setError(err as Error);
      return false;
    }
  }, [key]);

  return {
    data,
    isLoading,
    error,
    saveData,
    removeData,
    hasData,
  };
};

// Hook para múltiples datos del SecureStore
export const useMultipleSecureData = (keys: string[]) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar datos al inicializar
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const results: Record<string, any> = {};

        for (const key of keys) {
          try {
            const value = await secureStore.getItem(key);
            results[key] = value;
          } catch (err) {
            console.error(`Error cargando ${key}:`, err);
            results[key] = null;
          }
        }

        setData(results);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData({});
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [keys.join(',')]);

  // Guardar múltiples datos
  const saveMultipleData = useCallback(async (
    dataToSave: Record<string, any>,
    options?: { expiresIn?: number }
  ) => {
    try {
      const promises = Object.entries(dataToSave).map(([key, value]) =>
        secureStore.setItem(key, value, options)
      );

      await Promise.all(promises);
      setData(prev => ({ ...prev, ...dataToSave }));
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, []);

  // Eliminar múltiples datos
  const removeMultipleData = useCallback(async (keysToRemove: string[]) => {
    try {
      const promises = keysToRemove.map(key => secureStore.removeItem(key));
      await Promise.all(promises);
      
      setData(prev => {
        const newData = { ...prev };
        keysToRemove.forEach(key => delete newData[key]);
        return newData;
      });
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    saveMultipleData,
    removeMultipleData,
  };
};

// Hook para estadísticas del SecureStore
export const useSecureStoreStats = () => {
  const [stats, setStats] = useState<{
    totalItems: number;
    expiredItems: number;
    validItems: number;
    keys: string[];
  }>({
    totalItems: 0,
    expiredItems: 0,
    validItems: 0,
    keys: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar estadísticas
  const loadStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const statsData = await secureStore.getStats();
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar estadísticas al inicializar
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Limpiar datos expirados
  const clearExpired = useCallback(async () => {
    try {
      await secureStore.clearExpired();
      await loadStats(); // Recargar estadísticas
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [loadStats]);

  // Limpiar todos los datos
  const clearAll = useCallback(async () => {
    try {
      await secureStore.clear();
      await loadStats(); // Recargar estadísticas
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [loadStats]);

  return {
    stats,
    isLoading,
    error,
    loadStats,
    clearExpired,
    clearAll,
  };
};

// Hook para información específica de un item
export const useSecureItemInfo = (key: string) => {
  const [info, setInfo] = useState<{
    exists: boolean;
    timestamp?: number;
    expiresAt?: number;
    isExpired: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar información al inicializar
  useEffect(() => {
    const loadInfo = async () => {
      try {
        setIsLoading(true);
        const itemInfo = await secureStore.getItemInfo(key);
        setInfo(itemInfo);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadInfo();
  }, [key]);

  // Recargar información
  const reloadInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const itemInfo = await secureStore.getItemInfo(key);
      setInfo(itemInfo);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  return {
    info,
    isLoading,
    error,
    reloadInfo,
  };
};
