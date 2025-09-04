import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, PixelRatio } from 'react-native';
import {
  AccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  accessibilityConfig,
  calculateFontSize,
  calculateLineHeight,
  calculateLetterSpacing,
  calculateWordSpacing,
  getResponsiveFontSizes,
  getOrientationFontSizes,
  getPixelDensityFontSizes,
  getLanguageFontSizes,
  getThemeFontSizes,
  getContentTypeFontSizes,
  getStateFontSizes,
} from '../config/accessibility';

// Clave para almacenar preferencias de accesibilidad
const ACCESSIBILITY_PREFERENCES_KEY = 'accessibility_preferences';

// Servicio de accesibilidad
class AccessibilityService {
  private preferences: AccessibilityPreferences;
  private listeners: Array<(preferences: AccessibilityPreferences) => void> = [];

  constructor() {
    this.preferences = { ...DEFAULT_ACCESSIBILITY_PREFERENCES };
    this.loadPreferences();
  }

  // Cargar preferencias guardadas
  async loadPreferences(): Promise<void> {
    try {
      const savedPreferences = await AsyncStorage.getItem(ACCESSIBILITY_PREFERENCES_KEY);
      if (savedPreferences) {
        this.preferences = { ...this.preferences, ...JSON.parse(savedPreferences) };
      }
    } catch (error) {
      console.error('❌ Error cargando preferencias de accesibilidad:', error);
    }
  }

  // Guardar preferencias
  async savePreferences(): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCESSIBILITY_PREFERENCES_KEY, JSON.stringify(this.preferences));
    } catch (error) {
      console.error('❌ Error guardando preferencias de accesibilidad:', error);
    }
  }

  // Obtener preferencias actuales
  getPreferences(): AccessibilityPreferences {
    return { ...this.preferences };
  }

  // Actualizar preferencias
  async updatePreferences(updates: Partial<AccessibilityPreferences>): Promise<void> {
    this.preferences = { ...this.preferences, ...updates };
    await this.savePreferences();
    this.notifyListeners();
  }

  // Actualizar tamaño de fuente
  async updateFontSize(fontSize: 'small' | 'normal' | 'large' | 'extraLarge'): Promise<void> {
    const scaleMap = {
      small: accessibilityConfig.typography.scale.small,
      normal: accessibilityConfig.typography.scale.normal,
      large: accessibilityConfig.typography.scale.large,
      extraLarge: accessibilityConfig.typography.scale.extraLarge,
    };

    await this.updatePreferences({
      fontSize,
      fontSizeScale: scaleMap[fontSize],
    });
  }

  // Actualizar escala de fuente personalizada
  async updateFontSizeScale(scale: number): Promise<void> {
    const clampedScale = Math.max(
      accessibilityConfig.zoom.min,
      Math.min(accessibilityConfig.zoom.max, scale)
    );

    await this.updatePreferences({
      fontSizeScale: clampedScale,
    });
  }

  // Actualizar altura de línea
  async updateLineHeight(lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose'): Promise<void> {
    await this.updatePreferences({ lineHeight });
  }

  // Actualizar contraste
  async updateContrast(contrast: 'low' | 'normal' | 'high' | 'veryHigh'): Promise<void> {
    await this.updatePreferences({ contrast });
  }

  // Actualizar espaciado de letras
  async updateLetterSpacing(letterSpacing: 'tight' | 'normal' | 'wide'): Promise<void> {
    await this.updatePreferences({ letterSpacing });
  }

  // Actualizar espaciado de palabras
  async updateWordSpacing(wordSpacing: 'tight' | 'normal' | 'wide'): Promise<void> {
    await this.updatePreferences({ wordSpacing });
  }

  // Actualizar zoom
  async updateZoom(zoom: number): Promise<void> {
    const clampedZoom = Math.max(
      accessibilityConfig.zoom.min,
      Math.min(accessibilityConfig.zoom.max, zoom)
    );

    await this.updatePreferences({ zoom: clampedZoom });
  }

  // Alternar alto contraste
  async toggleHighContrast(): Promise<void> {
    await this.updatePreferences({
      enableHighContrast: !this.preferences.enableHighContrast,
    });
  }

  // Alternar texto en negrita
  async toggleBoldText(): Promise<void> {
    await this.updatePreferences({
      enableBoldText: !this.preferences.enableBoldText,
    });
  }

  // Alternar reducción de movimiento
  async toggleReduceMotion(): Promise<void> {
    await this.updatePreferences({
      enableReduceMotion: !this.preferences.enableReduceMotion,
    });
  }

  // Alternar lector de pantalla
  async toggleScreenReader(): Promise<void> {
    await this.updatePreferences({
      enableScreenReader: !this.preferences.enableScreenReader,
    });
  }

  // Resetear preferencias a valores por defecto
  async resetPreferences(): Promise<void> {
    this.preferences = { ...DEFAULT_ACCESSIBILITY_PREFERENCES };
    await this.savePreferences();
    this.notifyListeners();
  }

  // Calcular tamaño de fuente para un elemento específico
  getFontSize(
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ): number {
    const { width } = Dimensions.get('window');
    const pixelDensity = PixelRatio.get();
    const isLandscape = width > Dimensions.get('window').height;

    // Calcular tamaño base con todas las consideraciones
    let fontSize = calculateFontSize(baseSize, 1.0, this.preferences);
    
    // Aplicar escala de tipo de contenido
    fontSize = getContentTypeFontSizes(fontSize, this.preferences, contentType);
    
    // Aplicar escala de estado
    fontSize = getStateFontSizes(fontSize, this.preferences, state);
    
    // Aplicar escala responsiva
    fontSize = getResponsiveFontSizes(fontSize, this.preferences, width);
    
    // Aplicar escala de orientación
    fontSize = getOrientationFontSizes(fontSize, this.preferences, isLandscape);
    
    // Aplicar escala de densidad de píxeles
    fontSize = getPixelDensityFontSizes(fontSize, this.preferences, pixelDensity);

    return Math.round(fontSize);
  }

  // Calcular altura de línea
  getLineHeight(fontSize: number): number {
    return calculateLineHeight(fontSize, this.preferences.lineHeight, accessibilityConfig);
  }

  // Calcular espaciado de letras
  getLetterSpacing(fontSize: number): number {
    return calculateLetterSpacing(fontSize, this.preferences.letterSpacing, accessibilityConfig);
  }

  // Calcular espaciado de palabras
  getWordSpacing(fontSize: number): number {
    return calculateWordSpacing(fontSize, this.preferences.wordSpacing, accessibilityConfig);
  }

  // Obtener peso de fuente
  getFontWeight(): string {
    if (this.preferences.enableBoldText) {
      return accessibilityConfig.typography.fontWeight.bold;
    }
    return accessibilityConfig.typography.fontWeight.normal;
  }

  // Obtener estilos de texto completos
  getTextStyles(
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ) {
    const fontSize = this.getFontSize(baseSize, contentType, state);
    const lineHeight = this.getLineHeight(fontSize);
    const letterSpacing = this.getLetterSpacing(fontSize);
    const wordSpacing = this.getWordSpacing(fontSize);
    const fontWeight = this.getFontWeight();

    return {
      fontSize,
      lineHeight,
      letterSpacing,
      wordSpacing,
      fontWeight,
    };
  }

  // Obtener estilos de contraste
  getContrastStyles(foregroundColor: string, backgroundColor: string) {
    if (this.preferences.enableHighContrast) {
      // En modo alto contraste, usar colores de máximo contraste
      return {
        color: '#FFFFFF',
        backgroundColor: '#000000',
      };
    }

    // Ajustar contraste según las preferencias
    const contrastLevel = this.preferences.contrast;
    const targetContrast = accessibilityConfig.contrast.levels[contrastLevel];

    // Aquí podrías implementar lógica para ajustar colores según el contraste objetivo
    // Por simplicidad, retornamos los colores originales
    return {
      color: foregroundColor,
      backgroundColor,
    };
  }

  // Obtener configuración de animaciones
  getAnimationConfig() {
    if (this.preferences.enableReduceMotion) {
      return {
        duration: 0,
        useNativeDriver: true,
      };
    }

    return {
      duration: 300,
      useNativeDriver: true,
    };
  }

  // Obtener configuración de zoom
  getZoomConfig() {
    return {
      scale: this.preferences.zoom,
      minScale: accessibilityConfig.zoom.min,
      maxScale: accessibilityConfig.zoom.max,
      step: accessibilityConfig.zoom.step,
    };
  }

  // Verificar si las preferencias han cambiado
  hasPreferencesChanged(newPreferences: AccessibilityPreferences): boolean {
    return JSON.stringify(this.preferences) !== JSON.stringify(newPreferences);
  }

  // Suscribirse a cambios en las preferencias
  subscribe(listener: (preferences: AccessibilityPreferences) => void): () => void {
    this.listeners.push(listener);
    
    // Retornar función para desuscribirse
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notificar a los listeners sobre cambios
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.preferences);
      } catch (error) {
        console.error('❌ Error notificando cambio de accesibilidad:', error);
      }
    });
  }

  // Obtener información del dispositivo
  getDeviceInfo() {
    const { width, height } = Dimensions.get('window');
    const pixelDensity = PixelRatio.get();
    const isLandscape = width > height;

    return {
      screenWidth: width,
      screenHeight: height,
      pixelDensity,
      isLandscape,
      aspectRatio: width / height,
    };
  }

  // Obtener recomendaciones de accesibilidad
  getAccessibilityRecommendations() {
    const deviceInfo = this.getDeviceInfo();
    const recommendations = [];

    // Recomendaciones basadas en el tamaño de pantalla
    if (deviceInfo.screenWidth < 320) {
      recommendations.push({
        type: 'screen_size',
        message: 'Pantalla pequeña detectada. Considera aumentar el tamaño de fuente.',
        action: 'increase_font_size',
      });
    }

    // Recomendaciones basadas en la densidad de píxeles
    if (deviceInfo.pixelDensity >= 3) {
      recommendations.push({
        type: 'high_density',
        message: 'Pantalla de alta densidad detectada. El texto puede parecer pequeño.',
        action: 'increase_font_size',
      });
    }

    // Recomendaciones basadas en las preferencias actuales
    if (this.preferences.fontSize === 'small') {
      recommendations.push({
        type: 'font_size',
        message: 'Tamaño de fuente pequeño detectado. Considera aumentarlo para mejor legibilidad.',
        action: 'increase_font_size',
      });
    }

    if (!this.preferences.enableHighContrast) {
      recommendations.push({
        type: 'contrast',
        message: 'Alto contraste deshabilitado. Considera habilitarlo para mejor legibilidad.',
        action: 'enable_high_contrast',
      });
    }

    return recommendations;
  }

  // Aplicar recomendaciones automáticamente
  async applyRecommendations(): Promise<void> {
    const recommendations = this.getAccessibilityRecommendations();
    const updates: Partial<AccessibilityPreferences> = {};

    recommendations.forEach(recommendation => {
      switch (recommendation.action) {
        case 'increase_font_size':
          if (this.preferences.fontSize === 'small') {
            updates.fontSize = 'normal';
            updates.fontSizeScale = accessibilityConfig.typography.scale.normal;
          } else if (this.preferences.fontSize === 'normal') {
            updates.fontSize = 'large';
            updates.fontSizeScale = accessibilityConfig.typography.scale.large;
          }
          break;
        case 'enable_high_contrast':
          updates.enableHighContrast = true;
          break;
      }
    });

    if (Object.keys(updates).length > 0) {
      await this.updatePreferences(updates);
    }
  }

  // Exportar preferencias
  exportPreferences(): string {
    return JSON.stringify({
      preferences: this.preferences,
      deviceInfo: this.getDeviceInfo(),
      timestamp: new Date().toISOString(),
    }, null, 2);
  }

  // Importar preferencias
  async importPreferences(data: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(data);
      if (parsed.preferences) {
        await this.updatePreferences(parsed.preferences);
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Error importando preferencias:', error);
      return false;
    }
  }
}

// Instancia singleton
export const accessibilityService = new AccessibilityService();

// Hook para usar el servicio de accesibilidad
export const useAccessibility = () => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(
    accessibilityService.getPreferences()
  );

  useEffect(() => {
    const unsubscribe = accessibilityService.subscribe((newPreferences) => {
      setPreferences(newPreferences);
    });

    return unsubscribe;
  }, []);

  const updateFontSize = useCallback(async (fontSize: 'small' | 'normal' | 'large' | 'extraLarge') => {
    await accessibilityService.updateFontSize(fontSize);
  }, []);

  const updateFontSizeScale = useCallback(async (scale: number) => {
    await accessibilityService.updateFontSizeScale(scale);
  }, []);

  const updateLineHeight = useCallback(async (lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose') => {
    await accessibilityService.updateLineHeight(lineHeight);
  }, []);

  const updateContrast = useCallback(async (contrast: 'low' | 'normal' | 'high' | 'veryHigh') => {
    await accessibilityService.updateContrast(contrast);
  }, []);

  const toggleHighContrast = useCallback(async () => {
    await accessibilityService.toggleHighContrast();
  }, []);

  const toggleBoldText = useCallback(async () => {
    await accessibilityService.toggleBoldText();
  }, []);

  const toggleReduceMotion = useCallback(async () => {
    await accessibilityService.toggleReduceMotion();
  }, []);

  const resetPreferences = useCallback(async () => {
    await accessibilityService.resetPreferences();
  }, []);

  const getTextStyles = useCallback((
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ) => {
    return accessibilityService.getTextStyles(baseSize, contentType, state);
  }, []);

  const getFontSize = useCallback((
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ) => {
    return accessibilityService.getFontSize(baseSize, contentType, state);
  }, []);

  const getDeviceInfo = useCallback(() => {
    return accessibilityService.getDeviceInfo();
  }, []);

  const getRecommendations = useCallback(() => {
    return accessibilityService.getAccessibilityRecommendations();
  }, []);

  const applyRecommendations = useCallback(async () => {
    await accessibilityService.applyRecommendations();
  }, []);

  return {
    preferences,
    updateFontSize,
    updateFontSizeScale,
    updateLineHeight,
    updateContrast,
    toggleHighContrast,
    toggleBoldText,
    toggleReduceMotion,
    resetPreferences,
    getTextStyles,
    getFontSize,
    getDeviceInfo,
    getRecommendations,
    applyRecommendations,
  };
};
