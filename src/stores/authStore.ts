import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../services/apiClient';

// Tipos para el estado de autenticación
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Tipos para las acciones
export interface AuthActions {
  // Acciones de autenticación
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAuth: (token: string, refreshToken: string) => void;
  
  // Acciones de estado
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Acciones de usuario
  updateUser: (user: Partial<User>) => void;
  setUser: (user: User | null) => void;
}

// Tipo combinado para el store
export type AuthStore = AuthState & AuthActions;

// Store de autenticación
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Acciones de autenticación
      login: (user: User, token: string, refreshToken: string) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      refreshAuth: (token: string, refreshToken: string) => {
        set({
          token,
          refreshToken,
          isLoading: false,
          error: null,
        });
      },

      // Acciones de estado
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error, isLoading: false });
      },

      clearError: () => {
        set({ error: null });
      },

      // Acciones de usuario
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      setUser: (user: User | null) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage', // Nombre para el almacenamiento persistente
      storage: createJSONStorage(() => {
        // En React Native, usamos AsyncStorage
        // Por ahora usamos localStorage para desarrollo
        // Para React Native, necesitarías importar AsyncStorage
        // import AsyncStorage from '@react-native-async-storage/async-storage';
        // return AsyncStorage;
        return {
          getItem: (_name: string) => Promise.resolve(null),
          setItem: (_name: string, _value: string) => Promise.resolve(),
          removeItem: (_name: string) => Promise.resolve(),
        };
      }),
      // Solo persistir ciertos campos
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectores útiles
export const useAuth = () => useAuthStore();
export const useUser = () => useAuthStore((state) => state.user);
export const useToken = () => useAuthStore((state) => state.token);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
