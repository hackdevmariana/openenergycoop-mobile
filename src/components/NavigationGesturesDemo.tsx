import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useScreens } from '../hooks/useScreens';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { useNavigation } from '@react-navigation/native';

const NavigationGesturesDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { createScreenOptions } = useScreens();
  const navigation = useNavigation();

  const [gestureCount, setGestureCount] = useState(0);
  const [lastGesture, setLastGesture] = useState<string>('');

  const handleGestureDetected = (gestureType: string) => {
    setGestureCount(prev => prev + 1);
    setLastGesture(gestureType);
    trackUserAction('gesture_detected', { gestureType, count: gestureCount + 1 });
  };

  const handleNavigateBack = () => {
    trackUserAction('navigate_back_programmatic', { from: 'NavigationGesturesDemo' });
    navigation.goBack();
  };

  const handleNavigateToDetail = () => {
    trackUserAction('navigate_to_detail', { from: 'NavigationGesturesDemo' });
    navigation.navigate('Detail' as never);
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              Demostración de Gestos de Navegación
            </Title>
            <Paragraph className="text-text-secondary">
              Prueba los gestos de deslizamiento para navegar entre pantallas
            </Paragraph>
          </View>

          {/* Información de gestos */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title>Gestos de Navegación</Title>
              <Paragraph className="mb-4">
                Esta pantalla demuestra cómo funcionan los gestos de navegación nativos con React Native Screens.
              </Paragraph>
              
              <View className="space-y-2">
                <Text className={themedClasses.textSecondary}>
                  • Desliza de izquierda a derecha para volver atrás
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Los gestos funcionan en toda la pantalla
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Las transiciones son suaves y nativas
                </Text>
                <Text className={themedClasses.textSecondary}>
                  • Configurado para respuesta rápida
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Estadísticas de gestos */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Estadísticas de Gestos</Title>
              <Paragraph className="mb-4">
                Contador de gestos detectados (simulado)
              </Paragraph>
              
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Total de gestos:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{gestureCount}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Último gesto:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{lastGesture || 'Ninguno'}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Configuración de pantalla */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Pantalla</Title>
              <Paragraph className="mb-4">
                Configuración actual de React Native Screens
              </Paragraph>
              
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Gestos habilitados:</Text>
                  <Text className={themedClasses.textSuccess + ' font-bold'}>Sí</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Dirección:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>Horizontal</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Distancia de respuesta:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>50px</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Animación:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>slide_from_right</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Presentación:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>card</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Botones de demostración */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Demostración Interactiva</Title>
              <Paragraph className="mb-4">
                Prueba diferentes tipos de navegación
              </Paragraph>
              
              <View className="space-y-3">
                <Button
                  mode="contained"
                  onPress={() => handleGestureDetected('Simulado: Deslizar izquierda')}
                  className={themedClasses.btnPrimary}
                >
                  Simular Gesto de Volver
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={handleNavigateToDetail}
                  className={themedClasses.btnSecondary}
                >
                  Ir a Pantalla de Detalle
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={handleNavigateBack}
                  className={themedClasses.btnSecondary}
                >
                  Volver Atrás (Programático)
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Instrucciones detalladas */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Instrucciones Detalladas</Title>
              <Paragraph className="mb-4">
                Cómo usar los gestos de navegación
              </Paragraph>
              
              <View className="space-y-3">
                <View>
                  <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                    1. Gesto de Volver Atrás
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Coloca tu dedo en el borde izquierdo de la pantalla y desliza hacia la derecha.
                    La pantalla se deslizará suavemente hacia la izquierda y volverás a la pantalla anterior.
                  </Text>
                </View>
                
                <View>
                  <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                    2. Sensibilidad del Gesto
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    El gesto se activa cuando deslizas más de 50px. Puedes ajustar esta distancia
                    en la configuración de React Native Screens.
                  </Text>
                </View>
                
                <View>
                  <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                    3. Animación Suave
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Las transiciones son nativas y suaves, proporcionando una experiencia
                    de usuario profesional y fluida.
                  </Text>
                </View>
                
                <View>
                  <Text className={themedClasses.textPrimary + ' font-bold mb-1'}>
                    4. Compatibilidad
                  </Text>
                  <Text className={themedClasses.textSecondary}>
                    Los gestos funcionan en iOS y Android, aprovechando las capacidades
                    nativas de cada plataforma.
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              React Native Screens + React Navigation
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Navegación nativa con gestos optimizados
            </Paragraph>
            <Paragraph className="text-center mt-2 text-sm text-text-secondary">
              Desliza de izquierda a derecha para volver atrás
            </Paragraph>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default NavigationGesturesDemo;
