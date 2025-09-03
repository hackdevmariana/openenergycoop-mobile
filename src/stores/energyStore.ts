import { create } from 'zustand';
import { EnergyData, DashboardStats } from '../services/apiClient';

// Tipos para el estado de energía
export interface EnergyState {
  // Datos de energía
  energyData: EnergyData[];
  currentEnergyData: EnergyData | null;
  
  // Estadísticas
  dashboardStats: DashboardStats | null;
  userStats: {
    totalConsumption: number;
    totalProduction: number;
    averageEfficiency: number;
    monthlyData: Array<{
      month: string;
      consumption: number;
      production: number;
    }>;
  } | null;
  
  // Estado de carga
  isLoading: boolean;
  isLoadingStats: boolean;
  isLoadingUserStats: boolean;
  
  // Estado de error
  error: string | null;
  statsError: string | null;
  userStatsError: string | null;
  
  // Filtros y paginación
  filters: {
    userId?: string;
    dateFrom?: string;
    dateTo?: string;
    location?: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  
  // Estado de sincronización
  lastSync: number | null;
  isSyncing: boolean;
}

// Tipos para las acciones
export interface EnergyActions {
  // Acciones de datos de energía
  setEnergyData: (data: EnergyData[]) => void;
  addEnergyData: (data: EnergyData) => void;
  updateEnergyData: (id: string, data: Partial<EnergyData>) => void;
  removeEnergyData: (id: string) => void;
  setCurrentEnergyData: (data: EnergyData | null) => void;
  
  // Acciones de estadísticas
  setDashboardStats: (stats: DashboardStats) => void;
  setUserStats: (stats: EnergyState['userStats']) => void;
  
  // Acciones de estado de carga
  setLoading: (loading: boolean) => void;
  setLoadingStats: (loading: boolean) => void;
  setLoadingUserStats: (loading: boolean) => void;
  
  // Acciones de error
  setError: (error: string | null) => void;
  setStatsError: (error: string | null) => void;
  setUserStatsError: (error: string | null) => void;
  clearErrors: () => void;
  
  // Acciones de filtros y paginación
  setFilters: (filters: Partial<EnergyState['filters']>) => void;
  clearFilters: () => void;
  setPagination: (pagination: Partial<EnergyState['pagination']>) => void;
  resetPagination: () => void;
  
  // Acciones de sincronización
  setLastSync: (timestamp: number) => void;
  setSyncing: (syncing: boolean) => void;
  
  // Acciones de utilidad
  reset: () => void;
}

// Tipo combinado para el store
export type EnergyStore = EnergyState & EnergyActions;

// Estado inicial
const initialState: EnergyState = {
  energyData: [],
  currentEnergyData: null,
  dashboardStats: null,
  userStats: null,
  isLoading: false,
  isLoadingStats: false,
  isLoadingUserStats: false,
  error: null,
  statsError: null,
  userStatsError: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  lastSync: null,
  isSyncing: false,
};

// Store de energía
export const useEnergyStore = create<EnergyStore>()((set, get) => ({
  ...initialState,

  // Acciones de datos de energía
  setEnergyData: (data: EnergyData[]) => {
    set({ energyData: data });
  },

  addEnergyData: (data: EnergyData) => {
    const { energyData } = get();
    set({ energyData: [data, ...energyData] });
  },

  updateEnergyData: (id: string, data: Partial<EnergyData>) => {
    const { energyData } = get();
    set({
      energyData: energyData.map(item =>
        item.id === id ? { ...item, ...data } : item
      ),
    });
  },

  removeEnergyData: (id: string) => {
    const { energyData } = get();
    set({
      energyData: energyData.filter(item => item.id !== id),
    });
  },

  setCurrentEnergyData: (data: EnergyData | null) => {
    set({ currentEnergyData: data });
  },

  // Acciones de estadísticas
  setDashboardStats: (stats: DashboardStats) => {
    set({ dashboardStats: stats });
  },

  setUserStats: (stats: EnergyState['userStats']) => {
    set({ userStats: stats });
  },

  // Acciones de estado de carga
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setLoadingStats: (loading: boolean) => {
    set({ isLoadingStats: loading });
  },

  setLoadingUserStats: (loading: boolean) => {
    set({ isLoadingUserStats: loading });
  },

  // Acciones de error
  setError: (error: string | null) => {
    set({ error, isLoading: false });
  },

  setStatsError: (error: string | null) => {
    set({ statsError: error, isLoadingStats: false });
  },

  setUserStatsError: (error: string | null) => {
    set({ userStatsError: error, isLoadingUserStats: false });
  },

  clearErrors: () => {
    set({ 
      error: null, 
      statsError: null, 
      userStatsError: null 
    });
  },

  // Acciones de filtros y paginación
  setFilters: (newFilters: Partial<EnergyState['filters']>) => {
    const { filters } = get();
    set({ 
      filters: { ...filters, ...newFilters },
      pagination: { ...initialState.pagination }, // Reset paginación al cambiar filtros
    });
  },

  clearFilters: () => {
    set({ 
      filters: {},
      pagination: { ...initialState.pagination },
    });
  },

  setPagination: (newPagination: Partial<EnergyState['pagination']>) => {
    const { pagination } = get();
    set({ pagination: { ...pagination, ...newPagination } });
  },

  resetPagination: () => {
    set({ pagination: { ...initialState.pagination } });
  },

  // Acciones de sincronización
  setLastSync: (timestamp: number) => {
    set({ lastSync: timestamp });
  },

  setSyncing: (syncing: boolean) => {
    set({ isSyncing: syncing });
  },

  // Acciones de utilidad
  reset: () => {
    set(initialState);
  },
}));

// Selectores útiles
export const useEnergy = () => useEnergyStore();
export const useEnergyData = () => useEnergyStore((state) => state.energyData);
export const useCurrentEnergyData = () => useEnergyStore((state) => state.currentEnergyData);
export const useDashboardStats = () => useEnergyStore((state) => state.dashboardStats);
export const useUserStats = () => useEnergyStore((state) => state.userStats);
export const useEnergyLoading = () => useEnergyStore((state) => state.isLoading);
export const useEnergyError = () => useEnergyStore((state) => state.error);
export const useEnergyFilters = () => useEnergyStore((state) => state.filters);
export const useEnergyPagination = () => useEnergyStore((state) => state.pagination);
export const useLastSync = () => useEnergyStore((state) => state.lastSync);
export const useIsSyncing = () => useEnergyStore((state) => state.isSyncing);

// Selectores computados
export const useFilteredEnergyData = () => useEnergyStore((state) => {
  const { energyData, filters } = state;
  let filtered = energyData;

  if (filters.userId) {
    filtered = filtered.filter(item => item.userId === filters.userId);
  }

  if (filters.location) {
    filtered = filtered.filter(item => 
      item.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.dateFrom) {
    filtered = filtered.filter(item => 
      new Date(item.timestamp) >= new Date(filters.dateFrom!)
    );
  }

  if (filters.dateTo) {
    filtered = filtered.filter(item => 
      new Date(item.timestamp) <= new Date(filters.dateTo!)
    );
  }

  return filtered;
});

export const useEnergyDataByUser = (userId: string) => useEnergyStore((state) => 
  state.energyData.filter(item => item.userId === userId)
);

export const useTotalConsumption = () => useEnergyStore((state) => 
  state.energyData.reduce((total, item) => total + item.consumption, 0)
);

export const useTotalProduction = () => useEnergyStore((state) => 
  state.energyData.reduce((total, item) => total + item.production, 0)
);

export const useAverageEfficiency = () => useEnergyStore((state) => {
  const { energyData } = state;
  if (energyData.length === 0) return 0;
  
  const totalEfficiency = energyData.reduce((total, item) => total + item.efficiency, 0);
  return totalEfficiency / energyData.length;
});
