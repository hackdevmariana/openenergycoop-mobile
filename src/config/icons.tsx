import React from 'react';
import { Icon, IconName } from './lucide';

// Configuración de iconos para la aplicación
export const ICONS = {
  // Navegación principal
  home: 'home',
  homeOutline: 'home',
  chart: 'chart',
  analytics: 'chart',
  energy: 'energy',
  solar: 'energy',
  profile: 'profile',
  profileOutline: 'profile',
  settings: 'settings',
  settingsOutline: 'settings',
  
  // Acciones comunes
  search: 'search',
  plus: 'plus',
  edit: 'edit',
  delete: 'delete',
  view: 'view',
  hide: 'hide',
  close: 'close',
  menu: 'menu',
  
  // Estados
  success: 'success',
  error: 'error',
  warning: 'alert',
  info: 'info',
  help: 'help',
  
  // Navegación
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronUp: 'chevron-up',
  chevronDown: 'chevron-down',
  arrowLeft: 'chevron-left',
  arrowRight: 'chevron-right',
  arrowUp: 'chevron-up',
  arrowDown: 'chevron-down',
  
  // Comunicación
  mail: 'mail',
  phone: 'phone',
  location: 'location',
  calendar: 'calendar',
  clock: 'clock',
  
  // Seguridad
  lock: 'lock',
  unlock: 'unlock',
  key: 'key',
  fingerprint: 'fingerprint',
  shield: 'shield',
  
  // Interacción
  star: 'star',
  heart: 'heart',
  share: 'share',
  download: 'download',
  upload: 'upload',
  refresh: 'refresh',
  
  // Organización
  filter: 'filter',
  sort: 'sort-asc',
  grid: 'grid',
  list: 'list',
  
  // Multimedia
  camera: 'camera',
  image: 'image',
  video: 'video',
  music: 'music',
  play: 'play',
  pause: 'pause',
  stop: 'stop',
  
  // Dispositivos
  wifi: 'wifi',
  signal: 'signal',
  battery: 'battery',
  volume: 'volume',
  mic: 'mic',
  
  // Finanzas
  creditCard: 'credit-card',
  wallet: 'wallet',
  trendingUp: 'trending-up',
  trendingDown: 'trending-down',
  dollar: 'dollar',
  
  // Naturaleza
  sun: 'sun',
  moon: 'moon',
  cloud: 'cloud',
  leaf: 'leaf',
  tree: 'tree',
  
  // Animales
  cat: 'cat',
  dog: 'dog',
  bird: 'bird',
  fish: 'fish',
  bug: 'bug',
  
  // Comida
  apple: 'apple',
  coffee: 'coffee',
  pizza: 'pizza',
  cake: 'cake',
  gift: 'gift',
} as const;

// Tipos para iconos de la aplicación
export type AppIconName = keyof typeof ICONS;

// Props para el componente Icon
export interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  fill?: string;
  onClick?: () => void;
  style?: any;
}

// Componente Icon principal de la aplicación
export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  fill = 'none',
  onClick,
  style,
}) => {
  const iconName = ICONS[name] as IconName;
  
  if (!iconName) {
    console.warn(`Icono de aplicación no encontrado: ${name}`);
    return null;
  }

  return (
    <Icon
      name={iconName}
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
      fill={fill}
      onClick={onClick}
      style={style}
    />
  );
};

// Hook para obtener icono de la aplicación
export const useAppIcon = (name: AppIconName) => {
  const iconName = ICONS[name] as IconName;
  return iconName;
};

// Función para verificar si un icono de aplicación existe
export const hasAppIcon = (name: string): name is AppIconName => {
  return name in ICONS;
};

// Función para obtener lista de iconos de aplicación disponibles
export const getAvailableAppIcons = (): AppIconName[] => {
  return Object.keys(ICONS) as AppIconName[];
};

// Configuración por defecto para iconos de la aplicación
export const defaultAppIconConfig = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  fill: 'none',
};

// Exportar el componente Icon como default para compatibilidad
export { Icon as default } from './lucide';

// Exportar tipos
export type { IconName } from './lucide';
