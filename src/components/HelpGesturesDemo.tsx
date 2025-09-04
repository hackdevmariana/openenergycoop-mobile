import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../hooks/useTheme';
import { useHelpGestures } from '../hooks/useHelpGestures';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import HelpPanel from './help/HelpPanel';

const HelpGesturesDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  
  // Estado para el sistema de ayuda
  const [helpStats, setHelpStats] = useState({
    totalGestures: 0,
    lastGesture: '',
    helpSessions: 0,
  });

  // Configurar el sistema de ayuda
  const {
    helpState,
    isHelpActive,
    getCurrentHelpType,
    getCurrentHelpContent,
    getHelpPosition,
    combinedHelpGesture,
    activateHelp,
    deactivateHelp,
    showTooltip,
    showTutorial,
    showQuickHelp,
    showFullPanel,
    isGestureEnabled,
    getGestureConfig,
    helpConfig,
  } = useHelpGestures('gestures', {
    onHelpActivate: (type, element) => {
      trackUserAction('help_activated', { type, element });
      setHelpStats(prev => ({
        ...prev,
        helpSessions: prev.helpSessions + 1,
      }));
    },
    onHelpDeactivate: () => {
      trackUserAction('help_deactivated');
    },
    onGestureDetected: (gesture) => {
      trackUserAction('help_gesture_detected', { gesture });
      setHelpStats(prev => ({
        ...prev,
        totalGestures: prev.totalGestures + 1,
        lastGesture: gesture,
      }));
    },
    onElementHighlight: (element) => {
      trackUserAction('help_element_highlighted', { element });
    },
  });

  const handleElementPress = (element: string) => {
    trackUserAction('help_element_pressed', { element });
    // Aquí podrías mostrar ayuda específica para el elemento
    showTooltip(element, { x: 100, y: 200 });
  };

  const handleManualHelpActivation = (type: any) => {
    trackUserAction('help_manual_activation', { type });
    switch (type) {
      case 'fullPanel':
        showFullPanel();
        break;
      case 'tutorial':
        showTutorial();
        break;
      case 'quick':
        showQuickHelp();
        break;
      case 'tooltip':
        showTooltip('button', { x: 100, y: 200 });
        break;
    }
  };

  return (
    <GestureDetector gesture={combinedHelpGesture}>
      <Screen style={{ flex: 1 }}>
        <ScrollView className={themedClasses.container}>
          <View className="p-4">
            {/* Header */}
            <View className="mb-6">
              <Title className="text-2xl font-bold mb-2">
                Sistema de Ayuda con Gestos
              </Title>
              <Paragraph className="text-text-secondary">
                Prueba los diferentes gestos para activar ayuda contextual
              </Paragraph>
            </View>

            {/* Información del sistema */}
            <Card className={themedClasses.card}>
              <Card.Content>
                <Title>Información del Sistema</Title>
                <Paragraph className="mb-4">
                  Este sistema permite activar ayuda contextual usando gestos específicos.
                </Paragraph>
                
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className={themedClasses.textSecondary}>Ayuda activa:</Text>
                    <Text className={isHelpActive() ? themedClasses.textSuccess + ' font-bold' : themedClasses.textError + ' font-bold'}>
                      {isHelpActive() ? 'Sí' : 'No'}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className={themedClasses.textSecondary}>Tipo actual:</Text>
                    <Text className={themedClasses.textPrimary + ' font-bold'}>
                      {getCurrentHelpType() || 'Ninguno'}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className={themedClasses.textSecondary}>Gestos totales:</Text>
                    <Text className={themedClasses.textPrimary + ' font-bold'}>{helpStats.totalGestures}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className={themedClasses.textSecondary}>Último gesto:</Text>
                    <Text className={themedClasses.textPrimary + ' font-bold'}>{helpStats.lastGesture || 'Ninguno'}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className={themedClasses.textSecondary}>Sesiones de ayuda:</Text>
                    <Text className={themedClasses.textPrimary + ' font-bold'}>{helpStats.helpSessions}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Gestos disponibles */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Gestos Disponibles</Title>
                <Paragraph className="mb-4">
                  Prueba estos gestos para activar diferentes tipos de ayuda:
                </Paragraph>
                
                <View className="space-y-3">
                  <View className="p-3 bg-surface rounded-md border border-border">
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      Deslizar hacia abajo desde arriba
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Activa el panel de ayuda completo
                    </Text>
                    <Text className={themedClasses.textSecondary + ' text-sm mt-1'}>
                      Habilitado: {isGestureEnabled('helpSwipe') ? 'Sí' : 'No'}
                    </Text>
                  </View>

                  <View className="p-3 bg-surface rounded-md border border-border">
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      Toque largo en elementos
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Activa ayuda contextual
                    </Text>
                    <Text className={themedClasses.textSecondary + ' text-sm mt-1'}>
                      Habilitado: {isGestureEnabled('contextualHelp') ? 'Sí' : 'No'}
                    </Text>
                  </View>

                  <View className="p-3 bg-surface rounded-md border border-border">
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      Deslizar desde el borde derecho
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Activa ayuda rápida
                    </Text>
                    <Text className={themedClasses.textSecondary + ' text-sm mt-1'}>
                      Habilitado: {isGestureEnabled('quickHelp') ? 'Sí' : 'No'}
                    </Text>
                  </View>

                  <View className="p-3 bg-surface rounded-md border border-border">
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      Deslizar desde esquina superior derecha
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Activa modo tutorial
                    </Text>
                    <Text className={themedClasses.textSecondary + ' text-sm mt-1'}>
                      Habilitado: {isGestureEnabled('fullScreenHelp') ? 'Sí' : 'No'}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Botones de activación manual */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Activación Manual</Title>
                <Paragraph className="mb-4">
                  También puedes activar la ayuda manualmente:
                </Paragraph>
                
                <View className="space-y-3">
                  <Button
                    mode="contained"
                    onPress={() => handleManualHelpActivation('fullPanel')}
                    className={themedClasses.btnPrimary}
                  >
                    Panel de Ayuda Completo
                  </Button>
                  
                  <Button
                    mode="outlined"
                    onPress={() => handleManualHelpActivation('tutorial')}
                    className={themedClasses.btnSecondary}
                  >
                    Modo Tutorial
                  </Button>
                  
                  <Button
                    mode="outlined"
                    onPress={() => handleManualHelpActivation('quick')}
                    className={themedClasses.btnSecondary}
                  >
                    Ayuda Rápida
                  </Button>
                  
                  <Button
                    mode="outlined"
                    onPress={() => handleManualHelpActivation('tooltip')}
                    className={themedClasses.btnSecondary}
                  >
                    Tooltip de Ejemplo
                  </Button>
                </View>
              </Card.Content>
            </Card>

            {/* Elementos de prueba */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Elementos de Prueba</Title>
                <Paragraph className="mb-4">
                  Mantén presionado estos elementos para ver ayuda contextual:
                </Paragraph>
                
                <View className="space-y-3">
                  <TouchableOpacity
                    onPress={() => handleElementPress('button')}
                    className="p-4 bg-surface rounded-md border border-border"
                  >
                    <Text className={themedClasses.textPrimary + ' font-bold'}>Botón de Prueba</Text>
                    <Text className={themedClasses.textSecondary}>Mantén presionado para ayuda</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => handleElementPress('card')}
                    className="p-4 bg-surface rounded-md border border-border"
                  >
                    <Text className={themedClasses.textPrimary + ' font-bold'}>Tarjeta de Prueba</Text>
                    <Text className={themedClasses.textSecondary}>Mantén presionado para ayuda</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => handleElementPress('navigation')}
                    className="p-4 bg-surface rounded-md border border-border"
                  >
                    <Text className={themedClasses.textPrimary + ' font-bold'}>Navegación</Text>
                    <Text className={themedClasses.textSecondary}>Mantén presionado para ayuda</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>

            {/* Configuración */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Configuración del Sistema</Title>
                <Paragraph className="mb-4">
                  Configuración actual de gestos de ayuda:
                </Paragraph>
                
                <View className="space-y-2">
                  {helpConfig.gestures.map((gesture: string) => {
                    const config = getGestureConfig(gesture as any);
                    return (
                      <View key={gesture} className="p-3 bg-surface rounded-md border border-border">
                        <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>{gesture}</Text>
                        <Text className={themedClasses.textSecondary}>
                          Habilitado: {config?.enabled ? 'Sí' : 'No'}
                        </Text>
                        <Text className={themedClasses.textSecondary}>
                          Dirección: {config?.direction || 'N/A'}
                        </Text>
                        <Text className={themedClasses.textSecondary}>
                          Distancia mínima: {config?.minDistance || 'N/A'}px
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </Card.Content>
            </Card>

            {/* Instrucciones */}
            <Card className={themedClasses.card + ' mt-4'}>
              <Card.Content>
                <Title>Instrucciones de Uso</Title>
                <Paragraph className="mb-4">
                  Cómo usar el sistema de ayuda:
                </Paragraph>
                
                <View className="space-y-3">
                  <View>
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      1. Gesto Principal
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Desliza hacia abajo desde la parte superior de la pantalla para activar el panel de ayuda completo.
                    </Text>
                  </View>
                  
                  <View>
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      2. Ayuda Contextual
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Mantén presionado cualquier elemento para ver ayuda específica sobre ese elemento.
                    </Text>
                  </View>
                  
                  <View>
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      3. Ayuda Rápida
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Desliza desde el borde derecho de la pantalla para acceder a ayuda rápida.
                    </Text>
                  </View>
                  
                  <View>
                    <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                      4. Modo Tutorial
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Desliza desde la esquina superior derecha para activar el modo tutorial paso a paso.
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Footer */}
            <View className="mt-6 p-4 bg-surface rounded-md">
              <Paragraph className="text-center">
                Sistema de Ayuda con Gestos
              </Paragraph>
              <Paragraph className="text-center mt-2">
                Desliza hacia abajo desde arriba para ayuda
              </Paragraph>
              <Paragraph className="text-center mt-2 text-sm text-text-secondary">
                Mantén presionado elementos para ayuda contextual
              </Paragraph>
            </View>
          </View>
        </ScrollView>

        {/* Panel de ayuda */}
        <HelpPanel
          isVisible={isHelpActive()}
          helpType={getCurrentHelpType() || 'fullPanel'}
          content={getCurrentHelpContent()}
          position={getHelpPosition()}
          onClose={deactivateHelp}
          onElementPress={handleElementPress}
        />
      </Screen>
    </GestureDetector>
  );
};

export default HelpGesturesDemo;
