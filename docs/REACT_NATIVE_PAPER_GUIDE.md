# Guía de React Native Paper en OpenEnergyCoop Mobile

## ¿Qué es React Native Paper?

React Native Paper es una biblioteca de componentes de Material Design para React Native. Proporciona componentes de UI modernos, accesibles y personalizables que siguen las directrices de Material Design 3.

## Características Principales

- **Material Design 3**: Componentes que siguen las últimas directrices de Material Design
- **Temas Personalizables**: Soporte completo para temas claros y oscuros
- **Accesibilidad**: Componentes optimizados para accesibilidad
- **TypeScript**: Soporte nativo con tipado completo
- **Iconos**: Integración con react-native-vector-icons
- **Animaciones**: Animaciones fluidas y naturales

## Configuración

### 1. Dependencias Instaladas

```json
{
  "dependencies": {
    "react-native-paper": "^5.0.0",
    "react-native-safe-area-context": "^5.5.2",
    "react-native-vector-icons": "^10.0.0"
  }
}
```

### 2. Proveedor Configurado

```typescript
// src/providers/PaperProvider.tsx
import { PaperProvider } from 'react-native-paper';
import { useTheme } from '../theme';

export const PaperProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  
  return (
    <RNPaperProvider 
      theme={theme}
      settings={{
        rippleEffectEnabled: true,
      }}
    >
      {children}
    </RNPaperProvider>
  );
};
```

## Estructura de Archivos

```
src/
├── theme/
│   └── index.ts                    # Configuración de temas
├── providers/
│   └── PaperProvider.tsx          # Proveedor de Paper
├── components/
│   ├── ui/
│   │   ├── EnergyCard.tsx         # Tarjeta personalizada
│   │   ├── EnergyButton.tsx       # Botón personalizado
│   │   ├── EnergyTextInput.tsx    # Input personalizado
│   │   └── index.ts               # Exportaciones
│   └── EnergyDashboard.tsx        # Ejemplo de uso
└── App.tsx                        # Configuración principal
```

## Temas Personalizados

### 1. Configuración de Tema

```typescript
// src/theme/index.ts
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const colors = {
  primary: {
    light: '#007AFF', // Azul iOS
    dark: '#0A84FF',
  },
  secondary: {
    light: '#34C759', // Verde para energía
    dark: '#30D158',
  },
  // ... más colores
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.light,
    secondary: colors.secondary.light,
    // ... más configuraciones
  },
  roundness: 12,
};
```

### 2. Hook de Tema

```typescript
export const useTheme = () => {
  const currentTheme = useAppStore((state) => state.currentTheme);
  const isDark = currentTheme === 'dark';
  
  return isDark ? darkTheme : lightTheme;
};
```

## Componentes Personalizados

### 1. EnergyCard

```typescript
interface EnergyCardProps {
  title: string;
  value: string | number;
  unit?: string;
  type?: 'consumption' | 'production' | 'efficiency' | 'neutral';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const EnergyCard: React.FC<EnergyCardProps> = ({
  title,
  value,
  unit,
  type = 'neutral',
  trend,
}) => {
  const theme = useTheme();
  
  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="headlineMedium" style={{ color: getTypeColor() }}>
          {value} {unit}
        </Text>
      </Card.Content>
    </Card>
  );
};
```

### 2. EnergyButton

```typescript
interface EnergyButtonProps extends Omit<ButtonProps, 'mode'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  energyType?: 'consumption' | 'production' | 'efficiency' | 'neutral';
}

export const EnergyButton: React.FC<EnergyButtonProps> = ({
  variant = 'primary',
  energyType = 'neutral',
  ...props
}) => {
  const getButtonMode = () => {
    switch (variant) {
      case 'outline': return 'outlined';
      case 'text': return 'text';
      default: return 'contained';
    }
  };

  return (
    <Button
      mode={getButtonMode()}
      style={getButtonStyle()}
      {...props}
    />
  );
};
```

### 3. EnergyTextInput

```typescript
interface EnergyTextInputProps extends Omit<TextInputProps, 'mode'> {
  variant?: 'outlined' | 'flat';
  energyType?: 'consumption' | 'production' | 'efficiency' | 'neutral';
}

export const EnergyTextInput: React.FC<EnergyTextInputProps> = ({
  variant = 'outlined',
  energyType = 'neutral',
  ...props
}) => {
  return (
    <TextInput
      mode={variant}
      style={getInputStyle()}
      {...props}
    />
  );
};
```

## Uso Básico

### 1. Componentes Básicos

```typescript
import { Text, Button, Card, TextInput } from 'react-native-paper';

function MyComponent() {
  return (
    <Card>
      <Card.Content>
        <Text variant="headlineMedium">Título</Text>
        <TextInput label="Email" />
        <Button mode="contained" onPress={() => {}}>
          Enviar
        </Button>
      </Card.Content>
    </Card>
  );
}
```

### 2. Componentes Personalizados

```typescript
import { EnergyCard, EnergyButton, EnergyTextInput } from './ui';

function Dashboard() {
  return (
    <View>
      <EnergyCard
        title="Consumo Actual"
        value={150}
        unit="kWh"
        type="consumption"
        trend={{ value: 5.2, isPositive: false }}
      />
      
      <EnergyButton
        variant="primary"
        energyType="production"
        onPress={() => {}}
      >
        Agregar Lectura
      </EnergyButton>
      
      <EnergyTextInput
        label="Consumo (kWh)"
        energyType="consumption"
        keyboardType="numeric"
      />
    </View>
  );
}
```

## Colores de Energía

### 1. Paleta de Colores

```typescript
export const energyColors = {
  consumption: '#FF9500',  // Naranja para consumo
  production: '#34C759',   // Verde para producción
  efficiency: '#AF52DE',   // Púrpura para eficiencia
  neutral: '#8E8E93',      // Gris neutro
};
```

### 2. Uso en Componentes

```typescript
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
```

## Variantes de Componentes

### 1. Botones

```typescript
// Variantes disponibles
<EnergyButton variant="primary">Primario</EnergyButton>
<EnergyButton variant="secondary">Secundario</EnergyButton>
<EnergyButton variant="outline">Outline</EnergyButton>
<EnergyButton variant="text">Texto</EnergyButton>

// Tamaños
<EnergyButton size="small">Pequeño</EnergyButton>
<EnergyButton size="medium">Mediano</EnergyButton>
<EnergyButton size="large">Grande</EnergyButton>

// Tipos de energía
<EnergyButton energyType="consumption">Consumo</EnergyButton>
<EnergyButton energyType="production">Producción</EnergyButton>
<EnergyButton energyType="efficiency">Eficiencia</EnergyButton>
```

### 2. Inputs

```typescript
// Variantes
<EnergyTextInput variant="outlined" label="Outlined" />
<EnergyTextInput variant="flat" label="Flat" />

// Tamaños
<EnergyTextInput size="small" label="Pequeño" />
<EnergyTextInput size="medium" label="Mediano" />
<EnergyTextInput size="large" label="Grande" />

// Tipos de energía
<EnergyTextInput energyType="consumption" label="Consumo" />
<EnergyTextInput energyType="production" label="Producción" />
```

### 3. Tarjetas

```typescript
// Tipos de energía
<EnergyCard type="consumption" title="Consumo" value={100} />
<EnergyCard type="production" title="Producción" value={80} />
<EnergyCard type="efficiency" title="Eficiencia" value={85} />

// Con tendencias
<EnergyCard 
  type="consumption"
  title="Consumo"
  value={100}
  trend={{ value: 5.2, isPositive: false }}
/>
```

## Integración con Zustand

### 1. Tema Dinámico

```typescript
// El tema se actualiza automáticamente cuando cambia en Zustand
const theme = useTheme(); // Usa el tema del store
const { setTheme } = useAppStore();

// Cambiar tema
setTheme('dark');
```

### 2. Notificaciones

```typescript
import { Snackbar } from 'react-native-paper';
import { useAppStore } from '../stores/appStore';

function MyComponent() {
  const { notifications, addNotification } = useAppStore();
  
  return (
    <>
      <Button onPress={() => addNotification({
        type: 'success',
        title: 'Éxito',
        message: 'Operación completada',
      })}>
        Mostrar Notificación
      </Button>
      
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          visible={true}
          onDismiss={() => {}}
        >
          {notification.message}
        </Snackbar>
      ))}
    </>
  );
}
```

## Componentes Avanzados

### 1. FAB (Floating Action Button)

```typescript
import { FAB } from 'react-native-paper';

<FAB
  icon="plus"
  style={[styles.fab, { backgroundColor: theme.colors.primary }]}
  onPress={() => {}}
/>
```

### 2. Chips

```typescript
import { Chip } from 'react-native-paper';

<Chip
  selected
  onPress={() => {}}
  style={{ marginRight: 8 }}
>
  Madrid
</Chip>
```

### 3. Avatar

```typescript
import { Avatar } from 'react-native-paper';

<Avatar.Icon 
  size={48} 
  icon="lightning-bolt" 
  style={{ backgroundColor: theme.colors.primary }}
/>
```

### 4. IconButton

```typescript
import { IconButton } from 'react-native-paper';

<IconButton
  icon="refresh"
  size={24}
  onPress={() => {}}
  iconColor={theme.colors.primary}
/>
```

## Mejores Prácticas

### 1. Uso de Temas

```typescript
// ✅ Correcto: Usar el hook de tema
const theme = useTheme();
<Text style={{ color: theme.colors.onSurface }}>Texto</Text>

// ❌ Incorrecto: Colores hardcodeados
<Text style={{ color: '#000000' }}>Texto</Text>
```

### 2. Componentes Personalizados

```typescript
// ✅ Correcto: Usar componentes personalizados
<EnergyButton energyType="production" onPress={() => {}}>
  Guardar
</EnergyButton>

// ❌ Incorrecto: Usar componentes básicos sin personalización
<Button mode="contained" onPress={() => {}}>
  Guardar
</Button>
```

### 3. Accesibilidad

```typescript
// ✅ Correcto: Incluir props de accesibilidad
<EnergyButton
  accessibilityLabel="Botón para guardar datos"
  accessibilityHint="Guarda los datos de energía"
  onPress={() => {}}
>
  Guardar
</EnergyButton>
```

### 4. Responsive Design

```typescript
// ✅ Correcto: Usar tamaños relativos
const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
  },
});

// ❌ Incorrecto: Tamaños fijos
const styles = StyleSheet.create({
  container: {
    padding: 100,
    marginHorizontal: 50,
  },
});
```

## Debugging

### 1. DevTools

```typescript
// Habilitar DevTools para debugging
import { enableScreens } from 'react-native-screens';

if (__DEV__) {
  enableScreens(false);
}
```

### 2. Logs de Tema

```typescript
const theme = useTheme();
console.log('Current theme:', theme.colors);
```

## Migración desde Componentes Nativos

### 1. Desde TouchableOpacity

```typescript
// Antes
<TouchableOpacity onPress={() => {}}>
  <Text>Botón</Text>
</TouchableOpacity>

// Después
<EnergyButton onPress={() => {}}>
  Botón
</EnergyButton>
```

### 2. Desde TextInput

```typescript
// Antes
<TextInput
  style={styles.input}
  placeholder="Email"
/>

// Después
<EnergyTextInput
  label="Email"
  placeholder="Ingresa tu email"
/>
```

### 3. Desde View

```typescript
// Antes
<View style={styles.card}>
  <Text>Contenido</Text>
</View>

// Después
<EnergyCard title="Título">
  <Text>Contenido</Text>
</EnergyCard>
```

## Ejemplos Completos

Ver `src/components/EnergyDashboard.tsx` para un ejemplo completo de cómo usar React Native Paper en un dashboard real.

## Próximos Pasos

1. **Configurar iconos** para react-native-vector-icons
2. **Implementar animaciones** personalizadas
3. **Agregar más componentes** específicos del dominio
4. **Optimizar rendimiento** con memoización
5. **Implementar tests** para los componentes
6. **Configurar Storybook** para documentación visual
