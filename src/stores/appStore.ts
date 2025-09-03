import { create } from 'zustand';
import { storageService, STORAGE_KEYS } from '../services/storage';

// Tipos para el estado de la aplicación
export interface AppState {
  // Estado de la aplicación
  isOnline: boolean;
  isInitialized: boolean;
  currentTheme: 'light' | 'dark' | 'system';
  language: string;
  
  // Estado de navegación
  currentRoute: string;
  navigationHistory: string[];
  
  // Estado de notificaciones
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
  }>;
  
  // Estado de configuración
  settings: {
    enableNotifications: boolean;
    enableLocation: boolean;
    enableAnalytics: boolean;
    autoRefresh: boolean;
    refreshInterval: number; // en minutos
  };
  
  // Estado de carga
  isLoading: boolean;
  loadingMessage: string | null;
}

// Tipos para las acciones
export interface AppActions {
  // Acciones de estado de la aplicación
  setOnline: (online: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  
  // Acciones de navegación
  setCurrentRoute: (route: string) => void;
  addToHistory: (route: string) => void;
  clearHistory: () => void;
  goBack: () => void;
  
  // Acciones de notificaciones
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  clearReadNotifications: () => void;
  
  // Acciones de configuración
  updateSettings: (settings: Partial<AppState['settings']>) => void;
  resetSettings: () => void;
  
  // Acciones de carga
  setLoading: (loading: boolean, message?: string) => void;
  clearLoading: () => void;
  
  // Acciones de persistencia
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  clearStorage: () => Promise<void>;
}

// Tipo combinado para el store
export type AppStore = AppState & AppActions;

// Configuración por defecto
const defaultSettings = {
  enableNotifications: true,
  enableLocation: true,
  enableAnalytics: false,
  autoRefresh: true,
  refreshInterval: 5, // 5 minutos
};

// Estado inicial
const initialState: AppState = {
  isOnline: true,
  isInitialized: false,
  currentTheme: 'system',
  language: 'es',
  currentRoute: '',
  navigationHistory: [],
  notifications: [],
  settings: defaultSettings,
  isLoading: false,
  loadingMessage: null,
};

// Store de la aplicación
export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,

  // Acciones de estado de la aplicación
  setOnline: (online: boolean) => {
    set({ isOnline: online });
  },

  setInitialized: (initialized: boolean) => {
    set({ isInitialized: initialized });
  },

  setTheme: async (theme: 'light' | 'dark' | 'system') => {
    set({ currentTheme: theme });
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.THEME_CONFIG, { mode: theme });
  },

  setLanguage: async (language: string) => {
    set({ language });
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.LANGUAGE, language);
  },

  // Acciones de navegación
  setCurrentRoute: (route: string) => {
    set({ currentRoute: route });
  },

  addToHistory: (route: string) => {
    const { navigationHistory } = get();
    const newHistory = [...navigationHistory, route];
    // Mantener solo los últimos 10 elementos
    if (newHistory.length > 10) {
      newHistory.shift();
    }
    set({ navigationHistory: newHistory });
  },

  clearHistory: () => {
    set({ navigationHistory: [] });
  },

  goBack: () => {
    const { navigationHistory } = get();
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      const previousRoute = navigationHistory[navigationHistory.length - 2];
      set({ 
        navigationHistory: newHistory,
        currentRoute: previousRoute,
      });
    }
  },

  // Acciones de notificaciones
  addNotification: async (notification) => {
    const { notifications } = get();
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false,
    };
    const updatedNotifications = [newNotification, ...notifications];
    set({ notifications: updatedNotifications });
    
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
  },

  removeNotification: async (id: string) => {
    const { notifications } = get();
    const updatedNotifications = notifications.filter(n => n.id !== id);
    set({ notifications: updatedNotifications });
    
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
  },

  markNotificationAsRead: async (id: string) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    set({ notifications: updatedNotifications });
    
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
  },

  clearNotifications: async () => {
    set({ notifications: [] });
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, []);
  },

  clearReadNotifications: async () => {
    const { notifications } = get();
    const updatedNotifications = notifications.filter(n => !n.read);
    set({ notifications: updatedNotifications });
    
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
  },

  // Acciones de configuración
  updateSettings: async (newSettings) => {
    const { settings } = get();
    const updatedSettings = { ...settings, ...newSettings };
    set({ settings: updatedSettings });
    
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings);
  },

  resetSettings: async () => {
    set({ settings: defaultSettings });
    // Guardar en AsyncStorage
    await storageService.setItem(STORAGE_KEYS.APP_SETTINGS, defaultSettings);
  },

  // Acciones de carga
  setLoading: (loading: boolean, message?: string) => {
    set({ 
      isLoading: loading,
      loadingMessage: message || null,
    });
  },

  clearLoading: () => {
    set({ 
      isLoading: false,
      loadingMessage: null,
    });
  },

  // Acciones de persistencia
  loadFromStorage: async () => {
    try {
      const [
        themeConfig,
        language,
        notifications,
        appSettings,
      ] = await Promise.all([
        storageService.getItem(STORAGE_KEYS.THEME_CONFIG),
        storageService.getItem<string>(STORAGE_KEYS.LANGUAGE),
        storageService.getItem<any[]>(STORAGE_KEYS.NOTIFICATIONS),
        storageService.getItem(STORAGE_KEYS.APP_SETTINGS),
      ]);

      set({
        currentTheme: themeConfig?.mode || 'system',
        language: language || 'es',
        notifications: notifications || [],
        settings: appSettings || defaultSettings,
      });
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const state = get();
      await Promise.all([
        storageService.setItem(STORAGE_KEYS.THEME_CONFIG, { mode: state.currentTheme }),
        storageService.setItem(STORAGE_KEYS.LANGUAGE, state.language),
        storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, state.notifications),
        storageService.setItem(STORAGE_KEYS.APP_SETTINGS, state.settings),
      ]);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  clearStorage: async () => {
    try {
      await storageService.removeMultipleItems([
        STORAGE_KEYS.THEME_CONFIG,
        STORAGE_KEYS.LANGUAGE,
        STORAGE_KEYS.NOTIFICATIONS,
        STORAGE_KEYS.APP_SETTINGS,
      ]);
      set(initialState);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
}));

// Selectores útiles
export const useApp = () => useAppStore();
export const useIsOnline = () => useAppStore((state) => state.isOnline);
export const useTheme = () => useAppStore((state) => state.currentTheme);
export const useLanguage = () => useAppStore((state) => state.language);
export const useNotifications = () => useAppStore((state) => state.notifications);
export const useUnreadNotifications = () => useAppStore((state) => 
  state.notifications.filter(n => !n.read)
);
export const useSettings = () => useAppStore((state) => state.settings);
export const useAppLoading = () => useAppStore((state) => state.isLoading);
export const useLoadingMessage = () => useAppStore((state) => state.loadingMessage);
