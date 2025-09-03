import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageService, STORAGE_KEYS } from './storage';

// Configuración de AsyncStorage
export const initializeStorage = async () => {
  try {
    console.log('🔧 Inicializando AsyncStorage...');
    
    // Verificar que AsyncStorage esté disponible
    const testKey = '__storage_test__';
    await AsyncStorage.setItem(testKey, 'test');
    await AsyncStorage.removeItem(testKey);
    
    console.log('✅ AsyncStorage está disponible y funcionando');
    
    // Inicializar datos por defecto si es la primera ejecución
    await initializeDefaultData();
    
    // Limpiar datos expirados (más de 30 días)
    await storageService.clearExpiredItems(30 * 24 * 60 * 60 * 1000);
    
    console.log('✅ AsyncStorage inicializado correctamente');
    
    return true;
  } catch (error) {
    console.error('❌ Error inicializando AsyncStorage:', error);
    return false;
  }
};

// Inicializar datos por defecto
const initializeDefaultData = async () => {
  try {
    // Verificar si es la primera ejecución
    const firstLaunch = await storageService.getItem<boolean>(STORAGE_KEYS.FIRST_LAUNCH);
    
    if (firstLaunch === null) {
      console.log('🚀 Primera ejecución detectada, configurando datos por defecto...');
      
      // Configuración por defecto de la aplicación
      const defaultAppSettings = {
        enableNotifications: true,
        enableLocation: true,
        enableAnalytics: false,
        autoRefresh: true,
        refreshInterval: 5,
      };
      
      // Configuración por defecto del tema
      const defaultThemeConfig = {
        mode: 'system' as const,
        roundness: 12,
        animation: { scale: 1.0 },
      };
      
      // Configuración por defecto de notificaciones
      const defaultNotificationSettings = {
        pushEnabled: true,
        emailEnabled: true,
        smsEnabled: false,
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
        },
      };
      
      // Guardar datos por defecto
      await storageService.setMultipleItems({
        [STORAGE_KEYS.FIRST_LAUNCH]: false,
        [STORAGE_KEYS.APP_SETTINGS]: defaultAppSettings,
        [STORAGE_KEYS.THEME_CONFIG]: defaultThemeConfig,
        [STORAGE_KEYS.LANGUAGE]: 'es',
        [STORAGE_KEYS.NOTIFICATION_SETTINGS]: defaultNotificationSettings,
        [STORAGE_KEYS.ONBOARDING_COMPLETED]: false,
        [STORAGE_KEYS.APP_VERSION]: '1.0.0',
      });
      
      console.log('✅ Datos por defecto configurados');
    }
  } catch (error) {
    console.error('❌ Error configurando datos por defecto:', error);
  }
};

// Función para migrar datos de versiones anteriores
export const migrateStorageData = async () => {
  try {
    console.log('🔄 Verificando migración de datos...');
    
    const currentVersion = await storageService.getItem<string>(STORAGE_KEYS.APP_VERSION);
    const appVersion = '1.0.0';
    
    if (currentVersion !== appVersion) {
      console.log(`🔄 Migrando de ${currentVersion} a ${appVersion}...`);
      
      // Aquí puedes agregar lógica de migración específica
      // Por ejemplo, cambiar nombres de claves, actualizar estructuras de datos, etc.
      
      // Actualizar versión
      await storageService.setItem(STORAGE_KEYS.APP_VERSION, appVersion);
      
      console.log('✅ Migración completada');
    }
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  }
};

// Función para verificar la integridad del almacenamiento
export const verifyStorageIntegrity = async () => {
  try {
    console.log('🔍 Verificando integridad del almacenamiento...');
    
    const keys = await storageService.getAllKeys();
    const size = await storageService.getStorageSize();
    
    console.log(`📊 Claves encontradas: ${keys.length}`);
    console.log(`📊 Tamaño total: ${(size / 1024).toFixed(2)} KB`);
    
    // Verificar claves críticas
    const criticalKeys = [
      STORAGE_KEYS.APP_SETTINGS,
      STORAGE_KEYS.THEME_CONFIG,
      STORAGE_KEYS.LANGUAGE,
    ];
    
    const missingKeys = criticalKeys.filter(key => !keys.includes(key));
    
    if (missingKeys.length > 0) {
      console.warn('⚠️ Claves críticas faltantes:', missingKeys);
      await initializeDefaultData();
    }
    
    console.log('✅ Verificación de integridad completada');
    return true;
  } catch (error) {
    console.error('❌ Error verificando integridad:', error);
    return false;
  }
};

// Función para limpiar datos temporales
export const cleanupTemporaryData = async () => {
  try {
    console.log('🧹 Limpiando datos temporales...');
    
    const keys = await storageService.getAllKeys();
    const tempKeys = keys.filter(key => 
      key.startsWith('temp_') || 
      key.startsWith('cache_') || 
      key.includes('_temp')
    );
    
    if (tempKeys.length > 0) {
      await storageService.removeMultipleItems(tempKeys);
      console.log(`🧹 Eliminadas ${tempKeys.length} claves temporales`);
    }
    
    // Limpiar datos expirados (más de 7 días)
    await storageService.clearExpiredItems(7 * 24 * 60 * 60 * 1000);
    
    console.log('✅ Limpieza completada');
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  }
};

// Función para obtener estadísticas del almacenamiento
export const getStorageStats = async () => {
  try {
    const keys = await storageService.getAllKeys();
    const size = await storageService.getStorageSize();
    
    const stats = {
      totalKeys: keys.length,
      totalSize: size,
      totalSizeKB: (size / 1024).toFixed(2),
      categories: {
        settings: keys.filter(k => k.includes('settings')).length,
        user: keys.filter(k => k.includes('user')).length,
        cache: keys.filter(k => k.includes('cache')).length,
        notifications: keys.filter(k => k.includes('notification')).length,
        energy: keys.filter(k => k.includes('energy')).length,
        other: keys.filter(k => 
          !k.includes('settings') && 
          !k.includes('user') && 
          !k.includes('cache') && 
          !k.includes('notification') && 
          !k.includes('energy')
        ).length,
      },
    };
    
    return stats;
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas:', error);
    return null;
  }
};

// Función para exportar datos del almacenamiento
export const exportStorageData = async () => {
  try {
    const keys = await storageService.getAllKeys();
    const data: Record<string, any> = {};
    
    for (const key of keys) {
      const value = await storageService.getItem(key);
      if (value !== null) {
        data[key] = value;
      }
    }
    
    return {
      timestamp: new Date().toISOString(),
      version: await storageService.getItem<string>(STORAGE_KEYS.APP_VERSION) || 'unknown',
      data,
    };
  } catch (error) {
    console.error('❌ Error exportando datos:', error);
    return null;
  }
};

// Función para importar datos al almacenamiento
export const importStorageData = async (exportedData: any) => {
  try {
    if (!exportedData || !exportedData.data) {
      throw new Error('Datos de exportación inválidos');
    }
    
    // Limpiar datos existentes
    await storageService.clear();
    
    // Importar nuevos datos
    await storageService.setMultipleItems(exportedData.data);
    
    console.log('✅ Datos importados correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error importando datos:', error);
    return false;
  }
};
