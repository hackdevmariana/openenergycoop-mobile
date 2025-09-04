import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { ColorScheme } from '../config/theme';

// Hook para usar NativeWind con temas dinámicos
export const useNativeWind = () => {
  const { theme, isDarkMode, isLightMode, getColor } = useTheme();

  // Generar clases CSS dinámicas basadas en el tema
  const dynamicClasses = useMemo(() => {
    const colorScheme = isDarkMode() ? 'dark' : 'light';
    
    return {
      // Clases de fondo
      'bg-theme-background': `bg-${colorScheme === 'dark' ? 'black' : 'white'}`,
      'bg-theme-surface': `bg-${colorScheme === 'dark' ? 'gray-900' : 'gray-50'}`,
      'bg-theme-card': `bg-${colorScheme === 'dark' ? 'gray-800' : 'white'}`,
      
      // Clases de texto
      'text-theme-primary': `text-${colorScheme === 'dark' ? 'white' : 'black'}`,
      'text-theme-secondary': `text-${colorScheme === 'dark' ? 'gray-400' : 'gray-600'}`,
      'text-theme-tertiary': `text-${colorScheme === 'dark' ? 'gray-500' : 'gray-500'}`,
      
      // Clases de borde
      'border-theme-border': `border-${colorScheme === 'dark' ? 'gray-700' : 'gray-200'}`,
      'border-theme-divider': `border-${colorScheme === 'dark' ? 'gray-800' : 'gray-100'}`,
      
      // Clases de sombra
      'shadow-theme': colorScheme === 'dark' ? 'shadow-gray-900/50' : 'shadow-gray-900/10',
    };
  }, [isDarkMode, isLightMode]);

  // Función para obtener clases temáticas
  const getThemedClasses = (baseClasses: string, themeVariant?: 'light' | 'dark' | 'auto') => {
    const variant = themeVariant || (isDarkMode() ? 'dark' : 'light');
    
    // Mapear clases base a clases temáticas
    const themeMapping: Record<string, string> = {
      'bg-white': variant === 'dark' ? 'bg-black' : 'bg-white',
      'bg-black': variant === 'dark' ? 'bg-white' : 'bg-black',
      'text-black': variant === 'dark' ? 'text-white' : 'text-black',
      'text-white': variant === 'dark' ? 'text-black' : 'text-white',
      'border-gray-200': variant === 'dark' ? 'border-gray-700' : 'border-gray-200',
      'border-gray-700': variant === 'dark' ? 'border-gray-200' : 'border-gray-700',
      'shadow-gray-900/10': variant === 'dark' ? 'shadow-gray-900/50' : 'shadow-gray-900/10',
      'shadow-gray-900/50': variant === 'dark' ? 'shadow-gray-900/10' : 'shadow-gray-900/50',
    };

    let themedClasses = baseClasses;
    
    // Reemplazar clases con sus equivalentes temáticos
    Object.entries(themeMapping).forEach(([baseClass, themedClass]) => {
      themedClasses = themedClasses.replace(new RegExp(`\\b${baseClass}\\b`, 'g'), themedClass);
    });

    return themedClasses;
  };

  // Función para crear estilos temáticos
  const createThemedStyle = (baseStyle: any, themeVariant?: 'light' | 'dark' | 'auto') => {
    const variant = themeVariant || (isDarkMode() ? 'dark' : 'light');
    
    const themeOverrides: Record<string, any> = {
      backgroundColor: variant === 'dark' ? getColor('background') : getColor('background'),
      color: variant === 'dark' ? getColor('text') : getColor('text'),
      borderColor: variant === 'dark' ? getColor('border') : getColor('border'),
    };

    return {
      ...baseStyle,
      ...themeOverrides,
    };
  };

  // Función para obtener clases de energía
  const getEnergyClasses = (energyType: 'solar' | 'wind' | 'hydro' | 'battery' | 'grid') => {
    const energyColors = {
      solar: 'bg-yellow-500',
      wind: 'bg-blue-400',
      hydro: 'bg-blue-600',
      battery: 'bg-green-500',
      grid: 'bg-red-500',
    };

    return energyColors[energyType];
  };

  // Función para obtener clases de estado
  const getStateClasses = (state: 'success' | 'warning' | 'error' | 'info') => {
    const stateColors = {
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
    };

    return stateColors[state];
  };

  // Función para obtener clases de tamaño
  const getSizeClasses = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => {
    const sizeMapping = {
      xs: 'p-1 text-xs',
      sm: 'p-2 text-sm',
      md: 'p-4 text-base',
      lg: 'p-6 text-lg',
      xl: 'p-8 text-xl',
      xxl: 'p-12 text-2xl',
    };

    return sizeMapping[size];
  };

  // Función para obtener clases de sombra
  const getShadowClasses = (shadow: 'small' | 'medium' | 'large') => {
    const shadowMapping = {
      small: 'shadow-sm',
      medium: 'shadow-md',
      large: 'shadow-lg',
    };

    return shadowMapping[shadow];
  };

  return {
    // Estado del tema
    isDarkMode,
    isLightMode,
    theme,
    
    // Funciones de utilidad
    getThemedClasses,
    createThemedStyle,
    getEnergyClasses,
    getStateClasses,
    getSizeClasses,
    getShadowClasses,
    
    // Clases dinámicas
    dynamicClasses,
    
    // Clases predefinidas temáticas
    themedClasses: {
      // Contenedores
      container: 'bg-background flex-1',
      surface: 'bg-surface',
      card: 'bg-card rounded-md p-4 shadow-medium',
      cardElevated: 'bg-card rounded-md p-4 shadow-large',
      
      // Textos
      textPrimary: 'text-text font-medium',
      textSecondary: 'text-text-secondary text-sm',
      textTertiary: 'text-text-tertiary text-xs',
      
      // Botones
      btnPrimary: 'bg-primary text-white px-4 py-2 rounded-md shadow-medium',
      btnSecondary: 'bg-surface border border-border text-text px-4 py-2 rounded-md',
      btnAccent: 'bg-accent text-white px-4 py-2 rounded-md shadow-small',
      
      // Inputs
      input: 'bg-surface border border-border rounded-sm p-2 text-text',
      inputFocused: 'bg-surface border border-primary rounded-sm p-2 text-text',
      
      // Estados
      stateSuccess: 'bg-success text-white',
      stateWarning: 'bg-warning text-white',
      stateError: 'bg-error text-white',
      stateInfo: 'bg-info text-white',
      
      // Energía
      energySolar: 'bg-energy-solar',
      energyWind: 'bg-energy-wind',
      energyHydro: 'bg-energy-hydro',
      energyBattery: 'bg-energy-battery',
      energyGrid: 'bg-energy-grid',
      
      // Utilidades
      divider: 'bg-divider h-px my-2',
      rounded: 'rounded-md',
      shadow: 'shadow-medium',
    },
  };
};

// Hook para usar clases CSS condicionales
export const useConditionalClasses = () => {
  const { isDarkMode } = useTheme();

  const conditionalClasses = (lightClasses: string, darkClasses: string) => {
    return isDarkMode() ? darkClasses : lightClasses;
  };

  return { conditionalClasses };
};

// Hook para usar estilos inline con temas
export const useThemedStyles = () => {
  const { getColor, theme } = useTheme();

  const createStyle = (baseStyle: any) => {
    return {
      ...baseStyle,
      backgroundColor: getColor('background'),
      color: getColor('text'),
    };
  };

  const createCardStyle = () => {
    return {
      backgroundColor: getColor('card'),
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode() ? 0.4 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    };
  };

  const createButtonStyle = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
    const variants = {
      primary: {
        backgroundColor: getColor('primary'),
        color: '#FFFFFF',
      },
      secondary: {
        backgroundColor: getColor('surface'),
        borderColor: getColor('border'),
        borderWidth: 1,
        color: getColor('text'),
      },
      accent: {
        backgroundColor: getColor('accent'),
        color: '#FFFFFF',
      },
    };

    return {
      ...variants[variant],
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    };
  };

  return {
    createStyle,
    createCardStyle,
    createButtonStyle,
  };
};
