import { create } from 'zustand';
import { storageService, STORAGE_KEYS } from '../services/storage';
import { NavigationHistoryItem, NavigationMetrics, NavigationLoadingState } from '../types/navigation';

interface AppStore {
  // Estado básico
  isOnline: boolean;
  isInitialized: boolean;
  currentTheme: 'light' | 'dark' | 'system';
  language: string;
  notifications: any[];
  settings: any;
  isLoading: boolean;

  // Estado de navegación
  navigationHistory: NavigationHistoryItem[];
  currentRoute: string;
  previousRoute?: string;
  navigationMetrics: NavigationMetrics;
  navigationLoading: NavigationLoadingState;

  // Acciones básicas
  setOnline: (online: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  clearReadNotifications: () => void;
  updateSettings: (settings: any) => void;
  resetSettings: () => void;
  setLoading: (loading: boolean) => void;

  // Acciones de navegación
  addNavigationHistory: (routeName: string, params?: any) => void;
  clearNavigationHistory: () => void;
  setCurrentRoute: (route: string) => void;
  setPreviousRoute: (route: string) => void;
  addNavigationMetric: (metric: Partial<NavigationMetrics>) => void;
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
  currentTheme: 'system' as const,
  language: 'es',
  notifications: [],
  settings: {
    enableNotifications: true,
    enableLocation: true,
    enableAnalytics: false,
    autoRefresh: true,
    refreshInterval: 5,
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

  setTheme: (theme) => {
    set({ currentTheme: theme });
    storageService.setItem(STORAGE_KEYS.THEME_CONFIG, { mode: theme });
  },

  setLanguage: (language) => {
    set({ language });
    storageService.setItem(STORAGE_KEYS.LANGUAGE, language);
  },

  addNotification: (notification) => {
    const { notifications } = get();
    const newNotifications = [notification, ...notifications];
    set({ notifications: newNotifications });
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, newNotifications);
  },

  removeNotification: (id) => {
    const { notifications } = get();
    const filteredNotifications = notifications.filter(n => n.id !== id);
    set({ notifications: filteredNotifications });
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, filteredNotifications);
  },

  markNotificationAsRead: (id) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    set({ notifications: updatedNotifications });
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, updatedNotifications);
  },

  clearNotifications: () => {
    set({ notifications: [] });
    storageService.removeItem(STORAGE_KEYS.NOTIFICATIONS);
  },

  clearReadNotifications: () => {
    const { notifications } = get();
    const unreadNotifications = notifications.filter(n => !n.read);
    set({ notifications: unreadNotifications });
    storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, unreadNotifications);
  },

  updateSettings: (settings) => {
    const currentSettings = get().settings;
    const newSettings = { ...currentSettings, ...settings };
    set({ settings: newSettings });
    storageService.setItem(STORAGE_KEYS.APP_SETTINGS, newSettings);
  },

  resetSettings: () => {
    set({ settings: initialState.settings });
    storageService.setItem(STORAGE_KEYS.APP_SETTINGS, initialState.settings);
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  // Acciones de navegación
  addNavigationHistory: (routeName, params) => {
    const { navigationHistory } = get();
    const newHistoryItem: NavigationHistoryItem = {
      routeName,
      params,
      timestamp: Date.now(),
    };
    
    const updatedHistory = [newHistoryItem, ...navigationHistory].slice(0, 50); // Mantener solo los últimos 50
    set({ navigationHistory: updatedHistory });
  },

  clearNavigationHistory: () => {
    set({ navigationHistory: [] });
  },

  setCurrentRoute: (route) => {
    const { currentRoute } = get();
    set({ 
      currentRoute: route,
      previousRoute: currentRoute,
    });
  },

  setPreviousRoute: (route) => {
    set({ previousRoute: route });
  },

  addNavigationMetric: (metric) => {
    const { navigationMetrics } = get();
    const updatedMetrics = { ...navigationMetrics, ...metric };
    set({ navigationMetrics: updatedMetrics });
  },

  setNavigationLoading: (loading, message) => {
    set({ 
      navigationLoading: {
        isLoading: loading,
        loadingMessage: message,
        loadingRoute: loading ? get().currentRoute : undefined,
      }
    });
  },

  isRouteAccessible: (routeName) => {
    // Aquí puedes implementar lógica de permisos
    // Por ejemplo, verificar si el usuario está autenticado para ciertas rutas
    const protectedRoutes = ['Profile', 'Settings', 'Energy', 'Dashboard'];
    return !protectedRoutes.includes(routeName) || get().isOnline;
  },

  // Acciones de persistencia
  loadFromStorage: async () => {
    try {
      const [
        appSettings,
        themeConfig,
        language,
        notifications,
        navigationHistory,
      ] = await Promise.all([
        storageService.getItem(STORAGE_KEYS.APP_SETTINGS),
        storageService.getItem(STORAGE_KEYS.THEME_CONFIG),
        storageService.getItem(STORAGE_KEYS.LANGUAGE),
        storageService.getItem(STORAGE_KEYS.NOTIFICATIONS),
        storageService.getItem(STORAGE_KEYS.NAVIGATION_HISTORY),
      ]);

      set({
        settings: appSettings || initialState.settings,
        currentTheme: themeConfig?.mode || initialState.currentTheme,
        language: language || initialState.language,
        notifications: notifications || initialState.notifications,
        navigationHistory: navigationHistory || initialState.navigationHistory,
      });
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const { settings, currentTheme, language, notifications, navigationHistory } = get();
      
      await Promise.all([
        storageService.setItem(STORAGE_KEYS.APP_SETTINGS, settings),
        storageService.setItem(STORAGE_KEYS.THEME_CONFIG, { mode: currentTheme }),
        storageService.setItem(STORAGE_KEYS.LANGUAGE, language),
        storageService.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications),
        storageService.setItem(STORAGE_KEYS.NAVIGATION_HISTORY, navigationHistory),
      ]);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },

  clearStorage: async () => {
    try {
      await storageService.clear();
      set(initialState);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  saveNavigationState: async () => {
    try {
      const { navigationHistory, currentRoute, navigationMetrics } = get();
      await storageService.setItem(STORAGE_KEYS.NAVIGATION_HISTORY, navigationHistory);
      await storageService.setItem(STORAGE_KEYS.CURRENT_ROUTE, currentRoute);
      await storageService.setItem(STORAGE_KEYS.NAVIGATION_METRICS, navigationMetrics);
    } catch (error) {
      console.error('Error saving navigation state:', error);
    }
  },
}));
