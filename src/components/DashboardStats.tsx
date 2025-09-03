import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDashboardStats } from '../hooks/useDashboard';

interface DashboardStatsProps {
  onRefresh?: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ onRefresh }) => {
  const { data: stats, isLoading, error, refetch } = useDashboardStats();

  const handleRefresh = () => {
    refetch();
    onRefresh?.();
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando estadísticas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error al cargar estadísticas</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay estadísticas disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Resumen de la cooperativa</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Usuarios Totales"
          value={stats.totalUsers.toString()}
          subtitle="Miembros activos"
          color="#007AFF"
        />
        <StatCard
          title="Consumo Total"
          value={`${stats.totalEnergyConsumption.toLocaleString()} kWh`}
          subtitle="Energía consumida"
          color="#FF9500"
        />
        <StatCard
          title="Producción Total"
          value={`${stats.totalEnergyProduction.toLocaleString()} kWh`}
          subtitle="Energía producida"
          color="#34C759"
        />
        <StatCard
          title="Eficiencia Promedio"
          value={`${stats.averageEfficiency.toFixed(1)}%`}
          subtitle="Rendimiento general"
          color="#AF52DE"
        />
        <StatCard
          title="Crecimiento Mensual"
          value={`${stats.monthlyGrowth > 0 ? '+' : ''}${stats.monthlyGrowth.toFixed(1)}%`}
          subtitle="Comparado al mes anterior"
          color={stats.monthlyGrowth >= 0 ? "#34C759" : "#FF3B30"}
        />
        <StatCard
          title="Usuarios Activos"
          value={stats.activeUsers.toString()}
          subtitle="En línea ahora"
          color="#5856D6"
        />
      </View>
    </ScrollView>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statSubtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  statsGrid: {
    padding: 16,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
