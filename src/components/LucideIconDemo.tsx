import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Switch } from 'react-native-paper';
import { Icon, IconName, getAvailableIcons } from '../config/lucide';

const LucideIconDemo: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<IconName>('home');
  const [iconSize, setIconSize] = useState(24);
  const [iconColor, setIconColor] = useState('#007AFF');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [showGrid, setShowGrid] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener iconos disponibles
  const availableIcons = getAvailableIcons();
  
  // Filtrar iconos por término de búsqueda
  const filteredIcons = availableIcons.filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Iconos de ejemplo por categoría
  const iconCategories = {
    'Navegación': ['home', 'chart', 'energy', 'profile', 'settings'],
    'Acciones': ['search', 'plus', 'edit', 'delete', 'view', 'hide'],
    'Seguridad': ['lock', 'unlock', 'key', 'fingerprint', 'shield'],
    'Comunicación': ['mail', 'phone', 'location', 'calendar', 'clock'],
    'Interacción': ['star', 'heart', 'share', 'download', 'upload'],
    'Estados': ['alert', 'success', 'error', 'info', 'help'],
    'Navegación UI': ['chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'menu'],
    'Organización': ['filter', 'sort-asc', 'sort-desc', 'grid', 'list'],
    'Multimedia': ['camera', 'image', 'video', 'music', 'play'],
    'Dispositivos': ['wifi', 'signal', 'battery', 'volume', 'mic'],
    'Finanzas': ['credit-card', 'wallet', 'trending-up', 'dollar', 'bitcoin'],
    'Naturaleza': ['sun', 'moon', 'cloud', 'leaf', 'tree'],
    'Animales': ['cat', 'dog', 'bird', 'fish', 'bug'],
    'Comida': ['apple', 'coffee', 'pizza', 'cake', 'gift'],
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Lucide React Demo
        </Title>

        {/* Configuración del icono */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Configuración del Icono</Title>
            
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Icono Seleccionado:</Text>
              <Text className="text-base text-blue-600">{selectedIcon}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Tamaño: {iconSize}px</Text>
              <View className="flex-row items-center">
                <Text className="text-xs mr-2">16</Text>
                <View className="flex-1 bg-gray-200 rounded-full h-2">
                  <View 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${((iconSize - 16) / (48 - 16)) * 100}%` }}
                  />
                </View>
                <Text className="text-xs ml-2">48</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIconSize(Math.max(16, iconSize - 4))}
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="chevron-left" size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIconSize(Math.min(48, iconSize + 4))}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="chevron-right" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Color:</Text>
              <View className="flex-row flex-wrap gap-2">
                {['#007AFF', '#FF3B30', '#34C759', '#FF9500', '#AF52DE', '#5856D6', '#FF2D92', '#000000'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setIconColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${iconColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium mb-2">Grosor del trazo: {strokeWidth}</Text>
              <View className="flex-row items-center">
                <Text className="text-xs mr-2">1</Text>
                <View className="flex-1 bg-gray-200 rounded-full h-2">
                  <View 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${((strokeWidth - 1) / (4 - 1)) * 100}%` }}
                  />
                </View>
                <Text className="text-xs ml-2">4</Text>
              </View>
              <TouchableOpacity
                onPress={() => setStrokeWidth(Math.max(1, strokeWidth - 0.5))}
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="chevron-left" size={16} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStrokeWidth(Math.min(4, strokeWidth + 0.5))}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <Icon name="chevron-right" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Vista previa del icono */}
            <View className="bg-gray-100 p-4 rounded-lg items-center">
              <Text className="text-sm font-medium mb-2">Vista Previa</Text>
              <Icon
                name={selectedIcon}
                size={iconSize}
                color={iconColor}
                strokeWidth={strokeWidth}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Búsqueda de iconos */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Buscar Iconos</Title>
            <TextInput
              label="Buscar icono..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              mode="outlined"
              className="mb-4"
              left={<TextInput.Icon icon={() => <Icon name="search" size={20} />} />}
            />
            
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm">
                {filteredIcons.length} de {availableIcons.length} iconos
              </Text>
              <View className="flex-row items-center">
                <Text className="text-sm mr-2">Vista de cuadrícula</Text>
                <Switch
                  value={showGrid}
                  onValueChange={setShowGrid}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Iconos por categoría */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Iconos por Categoría</Title>
            {Object.entries(iconCategories).map(([category, icons]) => (
              <View key={category} className="mb-4">
                <Text className="text-base font-medium mb-2">{category}</Text>
                <View className={`${showGrid ? 'flex-row flex-wrap' : 'flex-col'} gap-2`}>
                  {icons.map((iconName) => (
                    <TouchableOpacity
                      key={iconName}
                      onPress={() => setSelectedIcon(iconName)}
                      className={`p-2 rounded-lg border ${
                        selectedIcon === iconName 
                          ? 'bg-blue-100 border-blue-500' 
                          : 'bg-gray-50 border-gray-200'
                      } ${showGrid ? 'w-16 h-16 items-center justify-center' : 'flex-row items-center'}`}
                    >
                      <Icon
                        name={iconName}
                        size={showGrid ? 20 : 16}
                        color={selectedIcon === iconName ? '#007AFF' : '#6B7280'}
                      />
                      {!showGrid && (
                        <Text className="text-xs ml-2 text-gray-600">{iconName}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Todos los iconos */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Todos los Iconos</Title>
            <View className={`${showGrid ? 'flex-row flex-wrap' : 'flex-col'} gap-2`}>
              {filteredIcons.slice(0, 50).map((iconName) => (
                <TouchableOpacity
                  key={iconName}
                  onPress={() => setSelectedIcon(iconName)}
                  className={`p-2 rounded-lg border ${
                    selectedIcon === iconName 
                      ? 'bg-blue-100 border-blue-500' 
                      : 'bg-gray-50 border-gray-200'
                  } ${showGrid ? 'w-16 h-16 items-center justify-center' : 'flex-row items-center'}`}
                >
                  <Icon
                    name={iconName}
                    size={showGrid ? 20 : 16}
                    color={selectedIcon === iconName ? '#007AFF' : '#6B7280'}
                  />
                  {!showGrid && (
                    <Text className="text-xs ml-2 text-gray-600">{iconName}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            {filteredIcons.length > 50 && (
              <Text className="text-sm text-gray-500 mt-2 text-center">
                Mostrando 50 de {filteredIcons.length} iconos
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Información */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Información de Lucide React</Title>
            <Paragraph className="mb-2">
              Lucide React proporciona iconos hermosos y consistentes para tu aplicación:
            </Paragraph>
            <View className="ml-4">
              <Text className="text-sm mb-1">• {availableIcons.length} iconos disponibles</Text>
              <Text className="text-sm mb-1">• Iconos vectoriales escalables</Text>
              <Text className="text-sm mb-1">• Personalización completa (tamaño, color, grosor)</Text>
              <Text className="text-sm mb-1">• Tipado TypeScript completo</Text>
              <Text className="text-sm mb-1">• Renderizado optimizado</Text>
              <Text className="text-sm mb-1">• Compatible con React Native</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default LucideIconDemo;
