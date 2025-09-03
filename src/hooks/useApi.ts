import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Tipos básicos para las respuestas de API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Hook genérico para GET requests
export function useApiQuery<T>(
  queryKey: readonly unknown[],
  fetchFn: () => Promise<T>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
    retry?: number;
    retryDelay?: number;
  }
) {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
  });
}

// Hook genérico para POST/PUT/DELETE requests
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: ApiError, variables: TVariables) => void;
    invalidateQueries?: (readonly unknown[])[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas si se especifican
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      options?.onSuccess?.(data, variables);
    },
    onError: (error: ApiError, variables) => {
      options?.onError?.(error, variables);
    },
  });
}

// Hook para invalidar queries específicas
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidate: (queryKey: readonly unknown[]) => {
      queryClient.invalidateQueries({ queryKey });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries();
    },
  };
}

// Hook para prefetch de datos
export function usePrefetchQuery() {
  const queryClient = useQueryClient();

  return {
    prefetch: <T>(
      queryKey: readonly unknown[],
      fetchFn: () => Promise<T>
    ) => {
      queryClient.prefetchQuery({
        queryKey,
        queryFn: fetchFn,
      });
    },
  };
}
