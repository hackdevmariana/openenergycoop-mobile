import { Platform, Dimensions } from 'react-native';

// Configuración para react-native-maps
export const MAPS_CONFIG = {
  // Configuración básica
  basic: {
    enabled: true,
    version: '1.26.0',
    platform: {
      ios: {
        supported: true,
        minVersion: '12.0',
        requiresLocationPermission: true,
      },
      android: {
        supported: true,
        minVersion: '21',
        requiresLocationPermission: true,
      },
    },
  },

  // Configuración de proveedores de mapas
  providers: {
    // Google Maps
    google: {
      enabled: true,
      apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
      region: 'ES', // España
      language: 'es',
      units: 'metric',
    },

    // Apple Maps (iOS)
    apple: {
      enabled: Platform.OS === 'ios',
      region: 'ES',
      language: 'es',
      units: 'metric',
    },

    // OpenStreetMap (fallback)
    openstreetmap: {
      enabled: true,
      region: 'ES',
      language: 'es',
      units: 'metric',
    },
  },

  // Configuración de ubicaciones de energía
  energyLocations: {
    // Tipos de instalaciones de energía
    types: {
      solar: {
        icon: 'solar-panel',
        color: '#FFD700',
        size: 30,
        title: 'Instalación Solar',
        description: 'Planta de energía solar',
      },
      wind: {
        icon: 'wind-turbine',
        color: '#87CEEB',
        size: 30,
        title: 'Parque Eólico',
        description: 'Parque de energía eólica',
      },
      hydro: {
        icon: 'water-dam',
        color: '#4169E1',
        size: 30,
        title: 'Central Hidroeléctrica',
        description: 'Central de energía hidráulica',
      },
      nuclear: {
        icon: 'nuclear-plant',
        color: '#FF6347',
        size: 30,
        title: 'Central Nuclear',
        description: 'Central de energía nuclear',
      },
      coal: {
        icon: 'coal-plant',
        color: '#696969',
        size: 30,
        title: 'Central Térmica',
        description: 'Central de carbón',
      },
      gas: {
        icon: 'gas-plant',
        color: '#FFA500',
        size: 30,
        title: 'Central de Gas',
        description: 'Central de gas natural',
      },
      biomass: {
        icon: 'biomass-plant',
        color: '#228B22',
        size: 30,
        title: 'Central de Biomasa',
        description: 'Central de energía de biomasa',
      },
      geothermal: {
        icon: 'geothermal-plant',
        color: '#8B4513',
        size: 30,
        title: 'Central Geotérmica',
        description: 'Central de energía geotérmica',
      },
    },

    // Configuración de marcadores
    markers: {
      default: {
        size: 25,
        color: '#007AFF',
        opacity: 0.8,
        draggable: false,
        flat: false,
      },
      selected: {
        size: 35,
        color: '#FF3B30',
        opacity: 1.0,
        draggable: false,
        flat: false,
      },
      cluster: {
        size: 40,
        color: '#34C759',
        opacity: 0.9,
        draggable: false,
        flat: false,
      },
    },

    // Configuración de clusters
    clustering: {
      enabled: true,
      radius: 50,
      minPoints: 3,
      maxZoom: 15,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomOnClick: true,
    },
  },

  // Configuración de regiones y límites
  regions: {
    // España
    spain: {
      latitude: 40.4168,
      longitude: -3.7038,
      latitudeDelta: 10,
      longitudeDelta: 10,
      title: 'España',
    },

    // Madrid
    madrid: {
      latitude: 40.4168,
      longitude: -3.7038,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      title: 'Madrid',
    },

    // Barcelona
    barcelona: {
      latitude: 41.3851,
      longitude: 2.1734,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      title: 'Barcelona',
    },

    // Valencia
    valencia: {
      latitude: 39.4699,
      longitude: -0.3763,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      title: 'Valencia',
    },

    // Sevilla
    sevilla: {
      latitude: 37.3891,
      longitude: -5.9845,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      title: 'Sevilla',
    },

    // Bilbao
    bilbao: {
      latitude: 43.2627,
      longitude: -2.9253,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      title: 'Bilbao',
    },
  },

  // Configuración de mapas
  maps: {
    // Configuración por defecto del mapa
    default: {
      showsUserLocation: true,
      showsMyLocationButton: true,
      showsCompass: true,
      showsScale: true,
      showsTraffic: false,
      showsBuildings: true,
      showsIndoors: true,
      mapType: 'standard', // 'standard' | 'satellite' | 'hybrid' | 'terrain'
      userTrackingMode: 'none', // 'none' | 'follow' | 'followWithHeading'
    },

    // Configuración de estilos de mapa
    styles: {
      // Estilo estándar
      standard: {
        mapType: 'standard',
        customMapStyle: null,
      },

      // Estilo satélite
      satellite: {
        mapType: 'satellite',
        customMapStyle: null,
      },

      // Estilo híbrido
      hybrid: {
        mapType: 'hybrid',
        customMapStyle: null,
      },

      // Estilo terreno
      terrain: {
        mapType: 'terrain',
        customMapStyle: null,
      },

      // Estilo personalizado para energía
      energy: {
        mapType: 'standard',
        customMapStyle: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#a2daf2' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#90EE90' }],
          },
        ],
      },
    },

    // Configuración de animaciones
    animations: {
      // Animación de zoom
      zoom: {
        duration: 1000,
        easing: 'easeInOut',
      },

      // Animación de movimiento
      move: {
        duration: 500,
        easing: 'easeInOut',
      },

      // Animación de seguimiento
      follow: {
        duration: 300,
        easing: 'easeInOut',
      },
    },
  },

  // Configuración de geolocalización
  geolocation: {
    // Configuración de precisión
    accuracy: {
      high: {
        accuracy: 'high',
        distanceFilter: 10,
        timeInterval: 5000,
      },
      medium: {
        accuracy: 'balanced',
        distanceFilter: 50,
        timeInterval: 10000,
      },
      low: {
        accuracy: 'low',
        distanceFilter: 100,
        timeInterval: 30000,
      },
    },

    // Configuración de permisos
    permissions: {
      ios: {
        whenInUse: 'whenInUse',
        always: 'always',
        never: 'never',
      },
      android: {
        fine: 'fine',
        coarse: 'coarse',
        none: 'none',
      },
    },

    // Configuración de seguimiento
    tracking: {
      enabled: true,
      background: false,
      significantChanges: false,
      pausesLocationUpdatesAutomatically: true,
      showsBackgroundLocationIndicator: true,
    },
  },

  // Configuración de rutas y navegación
  routing: {
    // Proveedores de rutas
    providers: {
      google: {
        enabled: true,
        apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
        mode: 'driving', // 'driving' | 'walking' | 'bicycling' | 'transit'
        avoid: [], // ['tolls', 'highways', 'ferries']
        units: 'metric',
      },
      apple: {
        enabled: Platform.OS === 'ios',
        mode: 'automobile',
        avoid: [],
        units: 'metric',
      },
    },

    // Configuración de rutas de energía
    energyRoutes: {
      // Ruta a instalación más cercana
      nearestInstallation: {
        enabled: true,
        maxDistance: 50000, // 50km
        transportMode: 'driving',
        avoidTolls: true,
        avoidHighways: false,
      },

      // Ruta de mantenimiento
      maintenance: {
        enabled: true,
        maxDistance: 100000, // 100km
        transportMode: 'driving',
        avoidTolls: false,
        avoidHighways: false,
      },

      // Ruta de inspección
      inspection: {
        enabled: true,
        maxDistance: 200000, // 200km
        transportMode: 'driving',
        avoidTolls: false,
        avoidHighways: false,
      },
    },
  },

  // Configuración de polígonos y áreas
  polygons: {
    // Configuración de áreas de cobertura
    coverage: {
      solar: {
        color: '#FFD700',
        fillColor: '#FFD700',
        strokeWidth: 2,
        opacity: 0.3,
        fillOpacity: 0.1,
      },
      wind: {
        color: '#87CEEB',
        fillColor: '#87CEEB',
        strokeWidth: 2,
        opacity: 0.3,
        fillOpacity: 0.1,
      },
      hydro: {
        color: '#4169E1',
        fillColor: '#4169E1',
        strokeWidth: 2,
        opacity: 0.3,
        fillOpacity: 0.1,
      },
    },

    // Configuración de zonas de exclusión
    exclusion: {
      color: '#FF3B30',
      fillColor: '#FF3B30',
      strokeWidth: 3,
      opacity: 0.5,
      fillOpacity: 0.2,
    },

    // Configuración de zonas de interés
    interest: {
      color: '#34C759',
      fillColor: '#34C759',
      strokeWidth: 2,
      opacity: 0.4,
      fillOpacity: 0.15,
    },
  },

  // Configuración de líneas y rutas
  polylines: {
    // Configuración de líneas de transmisión
    transmission: {
      color: '#FF9500',
      width: 3,
      opacity: 0.8,
      geodesic: true,
      zIndex: 1,
    },

    // Configuración de rutas de distribución
    distribution: {
      color: '#007AFF',
      width: 2,
      opacity: 0.6,
      geodesic: false,
      zIndex: 2,
    },

    // Configuración de rutas de mantenimiento
    maintenance: {
      color: '#FF3B30',
      width: 4,
      opacity: 0.7,
      geodesic: true,
      zIndex: 3,
    },
  },

  // Configuración de círculos
  circles: {
    // Configuración de radio de cobertura
    coverage: {
      color: '#34C759',
      fillColor: '#34C759',
      strokeWidth: 2,
      opacity: 0.3,
      fillOpacity: 0.1,
    },

    // Configuración de zona de influencia
    influence: {
      color: '#FF9500',
      fillColor: '#FF9500',
      strokeWidth: 1,
      opacity: 0.2,
      fillOpacity: 0.05,
    },

    // Configuración de zona de seguridad
    safety: {
      color: '#FF3B30',
      fillColor: '#FF3B30',
      strokeWidth: 3,
      opacity: 0.4,
      fillOpacity: 0.15,
    },
  },

  // Configuración de overlays personalizados
  overlays: {
    // Configuración de capas de calor
    heatmap: {
      enabled: true,
      radius: 50,
      opacity: 0.7,
      gradient: {
        colors: ['#00FF00', '#FFFF00', '#FF0000'],
        locations: [0, 0.5, 1],
      },
    },

    // Configuración de capas de densidad
    density: {
      enabled: true,
      radius: 100,
      opacity: 0.5,
      gradient: {
        colors: ['#0000FF', '#00FFFF', '#FFFFFF'],
        locations: [0, 0.5, 1],
      },
    },
  },

  // Configuración de eventos
  events: {
    // Configuración de eventos de marcadores
    markers: {
      onPress: true,
      onCalloutPress: true,
      onDragStart: false,
      onDrag: false,
      onDragEnd: false,
    },

    // Configuración de eventos de mapa
    map: {
      onPress: true,
      onLongPress: true,
      onRegionChange: true,
      onRegionChangeComplete: true,
      onUserLocationChange: true,
      onMapReady: true,
    },

    // Configuración de eventos de polígonos
    polygons: {
      onPress: true,
      onDragStart: false,
      onDrag: false,
      onDragEnd: false,
    },

    // Configuración de eventos de líneas
    polylines: {
      onPress: true,
      onDragStart: false,
      onDrag: false,
      onDragEnd: false,
    },

    // Configuración de eventos de círculos
    circles: {
      onPress: true,
      onDragStart: false,
      onDrag: false,
      onDragEnd: false,
    },
  },

  // Configuración de performance
  performance: {
    // Configuración de caché
    cache: {
      enabled: true,
      maxSize: 100, // Número máximo de elementos en caché
      expiration: 300000, // 5 minutos en ms
    },

    // Configuración de renderizado
    rendering: {
      maxZoom: 20,
      minZoom: 1,
      tileSize: 256,
      maxTiles: 1000,
    },

    // Configuración de memoria
    memory: {
      maxMarkers: 1000,
      maxPolygons: 100,
      maxPolylines: 50,
      maxCircles: 50,
    },
  },

  // Configuración de accesibilidad
  accessibility: {
    enabled: true,
    features: {
      screenReader: true,
      voiceOver: true,
      talkBack: true,
      highContrast: true,
      largeText: true,
    },
    announcements: {
      mapLoaded: 'Mapa cargado',
      locationFound: 'Ubicación encontrada',
      markerSelected: 'Marcador seleccionado',
      routeCalculated: 'Ruta calculada',
    },
  },

  // Configuración de debugging
  debugging: {
    enabled: false,
    features: {
      showCoordinates: false,
      showRegion: false,
      showMarkers: false,
      showPolygons: false,
      showPolylines: false,
      showCircles: false,
    },
    logging: {
      level: 'error', // 'debug' | 'info' | 'warn' | 'error'
      includeTimestamps: true,
      includePerformance: false,
    },
  },
};

// Configuraciones específicas por plataforma
export const PLATFORM_MAPS_CONFIG = {
  ios: {
    ...MAPS_CONFIG,
    providers: {
      ...MAPS_CONFIG.providers,
      apple: {
        ...MAPS_CONFIG.providers.apple,
        enabled: true,
      },
    },
    geolocation: {
      ...MAPS_CONFIG.geolocation,
      permissions: {
        ...MAPS_CONFIG.geolocation.permissions,
        ios: {
          whenInUse: 'whenInUse',
          always: 'always',
          never: 'never',
        },
      },
    },
  },
  android: {
    ...MAPS_CONFIG,
    providers: {
      ...MAPS_CONFIG.providers,
      apple: {
        ...MAPS_CONFIG.providers.apple,
        enabled: false,
      },
    },
    geolocation: {
      ...MAPS_CONFIG.geolocation,
      permissions: {
        ...MAPS_CONFIG.geolocation.permissions,
        android: {
          fine: 'fine',
          coarse: 'coarse',
          none: 'none',
        },
      },
    },
  },
};

// Configuraciones específicas por tamaño de pantalla
export const SCREEN_SIZE_MAPS_CONFIG = {
  small: {
    ...MAPS_CONFIG,
    maps: {
      ...MAPS_CONFIG.maps,
      default: {
        ...MAPS_CONFIG.maps.default,
        showsScale: false,
        showsCompass: false,
      },
    },
    energyLocations: {
      ...MAPS_CONFIG.energyLocations,
      markers: {
        ...MAPS_CONFIG.energyLocations.markers,
        default: {
          ...MAPS_CONFIG.energyLocations.markers.default,
          size: 20,
        },
        selected: {
          ...MAPS_CONFIG.energyLocations.markers.selected,
          size: 25,
        },
      },
    },
  },
  medium: {
    ...MAPS_CONFIG,
    maps: {
      ...MAPS_CONFIG.maps,
      default: {
        ...MAPS_CONFIG.maps.default,
        showsScale: true,
        showsCompass: true,
      },
    },
  },
  large: {
    ...MAPS_CONFIG,
    maps: {
      ...MAPS_CONFIG.maps,
      default: {
        ...MAPS_CONFIG.maps.default,
        showsScale: true,
        showsCompass: true,
        showsTraffic: true,
      },
    },
    energyLocations: {
      ...MAPS_CONFIG.energyLocations,
      markers: {
        ...MAPS_CONFIG.energyLocations.markers,
        default: {
          ...MAPS_CONFIG.energyLocations.markers.default,
          size: 30,
        },
        selected: {
          ...MAPS_CONFIG.energyLocations.markers.selected,
          size: 40,
        },
      },
    },
  },
};

// Función para obtener configuración según plataforma
export const getPlatformMapsConfig = () => {
  return PLATFORM_MAPS_CONFIG[Platform.OS] || MAPS_CONFIG;
};

// Función para obtener configuración según tamaño de pantalla
export const getScreenSizeMapsConfig = () => {
  const { width } = Dimensions.get('window');
  if (width < 768) return SCREEN_SIZE_MAPS_CONFIG.small;
  if (width < 1024) return SCREEN_SIZE_MAPS_CONFIG.medium;
  return SCREEN_SIZE_MAPS_CONFIG.large;
};

// Función para obtener configuración completa
export const getCompleteMapsConfig = () => {
  const platformConfig = getPlatformMapsConfig();
  const screenSizeConfig = getScreenSizeMapsConfig();
  
  return {
    ...platformConfig,
    maps: {
      ...platformConfig.maps,
      ...screenSizeConfig.maps,
    },
    energyLocations: {
      ...platformConfig.energyLocations,
      ...screenSizeConfig.energyLocations,
    },
  };
};

// Exportar configuración por defecto
export const mapsConfig = getCompleteMapsConfig();
