import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLegend,
  VictoryGroup,
} from 'victory-native';
import { useVictoryTheme, getEnergyColors } from '../../config/victoryTheme';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

export interface EnergyComparisonData {
  x: string;
  solar?: number;
  wind?: number;
  hydro?: number;
  battery?: number;
  grid?: number;
  total?: number;
}

export interface EnergyComparisonChartProps {
  data: EnergyComparisonData[];
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  height?: number;
  width?: number;
  animate?: boolean;
  interactive?: boolean;
  stacked?: boolean;
}

const EnergyComparisonChart: React.FC<EnergyComparisonChartProps> = ({
  data,
  title = 'Comparación de Energía',
  subtitle,
  showLegend = true,
  height = 350,
  width: chartWidth = width - 40,
  animate = true,
  interactive = true,
  stacked = false,
}) => {
  const { themedClasses } = useTheme();
  const victoryTheme = useVictoryTheme();
  const energyColors = getEnergyColors();

  // Procesar datos para diferentes tipos de energía
  const processedData = useMemo(() => {
    const solarData = data.map(d => ({ x: d.x, y: d.solar || 0, type: 'solar' }));
    const windData = data.map(d => ({ x: d.x, y: d.wind || 0, type: 'wind' }));
    const hydroData = data.map(d => ({ x: d.x, y: d.hydro || 0, type: 'hydro' }));
    const batteryData = data.map(d => ({ x: d.x, y: d.battery || 0, type: 'battery' }));
    const gridData = data.map(d => ({ x: d.x, y: d.grid || 0, type: 'grid' }));
    const totalData = data.map(d => ({ x: d.x, y: d.total || 0, type: 'total' }));

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
    
    if (data.some(d => d.solar)) {
      legends.push({ name: 'Solar', symbol: { fill: energyColors.solar } });
    }
    if (data.some(d => d.wind)) {
      legends.push({ name: 'Eólica', symbol: { fill: energyColors.wind } });
    }
    if (data.some(d => d.hydro)) {
      legends.push({ name: 'Hidroeléctrica', symbol: { fill: energyColors.hydro } });
    }
    if (data.some(d => d.battery)) {
      legends.push({ name: 'Batería', symbol: { fill: energyColors.battery } });
    }
    if (data.some(d => d.grid)) {
      legends.push({ name: 'Red', symbol: { fill: energyColors.grid } });
    }
    if (data.some(d => d.total)) {
      legends.push({ name: 'Total', symbol: { fill: '#007AFF' } });
    }

    return legends;
  }, [data, energyColors]);

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
          label="Energía (kWh)"
          style={{
            axisLabel: { padding: 35 },
          }}
        />
        <VictoryAxis
          label="Período"
          style={{
            axisLabel: { padding: 35 },
          }}
        />

        {/* Datos de energía */}
        {stacked ? (
          <VictoryGroup offset={20} colorScale="qualitative">
            {processedData.solar.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.solar}
                style={{
                  data: {
                    fill: energyColors.solar,
                    stroke: energyColors.solar,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.wind.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.wind}
                style={{
                  data: {
                    fill: energyColors.wind,
                    stroke: energyColors.wind,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.hydro.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.hydro}
                style={{
                  data: {
                    fill: energyColors.hydro,
                    stroke: energyColors.hydro,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.battery.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.battery}
                style={{
                  data: {
                    fill: energyColors.battery,
                    stroke: energyColors.battery,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.grid.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.grid}
                style={{
                  data: {
                    fill: energyColors.grid,
                    stroke: energyColors.grid,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
          </VictoryGroup>
        ) : (
          <>
            {processedData.solar.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.solar}
                style={{
                  data: {
                    fill: energyColors.solar,
                    stroke: energyColors.solar,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.wind.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.wind}
                style={{
                  data: {
                    fill: energyColors.wind,
                    stroke: energyColors.wind,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.hydro.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.hydro}
                style={{
                  data: {
                    fill: energyColors.hydro,
                    stroke: energyColors.hydro,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.battery.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.battery}
                style={{
                  data: {
                    fill: energyColors.battery,
                    stroke: energyColors.battery,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.grid.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.grid}
                style={{
                  data: {
                    fill: energyColors.grid,
                    stroke: energyColors.grid,
                    strokeWidth: 1,
                  },
                }}
              />
            )}
            {processedData.total.some(d => d.y > 0) && (
              <VictoryBar
                data={processedData.total}
                style={{
                  data: {
                    fill: '#007AFF',
                    stroke: '#007AFF',
                    strokeWidth: 1,
                  },
                }}
              />
            )}
          </>
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

export default EnergyComparisonChart;
