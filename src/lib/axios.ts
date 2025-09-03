import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { secureStore } from './secureStore';

// Configuración base de la API
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' // Desarrollo
  : 'https://api.openenergycoop.com'; // Producción

// Tipos para las respuestas de la API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  code?: string;
}

// Crear instancia de axios con configuración base
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': `OpenEnergyCoopMobile/${Platform.OS}`,
  },
});

// Interceptor de requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Log de requests en desarrollo
    if (__DEV__) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📦 Request Data:', config.data);
      }
    }

    // Agregar token de autenticación si existe
    const token = await secureStore.getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Interceptor de responses
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Log de responses en desarrollo
    if (__DEV__) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      console.log('📦 Response Data:', response.data);
    }

    // Manejar respuestas exitosas
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // Log de errores en desarrollo
    if (__DEV__) {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
    }

    // Manejar errores específicos
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Token expirado o inválido
          await handleUnauthorized();
          break;
        case 403:
          // Acceso denegado
          handleForbidden();
          break;
        case 404:
          // Recurso no encontrado
          handleNotFound();
          break;
        case 422:
          // Error de validación
          handleValidationError(data);
          break;
        case 500:
          // Error del servidor
          handleServerError();
          break;
        default:
          // Otros errores
          handleGenericError(error);
      }
    } else if (error.request) {
      // Error de red (sin respuesta del servidor)
      handleNetworkError(error);
    } else {
      // Error en la configuración de la request
      handleRequestError(error);
    }

    return Promise.reject(error);
  }
);

// Funciones de manejo de errores
async function handleUnauthorized(): Promise<void> {
  // Implementar lógica para manejar token expirado
  console.warn('🔐 Unauthorized: Token expirado o inválido');
  
  // Limpiar tokens de autenticación
  await secureStore.clearAuth();
  
  // Aquí podrías implementar la lógica para redirigir al login
  // Por ejemplo, usando un sistema de navegación global
  // redirectToLogin();
}

function handleForbidden(): void {
  console.warn('🚫 Forbidden: Acceso denegado');
  // Mostrar mensaje de acceso denegado
}

function handleNotFound(): void {
  console.warn('🔍 Not Found: Recurso no encontrado');
  // Mostrar mensaje de recurso no encontrado
}

function handleValidationError(data: ApiError): void {
  console.warn('📝 Validation Error:', data.errors);
  // Mostrar errores de validación específicos
}

function handleServerError(): void {
  console.error('💥 Server Error: Error interno del servidor');
  // Mostrar mensaje de error del servidor
}

function handleGenericError(_error: AxiosError): void {
  console.error('❌ Generic Error: Error genérico');
  // Mostrar mensaje de error genérico
}

function handleNetworkError(_error: AxiosError): void {
  console.error('🌐 Network Error: Sin conexión al servidor');
  // Mostrar mensaje de error de red
}

function handleRequestError(_error: AxiosError): void {
  console.error('⚙️ Request Error: Error en la configuración de la request');
  // Mostrar mensaje de error de configuración
}

// Exportar instancia configurada
export default apiClient;

// Exportar tipos útiles
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError };
