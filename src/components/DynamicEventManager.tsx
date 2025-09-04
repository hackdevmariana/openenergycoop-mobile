import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Card, Title, Paragraph, Button, Switch, TextInput as PaperTextInput } from 'react-native-paper';
import { useDynamicContent } from '../services/dynamicContentService';
import { useTheme } from '../hooks/useTheme';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { SpecialEvent, DynamicContent } from '../services/dynamicContentService';

const DynamicEventManager: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { splashContent, specialEvents, isLoading, loadSplashContent, loadSpecialEvents, createVictoryEvent, syncContent } = useDynamicContent();

  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'sports' as const,
    message: '',
    icon: '🏆',
    background: '#FFD700',
    primary: '#FF0000',
    secondary: '#FFD700',
    text: '#000000',
    duration: 7, // días
    priority: 80,
    countries: ['ES'],
  });

  // Cargar contenido al montar el componente
  useEffect(() => {
    loadSplashContent();
    loadSpecialEvents();
    
    trackUserAction('dynamic_event_manager_viewed', {
      screen_name: 'Dynamic Event Manager',
      demo_mode: true,
    });
  }, []);

  const handleCreateVictoryEvent = async () => {
    try {
      const success = await createVictoryEvent();
      if (success) {
        Alert.alert('✅ Éxito', 'Evento de victoria creado correctamente');
        await loadSpecialEvents(); // Recargar eventos
      } else {
        Alert.alert('❌ Error', 'No se pudo crear el evento de victoria');
      }
    } catch (error) {
      Alert.alert('❌ Error', 'Error al crear el evento de victoria');
    }
  };

  const handleCreateCustomEvent = async () => {
    if (!newEvent.name || !newEvent.message) {
      Alert.alert('❌ Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    try {
      const customEvent: Omit<SpecialEvent, 'id'> = {
        name: newEvent.name,
        type: newEvent.type,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + newEvent.duration * 24 * 60 * 60 * 1000).toISOString(),
        priority: newEvent.priority,
        isActive: true,
        content: {
          id: `custom_${Date.now()}`,
          type: 'splash_screen',
          title: newEvent.name,
          message: newEvent.message,
          icon: newEvent.icon,
          colors: {
            background: newEvent.background,
            primary: newEvent.primary,
            secondary: newEvent.secondary,
            text: newEvent.text,
          },
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + newEvent.duration * 24 * 60 * 60 * 1000).toISOString(),
          priority: newEvent.priority,
          conditions: {
            countries: newEvent.countries,
          },
          metadata: {
            event: 'custom_event',
            description: `Evento personalizado: ${newEvent.name}`,
            tags: ['custom', newEvent.type],
          },
        },
      };

      const { dynamicContentService } = await import('../services/dynamicContentService');
      const success = await dynamicContentService.createManualEvent(customEvent);
      
      if (success) {
        Alert.alert('✅ Éxito', 'Evento personalizado creado correctamente');
        await loadSpecialEvents(); // Recargar eventos
        
        // Limpiar formulario
        setNewEvent({
          name: '',
          type: 'sports',
          message: '',
          icon: '🏆',
          background: '#FFD700',
          primary: '#FF0000',
          secondary: '#FFD700',
          text: '#000000',
          duration: 7,
          priority: 80,
          countries: ['ES'],
        });
      } else {
        Alert.alert('❌ Error', 'No se pudo crear el evento personalizado');
      }
    } catch (error) {
      Alert.alert('❌ Error', 'Error al crear el evento personalizado');
    }
  };

  const handleSyncContent = async () => {
    try {
      await syncContent();
      Alert.alert('✅ Éxito', 'Contenido sincronizado correctamente');
    } catch (error) {
      Alert.alert('❌ Error', 'Error al sincronizar contenido');
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'sports': return '⚽';
      case 'national': return '🏛️';
      case 'cultural': return '🎭';
      case 'environmental': return '🌱';
      case 'custom': return '🎨';
      default: return '📅';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'sports': return '#FF6B6B';
      case 'national': return '#4ECDC4';
      case 'cultural': return '#45B7D1';
      case 'environmental': return '#96CEB4';
      case 'custom': return '#FFEAA7';
      default: return '#DDA0DD';
    }
  };

  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold mb-2 text-text">
            Gestor de Eventos Dinámicos
          </Text>
          <Text className="text-text-secondary">
            Administra contenido dinámico del Splash Screen
          </Text>
        </View>

        {/* Estado actual */}
        <Card className={themedClasses.card}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Estado Actual</Title>
            
            <View className="mt-4 space-y-2">
              <Text className={themedClasses.textSecondary}>
                Contenido del splash: {splashContent ? 'Activo' : 'No activo'}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Eventos especiales: {specialEvents.length}
              </Text>
              <Text className={themedClasses.textSecondary}>
                Estado: {isLoading ? 'Cargando...' : 'Listo'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos Rápidos */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos Rápidos</Title>
            <Paragraph className={themedClasses.textSecondary}>
              Crear eventos predefinidos para situaciones comunes
            </Paragraph>
            
            <View className="mt-4 space-y-3">
              <TouchableOpacity 
                className={themedClasses.btnPrimary}
                onPress={handleCreateVictoryEvent}
                disabled={isLoading}
              >
                <Text className="text-white font-medium text-center">
                  🏆 Crear Evento de Victoria (España)
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className={themedClasses.btnSecondary}
                onPress={handleSyncContent}
                disabled={isLoading}
              >
                <Text className="font-medium text-center">
                  🔄 Sincronizar Contenido
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Crear Evento Personalizado */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Crear Evento Personalizado</Title>
            <Paragraph className={themedClasses.textSecondary}>
              Crea eventos personalizados para cualquier ocasión
            </Paragraph>
            
            <View className="mt-4 space-y-3">
              <PaperTextInput
                label="Nombre del evento"
                value={newEvent.name}
                onChangeText={(text) => setNewEvent(prev => ({ ...prev, name: text }))}
                className={themedClasses.input}
              />
              
              <PaperTextInput
                label="Mensaje"
                value={newEvent.message}
                onChangeText={(text) => setNewEvent(prev => ({ ...prev, message: text }))}
                multiline
                numberOfLines={2}
                className={themedClasses.input}
              />
              
              <PaperTextInput
                label="Icono (emoji)"
                value={newEvent.icon}
                onChangeText={(text) => setNewEvent(prev => ({ ...prev, icon: text }))}
                className={themedClasses.input}
              />
              
              <View className="flex-row space-x-2">
                <PaperTextInput
                  label="Color de fondo"
                  value={newEvent.background}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, background: text }))}
                  className={themedClasses.input + ' flex-1'}
                />
                
                <PaperTextInput
                  label="Color primario"
                  value={newEvent.primary}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, primary: text }))}
                  className={themedClasses.input + ' flex-1'}
                />
              </View>
              
              <View className="flex-row space-x-2">
                <PaperTextInput
                  label="Duración (días)"
                  value={newEvent.duration.toString()}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, duration: parseInt(text) || 7 }))}
                  keyboardType="numeric"
                  className={themedClasses.input + ' flex-1'}
                />
                
                <PaperTextInput
                  label="Prioridad (0-100)"
                  value={newEvent.priority.toString()}
                  onChangeText={(text) => setNewEvent(prev => ({ ...prev, priority: parseInt(text) || 80 }))}
                  keyboardType="numeric"
                  className={themedClasses.input + ' flex-1'}
                />
              </View>
              
              <TouchableOpacity 
                className={themedClasses.btnPrimary}
                onPress={handleCreateCustomEvent}
                disabled={isLoading}
              >
                <Text className="text-white font-medium text-center">
                  ✨ Crear Evento Personalizado
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Eventos Activos */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Eventos Activos</Title>
            <Paragraph className={themedClasses.textSecondary}>
              Eventos especiales actualmente activos
            </Paragraph>
            
            {specialEvents.length === 0 ? (
              <View className="mt-4 p-4 bg-surface rounded-md">
                <Text className={themedClasses.textSecondary + ' text-center'}>
                  No hay eventos activos
                </Text>
              </View>
            ) : (
              <View className="mt-4 space-y-3">
                {specialEvents.map((event) => (
                  <View key={event.id} className="p-3 bg-surface rounded-md">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center space-x-2">
                        <Text style={{ fontSize: 20 }}>{getEventTypeIcon(event.type)}</Text>
                        <Text className={themedClasses.textPrimary + ' font-medium'}>
                          {event.name}
                        </Text>
                      </View>
                      <View 
                        className="px-2 py-1 rounded"
                        style={{ backgroundColor: getEventTypeColor(event.type) + '20' }}
                      >
                        <Text 
                          className="text-xs font-medium"
                          style={{ color: getEventTypeColor(event.type) }}
                        >
                          {event.type.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    
                    <Text className={themedClasses.textSecondary + ' mt-2'}>
                      {event.content.message}
                    </Text>
                    
                    <View className="flex-row items-center justify-between mt-2">
                      <Text className={themedClasses.textTertiary + ' text-xs'}>
                        Prioridad: {event.priority}
                      </Text>
                      <Text className={themedClasses.textTertiary + ' text-xs'}>
                        {new Date(event.endDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Información */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Características</Title>
            
            <View className="mt-4 space-y-2">
              <Text className={themedClasses.textSecondary}>
                • Creación de eventos en tiempo real
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Contenido dinámico remoto
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Filtrado por país y región
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Sistema de prioridades
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Caché inteligente
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Sincronización automática
              </Text>
              <Text className={themedClasses.textSecondary}>
                • Fallback a contenido local
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Ejemplos de uso */}
        <Card className={themedClasses.card + ' mt-4'}>
          <Card.Content>
            <Title className={themedClasses.textPrimary}>Ejemplos de Uso</Title>
            
            <View className="mt-4 space-y-3">
              <View className="p-3 bg-surface rounded-md">
                <Text className={themedClasses.textPrimary + ' font-medium'}>
                  🏆 Victoria Deportiva
                </Text>
                <Text className={themedClasses.textSecondary + ' mt-1'}>
                  Cuando España gana un campeonato, crear evento con colores de la bandera
                </Text>
              </View>
              
              <View className="p-3 bg-surface rounded-md">
                <Text className={themedClasses.textPrimary + ' font-medium'}>
                  🎉 Fiestas Nacionales
                </Text>
                <Text className={themedClasses.textSecondary + ' mt-1'}>
                  Día de la Hispanidad, Día de España, etc.
                </Text>
              </View>
              
              <View className="p-3 bg-surface rounded-md">
                <Text className={themedClasses.textPrimary + ' font-medium'}>
                  🌍 Eventos Mundiales
                </Text>
                <Text className={themedClasses.textSecondary + ' mt-1'}>
                  Día de la Tierra, COP, eventos climáticos
                </Text>
              </View>
              
              <View className="p-3 bg-surface rounded-md">
                <Text className={themedClasses.textPrimary + ' font-medium'}>
                  🎨 Eventos Personalizados
                </Text>
                <Text className={themedClasses.textSecondary + ' mt-1'}>
                  Lanzamientos de productos, campañas especiales
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Footer */}
        <View className="mt-6 p-4 bg-surface rounded-md">
          <Text className={themedClasses.textSecondary + ' text-center'}>
            El contenido dinámico permite personalizar el Splash Screen en tiempo real
          </Text>
          <Text className={themedClasses.textTertiary + ' text-center mt-2'}>
            Perfecto para celebrar victorias deportivas y eventos especiales
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DynamicEventManager;
