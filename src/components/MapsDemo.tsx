import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button, FAB } from 'react-native-paper';
import MapView, { Marker, Polygon, Polyline, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../hooks/useTheme';
import { useMaps, EnergyInstallation } from '../hooks/useMaps';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const MapsDemo: React.FC = () => {
  const { theme } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    mapState,
    mapRef,
    config,
    requestLocationPermission,
    getUserLocation,
    goToUserLocation,
    goToRegion,
    setMapType,
    setShowUserLocation,
    setShowTraffic,
    createEnergyMarker,
    addMarker,
    removeMarker,
    addPolygon,
    addPolyline,
    addCircle,
    clearMap,
    getMarkers,
    getPolygons,
    getPolylines,
    getCircles,
    calculateDistance,
    findNearestInstallation,
  } = useMaps();

  const [currentDemo, setCurrentDemo] = useState<'basic' | 'energy' | 'regions' | 'shapes' | 'routing'>('basic');
  const [selectedInstallation, setSelectedInstallation] = useState<EnergyInstallation | null>(null);

  // Datos de ejemplo de instalaciones de energía
  const sampleInstallations: EnergyInstallation[] = [
    {
      id: '1',
      name: 'Parque Solar Madrid',
      type: 'solar',
      location: { latitude: 40.4168, longitude: -3.7038 },
      capacity: 50,
      status: 'active',
      description: 'Planta de energía solar fotovoltaica',
      data: {
        currentOutput: 45,
        efficiency: 0.85,
        lastUpdate: new Date().toISOString(),
      },
    },
    {
      id: '2',
      name: 'Parque Eólico Barcelona',
      type: 'wind',
      location: { latitude: 41.3851, longitude: 2.1734 },
      capacity: 100,
      status: 'active',
      description: 'Parque de energía eólica',
      data: {
        currentOutput: 78,
        efficiency: 0.92,
        lastUpdate: new Date().toISOString(),
      },
    },
    {
      id: '3',
      name: 'Central Hidroeléctrica Valencia',
      type: 'hydro',
      location: { latitude: 39.4699, longitude: -0.3763 },
      capacity: 200,
      status: 'active',
      description: 'Central hidroeléctrica',
      data: {
        currentOutput: 180,
        efficiency: 0.88,
        lastUpdate: new Date().toISOString(),
      },
    },
    {
      id: '4',
      name: 'Central Nuclear Sevilla',
      type: 'nuclear',
      location: { latitude: 37.3891, longitude: -5.9845 },
      capacity: 1000,
      status: 'active',
      description: 'Central de energía nuclear',
      data: {
        currentOutput: 950,
        efficiency: 0.95,
        lastUpdate: new Date().toISOString(),
      },
    },
    {
      id: '5',
      name: 'Central de Gas Bilbao',
      type: 'gas',
      location: { latitude: 43.2627, longitude: -2.9253 },
      capacity: 300,
      status: 'maintenance',
      description: 'Central de gas natural',
      data: {
        currentOutput: 0,
        efficiency: 0,
        lastUpdate: new Date().toISOString(),
      },
    },
  ];

  // Configurar marcadores de energía al cargar
  useEffect(() => {
    if (mapState.isLoaded) {
      clearMap();
      
      // Agregar marcadores de instalaciones
      sampleInstallations.forEach(installation => {
        const marker = createEnergyMarker(installation);
        addMarker(marker);
      });

      // Agregar polígonos de cobertura
      sampleInstallations.forEach(installation => {
        const polygon = {
          id: `coverage_${installation.id}`,
          coordinates: [
            { latitude: installation.location.latitude - 0.01, longitude: installation.location.longitude - 0.01 },
            { latitude: installation.location.latitude - 0.01, longitude: installation.location.longitude + 0.01 },
            { latitude: installation.location.latitude + 0.01, longitude: installation.location.longitude + 0.01 },
            { latitude: installation.location.latitude + 0.01, longitude: installation.location.longitude - 0.01 },
          ],
          title: `Cobertura ${installation.name}`,
          description: `Área de cobertura de ${installation.name}`,
          type: 'coverage' as const,
          color: config.energyLocations.types[installation.type].color,
          fillColor: config.energyLocations.types[installation.type].color,
          strokeWidth: 2,
          opacity: 0.3,
          fillOpacity: 0.1,
        };
        addPolygon(polygon);
      });

      // Agregar líneas de transmisión
      const transmissionLine = {
        id: 'transmission_1',
        coordinates: [
          { latitude: 40.4168, longitude: -3.7038 }, // Madrid
          { latitude: 41.3851, longitude: 2.1734 },  // Barcelona
        ],
        title: 'Línea de Transmisión Madrid-Barcelona',
        description: 'Línea de alta tensión',
        type: 'transmission' as const,
        color: config.polylines.transmission.color,
        width: config.polylines.transmission.width,
        opacity: config.polylines.transmission.opacity,
        geodesic: config.polylines.transmission.geodesic,
        zIndex: config.polylines.transmission.zIndex,
      };
      addPolyline(transmissionLine);

      // Agregar círculos de influencia
      sampleInstallations.forEach(installation => {
        const circle = {
          id: `influence_${installation.id}`,
          center: installation.location,
          radius: 5000, // 5km
          title: `Influencia ${installation.name}`,
          description: `Zona de influencia de ${installation.name}`,
          type: 'influence' as const,
          color: config.circles.influence.color,
          fillColor: config.circles.influence.fillColor,
          strokeWidth: config.circles.influence.strokeWidth,
          opacity: config.circles.influence.opacity,
          fillOpacity: config.circles.influence.fillOpacity,
        };
        addCircle(circle);
      });
    }
  }, [mapState.isLoaded, clearMap, createEnergyMarker, addMarker, addPolygon, addPolyline, addCircle, config]);

  const handleDemoChange = (demo: typeof currentDemo) => {
    trackUserAction('maps_demo_changed', { demo });
    setCurrentDemo(demo);
  };

  const handleMapTypeChange = (mapType: 'standard' | 'satellite' | 'hybrid' | 'terrain') => {
    trackUserAction('maps_type_changed', { mapType });
    setMapType(mapType);
  };

  const handleGoToUserLocation = async () => {
    trackUserAction('maps_go_to_user_location');
    await goToUserLocation();
  };

  const handleGoToRegion = (regionName: keyof typeof config.regions) => {
    trackUserAction('maps_go_to_region', { regionName });
    goToRegion(regionName);
  };

  const handleFindNearest = async () => {
    if (!mapState.userLocation) {
      Alert.alert('Error', 'No se puede obtener tu ubicación.');
      return;
    }

    const nearest = findNearestInstallation(sampleInstallations, mapState.userLocation);
    if (nearest) {
      setSelectedInstallation(nearest);
      trackUserAction('maps_find_nearest', { installationId: nearest.id });
      
      // Animar al marcador más cercano
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: nearest.location.latitude,
          longitude: nearest.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000);
      }
    }
  };

  const handleClearMap = () => {
    trackUserAction('maps_clear');
    clearMap();
  };

  const handleMarkerPress = (installation: EnergyInstallation) => {
    setSelectedInstallation(installation);
    trackUserAction('maps_marker_pressed', { installationId: installation.id });
  };

  const renderBasicDemo = () => (
    <MapView
      ref={mapRef}
      style={{ width: '100%', height: 300 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={mapState.currentRegion}
      showsUserLocation={mapState.showUserLocation}
      showsMyLocationButton={false}
      showsCompass={true}
      showsScale={true}
      showsTraffic={mapState.showTraffic}
      mapType={mapState.mapType}
      onMapReady={() => trackUserAction('maps_loaded')}
      onRegionChangeComplete={(region) => trackUserAction('maps_region_changed', { region })}
    >
      {/* Marcadores de instalaciones */}
      {getMarkers().map((marker) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
          pinColor={marker.color}
          onPress={() => {
            const installation = sampleInstallations.find(inst => inst.id === marker.id);
            if (installation) {
              handleMarkerPress(installation);
            }
          }}
        />
      ))}

              {/* Polígonos de cobertura */}
        {getPolygons().map((polygon) => (
          <Polygon
            key={polygon.id}
            coordinates={polygon.coordinates}
            fillColor={polygon.fillColor}
            strokeColor={polygon.color}
            strokeWidth={polygon.strokeWidth}
            fillOpacity={polygon.fillOpacity}
            onPress={() => trackUserAction('maps_polygon_pressed', { polygonId: polygon.id })}
          />
        ))}

        {/* Líneas de transmisión */}
        {getPolylines().map((polyline) => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.coordinates}
            strokeColor={polyline.color}
            strokeWidth={polyline.width}
            geodesic={polyline.geodesic}
            zIndex={polyline.zIndex}
            onPress={() => trackUserAction('maps_polyline_pressed', { polylineId: polyline.id })}
          />
        ))}

        {/* Círculos de influencia */}
        {getCircles().map((circle) => (
          <Circle
            key={circle.id}
            center={circle.center}
            radius={circle.radius}
            fillColor={circle.fillColor}
            strokeColor={circle.color}
            strokeWidth={circle.strokeWidth}
            fillOpacity={circle.fillOpacity}
            onPress={() => trackUserAction('maps_circle_pressed', { circleId: circle.id })}
          />
        ))}
    </MapView>
  );

  const renderEnergyDemo = () => (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: 400 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapState.currentRegion}
        showsUserLocation={mapState.showUserLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        onMapReady={() => trackUserAction('maps_energy_loaded')}
      >
        {getMarkers().map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.color}
            onPress={() => {
              const installation = sampleInstallations.find(inst => inst.id === marker.id);
              if (installation) {
                handleMarkerPress(installation);
              }
            }}
          />
        ))}
      </MapView>

      {/* Información de la instalación seleccionada */}
      {selectedInstallation && (
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title>{selectedInstallation.name}</Title>
            <Paragraph>{selectedInstallation.description}</Paragraph>
            <View className="flex-row justify-between mt-2">
              <Text className={themedClasses.textSecondary}>
                Capacidad: {selectedInstallation.capacity} MW
              </Text>
              <Text className={themedClasses.textSecondary}>
                Estado: {selectedInstallation.status}
              </Text>
            </View>
            {selectedInstallation.data && (
              <View className="mt-2">
                <Text className={themedClasses.textSecondary}>
                  Producción actual: {selectedInstallation.data.currentOutput} MW
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Eficiencia: {(selectedInstallation.data.efficiency * 100).toFixed(1)}%
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      )}
    </View>
  );

  const renderRegionsDemo = () => (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: 300 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapState.currentRegion}
        showsUserLocation={mapState.showUserLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        onMapReady={() => trackUserAction('maps_regions_loaded')}
      >
        {getMarkers().map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.color}
          />
        ))}
      </MapView>

      <View className="flex-row flex-wrap gap-2 mt-4">
        {Object.entries(config.regions).map(([name, region]) => (
          <TouchableOpacity
            key={name}
            onPress={() => handleGoToRegion(name as keyof typeof config.regions)}
            className={`px-3 py-2 rounded-md ${themedClasses.btnSecondary}`}
          >
            <Text className={themedClasses.textPrimary}>{region.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderShapesDemo = () => (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: 400 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapState.currentRegion}
        showsUserLocation={mapState.showUserLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        onMapReady={() => trackUserAction('maps_shapes_loaded')}
      >
        {getPolygons().map((polygon) => (
          <Polygon
            key={polygon.id}
            coordinates={polygon.coordinates}
            fillColor={polygon.fillColor}
            strokeColor={polygon.color}
            strokeWidth={polygon.strokeWidth}
            opacity={polygon.opacity}
            fillOpacity={polygon.fillOpacity}
          />
        ))}

        {getPolylines().map((polyline) => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.coordinates}
            strokeColor={polyline.color}
            strokeWidth={polyline.width}
            opacity={polyline.opacity}
            geodesic={polyline.geodesic}
            zIndex={polyline.zIndex}
          />
        ))}

        {getCircles().map((circle) => (
          <Circle
            key={circle.id}
            center={circle.center}
            radius={circle.radius}
            fillColor={circle.fillColor}
            strokeColor={circle.color}
            strokeWidth={circle.strokeWidth}
            opacity={circle.opacity}
            fillOpacity={circle.fillOpacity}
          />
        ))}
      </MapView>

      <View className="flex-row justify-between mt-4">
        <Text className={themedClasses.textSecondary}>
          Polígonos: {getPolygons().length}
        </Text>
        <Text className={themedClasses.textSecondary}>
          Líneas: {getPolylines().length}
        </Text>
        <Text className={themedClasses.textSecondary}>
          Círculos: {getCircles().length}
        </Text>
      </View>
    </View>
  );

  const renderRoutingDemo = () => (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: 300 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapState.currentRegion}
        showsUserLocation={mapState.showUserLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        mapType="standard"
        onMapReady={() => trackUserAction('maps_routing_loaded')}
      >
        {getMarkers().map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={marker.color}
          />
        ))}

        {getPolylines().map((polyline) => (
          <Polyline
            key={polyline.id}
            coordinates={polyline.coordinates}
            strokeColor={polyline.color}
            strokeWidth={polyline.width}
            opacity={polyline.opacity}
            geodesic={polyline.geodesic}
            zIndex={polyline.zIndex}
          />
        ))}
      </MapView>

      <View className="flex-row flex-wrap gap-2 mt-4">
        <Button
          mode="contained"
          onPress={handleGoToUserLocation}
          className={themedClasses.btnPrimary}
        >
          Ir a mi ubicación
        </Button>
        
        <Button
          mode="outlined"
          onPress={handleFindNearest}
          className={themedClasses.btnSecondary}
        >
          Instalación más cercana
        </Button>
      </View>
    </View>
  );

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case 'basic':
        return renderBasicDemo();
      case 'energy':
        return renderEnergyDemo();
      case 'regions':
        return renderRegionsDemo();
      case 'shapes':
        return renderShapesDemo();
      case 'routing':
        return renderRoutingDemo();
      default:
        return renderBasicDemo();
    }
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              React Native Maps Demo
            </Title>
            <Paragraph className="text-text-secondary">
              Demostración de mapas y ubicaciones de energía
            </Paragraph>
          </View>

          {/* Información del sistema */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title>Información del Sistema</Title>
              <Paragraph className="mb-4">
                Configuración actual de react-native-maps
              </Paragraph>
              
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Versión:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{config.basic.version}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Plataforma:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{Platform.OS}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Ubicación del usuario:</Text>
                  <Text className={themedClasses.textSuccess + ' font-bold'}>
                    {mapState.userLocation ? 'Disponible' : 'No disponible'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Mapa cargado:</Text>
                  <Text className={themedClasses.textSuccess + ' font-bold'}>
                    {mapState.isLoaded ? 'Sí' : 'No'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Marcadores:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{getMarkers().length}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Selector de demostración */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Tipo de Demostración</Title>
              <Paragraph className="mb-4">
                Selecciona el tipo de demostración de mapas:
              </Paragraph>
              
              <View className="flex-row flex-wrap gap-2">
                {(['basic', 'energy', 'regions', 'shapes', 'routing'] as const).map((demo) => (
                  <TouchableOpacity
                    key={demo}
                    onPress={() => handleDemoChange(demo)}
                    className={`px-3 py-2 rounded-md ${
                      currentDemo === demo ? themedClasses.btnPrimary : themedClasses.btnSecondary
                    }`}
                  >
                    <Text className={currentDemo === demo ? 'text-white' : themedClasses.textPrimary}>
                      {demo.charAt(0).toUpperCase() + demo.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Selector de tipo de mapa */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Tipo de Mapa</Title>
              <Paragraph className="mb-4">
                Selecciona el tipo de mapa:
              </Paragraph>
              
              <View className="flex-row flex-wrap gap-2">
                {(['standard', 'satellite', 'hybrid', 'terrain'] as const).map((mapType) => (
                  <TouchableOpacity
                    key={mapType}
                    onPress={() => handleMapTypeChange(mapType)}
                    className={`px-3 py-2 rounded-md ${
                      mapState.mapType === mapType ? themedClasses.btnPrimary : themedClasses.btnSecondary
                    }`}
                  >
                    <Text className={mapState.mapType === mapType ? 'text-white' : themedClasses.textPrimary}>
                      {mapType.charAt(0).toUpperCase() + mapType.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Demostración del mapa */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Demostración del Mapa</Title>
              <Paragraph className="mb-4">
                {currentDemo.charAt(0).toUpperCase() + currentDemo.slice(1)} - {mapState.mapType}
              </Paragraph>
              
              <View className="bg-surface rounded-md overflow-hidden">
                {renderCurrentDemo()}
              </View>
            </Card.Content>
          </Card>

          {/* Controles del mapa */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Controles</Title>
              <Paragraph className="mb-4">
                Funciones disponibles para el mapa:
              </Paragraph>
              
              <View className="space-y-3">
                <Button
                  mode="contained"
                  onPress={handleGoToUserLocation}
                  className={themedClasses.btnPrimary}
                >
                  Ir a mi ubicación
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={handleFindNearest}
                  className={themedClasses.btnSecondary}
                >
                  Instalación más cercana
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={handleClearMap}
                  className={themedClasses.btnSecondary}
                >
                  Limpiar mapa
                </Button>
                
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={() => setShowUserLocation(!mapState.showUserLocation)}
                    className={`px-3 py-2 rounded-md ${
                      mapState.showUserLocation ? themedClasses.btnPrimary : themedClasses.btnSecondary
                    }`}
                  >
                    <Text className={mapState.showUserLocation ? 'text-white' : themedClasses.textPrimary}>
                      Ubicación: {mapState.showUserLocation ? 'ON' : 'OFF'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => setShowTraffic(!mapState.showTraffic)}
                    className={`px-3 py-2 rounded-md ${
                      mapState.showTraffic ? themedClasses.btnPrimary : themedClasses.btnSecondary
                    }`}
                  >
                    <Text className={mapState.showTraffic ? 'text-white' : themedClasses.textPrimary}>
                      Tráfico: {mapState.showTraffic ? 'ON' : 'OFF'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              React Native Maps
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Mapas y ubicaciones geoespaciales
            </Paragraph>
            <Paragraph className="text-center mt-2 text-sm text-text-secondary">
              Versión {config.basic.version}
            </Paragraph>
          </View>
        </View>
      </ScrollView>

      {/* FAB para ir a ubicación del usuario */}
      <FAB
        icon="crosshairs-gps"
        onPress={handleGoToUserLocation}
        className="absolute bottom-4 right-4"
        style={{ backgroundColor: '#007AFF' }}
      />
    </Screen>
  );
};

export default MapsDemo;
