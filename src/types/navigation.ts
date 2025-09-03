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
