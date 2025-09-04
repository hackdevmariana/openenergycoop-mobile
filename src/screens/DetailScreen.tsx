import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useScreens } from '../hooks/useScreens';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { useNavigation } from '@react-navigation/native';

const DetailScreen: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { createScreenOptions } = useScreens();
  const navigation = useNavigation();

  const handleGoBack = () => {
    trackUserAction('navigate_back', { screen: 'DetailScreen' });
    navigation.goBack();
  };

  const handleNavigateToNext = () => {
    trackUserAction('navigate_next', { screen: 'DetailScreen' });
    // Aquí podrías navegar a otra pantalla
    // navigation.navigate('NextScreen');
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              Pantalla de Detalle
            </Title>
            <Paragraph className="text-text-secondary">
              Esta pantalla demuestra la navegación con gestos de deslizamiento
            </Paragraph>
          </View>

          {/* Información de navegación */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title>Navegación con Gestos</Title>
              <Paragraph className="mb-4">
                Puedes deslizar desde el borde izquierdo hacia la derecha para volver atrás.
              </Paragraph>
              <Paragraph>
                También puedes usar el botón de abajo para navegar programáticamente.
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Instrucciones */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Instrucciones</Title>
              <Paragraph className="mb-2">
                • Desliza de izquierda a derecha para volver atrás
              </Paragraph>
              <Paragraph className="mb-2">
                • Desliza de derecha a izquierda para avanzar (si está disponible)
              </Paragraph>
              <Paragraph className="mb-2">
                • Los gestos funcionan en toda la pantalla
              </Paragraph>
              <Paragraph>
                • La transición es suave y nativa
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Configuración de pantalla */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Configuración de Pantalla</Title>
              <Paragraph className="mb-2">
                • Gestos habilitados: Sí
              </Paragraph>
              <Paragraph className="mb-2">
                • Dirección: Horizontal
              </Paragraph>
              <Paragraph className="mb-2">
                • Distancia de respuesta: 50px
              </Paragraph>
              <Paragraph className="mb-2">
                • Animación: slide_from_right
              </Paragraph>
              <Paragraph>
                • Presentación: card
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Botones de navegación */}
          <View className="mt-6 space-y-4">
            <Button
              mode="contained"
              onPress={handleGoBack}
              className={themedClasses.btnPrimary}
            >
              Volver Atrás
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleNavigateToNext}
              className={themedClasses.btnSecondary}
            >
              Navegar Siguiente
            </Button>
          </View>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              React Native Screens + React Navigation
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Navegación nativa con gestos optimizados
            </Paragraph>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default DetailScreen;
