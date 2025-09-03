# Guía de React Native Vector Icons en OpenEnergyCoop Mobile

## ¿Qué es React Native Vector Icons?

React Native Vector Icons es una biblioteca que proporciona acceso a miles de iconos vectoriales para React Native. Incluye iconos de Material Design, FontAwesome, Ionicons, y muchas otras fuentes populares.

## Características Principales

- **Múltiples Fuentes**: Material Design, FontAwesome, Ionicons, Feather, etc.
- **Escalabilidad**: Iconos vectoriales que se ven perfectos en cualquier tamaño
- **Personalización**: Colores, tamaños y estilos personalizables
- **Performance**: Renderizado nativo optimizado
- **TypeScript**: Soporte completo con tipado

## Configuración

### 1. Dependencias Instaladas

```json
{
  "dependencies": {
    "react-native-vector-icons": "^10.0.0"
  }
}
```

### 2. Fuentes de Iconos Disponibles

- **MaterialCommunityIcons**: Iconos de Material Design (recomendado)
- **MaterialIcons**: Iconos básicos de Material Design
- **FontAwesome**: Iconos de FontAwesome
- **Ionicons**: Iconos de Ionic
- **Feather**: Iconos minimalistas
- **AntDesign**: Iconos de Ant Design
- **Entypo**: Iconos de Entypo
- **EvilIcons**: Iconos de Evil Icons
- **FontAwesome5**: FontAwesome 5
- **Foundation**: Iconos de Foundation
- **Octicons**: Iconos de GitHub
- **SimpleLineIcons**: Iconos simples
- **Zocial**: Iconos sociales

## Estructura de Archivos

```
src/
├── lib/
│   └── icons.ts                    # Configuración centralizada de iconos
├── components/
│   ├── ui/
│   │   ├── EnergyIcon.tsx         # Componente de icono personalizado
│   │   └── index.ts               # Exportaciones
│   └── IconShowcase.tsx           # Ejemplo de uso
└── App.tsx                        # Configuración principal
```

## Configuración Centralizada

### 1. Archivo de Configuración (`src/lib/icons.ts`)

```typescript
// Iconos de energía
export const EnergyIcons = {
  consumption: 'lightning-bolt',
  production: 'solar-panel',
  efficiency: 'trending-up',
  power: 'flash',
  solar: 'weather-sunny',
  wind: 'weather-windy',
  battery: 'battery',
  // ... más iconos
} as const;

// Iconos de estado
export const StatusIcons = {
  success: 'check-circle',
  error: 'alert-circle',
  warning: 'alert',
  info: 'information',
  loading: 'loading',
  // ... más iconos
} as const;

// Funciones helper
export const getEnergyIcon = (type: 'consumption' | 'production' | 'efficiency'): string => {
  switch (type) {
    case 'consumption': return EnergyIcons.consumption;
    case 'production': return EnergyIcons.production;
    case 'efficiency': return EnergyIcons.efficiency;
    default: return EnergyIcons.power;
  }
};
```

### 2. Componente Personalizado (`src/components/ui/EnergyIcon.tsx`)

```typescript
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getEnergyIcon, getStatusIcon } from '../../lib/icons';

interface EnergyIconProps {
  type?: 'energy' | 'status' | 'navigation' | 'user' | 'action';
  energyType?: 'consumption' | 'production' | 'efficiency' | 'neutral';
  status?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  size?: number;
  color?: string;
  onPress?: () => void;
}

export const EnergyIcon: React.FC<EnergyIconProps> = ({
  type = 'energy',
  energyType = 'neutral',
  status = 'info',
  size = 24,
  color,
  onPress,
}) => {
  const getIconName = (): string => {
    switch (type) {
      case 'energy': return getEnergyIcon(energyType);
      case 'status': return getStatusIcon(status);
      default: return 'help-circle';
    }
  };

  const getIconColor = (): string => {
    if (color) return color;
    
    // Colores por tipo de energía
    if (type === 'energy') {
      const { energyColors } = require('../../theme');
      switch (energyType) {
        case 'consumption': return energyColors.consumption;
        case 'production': return energyColors.production;
        case 'efficiency': return energyColors.efficiency;
        default: return theme.colors.primary;
      }
    }
    
    return theme.colors.onSurface;
  };

  return (
    <Icon 
      name={getIconName()} 
      size={size} 
      color={getIconColor()}
    />
  );
};
```

## Uso Básico

### 1. Importación Directa

```typescript
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MyComponent() {
  return (
    <Icon name="lightning-bolt" size={24} color="#FF9500" />
  );
}
```

### 2. Componente Personalizado

```typescript
import { EnergyIcon } from './ui/EnergyIcon';

function MyComponent() {
  return (
    <View>
      {/* Icono de energía */}
      <EnergyIcon 
        type="energy" 
        energyType="consumption" 
        size={32} 
      />
      
      {/* Icono de estado */}
      <EnergyIcon 
        type="status" 
        status="success" 
        size={24} 
      />
      
      {/* Icono como botón */}
      <EnergyIcon 
        type="action" 
        actionIcon="add" 
        size={32} 
        onPress={() => console.log('Presionado')} 
      />
    </View>
  );
}
```

## Categorías de Iconos

### 1. Iconos de Energía

```typescript
// Consumo
<EnergyIcon type="energy" energyType="consumption" />
<EnergyIcon type="energy" energyType="power" />
<EnergyIcon type="energy" energyType="electricity" />

// Producción
<EnergyIcon type="energy" energyType="production" />
<EnergyIcon type="energy" energyType="solar" />
<EnergyIcon type="energy" energyType="wind" />

// Eficiencia
<EnergyIcon type="energy" energyType="efficiency" />
<EnergyIcon type="energy" energyType="chart" />
<EnergyIcon type="energy" energyType="analytics" />
```

### 2. Iconos de Estado

```typescript
<EnergyIcon type="status" status="success" />
<EnergyIcon type="status" status="error" />
<EnergyIcon type="status" status="warning" />
<EnergyIcon type="status" status="info" />
<EnergyIcon type="status" status="loading" />
```

### 3. Iconos de Navegación

```typescript
<EnergyIcon type="navigation" navigationIcon="home" />
<EnergyIcon type="navigation" navigationIcon="dashboard" />
<EnergyIcon type="navigation" navigationIcon="profile" />
<EnergyIcon type="navigation" navigationIcon="settings" />
<EnergyIcon type="navigation" navigationIcon="search" />
```

### 4. Iconos de Usuario

```typescript
<EnergyIcon type="user" userIcon="profile" />
<EnergyIcon type="user" userIcon="edit" />
<EnergyIcon type="user" userIcon="save" />
<EnergyIcon type="user" userIcon="logout" />
<EnergyIcon type="user" userIcon="settings" />
```

### 5. Iconos de Acciones

```typescript
<EnergyIcon type="action" actionIcon="add" />
<EnergyIcon type="action" actionIcon="edit" />
<EnergyIcon type="action" actionIcon="delete" />
<EnergyIcon type="action" actionIcon="save" />
<EnergyIcon type="action" actionIcon="refresh" />
<EnergyIcon type="action" actionIcon="share" />
```

## Integración con React Native Paper

### 1. En IconButton

```typescript
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<IconButton
  icon={() => (
    <Icon name="lightning-bolt" size={24} color={theme.colors.primary} />
  )}
  onPress={() => {}}
/>
```

### 2. En FAB

```typescript
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<FAB
  icon={() => (
    <Icon name="plus" size={24} color="white" />
  )}
  onPress={() => {}}
/>
```

### 3. En Avatar

```typescript
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Avatar.Icon
  size={48}
  icon={() => (
    <Icon name="lightning-bolt" size={24} color="white" />
  )}
/>
```

## Colores Automáticos

### 1. Por Tipo de Energía

```typescript
// Los iconos de energía usan automáticamente los colores del tema
<EnergyIcon type="energy" energyType="consumption" /> // Naranja
<EnergyIcon type="energy" energyType="production" />  // Verde
<EnergyIcon type="energy" energyType="efficiency" />  // Púrpura
```

### 2. Por Estado

```typescript
// Los iconos de estado usan colores semánticos
<EnergyIcon type="status" status="success" /> // Verde/primario
<EnergyIcon type="status" status="error" />   // Rojo
<EnergyIcon type="status" status="warning" /> // Naranja
<EnergyIcon type="status" status="info" />    // Azul
```

## Tamaños Recomendados

```typescript
// Tamaños estándar
<EnergyIcon size={16} />  // Muy pequeño
<EnergyIcon size={24} />  // Pequeño (por defecto)
<EnergyIcon size={32} />  // Mediano
<EnergyIcon size={48} />  // Grande
<EnergyIcon size={64} />  // Muy grande
```

## Iconos Específicos por Dominio

### 1. Energía

```typescript
// Consumo
'lightning-bolt'    // Consumo general
'flash'            // Energía eléctrica
'lightbulb'        // Iluminación
'gauge'            // Medidor

// Producción
'solar-panel'      // Paneles solares
'weather-sunny'    // Energía solar
'weather-windy'    // Energía eólica
'battery'          // Baterías

// Eficiencia
'trending-up'      // Mejora de eficiencia
'chart-line'       // Gráficos
'chart-bar'        // Estadísticas
'speedometer'      // Rendimiento
```

### 2. Navegación

```typescript
'home'             // Inicio
'view-dashboard'   // Dashboard
'account'          // Perfil
'cog'              // Configuración
'bell'             // Notificaciones
'menu'             // Menú
'arrow-left'       // Atrás
'arrow-right'      // Adelante
'close'            // Cerrar
'magnify'          // Buscar
```

### 3. Acciones

```typescript
'plus'             // Agregar
'minus'            // Eliminar
'pencil'           // Editar
'delete'           // Borrar
'content-save'     // Guardar
'close'            // Cancelar
'check'            // Confirmar
'refresh'          // Actualizar
'sync'             // Sincronizar
'share'            // Compartir
```

## Mejores Prácticas

### 1. Uso de Categorías

```typescript
// ✅ Correcto: Usar categorías específicas
<EnergyIcon type="energy" energyType="consumption" />
<EnergyIcon type="status" status="success" />

// ❌ Incorrecto: Usar iconos genéricos
<Icon name="lightning-bolt" />
```

### 2. Consistencia de Tamaños

```typescript
// ✅ Correcto: Usar tamaños estándar
<EnergyIcon size={24} />
<EnergyIcon size={32} />

// ❌ Incorrecto: Tamaños arbitrarios
<EnergyIcon size={27} />
```

### 3. Colores Semánticos

```typescript
// ✅ Correcto: Dejar que el componente determine el color
<EnergyIcon type="energy" energyType="consumption" />

// ❌ Incorrecto: Colores hardcodeados
<EnergyIcon type="energy" energyType="consumption" color="#FF9500" />
```

### 4. Iconos como Botones

```typescript
// ✅ Correcto: Usar onPress para interactividad
<EnergyIcon 
  type="action" 
  actionIcon="add" 
  onPress={() => handleAdd()} 
/>

// ❌ Incorrecto: No usar onPress cuando se necesita interactividad
<EnergyIcon type="action" actionIcon="add" />
```

## Configuración de Fuentes

### 1. Android

```bash
# Vincular las fuentes automáticamente
npx react-native link react-native-vector-icons
```

### 2. iOS

```bash
# Instalar pods
cd ios && pod install
```

### 3. Verificación

```typescript
// Verificar que los iconos se muestran correctamente
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

<Icon name="lightning-bolt" size={24} color="black" />
```

## Debugging

### 1. Iconos No Visibles

```typescript
// Verificar que el nombre del icono existe
console.log('Icon name:', getIconName());

// Verificar que la fuente está cargada
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
console.log('Available icons:', Icon.getImageSource('lightning-bolt', 24));
```

### 2. Colores Incorrectos

```typescript
// Verificar el color calculado
console.log('Icon color:', getIconColor());

// Forzar un color específico para debugging
<EnergyIcon type="energy" energyType="consumption" color="red" />
```

### 3. Tamaños Incorrectos

```typescript
// Verificar el tamaño en diferentes dispositivos
<EnergyIcon size={24} />
<EnergyIcon size={32} />
<EnergyIcon size={48} />
```

## Ejemplos Completos

Ver `src/components/IconShowcase.tsx` para un ejemplo completo de todos los tipos de iconos disponibles.

## Próximos Pasos

1. **Configurar fuentes** para Android e iOS
2. **Agregar más iconos** específicos del dominio
3. **Implementar animaciones** en iconos
4. **Optimizar rendimiento** con memoización
5. **Implementar tests** para los iconos
6. **Crear un catálogo visual** de iconos
