import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, TextInputProps, useTheme } from 'react-native-paper';

interface EnergyTextInputProps extends Omit<TextInputProps, 'mode'> {
  variant?: 'outlined' | 'flat';
  size?: 'small' | 'medium' | 'large';
  energyType?: 'consumption' | 'production' | 'efficiency' | 'neutral';
}

export const EnergyTextInput: React.FC<EnergyTextInputProps> = ({
  variant = 'outlined',
  size = 'medium',
  energyType = 'neutral',
  style,
  contentStyle,
  outlineStyle,
  ...props
}) => {
  const theme = useTheme();

  const getInputMode = () => {
    return variant;
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
        return theme.colors.outline;
    }
  };

  const inputStyle = [
    styles.input,
    size === 'small' && styles.small,
    size === 'large' && styles.large,
    style,
  ];

  const contentStyleFinal = [
    styles.content,
    size === 'small' && styles.smallContent,
    size === 'large' && styles.largeContent,
    contentStyle,
  ];

  const outlineStyleFinal = [
    styles.outline,
    energyType !== 'neutral' && { borderColor: getEnergyColor() },
    outlineStyle,
  ];

  return (
    <TextInput
      mode={getInputMode()}
      style={inputStyle}
      contentStyle={contentStyleFinal}
      outlineStyle={outlineStyleFinal}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
  },
  outline: {
    borderRadius: 12,
    borderWidth: 1,
  },
  // Tamaños
  small: {
    minHeight: 40,
  },
  smallContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  large: {
    minHeight: 56,
  },
  largeContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});
