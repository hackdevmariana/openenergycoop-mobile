# Guía de NativeWind

## ¿Qué es NativeWind?

NativeWind te permite usar clases de Tailwind CSS directamente en tus componentes React Native, proporcionando una forma familiar y eficiente de estilar tu aplicación móvil.

## Instalación y Configuración

### Dependencias Instaladas

- `nativewind`: El plugin principal que permite usar Tailwind CSS en React Native
- `tailwindcss`: El framework CSS utilitario

### Archivos de Configuración

1. **tailwind.config.js**: Configuración de Tailwind CSS
2. **babel.config.js**: Plugin de NativeWind agregado
3. **metro.config.js**: Soporte para archivos CSS
4. **tsconfig.json**: Tipos de TypeScript para NativeWind

## Uso Básico

### Importar Estilos Globales

En tu archivo principal (`App.tsx`):

```typescript
import './src/styles/global.css';
```

### Usar Clases de Tailwind

```typescript
import React from 'react';
import { View, Text } from 'react-native';

export const MiComponente = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-xl font-bold">
        ¡Hola NativeWind!
      </Text>
    </View>
  );
};
```

## Clases Disponibles

### Layout
- `flex-1`, `flex-row`, `flex-col`
- `items-center`, `justify-center`
- `p-4`, `m-2`, `px-6`, `py-3`

### Colores
- `bg-blue-500`, `bg-red-100`
- `text-white`, `text-gray-800`
- `border-gray-300`

### Tipografía
- `text-sm`, `text-lg`, `text-2xl`
- `font-bold`, `font-semibold`
- `text-center`, `text-left`

### Bordes y Sombras
- `rounded-lg`, `rounded-full`
- `shadow-lg`, `shadow-md`
- `border`, `border-2`

### Estados
- `active:bg-blue-600` (para TouchableOpacity)
- `hover:bg-gray-100` (en algunos casos)

## Ejemplo Completo

```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const CardComponent = () => {
  return (
    <View className="bg-white rounded-lg shadow-lg p-6 m-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Título de la Tarjeta
      </Text>
      
      <Text className="text-gray-600 mb-6">
        Descripción del contenido de la tarjeta.
      </Text>
      
      <TouchableOpacity 
        className="bg-blue-500 rounded-lg py-3 px-6 active:bg-blue-600"
        onPress={() => console.log('Presionado')}
      >
        <Text className="text-white font-semibold text-center">
          Acción
        </Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Ventajas de NativeWind

1. **Familiaridad**: Si conoces Tailwind CSS, ya sabes usar NativeWind
2. **Consistencia**: Mismo sistema de diseño en web y móvil
3. **Productividad**: Menos tiempo escribiendo estilos personalizados
4. **Mantenibilidad**: Clases utilitarias fáciles de entender y modificar
5. **Performance**: Estilos optimizados para React Native

## Consejos

- Usa `className` en lugar de `style` para aplicar estilos de Tailwind
- Combina con `style` para estilos específicos de React Native
- Las clases de Tailwind se compilan en tiempo de build para mejor performance
- Usa el inspector de React Native para verificar que los estilos se aplican correctamente

## Recursos Adicionales

- [Documentación oficial de NativeWind](https://www.nativewind.dev/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Cheat sheet de Tailwind](https://nerdcave.com/tailwind-cheat-sheet)

