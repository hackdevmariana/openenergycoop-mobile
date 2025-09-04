import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '../config/icons';
import { useAppStore } from '../stores/appStore';
import { useTheme } from '../hooks/useTheme';
import { useScreens } from '../hooks/useScreens';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const { currentTheme, setTheme } = useAppStore();
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { createScreenOptions } = useScreens();
  const navigation = useNavigation();

  const handleNavigateToDetail = () => {
    trackUserAction('navigate_to_detail', { from: 'HomeScreen' });
    navigation.navigate('Detail' as never);
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Bienvenido a OpenEnergyCoop
        </Title>
        <Paragraph className="text-center mb-6 text-gray-600">
          Tu aplicación para gestionar energía de manera inteligente
        </Paragraph>

        {/* Tarjeta de bienvenida */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">¡Hola! 👋</Title>
            <Paragraph>
              Estás en la pantalla de inicio. Desde aquí puedes acceder a todas las funcionalidades de la aplicación.
            </Paragraph>
            <View className="flex-row justify-center mt-4">
              <Icon name="energy" size={24} color="#007AFF" />
              <Text className="ml-2 text-blue-500 font-semibold">Energía Verde</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de estado del sistema */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Estado del Sistema</Title>
            <View className="space-y-2">
              <View className="flex-row justify-between items-center">
                <Text>Estado de conexión:</Text>
                <View className="flex-row items-center">
                  <Icon name="success" size={16} color="#34C759" />
                  <Text className="ml-1 text-green-500">Conectado</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text>Tema actual:</Text>
                <Text className="text-blue-500">{currentTheme}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text>Última actualización:</Text>
                <Text className="text-gray-500">Hace 5 minutos</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de acciones rápidas */}
        <Card className={themedClasses.card + ' mb-4'}>
          <Card.Content>
            <Title className="text-lg mb-3">Acciones Rápidas</Title>
            <View className="space-y-2">
              <Button 
                mode="contained" 
                onPress={() => console.log('Ver dashboard')}
                className={themedClasses.btnPrimary + ' mb-2'}
              >
                <Icon name="chart" size={20} color="#FFFFFF" />
                <Text className="ml-2 text-white">Ver Dashboard</Text>
              </Button>
              <Button 
                mode="outlined" 
                onPress={handleNavigateToDetail}
                className={themedClasses.btnSecondary + ' mb-2'}
              >
                <Icon name="arrowRight" size={20} color="#007AFF" />
                <Text className="ml-2 text-blue-500">Probar Gestos</Text>
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
                className={themedClasses.btnSecondary + ' mb-2'}
              >
                <Icon name="gear" size={20} color="#007AFF" />
                <Text className="ml-2 text-blue-500">Cambiar Tema</Text>
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de estadísticas */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Estadísticas del Día</Title>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name="consumption" size={20} color="#FF9500" />
                  <Text className="ml-2">Consumo</Text>
                </View>
                <Text className="font-bold">2.4 kWh</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name="production" size={20} color="#34C759" />
                  <Text className="ml-2">Producción</Text>
                </View>
                <Text className="font-bold">1.8 kWh</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name="efficiency" size={20} color="#AF52DE" />
                  <Text className="ml-2">Eficiencia</Text>
                </View>
                <Text className="font-bold">85%</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de notificaciones */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Notificaciones Recientes</Title>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Icon name="notification" size={16} color="#007AFF" />
                <Text className="ml-2 text-sm">Sistema actualizado correctamente</Text>
              </View>
              <View className="flex-row items-center">
                <Icon name="warning" size={16} color="#FF9500" />
                <Text className="ml-2 text-sm">Consumo elevado detectado</Text>
              </View>
              <View className="flex-row items-center">
                <Icon name="success" size={16} color="#34C759" />
                <Text className="ml-2 text-sm">Energía solar disponible</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de información */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Información de la App</Title>
            <Paragraph>
              OpenEnergyCoop te ayuda a gestionar tu consumo de energía de manera inteligente y sostenible.
            </Paragraph>
            <View className="flex-row justify-center mt-4">
              <Icon name="info" size={20} color="#007AFF" />
              <Text className="ml-2 text-blue-500">Versión 1.0.0</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
      </ScrollView>
    </Screen>
  );
};

export default HomeScreen;
