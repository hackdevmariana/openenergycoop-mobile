import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import {
  StripeProvider,
  useStripe,
  CardField,
  useConfirmPayment,
  useConfirmSetupIntent,
  useCreatePaymentMethod,
  useCreateToken,
  useHandleNextAction,
  usePaymentSheet,
  useStripeAccount,
  useVerifyMicrodeposits,
} from '@stripe/stripe-react-native';
import { paymentsConfig, getPlatformPaymentsConfig } from '../config/payments';
import { usePostHogAnalytics } from './usePostHogAnalytics';
import { storageService } from '../services/storage';

// Tipos para el hook de pagos
export interface PaymentData {
  type: string;
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  sepa?: {
    last4: string;
    bankCode: string;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethodId?: string;
  clientSecret: string;
}

export interface Subscription {
  id: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  items: Array<{
    id: string;
    price: {
      id: string;
      amount: number;
      currency: string;
    };
  }>;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: number;
  paidAt?: number;
  items: Array<{
    id: string;
    description: string;
    amount: number;
    quantity: number;
  }>;
}

export const usePayments = () => {
  // Estado del hook
  const [paymentState, setPaymentState] = useState({
    isInitialized: false,
    isLoading: false,
    error: null as string | null,
    isApplePaySupported: false,
    isGooglePaySupported: false,
    paymentMethods: [] as PaymentMethod[],
    subscriptions: [] as Subscription[],
    invoices: [] as Invoice[],
    lastPayment: null as PaymentIntent | null,
  });

  // Referencias
  const stripeRef = useRef<any>(null);

  // Hooks de Stripe
  const stripe = useStripe();
  const { confirmPayment, loading: confirmLoading } = useConfirmPayment();
  const { confirmSetupIntent, loading: setupLoading } = useConfirmSetupIntent();
  const { createPaymentMethod, loading: createMethodLoading } = useCreatePaymentMethod();
  const { createToken, loading: createTokenLoading } = useCreateToken();
  const { handleNextAction, loading: nextActionLoading } = useHandleNextAction();
  const { initPaymentSheet, presentPaymentSheet, loading: sheetLoading } = usePaymentSheet();
  const { createStripeAccount, loading: accountLoading } = useStripeAccount();
  const { verifyMicrodeposits, loading: verifyLoading } = useVerifyMicrodeposits();

  // Hooks
  const { trackUserAction } = usePostHogAnalytics();

  // Configuración
  const config = useMemo(() => {
    return getPlatformPaymentsConfig();
  }, []);

  // Función para inicializar Stripe
  const initializeStripe = useCallback(async (): Promise<void> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true }));

      // Verificar soporte de Apple Pay
      const isApplePaySupported = await stripe.isApplePaySupported();
      
      // Verificar soporte de Google Pay
      const isGooglePaySupported = await stripe.isGooglePaySupported();

      setPaymentState(prev => ({
        ...prev,
        isInitialized: true,
        isLoading: false,
        isApplePaySupported,
        isGooglePaySupported,
      }));

      trackUserAction('payments_initialized', {
        applePaySupported: isApplePaySupported,
        googlePaySupported: isGooglePaySupported,
      });
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al inicializar Stripe',
        isLoading: false,
      }));
    }
  }, [stripe, trackUserAction]);

  // Función para crear método de pago
  const createPaymentMethod = useCallback(async (
    type: 'card' | 'sepa' | 'ideal' | 'sofort',
    params: any
  ): Promise<PaymentMethod | null> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true }));

      const { paymentMethod, error } = await createPaymentMethod({
        type,
        ...params,
      });

      if (error) {
        throw new Error(error.message);
      }

      const newPaymentMethod: PaymentMethod = {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card,
        sepa: paymentMethod.sepa,
      };

      setPaymentState(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, newPaymentMethod],
        isLoading: false,
      }));

      trackUserAction('payment_method_created', {
        type,
        methodId: paymentMethod.id,
      });

      return newPaymentMethod;
    } catch (error) {
      console.error('Error creating payment method:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al crear método de pago',
        isLoading: false,
      }));
      return null;
    }
  }, [createPaymentMethod, trackUserAction]);

  // Función para confirmar pago
  const confirmPayment = useCallback(async (
    clientSecret: string,
    paymentMethodId: string,
    data?: PaymentData
  ): Promise<PaymentIntent | null> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true }));

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodId,
        returnURL: 'openenergycoop://payment-return',
      });

      if (error) {
        throw new Error(error.message);
      }

      const paymentIntentData: PaymentIntent = {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethodId: paymentIntent.paymentMethodId,
        clientSecret: paymentIntent.clientSecret,
      };

      setPaymentState(prev => ({
        ...prev,
        lastPayment: paymentIntentData,
        isLoading: false,
      }));

      trackUserAction('payment_confirmed', {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      });

      return paymentIntentData;
    } catch (error) {
      console.error('Error confirming payment:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al confirmar pago',
        isLoading: false,
      }));
      return null;
    }
  }, [confirmPayment, trackUserAction]);

  // Función para crear token
  const createToken = useCallback(async (
    type: 'card' | 'bank_account',
    params: any
  ): Promise<string | null> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true }));

      const { token, error } = await createToken({
        type,
        ...params,
      });

      if (error) {
        throw new Error(error.message);
      }

      setPaymentState(prev => ({ ...prev, isLoading: false }));

      trackUserAction('token_created', {
        type,
        tokenId: token.id,
      });

      return token.id;
    } catch (error) {
      console.error('Error creating token:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al crear token',
        isLoading: false,
      }));
      return null;
    }
  }, [createToken, trackUserAction]);

  // Función para manejar siguiente acción
  const handleNextAction = useCallback(async (
    clientSecret: string
  ): Promise<PaymentIntent | null> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true }));

      const { paymentIntent, error } = await handleNextAction(clientSecret);

      if (error) {
        throw new Error(error.message);
      }

      const paymentIntentData: PaymentIntent = {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethodId: paymentIntent.paymentMethodId,
        clientSecret: paymentIntent.clientSecret,
      };

      setPaymentState(prev => ({
        ...prev,
        lastPayment: paymentIntentData,
        isLoading: false,
      }));

      return paymentIntentData;
    } catch (error) {
      console.error('Error handling next action:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al manejar siguiente acción',
        isLoading: false,
      }));
      return null;
    }
  }, [handleNextAction]);

  // Función para inicializar Payment Sheet
  const initializePaymentSheet = useCallback(async (
    clientSecret: string,
    merchantDisplayName: string = 'OpenEnergyCoop'
  ): Promise<boolean> => {
    try {
      const { error } = await initPaymentSheet({
        merchantDisplayName,
        clientSecret,
        defaultBillingDetails: {
          name: 'Usuario OpenEnergyCoop',
        },
        appearance: config.ui.components.paymentSheet.appearance,
        returnURL: 'openenergycoop://payment-return',
      });

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      console.error('Error initializing payment sheet:', error);
      return false;
    }
  }, [initPaymentSheet, config]);

  // Función para presentar Payment Sheet
  const presentPaymentSheet = useCallback(async (): Promise<PaymentIntent | null> => {
    try {
      setPaymentState(prev => ({ ...prev, isLoading: true }));

      const { error } = await presentPaymentSheet();

      if (error) {
        throw new Error(error.message);
      }

      // En un caso real, obtendrías el PaymentIntent del servidor
      const mockPaymentIntent: PaymentIntent = {
        id: 'pi_mock_' + Date.now(),
        amount: 0,
        currency: 'eur',
        status: 'succeeded',
        clientSecret: '',
      };

      setPaymentState(prev => ({
        ...prev,
        lastPayment: mockPaymentIntent,
        isLoading: false,
      }));

      trackUserAction('payment_sheet_completed', {
        paymentIntentId: mockPaymentIntent.id,
      });

      return mockPaymentIntent;
    } catch (error) {
      console.error('Error presenting payment sheet:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al presentar hoja de pago',
        isLoading: false,
      }));
      return null;
    }
  }, [presentPaymentSheet, trackUserAction]);

  // Función para pago de factura de energía
  const payEnergyBill = useCallback(async (
    billId: string,
    amount: number,
    currency: string = 'eur'
  ): Promise<PaymentIntent | null> => {
    try {
      trackUserAction('energy_bill_payment_initiated', {
        billId,
        amount,
        currency,
      });

      // En un caso real, crearías el PaymentIntent en el servidor
      const clientSecret = 'pi_mock_client_secret_' + Date.now();
      
      const paymentData: PaymentData = {
        type: 'energy_bill',
        amount,
        currency,
        description: `Pago de factura de energía ${billId}`,
        metadata: {
          billId,
          type: 'energy_bill',
          service: 'electricity',
        },
      };

      // Simular confirmación de pago
      const paymentIntent: PaymentIntent = {
        id: 'pi_energy_' + Date.now(),
        amount,
        currency,
        status: 'succeeded',
        clientSecret,
      };

      setPaymentState(prev => ({
        ...prev,
        lastPayment: paymentIntent,
      }));

      trackUserAction('energy_bill_payment_completed', {
        billId,
        amount,
        currency,
        paymentIntentId: paymentIntent.id,
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error paying energy bill:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al pagar factura de energía',
      }));
      return null;
    }
  }, [trackUserAction]);

  // Función para crear suscripción
  const createSubscription = useCallback(async (
    priceId: string,
    customerId: string,
    paymentMethodId: string
  ): Promise<Subscription | null> => {
    try {
      trackUserAction('subscription_creation_initiated', {
        priceId,
        customerId,
      });

      // En un caso real, crearías la suscripción en el servidor
      const subscription: Subscription = {
        id: 'sub_' + Date.now(),
        status: 'active',
        currentPeriodStart: Date.now(),
        currentPeriodEnd: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 días
        cancelAtPeriodEnd: false,
        items: [{
          id: 'si_' + Date.now(),
          price: {
            id: priceId,
            amount: 1500, // 15.00 EUR
            currency: 'eur',
          },
        }],
      };

      setPaymentState(prev => ({
        ...prev,
        subscriptions: [...prev.subscriptions, subscription],
      }));

      trackUserAction('subscription_created', {
        subscriptionId: subscription.id,
        priceId,
        customerId,
      });

      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al crear suscripción',
      }));
      return null;
    }
  }, [trackUserAction]);

  // Función para cancelar suscripción
  const cancelSubscription = useCallback(async (
    subscriptionId: string
  ): Promise<boolean> => {
    try {
      trackUserAction('subscription_cancellation_initiated', {
        subscriptionId,
      });

      // En un caso real, cancelarías la suscripción en el servidor
      setPaymentState(prev => ({
        ...prev,
        subscriptions: prev.subscriptions.map(sub =>
          sub.id === subscriptionId
            ? { ...sub, cancelAtPeriodEnd: true }
            : sub
        ),
      }));

      trackUserAction('subscription_cancelled', {
        subscriptionId,
      });

      return true;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al cancelar suscripción',
      }));
      return false;
    }
  }, [trackUserAction]);

  // Función para hacer donación
  const makeDonation = useCallback(async (
    amount: number,
    currency: string = 'eur',
    purpose?: string
  ): Promise<PaymentIntent | null> => {
    try {
      trackUserAction('donation_initiated', {
        amount,
        currency,
        purpose,
      });

      // En un caso real, crearías el PaymentIntent en el servidor
      const paymentIntent: PaymentIntent = {
        id: 'pi_donation_' + Date.now(),
        amount,
        currency,
        status: 'succeeded',
        clientSecret: 'pi_donation_client_secret_' + Date.now(),
      };

      setPaymentState(prev => ({
        ...prev,
        lastPayment: paymentIntent,
      }));

      trackUserAction('donation_completed', {
        amount,
        currency,
        purpose,
        paymentIntentId: paymentIntent.id,
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error making donation:', error);
      setPaymentState(prev => ({
        ...prev,
        error: 'Error al realizar donación',
      }));
      return null;
    }
  }, [trackUserAction]);

  // Función para obtener métodos de pago guardados
  const getSavedPaymentMethods = useCallback(async (): Promise<PaymentMethod[]> => {
    try {
      // En un caso real, obtendrías los métodos de pago del servidor
      const savedMethods = await storageService.getItem('saved_payment_methods');
      return savedMethods || [];
    } catch (error) {
      console.error('Error getting saved payment methods:', error);
      return [];
    }
  }, []);

  // Función para guardar método de pago
  const savePaymentMethod = useCallback(async (
    paymentMethod: PaymentMethod
  ): Promise<boolean> => {
    try {
      const savedMethods = await getSavedPaymentMethods();
      const updatedMethods = [...savedMethods, paymentMethod];
      
      await storageService.setItem('saved_payment_methods', updatedMethods);
      
      setPaymentState(prev => ({
        ...prev,
        paymentMethods: updatedMethods,
      }));

      return true;
    } catch (error) {
      console.error('Error saving payment method:', error);
      return false;
    }
  }, [getSavedPaymentMethods]);

  // Función para eliminar método de pago
  const removePaymentMethod = useCallback(async (
    paymentMethodId: string
  ): Promise<boolean> => {
    try {
      const savedMethods = await getSavedPaymentMethods();
      const updatedMethods = savedMethods.filter(method => method.id !== paymentMethodId);
      
      await storageService.setItem('saved_payment_methods', updatedMethods);
      
      setPaymentState(prev => ({
        ...prev,
        paymentMethods: updatedMethods,
      }));

      return true;
    } catch (error) {
      console.error('Error removing payment method:', error);
      return false;
    }
  }, [getSavedPaymentMethods]);

  // Efecto para inicializar Stripe
  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  return {
    // Estado
    paymentState,
    
    // Configuración
    config,
    
    // Funciones de inicialización
    initializeStripe,
    
    // Funciones de métodos de pago
    createPaymentMethod,
    getSavedPaymentMethods,
    savePaymentMethod,
    removePaymentMethod,
    
    // Funciones de pago
    confirmPayment,
    createToken,
    handleNextAction,
    
    // Funciones de Payment Sheet
    initializePaymentSheet,
    presentPaymentSheet,
    
    // Funciones específicas
    payEnergyBill,
    createSubscription,
    cancelSubscription,
    makeDonation,
    
    // Estados de carga
    confirmLoading,
    setupLoading,
    createMethodLoading,
    createTokenLoading,
    nextActionLoading,
    sheetLoading,
    accountLoading,
    verifyLoading,
  };
};
