import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonProps, useTheme } from 'react-native-paper';

interface EnergyButtonProps extends Omit<ButtonProps, 'mode'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  energyType?: 'consumption' | 'production' | 'efficiency' | 'neutral';
}

export const EnergyButton: React.FC<EnergyButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  energyType = 'neutral',
  style,
  contentStyle,
  labelStyle,
  ...props
}) => {
  const theme = useTheme();

  const getButtonMode = () => {
    switch (variant) {
      case 'outline':
        return 'outlined';
      case 'text':
        return 'text';
      default:
        return 'contained';
    }
  };

  const getEnergyColor = () => {
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
  };

  const buttonStyle = [
    styles.button,
    size === 'small' && styles.small,
    size === 'large' && styles.large,
    variant === 'primary' && energyType !== 'neutral' && { backgroundColor: getEnergyColor() },
    style,
  ];

  const contentStyleFinal = [
    styles.content,
    size === 'small' && styles.smallContent,
    size === 'large' && styles.largeContent,
    contentStyle,
  ];

  const labelStyleFinal = [
    styles.label,
    size === 'small' && styles.smallLabel,
    size === 'large' && styles.largeLabel,
    variant === 'outline' && energyType !== 'neutral' && { color: getEnergyColor() },
    labelStyle,
  ];

  return (
    <Button
      mode={getButtonMode()}
      style={buttonStyle}
      contentStyle={contentStyleFinal}
      labelStyle={labelStyleFinal}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: '600',
  },
  // Tamaños
  small: {
    minHeight: 32,
  },
  smallContent: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  smallLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  large: {
    minHeight: 48,
  },
  largeContent: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
