import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLegend,
} from 'victory-native';
import { useVictoryTheme, getEnergyColors } from '../../config/victoryTheme';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

export interface EnergyDataPoint {
  x: string | number;
  y: number;
  label?: string;
  type?: 'solar' | 'wind' | 'hydro' | 'battery' | 'grid' | 'total';
}

export interface EnergyConsumptionChartProps {
  data: EnergyDataPoint[];
  title?: string;
  subtitle?: string;
  showArea?: boolean;
  showLegend?: boolean;
  height?: number;
  width?: number;
  animate?: boolean;
  interactive?: boolean;
}

const EnergyConsumptionChart: React.FC<EnergyConsumptionChartProps> = ({
  data,
  title = 'Consumo de Energía',
  subtitle,
  showArea = true,
  showLegend = true,
  height = 300,
  width: chartWidth = width - 40,
  animate = true,
  interactive = true,
}) => {
  const { themedClasses } = useTheme();
  const victoryTheme = useVictoryTheme();
  const energyColors = getEnergyColors();

  // Procesar datos para diferentes tipos de energía
  const processedData = useMemo(() => {
    const solarData = data.filter(d => d.type === 'solar');
    const windData = data.filter(d => d.type === 'wind');
    const hydroData = data.filter(d => d.type === 'hydro');
    const batteryData = data.filter(d => d.type === 'battery');
    const gridData = data.filter(d => d.type === 'grid');
    const totalData = data.filter(d => d.type === 'total' || !d.type);

    return {
      solar: solarData,
      wind: windData,
      hydro: hydroData,
      battery: batteryData,
      grid: gridData,
      total: totalData,
    };
  }, [data]);

  // Configurar leyenda
  const legendData = useMemo(() => {
    const legends = [];
    
    if (processedData.solar.length > 0) {
      legends.push({ name: 'Solar', symbol: { fill: energyColors.solar } });
    }
    if (processedData.wind.length > 0) {
      legends.push({ name: 'Eólica', symbol: { fill: energyColors.wind } });
    }
    if (processedData.hydro.length > 0) {
      legends.push({ name: 'Hidroeléctrica', symbol: { fill: energyColors.hydro } });
    }
    if (processedData.battery.length > 0) {
      legends.push({ name: 'Batería', symbol: { fill: energyColors.battery } });
    }
    if (processedData.grid.length > 0) {
      legends.push({ name: 'Red', symbol: { fill: energyColors.grid } });
    }
    if (processedData.total.length > 0) {
      legends.push({ name: 'Total', symbol: { fill: '#007AFF' } });
    }

    return legends;
  }, [processedData, energyColors]);

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
      </View>

      {/* Gráfico */}
      <VictoryChart
        theme={victoryTheme}
        width={chartWidth - 40}
        height={height - 120}
        padding={{ top: 20, bottom: 50, left: 60, right: 20 }}
        animate={animate ? { duration: 1000 } : false}
        containerComponent={
          interactive ? (
            <VictoryVoronoiContainer
              labels={({ datum }) => `${datum.y} kWh`}
              labelComponent={<VictoryTooltip {...tooltipConfig} />}
            />
          ) : undefined
        }
      >
        {/* Ejes */}
        <VictoryAxis
          dependentAxis
          label="Consumo (kWh)"
          style={{
            axisLabel: { padding: 35 },
          }}
        />
        <VictoryAxis
          label="Tiempo"
          style={{
            axisLabel: { padding: 35 },
          }}
        />

        {/* Datos de energía */}
        {processedData.solar.length > 0 && (
          showArea ? (
            <VictoryArea
              data={processedData.solar}
              style={{
                data: {
                  fill: energyColors.solar,
                  fillOpacity: 0.3,
                  stroke: energyColors.solar,
                  strokeWidth: 2,
                },
              }}
            />
          ) : (
            <VictoryLine
              data={processedData.solar}
              style={{
                data: {
                  stroke: energyColors.solar,
                  strokeWidth: 2,
                },
              }}
            />
          )
        )}

        {processedData.wind.length > 0 && (
          showArea ? (
            <VictoryArea
              data={processedData.wind}
              style={{
                data: {
                  fill: energyColors.wind,
                  fillOpacity: 0.3,
                  stroke: energyColors.wind,
                  strokeWidth: 2,
                },
              }}
            />
          ) : (
            <VictoryLine
              data={processedData.wind}
              style={{
                data: {
                  stroke: energyColors.wind,
                  strokeWidth: 2,
                },
              }}
            />
          )
        )}

        {processedData.hydro.length > 0 && (
          showArea ? (
            <VictoryArea
              data={processedData.hydro}
              style={{
                data: {
                  fill: energyColors.hydro,
                  fillOpacity: 0.3,
                  stroke: energyColors.hydro,
                  strokeWidth: 2,
                },
              }}
            />
          ) : (
            <VictoryLine
              data={processedData.hydro}
              style={{
                data: {
                  stroke: energyColors.hydro,
                  strokeWidth: 2,
                },
              }}
            />
          )
        )}

        {processedData.battery.length > 0 && (
          showArea ? (
            <VictoryArea
              data={processedData.battery}
              style={{
                data: {
                  fill: energyColors.battery,
                  fillOpacity: 0.3,
                  stroke: energyColors.battery,
                  strokeWidth: 2,
                },
              }}
            />
          ) : (
            <VictoryLine
              data={processedData.battery}
              style={{
                data: {
                  stroke: energyColors.battery,
                  strokeWidth: 2,
                },
              }}
            />
          )
        )}

        {processedData.grid.length > 0 && (
          showArea ? (
            <VictoryArea
              data={processedData.grid}
              style={{
                data: {
                  fill: energyColors.grid,
                  fillOpacity: 0.3,
                  stroke: energyColors.grid,
                  strokeWidth: 2,
                },
              }}
            />
          ) : (
            <VictoryLine
              data={processedData.grid}
              style={{
                data: {
                  stroke: energyColors.grid,
                  strokeWidth: 2,
                },
              }}
            />
          )
        )}

        {processedData.total.length > 0 && (
          <VictoryLine
            data={processedData.total}
            style={{
              data: {
                stroke: '#007AFF',
                strokeWidth: 3,
                strokeDasharray: '5,5',
              },
            }}
          />
        )}
      </VictoryChart>

      {/* Leyenda */}
      {showLegend && legendData.length > 0 && (
        <View className="mt-4">
          <VictoryLegend
            x={20}
            y={height - 80}
            orientation="horizontal"
            gutter={20}
            data={legendData}
            style={{
              labels: {
                fill: '#333',
                fontSize: 12,
              },
            }}
          />
        </View>
      )}
    </View>
  );
};

export default EnergyConsumptionChart;
