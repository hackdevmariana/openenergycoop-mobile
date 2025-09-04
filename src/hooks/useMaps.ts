import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Platform, Dimensions, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { mapsConfig, getPlatformMapsConfig, getScreenSizeMapsConfig } from '../config/maps';

// Tipos para el hook de mapas
export interface MapLocation {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

export interface EnergyInstallation {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'coal' | 'gas' | 'biomass' | 'geothermal';
  location: MapLocation;
  capacity: number; // MW
  status: 'active' | 'inactive' | 'maintenance' | 'construction';
  description?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  data?: {
    currentOutput: number;
    efficiency: number;
    lastUpdate: string;
  };
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface MapMarker {
  id: string;
  coordinate: MapLocation;
  title: string;
  description?: string;
  type: 'energy' | 'user' | 'custom';
  color?: string;
  size?: number;
  opacity?: number;
  draggable?: boolean;
  flat?: boolean;
  onPress?: () => void;
}

export interface MapPolygon {
  id: string;
  coordinates: MapLocation[];
  title: string;
  description?: string;
  type: 'coverage' | 'exclusion' | 'interest';
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  opacity?: number;
  fillOpacity?: number;
  onPress?: () => void;
}

export interface MapPolyline {
  id: string;
  coordinates: MapLocation[];
  title: string;
  description?: string;
  type: 'transmission' | 'distribution' | 'maintenance';
  color?: string;
  width?: number;
  opacity?: number;
  geodesic?: boolean;
  zIndex?: number;
  onPress?: () => void;
}

export interface MapCircle {
  id: string;
  center: MapLocation;
  radius: number;
  title: string;
  description?: string;
  type: 'coverage' | 'influence' | 'safety';
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  opacity?: number;
  fillOpacity?: number;
  onPress?: () => void;
}

export const useMaps = () => {
  // Estado del hook
  const [mapState, setMapState] = useState({
    isLoaded: false,
    isLoading: false,
    error: null as string | null,
    userLocation: null as MapLocation | null,
    currentRegion: mapsConfig.regions.spain,
    selectedMarker: null as string | null,
    mapType: 'standard' as 'standard' | 'satellite' | 'hybrid' | 'terrain',
    showUserLocation: true,
    showTraffic: false,
  });

  // Referencias
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, MapMarker>>(new Map());
  const polygonsRef = useRef<Map<string, MapPolygon>>(new Map());
  const polylinesRef = useRef<Map<string, MapPolyline>>(new Map());
  const circlesRef = useRef<Map<string, MapCircle>>(new Map());

  // Configuración
  const config = useMemo(() => {
    return getPlatformMapsConfig();
  }, []);

  const screenSizeConfig = useMemo(() => {
    return getScreenSizeMapsConfig();
  }, []);

  // Función para solicitar permisos de ubicación
  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'ios') {
        // iOS maneja los permisos automáticamente
        return true;
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de Ubicación',
            message: 'La aplicación necesita acceso a tu ubicación para mostrar instalaciones de energía cercanas.',
            buttonNeutral: 'Preguntar más tarde',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return false;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }, []);

  // Función para obtener la ubicación del usuario
  const getUserLocation = useCallback((options?: {
    accuracy?: 'high' | 'medium' | 'low';
    timeout?: number;
    maximumAge?: number;
  }): Promise<MapLocation> => {
    return new Promise((resolve, reject) => {
      const accuracyConfig = options?.accuracy || 'medium';
      const configOptions = config.geolocation.accuracy[accuracyConfig];

      Geolocation.getCurrentPosition(
        (position) => {
          const location: MapLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setMapState(prev => ({ ...prev, userLocation: location }));
          resolve(location);
        },
        (error) => {
          console.error('Error getting user location:', error);
          reject(error);
        },
        {
          enableHighAccuracy: configOptions.accuracy === 'high',
          timeout: options?.timeout || 15000,
          maximumAge: options?.maximumAge || 10000,
        }
      );
    });
  }, [config.geolocation.accuracy]);

  // Función para seguir la ubicación del usuario
  const watchUserLocation = useCallback((callback?: (location: MapLocation) => void) => {
    const configOptions = config.geolocation.accuracy.medium;

    return Geolocation.watchPosition(
      (position) => {
        const location: MapLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setMapState(prev => ({ ...prev, userLocation: location }));
        callback?.(location);
      },
      (error) => {
        console.error('Error watching user location:', error);
      },
      {
        enableHighAccuracy: configOptions.accuracy === 'high',
        distanceFilter: configOptions.distanceFilter,
        interval: configOptions.timeInterval,
      }
    );
  }, [config.geolocation.accuracy]);

  // Función para crear marcadores de energía
  const createEnergyMarker = useCallback((
    installation: EnergyInstallation
  ): MapMarker => {
    const markerConfig = config.energyLocations.types[installation.type];
    const defaultMarkerConfig = config.energyLocations.markers.default;

    return {
      id: installation.id,
      coordinate: installation.location,
      title: installation.name,
      description: installation.description || markerConfig.description,
      type: 'energy',
      color: markerConfig.color,
      size: markerConfig.size,
      opacity: defaultMarkerConfig.opacity,
      draggable: defaultMarkerConfig.draggable,
      flat: defaultMarkerConfig.flat,
      onPress: () => {
        setMapState(prev => ({ ...prev, selectedMarker: installation.id }));
      },
    };
  }, [config.energyLocations]);

  // Función para agregar marcador
  const addMarker = useCallback((marker: MapMarker) => {
    markersRef.current.set(marker.id, marker);
  }, []);

  // Función para remover marcador
  const removeMarker = useCallback((markerId: string) => {
    markersRef.current.delete(markerId);
  }, []);

  // Función para actualizar marcador
  const updateMarker = useCallback((markerId: string, updates: Partial<MapMarker>) => {
    const marker = markersRef.current.get(markerId);
    if (marker) {
      markersRef.current.set(markerId, { ...marker, ...updates });
    }
  }, []);

  // Función para agregar polígono
  const addPolygon = useCallback((polygon: MapPolygon) => {
    polygonsRef.current.set(polygon.id, polygon);
  }, []);

  // Función para remover polígono
  const removePolygon = useCallback((polygonId: string) => {
    polygonsRef.current.delete(polygonId);
  }, []);

  // Función para agregar línea
  const addPolyline = useCallback((polyline: MapPolyline) => {
    polylinesRef.current.set(polyline.id, polyline);
  }, []);

  // Función para remover línea
  const removePolyline = useCallback((polylineId: string) => {
    polylinesRef.current.delete(polylineId);
  }, []);

  // Función para agregar círculo
  const addCircle = useCallback((circle: MapCircle) => {
    circlesRef.current.set(circle.id, circle);
  }, []);

  // Función para remover círculo
  const removeCircle = useCallback((circleId: string) => {
    circlesRef.current.delete(circleId);
  }, []);

  // Función para animar a una región
  const animateToRegion = useCallback((
    region: MapRegion,
    duration: number = 1000
  ) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, duration);
    }
  }, []);

  // Función para animar a una coordenada
  const animateToCoordinate = useCallback((
    coordinate: MapLocation,
    duration: number = 1000
  ) => {
    if (mapRef.current) {
      mapRef.current.animateToCoordinate(coordinate, duration);
    }
  }, []);

  // Función para obtener la región actual
  const getCurrentRegion = useCallback((): Promise<MapRegion> => {
    return new Promise((resolve) => {
      if (mapRef.current) {
        mapRef.current.getMapBoundaries((bounds: any) => {
          const region: MapRegion = {
            latitude: (bounds.northEast.latitude + bounds.southWest.latitude) / 2,
            longitude: (bounds.northEast.longitude + bounds.southWest.longitude) / 2,
            latitudeDelta: Math.abs(bounds.northEast.latitude - bounds.southWest.latitude),
            longitudeDelta: Math.abs(bounds.northEast.longitude - bounds.southWest.longitude),
          };
          resolve(region);
        });
      } else {
        resolve(mapState.currentRegion);
      }
    });
  }, [mapState.currentRegion]);

  // Función para cambiar el tipo de mapa
  const setMapType = useCallback((mapType: 'standard' | 'satellite' | 'hybrid' | 'terrain') => {
    setMapState(prev => ({ ...prev, mapType }));
  }, []);

  // Función para mostrar/ocultar ubicación del usuario
  const setShowUserLocation = useCallback((show: boolean) => {
    setMapState(prev => ({ ...prev, showUserLocation: show }));
  }, []);

  // Función para mostrar/ocultar tráfico
  const setShowTraffic = useCallback((show: boolean) => {
    setMapState(prev => ({ ...prev, showTraffic: show }));
  }, []);

  // Función para ir a la ubicación del usuario
  const goToUserLocation = useCallback(async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Permiso Denegado', 'Se necesita permiso de ubicación para esta función.');
        return;
      }

      const location = await getUserLocation();
      animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error('Error going to user location:', error);
      Alert.alert('Error', 'No se pudo obtener tu ubicación.');
    }
  }, [requestLocationPermission, getUserLocation, animateToRegion]);

  // Función para ir a una región específica
  const goToRegion = useCallback((regionName: keyof typeof config.regions) => {
    const region = config.regions[regionName];
    if (region) {
      animateToRegion({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
    }
  }, [config.regions, animateToRegion]);

  // Función para calcular distancia entre dos puntos
  const calculateDistance = useCallback((
    point1: MapLocation,
    point2: MapLocation
  ): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  // Función para encontrar la instalación más cercana
  const findNearestInstallation = useCallback((
    installations: EnergyInstallation[],
    userLocation: MapLocation
  ): EnergyInstallation | null => {
    if (installations.length === 0) return null;

    let nearest = installations[0];
    let minDistance = calculateDistance(userLocation, nearest.location);

    for (const installation of installations) {
      const distance = calculateDistance(userLocation, installation.location);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = installation;
      }
    }

    return nearest;
  }, [calculateDistance]);

  // Función para limpiar todos los elementos del mapa
  const clearMap = useCallback(() => {
    markersRef.current.clear();
    polygonsRef.current.clear();
    polylinesRef.current.clear();
    circlesRef.current.clear();
    setMapState(prev => ({ ...prev, selectedMarker: null }));
  }, []);

  // Función para obtener todos los marcadores
  const getMarkers = useCallback((): MapMarker[] => {
    return Array.from(markersRef.current.values());
  }, []);

  // Función para obtener todos los polígonos
  const getPolygons = useCallback((): MapPolygon[] => {
    return Array.from(polygonsRef.current.values());
  }, []);

  // Función para obtener todas las líneas
  const getPolylines = useCallback((): MapPolyline[] => {
    return Array.from(polylinesRef.current.values());
  }, []);

  // Función para obtener todos los círculos
  const getCircles = useCallback((): MapCircle[] => {
    return Array.from(circlesRef.current.values());
  }, []);

  // Función para manejar eventos del mapa
  const handleMapEvent = useCallback((eventType: string, data?: any) => {
    switch (eventType) {
      case 'onMapReady':
        setMapState(prev => ({ ...prev, isLoaded: true, isLoading: false }));
        break;
      case 'onRegionChange':
        setMapState(prev => ({ ...prev, currentRegion: data }));
        break;
      case 'onMarkerPress':
        setMapState(prev => ({ ...prev, selectedMarker: data }));
        break;
      default:
        break;
    }
  }, []);

  // Efecto para inicializar permisos de ubicación
  useEffect(() => {
    const initLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
          const location = await getUserLocation();
          setMapState(prev => ({ ...prev, userLocation: location }));
        }
      } catch (error) {
        console.error('Error initializing location:', error);
      }
    };

    initLocation();
  }, [requestLocationPermission, getUserLocation]);

  return {
    // Estado
    mapState,
    
    // Referencias
    mapRef,
    markersRef,
    polygonsRef,
    polylinesRef,
    circlesRef,
    
    // Configuración
    config,
    screenSizeConfig,
    
    // Funciones de ubicación
    requestLocationPermission,
    getUserLocation,
    watchUserLocation,
    goToUserLocation,
    
    // Funciones de marcadores
    createEnergyMarker,
    addMarker,
    removeMarker,
    updateMarker,
    getMarkers,
    
    // Funciones de polígonos
    addPolygon,
    removePolygon,
    getPolygons,
    
    // Funciones de líneas
    addPolyline,
    removePolyline,
    getPolylines,
    
    // Funciones de círculos
    addCircle,
    removeCircle,
    getCircles,
    
    // Funciones de navegación
    animateToRegion,
    animateToCoordinate,
    getCurrentRegion,
    goToRegion,
    
    // Funciones de configuración
    setMapType,
    setShowUserLocation,
    setShowTraffic,
    
    // Funciones de utilidad
    calculateDistance,
    findNearestInstallation,
    clearMap,
    handleMapEvent,
  };
};
