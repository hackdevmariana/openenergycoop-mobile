import AsyncStorage from '@react-native-async-storage/async-storage';
import { DYNAMIC_CONTENT_CONFIG } from '../config/splashScreen';

// Tipos para contenido dinámico
export interface DynamicContent {
  id: string;
  type: 'splash_screen' | 'notification' | 'banner';
  title: string;
  message: string;
  icon: string;
  colors: {
    background: string;
    primary: string;
    secondary: string;
    text: string;
  };
  startDate: string;
  endDate: string;
  priority: number;
  conditions?: {
    countries?: string[];
    regions?: string[];
    userSegments?: string[];
  };
  metadata?: {
    event?: string;
    description?: string;
    tags?: string[];
  };
}

// Tipos para eventos especiales
export interface SpecialEvent {
  id: string;
  name: string;
  type: 'sports' | 'national' | 'cultural' | 'environmental' | 'custom';
  startDate: string;
  endDate: string;
  priority: number;
  content: DynamicContent;
  isActive: boolean;
}

// Configuración del servicio
const DYNAMIC_CONTENT_SERVICE_CONFIG = {
  // API endpoints
  endpoints: {
    splashContent: '/api/splash-content',
    specialEvents: '/api/special-events',
    userPreferences: '/api/user-preferences',
  },
  
  // Configuración de caché
  cache: {
    splashContent: {
      key: 'splash_content_cache',
      duration: 30 * 60 * 1000, // 30 minutos
    },
    specialEvents: {
      key: 'special_events_cache',
      duration: 60 * 60 * 1000, // 1 hora
    },
  },
  
  // Configuración de fallback
  fallback: {
    enabled: true,
    content: {
      icon: '⚡',
      message: 'Energía renovable para todos',
      colors: {
        background: '#FFFFFF',
        primary: '#007AFF',
        secondary: '#34C759',
        text: '#000000',
      },
    },
  },
};

// Servicio principal
class DynamicContentService {
  private baseUrl: string;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor() {
    this.baseUrl = DYNAMIC_CONTENT_CONFIG.api.baseUrl;
    this.cache = new Map();
  }

  // Obtener contenido dinámico del splash screen
  async getSplashContent(): Promise<DynamicContent | null> {
    try {
      // Verificar caché local
      const cachedContent = await this.getCachedContent('splash_content');
      if (cachedContent) {
        return cachedContent;
      }

      // Obtener contenido remoto
      const response = await fetch(`${this.baseUrl}${DYNAMIC_CONTENT_SERVICE_CONFIG.endpoints.splashContent}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: DYNAMIC_CONTENT_CONFIG.api.timeout,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Filtrar contenido activo
      const activeContent = this.filterActiveContent(data.content);
      
      if (activeContent) {
        // Guardar en caché
        await this.setCachedContent('splash_content', activeContent);
        return activeContent;
      }

      return null;
    } catch (error) {
      console.error('❌ Error obteniendo contenido dinámico:', error);
      
      // Retornar contenido de fallback
      if (DYNAMIC_CONTENT_SERVICE_CONFIG.fallback.enabled) {
        return {
          id: 'fallback',
          type: 'splash_screen',
          title: 'OpenEnergyCoop',
          message: DYNAMIC_CONTENT_SERVICE_CONFIG.fallback.content.message,
          icon: DYNAMIC_CONTENT_SERVICE_CONFIG.fallback.content.icon,
          colors: DYNAMIC_CONTENT_SERVICE_CONFIG.fallback.content.colors,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          priority: 0,
        };
      }

      return null;
    }
  }

  // Obtener eventos especiales
  async getSpecialEvents(): Promise<SpecialEvent[]> {
    try {
      // Verificar caché local
      const cachedEvents = await this.getCachedContent('special_events');
      if (cachedEvents) {
        return cachedEvents;
      }

      // Obtener eventos remotos
      const response = await fetch(`${this.baseUrl}${DYNAMIC_CONTENT_SERVICE_CONFIG.endpoints.specialEvents}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: DYNAMIC_CONTENT_CONFIG.api.timeout,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Filtrar eventos activos
      const activeEvents = data.events.filter((event: SpecialEvent) => {
        const now = new Date();
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        return event.isActive && now >= startDate && now <= endDate;
      });

      // Ordenar por prioridad
      activeEvents.sort((a: SpecialEvent, b: SpecialEvent) => b.priority - a.priority);

      // Guardar en caché
      await this.setCachedContent('special_events', activeEvents);
      
      return activeEvents;
    } catch (error) {
      console.error('❌ Error obteniendo eventos especiales:', error);
      return [];
    }
  }

  // Obtener el evento especial más relevante
  async getMostRelevantEvent(userCountry?: string, userRegion?: string): Promise<SpecialEvent | null> {
    try {
      const events = await this.getSpecialEvents();
      
      if (events.length === 0) {
        return null;
      }

      // Filtrar por país/región si se especifica
      let relevantEvents = events;
      
      if (userCountry) {
        relevantEvents = events.filter(event => 
          !event.content.conditions?.countries || 
          event.content.conditions.countries.includes(userCountry)
        );
      }

      if (userRegion && relevantEvents.length > 0) {
        relevantEvents = relevantEvents.filter(event => 
          !event.content.conditions?.regions || 
          event.content.conditions.regions.includes(userRegion)
        );
      }

      // Retornar el evento con mayor prioridad
      return relevantEvents.length > 0 ? relevantEvents[0] : events[0];
    } catch (error) {
      console.error('❌ Error obteniendo evento más relevante:', error);
      return null;
    }
  }

  // Crear evento especial manualmente (para casos como campeonatos)
  async createManualEvent(event: Omit<SpecialEvent, 'id'>): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}${DYNAMIC_CONTENT_SERVICE_CONFIG.endpoints.specialEvents}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          id: `manual_${Date.now()}`,
          isActive: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Limpiar caché para forzar actualización
      await this.clearCache('special_events');
      
      return true;
    } catch (error) {
      console.error('❌ Error creando evento manual:', error);
      return false;
    }
  }

  // Ejemplo: Crear evento para victoria de España
  async createSpainVictoryEvent(): Promise<boolean> {
    const victoryEvent: Omit<SpecialEvent, 'id'> = {
      name: '¡España Campeona!',
      type: 'sports',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 semana
      priority: 100, // Máxima prioridad
      isActive: true,
      content: {
        id: 'spain_victory_splash',
        type: 'splash_screen',
        title: '¡España Campeona!',
        message: 'Celebrando la victoria con energía renovable',
        icon: '🏆',
        colors: {
          background: '#FFD700', // Dorado
          primary: '#FF0000', // Rojo español
          secondary: '#FFD700', // Dorado
          text: '#000000',
        },
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 100,
        conditions: {
          countries: ['ES', 'ESP'], // España
        },
        metadata: {
          event: 'spain_victory',
          description: 'Celebración de la victoria de España',
          tags: ['sports', 'victory', 'spain', 'championship'],
        },
      },
    };

    return await this.createManualEvent(victoryEvent);
  }

  // Ejemplo: Crear evento para Día de la Hispanidad
  async createHispanicDayEvent(): Promise<boolean> {
    const hispanicEvent: Omit<SpecialEvent, 'id'> = {
      name: 'Día de la Hispanidad',
      type: 'cultural',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 día
      priority: 80,
      isActive: true,
      content: {
        id: 'hispanic_day_splash',
        type: 'splash_screen',
        title: 'Día de la Hispanidad',
        message: 'Uniendo culturas con energía sostenible',
        icon: '🌍',
        colors: {
          background: '#FFD700',
          primary: '#FF0000',
          secondary: '#FFD700',
          text: '#000000',
        },
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        priority: 80,
        conditions: {
          countries: ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR', 'GF', 'PE', 'BR', 'CU', 'DO', 'GT', 'HN', 'NI', 'PA', 'CR', 'SV', 'BZ', 'GY', 'SR', 'GF'],
        },
        metadata: {
          event: 'hispanic_day',
          description: 'Celebración del Día de la Hispanidad',
          tags: ['cultural', 'hispanic', 'celebration'],
        },
      },
    };

    return await this.createManualEvent(hispanicEvent);
  }

  // Gestión de caché
  private async getCachedContent(key: string): Promise<any | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // Verificar si el caché ha expirado
        const cacheConfig = DYNAMIC_CONTENT_SERVICE_CONFIG.cache[key as keyof typeof DYNAMIC_CONTENT_SERVICE_CONFIG.cache];
        if (now - timestamp < cacheConfig.duration) {
          return data;
        }
      }
      return null;
    } catch (error) {
      console.error('❌ Error obteniendo caché:', error);
      return null;
    }
  }

  private async setCachedContent(key: string, data: any): Promise<void> {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('❌ Error guardando caché:', error);
    }
  }

  private async clearCache(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('❌ Error limpiando caché:', error);
    }
  }

  // Filtrar contenido activo
  private filterActiveContent(content: DynamicContent[]): DynamicContent | null {
    const now = new Date();
    
    const activeContent = content.filter(item => {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      return now >= startDate && now <= endDate;
    });

    if (activeContent.length === 0) {
      return null;
    }

    // Retornar el contenido con mayor prioridad
    return activeContent.sort((a, b) => b.priority - a.priority)[0];
  }

  // Verificar conectividad
  private async checkConnectivity(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Sincronizar contenido cuando hay conexión
  async syncContent(): Promise<void> {
    try {
      const isConnected = await this.checkConnectivity();
      if (isConnected) {
        // Forzar actualización de contenido
        await this.clearCache('splash_content');
        await this.clearCache('special_events');
        
        // Obtener contenido actualizado
        await this.getSplashContent();
        await this.getSpecialEvents();
      }
    } catch (error) {
      console.error('❌ Error sincronizando contenido:', error);
    }
  }
}

// Instancia singleton
export const dynamicContentService = new DynamicContentService();

// Hook para usar el servicio
export const useDynamicContent = () => {
  const [splashContent, setSplashContent] = useState<DynamicContent | null>(null);
  const [specialEvents, setSpecialEvents] = useState<SpecialEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSplashContent = async () => {
    setIsLoading(true);
    try {
      const content = await dynamicContentService.getSplashContent();
      setSplashContent(content);
    } catch (error) {
      console.error('❌ Error cargando contenido del splash:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSpecialEvents = async () => {
    setIsLoading(true);
    try {
      const events = await dynamicContentService.getSpecialEvents();
      setSpecialEvents(events);
    } catch (error) {
      console.error('❌ Error cargando eventos especiales:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createVictoryEvent = async () => {
    setIsLoading(true);
    try {
      const success = await dynamicContentService.createSpainVictoryEvent();
      if (success) {
        await loadSpecialEvents(); // Recargar eventos
      }
      return success;
    } catch (error) {
      console.error('❌ Error creando evento de victoria:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const syncContent = async () => {
    await dynamicContentService.syncContent();
    await loadSplashContent();
    await loadSpecialEvents();
  };

  return {
    splashContent,
    specialEvents,
    isLoading,
    loadSplashContent,
    loadSpecialEvents,
    createVictoryEvent,
    syncContent,
  };
};
