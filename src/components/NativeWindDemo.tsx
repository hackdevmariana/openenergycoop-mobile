import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Switch } from 'react-native-paper';
import { Icon } from '../config/lucide';
import { useNativeWind, useConditionalClasses } from '../hooks/useNativeWind';
import { useTheme } from '../hooks/useTheme';

const NativeWindDemo: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { themedClasses, getEnergyClasses, getStateClasses, getSizeClasses, getShadowClasses } = useNativeWind();
  const { conditionalClasses } = useConditionalClasses();
  
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-text">
            NativeWind + Temas Demo
          </Text>
          <Text className="text-text-secondary">
            Demostración de NativeWind con sistema de temas integrado
          </Text>
        </View>

        {/* Toggle de tema */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Cambio de Tema</Title>
            <View className="flex-row items-center justify-between mt-4">
              <Text className={themedClasses.textSecondary}>
                Modo actual: {themeMode}
              </Text>
              <TouchableOpacity 
                className={themedClasses.btnPrimary}
                onPress={toggleTheme}
              >
                <Text className="text-white font-medium">
                  {themeMode === 'dark' ? '🌞 Claro' : '🌙 Oscuro'}
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Clases temáticas básicas */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Clases Temáticas Básicas</Title>
            
            <View className="mt-4 space-y-3">
              <View className={themedClasses.surface + ' p-3 rounded-md'}>
                <Text className={themedClasses.textPrimary}>Superficie temática</Text>
                <Text className={themedClasses.textSecondary}>Texto secundario</Text>
              </View>
              
              <View className={themedClasses.cardElevated}>
                <Text className={themedClasses.textPrimary}>Tarjeta elevada</Text>
                <Text className={themedClasses.textSecondary}>Con sombra grande</Text>
              </View>
              
              <View className={themedClasses.divider} />
              
              <Text className={themedClasses.textTertiary}>
                Texto terciario para información adicional
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Botones temáticos */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Botones Temáticos</Title>
            
            <View className="mt-4 space-y-3">
              <TouchableOpacity className={themedClasses.btnPrimary}>
                <Text className="text-white font-medium text-center">Botón Primario</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className={themedClasses.btnSecondary}>
                <Text className="font-medium text-center">Botón Secundario</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className={themedClasses.btnAccent}>
                <Text className="text-white font-medium text-center">Botón Acento</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Estados temáticos */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Estados Temáticos</Title>
            
            <View className="mt-4 space-y-2">
              <View className={themedClasses.stateSuccess + ' p-3 rounded-md'}>
                <Text className="text-white font-medium">Estado de Éxito</Text>
              </View>
              
              <View className={themedClasses.stateWarning + ' p-3 rounded-md'}>
                <Text className="text-white font-medium">Estado de Advertencia</Text>
              </View>
              
              <View className={themedClasses.stateError + ' p-3 rounded-md'}>
                <Text className="text-white font-medium">Estado de Error</Text>
              </View>
              
              <View className={themedClasses.stateInfo + ' p-3 rounded-md'}>
                <Text className="text-white font-medium">Estado de Información</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Colores de energía */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Colores de Energía</Title>
            
            <View className="mt-4 space-y-3">
              <View className={themedClasses.energySolar + ' p-3 rounded-md flex-row items-center'}>
                <Icon name="sun" size={20} color="#000000" className="mr-2" />
                <Text className="font-medium">Energía Solar</Text>
              </View>
              
              <View className={themedClasses.energyWind + ' p-3 rounded-md flex-row items-center'}>
                <Icon name="wind" size={20} color="#000000" className="mr-2" />
                <Text className="font-medium">Energía Eólica</Text>
              </View>
              
              <View className={themedClasses.energyHydro + ' p-3 rounded-md flex-row items-center'}>
                <Icon name="droplets" size={20} color="#FFFFFF" className="mr-2" />
                <Text className="text-white font-medium">Energía Hidroeléctrica</Text>
              </View>
              
              <View className={themedClasses.energyBattery + ' p-3 rounded-md flex-row items-center'}>
                <Icon name="battery" size={20} color="#000000" className="mr-2" />
                <Text className="font-medium">Batería</Text>
              </View>
              
              <View className={themedClasses.energyGrid + ' p-3 rounded-md flex-row items-center'}>
                <Icon name="zap" size={20} color="#FFFFFF" className="mr-2" />
                <Text className="text-white font-medium">Red Eléctrica</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Tamaños y espaciado */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Tamaños y Espaciado</Title>
            
            <View className="mt-4 space-y-3">
              <View className={getSizeClasses('xs') + ' ' + themedClasses.surface + ' rounded-md'}>
                <Text className={themedClasses.textPrimary}>Tamaño XS</Text>
              </View>
              
              <View className={getSizeClasses('sm') + ' ' + themedClasses.surface + ' rounded-md'}>
                <Text className={themedClasses.textPrimary}>Tamaño SM</Text>
              </View>
              
              <View className={getSizeClasses('md') + ' ' + themedClasses.surface + ' rounded-md'}>
                <Text className={themedClasses.textPrimary}>Tamaño MD</Text>
              </View>
              
              <View className={getSizeClasses('lg') + ' ' + themedClasses.surface + ' rounded-md'}>
                <Text className={themedClasses.textPrimary}>Tamaño LG</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Sombras */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Sombras</Title>
            
            <View className="mt-4 space-y-3">
              <View className={getShadowClasses('small') + ' ' + themedClasses.card + ' bg-card'}>
                <Text className={themedClasses.textPrimary}>Sombra Pequeña</Text>
              </View>
              
              <View className={getShadowClasses('medium') + ' ' + themedClasses.card + ' bg-card'}>
                <Text className={themedClasses.textPrimary}>Sombra Mediana</Text>
              </View>
              
              <View className={getShadowClasses('large') + ' ' + themedClasses.card + ' bg-card'}>
                <Text className={themedClasses.textPrimary}>Sombra Grande</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Formularios */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Formularios</Title>
            
            <View className="mt-4 space-y-3">
              <TextInput
                label="Campo de texto"
                value={inputValue}
                onChangeText={setInputValue}
                className={themedClasses.input}
                placeholder="Escribe algo aquí..."
              />
              
              <View className="flex-row items-center justify-between">
                <Text className={themedClasses.textSecondary}>Switch temático</Text>
                <Switch
                  value={switchValue}
                  onValueChange={setSwitchValue}
                  color={themeMode === 'dark' ? '#0A84FF' : '#007AFF'}
                />
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Clases condicionales */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Clases Condicionales</Title>
            
            <View className="mt-4 space-y-3">
              <View className={conditionalClasses(
                'bg-white border-gray-200',
                'bg-gray-800 border-gray-700'
              ) + ' p-4 rounded-md border'}>
                <Text className={conditionalClasses(
                  'text-black',
                  'text-white'
                ) + ' font-medium'}>
                  Clase condicional basada en tema
                </Text>
                <Text className={conditionalClasses(
                  'text-gray-600',
                  'text-gray-400'
                ) + ' text-sm'}>
                  Se adapta automáticamente al tema
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Grid y Layout */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Grid y Layout</Title>
            
            <View className="mt-4">
              <View className="flex-row flex-wrap gap-2">
                <View className={themedClasses.surface + ' p-3 rounded-md flex-1 min-w-[120px]'}>
                  <Text className={themedClasses.textPrimary + ' text-center'}>Item 1</Text>
                </View>
                <View className={themedClasses.surface + ' p-3 rounded-md flex-1 min-w-[120px]'}>
                  <Text className={themedClasses.textPrimary + ' text-center'}>Item 2</Text>
                </View>
                <View className={themedClasses.surface + ' p-3 rounded-md flex-1 min-w-[120px]'}>
                  <Text className={themedClasses.textPrimary + ' text-center'}>Item 3</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Utilidades avanzadas */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Utilidades Avanzadas</Title>
            
            <View className="mt-4 space-y-3">
              <View className="bg-gradient-to-r from-primary to-secondary p-4 rounded-md">
                <Text className="text-white font-medium text-center">
                  Gradiente temático
                </Text>
              </View>
              
              <View className="border-l-4 border-accent pl-4">
                <Text className={themedClasses.textPrimary}>Borde izquierdo acentuado</Text>
                <Text className={themedClasses.textSecondary}>Para destacar contenido</Text>
              </View>
              
              <View className="bg-opacity-10 bg-primary p-3 rounded-md">
                <Text className={themedClasses.textPrimary}>Fondo con opacidad</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View className="mt-6 p-4 bg-surface rounded-md">
          <Text className={themedClasses.textSecondary + ' text-center'}>
            NativeWind está completamente integrado con el sistema de temas
          </Text>
          <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
            Todas las clases se adaptan automáticamente al tema seleccionado
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NativeWindDemo;
