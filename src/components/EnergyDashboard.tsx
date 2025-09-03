import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  useTheme, 
  Surface,
  Chip,
  Divider,
  FAB,
} from 'react-native-paper';
import { EnergyCard, EnergyButton, EnergyTextInput, EnergyIcon } from './ui';
import { useDashboardStats } from '../hooks/useDashboard';
import { useEnergyStore } from '../stores/energyStore';
import { useAppStore } from '../stores/appStore';

const FABIcon = () => (
  <EnergyIcon
    type="action"
    actionIcon="add"
    size={24}
    color="white"
  />
);

export const EnergyDashboard: React.FC = () => {
  const theme = useTheme();
  const { data: stats, isLoading, error, refetch } = useDashboardStats();
  const { setFilters } = useEnergyStore();
  const { addNotification } = useAppStore();

  const handleRefresh = () => {
    refetch();
    addNotification({
      type: 'info',
      title: 'Actualizando datos',
      message: 'Los datos del dashboard se están actualizando...',
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters({ [filterType]: value });
    addNotification({
      type: 'success',
      title: 'Filtro aplicado',
      message: `Filtro ${filterType} actualizado`,
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
          Cargando dashboard...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineMedium" style={{ color: theme.colors.error }}>
          Error al cargar datos
        </Text>
        <EnergyButton onPress={handleRefresh}>
          Reintentar
        </EnergyButton>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.headerContent}>
            <View>
              <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
                Dashboard de Energía
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Monitoreo en tiempo real
              </Text>
            </View>
            <EnergyIcon 
              type="energy"
              energyType="production"
              size={48}
              color={theme.colors.primary}
            />
          </View>
          
          <View style={styles.headerActions}>
            <EnergyIcon
              type="action"
              actionIcon="refresh"
              size={24}
              onPress={handleRefresh}
              color={theme.colors.primary}
            />
            <EnergyIcon
              type="action"
              actionIcon="edit"
              size={24}
              onPress={() => {}}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        </Surface>

        {/* Filtros */}
        <Card style={[styles.filterCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 12 }}>
              Filtros
            </Text>
            <View style={styles.filterRow}>
              <Chip
                selected
                onPress={() => handleFilterChange('location', 'madrid')}
                style={{ marginRight: 8 }}
              >
                Madrid
              </Chip>
              <Chip
                onPress={() => handleFilterChange('location', 'barcelona')}
                style={{ marginRight: 8 }}
              >
                Barcelona
              </Chip>
              <Chip
                onPress={() => handleFilterChange('location', 'valencia')}
              >
                Valencia
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Tarjetas de energía */}
        <EnergyCard
          title="Consumo Actual"
          value={stats?.totalEnergyConsumption || 0}
          unit="kWh"
          subtitle="Última hora"
          type="consumption"
          trend={{ value: 5.2, isPositive: false }}
          onPress={() => {}}
        />

        <EnergyCard
          title="Producción Solar"
          value={stats?.totalEnergyProduction || 0}
          unit="kWh"
          subtitle="Panel solar principal"
          type="production"
          trend={{ value: 12.8, isPositive: true }}
          onPress={() => {}}
        />

        <EnergyCard
          title="Eficiencia"
          value={stats?.averageEfficiency || 0}
          unit="%"
          subtitle="Ratio producción/consumo"
          type="efficiency"
          trend={{ value: 3.1, isPositive: true }}
          onPress={() => {}}
        />

        {/* Formulario de ejemplo */}
        <Card style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
              Agregar Lectura
            </Text>
            
            <EnergyTextInput
              label="Consumo (kWh)"
              placeholder="Ingresa el consumo"
              keyboardType="numeric"
              energyType="consumption"
              style={{ marginBottom: 12 }}
            />
            
            <EnergyTextInput
              label="Producción (kWh)"
              placeholder="Ingresa la producción"
              keyboardType="numeric"
              energyType="production"
              style={{ marginBottom: 16 }}
            />
            
            <View style={styles.buttonRow}>
              <EnergyButton
                variant="outline"
                energyType="neutral"
                onPress={() => {}}
                style={{ flex: 1, marginRight: 8 }}
              >
                Cancelar
              </EnergyButton>
              <EnergyButton
                variant="primary"
                energyType="production"
                onPress={() => {
                  addNotification({
                    type: 'success',
                    title: 'Lectura guardada',
                    message: 'Los datos se han guardado correctamente',
                  });
                }}
                style={{ flex: 1 }}
              >
                Guardar
              </EnergyButton>
            </View>
          </Card.Content>
        </Card>

        {/* Estadísticas adicionales */}
        <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
              Estadísticas del Mes
            </Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                  {stats?.totalEnergyConsumption || 0}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Consumo Total
                </Text>
              </View>
              
              <Divider style={{ height: 40 }} />
              
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={{ color: theme.colors.secondary }}>
                  {stats?.totalEnergyProduction || 0}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Producción Total
                </Text>
              </View>
              
              <Divider style={{ height: 40 }} />
              
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={{ color: theme.colors.tertiary }}>
                  {Math.round((stats?.totalEnergyProduction || 0) * 0.15)}€
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Ahorro
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* FAB */}
      <FAB
        icon={FABIcon}
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => {
          addNotification({
            type: 'info',
            title: 'Nueva lectura',
            message: 'Funcionalidad en desarrollo',
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  formCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statsCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
