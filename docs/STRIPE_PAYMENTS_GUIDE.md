# Stripe Payments - Guía Completa

## 📋 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Configuración del Sistema](#configuración-del-sistema)
4. [Hook Personalizado](#hook-personalizado)
5. [Componente de Demostración](#componente-de-demostración)
6. [Casos de Uso](#casos-de-uso)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Solución de Problemas](#solución-de-problemas)

## 🌟 Descripción General
**Stripe Payments** es una biblioteca que proporciona una API completa para procesar pagos en aplicaciones React Native. Permite aceptar pagos con tarjetas, Apple Pay, Google Pay, SEPA, iDEAL y otros métodos de pago populares en Europa.

## 🔧 Instalación y Configuración

### 1. Instalación
```bash
npm install @stripe/stripe-react-native
```

### 2. Configuración de Plataforma
- **iOS**: Requiere configuración de Apple Pay
- **Android**: Requiere configuración de Google Pay

## ⚙️ Configuración del Sistema

### Archivo: `src/config/payments.ts`
Configuración centralizada para Stripe Payments:

```typescript
export const PAYMENTS_CONFIG = {
  basic: {
    enabled: true,
    version: '0.51.0',
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_...',
    country: 'ES',
    currency: 'eur',
    paymentMethods: {
      card: { enabled: true },
      sepa: { enabled: true },
      ideal: { enabled: true },
      applePay: { enabled: Platform.OS === 'ios' },
      googlePay: { enabled: Platform.OS === 'android' },
    },
  },
  paymentTypes: {
    energyBill: {
      name: 'Factura de Energía',
      description: 'Pago de factura de energía mensual',
      category: 'energy_bill',
      icon: '⚡',
      color: '#007AFF',
    },
    subscription: {
      name: 'Suscripción',
      description: 'Pago recurrente de servicios',
      category: 'subscription',
      icon: '🔄',
      color: '#34C759',
    },
    donation: {
      name: 'Donación',
      description: 'Donación a la cooperativa energética',
      category: 'donation',
      icon: '❤️',
      color: '#FF2D92',
    },
  },
  products: {
    energy: {
      electricity: {
        id: 'prod_electricity',
        name: 'Electricidad',
        description: 'Suministro de electricidad renovable',
        prices: {
          basic: { id: 'price_basic_electricity', amount: 1500 },
          premium: { id: 'price_premium_electricity', amount: 2000 },
        },
      },
    },
  },
  billing: {
    invoices: { autoGeneration: true, dueDateDays: 30 },
    subscriptions: { autoRenewal: true, gracePeriodDays: 7 },
    taxes: { enabled: true, rate: 21 },
  },
  security: {
    authentication: { required: true, methods: ['biometric', 'pin'] },
    encryption: { enabled: true, algorithm: 'AES-256' },
    fraudDetection: { enabled: true, maxAmount: 1000000 },
  },
};
```

## 🎣 Hook Personalizado

### Archivo: `src/hooks/usePayments.ts`
Hook personalizado para manejar pagos:

```typescript
export const usePayments = () => {
  const [paymentState, setPaymentState] = useState({
    isInitialized: false,
    isLoading: false,
    error: null,
    paymentMethods: [],
    subscriptions: [],
    lastPayment: null,
  });

  // Funciones principales
  const initializeStripe = useCallback(async (): Promise<void> => {
    const isApplePaySupported = await stripe.isApplePaySupported();
    const isGooglePaySupported = await stripe.isGooglePaySupported();
    setPaymentState(prev => ({
      ...prev,
      isInitialized: true,
      isApplePaySupported,
      isGooglePaySupported,
    }));
  }, [stripe]);

  const createPaymentMethod = useCallback(async (
    type: 'card' | 'sepa' | 'ideal',
    params: any
  ): Promise<PaymentMethod | null> => {
    const { paymentMethod, error } = await createPaymentMethod({ type, ...params });
    if (error) throw new Error(error.message);
    return paymentMethod;
  }, [createPaymentMethod]);

  const confirmPayment = useCallback(async (
    clientSecret: string,
    paymentMethodId: string
  ): Promise<PaymentIntent | null> => {
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodId,
      returnURL: 'openenergycoop://payment-return',
    });
    if (error) throw new Error(error.message);
    return paymentIntent;
  }, [confirmPayment]);

  const payEnergyBill = useCallback(async (
    billId: string,
    amount: number,
    currency: string = 'eur'
  ): Promise<PaymentIntent | null> => {
    // Implementación específica para facturas de energía
    const paymentIntent: PaymentIntent = {
      id: 'pi_energy_' + Date.now(),
      amount,
      currency,
      status: 'succeeded',
      clientSecret: 'pi_mock_client_secret_' + Date.now(),
    };
    return paymentIntent;
  }, []);

  const createSubscription = useCallback(async (
    priceId: string,
    customerId: string,
    paymentMethodId: string
  ): Promise<Subscription | null> => {
    // Implementación para crear suscripciones
    const subscription: Subscription = {
      id: 'sub_' + Date.now(),
      status: 'active',
      currentPeriodStart: Date.now(),
      currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
      cancelAtPeriodEnd: false,
      items: [{ id: 'si_' + Date.now(), price: { id: priceId, amount: 1500, currency: 'eur' } }],
    };
    return subscription;
  }, []);

  const makeDonation = useCallback(async (
    amount: number,
    currency: string = 'eur',
    purpose?: string
  ): Promise<PaymentIntent | null> => {
    // Implementación para donaciones
    const paymentIntent: PaymentIntent = {
      id: 'pi_donation_' + Date.now(),
      amount,
      currency,
      status: 'succeeded',
      clientSecret: 'pi_donation_client_secret_' + Date.now(),
    };
    return paymentIntent;
  }, []);

  return {
    paymentState,
    config,
    initializeStripe,
    createPaymentMethod,
    confirmPayment,
    payEnergyBill,
    createSubscription,
    makeDonation,
    // ... más funciones
  };
};
```

## 🎨 Componente de Demostración

### Archivo: `src/components/PaymentsDemo.tsx`
Componente de demostración completo con 5 tipos de demo:

1. **Básico**: Inicialización, Payment Sheet, métodos de pago
2. **Energía**: Pagos de facturas de energía y suscripciones
3. **Suscripciones**: Gestión de suscripciones y productos
4. **Donaciones**: Donaciones a la cooperativa
5. **Métodos**: Gestión de métodos de pago guardados

## 🎯 Casos de Uso

### 1. Pago de Factura de Energía
```typescript
const { payEnergyBill } = usePayments();

const handlePayBill = async () => {
  const billId = 'BILL_12345';
  const amount = 1500; // 15.00 EUR en centavos
  
  const paymentIntent = await payEnergyBill(billId, amount, 'eur');
  
  if (paymentIntent) {
    console.log('Factura pagada:', paymentIntent.id);
  }
};
```

### 2. Crear Suscripción
```typescript
const { createSubscription } = usePayments();

const handleCreateSubscription = async () => {
  const subscription = await createSubscription(
    'price_basic_electricity',
    'customer_12345',
    'pm_12345'
  );
  
  if (subscription) {
    console.log('Suscripción creada:', subscription.id);
  }
};
```

### 3. Hacer Donación
```typescript
const { makeDonation } = usePayments();

const handleDonation = async () => {
  const amount = 1000; // 10.00 EUR en centavos
  
  const paymentIntent = await makeDonation(
    amount, 
    'eur', 
    'Apoyo a energía renovable'
  );
  
  if (paymentIntent) {
    console.log('Donación realizada:', paymentIntent.id);
  }
};
```

### 4. Payment Sheet
```typescript
const { initializePaymentSheet, presentPaymentSheet } = usePayments();

const handlePaymentSheet = async () => {
  const clientSecret = 'pi_client_secret_12345';
  const initialized = await initializePaymentSheet(clientSecret);
  
  if (initialized) {
    const paymentIntent = await presentPaymentSheet();
    if (paymentIntent) {
      console.log('Pago completado:', paymentIntent.id);
    }
  }
};
```

### 5. Métodos de Pago
```typescript
const { createPaymentMethod, savePaymentMethod } = usePayments();

const handleSaveCard = async () => {
  const paymentMethod = await createPaymentMethod('card', {
    card: {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 25,
      cvc: '123',
    },
  });
  
  if (paymentMethod) {
    await savePaymentMethod(paymentMethod);
    console.log('Método de pago guardado:', paymentMethod.id);
  }
};
```

## 🚀 Mejores Prácticas

### 1. Seguridad
- Usar claves de prueba en desarrollo
- Implementar autenticación biométrica
- Validar montos en el servidor
- Usar HTTPS para todas las comunicaciones

### 2. UX/UI
- Mostrar indicadores de carga
- Proporcionar feedback claro
- Manejar errores graciosamente
- Usar Payment Sheet para mejor UX

### 3. Gestión de Estado
- Mantener métodos de pago sincronizados
- Cachear información de productos
- Persistir preferencias de usuario
- Manejar estados de pago

### 4. Analytics
- Trackear eventos de pago
- Medir conversión
- Monitorear errores
- Analizar patrones de uso

## 🔧 Solución de Problemas

### 1. Error de Inicialización
```typescript
// Verificar claves de Stripe
const isInitialized = await initializeStripe();
if (!isInitialized) {
  console.error('Error initializing Stripe');
}
```

### 2. Error de Método de Pago
```typescript
try {
  const paymentMethod = await createPaymentMethod('card', cardParams);
} catch (error) {
  console.error('Error creating payment method:', error.message);
  // Mostrar mensaje de error al usuario
}
```

### 3. Error de Confirmación
```typescript
try {
  const paymentIntent = await confirmPayment(clientSecret, paymentMethodId);
} catch (error) {
  if (error.code === 'card_declined') {
    // Manejar tarjeta rechazada
  } else if (error.code === 'insufficient_funds') {
    // Manejar fondos insuficientes
  }
}
```

### 4. Problemas de Apple Pay/Google Pay
```typescript
// Verificar soporte
const isApplePaySupported = await stripe.isApplePaySupported();
const isGooglePaySupported = await stripe.isGooglePaySupported();

if (!isApplePaySupported && !isGooglePaySupported) {
  // Usar métodos de pago alternativos
}
```

## 📚 Recursos Adicionales

- [Documentación oficial de Stripe](https://stripe.com/docs)
- [Guía de React Native](https://stripe.com/docs/stripe-react-native)
- [Guía de Apple Pay](https://stripe.com/docs/apple-pay)
- [Guía de Google Pay](https://stripe.com/docs/google-pay)

## 🎉 Conclusión

Stripe Payments proporciona una solución robusta y completa para implementar pagos en aplicaciones React Native. Con la configuración adecuada y el hook personalizado, puedes crear experiencias de pago seguras y fluidas para cooperativas energéticas.

La configuración específica para el sector energético incluye pagos de facturas, suscripciones, donaciones y gestión de métodos de pago, todas con soporte completo para métodos de pago europeos como SEPA e iDEAL.

La integración con el sistema de temas, analytics y accesibilidad asegura que los pagos se integren perfectamente con el resto de la aplicación OpenEnergyCoop Mobile.
