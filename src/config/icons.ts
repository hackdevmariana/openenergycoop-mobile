import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// Configuración de iconos para la aplicación
export const ICONS = {
  // Iconos de navegación
  home: (props: any) => React.createElement(Ionicons, { name: "home", ...props }),
  homeOutline: (props: any) => React.createElement(Ionicons, { name: "home-outline", ...props }),
  settings: (props: any) => React.createElement(Ionicons, { name: "settings", ...props }),
  settingsOutline: (props: any) => React.createElement(Ionicons, { name: "settings-outline", ...props }),
  profile: (props: any) => React.createElement(Ionicons, { name: "person", ...props }),
  profileOutline: (props: any) => React.createElement(Ionicons, { name: "person-outline", ...props }),
  
  // Iconos de energía
  energy: (props: any) => React.createElement(MaterialIcons, { name: "bolt", ...props }),
  solar: (props: any) => React.createElement(MaterialCommunityIcons, { name: "solar-power", ...props }),
  battery: (props: any) => React.createElement(MaterialIcons, { name: "battery-full", ...props }),
  batteryCharging: (props: any) => React.createElement(MaterialIcons, { name: "battery-charging-full", ...props }),
  power: (props: any) => React.createElement(MaterialIcons, { name: "power", ...props }),
  powerOff: (props: any) => React.createElement(MaterialIcons, { name: "power-off", ...props }),
  
  // Iconos de dashboard
  chart: (props: any) => React.createElement(MaterialIcons, { name: "bar-chart", ...props }),
  analytics: (props: any) => React.createElement(MaterialIcons, { name: "analytics", ...props }),
  trending: (props: any) => React.createElement(MaterialIcons, { name: "trending-up", ...props }),
  trendingDown: (props: any) => React.createElement(MaterialIcons, { name: "trending-down", ...props }),
  
  // Iconos de estado
  success: (props: any) => React.createElement(MaterialIcons, { name: "check-circle", ...props }),
  error: (props: any) => React.createElement(MaterialIcons, { name: "error", ...props }),
  warning: (props: any) => React.createElement(MaterialIcons, { name: "warning", ...props }),
  info: (props: any) => React.createElement(MaterialIcons, { name: "info", ...props }),
  
  // Iconos de acciones
  add: (props: any) => React.createElement(MaterialIcons, { name: "add", ...props }),
  edit: (props: any) => React.createElement(MaterialIcons, { name: "edit", ...props }),
  delete: (props: any) => React.createElement(MaterialIcons, { name: "delete", ...props }),
  refresh: (props: any) => React.createElement(MaterialIcons, { name: "refresh", ...props }),
  search: (props: any) => React.createElement(MaterialIcons, { name: "search", ...props }),
  filter: (props: any) => React.createElement(MaterialIcons, { name: "filter-list", ...props }),
  
  // Iconos de comunicación
  notification: (props: any) => React.createElement(Ionicons, { name: "notifications", ...props }),
  notificationOutline: (props: any) => React.createElement(Ionicons, { name: "notifications-outline", ...props }),
  message: (props: any) => React.createElement(Ionicons, { name: "mail", ...props }),
  messageOutline: (props: any) => React.createElement(Ionicons, { name: "mail-outline", ...props }),
  
  // Iconos de ubicación
  location: (props: any) => React.createElement(Ionicons, { name: "location", ...props }),
  locationOutline: (props: any) => React.createElement(Ionicons, { name: "location-outline", ...props }),
  map: (props: any) => React.createElement(MaterialIcons, { name: "map", ...props }),
  
  // Iconos de tiempo
  time: (props: any) => React.createElement(MaterialIcons, { name: "access-time", ...props }),
  calendar: (props: any) => React.createElement(MaterialIcons, { name: "calendar-today", ...props }),
  clock: (props: any) => React.createElement(MaterialIcons, { name: "schedule", ...props }),
  
  // Iconos de usuario
  user: (props: any) => React.createElement(FontAwesome, { name: "user", ...props }),
  users: (props: any) => React.createElement(FontAwesome, { name: "users", ...props }),
  userCircle: (props: any) => React.createElement(FontAwesome, { name: "user-circle", ...props }),
  
  // Iconos de configuración
  gear: (props: any) => React.createElement(Ionicons, { name: "cog", ...props }),
  gearOutline: (props: any) => React.createElement(Ionicons, { name: "cog-outline", ...props }),
  help: (props: any) => React.createElement(Ionicons, { name: "help-circle", ...props }),
  helpOutline: (props: any) => React.createElement(Ionicons, { name: "help-circle-outline", ...props }),
  
  // Iconos de energía específicos
  consumption: (props: any) => React.createElement(MaterialCommunityIcons, { name: "lightning-bolt", ...props }),
  production: (props: any) => React.createElement(MaterialCommunityIcons, { name: "solar-panel", ...props }),
  efficiency: (props: any) => React.createElement(MaterialCommunityIcons, { name: "efficiency", ...props }),
  grid: (props: any) => React.createElement(MaterialCommunityIcons, { name: "grid", ...props }),
  meter: (props: any) => React.createElement(MaterialCommunityIcons, { name: "meter-electric", ...props }),
};

// Tipos para los iconos
export type IconName = keyof typeof ICONS;

// Hook personalizado para usar iconos
export const useIcon = (name: IconName) => {
  return ICONS[name];
};

// Componente de icono con props tipadas
export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
  onPress?: () => void;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = ICONS[name];
  return React.createElement(IconComponent, props);
};
