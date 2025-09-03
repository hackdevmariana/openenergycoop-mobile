import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Icon, IconName } from '../config/icons';

const IconShowcase: React.FC = () => {
  const iconCategories = [
    {
      title: 'Navegación',
      icons: ['home', 'homeOutline', 'settings', 'settingsOutline', 'profile', 'profileOutline'] as IconName[],
    },
    {
      title: 'Energía',
      icons: ['energy', 'solar', 'battery', 'batteryCharging', 'power', 'powerOff'] as IconName[],
    },
    {
      title: 'Dashboard',
      icons: ['chart', 'analytics', 'trending', 'trendingDown'] as IconName[],
    },
    {
      title: 'Estado',
      icons: ['success', 'error', 'warning', 'info'] as IconName[],
    },
    {
      title: 'Acciones',
      icons: ['add', 'edit', 'delete', 'refresh', 'search', 'filter'] as IconName[],
    },
    {
      title: 'Comunicación',
      icons: ['notification', 'notificationOutline', 'message', 'messageOutline'] as IconName[],
    },
    {
      title: 'Ubicación',
      icons: ['location', 'locationOutline', 'map'] as IconName[],
    },
    {
      title: 'Tiempo',
      icons: ['time', 'calendar', 'clock'] as IconName[],
    },
    {
      title: 'Usuario',
      icons: ['user', 'users', 'userCircle'] as IconName[],
    },
    {
      title: 'Configuración',
      icons: ['gear', 'gearOutline', 'help', 'helpOutline'] as IconName[],
    },
    {
      title: 'Energía Específica',
      icons: ['consumption', 'production', 'efficiency', 'grid', 'meter'] as IconName[],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Catálogo de Iconos
        </Title>
        <Paragraph className="text-center mb-6 text-gray-600">
          Iconos disponibles en la aplicación OpenEnergyCoop
        </Paragraph>

        {iconCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="mb-4">
            <Card.Content>
              <Title className="text-lg mb-3">{category.title}</Title>
              <View className="flex-row flex-wrap justify-start">
                {category.icons.map((iconName, iconIndex) => (
                  <TouchableOpacity
                    key={iconIndex}
                    className="w-16 h-16 items-center justify-center m-2 bg-white rounded-lg border border-gray-200"
                    onPress={() => console.log(`Icono presionado: ${iconName}`)}
                  >
                    <Icon
                      name={iconName}
                      size={24}
                      color="#007AFF"
                    />
                    <Text className="text-xs text-gray-600 mt-1 text-center">
                      {iconName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Uso de Iconos</Title>
            <Paragraph className="mb-3">
              Para usar un icono en tu componente:
            </Paragraph>
            <View className="bg-gray-100 p-3 rounded-lg">
              <Text className="font-mono text-sm">
                {`import { Icon } from '../config/icons';

// Uso básico
<Icon name="energy" size={24} color="#007AFF" />

// Con evento onPress
<Icon 
  name="settings" 
  size={24} 
  color="#007AFF" 
  onPress={() => console.log('Configuración')} 
/>`}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default IconShowcase;

