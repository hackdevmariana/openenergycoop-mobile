import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppStore } from '../stores/appStore';
import { Icon } from '../config/icons';
import { RootStackParamList, MainTabParamList } from '../types/navigation';
import { useScreens } from '../hooks/useScreens';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import DetailScreen from '../screens/DetailScreen';
import StorageDemo from '../components/StorageDemo';
import IconShowcase from '../components/IconShowcase';
import NavigationGesturesDemo from '../components/NavigationGesturesDemo';
import HelpGesturesDemo from '../components/HelpGesturesDemo';
import SVGDemo from '../components/SVGDemo';
import MapsDemo from '../components/MapsDemo';
import NotificationsDemo from '../components/NotificationsDemo';
import PaymentsDemo from '../components/PaymentsDemo';

// Crear navegadores
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Navegador de pestañas principales
const MainTabNavigator: React.FC = () => {
  const { currentTheme } = useAppStore();
  const { createScreenOptions } = useScreens();

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
        // Configuración de React Native Screens para gestos
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance: 50,
        animation: 'slide_from_right',
        presentation: 'card',
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
        component={NavigationGesturesDemo}
        options={{
          title: 'Gestos',
          tabBarLabel: 'Gestos',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={HelpGesturesDemo}
        options={{
          title: 'Ayuda',
          tabBarLabel: 'Ayuda',
        }}
      />
                  <Tab.Screen
              name="Settings"
              component={PaymentsDemo}
              options={{
                title: 'Payments',
                tabBarLabel: 'Payments',
              }}
            />
    </Tab.Navigator>
  );
};

// Navegador principal
const AppNavigator: React.FC = () => {
  const { isInitialized } = useAppStore();
  const { createScreenOptions } = useScreens();

  if (!isInitialized) {
    // Pantalla de carga mientras se inicializa
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // Configuración de React Native Screens para gestos de navegación
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
          animation: 'slide_from_right',
          presentation: 'card',
          // Configuración de rendimiento
          animationTypeForReplace: 'push',
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen}
          options={{
            headerShown: true,
            title: 'Detalle',
            // Configuración específica para gestos en esta pantalla
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            gestureResponseDistance: 50,
            animation: 'slide_from_right',
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
