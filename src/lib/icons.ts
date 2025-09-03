// Configuración de iconos para OpenEnergyCoop Mobile
// Este archivo centraliza todos los iconos utilizados en la aplicación

// Iconos de navegación
export const NavigationIcons = {
  home: 'home',
  dashboard: 'view-dashboard',
  profile: 'account',
  settings: 'cog',
  notifications: 'bell',
  menu: 'menu',
  back: 'arrow-left',
  forward: 'arrow-right',
  close: 'close',
  search: 'magnify',
} as const;

// Iconos de energía
export const EnergyIcons = {
  // Consumo
  consumption: 'lightning-bolt',
  power: 'flash',
  electricity: 'lightbulb',
  meter: 'gauge',
  
  // Producción
  production: 'solar-panel',
  solar: 'weather-sunny',
  wind: 'weather-windy',
  battery: 'battery',
  
  // Eficiencia
  efficiency: 'trending-up',
  chart: 'chart-line',
  analytics: 'chart-bar',
  performance: 'speedometer',
  
  // Estados
  online: 'wifi',
  offline: 'wifi-off',
  warning: 'alert',
  error: 'alert-circle',
  success: 'check-circle',
  info: 'information',
} as const;

// Iconos de usuario
export const UserIcons = {
  profile: 'account',
  edit: 'pencil',
  save: 'content-save',
  delete: 'delete',
  logout: 'logout',
  login: 'login',
  register: 'account-plus',
  settings: 'cog',
  preferences: 'tune',
} as const;

// Iconos de acciones
export const ActionIcons = {
  add: 'plus',
  remove: 'minus',
  edit: 'pencil',
  delete: 'delete',
  save: 'content-save',
  cancel: 'close',
  confirm: 'check',
  refresh: 'refresh',
  sync: 'sync',
  download: 'download',
  upload: 'upload',
  share: 'share',
  copy: 'content-copy',
  paste: 'content-paste',
} as const;

// Iconos de datos
export const DataIcons = {
  chart: 'chart-line',
  graph: 'chart-bar',
  table: 'table',
  list: 'format-list-bulleted',
  grid: 'view-grid',
  calendar: 'calendar',
  clock: 'clock',
  timer: 'timer',
  history: 'history',
  archive: 'archive',
} as const;

// Iconos de comunicación
export const CommunicationIcons = {
  email: 'email',
  phone: 'phone',
  message: 'message',
  chat: 'chat',
  notification: 'bell',
  alert: 'alert',
  info: 'information',
  help: 'help-circle',
  support: 'lifebuoy',
} as const;

// Iconos de ubicación
export const LocationIcons = {
  location: 'map-marker',
  home: 'home',
  building: 'office-building',
  factory: 'factory',
  warehouse: 'warehouse',
  store: 'store',
  gps: 'crosshairs-gps',
  compass: 'compass',
} as const;

// Iconos de tiempo
export const TimeIcons = {
  clock: 'clock',
  timer: 'timer',
  calendar: 'calendar',
  schedule: 'calendar-clock',
  history: 'history',
  future: 'calendar-plus',
  past: 'calendar-minus',
  today: 'calendar-today',
} as const;

// Iconos de estado
export const StatusIcons = {
  active: 'check-circle',
  inactive: 'circle',
  pending: 'clock',
  loading: 'loading',
  error: 'alert-circle',
  warning: 'alert',
  success: 'check',
  info: 'information',
  offline: 'wifi-off',
  online: 'wifi',
} as const;

// Iconos de configuración
export const ConfigIcons = {
  settings: 'cog',
  preferences: 'tune',
  theme: 'palette',
  language: 'translate',
  privacy: 'shield',
  security: 'lock',
  backup: 'backup-restore',
  restore: 'restore',
} as const;

// Función helper para obtener iconos por categoría
export const getIconByCategory = (category: string, type: string): string => {
  const iconMap: Record<string, Record<string, string>> = {
    navigation: NavigationIcons,
    energy: EnergyIcons,
    user: UserIcons,
    action: ActionIcons,
    data: DataIcons,
    communication: CommunicationIcons,
    location: LocationIcons,
    time: TimeIcons,
    status: StatusIcons,
    config: ConfigIcons,
  };

  return iconMap[category]?.[type] || 'help-circle';
};

// Función helper para obtener iconos de energía por tipo
export const getEnergyIcon = (type: 'consumption' | 'production' | 'efficiency' | 'neutral'): string => {
  switch (type) {
    case 'consumption':
      return EnergyIcons.consumption;
    case 'production':
      return EnergyIcons.production;
    case 'efficiency':
      return EnergyIcons.efficiency;
    default:
      return EnergyIcons.power;
  }
};

// Función helper para obtener iconos de estado
export const getStatusIcon = (status: 'success' | 'error' | 'warning' | 'info' | 'loading'): string => {
  switch (status) {
    case 'success':
      return StatusIcons.success;
    case 'error':
      return StatusIcons.error;
    case 'warning':
      return StatusIcons.warning;
    case 'info':
      return StatusIcons.info;
    case 'loading':
      return StatusIcons.loading;
    default:
      return StatusIcons.info;
  }
};

// Tipos para TypeScript
export type NavigationIconType = keyof typeof NavigationIcons;
export type EnergyIconType = keyof typeof EnergyIcons;
export type UserIconType = keyof typeof UserIcons;
export type ActionIconType = keyof typeof ActionIcons;
export type DataIconType = keyof typeof DataIcons;
export type CommunicationIconType = keyof typeof CommunicationIcons;
export type LocationIconType = keyof typeof LocationIcons;
export type TimeIconType = keyof typeof TimeIcons;
export type StatusIconType = keyof typeof StatusIcons;
export type ConfigIconType = keyof typeof ConfigIcons;

