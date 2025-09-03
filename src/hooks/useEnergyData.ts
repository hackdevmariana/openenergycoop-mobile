import { useApiQuery, useApiMutation } from './useApi';
import { 
  apiService, 
  queryKeys, 
  CreateEnergyDataRequest,
  QueryParams
} from '../services/apiClient';

// Hook para obtener datos de energía con paginación
export function useEnergyData(params?: QueryParams & { userId?: string }) {
  return useApiQuery(
    queryKeys.energyData.list(params || {}),
    () => apiService.getEnergyData(params),
    {
      staleTime: 2 * 60 * 1000, // 2 minutos para datos de energía
      gcTime: 5 * 60 * 1000,
    }
  );
}

// Hook para obtener datos de energía de un usuario específico
export function useUserEnergyData(userId: string, params?: QueryParams) {
  return useApiQuery(
    queryKeys.energyData.list({ ...params, userId }),
    () => apiService.getEnergyData({ ...params, userId }),
    {
      enabled: !!userId,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    }
  );
}

// Hook para obtener un dato de energía específico
export function useEnergyDataById(id: string) {
  return useApiQuery(
    queryKeys.energyData.detail(id),
    () => apiService.getEnergyDataById(id),
    {
      enabled: !!id,
      staleTime: 2 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    }
  );
}

// Hook para crear datos de energía
export function useCreateEnergyData() {
  return useApiMutation(
    (data: CreateEnergyDataRequest) => apiService.createEnergyData(data),
    {
      invalidateQueries: [queryKeys.energyData.lists()],
      onSuccess: (data, variables) => {
        console.log('Datos de energía creados exitosamente:', data);
        // Invalidar también las queries específicas del usuario
        return [
          queryKeys.energyData.list({ userId: variables.userId }),
          queryKeys.users.stats(variables.userId)
        ];
      },
      onError: (error, _variables) => {
        console.error('Error al crear datos de energía:', error);
      },
    }
  );
}

// Hook para actualizar datos de energía
export function useUpdateEnergyData() {
  return useApiMutation(
    ({ id, data }: { id: string; data: Partial<CreateEnergyDataRequest> }) =>
      apiService.updateEnergyData(id, data),
    {
      invalidateQueries: [queryKeys.energyData.lists()],
      onSuccess: (data, variables) => {
        console.log('Datos de energía actualizados exitosamente:', data);
        // Invalidar también la query específica
        return [queryKeys.energyData.detail(variables.id)];
      },
      onError: (error, _variables) => {
        console.error('Error al actualizar datos de energía:', error);
      },
    }
  );
}

// Hook para eliminar datos de energía
export function useDeleteEnergyData() {
  return useApiMutation(
    (id: string) => apiService.deleteEnergyData(id),
    {
      invalidateQueries: [queryKeys.energyData.lists()],
      onSuccess: (_data, variables) => {
        console.log('Datos de energía eliminados exitosamente:', variables);
      },
      onError: (error, _variables) => {
        console.error('Error al eliminar datos de energía:', error);
      },
    }
  );
}
