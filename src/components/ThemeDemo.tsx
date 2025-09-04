import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Switch } from 'react-native-paper';
import { Icon } from '../config/lucide';
import { useTheme, useEnergyColors, useGradients, useTextStyles, useComponentStyles } from '../hooks/useTheme';

const ThemeDemo: React.FC = () => {
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

  const energyColors = useEnergyColors();
  const gradients = useGradients();
  const textStyles = useTextStyles();
  const componentStyles = useComponentStyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getColor('background'),
    },
    scrollContent: {
      padding: theme.spacing.md,
    },
    section: {
      marginBottom: theme.spacing.xl,
    },
    sectionTitle: {
      fontSize: theme.typography.sizes.xxl,
      fontWeight: theme.typography.weights.bold,
      color: getColor('text'),
      marginBottom: theme.spacing.md,
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
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    colorItem: {
      alignItems: 'center',
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: getColor('surface'),
      minWidth: 80,
    },
    colorSwatch: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.xs,
      marginBottom: theme.spacing.xs,
    },
    colorLabel: {
      fontSize: theme.typography.sizes.xs,
      color: getColor('textSecondary'),
      textAlign: 'center',
    },
    energyCard: {
      backgroundColor: getColor('card'),
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      ...getShadow('small'),
    },
    energyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    energyIcon: {
      marginRight: theme.spacing.sm,
    },
    energyTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold,
      color: getColor('text'),
    },
    energyValue: {
      fontSize: theme.typography.sizes.md,
      color: getColor('textSecondary'),
    },
    gradientContainer: {
      height: 60,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradientText: {
      color: '#FFFFFF',
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
    },
    textExample: {
      marginBottom: theme.spacing.sm,
    },
    componentExample: {
      marginBottom: theme.spacing.md,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    themeToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: getColor('surface'),
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
    },
    themeToggleLabel: {
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium,
      color: getColor('text'),
    },
    themeToggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.sm,
      backgroundColor: getColor('primary'),
      borderRadius: theme.borderRadius.sm,
      ...getShadow('small'),
    },
    themeToggleText: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      color: '#FFFFFF',
      marginLeft: theme.spacing.xs,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Información del tema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del Tema</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={textStyles.h2}>Configuración Actual</Title>
            <Paragraph style={textStyles.bodySmall}>
              Modo: {themeMode === 'system' ? `Sistema (${isDarkMode() ? 'Oscuro' : 'Claro'})` : themeMode}
            </Paragraph>
            <Paragraph style={textStyles.bodySmall}>
              Esquema efectivo: {isDarkMode() ? 'Oscuro' : 'Claro'}
            </Paragraph>
            
            <View style={styles.themeToggleContainer}>
              <Text style={styles.themeToggleLabel}>Cambio Rápido</Text>
              <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
                <Icon 
                  name={isDarkMode() ? 'sun' : 'moon'} 
                  size={16} 
                  color="#FFFFFF" 
                />
                <Text style={styles.themeToggleText}>
                  {isDarkMode() ? 'Claro' : 'Oscuro'}
                </Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Colores del tema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colores del Tema</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={textStyles.h3}>Colores Principales</Title>
            <View style={styles.colorGrid}>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('primary') }]} />
                <Text style={styles.colorLabel}>Primary</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('secondary') }]} />
                <Text style={styles.colorLabel}>Secondary</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('accent') }]} />
                <Text style={styles.colorLabel}>Accent</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('success') }]} />
                <Text style={styles.colorLabel}>Success</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('error') }]} />
                <Text style={styles.colorLabel}>Error</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('warning') }]} />
                <Text style={styles.colorLabel}>Warning</Text>
              </View>
            </View>

            <Title style={textStyles.h3}>Colores de Fondo</Title>
            <View style={styles.colorGrid}>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('background') }]} />
                <Text style={styles.colorLabel}>Background</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('surface') }]} />
                <Text style={styles.colorLabel}>Surface</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('card') }]} />
                <Text style={styles.colorLabel}>Card</Text>
              </View>
            </View>

            <Title style={textStyles.h3}>Colores de Texto</Title>
            <View style={styles.colorGrid}>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('text') }]} />
                <Text style={styles.colorLabel}>Text</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('textSecondary') }]} />
                <Text style={styles.colorLabel}>Secondary</Text>
              </View>
              <View style={styles.colorItem}>
                <View style={[styles.colorSwatch, { backgroundColor: getColor('textTertiary') }]} />
                <Text style={styles.colorLabel}>Tertiary</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Colores de energía */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colores de Energía</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.energyCard}>
              <View style={styles.energyHeader}>
                <Icon name="sun" size={24} color={energyColors.solar} style={styles.energyIcon} />
                <Text style={styles.energyTitle}>Energía Solar</Text>
              </View>
              <Text style={styles.energyValue}>2.4 kW • Color: {energyColors.solar}</Text>
            </View>

            <View style={styles.energyCard}>
              <View style={styles.energyHeader}>
                <Icon name="wind" size={24} color={energyColors.wind} style={styles.energyIcon} />
                <Text style={styles.energyTitle}>Energía Eólica</Text>
              </View>
              <Text style={styles.energyValue}>1.8 kW • Color: {energyColors.wind}</Text>
            </View>

            <View style={styles.energyCard}>
              <View style={styles.energyHeader}>
                <Icon name="battery" size={24} color={energyColors.battery} style={styles.energyIcon} />
                <Text style={styles.energyTitle}>Batería</Text>
              </View>
              <Text style={styles.energyValue}>85% • Color: {energyColors.battery}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Gradientes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gradientes</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={[styles.gradientContainer, { backgroundColor: gradients.primary[0] }]}>
              <Text style={styles.gradientText}>Gradiente Primario</Text>
            </View>
            <View style={[styles.gradientContainer, { backgroundColor: gradients.energy[0] }]}>
              <Text style={styles.gradientText}>Gradiente Energía</Text>
            </View>
            <View style={[styles.gradientContainer, { backgroundColor: gradients.success[0] }]}>
              <Text style={styles.gradientText}>Gradiente Éxito</Text>
            </View>
            <View style={[styles.gradientContainer, { backgroundColor: gradients.error[0] }]}>
              <Text style={styles.gradientText}>Gradiente Error</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Tipografía */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipografía</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={[textStyles.h1, styles.textExample]}>Título H1 - Tamaño Grande</Text>
            <Text style={[textStyles.h2, styles.textExample]}>Título H2 - Tamaño Mediano</Text>
            <Text style={[textStyles.h3, styles.textExample]}>Título H3 - Tamaño Pequeño</Text>
            <Text style={[textStyles.body, styles.textExample]}>Texto de cuerpo - Tamaño normal</Text>
            <Text style={[textStyles.bodySmall, styles.textExample]}>Texto pequeño - Información secundaria</Text>
            <Text style={[textStyles.caption, styles.textExample]}>Texto caption - Información adicional</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Componentes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Componentes</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={textStyles.h3}>Botones</Title>
            <View style={styles.buttonRow}>
              <Button mode="contained" style={componentStyles.button.primary}>
                Botón Primario
              </Button>
              <Button mode="outlined" style={componentStyles.button.secondary}>
                Botón Secundario
              </Button>
            </View>

            <Title style={textStyles.h3}>Input</Title>
            <TextInput
              label="Campo de texto"
              mode="outlined"
              style={componentStyles.input}
              placeholder="Escribe algo aquí..."
            />

            <Title style={textStyles.h3}>Divider</Title>
            <View style={componentStyles.divider} />
          </Card.Content>
        </Card>
      </View>

      {/* Sombras */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sombras</Text>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={[styles.energyCard, getShadow('small')]}>
              <Text style={styles.energyTitle}>Sombra Pequeña</Text>
            </View>
            <View style={[styles.energyCard, getShadow('medium')]}>
              <Text style={styles.energyTitle}>Sombra Mediana</Text>
            </View>
            <View style={[styles.energyCard, getShadow('large')]}>
              <Text style={styles.energyTitle}>Sombra Grande</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default ThemeDemo;
