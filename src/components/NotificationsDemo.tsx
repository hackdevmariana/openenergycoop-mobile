import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button, FAB, List, Switch } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const NotificationsDemo: React.FC = () => {
  const { theme } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    notificationState,
    config,
    requestPermissions,
    checkPermissions,
    generateToken,
    sendLocalNotification,
    scheduleNotification,
    cancelScheduledNotification,
    cancelAllScheduledNotifications,
    getScheduledNotifications,
    sendEnergyNotification,
    sendSystemNotification,
    sendSecurityNotification,
    scheduleRecurringNotification,
  } = useNotifications();

  const [currentDemo, setCurrentDemo] = useState<'basic' | 'energy' | 'system' | 'security' | 'scheduling'>('basic');
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const handleDemoChange = (demo: typeof currentDemo) => {
    trackUserAction('notifications_demo_changed', { demo });
    setCurrentDemo(demo);
  };

  const handleRequestPermissions = async () => {
    trackUserAction('notifications_request_permissions');
    const granted = await requestPermissions();
    if (granted) {
      Alert.alert('Éxito', 'Permisos de notificación concedidos');
    } else {
      Alert.alert('Error', 'Permisos de notificación denegados');
    }
  };

  const handleCheckPermissions = async () => {
    trackUserAction('notifications_check_permissions');
    try {
      const permission = await checkPermissions();
      Alert.alert(
        'Estado de Permisos',
        `Estado: ${permission.status}\nConcedido: ${permission.granted ? 'Sí' : 'No'}\nPuede preguntar de nuevo: ${permission.canAskAgain ? 'Sí' : 'No'}`
      );
    } catch (error) {
      Alert.alert('Error', 'Error al verificar permisos');
    }
  };

  const handleGenerateToken = async () => {
    trackUserAction('notifications_generate_token');
    try {
      const token = await generateToken();
      if (token) {
        Alert.alert('Token Generado', `Token: ${token.substring(0, 20)}...`);
      } else {
        Alert.alert('Error', 'No se pudo generar el token');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al generar token');
    }
  };

  const handleSendTestNotification = async () => {
    trackUserAction('notifications_send_test');
    try {
      const notificationId = await sendLocalNotification({
        title: 'Notificación de Prueba',
        body: 'Esta es una notificación de prueba de expo-notifications',
        sound: 'default',
        priority: 'normal',
        data: {
          type: 'test',
          action: 'test_action',
        },
      });
      Alert.alert('Éxito', `Notificación enviada con ID: ${notificationId}`);
    } catch (error) {
      Alert.alert('Error', 'Error al enviar notificación');
    }
  };

  const handleSendEnergyNotification = async (type: keyof typeof config.types.energy) => {
    trackUserAction('notifications_send_energy', { type });
    try {
      const notificationId = await sendEnergyNotification(type);
      Alert.alert('Éxito', `Notificación de energía enviada con ID: ${notificationId}`);
    } catch (error) {
      Alert.alert('Error', 'Error al enviar notificación de energía');
    }
  };

  const handleSendSystemNotification = async (type: keyof typeof config.types.system) => {
    trackUserAction('notifications_send_system', { type });
    try {
      const notificationId = await sendSystemNotification(type);
      Alert.alert('Éxito', `Notificación del sistema enviada con ID: ${notificationId}`);
    } catch (error) {
      Alert.alert('Error', 'Error al enviar notificación del sistema');
    }
  };

  const handleSendSecurityNotification = async (type: keyof typeof config.types.security) => {
    trackUserAction('notifications_send_security', { type });
    try {
      const notificationId = await sendSecurityNotification(type);
      Alert.alert('Éxito', `Notificación de seguridad enviada con ID: ${notificationId}`);
    } catch (error) {
      Alert.alert('Error', 'Error al enviar notificación de seguridad');
    }
  };

  const handleScheduleNotification = async () => {
    trackUserAction('notifications_schedule');
    try {
      const notificationId = await scheduleNotification(
        {
          title: 'Notificación Programada',
          body: 'Esta notificación se programó para 5 segundos',
          sound: 'default',
          priority: 'normal',
          data: {
            type: 'scheduled',
            action: 'scheduled_action',
          },
        },
        {
          type: 'timeInterval',
          seconds: 5,
        }
      );
      Alert.alert('Éxito', `Notificación programada con ID: ${notificationId}`);
    } catch (error) {
      Alert.alert('Error', 'Error al programar notificación');
    }
  };

  const handleScheduleRecurringNotification = async (type: keyof typeof config.scheduling.recurring) => {
    trackUserAction('notifications_schedule_recurring', { type });
    try {
      const notificationId = await scheduleRecurringNotification(type);
      Alert.alert('Éxito', `Notificación recurrente programada con ID: ${notificationId}`);
    } catch (error) {
      Alert.alert('Error', 'Error al programar notificación recurrente');
    }
  };

  const handleCancelAllNotifications = async () => {
    trackUserAction('notifications_cancel_all');
    try {
      await cancelAllScheduledNotifications();
      Alert.alert('Éxito', 'Todas las notificaciones programadas han sido canceladas');
    } catch (error) {
      Alert.alert('Error', 'Error al cancelar notificaciones');
    }
  };

  const handleGetScheduledNotifications = async () => {
    trackUserAction('notifications_get_scheduled');
    try {
      const notifications = await getScheduledNotifications();
      Alert.alert(
        'Notificaciones Programadas',
        `Total: ${notifications.length}\n${notifications.map(n => `${n.title}: ${n.id}`).join('\n')}`
      );
    } catch (error) {
      Alert.alert('Error', 'Error al obtener notificaciones programadas');
    }
  };

  const renderBasicDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Funciones Básicas</Title>
          <Paragraph className="mb-4">
            Funciones básicas de expo-notifications:
          </Paragraph>
          
          <View className="space-y-3">
            <Button
              mode="contained"
              onPress={handleRequestPermissions}
              className="bg-primary"
            >
              Solicitar Permisos
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleCheckPermissions}
              className="border-primary"
            >
              Verificar Permisos
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleGenerateToken}
              className="border-primary"
            >
              Generar Token
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleSendTestNotification}
              className="border-primary"
            >
              Enviar Notificación de Prueba
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleScheduleNotification}
              className="border-primary"
            >
              Programar Notificación (5s)
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleGetScheduledNotifications}
              className="border-primary"
            >
              Ver Notificaciones Programadas
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleCancelAllNotifications}
              className="border-primary"
            >
              Cancelar Todas las Notificaciones
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderEnergyDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Notificaciones de Energía</Title>
          <Paragraph className="mb-4">
            Notificaciones específicas para el sector energético:
          </Paragraph>
          
          <View className="space-y-3">
            {Object.entries(config.types.energy).map(([key, notification]) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleSendEnergyNotification(key as keyof typeof config.types.energy)}
                className={`p-3 rounded-md ${
                  selectedNotification === key ? 'bg-primary' : 'bg-surface-variant'
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">{notification.icon}</Text>
                  <View className="flex-1">
                    <Text className={`font-bold ${
                      selectedNotification === key ? 'text-white' : 'text-text-primary'
                    }`}>
                      {notification.title}
                    </Text>
                    <Text className={`text-sm ${
                      selectedNotification === key ? 'text-white' : 'text-text-secondary'
                    }`}>
                      {notification.body}
                    </Text>
                  </View>
                  <Text className={`text-xs ${
                    selectedNotification === key ? 'text-white' : 'text-text-secondary'
                  }`}>
                    {notification.priority}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderSystemDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Notificaciones del Sistema</Title>
          <Paragraph className="mb-4">
            Notificaciones relacionadas con el sistema y la aplicación:
          </Paragraph>
          
          <View className="space-y-3">
            {Object.entries(config.types.system).map(([key, notification]) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleSendSystemNotification(key as keyof typeof config.types.system)}
                className={`p-3 rounded-md ${
                  selectedNotification === key ? 'bg-primary' : 'bg-surface-variant'
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">{notification.icon}</Text>
                  <View className="flex-1">
                    <Text className={`font-bold ${
                      selectedNotification === key ? 'text-white' : 'text-text-primary'
                    }`}>
                      {notification.title}
                    </Text>
                    <Text className={`text-sm ${
                      selectedNotification === key ? 'text-white' : 'text-text-secondary'
                    }`}>
                      {notification.body}
                    </Text>
                  </View>
                  <Text className={`text-xs ${
                    selectedNotification === key ? 'text-white' : 'text-text-secondary'
                  }`}>
                    {notification.priority}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderSecurityDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Notificaciones de Seguridad</Title>
          <Paragraph className="mb-4">
            Notificaciones relacionadas con la seguridad de la cuenta:
          </Paragraph>
          
          <View className="space-y-3">
            {Object.entries(config.types.security).map(([key, notification]) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleSendSecurityNotification(key as keyof typeof config.types.security)}
                className={`p-3 rounded-md ${
                  selectedNotification === key ? 'bg-primary' : 'bg-surface-variant'
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">{notification.icon}</Text>
                  <View className="flex-1">
                    <Text className={`font-bold ${
                      selectedNotification === key ? 'text-white' : 'text-text-primary'
                    }`}>
                      {notification.title}
                    </Text>
                    <Text className={`text-sm ${
                      selectedNotification === key ? 'text-white' : 'text-text-secondary'
                    }`}>
                      {notification.body}
                    </Text>
                  </View>
                  <Text className={`text-xs ${
                    selectedNotification === key ? 'text-white' : 'text-text-secondary'
                  }`}>
                    {notification.priority}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderSchedulingDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Programación de Notificaciones</Title>
          <Paragraph className="mb-4">
            Notificaciones programadas y recurrentes:
          </Paragraph>
          
          <View className="space-y-3">
            {Object.entries(config.scheduling.recurring).map(([key, notification]) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleScheduleRecurringNotification(key as keyof typeof config.scheduling.recurring)}
                className={`p-3 rounded-md ${
                  selectedNotification === key ? 'bg-primary' : 'bg-surface-variant'
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">📅</Text>
                  <View className="flex-1">
                    <Text className={`font-bold ${
                      selectedNotification === key ? 'text-white' : 'text-text-primary'
                    }`}>
                      {notification.title}
                    </Text>
                    <Text className={`text-sm ${
                      selectedNotification === key ? 'text-white' : 'text-text-secondary'
                    }`}>
                      {notification.body}
                    </Text>
                    <Text className={`text-xs ${
                      selectedNotification === key ? 'text-white' : 'text-text-secondary'
                    }`}>
                      {notification.trigger.repeats ? 'Recurrente' : 'Una vez'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case 'basic':
        return renderBasicDemo();
      case 'energy':
        return renderEnergyDemo();
      case 'system':
        return renderSystemDemo();
      case 'security':
        return renderSecurityDemo();
      case 'scheduling':
        return renderSchedulingDemo();
      default:
        return renderBasicDemo();
    }
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-background">
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              Expo Notifications Demo
            </Title>
            <Paragraph className="text-text-secondary">
              Demostración de notificaciones push y locales
            </Paragraph>
          </View>

          {/* Información del sistema */}
          <Card className="bg-surface rounded-lg shadow-sm mb-4">
            <Card.Content>
              <Title>Información del Sistema</Title>
              <Paragraph className="mb-4">
                Configuración actual de expo-notifications
              </Paragraph>
              
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Versión:</Text>
                  <Text className="text-text-primary font-bold">{config.basic.version}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Plataforma:</Text>
                  <Text className="text-text-primary font-bold">{Platform.OS}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Inicializado:</Text>
                  <Text className="text-success font-bold">
                    {notificationState.isInitialized ? 'Sí' : 'No'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Permisos:</Text>
                  <Text className="text-success font-bold">
                    {notificationState.permission?.granted ? 'Concedidos' : 'No concedidos'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Token:</Text>
                  <Text className="text-success font-bold">
                    {notificationState.token ? 'Generado' : 'No generado'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-text-secondary">Programadas:</Text>
                  <Text className="text-text-primary font-bold">
                    {notificationState.scheduledNotifications.length}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Selector de demostración */}
          <Card className="bg-surface rounded-lg shadow-sm mb-4">
            <Card.Content>
              <Title>Tipo de Demostración</Title>
              <Paragraph className="mb-4">
                Selecciona el tipo de demostración de notificaciones:
              </Paragraph>
              
              <View className="flex-row flex-wrap gap-2">
                {(['basic', 'energy', 'system', 'security', 'scheduling'] as const).map((demo) => (
                  <TouchableOpacity
                    key={demo}
                    onPress={() => handleDemoChange(demo)}
                    className={`px-3 py-2 rounded-md ${
                      currentDemo === demo ? 'bg-primary' : 'bg-surface-variant'
                    }`}
                  >
                    <Text className={currentDemo === demo ? 'text-white' : 'text-text-primary'}>
                      {demo.charAt(0).toUpperCase() + demo.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Demostración actual */}
          <Card className="bg-surface rounded-lg shadow-sm mb-4">
            <Card.Content>
              <Title>Demostración: {currentDemo.charAt(0).toUpperCase() + currentDemo.slice(1)}</Title>
              <Paragraph className="mb-4">
                Funciones disponibles para este tipo de notificación:
              </Paragraph>
              
              {renderCurrentDemo()}
            </Card.Content>
          </Card>

          {/* Configuración de comportamiento */}
          <Card className="bg-surface rounded-lg shadow-sm mb-4">
            <Card.Content>
              <Title>Configuración de Comportamiento</Title>
              <Paragraph className="mb-4">
                Configuración del comportamiento de las notificaciones:
              </Paragraph>
              
              <View className="space-y-4">
                <View>
                  <Text className="text-text-primary font-bold mb-2">Primer Plano:</Text>
                  <View className="space-y-2">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-text-secondary">Mostrar alerta</Text>
                      <Switch
                        value={config.behavior.foreground.shouldShowAlert}
                        onValueChange={() => {}}
                        disabled
                      />
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-text-secondary">Reproducir sonido</Text>
                      <Switch
                        value={config.behavior.foreground.shouldPlaySound}
                        onValueChange={() => {}}
                        disabled
                      />
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text className="text-text-secondary">Establecer badge</Text>
                      <Switch
                        value={config.behavior.foreground.shouldSetBadge}
                        onValueChange={() => {}}
                        disabled
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              Expo Notifications
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Notificaciones push y locales
            </Paragraph>
            <Paragraph className="text-center mt-2 text-sm text-text-secondary">
              Versión {config.basic.version}
            </Paragraph>
          </View>
        </View>
      </ScrollView>

      {/* FAB para enviar notificación de prueba */}
      <FAB
        icon="bell"
        onPress={handleSendTestNotification}
        className="absolute bottom-4 right-4"
        style={{ backgroundColor: '#007AFF' }}
      />
    </Screen>
  );
};

export default NotificationsDemo;
