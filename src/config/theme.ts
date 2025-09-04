import { Dimensions } from 'react-native';

// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

// Tipos para temas
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

// Colores base del sistema
const colors = {
  // Colores primarios
  primary: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  secondary: {
    light: '#5856D6',
    dark: '#5E5CE6',
  },
  accent: {
    light: '#FF9500',
    dark: '#FF9F0A',
  },
  
  // Colores de estado
  success: {
    light: '#34C759',
    dark: '#30D158',
  },
  warning: {
    light: '#FF9500',
    dark: '#FF9F0A',
  },
  error: {
    light: '#FF3B30',
    dark: '#FF453A',
  },
  info: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  
  // Colores de fondo
  background: {
    light: '#FFFFFF',
    dark: '#000000',
  },
  surface: {
    light: '#F2F2F7',
    dark: '#1C1C1E',
  },
  card: {
    light: '#FFFFFF',
    dark: '#2C2C2E',
  },
  
  // Colores de texto
  text: {
    light: '#000000',
    dark: '#FFFFFF',
  },
  textSecondary: {
    light: '#6B7280',
    dark: '#8E8E93',
  },
  textTertiary: {
    light: '#9CA3AF',
    dark: '#636366',
  },
  
  // Colores de borde
  border: {
    light: '#E5E7EB',
    dark: '#38383A',
  },
  divider: {
    light: '#F3F4F6',
    dark: '#2C2C2E',
  },
  
  // Colores de energía específicos
  energy: {
    solar: {
      light: '#FFD700',
      dark: '#FFD700',
    },
    wind: {
      light: '#87CEEB',
      dark: '#87CEEB',
    },
    hydro: {
      light: '#4169E1',
      dark: '#4169E1',
    },
    battery: {
      light: '#32CD32',
      dark: '#32CD32',
    },
    grid: {
      light: '#FF6347',
      dark: '#FF6347',
    },
  },
  
  // Colores de gradientes
  gradients: {
    primary: {
      light: ['#007AFF', '#5856D6'],
      dark: ['#0A84FF', '#5E5CE6'],
    },
    energy: {
      light: ['#FFD700', '#FF9500'],
      dark: ['#FFD700', '#FF9F0A'],
    },
    success: {
      light: ['#34C759', '#30D158'],
      dark: ['#30D158', '#34C759'],
    },
    error: {
      light: ['#FF3B30', '#FF453A'],
      dark: ['#FF453A', '#FF3B30'],
    },
  },
};

// Configuración de sombras
const shadows = {
  light: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  dark: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

// Configuración de espaciado
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Configuración de bordes
const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Configuración de tipografía
const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// Función para obtener colores según el tema
export const getThemeColors = (colorScheme: ColorScheme) => {
  const themeColors: Record<string, string> = {};
  
  // Mapear colores dinámicamente
  Object.entries(colors).forEach(([category, variants]) => {
    if (typeof variants === 'object' && 'light' in variants && 'dark' in variants) {
      themeColors[category] = variants[colorScheme];
    } else if (typeof variants === 'object') {
      Object.entries(variants).forEach(([subCategory, subVariants]) => {
        if (typeof subVariants === 'object' && 'light' in subVariants && 'dark' in subVariants) {
          themeColors[`${category}_${subCategory}`] = subVariants[colorScheme];
        }
      });
    }
  });
  
  return themeColors;
};

// Función para obtener sombras según el tema
export const getThemeShadows = (colorScheme: ColorScheme) => {
  return shadows[colorScheme];
};

// Crear tema completo
export const createTheme = (colorScheme: ColorScheme) => {
  const colors = getThemeColors(colorScheme);
  const shadows = getThemeShadows(colorScheme);
  
  return {
    mode: colorScheme,
    colors,
    shadows,
    spacing,
    borderRadius,
    typography,
    dimensions: {
      width,
      height,
    },
  };
};

// Temas predefinidos
export const themes = {
  light: createTheme('light'),
  dark: createTheme('dark'),
};

// Configuración por defecto
export const defaultThemeConfig = {
  mode: 'system' as ThemeMode,
  colors: themes.light.colors,
  shadows: themes.light.shadows,
  spacing,
  borderRadius,
  typography,
  dimensions: {
    width,
    height,
  },
};

// Tipos exportados
export type Theme = ReturnType<typeof createTheme>;
export type ThemeColors = ReturnType<typeof getThemeColors>;
export type ThemeShadows = ReturnType<typeof getThemeShadows>;
