# Lucide React - Guía Completa

## 📋 Tabla de Contenidos

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso Básico](#uso-básico)
4. [Componente Icon](#componente-icon)
5. [Personalización](#personalización)
6. [Iconos por Categoría](#iconos-por-categoría)
7. [Integración con la Aplicación](#integración-con-la-aplicación)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Solución de Problemas](#solución-de-problemas)

## 🚀 Instalación

### Paquete Instalado

```bash
npm install lucide-react
```

### Dependencias Principales

- **lucide-react**: Biblioteca de iconos vectoriales para React
- **React**: Framework principal (ya instalado)
- **TypeScript**: Soporte de tipos (ya configurado)

## ⚙️ Configuración

### 1. Configuración Básica

```typescript
// src/config/lucide.ts
import React from 'react';
import { Home, Settings, User, /* ... otros iconos */ } from 'lucide-react';

// Mapeo de nombres a componentes de iconos
export const ICON_MAP: Record<IconName, LucideIcon> = {
  home: Home,
  settings: Settings,
  profile: User,
  // ... más iconos
};

// Componente Icon principal
export const Icon: React.FC<IconProps> = ({ name, size, color, ...props }) => {
  const IconComponent = ICON_MAP[name];
  return <IconComponent size={size} color={color} {...props} />;
};
```

### 2. Configuración de la Aplicación

```typescript
// src/config/icons.ts
import { Icon, IconName } from './lucide';

// Configuración de iconos para la aplicación
export const ICONS = {
  home: 'home',
  settings: 'settings',
  profile: 'profile',
  // ... más iconos
} as const;

// Componente AppIcon
export const AppIcon: React.FC<AppIconProps> = ({ name, ...props }) => {
  const iconName = ICONS[name] as IconName;
  return <Icon name={iconName} {...props} />;
};
```

## 🎯 Uso Básico

### 1. Uso Directo de Lucide

```typescript
import { Home, Settings, User } from 'lucide-react';

const MyComponent = () => {
  return (
    <View>
      <Home size={24} color="#007AFF" />
      <Settings size={20} color="#6B7280" />
      <User size={32} color="#34C759" />
    </View>
  );
};
```

### 2. Uso con Componente Icon

```typescript
import { Icon } from '../config/lucide';

const MyComponent = () => {
  return (
    <View>
      <Icon name="home" size={24} color="#007AFF" />
      <Icon name="settings" size={20} color="#6B7280" />
      <Icon name="profile" size={32} color="#34C759" />
    </View>
  );
};
```

### 3. Uso con AppIcon

```typescript
import { AppIcon } from '../config/icons';

const MyComponent = () => {
  return (
    <View>
      <AppIcon name="home" size={24} color="#007AFF" />
      <AppIcon name="settings" size={20} color="#6B7280" />
      <AppIcon name="profile" size={32} color="#34C759" />
    </View>
  );
};
```

## 🎨 Componente Icon

### Props Disponibles

```typescript
interface IconProps {
  name: IconName;           // Nombre del icono
  size?: number;            // Tamaño (por defecto: 24)
  color?: string;           // Color (por defecto: 'currentColor')
  className?: string;       // Clases CSS
  strokeWidth?: number;     // Grosor del trazo (por defecto: 2)
  fill?: string;           // Color de relleno (por defecto: 'none')
  onClick?: () => void;     // Función de click
  style?: any;             // Estilos inline
}
```

### Ejemplos de Uso

```typescript
// Icono básico
<Icon name="home" />

// Icono con personalización
<Icon 
  name="settings" 
  size={32} 
  color="#FF3B30" 
  strokeWidth={3} 
/>

// Icono con evento
<Icon 
  name="heart" 
  size={24} 
  color="#FF2D92" 
  onClick={() => console.log('Heart clicked!')} 
/>

// Icono con estilos
<Icon 
  name="star" 
  size={20} 
  style={{ marginRight: 8 }} 
/>
```

## 🎨 Personalización

### 1. Tamaños

```typescript
// Tamaños estándar
<Icon name="home" size={16} />  // Pequeño
<Icon name="home" size={24} />  // Mediano (por defecto)
<Icon name="home" size={32} />  // Grande
<Icon name="home" size={48} />  // Extra grande
```

### 2. Colores

```typescript
// Colores del sistema
<Icon name="home" color="#007AFF" />  // Azul iOS
<Icon name="home" color="#FF3B30" />  // Rojo
<Icon name="home" color="#34C759" />  // Verde
<Icon name="home" color="#FF9500" />  // Naranja
<Icon name="home" color="#AF52DE" />  // Púrpura

// Color dinámico
<Icon name="home" color={isActive ? '#007AFF' : '#6B7280'} />
```

### 3. Grosor del Trazo

```typescript
// Grosor fino
<Icon name="home" strokeWidth={1} />

// Grosor normal
<Icon name="home" strokeWidth={2} />

// Grosor grueso
<Icon name="home" strokeWidth={3} />

// Grosor extra grueso
<Icon name="home" strokeWidth={4} />
```

### 4. Relleno

```typescript
// Sin relleno (por defecto)
<Icon name="heart" fill="none" />

// Con relleno
<Icon name="heart" fill="#FF2D92" />

// Relleno dinámico
<Icon name="star" fill={isFilled ? '#FFD700' : 'none'} />
```

## 📂 Iconos por Categoría

### Navegación

```typescript
// Iconos de navegación principal
<Icon name="home" />
<Icon name="chart" />
<Icon name="energy" />
<Icon name="profile" />
<Icon name="settings" />

// Navegación UI
<Icon name="chevron-left" />
<Icon name="chevron-right" />
<Icon name="chevron-up" />
<Icon name="chevron-down" />
<Icon name="menu" />
<Icon name="close" />
```

### Acciones

```typescript
// Acciones básicas
<Icon name="search" />
<Icon name="plus" />
<Icon name="edit" />
<Icon name="delete" />
<Icon name="view" />
<Icon name="hide" />

// Organización
<Icon name="filter" />
<Icon name="sort-asc" />
<Icon name="sort-desc" />
<Icon name="grid" />
<Icon name="list" />
```

### Estados

```typescript
// Estados de la aplicación
<Icon name="alert" />
<Icon name="success" />
<Icon name="error" />
<Icon name="info" />
<Icon name="help" />
<Icon name="external" />
```

### Comunicación

```typescript
// Comunicación
<Icon name="mail" />
<Icon name="phone" />
<Icon name="location" />
<Icon name="calendar" />
<Icon name="clock" />
```

### Seguridad

```typescript
// Seguridad y autenticación
<Icon name="lock" />
<Icon name="unlock" />
<Icon name="key" />
<Icon name="key-round" />
<Icon name="fingerprint" />
<Icon name="shield" />
<Icon name="shield-check" />
<Icon name="shield-alert" />
<Icon name="shield-x" />
```

### Multimedia

```typescript
// Multimedia
<Icon name="camera" />
<Icon name="image" />
<Icon name="video" />
<Icon name="music" />
<Icon name="play" />
<Icon name="pause" />
<Icon name="stop" />
<Icon name="skip-back" />
<Icon name="skip-forward" />
```

### Dispositivos

```typescript
// Dispositivos y hardware
<Icon name="wifi" />
<Icon name="signal" />
<Icon name="battery" />
<Icon name="volume" />
<Icon name="volume-off" />
<Icon name="mic" />
<Icon name="mic-off" />
<Icon name="headphones" />
<Icon name="speaker" />
```

### Finanzas

```typescript
// Finanzas y economía
<Icon name="credit-card" />
<Icon name="wallet" />
<Icon name="piggy-bank" />
<Icon name="trending-up" />
<Icon name="trending-down" />
<Icon name="dollar" />
<Icon name="euro" />
<Icon name="pound" />
<Icon name="bitcoin" />
```

### Naturaleza

```typescript
// Naturaleza y clima
<Icon name="sun" />
<Icon name="moon" />
<Icon name="cloud" />
<Icon name="cloud-rain" />
<Icon name="cloud-snow" />
<Icon name="cloud-lightning" />
<Icon name="umbrella" />
<Icon name="snowflake" />
<Icon name="leaf" />
<Icon name="tree" />
```

## 🔧 Integración con la Aplicación

### 1. Navegación

```typescript
// src/navigation/AppNavigator.tsx
import { Icon } from '../config/lucide';

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home': iconName = focused ? 'home' : 'home'; break;
            case 'Dashboard': iconName = focused ? 'chart' : 'chart'; break;
            case 'Energy': iconName = focused ? 'energy' : 'energy'; break;
            case 'Profile': iconName = focused ? 'profile' : 'profile'; break;
            case 'Settings': iconName = focused ? 'settings' : 'settings'; break;
            default: iconName = 'home';
          }
          return <Icon name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      {/* ... tabs */}
    </Tab.Navigator>
  );
};
```

### 2. Botones

```typescript
// Componente de botón con icono
const IconButton: React.FC<{ icon: IconName; onPress: () => void }> = ({ 
  icon, 
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="p-2 rounded-lg bg-blue-500">
      <Icon name={icon} size={20} color="white" />
    </TouchableOpacity>
  );
};

// Uso
<IconButton icon="plus" onPress={() => console.log('Add pressed')} />
<IconButton icon="edit" onPress={() => console.log('Edit pressed')} />
<IconButton icon="delete" onPress={() => console.log('Delete pressed')} />
```

### 3. Listas

```typescript
// Item de lista con icono
const ListItem: React.FC<{ icon: IconName; title: string; onPress: () => void }> = ({ 
  icon, 
  title, 
  onPress 
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center p-4">
      <Icon name={icon} size={24} color="#6B7280" className="mr-3" />
      <Text className="flex-1 text-base">{title}</Text>
      <Icon name="chevron-right" size={20} color="#6B7280" />
    </TouchableOpacity>
  );
};

// Uso
<ListItem icon="settings" title="Configuración" onPress={() => {}} />
<ListItem icon="profile" title="Perfil" onPress={() => {}} />
<ListItem icon="help" title="Ayuda" onPress={() => {}} />
```

### 4. Estados

```typescript
// Componente de estado con icono
const StatusIcon: React.FC<{ status: 'success' | 'error' | 'warning' | 'info' }> = ({ 
  status 
}) => {
  const iconMap = {
    success: 'success',
    error: 'error',
    warning: 'alert',
    info: 'info',
  };

  const colorMap = {
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
    info: '#007AFF',
  };

  return (
    <Icon 
      name={iconMap[status]} 
      size={24} 
      color={colorMap[status]} 
    />
  );
};

// Uso
<StatusIcon status="success" />
<StatusIcon status="error" />
<StatusIcon status="warning" />
<StatusIcon status="info" />
```

## ✅ Mejores Prácticas

### 1. Nomenclatura

- **Usar nombres descriptivos**: `chevron-right` en lugar de `arrow`
- **Ser consistente**: Usar el mismo nombre para el mismo concepto
- **Usar kebab-case**: Para nombres de iconos con múltiples palabras

### 2. Tamaños

- **16px**: Iconos pequeños (botones, badges)
- **20px**: Iconos de navegación (tabs, breadcrumbs)
- **24px**: Iconos estándar (por defecto)
- **32px**: Iconos grandes (headers, cards)
- **48px**: Iconos extra grandes (hero sections)

### 3. Colores

- **Usar colores del sistema**: Mantener consistencia con el diseño
- **Considerar accesibilidad**: Asegurar suficiente contraste
- **Usar colores semánticos**: Verde para éxito, rojo para error, etc.

### 4. Performance

- **Importar solo lo necesario**: Importar solo los iconos que uses
- **Usar memoización**: Para iconos que se renderizan frecuentemente
- **Evitar re-renders**: Usar React.memo cuando sea apropiado

### 5. Accesibilidad

```typescript
// Icono con descripción para lectores de pantalla
<Icon 
  name="home" 
  size={24} 
  accessibilityLabel="Ir al inicio"
  accessibilityRole="button"
/>
```

## 🔧 Solución de Problemas

### 1. Icono no encontrado

**Problema:** `Icono no encontrado: unknown-icon`

**Solución:**
```typescript
// Verificar que el icono existe
import { hasIcon } from '../config/lucide';

if (hasIcon(iconName)) {
  return <Icon name={iconName} />;
} else {
  console.warn(`Icono no disponible: ${iconName}`);
  return <Icon name="help" />; // Icono de fallback
}
```

### 2. Icono no se renderiza

**Problema:** El icono no aparece en pantalla

**Solución:**
```typescript
// Verificar props
<Icon 
  name="home" 
  size={24}           // Asegurar tamaño > 0
  color="#000000"     // Asegurar color visible
  strokeWidth={2}     // Asegurar grosor > 0
/>
```

### 3. Icono muy pequeño/grande

**Problema:** El icono no tiene el tamaño correcto

**Solución:**
```typescript
// Ajustar tamaño según el contexto
<Icon name="home" size={16} />  // Para botones pequeños
<Icon name="home" size={24} />  // Para uso general
<Icon name="home" size={32} />  // Para headers
<Icon name="home" size={48} />  // Para hero sections
```

### 4. Color no se aplica

**Problema:** El icono no cambia de color

**Solución:**
```typescript
// Verificar que el color es válido
<Icon name="home" color="#007AFF" />  // Hex válido
<Icon name="home" color="blue" />     // Nombre válido
<Icon name="home" color="rgb(0, 122, 255)" />  // RGB válido
```

### 5. Performance lenta

**Problema:** Muchos iconos causan lentitud

**Solución:**
```typescript
// Usar memoización
const MemoizedIcon = React.memo(({ name, ...props }) => (
  <Icon name={name} {...props} />
));

// Lazy loading de iconos
const LazyIcon = React.lazy(() => import('../config/lucide').then(module => ({
  default: module.Icon
})));
```

## 📚 Recursos Adicionales

### Documentación Oficial

- [Lucide React Docs](https://lucide.dev/guide/packages/lucide-react)
- [Lucide Icons](https://lucide.dev/icons)
- [Lucide GitHub](https://github.com/lucide-icons/lucide)

### Herramientas Útiles

- [Lucide Icon Search](https://lucide.dev/icons)
- [Lucide Icon Builder](https://lucide.dev/icon-builder)
- [Lucide Icon Font](https://lucide.dev/guide/packages/lucide-react)

### Ejemplos de Código

- [Lucide React Examples](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react)
- [React Native Icons](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react)

## 🎉 Conclusión

Lucide React está completamente configurado y listo para usar en la aplicación OpenEnergyCoop Mobile. La implementación incluye:

- ✅ Biblioteca de iconos vectoriales
- ✅ Configuración centralizada
- ✅ Componente Icon personalizado
- ✅ Tipado TypeScript completo
- ✅ Categorización de iconos
- ✅ Personalización avanzada
- ✅ Integración con navegación
- ✅ Mejores prácticas implementadas
- ✅ Documentación completa

La aplicación ahora tiene un sistema de iconos moderno, consistente y escalable que mejora significativamente la experiencia del usuario y la calidad visual de la aplicación. 🎉
