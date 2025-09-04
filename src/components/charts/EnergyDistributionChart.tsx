import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
} from 'victory-native';
import { useVictoryTheme, getEnergyColors } from '../../config/victoryTheme';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

export interface EnergyDistributionData {
  x: string;
  y: number;
  type: 'solar' | 'wind' | 'hydro' | 'battery' | 'grid' | 'other';
  label?: string;
}

export interface EnergyDistributionChartProps {
  data: EnergyDistributionData[];
  title?: string;
  subtitle?: string;
  showLabels?: boolean;
  showTooltips?: boolean;
  height?: number;
  width?: number;
  animate?: boolean;
  innerRadius?: number;
}

const EnergyDistributionChart: React.FC<EnergyDistributionChartProps> = ({
  data,
  title = 'Distribución de Energía',
  subtitle,
  showLabels = true,
  showTooltips = true,
  height = 300,
  width: chartWidth = width - 40,
  animate = true,
  innerRadius = 60,
}) => {
  const { themedClasses } = useTheme();
  const victoryTheme = useVictoryTheme();
  const energyColors = getEnergyColors();

  // Procesar datos y asignar colores
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      fill: energyColors[item.type] || '#999',
      label: item.label || `${item.x}: ${item.y} kWh`,
    }));
  }, [data, energyColors]);

  // Calcular total para porcentajes
  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + item.y, 0);
  }, [data]);

  // Configurar tooltip
  const tooltipConfig = {
    flyoutStyle: {
      fill: 'rgba(255, 255, 255, 0.9)',
      stroke: '#ccc',
      strokeWidth: 1,
    },
    labelStyle: {
      fill: '#333',
      fontSize: 12,
    },
  };

  // Configurar etiquetas
  const labelConfig = {
    style: {
      fill: '#333',
      fontSize: 12,
      fontWeight: 'bold',
    },
  };

  return (
    <View className={themedClasses.card} style={{ height, width: chartWidth }}>
      {/* Header */}
      <View className="mb-4">
        <Text className={themedClasses.textPrimary + ' text-lg font-bold'}>
          {title}
        </Text>
        {subtitle && (
          <Text className={themedClasses.textSecondary + ' text-sm'}>
            {subtitle}
          </Text>
        )}
        <Text className={themedClasses.textSecondary + ' text-sm mt-2'}>
          Total: {total.toFixed(1)} kWh
        </Text>
      </View>

      {/* Gráfico */}
      <View className="items-center">
        <VictoryPie
          data={processedData}
          theme={victoryTheme}
          width={chartWidth - 80}
          height={height - 160}
          innerRadius={innerRadius}
          animate={animate ? { duration: 1000 } : false}
          colorScale={processedData.map(d => d.fill)}
          labelComponent={
            showLabels ? (
              <VictoryLabel
                {...labelConfig}
                text={({ datum }) => `${datum.x}\n${((datum.y / total) * 100).toFixed(1)}%`}
              />
            ) : undefined
          }
          labelRadius={({ radius }) => radius - 40}
          containerComponent={
            showTooltips ? (
              <VictoryTooltip
                {...tooltipConfig}
                labels={({ datum }) => `${datum.x}: ${datum.y} kWh (${((datum.y / total) * 100).toFixed(1)}%)`}
              />
            ) : undefined
          }
        />
      </View>

      {/* Leyenda */}
      <View className="mt-4">
        <View className="flex-row flex-wrap justify-center">
          {processedData.map((item, index) => (
            <View key={index} className="flex-row items-center mr-4 mb-2">
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: item.fill,
                  borderRadius: 6,
                  marginRight: 4,
                }}
              />
              <Text className={themedClasses.textSecondary + ' text-xs'}>
                {item.x}: {((item.y / total) * 100).toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EnergyDistributionChart;
