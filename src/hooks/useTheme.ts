import { useState, useEffect, useCallback } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { useAppStore } from '../stores/appStore';
import { secureStore } from '../lib/secureStore';
import { createTheme, ThemeMode, ColorScheme, Theme } from '../config/theme';

// Claves para almacenamiento seguro
const THEME_KEYS = {
  THEME_MODE: 'theme_mode',
  THEME_PREFERENCES: 'theme_preferences',
} as const;

// Hook principal para gestión de temas
export const useTheme = () => {
  const systemColorScheme = useColorScheme() as ColorScheme;
  const { themeMode, setThemeMode } = useAppStore();
  
  // Estado local del tema
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const effectiveMode = themeMode === 'system' ? systemColorScheme : themeMode;
    return createTheme(effectiveMode);
  });

  // Efecto para actualizar tema cuando cambia el modo o el esquema del sistema
  useEffect(() => {
    const effectiveMode = themeMode === 'system' ? systemColorScheme : themeMode;
    const newTheme = createTheme(effectiveMode);
    setCurrentTheme(newTheme);
  }, [themeMode, systemColorScheme]);

  // Función para cambiar el modo del tema
  const changeThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      // Actualizar en el store
      setThemeMode(mode);
      
      // Guardar en almacenamiento seguro
      await secureStore.setItem(THEME_KEYS.THEME_MODE, mode);
      
      // Log en desarrollo
      if (__DEV__) {
        console.log(`🌙 Tema cambiado a: ${mode}`);
      }
    } catch (error) {
      console.error('Error cambiando tema:', error);
    }
  }, [setThemeMode]);

  // Función para alternar entre claro y oscuro
  const toggleTheme = useCallback(async () => {
    const newMode = currentTheme.mode === 'light' ? 'dark' : 'light';
    await changeThemeMode(newMode);
  }, [currentTheme.mode, changeThemeMode]);

  // Función para obtener el modo efectivo (resolviendo 'system')
  const getEffectiveMode = useCallback((): ColorScheme => {
    return themeMode === 'system' ? systemColorScheme : themeMode;
  }, [themeMode, systemColorScheme]);

  // Función para verificar si está en modo oscuro
  const isDarkMode = useCallback((): boolean => {
    return getEffectiveMode() === 'dark';
  }, [getEffectiveMode]);

  // Función para verificar si está en modo claro
  const isLightMode = useCallback((): boolean => {
    return getEffectiveMode() === 'light';
  }, [getEffectiveMode]);

  // Función para obtener color con fallback
  const getColor = useCallback((colorKey: string, fallback?: string): string => {
    return currentTheme.colors[colorKey] || fallback || currentTheme.colors.text;
  }, [currentTheme.colors]);

  // Función para obtener sombra
  const getShadow = useCallback((size: 'small' | 'medium' | 'large') => {
    return currentTheme.shadows[size];
  }, [currentTheme.shadows]);

  return {
    // Estado del tema
    theme: currentTheme,
    themeMode,
    effectiveMode: getEffectiveMode(),
    
    // Funciones de control
    changeThemeMode,
    toggleTheme,
    
    // Funciones de verificación
    isDarkMode,
    isLightMode,
    
    // Funciones de utilidad
    getColor,
    getShadow,
    
    // Información del sistema
    systemColorScheme,
  };
};

// Hook para escuchar cambios del sistema
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme as ColorScheme);
    });

    // Establecer tema inicial
    setSystemTheme(Appearance.getColorScheme() as ColorScheme);

    return () => subscription?.remove();
  }, []);

  return systemTheme;
};

// Hook para cargar tema guardado
export const useLoadTheme = () => {
  const { setThemeMode } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        // Cargar tema guardado
        const savedMode = await secureStore.getItem<ThemeMode>(THEME_KEYS.THEME_MODE);
        
        if (savedMode) {
          setThemeMode(savedMode);
        }
        
        // Cargar preferencias adicionales si existen
        const preferences = await secureStore.getItem(THEME_KEYS.THEME_PREFERENCES);
        if (preferences && __DEV__) {
          console.log('🎨 Preferencias de tema cargadas:', preferences);
        }
      } catch (error) {
        console.error('Error cargando tema guardado:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedTheme();
  }, [setThemeMode]);

  return { isLoading };
};

// Hook para guardar preferencias de tema
export const useSaveThemePreferences = () => {
  const savePreferences = useCallback(async (preferences: Record<string, any>) => {
    try {
      await secureStore.setItem(THEME_KEYS.THEME_PREFERENCES, preferences);
      
      if (__DEV__) {
        console.log('💾 Preferencias de tema guardadas:', preferences);
      }
    } catch (error) {
      console.error('Error guardando preferencias de tema:', error);
    }
  }, []);

  return { savePreferences };
};

// Hook para obtener colores específicos de energía
export const useEnergyColors = () => {
  const { theme } = useTheme();
  
  const energyColors = {
    solar: theme.colors.energy_solar || '#FFD700',
    wind: theme.colors.energy_wind || '#87CEEB',
    hydro: theme.colors.energy_hydro || '#4169E1',
    battery: theme.colors.energy_battery || '#32CD32',
    grid: theme.colors.energy_grid || '#FF6347',
  };

  return energyColors;
};

// Hook para obtener gradientes
export const useGradients = () => {
  const { theme } = useTheme();
  
  const gradients = {
    primary: theme.colors.gradients_primary || ['#007AFF', '#5856D6'],
    energy: theme.colors.gradients_energy || ['#FFD700', '#FF9500'],
    success: theme.colors.gradients_success || ['#34C759', '#30D158'],
    error: theme.colors.gradients_error || ['#FF3B30', '#FF453A'],
  };

  return gradients;
};

// Hook para obtener estilos de texto
export const useTextStyles = () => {
  const { theme, getColor } = useTheme();
  
  const textStyles = {
    h1: {
      fontSize: theme.typography.sizes.xxxl,
      fontWeight: theme.typography.weights.bold,
      color: getColor('text'),
      lineHeight: theme.typography.sizes.xxxl * theme.typography.lineHeights.tight,
    },
    h2: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.semibold,
      color: getColor('text'),
      lineHeight: theme.typography.sizes.xxl * theme.typography.lineHeights.tight,
    },
    h3: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold,
      color: getColor('text'),
      lineHeight: theme.typography.sizes.xl * theme.typography.lineHeights.normal,
    },
    body: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.normal,
      color: getColor('text'),
      lineHeight: theme.typography.sizes.md * theme.typography.lineHeights.normal,
    },
    bodySmall: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.normal,
      color: getColor('textSecondary'),
      lineHeight: theme.typography.sizes.sm * theme.typography.lineHeights.normal,
    },
    caption: {
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.normal,
      color: getColor('textTertiary'),
      lineHeight: theme.typography.sizes.xs * theme.typography.lineHeights.relaxed,
    },
  };

  return textStyles;
};

// Hook para obtener estilos de componentes
export const useComponentStyles = () => {
  const { theme, getColor, getShadow } = useTheme();
  
  const componentStyles = {
    card: {
      backgroundColor: getColor('card'),
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      ...getShadow('medium'),
    },
    button: {
      primary: {
        backgroundColor: getColor('primary'),
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        ...getShadow('small'),
      },
      secondary: {
        backgroundColor: getColor('surface'),
        borderColor: getColor('border'),
        borderWidth: 1,
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
      },
    },
    input: {
      backgroundColor: getColor('surface'),
      borderColor: getColor('border'),
      borderWidth: 1,
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.sm,
      color: getColor('text'),
    },
    divider: {
      backgroundColor: getColor('divider'),
      height: 1,
      marginVertical: theme.spacing.sm,
    },
  };

  return componentStyles;
};
