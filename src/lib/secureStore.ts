import * as SecureStore from 'expo-secure-store';

// Claves para almacenamiento seguro
export const SECURE_KEYS = {
  // Autenticación
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  SESSION_DATA: 'session_data',
  
  // Configuración sensible
  API_KEYS: 'api_keys',
  ENCRYPTION_KEY: 'encryption_key',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  
  // Datos sensibles del usuario
  USER_CREDENTIALS: 'user_credentials',
  PAYMENT_INFO: 'payment_info',
  PERSONAL_DATA: 'personal_data',
} as const;

// Tipos para los datos almacenados
export interface SecureData {
  value: any;
  timestamp: number;
  expiresAt?: number;
}

// Clase para manejar el almacenamiento seguro
class SecureStoreService {
  /**
   * Guardar datos de forma segura
   */
  async setItem(key: string, value: any, options?: {
    expiresIn?: number; // Tiempo en milisegundos
  }): Promise<void> {
    try {
      const data: SecureData = {
        value,
        timestamp: Date.now(),
        expiresAt: options?.expiresIn ? Date.now() + options.expiresIn : undefined,
      };

      const jsonValue = JSON.stringify(data);
      await SecureStore.setItemAsync(key, jsonValue);
      
      if (__DEV__) {
        console.log(`🔐 SecureStore: Guardado ${key}`);
      }
    } catch (error) {
      console.error(`❌ Error guardando en SecureStore (${key}):`, error);
      throw error;
    }
  }

  /**
   * Obtener datos de forma segura
   */
  async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await SecureStore.getItemAsync(key);
      
      if (!jsonValue) {
        return null;
      }

      const data: SecureData = JSON.parse(jsonValue);

      // Verificar si los datos han expirado
      if (data.expiresAt && Date.now() > data.expiresAt) {
        await this.removeItem(key);
        if (__DEV__) {
          console.log(`⏰ SecureStore: Datos expirados para ${key}`);
        }
        return null;
      }

      if (__DEV__) {
        console.log(`🔐 SecureStore: Recuperado ${key}`);
      }

      return data.value;
    } catch (error) {
      console.error(`❌ Error leyendo de SecureStore (${key}):`, error);
      return null;
    }
  }

  /**
   * Eliminar datos de forma segura
   */
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
      
      if (__DEV__) {
        console.log(`🗑️ SecureStore: Eliminado ${key}`);
      }
    } catch (error) {
      console.error(`❌ Error eliminando de SecureStore (${key}):`, error);
      throw error;
    }
  }

  /**
   * Verificar si una clave existe
   */
  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value !== null;
    } catch (error) {
      console.error(`❌ Error verificando SecureStore (${key}):`, error);
      return false;
    }
  }

  /**
   * Obtener todas las claves disponibles
   */
  async getAllKeys(): Promise<string[]> {
    try {
      // SecureStore no tiene un método getAllKeys, así que usamos las claves conocidas
      const knownKeys = Object.values(SECURE_KEYS);
      const existingKeys: string[] = [];

      for (const key of knownKeys) {
        const exists = await this.hasItem(key);
        if (exists) {
          existingKeys.push(key);
        }
      }

      return existingKeys;
    } catch (error) {
      console.error('❌ Error obteniendo claves de SecureStore:', error);
      return [];
    }
  }

  /**
   * Limpiar todos los datos
   */
  async clear(): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      
      for (const key of keys) {
        await this.removeItem(key);
      }

      if (__DEV__) {
        console.log('🧹 SecureStore: Todos los datos eliminados');
      }
    } catch (error) {
      console.error('❌ Error limpiando SecureStore:', error);
      throw error;
    }
  }

  /**
   * Limpiar datos expirados
   */
  async clearExpired(): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      let clearedCount = 0;

      for (const key of keys) {
        const data = await this.getItem(key);
        if (data === null) {
          // Los datos ya fueron eliminados por expiración
          clearedCount++;
        }
      }

      if (__DEV__ && clearedCount > 0) {
        console.log(`🧹 SecureStore: ${clearedCount} elementos expirados eliminados`);
      }
    } catch (error) {
      console.error('❌ Error limpiando datos expirados:', error);
    }
  }

  /**
   * Obtener información de los datos almacenados
   */
  async getItemInfo(key: string): Promise<{
    exists: boolean;
    timestamp?: number;
    expiresAt?: number;
    isExpired: boolean;
  } | null> {
    try {
      const jsonValue = await SecureStore.getItemAsync(key);
      
      if (!jsonValue) {
        return { exists: false, isExpired: false };
      }

      const data: SecureData = JSON.parse(jsonValue);
      const isExpired = data.expiresAt ? Date.now() > data.expiresAt : false;

      return {
        exists: true,
        timestamp: data.timestamp,
        expiresAt: data.expiresAt,
        isExpired,
      };
    } catch (error) {
      console.error(`❌ Error obteniendo info de SecureStore (${key}):`, error);
      return null;
    }
  }

  /**
   * Establecer token de autenticación
   */
  async setAuthToken(token: string, expiresIn?: number): Promise<void> {
    await this.setItem(SECURE_KEYS.AUTH_TOKEN, token, {
      expiresIn: expiresIn || 24 * 60 * 60 * 1000, // 24 horas por defecto
    });
  }

  /**
   * Obtener token de autenticación
   */
  async getAuthToken(): Promise<string | null> {
    return await this.getItem<string>(SECURE_KEYS.AUTH_TOKEN);
  }

  /**
   * Eliminar token de autenticación
   */
  async removeAuthToken(): Promise<void> {
    await this.removeItem(SECURE_KEYS.AUTH_TOKEN);
  }

  /**
   * Establecer refresh token
   */
  async setRefreshToken(token: string, expiresIn?: number): Promise<void> {
    await this.setItem(SECURE_KEYS.REFRESH_TOKEN, token, {
      expiresIn: expiresIn || 7 * 24 * 60 * 60 * 1000, // 7 días por defecto
    });
  }

  /**
   * Obtener refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    return await this.getItem<string>(SECURE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Eliminar refresh token
   */
  async removeRefreshToken(): Promise<void> {
    await this.removeItem(SECURE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Limpiar todos los datos de autenticación
   */
  async clearAuth(): Promise<void> {
    await Promise.all([
      this.removeAuthToken(),
      this.removeRefreshToken(),
      this.removeItem(SECURE_KEYS.USER_ID),
      this.removeItem(SECURE_KEYS.SESSION_DATA),
    ]);
  }

  /**
   * Verificar si el usuario está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return token !== null;
  }

  /**
   * Obtener estadísticas del almacenamiento
   */
  async getStats(): Promise<{
    totalItems: number;
    expiredItems: number;
    validItems: number;
    keys: string[];
  }> {
    try {
      const keys = await this.getAllKeys();
      let expiredCount = 0;
      let validCount = 0;

      for (const key of keys) {
        const info = await this.getItemInfo(key);
        if (info?.isExpired) {
          expiredCount++;
        } else {
          validCount++;
        }
      }

      return {
        totalItems: keys.length,
        expiredItems: expiredCount,
        validItems: validCount,
        keys,
      };
    } catch (error) {
      console.error('❌ Error obteniendo estadísticas de SecureStore:', error);
      return {
        totalItems: 0,
        expiredItems: 0,
        validItems: 0,
        keys: [],
      };
    }
  }
}

// Instancia singleton del servicio
export const secureStore = new SecureStoreService();

// Exportar tipos
export type { SecureData };
