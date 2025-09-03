import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppStore } from '../stores/appStore';
import { Icon } from '../config/icons';
import { RootStackParamList, MainTabParamList } from '../types/navigation';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import StorageDemo from '../components/StorageDemo';
import IconShowcase from '../components/IconShowcase';

// Crear navegadores
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Navegador de pestañas principales
const MainTabNavigator: React.FC = () => {
  const { currentTheme } = useAppStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'homeOutline';
              break;
            case 'Dashboard':
              iconName = focused ? 'chart' : 'analytics';
              break;
            case 'Energy':
              iconName = focused ? 'energy' : 'solar';
              break;
            case 'Profile':
              iconName = focused ? 'profile' : 'profileOutline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settingsOutline';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: currentTheme === 'dark' ? '#FFFFFF' : '#007AFF',
        tabBarInactiveTintColor: currentTheme === 'dark' ? '#8E8E93' : '#8E8E93',
        tabBarStyle: {
          backgroundColor: currentTheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: currentTheme === 'dark' ? '#38383A' : '#E5E5E5',
        },
        headerStyle: {
          backgroundColor: currentTheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
        },
        headerTintColor: currentTheme === 'dark' ? '#FFFFFF' : '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Energy" 
        component={StorageDemo}
        options={{
          title: 'Energía',
          tabBarLabel: 'Energía',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={IconShowcase}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={StorageDemo}
        options={{
          title: 'Configuración',
          tabBarLabel: 'Config',
        }}
      />
    </Tab.Navigator>
  );
};

// Navegador principal
const AppNavigator: React.FC = () => {
  const { isInitialized } = useAppStore();

  if (!isInitialized) {
    // Pantalla de carga mientras se inicializa
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
