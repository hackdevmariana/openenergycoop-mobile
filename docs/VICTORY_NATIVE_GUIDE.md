# Victory Native - Guía Completa para Gráficos de Energía

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Integración con Temas](#integración-con-temas)
4. [Componentes de Gráficos](#componentes-de-gráficos)
5. [Tipos de Gráficos](#tipos-de-gráficos)
6. [Personalización](#personalización)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General

Victory Native es la mejor opción para gráficos de consumo de energía en React Native, proporcionando gráficos nativos, interactivos y optimizados que se integran perfectamente con nuestro sistema de temas.

### **¿Por qué Victory Native?**

#### **✅ Ventajas Principales**
- 🎯 **Nativo**: Optimizado específicamente para React Native
- 🎨 **Temas integrados**: Se adapta automáticamente a nuestro sistema de temas
- 📱 **Performance**: Renderizado nativo, no WebView
- 🔧 **Flexibilidad**: Altamente personalizable
- 📊 **Tipos de gráficos**: Líneas, barras, áreas, donut, scatter, etc.
- 🎮 **Interactividad**: Gestos táctiles nativos
- 📈 **Animaciones**: Transiciones suaves y fluidas
- 🌙 **Modo oscuro**: Soporte nativo para temas
- ⚡ **Energía**: Colores específicos para tipos de energía

#### **❌ Alternativas Menos Recomendadas**
- **Chart.js + WebView**: Lento, no nativo
- **D3.js**: Complejo, no optimizado para móvil
- **Recharts**: WebView, performance limitada
- **React Native SVG Charts**: Menos funcionalidades

## ⚙️ Instalación y Configuración

### 1. **Dependencias Instaladas**

```bash
npm install victory-native
npm install react-native-svg
```

### 2. **Configuración de Temas**

```typescript
// src/config/victoryTheme.ts
import { useTheme } from '../hooks/useTheme';
import { VictoryThemeDefinition } from 'victory-native';

export const useVictoryTheme = () => {
  const { getColor } = useTheme();
  
  const victoryTheme: VictoryThemeDefinition = {
    axis: {
      style: {
        axis: {
          fill: 'transparent',
          stroke: getColor('border'),
          strokeWidth: 1,
        },
        axisLabel: {
          fill: getColor('text'),
          fontSize: 12,
          fontFamily: 'System',
          fontWeight: '400',
        },
        grid: {
          fill: 'none',
          stroke: getColor('divider'),
          strokeWidth: 1,
          strokeDasharray: '5,5',
        },
        // ... más configuraciones
      },
    },
    // ... más temas
  };

  return victoryTheme;
};
```

### 3. **Colores de Energía**

```typescript
export const getEnergyColors = () => {
  const { getColor } = useTheme();
  
  return {
    solar: getColor('energy_solar') || '#FFD700',
    wind: getColor('energy_wind') || '#87CEEB',
    hydro: getColor('energy_hydro') || '#4169E1',
    battery: getColor('energy_battery') || '#32CD32',
    grid: getColor('energy_grid') || '#FF6347',
    nuclear: '#FF69B4',
    biomass: '#8B4513',
    geothermal: '#FF4500',
  };
};
```

## 🎨 Integración con Temas

### 1. **Hook Principal: useVictoryTheme**

```typescript
import { useVictoryTheme } from '../config/victoryTheme';

const MyChart = () => {
  const victoryTheme = useVictoryTheme();
  
  return (
    <VictoryChart theme={victoryTheme}>
      {/* Componentes del gráfico */}
    </VictoryChart>
  );
};
```

### 2. **Colores Dinámicos**

```typescript
const { getColor } = useTheme();
const energyColors = getEnergyColors();

<VictoryLine
  data={solarData}
  style={{
    data: {
      stroke: energyColors.solar,
      strokeWidth: 2,
    },
  }}
/>
```

### 3. **Temas Adaptativos**

```typescript
const victoryTheme = useVictoryTheme();
const isDarkMode = useTheme().isDarkMode();

// Los colores se adaptan automáticamente al tema
<VictoryChart
  theme={victoryTheme}
  style={{
    background: { fill: isDarkMode() ? '#1C1C1E' : '#FFFFFF' },
  }}
>
```

## 🧩 Componentes de Gráficos

### 1. **EnergyConsumptionChart**

Gráfico de líneas/áreas para consumo de energía:

```typescript
import EnergyConsumptionChart from '../components/charts/EnergyConsumptionChart';

const MyComponent = () => {
  const data = [
    { x: '00:00', y: 2.1, type: 'solar' },
    { x: '02:00', y: 1.8, type: 'solar' },
    { x: '04:00', y: 1.2, type: 'solar' },
    // ... más datos
  ];

  return (
    <EnergyConsumptionChart
      data={data}
      title="Consumo Diario de Energía"
      subtitle="Datos de las últimas 24 horas"
      showArea={true}
      showLegend={true}
      animate={true}
      interactive={true}
      height={350}
    />
  );
};
```

**Propiedades:**
- `data`: Array de puntos de datos
- `title`: Título del gráfico
- `subtitle`: Subtítulo descriptivo
- `showArea`: Mostrar área bajo la línea
- `showLegend`: Mostrar leyenda
- `animate`: Habilitar animaciones
- `interactive`: Habilitar tooltips
- `height`: Altura del gráfico

### 2. **EnergyComparisonChart**

Gráfico de barras para comparación:

```typescript
import EnergyComparisonChart from '../components/charts/EnergyComparisonChart';

const MyComponent = () => {
  const data = [
    { x: 'Lun', solar: 45.2, wind: 38.7, hydro: 12.3, total: 105.1 },
    { x: 'Mar', solar: 52.1, wind: 42.3, hydro: 15.6, total: 117.2 },
    // ... más datos
  ];

  return (
    <EnergyComparisonChart
      data={data}
      title="Comparación Semanal"
      subtitle="Consumo por tipo de energía"
      showLegend={true}
      animate={true}
      interactive={true}
      stacked={false}
      height={400}
    />
  );
};
```

**Propiedades:**
- `data`: Array de datos de comparación
- `stacked`: Barras apiladas o separadas
- `showLegend`: Mostrar leyenda
- `animate`: Habilitar animaciones
- `interactive`: Habilitar tooltips

### 3. **EnergyDistributionChart**

Gráfico de donut para distribución:

```typescript
import EnergyDistributionChart from '../components/charts/EnergyDistributionChart';

const MyComponent = () => {
  const data = [
    { x: 'Solar', y: 45.2, type: 'solar' },
    { x: 'Eólica', y: 38.7, type: 'wind' },
    { x: 'Hidroeléctrica', y: 12.3, type: 'hydro' },
    // ... más datos
  ];

  return (
    <EnergyDistributionChart
      data={data}
      title="Distribución de Energía"
      subtitle="Porcentaje por fuente de energía"
      showLabels={true}
      showTooltips={true}
      animate={true}
      height={350}
      innerRadius={60}
    />
  );
};
```

**Propiedades:**
- `data`: Array de datos de distribución
- `showLabels`: Mostrar etiquetas en el gráfico
- `showTooltips`: Mostrar tooltips al tocar
- `innerRadius`: Radio del agujero central
- `animate`: Habilitar animaciones

## 📊 Tipos de Gráficos

### 1. **Gráficos de Línea**

```typescript
<VictoryChart theme={victoryTheme}>
  <VictoryLine
    data={data}
    style={{
      data: {
        stroke: energyColors.solar,
        strokeWidth: 2,
      },
    }}
  />
</VictoryChart>
```

### 2. **Gráficos de Área**

```typescript
<VictoryArea
  data={data}
  style={{
    data: {
      fill: energyColors.solar,
      fillOpacity: 0.3,
      stroke: energyColors.solar,
      strokeWidth: 2,
    },
  }}
/>
```

### 3. **Gráficos de Barras**

```typescript
<VictoryBar
  data={data}
  style={{
    data: {
      fill: energyColors.solar,
      stroke: energyColors.solar,
      strokeWidth: 1,
    },
  }}
/>
```

### 4. **Gráficos de Donut**

```typescript
<VictoryPie
  data={data}
  innerRadius={60}
  colorScale={data.map(d => d.fill)}
  labelComponent={<VictoryLabel />}
/>
```

### 5. **Gráficos de Scatter**

```typescript
<VictoryScatter
  data={data}
  style={{
    data: {
      fill: energyColors.solar,
      stroke: energyColors.solar,
      strokeWidth: 1,
    },
  }}
/>
```

## 🎨 Personalización

### 1. **Estilos Personalizados**

```typescript
const customStyle = {
  data: {
    fill: energyColors.solar,
    stroke: energyColors.solar,
    strokeWidth: 2,
    fillOpacity: 0.3,
  },
  labels: {
    fill: getColor('text'),
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '400',
  },
};

<VictoryLine data={data} style={customStyle} />
```

### 2. **Animaciones Personalizadas**

```typescript
const animationConfig = {
  duration: 1000,
  easing: 'bounce',
  onLoad: {
    duration: 500,
    easing: 'bounce',
  },
};

<VictoryChart animate={animationConfig}>
  {/* Componentes */}
</VictoryChart>
```

### 3. **Tooltips Personalizados**

```typescript
const tooltipConfig = {
  flyoutStyle: {
    fill: 'rgba(255, 255, 255, 0.9)',
    stroke: '#ccc',
    strokeWidth: 1,
  },
  labelStyle: {
    fill: '#333',
    fontSize: 12,
  },
};

<VictoryTooltip {...tooltipConfig} />
```

### 4. **Leyendas Personalizadas**

```typescript
const legendData = [
  { name: 'Solar', symbol: { fill: energyColors.solar } },
  { name: 'Eólica', symbol: { fill: energyColors.wind } },
  { name: 'Hidroeléctrica', symbol: { fill: energyColors.hydro } },
];

<VictoryLegend
  data={legendData}
  orientation="horizontal"
  gutter={20}
  style={{
    labels: {
      fill: getColor('text'),
      fontSize: 12,
    },
  }}
/>
```

## ✅ Mejores Prácticas

### 1. **Performance**

```typescript
// ✅ Correcto - Usar useMemo para datos costosos
const processedData = useMemo(() => {
  return data.map(item => ({
    ...item,
    fill: energyColors[item.type] || '#999',
  }));
}, [data, energyColors]);

// ❌ Incorrecto - Procesar en cada render
const processedData = data.map(item => ({
  ...item,
  fill: energyColors[item.type] || '#999',
}));
```

### 2. **Responsividad**

```typescript
// ✅ Correcto - Usar Dimensions
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

<VictoryChart
  width={width - 40}
  height={300}
  responsive={true}
>
```

### 3. **Temas Dinámicos**

```typescript
// ✅ Correcto - Usar hook de tema
const victoryTheme = useVictoryTheme();

<VictoryChart theme={victoryTheme}>
  {/* Componentes */}
</VictoryChart>

// ❌ Incorrecto - Tema hardcodeado
<VictoryChart theme={VictoryTheme.material}>
  {/* Componentes */}
</VictoryChart>
```

### 4. **Datos Estructurados**

```typescript
// ✅ Correcto - Estructura consistente
interface EnergyDataPoint {
  x: string | number;
  y: number;
  type: 'solar' | 'wind' | 'hydro' | 'battery' | 'grid' | 'total';
  label?: string;
}

// ❌ Incorrecto - Estructura inconsistente
const data = [
  { time: '00:00', value: 2.1, source: 'solar' },
  { hour: '02:00', consumption: 1.8, energy: 'wind' },
];
```

### 5. **Accesibilidad**

```typescript
// ✅ Correcto - Etiquetas descriptivas
<VictoryChart
  ariaLabel="Gráfico de consumo de energía solar"
  ariaDescribedBy="energy-chart-description"
>
  {/* Componentes */}
</VictoryChart>

<Text id="energy-chart-description">
  Gráfico que muestra el consumo de energía solar durante las últimas 24 horas
</Text>
```

## 🔧 Solución de Problemas

### 1. **Gráficos no se renderizan**

**Problema:** Los gráficos no aparecen en pantalla

**Solución:**
```bash
# Verificar instalación de react-native-svg
npm install react-native-svg

# Limpiar cache
npx react-native start --reset-cache

# Verificar importaciones
import { VictoryChart, VictoryLine } from 'victory-native';
```

### 2. **Temas no cambian**

**Problema:** Los colores no se adaptan al tema

**Solución:**
```typescript
// Verificar que se está usando useVictoryTheme
const victoryTheme = useVictoryTheme();

<VictoryChart theme={victoryTheme}>
  {/* Componentes */}
</VictoryChart>
```

### 3. **Performance lenta**

**Problema:** Los gráficos se vuelven lentos con muchos datos

**Solución:**
```typescript
// Usar useMemo para datos costosos
const processedData = useMemo(() => {
  return data.map(item => ({
    ...item,
    fill: energyColors[item.type] || '#999',
  }));
}, [data, energyColors]);

// Limitar datos mostrados
const limitedData = data.slice(-50); // Últimos 50 puntos
```

### 4. **Tooltips no funcionan**

**Problema:** Los tooltips no aparecen al tocar

**Solución:**
```typescript
// Verificar configuración de containerComponent
<VictoryChart
  containerComponent={
    <VictoryVoronoiContainer
      labels={({ datum }) => `${datum.y} kWh`}
      labelComponent={<VictoryTooltip />}
    />
  }
>
  {/* Componentes */}
</VictoryChart>
```

### 5. **Animaciones no funcionan**

**Problema:** Las animaciones no se ejecutan

**Solución:**
```typescript
// Verificar configuración de animate
<VictoryChart
  animate={{
    duration: 1000,
    easing: 'bounce',
  }}
>
  {/* Componentes */}
</VictoryChart>
```

## 📚 Ejemplos de Uso

### 1. **Dashboard de Energía**

```typescript
const EnergyDashboard = () => {
  const { themedClasses } = useTheme();
  
  return (
    <ScrollView className={themedClasses.container}>
      <View className="p-4">
        {/* Consumo diario */}
        <EnergyConsumptionChart
          data={dailyData}
          title="Consumo Diario"
          height={300}
        />
        
        {/* Comparación semanal */}
        <EnergyComparisonChart
          data={weeklyData}
          title="Comparación Semanal"
          height={350}
        />
        
        {/* Distribución */}
        <EnergyDistributionChart
          data={distributionData}
          title="Distribución"
          height={300}
        />
      </View>
    </ScrollView>
  );
};
```

### 2. **Gráfico en Tiempo Real**

```typescript
const RealTimeChart = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        x: new Date().toLocaleTimeString(),
        y: Math.random() * 10,
        type: 'solar',
      };
      
      setData(prev => [...prev.slice(-20), newPoint]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <EnergyConsumptionChart
      data={data}
      title="Consumo en Tiempo Real"
      animate={false}
      height={250}
    />
  );
};
```

### 3. **Gráfico Interactivo**

```typescript
const InteractiveChart = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  return (
    <View>
      <EnergyConsumptionChart
        data={data}
        title="Gráfico Interactivo"
        interactive={true}
        onDataPointClick={(point) => setSelectedPoint(point)}
      />
      
      {selectedPoint && (
        <View className="mt-4 p-4 bg-surface rounded-md">
          <Text className="text-lg font-bold">
            Punto seleccionado: {selectedPoint.y} kWh
          </Text>
          <Text className="text-sm">
            Hora: {selectedPoint.x}
          </Text>
        </View>
      )}
    </View>
  );
};
```

## 🎉 Conclusión

Victory Native proporciona:

- ✅ **Gráficos nativos** optimizados para React Native
- ✅ **Integración perfecta** con sistema de temas
- ✅ **Performance optimizada** para móviles
- ✅ **Interactividad completa** con gestos táctiles
- ✅ **Animaciones fluidas** y personalizables
- ✅ **Colores específicos** para energía
- ✅ **Tipos de gráficos** variados y flexibles
- ✅ **Documentación completa** para desarrolladores

El sistema está completamente integrado y listo para usar, proporcionando una experiencia de visualización de datos moderna y eficiente para aplicaciones de energía. 🚀
