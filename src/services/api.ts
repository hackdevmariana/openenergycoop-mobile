// Configuración base de la API
const API_BASE_URL = 'https://api.openenergycoop.com'; // Cambiar por tu URL real

// Tipos de datos de ejemplo
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
  createdAt: string;
}

export interface EnergyData {
  id: string;
  userId: string;
  consumption: number;
  production: number;
  timestamp: string;
  location: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: 'admin' | 'member' | 'guest';
}

// Función helper para manejar errores de API
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Servicios de API
export const apiService = {
  // Users
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleApiResponse<User[]>(response);
  },

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return handleApiResponse<User>(response);
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleApiResponse<User>(response);
  },

  async updateUser(id: string, userData: Partial<CreateUserRequest>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleApiResponse<User>(response);
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.status}`);
    }
  },

  // Energy Data
  async getEnergyData(userId?: string): Promise<EnergyData[]> {
    const url = userId 
      ? `${API_BASE_URL}/energy-data?userId=${userId}`
      : `${API_BASE_URL}/energy-data`;
    const response = await fetch(url);
    return handleApiResponse<EnergyData[]>(response);
  },

  async getEnergyDataById(id: string): Promise<EnergyData> {
    const response = await fetch(`${API_BASE_URL}/energy-data/${id}`);
    return handleApiResponse<EnergyData>(response);
  },

  async createEnergyData(data: Omit<EnergyData, 'id' | 'timestamp'>): Promise<EnergyData> {
    const response = await fetch(`${API_BASE_URL}/energy-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<EnergyData>(response);
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalEnergyConsumption: number;
    totalEnergyProduction: number;
    averageEfficiency: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    return handleApiResponse(response);
  },
};

// Query keys para React Query
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  energyData: {
    all: ['energyData'] as const,
    lists: () => [...queryKeys.energyData.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.energyData.lists(), { filters }] as const,
    details: () => [...queryKeys.energyData.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.energyData.details(), id] as const,
  },
  dashboard: {
    stats: ['dashboard', 'stats'] as const,
  },
};
