import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Icon } from '../config/icons';

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Dashboard
        </Title>
        <Paragraph className="text-center mb-6 text-gray-600">
          Resumen de tu consumo y producción de energía
        </Paragraph>

        {/* Tarjeta de resumen */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Resumen del Día</Title>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text>Consumo Total:</Text>
                <Text className="font-bold text-red-500">15.2 kWh</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text>Producción Solar:</Text>
                <Text className="font-bold text-green-500">12.8 kWh</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text>Balance:</Text>
                <Text className="font-bold text-blue-500">-2.4 kWh</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de gráficos */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Gráficos de Consumo</Title>
            <View className="h-32 bg-gray-100 rounded-lg items-center justify-center">
              <Icon name="chart" size={48} color="#007AFF" />
              <Text className="mt-2 text-gray-500">Gráfico de consumo</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de dispositivos */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Dispositivos Activos</Title>
            <View className="space-y-2">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name="power" size={16} color="#34C759" />
                  <Text className="ml-2">Aire Acondicionado</Text>
                </View>
                <Text className="text-green-500">Encendido</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name="power" size={16} color="#34C759" />
                  <Text className="ml-2">Refrigerador</Text>
                </View>
                <Text className="text-green-500">Encendido</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Icon name="powerOff" size={16} color="#FF3B30" />
                  <Text className="ml-2">Lavadora</Text>
                </View>
                <Text className="text-red-500">Apagado</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de alertas */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Alertas</Title>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Icon name="warning" size={16} color="#FF9500" />
                <Text className="ml-2 text-sm">Consumo elevado en las últimas 2 horas</Text>
              </View>
              <View className="flex-row items-center">
                <Icon name="info" size={16} color="#007AFF" />
                <Text className="ml-2 text-sm">Mantenimiento programado para mañana</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjeta de acciones */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Acciones</Title>
            <View className="space-y-2">
              <Button 
                mode="contained" 
                onPress={() => console.log('Ver detalles')}
                className="mb-2"
              >
                Ver Detalles Completos
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => console.log('Exportar datos')}
                className="mb-2"
              >
                Exportar Datos
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => console.log('Configurar alertas')}
                className="mb-2"
              >
                Configurar Alertas
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
