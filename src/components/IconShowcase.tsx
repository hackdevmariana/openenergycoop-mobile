import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, useTheme, Surface, Divider } from 'react-native-paper';
import { EnergyIcon } from './ui/EnergyIcon';

export const IconShowcase: React.FC = () => {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.header} elevation={1}>
        <Text variant="headlineMedium" style={styles.title}>Catálogo de Iconos</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Iconos disponibles en OpenEnergyCoop</Text>
      </Surface>

      {/* Iconos de Energía */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>Iconos de Energía</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.iconGrid}>
            <View style={styles.iconItem}>
              <EnergyIcon type="energy" energyType="consumption" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Consumo</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="energy" energyType="production" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Producción</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="energy" energyType="efficiency" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Eficiencia</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="energy" energyType="neutral" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Neutral</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Iconos de Estado */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>Iconos de Estado</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.iconGrid}>
            <View style={styles.iconItem}>
              <EnergyIcon type="status" status="success" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Éxito</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="status" status="error" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Error</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="status" status="warning" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Advertencia</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="status" status="info" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Información</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="status" status="loading" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Cargando</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Iconos de Navegación */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>Iconos de Navegación</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.iconGrid}>
            <View style={styles.iconItem}>
              <EnergyIcon type="navigation" navigationIcon="home" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Inicio</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="navigation" navigationIcon="dashboard" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Dashboard</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="navigation" navigationIcon="profile" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Perfil</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="navigation" navigationIcon="settings" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Configuración</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="navigation" navigationIcon="notifications" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Notificaciones</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="navigation" navigationIcon="search" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Buscar</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Iconos de Usuario */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>Iconos de Usuario</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.iconGrid}>
            <View style={styles.iconItem}>
              <EnergyIcon type="user" userIcon="profile" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Perfil</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="user" userIcon="edit" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Editar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="user" userIcon="save" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Guardar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="user" userIcon="logout" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Cerrar Sesión</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="user" userIcon="settings" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Configuración</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Iconos de Acciones */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>Iconos de Acciones</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.iconGrid}>
            <View style={styles.iconItem}>
              <EnergyIcon type="action" actionIcon="add" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Agregar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="action" actionIcon="edit" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Editar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="action" actionIcon="delete" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Eliminar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="action" actionIcon="save" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Guardar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="action" actionIcon="refresh" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Actualizar</Text>
            </View>
            
            <View style={styles.iconItem}>
              <EnergyIcon type="action" actionIcon="share" size={32} />
              <Text variant="bodySmall" style={styles.iconLabel}>Compartir</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Iconos como Botones */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>Iconos como Botones</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.buttonRow}>
            <EnergyIcon
              type="action"
              actionIcon="add"
              size={32}
              onPress={() => console.log('Agregar presionado')}
            />
            
            <EnergyIcon
              type="action"
              actionIcon="edit"
              size={32}
              onPress={() => console.log('Editar presionado')}
            />
            
            <EnergyIcon
              type="action"
              actionIcon="delete"
              size={32}
              onPress={() => console.log('Eliminar presionado')}
            />
            
            <EnergyIcon
              type="status"
              status="success"
              size={32}
              onPress={() => console.log('Éxito presionado')}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  divider: {
    marginBottom: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  iconItem: {
    alignItems: 'center',
    marginBottom: 16,
    width: 80,
  },
  iconLabel: {
    marginTop: 8,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

