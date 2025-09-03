import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { energyColors } from '../../theme';

interface EnergyCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  type?: 'consumption' | 'production' | 'efficiency' | 'neutral';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onPress?: () => void;
}

export const EnergyCard: React.FC<EnergyCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  type = 'neutral',
  trend,
  onPress,
}) => {
  const theme = useTheme();
  
  const getTypeColor = () => {
    switch (type) {
      case 'consumption':
        return energyColors.consumption;
      case 'production':
        return energyColors.production;
      case 'efficiency':
        return energyColors.efficiency;
      default:
        return energyColors.neutral;
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend.isPositive ? '↗' : '↘';
  };

  const getTrendColor = () => {
    if (!trend) return theme.colors.onSurfaceVariant;
    return trend.isPositive ? energyColors.production : energyColors.consumption;
  };

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
            {title}
          </Text>
          {trend && (
            <View style={styles.trendContainer}>
              <Text style={[styles.trendIcon, { color: getTrendColor() }]}>
                {getTrendIcon()}
              </Text>
              <Text style={[styles.trendValue, { color: getTrendColor() }]}>
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.valueContainer}>
          <Text 
            variant="headlineMedium" 
            style={[
              styles.value, 
              { 
                color: getTypeColor(),
                fontWeight: 'bold' as const,
              }
            ]}
          >
            {value}
          </Text>
          {unit && (
            <Text 
              variant="bodyMedium" 
              style={[styles.unit, { color: theme.colors.onSurfaceVariant }]}
            >
              {unit}
            </Text>
          )}
        </View>
        
        {subtitle && (
          <Text 
            variant="bodySmall" 
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            {subtitle}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trendValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  value: {
    marginRight: 8,
  },
  unit: {
    fontSize: 16,
  },
  subtitle: {
    marginTop: 4,
  },
});
