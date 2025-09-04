import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Switch } from 'react-native-paper';
import EnergyConsumptionChart, { EnergyDataPoint } from './EnergyConsumptionChart';
import EnergyComparisonChart, { EnergyComparisonData } from './EnergyComparisonChart';
import EnergyDistributionChart, { EnergyDistributionData } from './EnergyDistributionChart';
import { useTheme } from '../../hooks/useTheme';

const EnergyChartsDemo: React.FC = () => {
  const { themedClasses, toggleTheme } = useTheme();
  const [showArea, setShowArea] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showTooltips, setShowTooltips] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [stacked, setStacked] = useState(false);

  // Datos de ejemplo para consumo de energía
  const consumptionData: EnergyDataPoint[] = [
    { x: '00:00', y: 2.1, type: 'solar' },
    { x: '02:00', y: 1.8, type: 'solar' },
    { x: '04:00', y: 1.2, type: 'solar' },
    { x: '06:00', y: 3.5, type: 'solar' },
    { x: '08:00', y: 5.2, type: 'solar' },
    { x: '10:00', y: 7.8, type: 'solar' },
    { x: '12:00', y: 8.9, type: 'solar' },
    { x: '14:00', y: 8.1, type: 'solar' },
    { x: '16:00', y: 6.3, type: 'solar' },
    { x: '18:00', y: 3.7, type: 'solar' },
    { x: '20:00', y: 1.9, type: 'solar' },
    { x: '22:00', y: 1.2, type: 'solar' },
    
    { x: '00:00', y: 4.2, type: 'wind' },
    { x: '02:00', y: 5.1, type: 'wind' },
    { x: '04:00', y: 6.3, type: 'wind' },
    { x: '06:00', y: 5.8, type: 'wind' },
    { x: '08:00', y: 4.9, type: 'wind' },
    { x: '10:00', y: 3.7, type: 'wind' },
    { x: '12:00', y: 2.8, type: 'wind' },
    { x: '14:00', y: 3.2, type: 'wind' },
    { x: '16:00', y: 4.1, type: 'wind' },
    { x: '18:00', y: 5.6, type: 'wind' },
    { x: '20:00', y: 6.2, type: 'wind' },
    { x: '22:00', y: 5.8, type: 'wind' },
    
    { x: '00:00', y: 6.3, type: 'total' },
    { x: '02:00', y: 6.9, type: 'total' },
    { x: '04:00', y: 7.5, type: 'total' },
    { x: '06:00', y: 9.3, type: 'total' },
    { x: '08:00', y: 10.1, type: 'total' },
    { x: '10:00', y: 11.5, type: 'total' },
    { x: '12:00', y: 11.7, type: 'total' },
    { x: '14:00', y: 11.3, type: 'total' },
    { x: '16:00', y: 10.4, type: 'total' },
    { x: '18:00', y: 9.3, type: 'total' },
    { x: '20:00', y: 8.1, type: 'total' },
    { x: '22:00', y: 7.0, type: 'total' },
  ];

  // Datos de ejemplo para comparación
  const comparisonData: EnergyComparisonData[] = [
    { x: 'Lun', solar: 45.2, wind: 38.7, hydro: 12.3, battery: 8.9, total: 105.1 },
    { x: 'Mar', solar: 52.1, wind: 42.3, hydro: 15.6, battery: 7.2, total: 117.2 },
    { x: 'Mié', solar: 48.9, wind: 45.8, hydro: 18.9, battery: 9.1, total: 122.7 },
    { x: 'Jue', solar: 56.3, wind: 39.2, hydro: 14.7, battery: 6.8, total: 117.0 },
    { x: 'Vie', solar: 61.7, wind: 36.5, hydro: 16.2, battery: 8.3, total: 122.7 },
    { x: 'Sáb', solar: 58.4, wind: 41.2, hydro: 13.8, battery: 7.9, total: 121.3 },
    { x: 'Dom', solar: 49.6, wind: 44.1, hydro: 17.4, battery: 9.5, total: 120.6 },
  ];

  // Datos de ejemplo para distribución
  const distributionData: EnergyDistributionData[] = [
    { x: 'Solar', y: 45.2, type: 'solar' },
    { x: 'Eólica', y: 38.7, type: 'wind' },
    { x: 'Hidroeléctrica', y: 12.3, type: 'hydro' },
    { x: 'Batería', y: 8.9, type: 'battery' },
    { x: 'Red', y: 5.2, type: 'grid' },
  ];

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-text">
            Gráficos de Energía - Victory Native
          </Text>
          <Text className="text-text-secondary">
            Demostración de gráficos interactivos para consumo de energía
          </Text>
        </View>

        {/* Controles */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Controles</Title>
            
            <View className="mt-4 space-y-3">
              <View className="flex-row items-center justify-between">
                <Text className={themedClasses.textSecondary}>Mostrar área</Text>
                <Switch
                  value={showArea}
                  onValueChange={setShowArea}
                  color="#007AFF"
                />
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className={themedClasses.textSecondary}>Mostrar leyenda</Text>
                <Switch
                  value={showLegend}
                  onValueChange={setShowLegend}
                  color="#007AFF"
                />
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className={themedClasses.textSecondary}>Mostrar tooltips</Text>
                <Switch
                  value={showTooltips}
                  onValueChange={setShowTooltips}
                  color="#007AFF"
                />
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className={themedClasses.textSecondary}>Animaciones</Text>
                <Switch
                  value={animate}
                  onValueChange={setAnimate}
                  color="#007AFF"
                />
              </View>
              
              <View className="flex-row items-center justify-between">
                <Text className={themedClasses.textSecondary}>Barras apiladas</Text>
                <Switch
                  value={stacked}
                  onValueChange={setStacked}
                  color="#007AFF"
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Gráfico de Consumo */}
        <View className="mt-6">
          <EnergyConsumptionChart
            data={consumptionData}
            title="Consumo Diario de Energía"
            subtitle="Datos de las últimas 24 horas"
            showArea={showArea}
            showLegend={showLegend}
            animate={animate}
            interactive={showTooltips}
            height={350}
          />
        </View>

        {/* Gráfico de Comparación */}
        <View className="mt-6">
          <EnergyComparisonChart
            data={comparisonData}
            title="Comparación Semanal"
            subtitle="Consumo por tipo de energía"
            showLegend={showLegend}
            animate={animate}
            interactive={showTooltips}
            stacked={stacked}
            height={400}
          />
        </View>

        {/* Gráfico de Distribución */}
        <View className="mt-6">
          <EnergyDistributionChart
            data={distributionData}
            title="Distribución de Energía"
            subtitle="Porcentaje por fuente de energía"
            showLabels={true}
            showTooltips={showTooltips}
            animate={animate}
            height={350}
          />
        </View>

        {/* Información adicional */}
        <Card className={themedClasses.card + ' mt-6'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Características</Title>
            
            <View className="mt-4 space-y-2">
              <Text className={themedClasses.textSecondary}>
                • Gráficos interactivos con tooltips
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Animaciones suaves y fluidas
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Temas adaptativos (claro/oscuro)
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Colores específicos para energía
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Responsive y optimizado para móvil
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Integración con NativeWind
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View className="mt-6 p-4 bg-surface rounded-md">
          <Text className={themedClasses.textSecondary + ' text-center'}>
            Victory Native proporciona gráficos nativos y optimizados para React Native
          </Text>
          <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
            Perfecto para aplicaciones de energía y monitoreo
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EnergyChartsDemo;
