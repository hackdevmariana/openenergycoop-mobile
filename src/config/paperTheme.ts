import { MD3LightTheme, MD3DarkTheme, MD3Theme } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';

// Configuración de colores personalizados
const customColors = {
  // Colores de energía
  energy: {
    solar: '#FFD700',
    wind: '#87CEEB',
    hydro: '#4682B4',
    nuclear: '#FF6B6B',
    biomass: '#90EE90',
    geothermal: '#FF8C00',
  },
  
  // Colores de estado
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // Colores de consumo
  consumption: {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336',
    critical: '#9C27B0',
  },
  
  // Colores de eficiencia
  efficiency: {
    excellent: '#4CAF50',
    good: '#8BC34A',
    average: '#FFC107',
    poor: '#FF5722',
  },
};

// Tema claro personalizado
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Colores primarios
    primary: '#2196F3',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E3F2FD',
    onPrimaryContainer: '#0D47A1',
    
    // Colores secundarios
    secondary: '#FF9800',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFF3E0',
    onSecondaryContainer: '#E65100',
    
    // Colores terciarios
    tertiary: '#4CAF50',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#E8F5E8',
    onTertiaryContainer: '#1B5E20',
    
    // Colores de error
    error: '#F44336',
    onError: '#FFFFFF',
    errorContainer: '#FFEBEE',
    onErrorContainer: '#C62828',
    
    // Colores de fondo
    background: '#FFFFFF',
    onBackground: '#212121',
    surface: '#FFFFFF',
    onSurface: '#212121',
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#424242',
    
    // Colores de outline
    outline: '#BDBDBD',
    outlineVariant: '#E0E0E0',
    
    // Colores de sombra
    shadow: '#000000',
    scrim: '#000000',
    
    // Colores de inversión
    inverseSurface: '#212121',
    inverseOnSurface: '#FFFFFF',
    inversePrimary: '#BBDEFB',
    
    // Colores de elevación
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#FFFFFF',
      level3: '#FFFFFF',
      level4: '#FFFFFF',
      level5: '#FFFFFF',
    },
    
    // Colores de superficie
    surfaceDisabled: '#F5F5F5',
    onSurfaceDisabled: '#9E9E9E',
    
    // Colores de retroalimentación
    backdrop: '#000000',
    
    // Colores personalizados
    ...customColors,
  },
  
  // Configuración de tipografía
  fonts: {
    ...MD3LightTheme.fonts,
    // Personalizar fuentes si es necesario
  },
  
  // Configuración de animaciones
  animation: {
    scale: 1.0,
  },
  
  // Configuración de redondeo
  roundness: 8,
  
  // Configuración de versión
  version: 3,
  
  // Configuración de modo
  isV3: true,
};

// Tema oscuro personalizado
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Colores primarios
    primary: '#90CAF9',
    onPrimary: '#0D47A1',
    primaryContainer: '#1976D2',
    onPrimaryContainer: '#E3F2FD',
    
    // Colores secundarios
    secondary: '#FFB74D',
    onSecondary: '#E65100',
    secondaryContainer: '#F57C00',
    onSecondaryContainer: '#FFF3E0',
    
    // Colores terciarios
    tertiary: '#81C784',
    onTertiary: '#1B5E20',
    tertiaryContainer: '#388E3C',
    onTertiaryContainer: '#E8F5E8',
    
    // Colores de error
    error: '#EF5350',
    onError: '#C62828',
    errorContainer: '#D32F2F',
    onErrorContainer: '#FFEBEE',
    
    // Colores de fondo
    background: '#121212',
    onBackground: '#FFFFFF',
    surface: '#121212',
    onSurface: '#FFFFFF',
    surfaceVariant: '#424242',
    onSurfaceVariant: '#E0E0E0',
    
    // Colores de outline
    outline: '#616161',
    outlineVariant: '#424242',
    
    // Colores de sombra
    shadow: '#000000',
    scrim: '#000000',
    
    // Colores de inversión
    inverseSurface: '#FFFFFF',
    inverseOnSurface: '#212121',
    inversePrimary: '#1976D2',
    
    // Colores de elevación
    elevation: {
      level0: 'transparent',
      level1: '#1E1E1E',
      level2: '#2D2D2D',
      level3: '#3D3D3D',
      level4: '#4D4D4D',
      level5: '#5D5D5D',
    },
    
    // Colores de superficie
    surfaceDisabled: '#424242',
    onSurfaceDisabled: '#757575',
    
    // Colores de retroalimentación
    backdrop: '#000000',
    
    // Colores personalizados
    ...customColors,
  },
  
  // Configuración de tipografía
  fonts: {
    ...MD3DarkTheme.fonts,
    // Personalizar fuentes si es necesario
  },
  
  // Configuración de animaciones
  animation: {
    scale: 1.0,
  },
  
  // Configuración de redondeo
  roundness: 8,
  
  // Configuración de versión
  version: 3,
  
  // Configuración de modo
  isV3: true,
};

// Hook para obtener el tema de Paper basado en el tema de la app
export const usePaperTheme = (): MD3Theme => {
  const { theme } = useTheme();
  
  return theme.mode === 'dark' ? darkTheme : lightTheme;
};

// Configuración de Paper Provider
export const paperConfig = {
  // Configuración de tema
  theme: lightTheme,
  
  // Configuración de iconos
  icon: {
    size: 24,
  },
  
  // Configuración de animaciones
  animation: {
    scale: 1.0,
  },
  
  // Configuración de redondeo
  roundness: 8,
  
  // Configuración de versión
  version: 3,
  
  // Configuración de modo
  isV3: true,
};

// Configuración de componentes específicos
export const componentConfig = {
  // Configuración de botones
  button: {
    mode: 'contained' as const,
    compact: false,
    loading: false,
    disabled: false,
    uppercase: true,
    icon: undefined,
    contentStyle: {},
    labelStyle: {},
    style: {},
  },
  
  // Configuración de tarjetas
  card: {
    mode: 'elevated' as const,
    elevation: 1,
    style: {},
    contentStyle: {},
    titleStyle: {},
    subtitleStyle: {},
  },
  
  // Configuración de campos de texto
  textInput: {
    mode: 'outlined' as const,
    dense: false,
    disabled: false,
    error: false,
    multiline: false,
    numberOfLines: 1,
    secureTextEntry: false,
    style: {},
    contentStyle: {},
    outlineStyle: {},
  },
  
  // Configuración de switches
  switch: {
    value: false,
    disabled: false,
    color: undefined,
    style: {},
  },
  
  // Configuración de sliders
  slider: {
    value: 0,
    minimumValue: 0,
    maximumValue: 100,
    step: 1,
    disabled: false,
    style: {},
    trackStyle: {},
    thumbStyle: {},
  },
  
  // Configuración de chips
  chip: {
    mode: 'flat' as const,
    selected: false,
    disabled: false,
    compact: false,
    style: {},
    textStyle: {},
    iconStyle: {},
  },
  
  // Configuración de listas
  list: {
    style: {},
    titleStyle: {},
    descriptionStyle: {},
    leftStyle: {},
    rightStyle: {},
  },
  
  // Configuración de modales
  modal: {
    visible: false,
    dismissable: true,
    onDismiss: () => {},
    contentContainerStyle: {},
    style: {},
  },
  
  // Configuración de snackbars
  snackbar: {
    visible: false,
    duration: 4000,
    onDismiss: () => {},
    style: {},
    wrapperStyle: {},
  },
  
  // Configuración de tooltips
  tooltip: {
    visible: false,
    onDismiss: () => {},
    style: {},
  },
  
  // Configuración de badges
  badge: {
    visible: true,
    size: 'small',
    style: {},
  },
  
  // Configuración de avatars
  avatar: {
    size: 40,
    style: {},
    imageStyle: {},
    textStyle: {},
  },
  
  // Configuración de dividers
  divider: {
    style: {},
  },
  
  // Configuración de progress bars
  progressBar: {
    progress: 0,
    color: undefined,
    style: {},
  },
  
  // Configuración de activity indicators
  activityIndicator: {
    size: 'small',
    color: undefined,
    style: {},
  },
  
  // Configuración de data tables
  dataTable: {
    style: {},
    headerStyle: {},
    rowStyle: {},
    cellStyle: {},
  },
  
  // Configuración de searchbars
  searchbar: {
    placeholder: 'Search',
    onChangeText: () => {},
    value: '',
    style: {},
    inputStyle: {},
  },
  
  // Configuración de bottom sheets
  bottomSheet: {
    visible: false,
    onDismiss: () => {},
    style: {},
    contentContainerStyle: {},
  },
  
  // Configuración de dialogs
  dialog: {
    visible: false,
    onDismiss: () => {},
    dismissable: true,
    style: {},
    contentStyle: {},
  },
  
  // Configuración de menus
  menu: {
    visible: false,
    onDismiss: () => {},
    anchor: undefined,
    style: {},
    contentStyle: {},
  },
  
  // Configuración de navigation bars
  navigationBar: {
    navigationState: {},
    onIndexChange: () => {},
    renderScene: () => null,
    renderTabBar: () => null,
    style: {},
  },
  
  // Configuración de pagination
  pagination: {
    page: 0,
    numberOfPages: 1,
    onPageChange: () => {},
    style: {},
  },
  
  // Configuración de rating bars
  ratingBar: {
    value: 0,
    onValueChange: () => {},
    maxValue: 5,
    style: {},
  },
  
  // Configuración de time pickers
  timePicker: {
    visible: false,
    onDismiss: () => {},
    onConfirm: () => {},
    style: {},
  },
  
  // Configuración de date pickers
  datePicker: {
    visible: false,
    onDismiss: () => {},
    onConfirm: () => {},
    style: {},
  },
};

// Configuración de estilos personalizados
export const customStyles = {
  // Estilos de botones
  button: {
    primary: {
      backgroundColor: '#2196F3',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: '#FF9800',
      color: '#FFFFFF',
    },
    success: {
      backgroundColor: '#4CAF50',
      color: '#FFFFFF',
    },
    warning: {
      backgroundColor: '#FF9800',
      color: '#FFFFFF',
    },
    error: {
      backgroundColor: '#F44336',
      color: '#FFFFFF',
    },
    energy: {
      solar: {
        backgroundColor: '#FFD700',
        color: '#000000',
      },
      wind: {
        backgroundColor: '#87CEEB',
        color: '#000000',
      },
      hydro: {
        backgroundColor: '#4682B4',
        color: '#FFFFFF',
      },
      nuclear: {
        backgroundColor: '#FF6B6B',
        color: '#FFFFFF',
      },
      biomass: {
        backgroundColor: '#90EE90',
        color: '#000000',
      },
      geothermal: {
        backgroundColor: '#FF8C00',
        color: '#FFFFFF',
      },
    },
  },
  
  // Estilos de tarjetas
  card: {
    energy: {
      solar: {
        backgroundColor: '#FFF8E1',
        borderColor: '#FFD700',
      },
      wind: {
        backgroundColor: '#E3F2FD',
        borderColor: '#87CEEB',
      },
      hydro: {
        backgroundColor: '#E8EAF6',
        borderColor: '#4682B4',
      },
      nuclear: {
        backgroundColor: '#FFEBEE',
        borderColor: '#FF6B6B',
      },
      biomass: {
        backgroundColor: '#E8F5E8',
        borderColor: '#90EE90',
      },
      geothermal: {
        backgroundColor: '#FFF3E0',
        borderColor: '#FF8C00',
      },
    },
    consumption: {
      low: {
        backgroundColor: '#E8F5E8',
        borderColor: '#4CAF50',
      },
      medium: {
        backgroundColor: '#FFF3E0',
        borderColor: '#FF9800',
      },
      high: {
        backgroundColor: '#FFEBEE',
        borderColor: '#F44336',
      },
      critical: {
        backgroundColor: '#F3E5F5',
        borderColor: '#9C27B0',
      },
    },
  },
  
  // Estilos de chips
  chip: {
    energy: {
      solar: {
        backgroundColor: '#FFD700',
        color: '#000000',
      },
      wind: {
        backgroundColor: '#87CEEB',
        color: '#000000',
      },
      hydro: {
        backgroundColor: '#4682B4',
        color: '#FFFFFF',
      },
      nuclear: {
        backgroundColor: '#FF6B6B',
        color: '#FFFFFF',
      },
      biomass: {
        backgroundColor: '#90EE90',
        color: '#000000',
      },
      geothermal: {
        backgroundColor: '#FF8C00',
        color: '#FFFFFF',
      },
    },
    status: {
      success: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
      },
      warning: {
        backgroundColor: '#FF9800',
        color: '#FFFFFF',
      },
      error: {
        backgroundColor: '#F44336',
        color: '#FFFFFF',
      },
      info: {
        backgroundColor: '#2196F3',
        color: '#FFFFFF',
      },
    },
  },
  
  // Estilos de badges
  badge: {
    energy: {
      solar: {
        backgroundColor: '#FFD700',
        color: '#000000',
      },
      wind: {
        backgroundColor: '#87CEEB',
        color: '#000000',
      },
      hydro: {
        backgroundColor: '#4682B4',
        color: '#FFFFFF',
      },
      nuclear: {
        backgroundColor: '#FF6B6B',
        color: '#FFFFFF',
      },
      biomass: {
        backgroundColor: '#90EE90',
        color: '#000000',
      },
      geothermal: {
        backgroundColor: '#FF8C00',
        color: '#FFFFFF',
      },
    },
    consumption: {
      low: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
      },
      medium: {
        backgroundColor: '#FF9800',
        color: '#FFFFFF',
      },
      high: {
        backgroundColor: '#F44336',
        color: '#FFFFFF',
      },
      critical: {
        backgroundColor: '#9C27B0',
        color: '#FFFFFF',
      },
    },
  },
  
  // Estilos de progress bars
  progressBar: {
    energy: {
      solar: {
        color: '#FFD700',
      },
      wind: {
        color: '#87CEEB',
      },
      hydro: {
        color: '#4682B4',
      },
      nuclear: {
        color: '#FF6B6B',
      },
      biomass: {
        color: '#90EE90',
      },
      geothermal: {
        color: '#FF8C00',
      },
    },
    consumption: {
      low: {
        color: '#4CAF50',
      },
      medium: {
        color: '#FF9800',
      },
      high: {
        color: '#F44336',
      },
      critical: {
        color: '#9C27B0',
      },
    },
  },
};

// Exportar configuración por defecto
export const paperThemeConfig = {
  lightTheme,
  darkTheme,
  componentConfig,
  customStyles,
  customColors,
};
