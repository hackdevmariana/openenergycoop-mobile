import { useState, useEffect, useCallback, useMemo } from 'react';
import { storageService, STORAGE_KEYS } from '../services/storage';

// Hook para usar AsyncStorage con estado local
export const useStorage = <T>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T | null>(defaultValue || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar valor inicial
  useEffect(() => {
    const loadValue = async () => {
      try {
        setLoading(true);
        const storedValue = await storageService.getItem<T>(key);
        setValue(storedValue !== null ? storedValue : defaultValue || null);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error loading from storage'));
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key, defaultValue]);

  // Función para guardar valor
  const saveValue = useCallback(async (newValue: T) => {
    try {
      setLoading(true);
      await storageService.setItem(key, newValue);
      setValue(newValue);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error saving to storage'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [key]);

  // Función para eliminar valor
  const removeValue = useCallback(async () => {
    try {
      setLoading(true);
      await storageService.removeItem(key);
      setValue(defaultValue || null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error removing from storage'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [key, defaultValue]);

  return {
    value,
    setValue: saveValue,
    removeValue,
    loading,
    error,
  };
};

// Hook específico para configuración de la aplicación
export const useAppSettings = () => {
  return useStorage(STORAGE_KEYS.APP_SETTINGS, {
    enableNotifications: true,
    enableLocation: true,
    enableAnalytics: false,
    autoRefresh: true,
    refreshInterval: 5,
  });
};

// Hook específico para perfil de usuario
export const useUserProfile = () => {
  return useStorage(STORAGE_KEYS.USER_PROFILE);
};

// Hook específico para token de autenticación
export const useAuthToken = () => {
  return useStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
};

// Hook específico para configuración de tema
export const useThemeConfig = () => {
  return useStorage(STORAGE_KEYS.THEME_CONFIG, {
    mode: 'system',
    roundness: 12,
    animation: { scale: 1.0 },
  });
};

// Hook específico para idioma
export const useLanguage = () => {
  return useStorage<string>(STORAGE_KEYS.LANGUAGE, 'es');
};

// Hook específico para datos de energía
export const useEnergyData = () => {
  return useStorage(STORAGE_KEYS.ENERGY_DATA);
};

// Hook específico para notificaciones
export const useNotifications = () => {
  return useStorage<any[]>(STORAGE_KEYS.NOTIFICATIONS, []);
};

// Hook específico para onboarding
export const useOnboarding = () => {
  return useStorage<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
};

// Hook específico para primera ejecución
export const useFirstLaunch = () => {
  return useStorage<boolean>(STORAGE_KEYS.FIRST_LAUNCH, true);
};

// Hook para múltiples valores de almacenamiento
export const useMultipleStorage = (keys: string[]) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Crear una clave única para las dependencias
  const keysString = useMemo(() => keys.join(','), [keys]);

  useEffect(() => {
    const loadValues = async () => {
      try {
        setLoading(true);
        const storedValues = await storageService.getMultipleItems(keys);
        setValues(storedValues);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error loading multiple values from storage'));
      } finally {
        setLoading(false);
      }
    };

    loadValues();
  }, [keysString, keys]);

  const saveValues = useCallback(async (newValues: Record<string, any>) => {
    try {
      setLoading(true);
      await storageService.setMultipleItems(newValues);
      setValues(prev => ({ ...prev, ...newValues }));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error saving multiple values to storage'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeValues = useCallback(async (keysToRemove: string[]) => {
    try {
      setLoading(true);
      await storageService.removeMultipleItems(keysToRemove);
      setValues(prev => {
        const newValues = { ...prev };
        keysToRemove.forEach(key => delete newValues[key]);
        return newValues;
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error removing multiple values from storage'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    values,
    setValues: saveValues,
    removeValues,
    loading,
    error,
  };
};

// Hook para limpiar almacenamiento
export const useStorageCleanup = () => {
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearAll = useCallback(async () => {
    try {
      setClearing(true);
      await storageService.clear();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error clearing storage'));
      throw err;
    } finally {
      setClearing(false);
    }
  }, []);

  const clearExpired = useCallback(async (maxAge: number) => {
    try {
      setClearing(true);
      await storageService.clearExpiredItems(maxAge);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error clearing expired items'));
      throw err;
    } finally {
      setClearing(false);
    }
  }, []);

  const clearCache = useCallback(async () => {
    try {
      setClearing(true);
      await storageService.removeMultipleItems([
        STORAGE_KEYS.API_CACHE,
        STORAGE_KEYS.DASHBOARD_CACHE,
        STORAGE_KEYS.ENERGY_DATA,
      ]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error clearing cache'));
      throw err;
    } finally {
      setClearing(false);
    }
  }, []);

  const clearSession = useCallback(async () => {
    try {
      setClearing(true);
      await storageService.removeMultipleItems([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_SESSION,
      ]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error clearing session'));
      throw err;
    } finally {
      setClearing(false);
    }
  }, []);

  return {
    clearAll,
    clearExpired,
    clearCache,
    clearSession,
    clearing,
    error,
  };
};
