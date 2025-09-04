import { useTheme } from '../hooks/useTheme';
import { VictoryThemeDefinition } from 'victory-native';

// Hook para obtener tema de Victory basado en nuestro sistema de temas
export const useVictoryTheme = () => {
  const { getColor, isDarkMode } = useTheme();
  
  const victoryTheme: VictoryThemeDefinition = {
    axis: {
      style: {
        axis: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
        },
        axisLabel: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
        grid: {
          fill: 'none',
          stroke: getColor('divider'),
          strokeWidth: 1,
          strokeDasharray: '5,5',
        },
        ticks: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
          size: 5,
        },
        tickLabels: {
          fill: getColor('textSecondary'),
          fontSize: 10,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    dependentAxis: {
      style: {
        axis: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
        },
        axisLabel: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
        grid: {
          fill: 'none',
          stroke: getColor('divider'),
          strokeWidth: 1,
          strokeDasharray: '5,5',
        },
        ticks: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
          size: 5,
        },
        tickLabels: {
          fill: getColor('textSecondary'),
          fontSize: 10,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    independentAxis: {
      style: {
        axis: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
        },
        axisLabel: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
        grid: {
          fill: 'none',
          stroke: getColor('divider'),
          strokeWidth: 1,
          strokeDasharray: '5,5',
        },
        ticks: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
          size: 5,
        },
        tickLabels: {
          fill: getColor('textSecondary'),
          fontSize: 10,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    line: {
      style: {
        data: {
          stroke: getColor('primary'),
          strokeWidth: 2,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    area: {
      style: {
        data: {
          fill: getColor('primary'),
          fillOpacity: 0.1,
          stroke: getColor('primary'),
          strokeWidth: 2,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    bar: {
      style: {
        data: {
          fill: getColor('primary'),
          stroke: getColor('primary'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    candlestick: {
      style: {
        data: {
          fill: getColor('primary'),
          stroke: getColor('primary'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    errorbar: {
      style: {
        data: {
          fill: getColor('error'),
          stroke: getColor('error'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    group: {
      style: {
        data: {
          fill: getColor('primary'),
          stroke: getColor('primary'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    legend: {
      style: {
        data: {
          type: 'circle',
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
        title: {
          fill: getColor('text'),
          fontSize: 14,
          fontFamily: 'System',
          fontWeight: '600',
        },
      },
    },
    pie: {
      style: {
        data: {
          stroke: getColor('background'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    scatter: {
      style: {
        data: {
          fill: getColor('primary'),
          stroke: getColor('primary'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
    voronoi: {
      style: {
        data: {
          fill: 'transparent',
          stroke: getColor('primary'),
          strokeWidth: 1,
        },
        labels: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
      },
    },
  };

  return victoryTheme;
};

// Colores específicos para energía
export const getEnergyColors = () => {
  const { getColor } = useTheme();
  
  return {
    solar: getColor('energy_solar') || '#FFD700',
    wind: getColor('energy_wind') || '#87CEEB',
    hydro: getColor('energy_hydro') || '#4169E1',
    battery: getColor('energy_battery') || '#32CD32',
    grid: getColor('energy_grid') || '#FF6347',
    nuclear: '#FF69B4',
    biomass: '#8B4513',
    geothermal: '#FF4500',
  };
};

// Colores para estados
export const getStateColors = () => {
  const { getColor } = useTheme();
  
  return {
    success: getColor('success'),
    warning: getColor('warning'),
    error: getColor('error'),
    info: getColor('info'),
  };
};

// Configuración de animaciones
export const getAnimationConfig = () => {
  return {
    duration: 1000,
    easing: 'bounce',
    onLoad: {
      duration: 500,
      easing: 'bounce',
    },
  };
};

// Configuración de tooltips
export const getTooltipConfig = () => {
  const { getColor } = useTheme();
  
  return {
    style: {
      fill: getColor('card'),
      stroke: getColor('border'),
      strokeWidth: 1,
    },
    flyoutStyle: {
      fill: getColor('card'),
      stroke: getColor('border'),
      strokeWidth: 1,
    },
    labelStyle: {
      fill: getColor('text'),
      fontSize: 12,
      fontFamily: 'System',
      fontWeight: '400',
    },
  };
};

// Configuración de gradientes
export const getGradientConfig = () => {
  const { getColor } = useTheme();
  
  return {
    primary: [
      { offset: '0%', color: getColor('primary') },
      { offset: '100%', color: getColor('secondary') },
    ],
    energy: [
      { offset: '0%', color: getColor('energy_solar') },
      { offset: '50%', color: getColor('energy_wind') },
      { offset: '100%', color: getColor('energy_hydro') },
    ],
    success: [
      { offset: '0%', color: getColor('success') },
      { offset: '100%', color: getColor('energy_battery') },
    ],
    error: [
      { offset: '0%', color: getColor('error') },
      { offset: '100%', color: getColor('energy_grid') },
    ],
  };
};

// Configuración de patrones
export const getPatternConfig = () => {
  const { getColor } = useTheme();
  
  return {
    solar: {
      pattern: 'diagonal',
      color: getColor('energy_solar'),
    },
    wind: {
      pattern: 'horizontal',
      color: getColor('energy_wind'),
    },
    hydro: {
      pattern: 'vertical',
      color: getColor('energy_hydro'),
    },
    battery: {
      pattern: 'grid',
      color: getColor('energy_battery'),
    },
    grid: {
      pattern: 'cross',
      color: getColor('energy_grid'),
    },
  };
};

// Configuración de responsividad
export const getResponsiveConfig = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };
};
