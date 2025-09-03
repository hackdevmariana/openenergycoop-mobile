import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
  getEnergyIcon, 
  getStatusIcon, 
  getIconByCategory,
  EnergyIcons,
  StatusIcons,
  NavigationIcons,
  UserIcons,
  ActionIcons,
} from '../../lib/icons';

interface EnergyIconProps {
  // Tipos de iconos
  type?: 'energy' | 'status' | 'navigation' | 'user' | 'action';
  icon?: string;
  
  // Para iconos de energía
  energyType?: 'consumption' | 'production' | 'efficiency' | 'neutral';
  
  // Para iconos de estado
  status?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  
  // Para iconos específicos
  navigationIcon?: keyof typeof NavigationIcons;
  userIcon?: keyof typeof UserIcons;
  actionIcon?: keyof typeof ActionIcons;
  energyIcon?: keyof typeof EnergyIcons;
  statusIcon?: keyof typeof StatusIcons;
  
  // Propiedades del icono
  size?: number;
  color?: string;
  style?: any;
  
  // Para IconButton
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  
  // Para iconos con texto
  showLabel?: boolean;
  label?: string;
}

const createIconComponent = (iconName: string, size: number, iconColor: string, style: any) => {
  return () => (
    <Icon 
      name={iconName} 
      size={size} 
      color={iconColor}
      style={style}
    />
  );
};

export const EnergyIcon: React.FC<EnergyIconProps> = ({
  type = 'energy',
  icon,
  energyType = 'neutral',
  status = 'info',
  navigationIcon,
  userIcon,
  actionIcon,
  energyIcon,
  statusIcon,
  size = 24,
  color,
  style,
  onPress,
  disabled = false,
  selected = false,
  showLabel: _showLabel = false,
  label: _label,
}) => {
  const theme = useTheme();

  // Determinar el nombre del icono
  const getIconName = (): string => {
    // Si se proporciona un icono específico, usarlo
    if (icon) return icon;
    
    // Si se proporciona un icono específico por tipo
    if (energyIcon) return EnergyIcons[energyIcon];
    if (statusIcon) return StatusIcons[statusIcon];
    if (navigationIcon) return NavigationIcons[navigationIcon];
    if (userIcon) return UserIcons[userIcon];
    if (actionIcon) return ActionIcons[actionIcon];
    
    // Si se proporciona un tipo, usar la función helper correspondiente
    switch (type) {
      case 'energy':
        return getEnergyIcon(energyType);
      case 'status':
        return getStatusIcon(status);
      case 'navigation':
        return getIconByCategory('navigation', 'home');
      case 'user':
        return getIconByCategory('user', 'profile');
      case 'action':
        return getIconByCategory('action', 'add');
      default:
        return 'help-circle';
    }
  };

  // Determinar el color del icono
  const getIconColor = (): string => {
    if (color) return color;
    
    // Colores por tipo de energía
    if (type === 'energy' || energyType !== 'neutral') {
      const { energyColors } = require('../../theme');
      switch (energyType) {
        case 'consumption':
          return energyColors.consumption;
        case 'production':
          return energyColors.production;
        case 'efficiency':
          return energyColors.efficiency;
        default:
          return theme.colors.primary;
      }
    }
    
    // Colores por estado
    if (type === 'status') {
      switch (status) {
        case 'success':
          return theme.colors.primary;
        case 'error':
          return theme.colors.error;
        case 'warning':
          return theme.colors.tertiary;
        case 'info':
          return theme.colors.secondary;
        case 'loading':
          return theme.colors.onSurfaceVariant;
        default:
          return theme.colors.onSurface;
      }
    }
    
    // Color por defecto
    return theme.colors.onSurface;
  };

  const iconName = getIconName();
  const iconColor = getIconColor();

  // Si es un IconButton (con onPress)
  if (onPress) {
    const IconComponent = createIconComponent(iconName, size, iconColor, style);

    return (
      <IconButton
        icon={IconComponent}
        onPress={onPress}
        disabled={disabled}
        selected={selected}
        style={[styles.iconButton, style]}
      />
    );
  }

  // Icono simple
  return (
    <Icon 
      name={iconName} 
      size={size} 
      color={iconColor}
      style={[styles.icon, style]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    // Estilos base para el icono
  },
  iconButton: {
    // Estilos base para el botón de icono
  },
});
