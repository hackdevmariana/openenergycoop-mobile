import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { useAppStore } from '../stores/appStore';

// Colores personalizados para OpenEnergyCoop
const colors = {
  primary: {
    light: '#007AFF', // Azul iOS
    dark: '#0A84FF',
  },
  secondary: {
    light: '#34C759', // Verde para energía
    dark: '#30D158',
  },
  tertiary: {
    light: '#FF9500', // Naranja para alertas
    dark: '#FF9F0A',
  },
  error: {
    light: '#FF3B30',
    dark: '#FF453A',
  },
  warning: {
    light: '#FF9500',
    dark: '#FF9F0A',
  },
  success: {
    light: '#34C759',
    dark: '#30D158',
  },
  info: {
    light: '#007AFF',
    dark: '#0A84FF',
  },
  background: {
    light: '#F2F2F7',
    dark: '#1C1C1E',
  },
  surface: {
    light: '#FFFFFF',
    dark: '#2C2C2E',
  },
  text: {
    light: '#1C1C1E',
    dark: '#FFFFFF',
  },
  textSecondary: {
    light: '#8E8E93',
    dark: '#8E8E93',
  },
  border: {
    light: '#E5E5E5',
    dark: '#38383A',
  },
  energy: {
    consumption: '#FF9500',
    production: '#34C759',
    efficiency: '#AF52DE',
    neutral: '#8E8E93',
  },
};

// Tema claro personalizado
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.light,
    primaryContainer: colors.primary.light + '20',
    secondary: colors.secondary.light,
    secondaryContainer: colors.secondary.light + '20',
    tertiary: colors.tertiary.light,
    tertiaryContainer: colors.tertiary.light + '20',
    error: colors.error.light,
    errorContainer: colors.error.light + '20',
    background: colors.background.light,
    surface: colors.surface.light,
    surfaceVariant: colors.surface.light,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onError: '#FFFFFF',
    onBackground: colors.text.light,
    onSurface: colors.text.light,
    onSurfaceVariant: colors.textSecondary.light,
    outline: colors.border.light,
    outlineVariant: colors.border.light,
    shadow: 'rgba(0, 0, 0, 0.1)',
    scrim: 'rgba(0, 0, 0, 0.32)',
    inverseSurface: colors.surface.dark,
    inverseOnSurface: colors.text.dark,
    inversePrimary: colors.primary.dark,
    elevation: {
      level0: 'transparent',
      level1: colors.surface.light,
      level2: colors.surface.light,
      level3: colors.surface.light,
      level4: colors.surface.light,
      level5: colors.surface.light,
    },
  },
  // Personalizaciones adicionales
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

// Tema oscuro personalizado
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary.dark,
    primaryContainer: colors.primary.dark + '20',
    secondary: colors.secondary.dark,
    secondaryContainer: colors.secondary.dark + '20',
    tertiary: colors.tertiary.dark,
    tertiaryContainer: colors.tertiary.dark + '20',
    error: colors.error.dark,
    errorContainer: colors.error.dark + '20',
    background: colors.background.dark,
    surface: colors.surface.dark,
    surfaceVariant: colors.surface.dark,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onTertiary: '#FFFFFF',
    onError: '#FFFFFF',
    onBackground: colors.text.dark,
    onSurface: colors.text.dark,
    onSurfaceVariant: colors.textSecondary.dark,
    outline: colors.border.dark,
    outlineVariant: colors.border.dark,
    shadow: 'rgba(0, 0, 0, 0.3)',
    scrim: 'rgba(0, 0, 0, 0.5)',
    inverseSurface: colors.surface.light,
    inverseOnSurface: colors.text.light,
    inversePrimary: colors.primary.light,
    elevation: {
      level0: 'transparent',
      level1: colors.surface.dark,
      level2: colors.surface.dark,
      level3: colors.surface.dark,
      level4: colors.surface.dark,
      level5: colors.surface.dark,
    },
  },
  // Personalizaciones adicionales
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

// Hook para obtener el tema actual
export const useTheme = () => {
  const currentTheme = useAppStore((state) => state.currentTheme);
  const isDark = currentTheme === 'dark' || 
    (currentTheme === 'system' && false); // Aquí podrías detectar el tema del sistema
  
  return isDark ? darkTheme : lightTheme;
};

// Colores de energía para usar en componentes
export const energyColors = colors.energy;

// Tipos de tema
export type AppTheme = MD3Theme;
export type ThemeMode = 'light' | 'dark' | 'system';

// Configuración de tema por defecto
export const defaultThemeConfig = {
  mode: 'system' as ThemeMode,
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};
