import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useSafeArea } from '../hooks/useSafeArea';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

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

export default SafeAreaDemo;
