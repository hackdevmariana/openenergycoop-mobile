import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Switch } from 'react-native-paper';
import { Icon } from '../config/lucide';
import { useTheme } from '../hooks/useTheme';
import { ThemeMode } from '../config/theme';

const ThemeSelector: React.FC = () => {
  const {
    theme,
    themeMode,
    changeThemeMode,
    toggleTheme,
    isDarkMode,
    isLightMode,
    getColor,
    getShadow,
  } = useTheme();

  const themeOptions: { mode: ThemeMode; label: string; icon: string; description: string }[] = [
    {
      mode: 'light',
      label: 'Modo Claro',
      icon: 'sun',
      description: 'Tema claro para uso diurno',
    },
    {
      mode: 'dark',
      label: 'Modo Oscuro',
      icon: 'moon',
      description: 'Tema oscuro para uso nocturno',
    },
    {
      mode: 'system',
      label: 'Sistema',
      icon: 'settings',
      description: 'Seguir preferencia del sistema',
    },
  ];

  const handleThemeChange = async (mode: ThemeMode) => {
    await changeThemeMode(mode);
  };

  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing.md,
      backgroundColor: getColor('background'),
    },
    card: {
      backgroundColor: getColor('card'),
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
      ...getShadow('medium'),
    },
    cardContent: {
      padding: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      color: getColor('text'),
      marginBottom: theme.spacing.sm,
    },
    description: {
      fontSize: theme.typography.sizes.sm,
      color: getColor('textSecondary'),
      marginBottom: theme.spacing.md,
    },
    themeOptionsContainer: {
      gap: theme.spacing.sm,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      backgroundColor: getColor('surface'),
      borderRadius: theme.borderRadius.sm,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    themeOptionSelected: {
      borderColor: getColor('primary'),
      backgroundColor: getColor('primary') + '10',
    },
    themeOptionIcon: {
      marginRight: theme.spacing.md,
    },
    themeOptionContent: {
      flex: 1,
    },
    themeOptionLabel: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      color: getColor('text'),
      marginBottom: theme.spacing.xs,
    },
    themeOptionDescription: {
      fontSize: theme.typography.sizes.sm,
      color: getColor('textSecondary'),
    },
    quickToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: getColor('surface'),
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.md,
    },
    quickToggleLabel: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      color: getColor('text'),
    },
    quickToggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.sm,
      backgroundColor: getColor('primary'),
      borderRadius: theme.borderRadius.sm,
      ...getShadow('small'),
    },
    quickToggleButtonText: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: '#FFFFFF',
      marginLeft: theme.spacing.xs,
    },
    previewContainer: {
      padding: theme.spacing.md,
      backgroundColor: getColor('card'),
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.md,
      ...getShadow('small'),
    },
    previewTitle: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
      color: getColor('text'),
      marginBottom: theme.spacing.sm,
    },
    previewContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    previewText: {
      fontSize: theme.typography.sizes.sm,
      color: getColor('textSecondary'),
    },
    previewValue: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: getColor('primary'),
    },
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Title style={styles.title}>Configuración de Tema</Title>
          <Paragraph style={styles.description}>
            Personaliza la apariencia de la aplicación según tus preferencias
          </Paragraph>

          {/* Cambio rápido */}
          <View style={styles.quickToggleContainer}>
            <Text style={styles.quickToggleLabel}>Cambio Rápido</Text>
            <TouchableOpacity style={styles.quickToggleButton} onPress={toggleTheme}>
              <Icon 
                name={isDarkMode() ? 'sun' : 'moon'} 
                size={16} 
                color="#FFFFFF" 
              />
              <Text style={styles.quickToggleButtonText}>
                {isDarkMode() ? 'Claro' : 'Oscuro'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Opciones de tema */}
          <View style={styles.themeOptionsContainer}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.mode}
                style={[
                  styles.themeOption,
                  themeMode === option.mode && styles.themeOptionSelected,
                ]}
                onPress={() => handleThemeChange(option.mode)}
              >
                <View style={styles.themeOptionIcon}>
                  <Icon
                    name={option.icon as any}
                    size={24}
                    color={themeMode === option.mode ? getColor('primary') : getColor('textSecondary')}
                  />
                </View>
                <View style={styles.themeOptionContent}>
                  <Text style={styles.themeOptionLabel}>{option.label}</Text>
                  <Text style={styles.themeOptionDescription}>{option.description}</Text>
                </View>
                {themeMode === option.mode && (
                  <Icon name="check" size={20} color={getColor('primary')} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Vista previa */}
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Vista Previa</Text>
            <View style={styles.previewContent}>
              <Text style={styles.previewText}>Modo actual:</Text>
              <Text style={styles.previewValue}>
                {themeMode === 'system' 
                  ? `Sistema (${isDarkMode() ? 'Oscuro' : 'Claro'})`
                  : themeMode === 'dark' 
                    ? 'Oscuro' 
                    : 'Claro'
                }
              </Text>
            </View>
            <View style={styles.previewContent}>
              <Text style={styles.previewText}>Color de fondo:</Text>
              <Text style={styles.previewValue}>{getColor('background')}</Text>
            </View>
            <View style={styles.previewContent}>
              <Text style={styles.previewText}>Color de texto:</Text>
              <Text style={styles.previewValue}>{getColor('text')}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ThemeSelector;
