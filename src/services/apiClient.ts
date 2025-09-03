import apiClient, { ApiResponse } from '../lib/axios';

// Tipos de datos de ejemplo
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  createdAt: string;
  updatedAt: string;
}

export interface EnergyData {
  id: string;
  userId: string;
  consumption: number;
  production: number;
  timestamp: string;
  location: string;
  efficiency: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'member' | 'guest';
}

export interface CreateEnergyDataRequest {
  userId: string;
  consumption: number;
  production: number;
  location: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalEnergyConsumption: number;
  totalEnergyProduction: number;
  averageEfficiency: number;
  monthlyGrowth: number;
  activeUsers: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  userId?: string;
}

// Clase principal para servicios de API
class ApiService {
  // Users
  async getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>('/users', {
      params,
    });
    return response.data.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users', userData);
    return response.data.data;
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
    return response.data.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  // Energy Data
  async getEnergyData(params?: QueryParams & { userId?: string }): Promise<PaginatedResponse<EnergyData>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<EnergyData>>>('/energy-data', {
      params,
    });
    return response.data.data;
  }

  async getEnergyDataById(id: string): Promise<EnergyData> {
    const response = await apiClient.get<ApiResponse<EnergyData>>(`/energy-data/${id}`);
    return response.data.data;
  }

  async createEnergyData(data: CreateEnergyDataRequest): Promise<EnergyData> {
    const response = await apiClient.post<ApiResponse<EnergyData>>('/energy-data', data);
    return response.data.data;
  }

  async updateEnergyData(id: string, data: Partial<CreateEnergyDataRequest>): Promise<EnergyData> {
    const response = await apiClient.put<ApiResponse<EnergyData>>(`/energy-data/${id}`, data);
    return response.data.data;
  }

  async deleteEnergyData(id: string): Promise<void> {
    await apiClient.delete(`/energy-data/${id}`);
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data;
  }

  async getUserStats(userId: string): Promise<{
    totalConsumption: number;
    totalProduction: number;
    averageEfficiency: number;
    monthlyData: Array<{
      month: string;
      consumption: number;
      production: number;
    }>;
  }> {
    const response = await apiClient.get<ApiResponse<any>>(`/users/${userId}/stats`);
    return response.data.data;
  }

  // Auth (ejemplo básico)
  async login(credentials: { email: string; password: string }): Promise<{
    user: User;
    token: string;
    refreshToken: string;
  }> {
    const response = await apiClient.post<ApiResponse<{
      user: User;
      token: string;
      refreshToken: string;
    }>>('/auth/login', credentials);
    return response.data.data;
  }

  async register(userData: CreateUserRequest): Promise<{
    user: User;
    token: string;
    refreshToken: string;
  }> {
    const response = await apiClient.post<ApiResponse<{
      user: User;
      token: string;
      refreshToken: string;
    }>>('/auth/register', userData);
    return response.data.data;
  }

  async refreshToken(refreshToken: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
    const response = await apiClient.post<ApiResponse<{
      token: string;
      refreshToken: string;
    }>>('/auth/refresh', { refreshToken });
    return response.data.data;
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }

  // Health check
  async healthCheck(): Promise<{
    status: string;
    timestamp: string;
    version: string;
  }> {
    const response = await apiClient.get<ApiResponse<{
      status: string;
      timestamp: string;
      version: string;
    }>>('/health');
    return response.data.data;
  }
}

// Exportar instancia singleton
export const apiService = new ApiService();

// Query keys para React Query (actualizadas)
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: QueryParams) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    stats: (id: string) => [...queryKeys.users.detail(id), 'stats'] as const,
  },
  energyData: {
    all: ['energyData'] as const,
    lists: () => [...queryKeys.energyData.all, 'list'] as const,
    list: (filters: QueryParams) => [...queryKeys.energyData.lists(), { filters }] as const,
    details: () => [...queryKeys.energyData.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.energyData.details(), id] as const,
  },
  dashboard: {
    stats: ['dashboard', 'stats'] as const,
  },
  auth: {
    user: ['auth', 'user'] as const,
  },
  health: {
    check: ['health'] as const,
  },
};

// Los tipos ya están exportados arriba, no necesitamos re-exportarlos
