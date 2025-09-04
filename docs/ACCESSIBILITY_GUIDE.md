# Sistema de Accesibilidad - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Configuración de Accesibilidad](#configuración-de-accesibilidad)
3. [Servicio de Accesibilidad](#servicio-de-accesibilidad)
4. [Componentes de Accesibilidad](#componentes-de-accesibilidad)
5. [Integración con Temas](#integración-con-temas)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

El **Sistema de Accesibilidad** permite a los usuarios personalizar el tamaño de la tipografía y otras opciones de accesibilidad para mejorar la legibilidad, especialmente para personas con problemas de visión.

### **¿Por qué Sistema de Accesibilidad?**

#### **✅ Ventajas Principales**
- 👁️ **Mejora la legibilidad** para usuarios con problemas de visión
- 📱 **Adaptable a diferentes dispositivos** y tamaños de pantalla
- 🎯 **Configuración personalizable** según las necesidades del usuario
- 💾 **Persistencia de preferencias** entre sesiones
- 🔄 **Actualización en tiempo real** de los cambios
- 📊 **Recomendaciones inteligentes** basadas en el dispositivo

#### **❌ Alternativas Menos Recomendadas**
- ❌ **Tamaño fijo**: No se adapta a las necesidades del usuario
- ❌ **Configuración del sistema**: No permite personalización específica
- ❌ **Sin persistencia**: Las preferencias se pierden al cerrar la app

## ⚙️ Configuración de Accesibilidad

### **1. Configuración de Tipografía**

```typescript
interface AccessibilityConfig {
  typography: {
    // Tamaños de fuente disponibles
    sizes: {
      xs: number;      // Extra pequeño (12px)
      sm: number;       // Pequeño (14px)
      base: number;     // Normal (16px)
      lg: number;       // Grande (18px)
      xl: number;       // Extra grande (20px)
      '2xl': number;    // 2X grande (24px)
      '3xl': number;    // 3X grande (30px)
      '4xl': number;    // 4X grande (36px)
    };
    // Escalas de tamaño
    scale: {
      small: number;    // Escala pequeña (0.8)
      normal: number;   // Escala normal (1.0)
      large: number;    // Escala grande (1.2)
      extraLarge: number; // Escala extra grande (1.5)
    };
    // Configuración de línea
    lineHeight: {
      tight: number;    // Línea apretada (1.2)
      normal: number;   // Línea normal (1.5)
      relaxed: number;  // Línea relajada (1.7)
      loose: number;    // Línea suelta (2.0)
    };
    // Configuración de peso
    fontWeight: {
      light: string;    // 300
      normal: string;   // 400
      medium: string;   // 500
      semibold: string; // 600
      bold: string;     // 700
      extrabold: string; // 800
    };
  };
}
```

### **2. Preferencias de Usuario**

```typescript
interface AccessibilityPreferences {
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
```

### **3. Configuración por Defecto**

```typescript
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
```

## 🔧 Servicio de Accesibilidad

### **1. Funcionalidades Principales**

```typescript
class AccessibilityService {
  // Gestión de preferencias
  async loadPreferences(): Promise<void>
  async savePreferences(): Promise<void>
  getPreferences(): AccessibilityPreferences
  async updatePreferences(updates: Partial<AccessibilityPreferences>): Promise<void>
  
  // Actualización de configuración
  async updateFontSize(fontSize: 'small' | 'normal' | 'large' | 'extraLarge'): Promise<void>
  async updateFontSizeScale(scale: number): Promise<void>
  async updateLineHeight(lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose'): Promise<void>
  async updateContrast(contrast: 'low' | 'normal' | 'high' | 'veryHigh'): Promise<void>
  
  // Alternar opciones
  async toggleHighContrast(): Promise<void>
  async toggleBoldText(): Promise<void>
  async toggleReduceMotion(): Promise<void>
  
  // Cálculo de estilos
  getFontSize(baseSize: number, contentType?: string, state?: string): number
  getLineHeight(fontSize: number): number
  getLetterSpacing(fontSize: number): number
  getWordSpacing(fontSize: number): number
  getFontWeight(): string
  getTextStyles(baseSize: number, contentType?: string, state?: string): object
  
  // Información del dispositivo
  getDeviceInfo(): object
  getAccessibilityRecommendations(): Array<object>
  async applyRecommendations(): Promise<void>
}
```

### **2. Hook de Accesibilidad**

```typescript
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

  const getTextStyles = useCallback((
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ) => {
    return accessibilityService.getTextStyles(baseSize, contentType, state);
  }, []);

  return {
    preferences,
    updateFontSize,
    updateFontSizeScale,
    getTextStyles,
    // ... otras funciones
  };
};
```

### **3. Cálculo de Tamaños de Fuente**

```typescript
// Calcular tamaño de fuente con todas las consideraciones
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
```

## 🧩 Componentes de Accesibilidad

### **1. AccessibilitySettings Component**

```typescript
const AccessibilitySettings: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
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
    getDeviceInfo,
    getRecommendations,
    applyRecommendations,
  } = useAccessibility();

  const handleFontSizeChange = async (fontSize: 'small' | 'normal' | 'large' | 'extraLarge') => {
    try {
      await updateFontSize(fontSize);
      trackUserAction('font_size_changed', {
        new_size: fontSize,
        previous_size: preferences.fontSize,
      });
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo actualizar el tamaño de fuente');
    }
  };

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Tamaño de fuente */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Tamaño de Fuente</Title>
            
            <View className="mt-4 space-y-4">
              {/* Tamaños predefinidos */}
              <View className="flex-row space-x-2">
                {(['small', 'normal', 'large', 'extraLarge'] as const).map((size) => (
                  <TouchableOpacity
                    key={size}
                    className={`px-3 py-2 rounded ${
                      preferences.fontSize === size
                        ? themedClasses.btnPrimary
                        : themedClasses.btnSecondary
                    }`}
                    onPress={() => handleFontSizeChange(size)}
                  >
                    <Text className="font-medium text-center">
                      {size === 'small' && 'Pequeño'}
                      {size === 'normal' && 'Normal'}
                      {size === 'large' && 'Grande'}
                      {size === 'extraLarge' && 'Extra Grande'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Escala personalizada */}
              <View>
                <Text className={themedClasses.textSecondary + ' mb-2'}>
                  Escala personalizada: {fontSizeScale.toFixed(1)}x
                </Text>
                <Slider
                  value={fontSizeScale}
                  onValueChange={handleFontSizeScaleChange}
                  minimumValue={accessibilityConfig.zoom.min}
                  maximumValue={accessibilityConfig.zoom.max}
                  step={accessibilityConfig.zoom.step}
                />
              </View>

              {/* Vista previa */}
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text style={getExampleTextStyles('title')} className="mb-2">
                  Título de ejemplo
                </Text>
                <Text style={getExampleTextStyles('body')} className="mb-2">
                  Este es un texto de ejemplo que muestra cómo se verá el contenido.
                </Text>
                <Text style={getExampleTextStyles('caption')}>
                  Texto pequeño de ejemplo
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Altura de línea */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Altura de Línea</Title>
            
            <View className="mt-4 space-y-2">
              {(['tight', 'normal', 'relaxed', 'loose'] as const).map((lineHeight) => (
                <TouchableOpacity
                  key={lineHeight}
                  className={`p-3 rounded ${
                    preferences.lineHeight === lineHeight
                      ? themedClasses.btnPrimary
                      : themedClasses.btnSecondary
                  }`}
                  onPress={() => handleLineHeightChange(lineHeight)}
                >
                  <Text className="font-medium">
                    {lineHeight === 'tight' && 'Apretada'}
                    {lineHeight === 'normal' && 'Normal'}
                    {lineHeight === 'relaxed' && 'Relajada'}
                    {lineHeight === 'loose' && 'Suelta'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Opciones adicionales */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Opciones Adicionales</Title>
            
            <View className="mt-4 space-y-4">
              {/* Alto contraste */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={themedClasses.textPrimary + ' font-medium'}>
                    Alto Contraste
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Usar colores de máximo contraste
                  </Text>
                </View>
                <Switch
                  value={preferences.enableHighContrast}
                  onValueChange={handleToggleHighContrast}
                />
              </View>

              {/* Texto en negrita */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={themedClasses.textPrimary + ' font-medium'}>
                    Texto en Negrita
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Mostrar todo el texto en negrita
                  </Text>
                </View>
                <Switch
                  value={preferences.enableBoldText}
                  onValueChange={handleToggleBoldText}
                />
              </View>

              {/* Reducir movimiento */}
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className={themedClasses.textPrimary + ' font-medium'}>
                    Reducir Movimiento
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Minimizar animaciones y transiciones
                  </Text>
                </View>
                <Switch
                  value={preferences.enableReduceMotion}
                  onValueChange={handleToggleReduceMotion}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Recomendaciones */}
        {recommendations.length > 0 && (
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Recomendaciones</Title>
              
              <View className="mt-4 space-y-3">
                {recommendations.map((recommendation, index) => (
                  <View key={index} className="p-3 bg-surface rounded-md">
                    <Text className={themedClasses.textSecondary}>
                      {recommendation.message}
                    </Text>
                  </View>
                ))}
                
                <TouchableOpacity
                  className={themedClasses.btnPrimary}
                  onPress={handleApplyRecommendations}
                  disabled={isApplyingRecommendations}
                >
                  <Text className="text-white font-medium text-center">
                    {isApplyingRecommendations ? 'Aplicando...' : 'Aplicar Recomendaciones'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};
```

## 🎨 Integración con Temas

### **1. Hook useTheme Actualizado**

```typescript
export const useTheme = () => {
  const systemColorScheme = useColorScheme() as ColorScheme;
  const { themeMode, setThemeMode } = useAppStore();
  const { getTextStyles, getFontSize } = useAccessibility();
  
  // ... código existente

  // Funciones de accesibilidad integradas
  const getAccessibleTextStyles = useCallback((
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ) => {
    return getTextStyles(baseSize, contentType, state);
  }, [getTextStyles]);

  const getAccessibleFontSize = useCallback((
    baseSize: number,
    contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
    state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
  ) => {
    return getFontSize(baseSize, contentType, state);
  }, [getFontSize]);

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
    
    // Funciones de accesibilidad
    getAccessibleTextStyles,
    getAccessibleFontSize,
    
    // Información del sistema
    systemColorScheme,
  };
};
```

### **2. Uso en Componentes**

```typescript
const MyComponent: React.FC = () => {
  const { getAccessibleTextStyles, getAccessibleFontSize } = useTheme();
  const { themedClasses } = useTheme();

  // Obtener estilos de texto accesibles
  const titleStyles = getAccessibleTextStyles(24, 'title');
  const bodyStyles = getAccessibleTextStyles(16, 'body');
  const captionStyles = getAccessibleTextStyles(14, 'caption');

  return (
    <View className={themedClasses.container}>
      <Text style={titleStyles} className={themedClasses.textPrimary}>
        Título Accesible
      </Text>
      
      <Text style={bodyStyles} className={themedClasses.textSecondary}>
        Este texto se ajustará automáticamente según las preferencias de accesibilidad del usuario.
      </Text>
      
      <Text style={captionStyles} className={themedClasses.textTertiary}>
        Texto pequeño accesible
      </Text>
    </View>
  );
};
```

## 🎯 Casos de Uso

### **1. Usuario con Problemas de Visión**

**Escenario**: Usuario con visión reducida necesita texto más grande

**Solución**:
```typescript
// El usuario puede configurar el tamaño de fuente
const handleFontSizeChange = async (fontSize: 'large' | 'extraLarge') => {
  await updateFontSize(fontSize);
  // El texto se actualiza automáticamente en toda la app
};

// En cualquier componente
const { getAccessibleTextStyles } = useTheme();
const textStyles = getAccessibleTextStyles(16, 'body'); // Se ajusta automáticamente
```

### **2. Usuario en Dispositivo Pequeño**

**Escenario**: Usuario con pantalla pequeña necesita mejor legibilidad

**Solución**:
```typescript
// El sistema detecta automáticamente el tamaño de pantalla
const deviceInfo = getDeviceInfo();
if (deviceInfo.screenWidth < 320) {
  // Recomienda aumentar el tamaño de fuente
  const recommendations = getRecommendations();
  // Muestra recomendación: "Pantalla pequeña detectada. Considera aumentar el tamaño de fuente."
}
```

### **3. Usuario con Alto Contraste**

**Escenario**: Usuario necesita máximo contraste para mejor legibilidad

**Solución**:
```typescript
// El usuario puede habilitar alto contraste
const handleToggleHighContrast = async () => {
  await toggleHighContrast();
  // Los colores se ajustan automáticamente a máximo contraste
};

// En los componentes
const { getContrastStyles } = useAccessibility();
const contrastStyles = getContrastStyles(foregroundColor, backgroundColor);
// Retorna colores de máximo contraste si está habilitado
```

### **4. Usuario con Reducción de Movimiento**

**Escenario**: Usuario sensible a las animaciones necesita reducción de movimiento

**Solución**:
```typescript
// El usuario puede habilitar reducción de movimiento
const handleToggleReduceMotion = async () => {
  await toggleReduceMotion();
  // Las animaciones se minimizan automáticamente
};

// En las animaciones
const { getAnimationConfig } = useAccessibility();
const animationConfig = getAnimationConfig();
// Retorna { duration: 0 } si está habilitada la reducción de movimiento
```

## ✅ Mejores Prácticas

### **1. Uso de Estilos Accesibles**

```typescript
// ✅ Correcto - Usar estilos accesibles
const MyComponent: React.FC = () => {
  const { getAccessibleTextStyles } = useTheme();
  
  return (
    <Text style={getAccessibleTextStyles(16, 'body')}>
      Texto que se ajusta automáticamente
    </Text>
  );
};

// ❌ Incorrecto - Usar tamaños fijos
const MyComponent: React.FC = () => {
  return (
    <Text style={{ fontSize: 16 }}>
      Texto con tamaño fijo
    </Text>
  );
};
```

### **2. Gestión de Preferencias**

```typescript
// ✅ Correcto - Guardar preferencias automáticamente
const handleFontSizeChange = async (fontSize: 'large') => {
  try {
    await updateFontSize(fontSize);
    // Las preferencias se guardan automáticamente
  } catch (error) {
    console.error('Error actualizando tamaño de fuente:', error);
  }
};

// ❌ Incorrecto - No manejar errores
const handleFontSizeChange = (fontSize: 'large') => {
  updateFontSize(fontSize); // Sin manejo de errores
};
```

### **3. Recomendaciones Inteligentes**

```typescript
// ✅ Correcto - Proporcionar recomendaciones útiles
const getRecommendations = () => {
  const deviceInfo = getDeviceInfo();
  const recommendations = [];

  if (deviceInfo.screenWidth < 320) {
    recommendations.push({
      type: 'screen_size',
      message: 'Pantalla pequeña detectada. Considera aumentar el tamaño de fuente.',
      action: 'increase_font_size',
    });
  }

  return recommendations;
};

// ❌ Incorrecto - No proporcionar recomendaciones
const getRecommendations = () => {
  return []; // Sin recomendaciones útiles
};
```

### **4. Persistencia de Datos**

```typescript
// ✅ Correcto - Usar AsyncStorage para persistencia
class AccessibilityService {
  async savePreferences(): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCESSIBILITY_PREFERENCES_KEY, JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Error guardando preferencias:', error);
    }
  }
}

// ❌ Incorrecto - No persistir datos
class AccessibilityService {
  // Las preferencias se pierden al cerrar la app
}
```

## 🔧 Solución de Problemas

### **1. Tamaño de fuente no se actualiza**

**Problema**: Los cambios en el tamaño de fuente no se reflejan en la app

**Solución**:
```typescript
// Verificar que el hook esté suscrito a cambios
useEffect(() => {
  const unsubscribe = accessibilityService.subscribe((newPreferences) => {
    setPreferences(newPreferences);
  });

  return unsubscribe;
}, []);

// Verificar que los estilos se estén aplicando
const textStyles = getAccessibleTextStyles(16, 'body');
console.log('Estilos de texto:', textStyles);
```

### **2. Preferencias no se guardan**

**Problema**: Las preferencias se pierden al cerrar la app

**Solución**:
```typescript
// Verificar AsyncStorage
try {
  const savedPreferences = await AsyncStorage.getItem(ACCESSIBILITY_PREFERENCES_KEY);
  console.log('Preferencias guardadas:', savedPreferences);
} catch (error) {
  console.error('Error accediendo a AsyncStorage:', error);
}

// Verificar que se esté llamando savePreferences
async updatePreferences(updates: Partial<AccessibilityPreferences>): Promise<void> {
  this.preferences = { ...this.preferences, ...updates };
  await this.savePreferences(); // Asegurarse de que se llame
  this.notifyListeners();
}
```

### **3. Recomendaciones no aparecen**

**Problema**: Las recomendaciones de accesibilidad no se muestran

**Solución**:
```typescript
// Verificar información del dispositivo
const deviceInfo = getDeviceInfo();
console.log('Información del dispositivo:', deviceInfo);

// Verificar recomendaciones
const recommendations = getRecommendations();
console.log('Recomendaciones:', recommendations);

// Verificar condiciones de recomendación
if (deviceInfo.screenWidth < 320) {
  console.log('Pantalla pequeña detectada');
}
```

### **4. Estilos no se aplican correctamente**

**Problema**: Los estilos de accesibilidad no se aplican en todos los componentes

**Solución**:
```typescript
// Verificar que se esté usando getAccessibleTextStyles
const { getAccessibleTextStyles } = useTheme();

// En lugar de usar estilos fijos
<Text style={{ fontSize: 16 }}>Texto fijo</Text>

// Usar estilos accesibles
<Text style={getAccessibleTextStyles(16, 'body')}>Texto accesible</Text>
```

### **5. Rendimiento lento**

**Problema**: La app se vuelve lenta con las configuraciones de accesibilidad

**Solución**:
```typescript
// Optimizar cálculos con useCallback
const getAccessibleTextStyles = useCallback((
  baseSize: number,
  contentType: 'title' | 'subtitle' | 'body' | 'caption' | 'button' = 'body',
  state: 'normal' | 'focused' | 'pressed' | 'disabled' = 'normal'
) => {
  return getTextStyles(baseSize, contentType, state);
}, [getTextStyles]);

// Cachear resultados cuando sea posible
const textStylesCache = useMemo(() => {
  return getAccessibleTextStyles(16, 'body');
}, [getAccessibleTextStyles]);
```

## 📚 Ejemplos de Uso

### **1. Componente con Texto Accesible**

```typescript
const AccessibleTextComponent: React.FC = () => {
  const { getAccessibleTextStyles } = useTheme();
  const { themedClasses } = useTheme();

  const titleStyles = getAccessibleTextStyles(24, 'title');
  const bodyStyles = getAccessibleTextStyles(16, 'body');
  const captionStyles = getAccessibleTextStyles(14, 'caption');

  return (
    <View className={themedClasses.container}>
      <Text style={titleStyles} className={themedClasses.textPrimary}>
        Título Principal
      </Text>
      
      <Text style={bodyStyles} className={themedClasses.textSecondary}>
        Este texto se ajustará automáticamente según las preferencias de accesibilidad del usuario.
        El tamaño, altura de línea y peso de la fuente se adaptarán para mejorar la legibilidad.
      </Text>
      
      <Text style={captionStyles} className={themedClasses.textTertiary}>
        Texto de ejemplo con configuración accesible
      </Text>
    </View>
  );
};
```

### **2. Configuración de Accesibilidad**

```typescript
const AccessibilityConfigScreen: React.FC = () => {
  const { updateFontSize, updateFontSizeScale, toggleHighContrast } = useAccessibility();

  const handleLargeFont = async () => {
    await updateFontSize('large');
  };

  const handleExtraLargeFont = async () => {
    await updateFontSize('extraLarge');
  };

  const handleCustomScale = async (scale: number) => {
    await updateFontSizeScale(scale);
  };

  const handleToggleContrast = async () => {
    await toggleHighContrast();
  };

  return (
    <View>
      <Button onPress={handleLargeFont}>
        Texto Grande
      </Button>
      
      <Button onPress={handleExtraLargeFont}>
        Texto Extra Grande
      </Button>
      
      <Slider
        onValueChange={handleCustomScale}
        minimumValue={0.5}
        maximumValue={3.0}
        step={0.1}
      />
      
      <Button onPress={handleToggleContrast}>
        Alternar Alto Contraste
      </Button>
    </View>
  );
};
```

### **3. Integración con Navegación**

```typescript
const NavigationWithAccessibility: React.FC = () => {
  const { getAccessibleTextStyles } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            headerTitleStyle: getAccessibleTextStyles(20, 'title'),
          }}
        />
        <Stack.Screen
          name="Settings"
          component={AccessibilitySettings}
          options={{
            title: 'Configuración',
            headerTitleStyle: getAccessibleTextStyles(20, 'title'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

## 🎉 Conclusión

El Sistema de Accesibilidad proporciona:

- ✅ **Personalización completa** del tamaño de tipografía
- ✅ **Configuración persistente** entre sesiones
- ✅ **Recomendaciones inteligentes** basadas en el dispositivo
- ✅ **Integración perfecta** con el sistema de temas
- ✅ **Opciones adicionales** como alto contraste y texto en negrita
- ✅ **Actualización en tiempo real** de los cambios
- ✅ **Optimización de rendimiento** con useCallback y useMemo
- ✅ **Manejo robusto de errores** y casos edge

El sistema está completamente implementado y listo para usar, proporcionando una experiencia de usuario accesible y personalizable para personas con problemas de visión. 🚀
