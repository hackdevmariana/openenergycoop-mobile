import { Platform } from 'react-native';

// Configuración para Stripe Payments
export const PAYMENTS_CONFIG = {
  // Configuración básica
  basic: {
    enabled: true,
    version: '0.51.0',
    platform: {
      ios: {
        supported: true,
        minVersion: '12.0',
        requiresPermissions: false,
      },
      android: {
        supported: true,
        minVersion: '21',
        requiresPermissions: false,
      },
    },
  },

  // Configuración de Stripe
  stripe: {
    // Configuración de claves (usar variables de entorno en producción)
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_...',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_...',
    
    // Configuración de entorno
    environment: {
      test: {
        publishableKey: process.env.STRIPE_TEST_PUBLISHABLE_KEY || 'pk_test_...',
        secretKey: process.env.STRIPE_TEST_SECRET_KEY || 'sk_test_...',
        webhookSecret: process.env.STRIPE_TEST_WEBHOOK_SECRET || 'whsec_...',
      },
      live: {
        publishableKey: process.env.STRIPE_LIVE_PUBLISHABLE_KEY || 'pk_live_...',
        secretKey: process.env.STRIPE_LIVE_SECRET_KEY || 'sk_live_...',
        webhookSecret: process.env.STRIPE_LIVE_WEBHOOK_SECRET || 'whsec_...',
      },
    },

    // Configuración de país y moneda
    country: 'ES',
    currency: 'eur',
    supportedCurrencies: ['eur', 'usd', 'gbp'],
    
    // Configuración de métodos de pago
    paymentMethods: {
      card: {
        enabled: true,
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        allowPrepaidCards: true,
        allowDebitCards: true,
      },
      sepa: {
        enabled: true,
        country: 'ES',
        mandate: {
          required: true,
          description: 'Pago automático de facturas de energía',
        },
      },
      ideal: {
        enabled: true,
        country: 'NL',
      },
      sofort: {
        enabled: true,
        country: 'DE',
      },
      applePay: {
        enabled: Platform.OS === 'ios',
        merchantId: process.env.APPLE_PAY_MERCHANT_ID || 'merchant.com.openenergycoop',
        country: 'ES',
        currency: 'EUR',
      },
      googlePay: {
        enabled: Platform.OS === 'android',
        merchantId: process.env.GOOGLE_PAY_MERCHANT_ID || 'merchant.com.openenergycoop',
        country: 'ES',
        currency: 'EUR',
      },
    },
  },

  // Configuración de tipos de pago
  paymentTypes: {
    // Facturas de energía
    energyBill: {
      name: 'Factura de Energía',
      description: 'Pago de factura de energía mensual',
      category: 'energy_bill',
      icon: '⚡',
      color: '#007AFF',
      requiresConfirmation: true,
      allowsPartialPayment: true,
      supportsRecurring: true,
      metadata: {
        type: 'energy_bill',
        service: 'electricity',
      },
    },

    // Suscripciones
    subscription: {
      name: 'Suscripción',
      description: 'Pago recurrente de servicios',
      category: 'subscription',
      icon: '🔄',
      color: '#34C759',
      requiresConfirmation: true,
      allowsPartialPayment: false,
      supportsRecurring: true,
      metadata: {
        type: 'subscription',
        service: 'energy_coop',
      },
    },

    // Donaciones
    donation: {
      name: 'Donación',
      description: 'Donación a la cooperativa energética',
      category: 'donation',
      icon: '❤️',
      color: '#FF2D92',
      requiresConfirmation: true,
      allowsPartialPayment: true,
      supportsRecurring: true,
      metadata: {
        type: 'donation',
        purpose: 'energy_coop_support',
      },
    },

    // Servicios adicionales
    additionalService: {
      name: 'Servicio Adicional',
      description: 'Pago de servicios adicionales',
      category: 'additional_service',
      icon: '🔧',
      color: '#FF9500',
      requiresConfirmation: true,
      allowsPartialPayment: false,
      supportsRecurring: false,
      metadata: {
        type: 'additional_service',
        service: 'maintenance',
      },
    },

    // Instalaciones
    installation: {
      name: 'Instalación',
      description: 'Pago de instalación de equipos',
      category: 'installation',
      icon: '🏠',
      color: '#5856D6',
      requiresConfirmation: true,
      allowsPartialPayment: true,
      supportsRecurring: false,
      metadata: {
        type: 'installation',
        service: 'solar_panel',
      },
    },

    // Mantenimiento
    maintenance: {
      name: 'Mantenimiento',
      description: 'Pago de servicios de mantenimiento',
      category: 'maintenance',
      icon: '🔧',
      color: '#AF52DE',
      requiresConfirmation: true,
      allowsPartialPayment: false,
      supportsRecurring: true,
      metadata: {
        type: 'maintenance',
        service: 'equipment',
      },
    },

    // Consultoría
    consulting: {
      name: 'Consultoría',
      description: 'Pago de servicios de consultoría energética',
      category: 'consulting',
      icon: '📊',
      color: '#007AFF',
      requiresConfirmation: true,
      allowsPartialPayment: false,
      supportsRecurring: false,
      metadata: {
        type: 'consulting',
        service: 'energy_audit',
      },
    },
  },

  // Configuración de productos y precios
  products: {
    // Productos de energía
    energy: {
      electricity: {
        id: 'prod_electricity',
        name: 'Electricidad',
        description: 'Suministro de electricidad renovable',
        unit: 'kWh',
        prices: {
          basic: {
            id: 'price_basic_electricity',
            amount: 1500, // 15.00 EUR
            currency: 'eur',
            interval: 'month',
            intervalCount: 1,
          },
          premium: {
            id: 'price_premium_electricity',
            amount: 2000, // 20.00 EUR
            currency: 'eur',
            interval: 'month',
            intervalCount: 1,
          },
        },
      },
      gas: {
        id: 'prod_gas',
        name: 'Gas Natural',
        description: 'Suministro de gas natural',
        unit: 'm³',
        prices: {
          basic: {
            id: 'price_basic_gas',
            amount: 1200, // 12.00 EUR
            currency: 'eur',
            interval: 'month',
            intervalCount: 1,
          },
        },
      },
    },

    // Servicios
    services: {
      maintenance: {
        id: 'prod_maintenance',
        name: 'Mantenimiento',
        description: 'Servicio de mantenimiento de equipos',
        unit: 'service',
        prices: {
          basic: {
            id: 'price_basic_maintenance',
            amount: 5000, // 50.00 EUR
            currency: 'eur',
            interval: 'year',
            intervalCount: 1,
          },
          premium: {
            id: 'price_premium_maintenance',
            amount: 8000, // 80.00 EUR
            currency: 'eur',
            interval: 'year',
            intervalCount: 1,
          },
        },
      },
      consulting: {
        id: 'prod_consulting',
        name: 'Consultoría Energética',
        description: 'Servicio de consultoría y auditoría energética',
        unit: 'hour',
        prices: {
          standard: {
            id: 'price_standard_consulting',
            amount: 7500, // 75.00 EUR
            currency: 'eur',
            interval: 'one_time',
            intervalCount: 1,
          },
        },
      },
    },

    // Instalaciones
    installations: {
      solarPanel: {
        id: 'prod_solar_panel',
        name: 'Instalación Solar',
        description: 'Instalación de paneles solares',
        unit: 'installation',
        prices: {
          basic: {
            id: 'price_basic_solar',
            amount: 500000, // 5,000.00 EUR
            currency: 'eur',
            interval: 'one_time',
            intervalCount: 1,
          },
          premium: {
            id: 'price_premium_solar',
            amount: 800000, // 8,000.00 EUR
            currency: 'eur',
            interval: 'one_time',
            intervalCount: 1,
          },
        },
      },
    },
  },

  // Configuración de facturación
  billing: {
    // Configuración de facturas
    invoices: {
      autoGeneration: true,
      dueDateDays: 30,
      lateFeePercentage: 5,
      reminderDays: [7, 3, 1],
      paymentMethods: ['card', 'sepa', 'ideal'],
    },

    // Configuración de suscripciones
    subscriptions: {
      autoRenewal: true,
      gracePeriodDays: 7,
      cancellationPolicy: {
        allowsImmediate: true,
        requiresNotice: false,
        refundPolicy: 'prorated',
      },
    },

    // Configuración de impuestos
    taxes: {
      enabled: true,
      rate: 21, // IVA en España
      country: 'ES',
      exemptions: ['donation'],
    },
  },

  // Configuración de seguridad
  security: {
    // Configuración de autenticación
    authentication: {
      required: true,
      methods: ['biometric', 'pin', 'password'],
      sessionTimeout: 30 * 60 * 1000, // 30 minutos
    },

    // Configuración de cifrado
    encryption: {
      enabled: true,
      algorithm: 'AES-256',
      keyRotation: true,
      rotationInterval: 90 * 24 * 60 * 60 * 1000, // 90 días
    },

    // Configuración de fraud detection
    fraudDetection: {
      enabled: true,
      rules: {
        maxAmount: 1000000, // 10,000 EUR
        maxDailyTransactions: 10,
        suspiciousPatterns: true,
      },
    },
  },

  // Configuración de UI/UX
  ui: {
    // Configuración de temas
    theme: {
      primaryColor: '#007AFF',
      secondaryColor: '#34C759',
      errorColor: '#FF3B30',
      warningColor: '#FF9500',
      successColor: '#34C759',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
    },

    // Configuración de componentes
    components: {
      paymentSheet: {
        enabled: true,
        style: 'automatic',
        appearance: {
          colors: {
            primary: '#007AFF',
            background: '#FFFFFF',
            componentBackground: '#F2F2F7',
            componentBorder: '#C7C7CC',
            componentDivider: '#C7C7CC',
            text: '#000000',
            textSecondary: '#8E8E93',
            textTertiary: '#C7C7CC',
            textPlaceholder: '#8E8E93',
          },
          shapes: {
            borderRadius: 8,
            shadow: 'medium',
          },
          typography: {
            fontFamily: 'System',
            fontSize: 16,
            fontWeight: 'regular',
          },
        },
      },
      cardField: {
        enabled: true,
        style: {
          borderWidth: 1,
          borderColor: '#C7C7CC',
          borderRadius: 8,
          fontSize: 16,
          placeholderColor: '#8E8E93',
        },
      },
    },

    // Configuración de animaciones
    animations: {
      enabled: true,
      duration: 300,
      easing: 'easeInOut',
    },
  },

  // Configuración de analytics
  analytics: {
    enabled: true,
    events: {
      paymentInitiated: 'payment_initiated',
      paymentCompleted: 'payment_completed',
      paymentFailed: 'payment_failed',
      paymentCancelled: 'payment_cancelled',
      subscriptionCreated: 'subscription_created',
      subscriptionCancelled: 'subscription_cancelled',
      invoiceGenerated: 'invoice_generated',
      invoicePaid: 'invoice_paid',
      refundRequested: 'refund_requested',
      refundProcessed: 'refund_processed',
    },
  },

  // Configuración de accesibilidad
  accessibility: {
    enabled: true,
    features: {
      screenReader: true,
      voiceOver: true,
      talkBack: true,
      highContrast: true,
      largeText: true,
    },
    announcements: {
      paymentInitiated: 'Pago iniciado',
      paymentCompleted: 'Pago completado exitosamente',
      paymentFailed: 'Error en el pago',
      paymentCancelled: 'Pago cancelado',
    },
  },

  // Configuración de debugging
  debugging: {
    enabled: false,
    features: {
      logPayments: false,
      logErrors: true,
      logAnalytics: false,
      logNetwork: false,
    },
    logging: {
      level: 'error', // 'debug' | 'info' | 'warn' | 'error'
      includeTimestamps: true,
      includeStackTraces: false,
    },
  },
};

// Configuraciones específicas por plataforma
export const PLATFORM_PAYMENTS_CONFIG = {
  ios: {
    ...PAYMENTS_CONFIG,
    stripe: {
      ...PAYMENTS_CONFIG.stripe,
      paymentMethods: {
        ...PAYMENTS_CONFIG.stripe.paymentMethods,
        applePay: {
          ...PAYMENTS_CONFIG.stripe.paymentMethods.applePay,
          enabled: true,
        },
        googlePay: {
          ...PAYMENTS_CONFIG.stripe.paymentMethods.googlePay,
          enabled: false,
        },
      },
    },
  },
  android: {
    ...PAYMENTS_CONFIG,
    stripe: {
      ...PAYMENTS_CONFIG.stripe,
      paymentMethods: {
        ...PAYMENTS_CONFIG.stripe.paymentMethods,
        applePay: {
          ...PAYMENTS_CONFIG.stripe.paymentMethods.applePay,
          enabled: false,
        },
        googlePay: {
          ...PAYMENTS_CONFIG.stripe.paymentMethods.googlePay,
          enabled: true,
        },
      },
    },
  },
};

// Función para obtener configuración según plataforma
export const getPlatformPaymentsConfig = () => {
  return PLATFORM_PAYMENTS_CONFIG[Platform.OS] || PAYMENTS_CONFIG;
};

// Función para obtener configuración completa
export const getCompletePaymentsConfig = () => {
  return getPlatformPaymentsConfig();
};

// Exportar configuración por defecto
export const paymentsConfig = getCompletePaymentsConfig();
