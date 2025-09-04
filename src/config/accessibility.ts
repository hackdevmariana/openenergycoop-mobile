// Configuración de accesibilidad
export interface AccessibilityConfig {
  // Configuración de tipografía
  typography: {
    // Tamaños de fuente disponibles
    sizes: {
      xs: number;      // Extra pequeño
      sm: number;      // Pequeño
      base: number;    // Normal
      lg: number;      // Grande
      xl: number;      // Extra grande
      '2xl': number;   // 2X grande
      '3xl': number;   // 3X grande
      '4xl': number;   // 4X grande
    };
    // Escalas de tamaño
    scale: {
      small: number;   // Escala pequeña (0.8)
      normal: number;  // Escala normal (1.0)
      large: number;   // Escala grande (1.2)
      extraLarge: number; // Escala extra grande (1.5)
    };
    // Configuración de línea
    lineHeight: {
      tight: number;   // Línea apretada
      normal: number;  // Línea normal
      relaxed: number; // Línea relajada
      loose: number;    // Línea suelta
    };
    // Configuración de peso
    fontWeight: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
    };
  };
  
  // Configuración de contraste
  contrast: {
    levels: {
      low: number;     // Contraste bajo
      normal: number;  // Contraste normal
      high: number;    // Contraste alto
      veryHigh: number; // Contraste muy alto
    };
  };
  
  // Configuración de espaciado
  spacing: {
    letterSpacing: {
      tight: number;
      normal: number;
      wide: number;
    };
    wordSpacing: {
      tight: number;
      normal: number;
      wide: number;
    };
  };
  
  // Configuración de zoom
  zoom: {
    min: number;      // Zoom mínimo
    max: number;      // Zoom máximo
    step: number;     // Paso de zoom
    default: number;  // Zoom por defecto
  };
}

// Configuración por defecto
export const DEFAULT_ACCESSIBILITY_CONFIG: AccessibilityConfig = {
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    scale: {
      small: 0.8,
      normal: 1.0,
      large: 1.2,
      extraLarge: 1.5,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2.0,
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  contrast: {
    levels: {
      low: 1.2,
      normal: 1.5,
      high: 2.0,
      veryHigh: 3.0,
    },
  },
  spacing: {
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 1,
    },
    wordSpacing: {
      tight: -1,
      normal: 0,
      wide: 2,
    },
  },
  zoom: {
    min: 0.5,
    max: 3.0,
    step: 0.1,
    default: 1.0,
  },
};

// Tipos de preferencias de accesibilidad
export interface AccessibilityPreferences {
  fontSize: 'small' | 'normal' | 'large' | 'extraLarge';
  fontSizeScale: number;
  lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
  contrast: 'low' | 'normal' | 'high' | 'veryHigh';
  letterSpacing: 'tight' | 'normal' | 'wide';
  wordSpacing: 'tight' | 'normal' | 'wide';
  zoom: number;
  enableHighContrast: boolean;
  enableBoldText: boolean;
  enableReduceMotion: boolean;
  enableScreenReader: boolean;
}

// Preferencias por defecto
export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  fontSize: 'normal',
  fontSizeScale: 1.0,
  lineHeight: 'normal',
  contrast: 'normal',
  letterSpacing: 'normal',
  wordSpacing: 'normal',
  zoom: 1.0,
  enableHighContrast: false,
  enableBoldText: false,
  enableReduceMotion: false,
  enableScreenReader: false,
};

// Utilidades para calcular tamaños de fuente
export const calculateFontSize = (
  baseSize: number,
  scale: number,
  preferences: AccessibilityPreferences
): number => {
  return Math.round(baseSize * scale * preferences.fontSizeScale);
};

// Utilidades para calcular altura de línea
export const calculateLineHeight = (
  fontSize: number,
  lineHeightType: string,
  config: AccessibilityConfig
): number => {
  const lineHeightMultiplier = config.typography.lineHeight[lineHeightType as keyof typeof config.typography.lineHeight];
  return fontSize * lineHeightMultiplier;
};

// Utilidades para calcular espaciado de letras
export const calculateLetterSpacing = (
  fontSize: number,
  letterSpacingType: string,
  config: AccessibilityConfig
): number => {
  const letterSpacingValue = config.spacing.letterSpacing[letterSpacingType as keyof typeof config.spacing.letterSpacing];
  return fontSize * (letterSpacingValue / 100);
};

// Utilidades para calcular espaciado de palabras
export const calculateWordSpacing = (
  fontSize: number,
  wordSpacingType: string,
  config: AccessibilityConfig
): number => {
  const wordSpacingValue = config.spacing.wordSpacing[wordSpacingType as keyof typeof config.spacing.wordSpacing];
  return fontSize * (wordSpacingValue / 100);
};

// Utilidades para verificar contraste
export const calculateContrastRatio = (foreground: string, background: string): number => {
  // Función simplificada para calcular contraste
  // En una implementación real, usarías una librería como color-contrast
  const getLuminance = (color: string): number => {
    // Convertir color hex a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    // Calcular luminancia
    const [rs, gs, bs] = [r, g, b].map(c => {
      if (c <= 0.03928) {
        return c / 12.92;
      }
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Utilidades para generar colores con alto contraste
export const generateHighContrastColors = (baseColor: string): { foreground: string; background: string } => {
  // Función simplificada para generar colores de alto contraste
  // En una implementación real, usarías una librería como color-contrast
  const isLight = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  };
  
  const isLightColor = isLight(baseColor);
  
  return {
    foreground: isLightColor ? '#000000' : '#FFFFFF',
    background: isLightColor ? '#FFFFFF' : '#000000',
  };
};

// Configuración de accesibilidad para diferentes tamaños de pantalla
export const getResponsiveFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  screenWidth: number
): number => {
  let responsiveScale = 1.0;
  
  // Ajustar escala según el tamaño de pantalla
  if (screenWidth < 320) {
    responsiveScale = 0.9; // Pantallas muy pequeñas
  } else if (screenWidth < 480) {
    responsiveScale = 0.95; // Pantallas pequeñas
  } else if (screenWidth > 768) {
    responsiveScale = 1.1; // Pantallas grandes
  } else if (screenWidth > 1024) {
    responsiveScale = 1.2; // Pantallas muy grandes
  }
  
  return calculateFontSize(baseSize, responsiveScale, preferences);
};

// Configuración de accesibilidad para diferentes orientaciones
export const getOrientationFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  isLandscape: boolean
): number => {
  const orientationScale = isLandscape ? 0.9 : 1.0; // Reducir tamaño en landscape
  return calculateFontSize(baseSize, orientationScale, preferences);
};

// Configuración de accesibilidad para diferentes densidades de píxeles
export const getPixelDensityFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  pixelDensity: number
): number => {
  let densityScale = 1.0;
  
  if (pixelDensity >= 3) {
    densityScale = 1.1; // Pantallas de alta densidad
  } else if (pixelDensity >= 2) {
    densityScale = 1.05; // Pantallas de densidad media
  }
  
  return calculateFontSize(baseSize, densityScale, preferences);
};

// Configuración de accesibilidad para diferentes idiomas
export const getLanguageFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  language: string
): number => {
  let languageScale = 1.0;
  
  // Ajustar escala según el idioma
  switch (language) {
    case 'zh':
    case 'ja':
    case 'ko':
      languageScale = 1.1; // Idiomas asiáticos pueden necesitar texto más grande
      break;
    case 'ar':
    case 'he':
      languageScale = 1.05; // Idiomas RTL pueden necesitar ajustes
      break;
    default:
      languageScale = 1.0;
  }
  
  return calculateFontSize(baseSize, languageScale, preferences);
};

// Configuración de accesibilidad para diferentes temas
export const getThemeFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  theme: 'light' | 'dark'
): number => {
  const themeScale = theme === 'dark' ? 1.05 : 1.0; // Ligeramente más grande en modo oscuro
  return calculateFontSize(baseSize, themeScale, preferences);
};

// Configuración de accesibilidad para diferentes tipos de contenido
export const getContentTypeFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button'
): number => {
  let contentTypeScale = 1.0;
  
  switch (contentType) {
    case 'title':
      contentTypeScale = 1.5;
      break;
    case 'subtitle':
      contentTypeScale = 1.25;
      break;
    case 'body':
      contentTypeScale = 1.0;
      break;
    case 'caption':
      contentTypeScale = 0.875;
      break;
    case 'button':
      contentTypeScale = 1.1;
      break;
  }
  
  return calculateFontSize(baseSize, contentTypeScale, preferences);
};

// Configuración de accesibilidad para diferentes estados
export const getStateFontSizes = (
  baseSize: number,
  preferences: AccessibilityPreferences,
  state: 'normal' | 'focused' | 'pressed' | 'disabled'
): number => {
  let stateScale = 1.0;
  
  switch (state) {
    case 'focused':
      stateScale = 1.05; // Ligeramente más grande cuando está enfocado
      break;
    case 'pressed':
      stateScale = 0.95; // Ligeramente más pequeño cuando está presionado
      break;
    case 'disabled':
      stateScale = 0.9; // Más pequeño cuando está deshabilitado
      break;
    default:
      stateScale = 1.0;
  }
  
  return calculateFontSize(baseSize, stateScale, preferences);
};

// Exportar configuración por defecto
export const accessibilityConfig = DEFAULT_ACCESSIBILITY_CONFIG;
