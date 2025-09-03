import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Switch } from 'react-native-paper';
import { Icon } from '../config/icons';
import { useStorage, useStorageCleanup } from '../hooks/useStorage';
import { storageService } from '../services/storage';

const StorageDemo: React.FC = () => {
  const [customKey, setCustomKey] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [storageSize, setStorageSize] = useState<number>(0);
  const [allKeys, setAllKeys] = useState<string[]>([]);

  // Hooks de almacenamiento
  const userProfile = useStorage('user_profile', {
    name: 'Usuario Demo',
    email: 'demo@openenergycoop.com',
    preferences: { theme: 'light', notifications: true },
  });

  const appSettings = useStorage('app_settings', {
    autoRefresh: true,
    refreshInterval: 5,
    enableAnalytics: false,
  });

  const notifications = useStorage<any[]>('demo_notifications', []);

  const { clearAll, clearCache, clearSession, clearing } = useStorageCleanup();

  // Función para mostrar información del almacenamiento
  const showStorageInfo = async () => {
    try {
      const size = await storageService.getStorageSize();
      const keys = await storageService.getAllKeys();
      setStorageSize(size);
      setAllKeys(keys);
      Alert.alert('Información del Almacenamiento', 
        `Tamaño: ${(size / 1024).toFixed(2)} KB\nClaves: ${keys.length}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la información del almacenamiento');
    }
  };

  // Función para agregar una notificación de prueba
  const addTestNotification = async () => {
    const newNotification = {
      id: Date.now().toString(),
      title: 'Notificación de Prueba',
      message: 'Esta es una notificación de prueba para demostrar AsyncStorage',
      timestamp: Date.now(),
      read: false,
    };

    const currentNotifications = notifications.value || [];
    await notifications.setValue([newNotification, ...currentNotifications]);
  };

  // Función para guardar un valor personalizado
  const saveCustomValue = async () => {
    if (!customKey.trim()) {
      Alert.alert('Error', 'Por favor ingresa una clave');
      return;
    }

    try {
      await storageService.setItem(customKey, customValue);
      setCustomKey('');
      setCustomValue('');
      Alert.alert('Éxito', 'Valor guardado correctamente');
      showStorageInfo(); // Actualizar información
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el valor');
    }
  };

  // Función para limpiar todo el almacenamiento
  const handleClearAll = async () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que quieres limpiar todo el almacenamiento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            await clearAll();
            showStorageInfo();
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Demo de AsyncStorage
        </Title>
        <Paragraph className="text-center mb-6 text-gray-600">
          Demostración de las capacidades de almacenamiento local
        </Paragraph>

        {/* Información del almacenamiento */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Información del Almacenamiento</Title>
            <View className="flex-row justify-between items-center mb-3">
              <Text>Tamaño: {(storageSize / 1024).toFixed(2)} KB</Text>
              <Text>Claves: {allKeys.length}</Text>
            </View>
            <Button 
              mode="contained" 
              onPress={showStorageInfo}
              className="mb-2"
            >
              Actualizar Información
            </Button>
            <View className="bg-gray-100 p-3 rounded-lg">
              <Text className="text-xs font-mono">
                Claves disponibles: {allKeys.slice(0, 5).join(', ')}
                {allKeys.length > 5 && '...'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Perfil de usuario */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Perfil de Usuario</Title>
            {userProfile.loading ? (
              <Text>Cargando...</Text>
            ) : (
              <View>
                <Text>Nombre: {userProfile.value?.name}</Text>
                <Text>Email: {userProfile.value?.email}</Text>
                <Text>Tema: {userProfile.value?.preferences?.theme}</Text>
                <Button 
                  mode="outlined" 
                  onPress={() => userProfile.setValue({
                    ...userProfile.value,
                    name: 'Usuario Actualizado',
                    preferences: { theme: 'dark', notifications: true },
                  })}
                  className="mt-2"
                >
                  Actualizar Perfil
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Configuración de la aplicación */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Configuración de la App</Title>
            {appSettings.loading ? (
              <Text>Cargando...</Text>
            ) : (
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text>Auto-refresh</Text>
                  <Switch
                    value={appSettings.value?.autoRefresh}
                    onValueChange={(value) => appSettings.setValue({
                      ...appSettings.value,
                      autoRefresh: value,
                    })}
                  />
                </View>
                <Text>Intervalo: {appSettings.value?.refreshInterval} minutos</Text>
                <Button 
                  mode="outlined" 
                  onPress={() => appSettings.setValue({
                    ...appSettings.value,
                    refreshInterval: 10,
                  })}
                  className="mt-2"
                >
                  Cambiar Intervalo
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Notificaciones */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Notificaciones ({notifications.value?.length || 0})</Title>
            <Button 
              mode="contained" 
              onPress={addTestNotification}
              className="mb-2"
            >
              Agregar Notificación
            </Button>
            <Button 
              mode="outlined" 
              onPress={() => notifications.setValue([])}
              className="mb-2"
            >
              Limpiar Notificaciones
            </Button>
            {notifications.value?.slice(0, 3).map((notification) => (
              <View key={notification.id} className="bg-gray-100 p-2 rounded mb-2">
                <Text className="font-bold">{notification.title}</Text>
                <Text className="text-sm">{notification.message}</Text>
                <Text className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </Text>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Valor personalizado */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Guardar Valor Personalizado</Title>
            <TextInput
              label="Clave"
              value={customKey}
              onChangeText={setCustomKey}
              className="mb-2"
            />
            <TextInput
              label="Valor"
              value={customValue}
              onChangeText={setCustomValue}
              className="mb-2"
            />
            <Button 
              mode="contained" 
              onPress={saveCustomValue}
              disabled={!customKey.trim()}
            >
              Guardar
            </Button>
          </Card.Content>
        </Card>

        {/* Acciones de limpieza */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Acciones de Limpieza</Title>
            <Button 
              mode="outlined" 
              onPress={clearCache}
              disabled={clearing}
              className="mb-2"
            >
              Limpiar Cache
            </Button>
            <Button 
              mode="outlined" 
              onPress={clearSession}
              disabled={clearing}
              className="mb-2"
            >
              Limpiar Sesión
            </Button>
            <Button 
              mode="contained" 
              onPress={handleClearAll}
              disabled={clearing}
              buttonColor="#FF3B30"
            >
              Limpiar Todo
            </Button>
            {clearing && (
              <Text className="text-center mt-2 text-gray-600">
                Limpiando almacenamiento...
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Estado de carga y errores */}
        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-3">Estado</Title>
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text>Perfil cargando:</Text>
                <Icon name={userProfile.loading ? 'success' : 'error'} size={16} />
              </View>
              <View className="flex-row justify-between">
                <Text>Configuración cargando:</Text>
                <Icon name={appSettings.loading ? 'success' : 'error'} size={16} />
              </View>
              <View className="flex-row justify-between">
                <Text>Notificaciones cargando:</Text>
                <Icon name={notifications.loading ? 'success' : 'error'} size={16} />
              </View>
              {userProfile.error && (
                <Text className="text-red-500">Error en perfil: {userProfile.error.message}</Text>
              )}
              {appSettings.error && (
                <Text className="text-red-500">Error en configuración: {appSettings.error.message}</Text>
              )}
              {notifications.error && (
                <Text className="text-red-500">Error en notificaciones: {notifications.error.message}</Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default StorageDemo;
