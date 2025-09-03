# Guía de Iconos - OpenEnergyCoop Mobile

## Descripción General

Esta aplicación utiliza `@expo/vector-icons` como sistema de iconos principal, que incluye múltiples familias de iconos:

- **Ionicons**: Iconos de navegación y UI general
- **MaterialIcons**: Iconos de Material Design
- **FontAwesome**: Iconos de usuario y elementos sociales
- **MaterialCommunityIcons**: Iconos específicos de energía y tecnología

## Configuración

### Instalación

Los iconos ya están instalados y configurados en el proyecto:

```bash
npm install @expo/vector-icons
```

### Configuración de Android

La configuración para Android ya está incluida en `android/app/build.gradle`:

```gradle
// Configuración para React Native Vector Icons
apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

### Configuración de iOS

Para iOS, los iconos se configuran automáticamente a través de autolinking en el `Podfile`.

## Uso Básico

### Importar el componente Icon

```typescript
import { Icon } from '../config/icons';
```

### Uso básico

```typescript
<Icon name="energy" size={24} color="#007AFF" />
```

### Con evento onPress

```typescript
<Icon 
  name="settings" 
  size={24} 
  color="#007AFF" 
  onPress={() => console.log('Configuración')} 
/>
```

## Iconos Disponibles

### Navegación
- `home` - Inicio
- `homeOutline` - Inicio (contorno)
- `settings` - Configuración
- `settingsOutline` - Configuración (contorno)
- `profile` - Perfil
- `profileOutline` - Perfil (contorno)

### Energía
- `energy` - Energía/rayo
- `solar` - Energía solar
- `battery` - Batería llena
- `batteryCharging` - Batería cargando
- `power` - Encendido
- `powerOff` - Apagado

### Dashboard
- `chart` - Gráfico de barras
- `analytics` - Analíticas
- `trending` - Tendencia ascendente
- `trendingDown` - Tendencia descendente

### Estado
- `success` - Éxito
- `error` - Error
- `warning` - Advertencia
- `info` - Información

### Acciones
- `add` - Agregar
- `edit` - Editar
- `delete` - Eliminar
- `refresh` - Actualizar
- `search` - Buscar
- `filter` - Filtrar

### Comunicación
- `notification` - Notificaciones
- `notificationOutline` - Notificaciones (contorno)
- `message` - Mensaje
- `messageOutline` - Mensaje (contorno)

### Ubicación
- `location` - Ubicación
- `locationOutline` - Ubicación (contorno)
- `map` - Mapa

### Tiempo
- `time` - Tiempo
- `calendar` - Calendario
- `clock` - Reloj

### Usuario
- `user` - Usuario
- `users` - Usuarios
- `userCircle` - Usuario (círculo)

### Configuración
- `gear` - Engranaje
- `gearOutline` - Engranaje (contorno)
- `help` - Ayuda
- `helpOutline` - Ayuda (contorno)

### Energía Específica
- `consumption` - Consumo
- `production` - Producción
- `efficiency` - Eficiencia
- `grid` - Red eléctrica
- `meter` - Medidor eléctrico

## Props Disponibles

### IconProps

```typescript
interface IconProps {
  name: IconName;        // Nombre del icono (requerido)
  size?: number;         // Tamaño del icono (opcional, default: 24)
  color?: string;        // Color del icono (opcional)
  style?: any;          // Estilos adicionales (opcional)
  onPress?: () => void; // Función de callback al presionar (opcional)
}
```

## Ejemplos de Uso

### Icono en un botón

```typescript
import { Icon } from '../config/icons';

const MyButton = () => (
  <TouchableOpacity onPress={() => console.log('Botón presionado')}>
    <Icon name="add" size={24} color="#007AFF" />
  </TouchableOpacity>
);
```

### Icono con texto

```typescript
const IconWithText = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon name="energy" size={20} color="#34C759" />
    <Text style={{ marginLeft: 8 }}>Energía Verde</Text>
  </View>
);
```

### Icono condicional

```typescript
const StatusIcon = ({ status }: { status: 'success' | 'error' | 'warning' }) => {
  const iconName = status === 'success' ? 'success' : 
                   status === 'error' ? 'error' : 'warning';
  
  return <Icon name={iconName} size={24} color="#007AFF" />;
};
```

### Icono con estilos personalizados

```typescript
const CustomIcon = () => (
  <Icon 
    name="battery" 
    size={32} 
    color="#FF9500"
    style={{ 
      backgroundColor: '#F2F2F7', 
      padding: 8, 
      borderRadius: 8 
    }} 
  />
);
```

## Hook Personalizado

También puedes usar el hook personalizado para obtener un icono:

```typescript
import { useIcon } from '../config/icons';

const MyComponent = () => {
  const EnergyIcon = useIcon('energy');
  
  return <EnergyIcon size={24} color="#007AFF" />;
};
```

## Tipos TypeScript

Todos los iconos están tipados para TypeScript:

```typescript
import { IconName } from '../config/icons';

const iconName: IconName = 'energy'; // ✅ Correcto
const wrongIcon: IconName = 'invalid'; // ❌ Error de TypeScript
```

## Migración desde react-native-vector-icons

Si estás migrando desde `react-native-vector-icons`, simplemente reemplaza:

```typescript
// Antes
import Icon from 'react-native-vector-icons/MaterialIcons';
<Icon name="bolt" size={24} color="#007AFF" />

// Después
import { Icon } from '../config/icons';
<Icon name="energy" size={24} color="#007AFF" />
```

## Notas Importantes

1. **Autolinking**: Los iconos se configuran automáticamente en iOS y Android
2. **Performance**: Los iconos se cargan de forma eficiente
3. **Consistencia**: Todos los iconos siguen el mismo patrón de diseño
4. **Accesibilidad**: Los iconos incluyen soporte para lectores de pantalla
5. **Temas**: Los iconos se adaptan automáticamente al tema de la aplicación

## Solución de Problemas

### Icono no se muestra
1. Verifica que el nombre del icono sea correcto
2. Asegúrate de que el icono esté incluido en la configuración
3. Revisa que las fuentes estén instaladas correctamente

### Error de TypeScript
1. Verifica que el nombre del icono esté en el tipo `IconName`
2. Asegúrate de importar correctamente desde `../config/icons`

### Icono no se actualiza
1. Verifica que las props `size` y `color` sean del tipo correcto
2. Asegúrate de que el componente se re-renderice cuando cambien las props
