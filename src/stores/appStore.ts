import { create } from 'zustand';
import { storageService, STORAGE_KEYS } from '../services/storage';
import { ThemeMode } from '../config/theme';

interface AppStore {
  // Estado básico
  isOnline: boolean;
  isInitialized: boolean;
  themeMode: ThemeMode;
  language: string;
  notifications: any[];
  settings: any;
  isLoading: boolean;

  // Estado de navegación
  navigationHistory: any[];
  currentRoute: string;
  previousRoute?: string;
  navigationMetrics: any;
  navigationLoading: any;

  // Acciones básicas
  setOnline: (online: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setLanguage: (language: string) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  clearReadNotifications: () => void;
  updateSettings: (settings: any) => void;
  resetSettings: () => void;
  setLoading: (loading: boolean, message?: string) => void;
  clearLoading: () => void;

  // Acciones de navegación
  addNavigationHistory: (routeName: string, params?: any) => void;
  clearNavigationHistory: () => void;
  setCurrentRoute: (route: string) => void;
  setPreviousRoute: (route: string) => void;
  addNavigationMetric: (metric: any) => void;
  setNavigationLoading: (loading: boolean, message?: string) => void;
  isRouteAccessible: (routeName: string) => boolean;

  // Acciones de persistencia
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  clearStorage: () => Promise<void>;
  saveNavigationState: () => Promise<void>;
}

const initialState = {
  isOnline: true,
  isInitialized: false,
  themeMode: 'system' as ThemeMode,
  language: 'es',
  notifications: [],
  settings: {
    enableNotifications: true,
    enableLocation: true,
    enableAnalytics: false,
    autoRefresh: true,
    refreshInterval: 5,
    themePreferences: {
      autoSwitch: true,
      animationDuration: 300,
      preserveSystemPreference: true,
    },
  },
  isLoading: false,
  navigationHistory: [],
  currentRoute: 'Home',
  previousRoute: undefined,
  navigationMetrics: {
    totalScreens: 0,
    mostVisitedScreen: 'Home',
    averageSessionTime: 0,
    navigationErrors: 0,
  },
  navigationLoading: {
    isLoading: false,
    loadingMessage: undefined,
    loadingRoute: undefined,
  },
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,

  // Acciones básicas
  setOnline: (online) => {
    set({ isOnline: online });
    storageService.setItem(STORAGE_KEYS.APP_SETTINGS, { ...get().settings, isOnline: online });
  },

  setInitialized: (initialized) => {
    set({ isInitialized: initialized });
  },

  setThemeMode: (themeMode) => {
    set({ themeMode });
    storageService.setItem(STORAGE_KEYS.THEME_CONFIG, { mode: themeMode });
    
    if (__DEV__) {
      console.log(`🌙 Tema actualizado en store: ${themeMode}`);
    }
  },

  setLanguage: (language) => {
    set({ language });
    storageService.setItem(STORAGE_KEYS.LANGUAGE, language);
  },

  addNotification: (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification,
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
    
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, get().notifications);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
    
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, get().notifications);
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
    
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, get().notifications);
  },

  clearNotifications: () => {
    set({ notifications: [] });
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, []);
  },

  clearReadNotifications: () => {
    set((state) => ({
      notifications: state.notifications.filter((n) => !n.read),
    }));
    
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, get().notifications);
  },

  updateSettings: (settings) => {
    set((state) => ({
      settings: { ...state.settings, ...settings },
    }));
    
    storageService.setItem(STORAGE_KEYS.APP_SETTINGS, get().settings);
  },

  resetSettings: () => {
    set({ settings: initialState.settings });
    storageService.setItem(STORAGE_KEYS.APP_SETTINGS, initialState.settings);
  },

  setLoading: (loading, message) => {
    set({ 
      isLoading: loading,
      navigationLoading: {
        isLoading: loading,
        loadingMessage: message,
        loadingRoute: loading ? get().currentRoute : undefined,
      }
    });
  },

  clearLoading: () => {
    set({ 
      isLoading: false,
      navigationLoading: {
        isLoading: false,
        loadingMessage: undefined,
        loadingRoute: undefined,
      }
    });
  },

  // Acciones de navegación
  addNavigationHistory: (routeName, params) => {
    const historyItem = {
      routeName,
      params,
      timestamp: new Date().toISOString(),
    };
    
    set((state) => ({
      navigationHistory: [historyItem, ...state.navigationHistory.slice(0, 49)], // Mantener solo los últimos 50
    }));
  },

  clearNavigationHistory: () => {
    set({ navigationHistory: [] });
  },

  setCurrentRoute: (route) => {
    const currentState = get();
    set({
      currentRoute: route,
      previousRoute: currentState.currentRoute,
    });
    
    // Agregar a historial
    get().addNavigationHistory(route);
  },

  setPreviousRoute: (route) => {
    set({ previousRoute: route });
  },

  addNavigationMetric: (metric) => {
    set((state) => ({
      navigationMetrics: { ...state.navigationMetrics, ...metric },
    }));
  },

  setNavigationLoading: (loading, message) => {
    set({
      navigationLoading: {
        isLoading: loading,
        loadingMessage: message,
        loadingRoute: loading ? get().currentRoute : undefined,
      },
    });
  },

  isRouteAccessible: (routeName) => {
    // Lógica básica de verificación de rutas
    const accessibleRoutes = ['Home', 'Dashboard', 'Energy', 'Profile', 'Settings'];
    return accessibleRoutes.includes(routeName);
  },

  // Acciones de persistencia
  loadFromStorage: async () => {
    try {
      const [
        appSettings,
        themeConfig,
        language,
        notifications,
        userProfile,
        userPreferences,
        navigationHistory,
        currentRoute,
        navigationMetrics,
      ] = await Promise.all([
        storageService.getItem(STORAGE_KEYS.APP_SETTINGS),
        storageService.getItem(STORAGE_KEYS.THEME_CONFIG),
        storageService.getItem(STORAGE_KEYS.LANGUAGE),
        storageService.getItem(STORAGE_KEYS.NOTIFICATIONS),
        storageService.getItem(STORAGE_KEYS.USER_PROFILE),
        storageService.getItem(STORAGE_KEYS.USER_PREFERENCES),
        storageService.getItem(STORAGE_KEYS.NAVIGATION_HISTORY),
        storageService.getItem(STORAGE_KEYS.CURRENT_ROUTE),
        storageService.getItem(STORAGE_KEYS.NAVIGATION_METRICS),
      ]);

      set({
        isOnline: appSettings?.isOnline ?? initialState.isOnline,
        settings: appSettings ?? initialState.settings,
        themeMode: themeConfig?.mode ?? initialState.themeMode,
        language: language ?? initialState.language,
        notifications: notifications ?? initialState.notifications,
        navigationHistory: navigationHistory ?? initialState.navigationHistory,
        currentRoute: currentRoute ?? initialState.currentRoute,
        navigationMetrics: navigationMetrics ?? initialState.navigationMetrics,
      });

      if (__DEV__) {
        console.log('📱 Estado de la aplicación cargado desde almacenamiento');
      }
    } catch (error) {
      console.error('Error cargando estado de la aplicación:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const state = get();
      
      await Promise.all([
        storageService.setItem(STORAGE_KEYS.APP_SETTINGS, state.settings),
        storageService.setItem(STORAGE_KEYS.THEME_CONFIG, { mode: state.themeMode }),
        storageService.setItem(STORAGE_KEYS.LANGUAGE, state.language),
        storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, state.notifications),
        storageService.setItem(STORAGE_KEYS.NAVIGATION_HISTORY, state.navigationHistory),
        storageService.setItem(STORAGE_KEYS.CURRENT_ROUTE, state.currentRoute),
        storageService.setItem(STORAGE_KEYS.NAVIGATION_METRICS, state.navigationMetrics),
      ]);

      if (__DEV__) {
        console.log('💾 Estado de la aplicación guardado en almacenamiento');
      }
    } catch (error) {
      console.error('Error guardando estado de la aplicación:', error);
    }
  },

  clearStorage: async () => {
    try {
      await storageService.clear();
      set(initialState);
      
      if (__DEV__) {
        console.log('🗑️ Almacenamiento de la aplicación limpiado');
      }
    } catch (error) {
      console.error('Error limpiando almacenamiento:', error);
    }
  },

  saveNavigationState: async () => {
    try {
      const state = get();
      
      await Promise.all([
        storageService.setItem(STORAGE_KEYS.NAVIGATION_HISTORY, state.navigationHistory),
        storageService.setItem(STORAGE_KEYS.CURRENT_ROUTE, state.currentRoute),
        storageService.setItem(STORAGE_KEYS.NAVIGATION_METRICS, state.navigationMetrics),
      ]);

      if (__DEV__) {
        console.log('🧭 Estado de navegación guardado');
      }
    } catch (error) {
      console.error('Error guardando estado de navegación:', error);
    }
  },
}));
