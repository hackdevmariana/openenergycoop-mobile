# Sentry React Native - Guía Completa

## 📋 Tabla de Contenidos

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso Básico](#uso-básico)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Error Boundaries](#error-boundaries)
6. [Monitoreo de Rendimiento](#monitoreo-de-rendimiento)
7. [Integración con Navegación](#integración-con-navegación)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Solución de Problemas](#solución-de-problemas)

## 🚀 Instalación

### Paquete Instalado

```bash
npm install @sentry/react-native
```

### Dependencias Principales

- **@sentry/react-native**: SDK principal de Sentry para React Native
- **@sentry/react**: Integración con React (incluida)
- **@sentry/tracing**: Monitoreo de rendimiento (incluido)

## ⚙️ Configuración

### 1. Configuración Básica

```typescript
// src/config/sentry.ts
import * as Sentry from '@sentry/react-native';

export const initSentry = () => {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN_HERE',
    debug: __DEV__,
    environment: __DEV__ ? 'development' : 'production',
    release: '1.0.0',
    tracesSampleRate: __DEV__ ? 1.0 : 0.2,
    enableAutoSessionTracking: true,
  });
};
```

### 2. Configuración en App.tsx

```typescript
import { initSentry } from './src/config/sentry';
import SentryErrorBoundary from './src/components/SentryErrorBoundary';

function App() {
  useEffect(() => {
    initSentry();
  }, []);

  return (
    <SentryErrorBoundary>
      {/* Resto de la aplicación */}
    </SentryErrorBoundary>
  );
}
```

## 🎯 Uso Básico

### 1. Capturar Errores

```typescript
import { captureException, captureMessage } from '../config/sentry';

// Capturar excepciones
try {
  // Código que puede fallar
} catch (error) {
  captureException(error);
}

// Capturar mensajes
captureMessage('Usuario completó onboarding', 'info');
```

### 2. Establecer Usuario

```typescript
import { setSentryUser } from '../config/sentry';

setSentryUser({
  id: '12345',
  email: 'usuario@ejemplo.com',
  username: 'usuario123',
});
```

### 3. Agregar Contexto

```typescript
import { setSentryContext, setSentryTag } from '../config/sentry';

// Agregar contexto
setSentryContext('user_preferences', {
  theme: 'dark',
  language: 'es',
});

// Agregar tags
setSentryTag('user_type', 'premium');
```

## 🪝 Hooks Personalizados

### 1. Hook Principal

```typescript
import { useSentry } from '../hooks/useSentry';

const MyComponent = () => {
  const { 
    captureError, 
    captureInfo, 
    setUser, 
    setContext,
    addBreadcrumb 
  } = useSentry();

  const handleError = () => {
    captureError(new Error('Error personalizado'));
  };

  const handleUserAction = () => {
    addBreadcrumb('Usuario hizo clic en botón', 'user_action');
  };

  return (
    <Button onPress={handleError}>
      Generar Error
    </Button>
  );
};
```

### 2. Hook de Navegación

```typescript
import { useSentryNavigation } from '../hooks/useSentry';

const MyScreen = () => {
  const { trackNavigation, trackScreenView } = useSentryNavigation();

  useEffect(() => {
    trackScreenView('HomeScreen');
  }, []);

  const handleNavigation = () => {
    trackNavigation('Profile', { userId: '123' });
  };

  return <View />;
};
```

### 3. Hook de API

```typescript
import { useSentryAPI } from '../hooks/useSentry';

const MyComponent = () => {
  const { trackAPICall } = useSentryAPI();

  const fetchData = async () => {
    return await trackAPICall(
      '/api/users',
      'GET',
      () => fetch('/api/users').then(res => res.json())
    );
  };

  return <View />;
};
```

### 4. Hook de Rendimiento

```typescript
import { useSentryPerformance } from '../hooks/useSentry';

const MyComponent = () => {
  const { trackOperation } = useSentryPerformance();

  const performHeavyOperation = async () => {
    return await trackOperation(
      'Procesamiento de datos',
      'data_processing',
      async () => {
        // Operación pesada
        return await processData();
      }
    );
  };

  return <View />;
};
```

## 🛡️ Error Boundaries

### 1. Error Boundary Básico

```typescript
import SentryErrorBoundary from '../components/SentryErrorBoundary';

const App = () => {
  return (
    <SentryErrorBoundary>
      <MyApp />
    </SentryErrorBoundary>
  );
};
```

### 2. Error Boundary Personalizado

```typescript
import { ScreenErrorFallback } from '../components/SentryErrorBoundary';

const MyScreen = () => {
  return (
    <SentryErrorBoundary 
      fallback={({ error, resetError }) => (
        <ScreenErrorFallback 
          error={error} 
          resetError={resetError}
          screenName="HomeScreen"
        />
      )}
    >
      <ScreenContent />
    </SentryErrorBoundary>
  );
};
```

### 3. Error Boundary para Red

```typescript
import { NetworkErrorFallback } from '../components/SentryErrorBoundary';

const NetworkComponent = () => {
  return (
    <SentryErrorBoundary 
      fallback={({ error, resetError }) => (
        <NetworkErrorFallback 
          error={error} 
          resetError={resetError}
        />
      )}
    >
      <NetworkContent />
    </SentryErrorBoundary>
  );
};
```

## 📊 Monitoreo de Rendimiento

### 1. Transacciones Personalizadas

```typescript
import { startTransaction } from '../config/sentry';

const performOperation = async () => {
  const transaction = startTransaction('Operación Compleja', 'ui.action');
  
  try {
    // Operación 1
    const result1 = await operation1();
    transaction.setStatus('ok');
    
    // Operación 2
    const result2 = await operation2();
    transaction.setStatus('ok');
    
    return { result1, result2 };
  } catch (error) {
    transaction.setStatus('internal_error');
    throw error;
  } finally {
    transaction.finish();
  }
};
```

### 2. Monitoreo de Componentes

```typescript
import { useSentryPerformance } from '../hooks/useSentry';

const MyComponent = () => {
  const { trackOperation } = useSentryPerformance();

  useEffect(() => {
    trackOperation(
      'Carga de componente',
      'component.mount',
      async () => {
        await loadData();
      }
    );
  }, []);

  return <View />;
};
```

## 🧭 Integración con Navegación

### 1. Tracking Automático

```typescript
import { useSentryNavigation } from '../hooks/useSentry';

const NavigationWrapper = ({ children }) => {
  const { trackNavigation } = useSentryNavigation();

  useEffect(() => {
    // Tracking automático de cambios de ruta
    const unsubscribe = navigation.addListener('state', (e) => {
      const currentRoute = e.data.state.routes[e.data.state.index];
      trackNavigation(currentRoute.name, currentRoute.params);
    });

    return unsubscribe;
  }, [navigation]);

  return children;
};
```

### 2. Breadcrumbs de Navegación

```typescript
import { useSentryNavigation } from '../hooks/useSentry';

const MyScreen = () => {
  const { trackScreenView } = useSentryNavigation();

  useEffect(() => {
    trackScreenView('HomeScreen');
  }, []);

  return <View />;
};
```

## ✅ Mejores Prácticas

### 1. Configuración

- **Usar DSN correcto**: Asegúrate de usar el DSN correcto para cada entorno
- **Configurar entornos**: Usa diferentes configuraciones para dev/prod
- **Filtrar datos sensibles**: Implementa `beforeSend` para filtrar información sensible

### 2. Captura de Errores

- **Capturar contexto**: Siempre incluye contexto relevante
- **Usar breadcrumbs**: Agrega breadcrumbs para rastrear el flujo del usuario
- **Categorizar errores**: Usa tags para categorizar diferentes tipos de errores

### 3. Rendimiento

- **Muestreo adecuado**: Configura el muestreo según el volumen de tráfico
- **Transacciones específicas**: Crea transacciones para operaciones importantes
- **Monitoreo continuo**: Revisa regularmente las métricas de rendimiento

### 4. Privacidad

- **Filtrar datos personales**: Nunca envíes datos personales a Sentry
- **Usar hashing**: Hashea identificadores sensibles
- **Configurar PII**: Usa las opciones de PII de Sentry

## 🔧 Solución de Problemas

### 1. Errores Comunes

#### Error: "Sentry not initialized"

**Solución:**
```typescript
// Asegúrate de llamar initSentry() antes de usar Sentry
useEffect(() => {
  initSentry();
}, []);
```

#### Error: "DSN not configured"

**Solución:**
```typescript
// Verifica que el DSN esté configurado correctamente
Sentry.init({
  dsn: 'https://your-dsn@sentry.io/project',
  // ... resto de configuración
});
```

#### Error: "Source maps not working"

**Solución:**
```bash
# Genera source maps para producción
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

### 2. Debugging

#### Habilitar Debug Mode

```typescript
Sentry.init({
  dsn: 'your-dsn',
  debug: true, // Solo en desarrollo
});
```

#### Verificar Configuración

```typescript
import { isSentryEnabled } from '../config/sentry';

console.log('Sentry enabled:', isSentryEnabled());
```

### 3. Optimización

#### Reducir Volumen de Datos

```typescript
Sentry.init({
  dsn: 'your-dsn',
  tracesSampleRate: 0.1, // Solo 10% de transacciones
  profilesSampleRate: 0.05, // Solo 5% de perfiles
});
```

#### Filtrar Eventos

```typescript
Sentry.init({
  dsn: 'your-dsn',
  beforeSend(event) {
    // Filtrar eventos específicos
    if (event.exception) {
      const exception = event.exception.values[0];
      if (exception.value === 'Network request failed') {
        return null; // No enviar este evento
      }
    }
    return event;
  },
});
```

## 📚 Recursos Adicionales

### Documentación Oficial

- [Sentry React Native Docs](https://docs.sentry.io/platforms/react-native/)
- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Performance Docs](https://docs.sentry.io/product/performance/)

### Ejemplos de Código

- [Sentry React Native Examples](https://github.com/getsentry/sentry-react-native/tree/main/example)
- [Sentry React Examples](https://github.com/getsentry/sentry-javascript/tree/master/packages/react)

### Herramientas Útiles

- [Sentry CLI](https://docs.sentry.io/cli/)
- [Sentry Webpack Plugin](https://docs.sentry.io/platforms/javascript/sourcemaps/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)

## 🎉 Conclusión

Sentry está completamente configurado y listo para usar en la aplicación OpenEnergyCoop Mobile. La implementación incluye:

- ✅ Captura automática de errores
- ✅ Error boundaries personalizados
- ✅ Monitoreo de rendimiento
- ✅ Tracking de navegación
- ✅ Hooks personalizados
- ✅ Integración con estado global
- ✅ Configuración de privacidad
- ✅ Documentación completa

La aplicación ahora tiene un sistema robusto de monitoreo de errores y rendimiento que permite detectar y resolver problemas rápidamente, mejorando la experiencia del usuario y la estabilidad de la aplicación.
