import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useGestureHandler } from '../hooks/useGestureHandler';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const GestureHandlerDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { 
    deviceInfo,
    createTapGesture,
    createPanGesture,
    createPinchGesture,
    createRotationGesture,
    createSwipeGesture,
    createLongPressGesture,
    createFlingGesture,
    createComponentGestures,
  } = useGestureHandler();

  const [gestureLog, setGestureLog] = useState<string[]>([]);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Función para agregar logs de gestos
  const addGestureLog = (gesture: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const log = `[${timestamp}] ${gesture}${details ? ` - ${JSON.stringify(details)}` : ''}`;
    setGestureLog(prev => [log, ...prev.slice(0, 9)]); // Mantener solo los últimos 10 logs
    trackUserAction('gesture_performed', { gesture, details });
  };

  // Gestos básicos
  const tapGesture = createTapGesture(
    () => addGestureLog('Tap'),
    () => addGestureLog('Double Tap')
  );

  const longPressGesture = createLongPressGesture(
    () => addGestureLog('Long Press')
  );

  const panGesture = createPanGesture(
    undefined,
    (event) => {
      setPosition({ x: event.translationX, y: event.translationY });
      addGestureLog('Pan Update', { x: event.translationX, y: event.translationY });
    }
  );

  const pinchGesture = createPinchGesture(
    undefined,
    (event) => {
      setScale(event.scale);
      addGestureLog('Pinch Update', { scale: event.scale });
    }
  );

  const rotationGesture = createRotationGesture(
    undefined,
    (event) => {
      setRotation(event.rotation);
      addGestureLog('Rotation Update', { rotation: event.rotation });
    }
  );

  const swipeGesture = createSwipeGesture(
    (direction) => {
      addGestureLog('Swipe', { direction });
      Alert.alert('Swipe Detectado', `Dirección: ${direction}`);
    }
  );

  const flingGesture = createFlingGesture(
    (direction) => {
      addGestureLog('Fling', { direction });
      Alert.alert('Fling Detectado', `Dirección: ${direction}`);
    }
  );

  // Gestos compuestos
  const imageGestures = createComponentGestures('image', {
    onTap: () => addGestureLog('Image Tap'),
    onDoubleTap: () => {
      setScale(scale === 1 ? 2 : 1);
      setRotation(0);
      addGestureLog('Image Double Tap - Reset');
    },
    onLongPress: () => addGestureLog('Image Long Press'),
    onPan: (event) => {
      setPosition({ x: event.translationX, y: event.translationY });
      addGestureLog('Image Pan', { x: event.translationX, y: event.translationY });
    },
    onPinch: (event) => {
      setScale(event.scale);
      addGestureLog('Image Pinch', { scale: event.scale });
    },
    onRotation: (event) => {
      setRotation(event.rotation);
      addGestureLog('Image Rotation', { rotation: event.rotation });
    },
    onSwipe: (direction) => {
      addGestureLog('Image Swipe', { direction });
      Alert.alert('Image Swipe', `Dirección: ${direction}`);
    },
  });

  const cardGestures = createComponentGestures('card', {
    onTap: () => addGestureLog('Card Tap'),
    onLongPress: () => addGestureLog('Card Long Press'),
    onSwipe: (direction) => {
      addGestureLog('Card Swipe', { direction });
      Alert.alert('Card Swipe', `Dirección: ${direction}`);
    },
  });

  const listGestures = createComponentGestures('list', {
    onTap: () => addGestureLog('List Item Tap'),
    onLongPress: () => addGestureLog('List Item Long Press'),
    onSwipe: (direction) => {
      addGestureLog('List Item Swipe', { direction });
      Alert.alert('List Item Swipe', `Dirección: ${direction}`);
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold mb-2 text-text">
              React Native Gesture Handler Demo
            </Text>
            <Text className="text-text-secondary">
              Demostración de gestos táctiles y configuración avanzada
            </Text>
          </View>

          {/* Información del dispositivo */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Información del Dispositivo</Title>
              
              <View className="mt-4 space-y-2">
                <Text className={themedClasses.textSecondary}>
                  Pantalla: {deviceInfo.width} x {deviceInfo.height}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Tamaño: {deviceInfo.screenSize}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Orientación: {deviceInfo.isLandscape ? 'Horizontal' : 'Vertical'}
                </Text>
                <Text className={themedClasses.textSecondary}>
                  Plataforma: {deviceInfo.platform}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Gestos básicos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Gestos Básicos</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Prueba los gestos básicos de toque, arrastre y pellizco
              </Paragraph>
              
              <View className="mt-4 space-y-4">
                {/* Tap y Double Tap */}
                <GestureDetector gesture={tapGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Tap / Double Tap
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Toca una vez para tap, dos veces para double tap
                    </Text>
                  </View>
                </GestureDetector>

                {/* Long Press */}
                <GestureDetector gesture={longPressGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Long Press
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Mantén presionado para long press
                    </Text>
                  </View>
                </GestureDetector>

                {/* Pan */}
                <GestureDetector gesture={panGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Pan (Arrastre)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Arrastra para mover: X: {position.x.toFixed(1)}, Y: {position.y.toFixed(1)}
                    </Text>
                  </View>
                </GestureDetector>

                {/* Swipe */}
                <GestureDetector gesture={swipeGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Swipe (Deslizamiento)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Desliza en cualquier dirección
                    </Text>
                  </View>
                </GestureDetector>

                {/* Fling */}
                <GestureDetector gesture={flingGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Fling (Lanzamiento)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Lanza con velocidad para fling
                    </Text>
                  </View>
                </GestureDetector>
              </View>
            </Card.Content>
          </Card>

          {/* Gestos avanzados */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Gestos Avanzados</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Gestos de pellizco y rotación para contenido multimedia
              </Paragraph>
              
              <View className="mt-4 space-y-4">
                {/* Pinch */}
                <GestureDetector gesture={pinchGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Pinch (Pellizco)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Escala: {scale.toFixed(2)}x
                    </Text>
                  </View>
                </GestureDetector>

                {/* Rotation */}
                <GestureDetector gesture={rotationGesture}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Rotation (Rotación)
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Rotación: {(rotation * 180 / Math.PI).toFixed(1)}°
                    </Text>
                  </View>
                </GestureDetector>
              </View>
            </Card.Content>
          </Card>

          {/* Gestos por componente */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Gestos por Componente</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Gestos preconfigurados para diferentes tipos de componentes
              </Paragraph>
              
              <View className="mt-4 space-y-4">
                {/* Image Gestures */}
                <GestureDetector gesture={imageGestures}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Image Component
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Tap, Double Tap (reset), Long Press, Pan, Pinch, Rotation, Swipe
                    </Text>
                    <Text className={themedClasses.textTertiary + ' mt-2'}>
                      Escala: {scale.toFixed(2)}x | Rotación: {(rotation * 180 / Math.PI).toFixed(1)}°
                    </Text>
                  </View>
                </GestureDetector>

                {/* Card Gestures */}
                <GestureDetector gesture={cardGestures}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      Card Component
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Tap, Long Press, Swipe
                    </Text>
                  </View>
                </GestureDetector>

                {/* List Gestures */}
                <GestureDetector gesture={listGestures}>
                  <View className="p-4 bg-surface rounded-md">
                    <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>
                      List Item Component
                    </Text>
                    <Text className={themedClasses.textSecondary}>
                      Tap, Long Press, Swipe
                    </Text>
                  </View>
                </GestureDetector>
              </View>
            </Card.Content>
          </Card>

          {/* Log de gestos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Log de Gestos</Title>
              <Paragraph className={themedClasses.textSecondary}>
                Historial de gestos realizados
              </Paragraph>
              
              <View className="mt-4">
                {gestureLog.length === 0 ? (
                  <Text className={themedClasses.textTertiary + ' italic'}>
                    No se han realizado gestos aún
                  </Text>
                ) : (
                  <View className="space-y-1">
                    {gestureLog.map((log, index) => (
                      <Text key={index} className={themedClasses.textSecondary + ' text-sm'}>
                        {log}
                      </Text>
                    ))}
                  </View>
                )}
                
                {gestureLog.length > 0 && (
                  <Button
                    mode="outlined"
                    onPress={() => setGestureLog([])}
                    className="mt-4"
                  >
                    Limpiar Log
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>

          {/* Acciones */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title className={themedClasses.textPrimary}>Acciones</Title>
              
              <View className="mt-4 space-y-3">
                <Button
                  mode="contained"
                  onPress={() => {
                    setScale(1);
                    setRotation(0);
                    setPosition({ x: 0, y: 0 });
                    addGestureLog('Reset All');
                  }}
                >
                  Resetear Todo
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => {
                    Alert.alert(
                      'Información de Gestos',
                      `Dispositivo: ${deviceInfo.platform}\n` +
                      `Pantalla: ${deviceInfo.screenSize}\n` +
                      `Orientación: ${deviceInfo.isLandscape ? 'Horizontal' : 'Vertical'}\n` +
                      `Resolución: ${deviceInfo.width}x${deviceInfo.height}`
                    );
                  }}
                >
                  Información del Dispositivo
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Text className={themedClasses.textSecondary + ' text-center'}>
              React Native Gesture Handler está configurado y funcionando
            </Text>
            <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
              Todos los gestos se registran y analizan automáticamente
            </Text>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default GestureHandlerDemo;
