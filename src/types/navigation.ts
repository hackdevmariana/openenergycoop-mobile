// Tipos para las rutas de pestañas por defecto
export const defaultTabRoutes: TabRoute[] = [
  {
    name: 'Home',
    component: () => null, // Se reemplazará con el componente real
    options: {
      tabBarLabel: 'Inicio',
      tabBarIcon: ({ _focused, _color, _size }) => null, // Se reemplazará con el icono real
    },
  },
  {
    name: 'Dashboard',
    component: () => null,
    options: {
      tabBarLabel: 'Dashboard',
      tabBarIcon: ({ _focused, _color, _size }) => null,
    },
  },
  {
    name: 'Energy',
    component: () => null,
    options: {
      tabBarLabel: 'Energía',
      tabBarIcon: ({ _focused, _color, _size }) => null,
    },
  },
  {
    name: 'Profile',
    component: () => null,
    options: {
      tabBarLabel: 'Perfil',
      tabBarIcon: ({ _focused, _color, _size }) => null,
    },
  },
];

// Tipos para las rutas del stack principal
export type RootStackParamList = {
  Main: undefined;
  Detail: undefined;
};

// Tipos para las rutas de pestañas principales
export type MainTabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Energy: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Tipos para las rutas de pestañas por defecto
export type TabRoute = {
  name: string;
  component: React.ComponentType<any>;
  options: {
    tabBarLabel: string;
    tabBarIcon: (props: { focused: boolean; color: string; size: number }) => React.ReactElement;
  };
};
