import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Store de la aplicación
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
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

      // Acciones de estado de la aplicación
      setOnline: (online: boolean) => {
        set({ isOnline: online });
      },

      setInitialized: (initialized: boolean) => {
        set({ isInitialized: initialized });
      },

      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ currentTheme: theme });
      },

      setLanguage: (language: string) => {
        set({ language });
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
      addNotification: (notification) => {
        const { notifications } = get();
        const newNotification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: Date.now(),
          read: false,
        };
        set({ 
          notifications: [newNotification, ...notifications],
        });
      },

      removeNotification: (id: string) => {
        const { notifications } = get();
        set({ 
          notifications: notifications.filter(n => n.id !== id),
        });
      },

      markNotificationAsRead: (id: string) => {
        const { notifications } = get();
        set({
          notifications: notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          ),
        });
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      clearReadNotifications: () => {
        const { notifications } = get();
        set({
          notifications: notifications.filter(n => !n.read),
        });
      },

      // Acciones de configuración
      updateSettings: (newSettings) => {
        const { settings } = get();
        set({
          settings: { ...settings, ...newSettings },
        });
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
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
    }),
    {
      name: 'app-storage',
      // Solo persistir ciertos campos
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        language: state.language,
        settings: state.settings,
        notifications: state.notifications,
      }),
    }
  )
);

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
