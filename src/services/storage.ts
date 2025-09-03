import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos para el almacenamiento
export interface StorageItem<T = any> {
  key: string;
  value: T;
  timestamp?: number;
}

// Claves de almacenamiento predefinidas
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
} as const;

// Clase principal de almacenamiento
class StorageService {
  /**
   * Guardar un valor en AsyncStorage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const item: StorageItem<T> = {
        key,
        value,
        timestamp: Date.now(),
      };
      
      const jsonValue = JSON.stringify(item);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw error;
    }
  }

  /**
   * Obtener un valor de AsyncStorage
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        const item: StorageItem<T> = JSON.parse(jsonValue);
        return item.value;
      }
      return null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  /**
   * Eliminar un elemento del almacenamiento
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
      throw error;
    }
  }

  /**
   * Obtener múltiples elementos del almacenamiento
   */
  async getMultipleItems(keys: string[]): Promise<Record<string, any>> {
    try {
      const keyValuePairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};
      
      keyValuePairs.forEach(([key, value]) => {
        if (value !== null) {
          try {
            const item = JSON.parse(value);
            result[key] = item.value;
          } catch {
            // Si no es un objeto JSON válido, usar el valor directo
            result[key] = value;
          }
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error reading multiple items from storage:', error);
      return {};
    }
  }

  /**
   * Guardar múltiples elementos en el almacenamiento
   */
  async setMultipleItems(items: Record<string, any>): Promise<void> {
    try {
      const keyValuePairs = Object.entries(items).map(([key, value]) => {
        const item: StorageItem = {
          key,
          value,
          timestamp: Date.now(),
        };
        return [key, JSON.stringify(item)];
      });
      
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error saving multiple items to storage:', error);
      throw error;
    }
  }

  /**
   * Eliminar múltiples elementos del almacenamiento
   */
  async removeMultipleItems(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error removing multiple items from storage:', error);
      throw error;
    }
  }

  /**
   * Obtener todas las claves del almacenamiento
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from storage:', error);
      return [];
    }
  }

  /**
   * Limpiar todo el almacenamiento
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Verificar si una clave existe
   */
  async hasKey(key: string): Promise<boolean> {
    try {
      const keys = await this.getAllKeys();
      return keys.includes(key);
    } catch (error) {
      console.error('Error checking if key exists:', error);
      return false;
    }
  }

  /**
   * Obtener el tamaño del almacenamiento
   */
  async getStorageSize(): Promise<number> {
    try {
      const keys = await this.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }

  /**
   * Obtener elementos por patrón de clave
   */
  async getItemsByPattern(pattern: string): Promise<Record<string, any>> {
    try {
      const keys = await this.getAllKeys();
      const matchingKeys = keys.filter(key => key.includes(pattern));
      return await this.getMultipleItems(matchingKeys);
    } catch (error) {
      console.error('Error getting items by pattern:', error);
      return {};
    }
  }

  /**
   * Eliminar elementos por patrón de clave
   */
  async removeItemsByPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      const matchingKeys = keys.filter(key => key.includes(pattern));
      await this.removeMultipleItems(matchingKeys);
    } catch (error) {
      console.error('Error removing items by pattern:', error);
      throw error;
    }
  }

  /**
   * Obtener información de un elemento (incluyendo timestamp)
   */
  async getItemInfo(key: string): Promise<StorageItem | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      console.error('Error getting item info:', error);
      return null;
    }
  }

  /**
   * Verificar si un elemento ha expirado
   */
  async isItemExpired(key: string, maxAge: number): Promise<boolean> {
    try {
      const itemInfo = await this.getItemInfo(key);
      if (!itemInfo || !itemInfo.timestamp) {
        return true;
      }
      
      const age = Date.now() - itemInfo.timestamp;
      return age > maxAge;
    } catch (error) {
      console.error('Error checking if item is expired:', error);
      return true;
    }
  }

  /**
   * Limpiar elementos expirados
   */
  async clearExpiredItems(_maxAge: number): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      const now = Date.now();
      
      for (const key of keys) {
        const itemString = await AsyncStorage.getItem(key);
        if (itemString) {
          const item: StorageItem = JSON.parse(itemString);
          if (item.expiresAt && now > item.expiresAt) {
            await this.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error('Error clearing expired items:', error);
      throw error;
    }
  }
}

// Instancia singleton del servicio
export const storageService = new StorageService();

// Funciones de conveniencia para uso común
export const storage = {
  // Configuración de la aplicación
  setAppSettings: (settings: any) => storageService.setItem(STORAGE_KEYS.APP_SETTINGS, settings),
  getAppSettings: () => storageService.getItem(STORAGE_KEYS.APP_SETTINGS),
  
  // Usuario
  setUserProfile: (profile: any) => storageService.setItem(STORAGE_KEYS.USER_PROFILE, profile),
  getUserProfile: () => storageService.getItem(STORAGE_KEYS.USER_PROFILE),
  
  setAuthToken: (token: string) => storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
  getAuthToken: () => storageService.getItem<string>(STORAGE_KEYS.AUTH_TOKEN),
  
  // Tema
  setThemeConfig: (theme: any) => storageService.setItem(STORAGE_KEYS.THEME_CONFIG, theme),
  getThemeConfig: () => storageService.getItem(STORAGE_KEYS.THEME_CONFIG),
  
  // Idioma
  setLanguage: (language: string) => storageService.setItem(STORAGE_KEYS.LANGUAGE, language),
  getLanguage: () => storageService.getItem<string>(STORAGE_KEYS.LANGUAGE),
  
  // Datos de energía
  setEnergyData: (data: any) => storageService.setItem(STORAGE_KEYS.ENERGY_DATA, data),
  getEnergyData: () => storageService.getItem(STORAGE_KEYS.ENERGY_DATA),
  
  // Notificaciones
  setNotifications: (notifications: any[]) => storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications),
  getNotifications: () => storageService.getItem<any[]>(STORAGE_KEYS.NOTIFICATIONS),
  
  // Onboarding
  setOnboardingCompleted: (completed: boolean) => storageService.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed),
  getOnboardingCompleted: () => storageService.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED),
  
  // Primera ejecución
  setFirstLaunch: (isFirst: boolean) => storageService.setItem(STORAGE_KEYS.FIRST_LAUNCH, isFirst),
  getFirstLaunch: () => storageService.getItem<boolean>(STORAGE_KEYS.FIRST_LAUNCH),
  
  // Limpiar datos de sesión
  clearSession: async () => {
    await storageService.removeMultipleItems([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_SESSION,
    ]);
  },
  
  // Limpiar cache
  clearCache: async () => {
    await storageService.removeMultipleItems([
      STORAGE_KEYS.API_CACHE,
      STORAGE_KEYS.DASHBOARD_CACHE,
      STORAGE_KEYS.ENERGY_DATA,
    ]);
  },
};

export default storageService;
