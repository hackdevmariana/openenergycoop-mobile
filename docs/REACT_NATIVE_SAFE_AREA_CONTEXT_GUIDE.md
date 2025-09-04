# React Native Safe Area Context - Guía Completa

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración de Safe Area](#configuración-de-safe-area)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

**React Native Safe Area Context** es una biblioteca que proporciona una forma segura de manejar las áreas seguras en React Native, especialmente importante para dispositivos con notch, home indicators y diferentes tamaños de pantalla.

### **¿Por qué React Native Safe Area Context?**

#### **✅ Ventajas Principales**
- 📱 **Compatibilidad universal**: Funciona en todos los dispositivos iOS y Android
- 🎯 **Detección automática**: Detecta automáticamente notch, home indicators y áreas seguras
- 🔧 **Configuración flexible**: Configuración detallada para diferentes tipos de dispositivos
- 📊 **Información completa**: Proporciona información detallada sobre insets y frame
- 🎮 **Componentes específicos**: Configuraciones específicas para diferentes tipos de componentes
- 🔄 **Integración perfecta**: Con React Navigation y otras librerías
- 📈 **Analytics integrado**: Seguimiento automático de interacciones
- 🎨 **Temas personalizados**: Configuraciones específicas para temas claros y oscuros

#### **❌ Alternativas Menos Recomendadas**
- ❌ **SafeAreaView nativo**: Limitado y menos flexible
- ❌ **Detección manual**: Propenso a errores y difícil de mantener
- ❌ **Configuración hardcodeada**: No se adapta a diferentes dispositivos

## ⚙️ Instalación y Configuración

### **1. Instalación**

```bash
npm install react-native-safe-area-context
```

### **2. Configuración del Provider**

```typescript
// App.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      {/* Tu app aquí */}
    </SafeAreaProvider>
  );
};
```

## 🎨 Configuración de Safe Area

### **1. Configuración Básica**

```typescript
// src/config/safeArea.ts
import { Platform, Dimensions } from 'react-native';

export const SAFE_AREA_CONFIG = {
  basic: {
    enabled: true,
    platform: {
      ios: {
        useSafeAreaInsets: true,
        edges: ['top', 'right', 'bottom', 'left'],
        minimumPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      android: {
        useSafeAreaInsets: true,
        edges: ['top', 'right', 'bottom', 'left'],
        minimumPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    },
  },
  
  components: {
    screen: {
      edges: ['top', 'right', 'bottom', 'left'],
      minimumPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      style: {
        flex: 1,
      },
    },
    
    content: {
      edges: ['right', 'left'],
      minimumPadding: {
        top: 0,
        right: 16,
        bottom: 0,
        left: 16,
      },
      style: {
        flex: 1,
      },
    },
  },
};
```

### **2. Configuraciones de Dispositivos**

```typescript
export const DEVICE_SAFE_AREA_CONFIGS = {
  iphoneNotch: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 44, // Altura del notch
      right: 0,
      bottom: 34, // Altura del home indicator
      left: 0,
    },
  },
  
  androidNotch: {
    edges: ['top', 'right', 'bottom', 'left'],
    minimumPadding: {
      top: 24, // Status bar
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
};
```

## 🎣 Hook Personalizado

### **1. Hook useSafeArea**

```typescript
// src/hooks/useSafeArea.ts
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();

  // Información del dispositivo
  const deviceInfo = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    const pixelRatio = PixelRatio.get();
    const isLandscape = width > height;
    const minDimension = Math.min(width, height);
    
    // Determinar tamaño de pantalla
    let screenSize: 'small' | 'medium' | 'large';
    if (minDimension < 375) {
      screenSize = 'small';
    } else if (minDimension < 768) {
      screenSize = 'medium';
    } else {
      screenSize = 'large';
    }
    
    // Determinar densidad de píxeles
    let pixelDensity: 'low' | 'medium' | 'high' | 'xhigh';
    if (pixelRatio < 2) {
      pixelDensity = 'low';
    } else if (pixelRatio < 3) {
      pixelDensity = 'medium';
    } else if (pixelRatio < 4) {
      pixelDensity = 'high';
    } else {
      pixelDensity = 'xhigh';
    }
    
    // Determinar orientación
    const orientation: 'portrait' | 'landscape' = isLandscape ? 'landscape' : 'portrait';
    
    // Determinar tipo de dispositivo
    let deviceType: 'iphoneNotch' | 'iphoneClassic' | 'androidNotch' | 'androidClassic' | 'tablet';
    if (Platform.OS === 'ios') {
      if (insets.top > 20) {
        deviceType = 'iphoneNotch';
      } else {
        deviceType = 'iphoneClassic';
      }
    } else if (Platform.OS === 'android') {
      if (insets.top > 24) {
        deviceType = 'androidNotch';
      } else {
        deviceType = 'androidClassic';
      }
    } else {
      deviceType = 'tablet';
    }
    
    return {
      width,
      height,
      pixelRatio,
      isLandscape,
      minDimension,
      screenSize,
      pixelDensity,
      orientation,
      deviceType,
      insets,
      frame,
    };
  }, [insets, frame]);

  // Función para obtener estilos de safe area
  const getSafeAreaStyles = useCallback((
    componentType: keyof typeof safeAreaConfig.componentConfigs,
    screenType?: keyof typeof safeAreaConfig.screenConfigs,
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    const config = getSafeAreaConfig(componentType, screenType);
    
    const padding = {
      paddingTop: Math.max(insets.top, config.minimumPadding.top, customPadding?.top || 0),
      paddingRight: Math.max(insets.right, config.minimumPadding.right, customPadding?.right || 0),
      paddingBottom: Math.max(insets.bottom, config.minimumPadding.bottom, customPadding?.bottom || 0),
      paddingLeft: Math.max(insets.left, config.minimumPadding.left, customPadding?.left || 0),
    };
    
    return {
      ...config.style,
      ...padding,
    };
  }, [insets, getSafeAreaConfig]);

  // Función para obtener estilos de safe area para pantallas
  const getScreenSafeAreaStyles = useCallback((
    screenType: keyof typeof safeAreaConfig.screenConfigs,
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('screen', screenType, customPadding);
  }, [getSafeAreaStyles]);

  // Función para obtener estilos de safe area para contenido
  const getContentSafeAreaStyles = useCallback((
    customPadding?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    }
  ) => {
    return getSafeAreaStyles('content', undefined, customPadding);
  }, [getSafeAreaStyles]);

  // Función para verificar si hay notch
  const hasNotch = useCallback(() => {
    return insets.top > (Platform.OS === 'ios' ? 20 : 24);
  }, [insets.top]);

  // Función para verificar si hay home indicator
  const hasHomeIndicator = useCallback(() => {
    return insets.bottom > 0;
  }, [insets.bottom]);

  // Función para obtener altura del status bar
  const getStatusBarHeight = useCallback(() => {
    return insets.top;
  }, [insets.top]);

  // Función para obtener altura del home indicator
  const getHomeIndicatorHeight = useCallback(() => {
    return insets.bottom;
  }, [insets.bottom]);

  // Función para obtener área segura disponible
  const getAvailableArea = useCallback(() => {
    return {
      width: frame.width - insets.left - insets.right,
      height: frame.height - insets.top - insets.bottom,
      area: (frame.width - insets.left - insets.right) * (frame.height - insets.top - insets.bottom),
    };
  }, [frame, insets]);

  return {
    // Información del dispositivo
    deviceInfo,
    
    // Insets y frame
    insets,
    frame,
    
    // Funciones de estilos específicos
    getSafeAreaStyles,
    getScreenSafeAreaStyles,
    getContentSafeAreaStyles,
    getHeaderSafeAreaStyles,
    getBottomSheetSafeAreaStyles,
    getModalSafeAreaStyles,
    getFabSafeAreaStyles,
    getTooltipSafeAreaStyles,
    getListSafeAreaStyles,
    getFormSafeAreaStyles,
    getNavigationBarSafeAreaStyles,
    getTabBarSafeAreaStyles,
    getActionButtonSafeAreaStyles,
    
    // Funciones de información
    getInsetsInfo,
    getFrameInfo,
    hasNotch,
    hasHomeIndicator,
    getStatusBarHeight,
    getHomeIndicatorHeight,
    getLateralInsets,
    getVerticalInsets,
    getAvailableArea,
    
    // Configuración completa
    safeAreaConfig,
  };
};
```

## 🧩 Componente de Demostración

### **1. SafeAreaDemo Component**

```typescript
// src/components/SafeAreaDemo.tsx
const SafeAreaDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    deviceInfo,
    insets,
    frame,
    getSafeAreaStyles,
    getScreenSafeAreaStyles,
    getContentSafeAreaStyles,
    getHeaderSafeAreaStyles,
    getBottomSheetSafeAreaStyles,
    getModalSafeAreaStyles,
    getFabSafeAreaStyles,
    getTooltipSafeAreaStyles,
    getListSafeAreaStyles,
    getFormSafeAreaStyles,
    getNavigationBarSafeAreaStyles,
    getTabBarSafeAreaStyles,
    getActionButtonSafeAreaStyles,
    getInsetsInfo,
    getFrameInfo,
    hasNotch,
    hasHomeIndicator,
    getStatusBarHeight,
    getHomeIndicatorHeight,
    getLateralInsets,
    getVerticalInsets,
    getAvailableArea,
    getDeviceCompleteConfig,
  } = useSafeArea();

  // Estados para controlar demostraciones
  const [showModal, setShowModal] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'dashboard' | 'settings' | 'charts'>('home');

  // Información del dispositivo
  const deviceCompleteConfig = getDeviceCompleteConfig();
  const insetsInfo = getInsetsInfo();
  const frameInfo = getFrameInfo();
  const availableArea = getAvailableArea();

  // Estilos de safe area para diferentes componentes
  const screenStyles = getScreenSafeAreaStyles(currentScreen);
  const contentStyles = getContentSafeAreaStyles();
  const headerStyles = getHeaderSafeAreaStyles();
  const bottomSheetStyles = getBottomSheetSafeAreaStyles();
  const modalStyles = getModalSafeAreaStyles();
  const fabStyles = getFabSafeAreaStyles();
  const tooltipStyles = getTooltipSafeAreaStyles();
  const listStyles = getListSafeAreaStyles();
  const formStyles = getFormSafeAreaStyles();
  const navigationBarStyles = getNavigationBarSafeAreaStyles();
  const tabBarStyles = getTabBarSafeAreaStyles();
  const actionButtonStyles = getActionButtonSafeAreaStyles();

  const handleScreenChange = (screen: typeof currentScreen) => {
    setCurrentScreen(screen);
    trackUserAction('screen_changed', { screen });
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
    trackUserAction('modal_toggled', { showModal: !showModal });
  };

  const handleBottomSheetToggle = () => {
    setShowBottomSheet(!showBottomSheet);
    trackUserAction('bottom_sheet_toggled', { showBottomSheet: !showBottomSheet });
  };

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
    trackUserAction('tooltip_toggled', { showTooltip: !showTooltip });
  };

  const screens = [
    { key: 'home', label: 'Inicio', icon: '🏠' },
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'settings', label: 'Configuración', icon: '⚙️' },
    { key: 'charts', label: 'Gráficos', icon: '📈' },
  ] as const;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={screenStyles}>
        <ScrollView className={themedClasses.container}>
          <View style={contentStyles}>
            {/* Header */}
            <View style={headerStyles} className="mb-6">
              <Title className="text-2xl font-bold mb-2">
                React Native Safe Area Demo
              </Title>
              <Paragraph className="text-text-secondary">
                Demostración de Safe Area Context para diferentes dispositivos y orientaciones
              </Paragraph>
            </View>

            {/* Información del dispositivo */}
            <Card className={themedClasses.card}>
              <Card.Content>
                <Title>Información del Dispositivo</Title>
                <Paragraph>Plataforma: {deviceInfo.deviceType}</Paragraph>
                <Paragraph>Tamaño de pantalla: {deviceInfo.screenSize}</Paragraph>
                <Paragraph>Densidad de píxeles: {deviceInfo.pixelDensity}</Paragraph>
                <Paragraph>Orientación: {deviceInfo.orientation}</Paragraph>
                <Paragraph>Notch: {hasNotch() ? 'Sí' : 'No'}</Paragraph>
                <Paragraph>Home Indicator: {hasHomeIndicator() ? 'Sí' : 'No'}</Paragraph>
              </Card.Content>
            </Card>

            {/* Información de insets */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Información de Insets</Title>
                <Paragraph>Top: {insetsInfo.top}px</Paragraph>
                <Paragraph>Right: {insetsInfo.right}px</Paragraph>
                <Paragraph>Bottom: {insetsInfo.bottom}px</Paragraph>
                <Paragraph>Left: {insetsInfo.left}px</Paragraph>
                <Paragraph>Total Horizontal: {insetsInfo.total.horizontal}px</Paragraph>
                <Paragraph>Total Vertical: {insetsInfo.total.vertical}px</Paragraph>
              </Card.Content>
            </Card>

            {/* Información del frame */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Información del Frame</Title>
                <Paragraph>Ancho: {frameInfo.width}px</Paragraph>
                <Paragraph>Alto: {frameInfo.height}px</Paragraph>
                <Paragraph>Relación de aspecto: {frameInfo.aspectRatio.toFixed(2)}</Paragraph>
                <Paragraph>Es horizontal: {frameInfo.isLandscape ? 'Sí' : 'No'}</Paragraph>
              </Card.Content>
            </Card>

            {/* Área disponible */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Área Disponible</Title>
                <Paragraph>Ancho: {availableArea.width}px</Paragraph>
                <Paragraph>Alto: {availableArea.height}px</Paragraph>
                <Paragraph>Área total: {availableArea.area.toLocaleString()}px²</Paragraph>
              </Card.Content>
            </Card>

            {/* Selector de pantalla */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Selector de Pantalla</Title>
                <Paragraph>Pantalla actual: {currentScreen}</Paragraph>
                
                <View className="mt-4 flex-row flex-wrap gap-2">
                  {screens.map((screen) => (
                    <TouchableOpacity
                      key={screen.key}
                      className={`px-3 py-2 rounded ${
                        currentScreen === screen.key
                          ? themedClasses.btnPrimary
                          : themedClasses.btnSecondary
                      }`}
                      onPress={() => handleScreenChange(screen.key)}
                    >
                      <Text className={`font-medium text-center ${
                        currentScreen === screen.key ? 'text-white' : ''
                      }`}>
                        {screen.icon} {screen.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card.Content>
            </Card>

            {/* Demostración de estilos */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Demostración de Estilos</Title>
                <Paragraph>Estilos aplicados según el tipo de componente</Paragraph>
                
                <View className="mt-4 space-y-4">
                  {/* Header */}
                  <View style={headerStyles} className="p-4 bg-primary rounded-md">
                    <Text className="text-white font-bold text-center">Header con Safe Area</Text>
                  </View>

                  {/* Content */}
                  <View style={contentStyles} className="p-4 bg-secondary rounded-md">
                    <Text className="text-white font-bold text-center">Contenido con Safe Area</Text>
                  </View>

                  {/* List */}
                  <View style={listStyles} className="p-4 bg-tertiary rounded-md">
                    <Text className="text-white font-bold text-center">Lista con Safe Area</Text>
                  </View>

                  {/* Form */}
                  <View style={formStyles} className="p-4 bg-surface rounded-md border border-border">
                    <Text className="font-bold text-center">Formulario con Safe Area</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Botones de acción */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Botones de Acción</Title>
                <Paragraph>Demostración de diferentes tipos de componentes</Paragraph>
                
                <View className="mt-4 space-y-3">
                  <Button
                    mode="contained"
                    onPress={handleModalToggle}
                    className="mb-2"
                  >
                    {showModal ? 'Cerrar Modal' : 'Abrir Modal'}
                  </Button>
                  
                  <Button
                    mode="contained"
                    onPress={handleBottomSheetToggle}
                    className="mb-2"
                  >
                    {showBottomSheet ? 'Cerrar Bottom Sheet' : 'Abrir Bottom Sheet'}
                  </Button>
                  
                  <Button
                    mode="contained"
                    onPress={handleTooltipToggle}
                    className="mb-2"
                  >
                    {showTooltip ? 'Ocultar Tooltip' : 'Mostrar Tooltip'}
                  </Button>
                </View>
              </Card.Content>
            </Card>

            {/* Configuración completa */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Configuración Completa</Title>
                <Paragraph>Configuración detallada del dispositivo</Paragraph>
                
                <View className="mt-4 p-4 bg-surface rounded-md">
                  <Text className={themedClasses.textSecondary + ' mb-2'}>
                    Configuración del Dispositivo:
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Tipo: {deviceCompleteConfig.deviceInfo.deviceType}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Tamaño: {deviceCompleteConfig.deviceInfo.screenSize}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Densidad: {deviceCompleteConfig.deviceInfo.pixelDensity}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Orientación: {deviceCompleteConfig.deviceInfo.orientation}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Notch: {deviceCompleteConfig.hasNotch ? 'Sí' : 'No'}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Home Indicator: {deviceCompleteConfig.hasHomeIndicator ? 'Sí' : 'No'}
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Status Bar: {deviceCompleteConfig.statusBarHeight}px
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    • Home Indicator: {deviceCompleteConfig.homeIndicatorHeight}px
                  </Text>
                </View>
              </Card.Content>
            </Card>

            {/* Footer */}
            <View className="mt-6 p-4 bg-surface rounded-md">
              <Paragraph className="text-center">
                React Native Safe Area Context está configurado y funcionando
              </Paragraph>
              <Paragraph className="text-center mt-2">
                Todos los componentes respetan las áreas seguras del dispositivo
              </Paragraph>
            </View>
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <View style={fabStyles}>
          <TouchableOpacity
            className="w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
            onPress={() => trackUserAction('fab_pressed', {})}
          >
            <Text className="text-white text-2xl">+</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        {showModal && (
          <View style={modalStyles} className="absolute inset-0 bg-black bg-opacity-50">
            <View className="flex-1 justify-center items-center">
              <View className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
                <Title>Modal con Safe Area</Title>
                <Paragraph className="mt-2">
                  Este modal respeta las áreas seguras del dispositivo.
                </Paragraph>
                <Button
                  mode="contained"
                  onPress={handleModalToggle}
                  className="mt-4"
                >
                  Cerrar
                </Button>
              </View>
            </View>
          </View>
        )}

        {/* Bottom Sheet */}
        {showBottomSheet && (
          <View style={bottomSheetStyles} className="absolute inset-0 bg-black bg-opacity-50">
            <View className="flex-1 justify-end">
              <View className="bg-white rounded-t-lg p-6">
                <Title>Bottom Sheet con Safe Area</Title>
                <Paragraph className="mt-2">
                  Este bottom sheet respeta las áreas seguras del dispositivo.
                </Paragraph>
                <Button
                  mode="contained"
                  onPress={handleBottomSheetToggle}
                  className="mt-4"
                >
                  Cerrar
                </Button>
              </View>
            </View>
          </View>
        )}

        {/* Tooltip */}
        {showTooltip && (
          <View style={tooltipStyles} className="absolute top-20 right-4">
            <View className="bg-black rounded-lg p-3 max-w-xs">
              <Text className="text-white text-sm">
                Este tooltip respeta las áreas seguras del dispositivo.
              </Text>
              <TouchableOpacity
                onPress={handleTooltipToggle}
                className="mt-2"
              >
                <Text className="text-white text-xs underline">Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Navigation Bar */}
        <View style={navigationBarStyles} className="absolute top-0 left-0 right-0">
          <View className="bg-primary p-4">
            <Text className="text-white font-bold text-center">Barra de Navegación</Text>
          </View>
        </View>

        {/* Tab Bar */}
        <View style={tabBarStyles} className="absolute bottom-0 left-0 right-0">
          <View className="bg-surface border-t border-border p-4">
            <Text className="text-center font-bold">Tab Bar</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
```

## 🎯 Casos de Uso

### **1. Pantalla Principal con Safe Area**

```typescript
const HomeScreen: React.FC = () => {
  const { getScreenSafeAreaStyles, getContentSafeAreaStyles } = useSafeArea();

  const screenStyles = getScreenSafeAreaStyles('home');
  const contentStyles = getContentSafeAreaStyles();

  return (
    <SafeAreaView style={screenStyles}>
      <ScrollView>
        <View style={contentStyles}>
          <Title>Pantalla de Inicio</Title>
          <Paragraph>Contenido que respeta las áreas seguras</Paragraph>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
```

### **2. Modal con Safe Area**

```typescript
const EnergyModal: React.FC<ModalProps> = ({ visible, onClose }) => {
  const { getModalSafeAreaStyles } = useSafeArea();

  const modalStyles = getModalSafeAreaStyles();

  if (!visible) return null;

  return (
    <View style={modalStyles} className="absolute inset-0 bg-black bg-opacity-50">
      <View className="flex-1 justify-center items-center">
        <View className="bg-white rounded-lg p-6 m-4 max-w-sm w-full">
          <Title>Configuración de Energía</Title>
          <Paragraph>Configuración que respeta las áreas seguras</Paragraph>
          <Button mode="contained" onPress={onClose}>
            Cerrar
          </Button>
        </View>
      </View>
    </View>
  );
};
```

### **3. Bottom Sheet con Safe Area**

```typescript
const EnergyBottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose }) => {
  const { getBottomSheetSafeAreaStyles } = useSafeArea();

  const bottomSheetStyles = getBottomSheetSafeAreaStyles();

  if (!visible) return null;

  return (
    <View style={bottomSheetStyles} className="absolute inset-0 bg-black bg-opacity-50">
      <View className="flex-1 justify-end">
        <View className="bg-white rounded-t-lg p-6">
          <Title>Opciones de Energía</Title>
          <Paragraph>Opciones que respetan las áreas seguras</Paragraph>
          <Button mode="contained" onPress={onClose}>
            Cerrar
          </Button>
        </View>
      </View>
    </View>
  );
};
```

### **4. Floating Action Button con Safe Area**

```typescript
const EnergyFAB: React.FC = () => {
  const { getFabSafeAreaStyles } = useSafeArea();

  const fabStyles = getFabSafeAreaStyles();

  return (
    <View style={fabStyles}>
      <TouchableOpacity
        className="w-14 h-14 bg-primary rounded-full items-center justify-center shadow-lg"
        onPress={() => {/* Acción */}}
      >
        <Text className="text-white text-2xl">+</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## ✅ Mejores Prácticas

### **1. Uso del Provider**

```typescript
// ✅ Correcto - Envolver toda la app
const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// ❌ Incorrecto - No usar el provider
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### **2. Uso de SafeAreaView**

```typescript
// ✅ Correcto - Usar SafeAreaView para pantallas
const HomeScreen: React.FC = () => {
  const { getScreenSafeAreaStyles } = useSafeArea();
  const screenStyles = getScreenSafeAreaStyles('home');

  return (
    <SafeAreaView style={screenStyles}>
      {/* Contenido */}
    </SafeAreaView>
  );
};

// ❌ Incorrecto - No usar SafeAreaView
const HomeScreen: React.FC = () => {
  return (
    <View>
      {/* Contenido */}
    </View>
  );
};
```

### **3. Configuración de Estilos**

```typescript
// ✅ Correcto - Usar funciones de configuración
const { getContentSafeAreaStyles } = useSafeArea();
const contentStyles = getContentSafeAreaStyles();

// ❌ Incorrecto - Configuración manual
const contentStyles = {
  paddingTop: 44,
  paddingBottom: 34,
  // Configuración hardcodeada
};
```

### **4. Detección de Dispositivos**

```typescript
// ✅ Correcto - Usar funciones de detección
const { hasNotch, hasHomeIndicator } = useSafeArea();

if (hasNotch()) {
  // Configuración específica para dispositivos con notch
}

// ❌ Incorrecto - Detección manual
const hasNotch = insets.top > 20;
```

## 🔧 Solución de Problemas

### **1. SafeAreaView no funciona**

**Problema**: SafeAreaView no respeta las áreas seguras

**Solución**:
```typescript
// Verificar que SafeAreaProvider esté configurado
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      {/* Tu app aquí */}
    </SafeAreaProvider>
  );
};
```

### **2. Insets no se actualizan**

**Problema**: Los insets no se actualizan al cambiar orientación

**Solución**:
```typescript
// Usar useSafeAreaInsets para obtener insets actualizados
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MyComponent: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  // Los insets se actualizan automáticamente
  return (
    <View style={{ paddingTop: insets.top }}>
      {/* Contenido */}
    </View>
  );
};
```

### **3. Frame no se actualiza**

**Problema**: El frame no se actualiza al cambiar orientación

**Solución**:
```typescript
// Usar useSafeAreaFrame para obtener frame actualizado
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const MyComponent: React.FC = () => {
  const frame = useSafeAreaFrame();
  
  // El frame se actualiza automáticamente
  return (
    <View style={{ width: frame.width, height: frame.height }}>
      {/* Contenido */}
    </View>
  );
};
```

### **4. Configuración no se aplica**

**Problema**: La configuración personalizada no se aplica

**Solución**:
```typescript
// Usar funciones de configuración del hook
const { getSafeAreaStyles } = useSafeArea();

const styles = getSafeAreaStyles('content', 'home', {
  top: 20,
  right: 16,
  bottom: 20,
  left: 16,
});
```

### **5. Problemas de rendimiento**

**Problema**: Problemas de rendimiento con Safe Area Context

**Solución**:
```typescript
// Usar useMemo para optimizar configuraciones
const styles = useMemo(() => {
  return getSafeAreaStyles('content');
}, [getSafeAreaStyles]);

// Usar useCallback para funciones
const handleLayout = useCallback(() => {
  // Manejar cambios de layout
}, []);
```

## 🎉 Conclusión

React Native Safe Area Context proporciona:

- ✅ **Compatibilidad universal** con todos los dispositivos iOS y Android
- ✅ **Detección automática** de notch, home indicators y áreas seguras
- ✅ **Configuración flexible** para diferentes tipos de dispositivos
- ✅ **Información completa** sobre insets y frame
- ✅ **Componentes específicos** para diferentes tipos de componentes
- ✅ **Integración perfecta** con React Navigation
- ✅ **Analytics automático** de interacciones
- ✅ **Temas personalizados** para temas claros y oscuros

El sistema está completamente configurado y listo para usar, proporcionando una experiencia de usuario consistente en todos los dispositivos. 🚀
