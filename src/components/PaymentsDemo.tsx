import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button, FAB, Switch } from 'react-native-paper';
import { StripeProvider, CardField } from '@stripe/stripe-react-native';
import { useTheme } from '../hooks/useTheme';
import { usePayments, PaymentMethod } from '../hooks/usePayments';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';
import { Platform } from 'react-native';

const PaymentsDemo: React.FC = () => {
  const { theme } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    paymentState,
    config,
    initializeStripe,
    createPaymentMethod,
    confirmPayment,
    initializePaymentSheet,
    presentPaymentSheet,
    payEnergyBill,
    createSubscription,
    cancelSubscription,
    makeDonation,
    getSavedPaymentMethods,
    savePaymentMethod,
    removePaymentMethod,
  } = usePayments();

  const [currentDemo, setCurrentDemo] = useState<'basic' | 'energy' | 'subscription' | 'donation' | 'methods'>('basic');
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [amount, setAmount] = useState('15.00');
  const [cardDetails, setCardDetails] = useState({
    number: '4242424242424242',
    expMonth: '12',
    expYear: '25',
    cvc: '123',
  });

  const handleDemoChange = (demo: typeof currentDemo) => {
    trackUserAction('payments_demo_changed', { demo });
    setCurrentDemo(demo);
  };

  const handleInitializeStripe = async () => {
    trackUserAction('payments_initialize_stripe');
    await initializeStripe();
    Alert.alert('Éxito', 'Stripe inicializado correctamente');
  };

  const handleCreatePaymentMethod = async () => {
    trackUserAction('payments_create_method');
    try {
      const paymentMethod = await createPaymentMethod('card', {
        card: {
          number: cardDetails.number,
          expMonth: parseInt(cardDetails.expMonth),
          expYear: parseInt(cardDetails.expYear),
          cvc: cardDetails.cvc,
        },
      });

      if (paymentMethod) {
        Alert.alert('Éxito', `Método de pago creado: ${paymentMethod.id}`);
        await savePaymentMethod(paymentMethod);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al crear método de pago');
    }
  };

  const handlePayEnergyBill = async () => {
    trackUserAction('payments_pay_energy_bill');
    try {
      const billId = 'BILL_' + Date.now();
      const amountInCents = Math.round(parseFloat(amount) * 100);
      
      const paymentIntent = await payEnergyBill(billId, amountInCents, 'eur');
      
      if (paymentIntent) {
        Alert.alert('Éxito', `Factura pagada: ${paymentIntent.id}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al pagar factura');
    }
  };

  const handleCreateSubscription = async () => {
    trackUserAction('payments_create_subscription');
    try {
      const subscription = await createSubscription(
        'price_basic_electricity',
        'customer_' + Date.now(),
        'pm_' + Date.now()
      );
      
      if (subscription) {
        Alert.alert('Éxito', `Suscripción creada: ${subscription.id}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al crear suscripción');
    }
  };

  const handleCancelSubscription = async () => {
    trackUserAction('payments_cancel_subscription');
    try {
      if (paymentState.subscriptions.length > 0) {
        const subscriptionId = paymentState.subscriptions[0].id;
        const success = await cancelSubscription(subscriptionId);
        
        if (success) {
          Alert.alert('Éxito', 'Suscripción cancelada');
        }
      } else {
        Alert.alert('Info', 'No hay suscripciones para cancelar');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al cancelar suscripción');
    }
  };

  const handleMakeDonation = async () => {
    trackUserAction('payments_make_donation');
    try {
      const amountInCents = Math.round(parseFloat(amount) * 100);
      
      const paymentIntent = await makeDonation(amountInCents, 'eur', 'Apoyo a energía renovable');
      
      if (paymentIntent) {
        Alert.alert('Éxito', `Donación realizada: ${paymentIntent.id}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al realizar donación');
    }
  };

  const handlePaymentSheet = async () => {
    trackUserAction('payments_payment_sheet');
    try {
      const clientSecret = 'pi_mock_client_secret_' + Date.now();
      const initialized = await initializePaymentSheet(clientSecret);
      
      if (initialized) {
        const paymentIntent = await presentPaymentSheet();
        
        if (paymentIntent) {
          Alert.alert('Éxito', `Pago completado: ${paymentIntent.id}`);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Error con Payment Sheet');
    }
  };

  const handleRemovePaymentMethod = async (methodId: string) => {
    trackUserAction('payments_remove_method');
    try {
      const success = await removePaymentMethod(methodId);
      
      if (success) {
        Alert.alert('Éxito', 'Método de pago eliminado');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar método de pago');
    }
  };

  const renderBasicDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Funciones Básicas</Title>
          <Paragraph className="mb-4">
            Funciones básicas de Stripe Payments:
          </Paragraph>
          
          <View className="space-y-3">
            <Button
              mode="contained"
              onPress={handleInitializeStripe}
              className="bg-primary"
            >
              Inicializar Stripe
            </Button>
            
            <Button
              mode="outlined"
              onPress={handlePaymentSheet}
              className="border-primary"
            >
              Payment Sheet
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleCreatePaymentMethod}
              className="border-primary"
            >
              Crear Método de Pago
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderEnergyDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Pagos de Energía</Title>
          <Paragraph className="mb-4">
            Pagos específicos para facturas de energía:
          </Paragraph>
          
          <View className="space-y-3">
            <View>
              <Text className="text-text-secondary mb-2">Cantidad (EUR):</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="15.00"
                keyboardType="numeric"
                className="border border-gray-300 rounded-md p-2 bg-white"
              />
            </View>
            
            <Button
              mode="contained"
              onPress={handlePayEnergyBill}
              className="bg-primary"
            >
              Pagar Factura de Energía
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleCreateSubscription}
              className="border-primary"
            >
              Crear Suscripción
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleCancelSubscription}
              className="border-primary"
            >
              Cancelar Suscripción
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderSubscriptionDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Suscripciones</Title>
          <Paragraph className="mb-4">
            Gestión de suscripciones y pagos recurrentes:
          </Paragraph>
          
          <View className="space-y-3">
            {Object.entries(config.products.energy).map(([key, product]) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedPaymentType(key)}
                className={`p-3 rounded-md ${
                  selectedPaymentType === key ? 'bg-primary' : 'bg-surface-variant'
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">⚡</Text>
                  <View className="flex-1">
                    <Text className={`font-bold ${
                      selectedPaymentType === key ? 'text-white' : 'text-text-primary'
                    }`}>
                      {product.name}
                    </Text>
                    <Text className={`text-sm ${
                      selectedPaymentType === key ? 'text-white' : 'text-text-secondary'
                    }`}>
                      {product.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            <Button
              mode="contained"
              onPress={handleCreateSubscription}
              className="bg-primary"
              disabled={!selectedPaymentType}
            >
              Crear Suscripción Seleccionada
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderDonationDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Donaciones</Title>
          <Paragraph className="mb-4">
            Donaciones a la cooperativa energética:
          </Paragraph>
          
          <View className="space-y-3">
            <View>
              <Text className="text-text-secondary mb-2">Cantidad (EUR):</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="10.00"
                keyboardType="numeric"
                className="border border-gray-300 rounded-md p-2 bg-white"
              />
            </View>
            
            <Button
              mode="contained"
              onPress={handleMakeDonation}
              className="bg-primary"
            >
              Hacer Donación
            </Button>
            
            <View className="space-y-2">
              <Text className="text-text-primary font-bold">Cantidades Sugeridas:</Text>
              <View className="flex-row flex-wrap gap-2">
                {[5, 10, 25, 50, 100].map((suggestedAmount) => (
                  <TouchableOpacity
                    key={suggestedAmount}
                    onPress={() => setAmount(suggestedAmount.toString())}
                    className="px-3 py-2 bg-surface-variant rounded-md"
                  >
                    <Text className="text-text-primary">€{suggestedAmount}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderMethodsDemo = () => (
    <View>
      <Card className="bg-surface rounded-lg shadow-sm mb-4">
        <Card.Content>
          <Title>Métodos de Pago</Title>
          <Paragraph className="mb-4">
            Gestión de métodos de pago guardados:
          </Paragraph>
          
          <View className="space-y-3">
            <View>
              <Text className="text-text-secondary mb-2">Número de Tarjeta:</Text>
              <TextInput
                value={cardDetails.number}
                onChangeText={(text) => setCardDetails(prev => ({ ...prev, number: text }))}
                placeholder="4242424242424242"
                keyboardType="numeric"
                className="border border-gray-300 rounded-md p-2 bg-white"
              />
            </View>
            
            <View className="flex-row space-x-2">
              <View className="flex-1">
                <Text className="text-text-secondary mb-2">Mes:</Text>
                <TextInput
                  value={cardDetails.expMonth}
                  onChangeText={(text) => setCardDetails(prev => ({ ...prev, expMonth: text }))}
                  placeholder="12"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md p-2 bg-white"
                />
              </View>
              <View className="flex-1">
                <Text className="text-text-secondary mb-2">Año:</Text>
                <TextInput
                  value={cardDetails.expYear}
                  onChangeText={(text) => setCardDetails(prev => ({ ...prev, expYear: text }))}
                  placeholder="25"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md p-2 bg-white"
                />
              </View>
              <View className="flex-1">
                <Text className="text-text-secondary mb-2">CVC:</Text>
                <TextInput
                  value={cardDetails.cvc}
                  onChangeText={(text) => setCardDetails(prev => ({ ...prev, cvc: text }))}
                  placeholder="123"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md p-2 bg-white"
                />
              </View>
            </View>
            
            <Button
              mode="contained"
              onPress={handleCreatePaymentMethod}
              className="bg-primary"
            >
              Guardar Método de Pago
            </Button>
            
            <View className="space-y-2">
              <Text className="text-text-primary font-bold">Métodos Guardados:</Text>
              {paymentState.paymentMethods.map((method: PaymentMethod) => (
                <View key={method.id} className="p-3 bg-surface-variant rounded-md">
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-text-primary font-bold">
                        {method.card ? `${method.card.brand} •••• ${method.card.last4}` : 'SEPA'}
                      </Text>
                      <Text className="text-text-secondary text-sm">
                        {method.card ? `Expira ${method.card.expMonth}/${method.card.expYear}` : method.sepa?.last4}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleRemovePaymentMethod(method.id)}
                      className="px-3 py-1 bg-red-500 rounded-md"
                    >
                      <Text className="text-white">Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case 'basic':
        return renderBasicDemo();
      case 'energy':
        return renderEnergyDemo();
      case 'subscription':
        return renderSubscriptionDemo();
      case 'donation':
        return renderDonationDemo();
      case 'methods':
        return renderMethodsDemo();
      default:
        return renderBasicDemo();
    }
  };

  return (
    <StripeProvider
      publishableKey={config.stripe.publishableKey}
      merchantIdentifier={config.stripe.paymentMethods.applePay.merchantId}
    >
      <Screen style={{ flex: 1 }}>
        <ScrollView className="flex-1 bg-background">
          <View className="p-4">
            {/* Header */}
            <View className="mb-6">
              <Title className="text-2xl font-bold mb-2">
                Stripe Payments Demo
              </Title>
              <Paragraph className="text-text-secondary">
                Demostración de pagos con Stripe para cooperativas energéticas
              </Paragraph>
            </View>

            {/* Información del sistema */}
            <Card className="bg-surface rounded-lg shadow-sm mb-4">
              <Card.Content>
                <Title>Información del Sistema</Title>
                <Paragraph className="mb-4">
                  Configuración actual de Stripe Payments
                </Paragraph>
                
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Versión:</Text>
                    <Text className="text-text-primary font-bold">{config.basic.version}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Plataforma:</Text>
                    <Text className="text-text-primary font-bold">{Platform.OS}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Inicializado:</Text>
                    <Text className="text-success font-bold">
                      {paymentState.isInitialized ? 'Sí' : 'No'}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Apple Pay:</Text>
                    <Text className="text-success font-bold">
                      {paymentState.isApplePaySupported ? 'Soportado' : 'No soportado'}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Google Pay:</Text>
                    <Text className="text-success font-bold">
                      {paymentState.isGooglePaySupported ? 'Soportado' : 'No soportado'}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Métodos Guardados:</Text>
                    <Text className="text-text-primary font-bold">
                      {paymentState.paymentMethods.length}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-text-secondary">Suscripciones:</Text>
                    <Text className="text-text-primary font-bold">
                      {paymentState.subscriptions.length}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Selector de demostración */}
            <Card className="bg-surface rounded-lg shadow-sm mb-4">
              <Card.Content>
                <Title>Tipo de Demostración</Title>
                <Paragraph className="mb-4">
                  Selecciona el tipo de demostración de pagos:
                </Paragraph>
                
                <View className="flex-row flex-wrap gap-2">
                  {(['basic', 'energy', 'subscription', 'donation', 'methods'] as const).map((demo) => (
                    <TouchableOpacity
                      key={demo}
                      onPress={() => handleDemoChange(demo)}
                      className={`px-3 py-2 rounded-md ${
                        currentDemo === demo ? 'bg-primary' : 'bg-surface-variant'
                      }`}
                    >
                      <Text className={currentDemo === demo ? 'text-white' : 'text-text-primary'}>
                        {demo.charAt(0).toUpperCase() + demo.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Card.Content>
            </Card>

            {/* Demostración actual */}
            <Card className="bg-surface rounded-lg shadow-sm mb-4">
              <Card.Content>
                <Title>Demostración: {currentDemo.charAt(0).toUpperCase() + currentDemo.slice(1)}</Title>
                <Paragraph className="mb-4">
                  Funciones disponibles para este tipo de pago:
                </Paragraph>
                
                {renderCurrentDemo()}
              </Card.Content>
            </Card>

            {/* Configuración de métodos de pago */}
            <Card className="bg-surface rounded-lg shadow-sm mb-4">
              <Card.Content>
                <Title>Métodos de Pago Soportados</Title>
                <Paragraph className="mb-4">
                  Configuración de métodos de pago disponibles:
                </Paragraph>
                
                <View className="space-y-4">
                  {Object.entries(config.stripe.paymentMethods).map(([key, method]) => (
                    <View key={key} className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Text className="text-lg mr-2">
                          {key === 'card' ? '💳' : 
                           key === 'sepa' ? '🏦' : 
                           key === 'ideal' ? '🇳🇱' : 
                           key === 'sofort' ? '🇩🇪' : 
                           key === 'applePay' ? '🍎' : 
                           key === 'googlePay' ? '🤖' : '💳'}
                        </Text>
                        <Text className="text-text-primary font-bold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                      </View>
                      <Switch
                        value={method.enabled}
                        onValueChange={() => {}}
                        disabled
                      />
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>

            {/* Footer */}
            <View className="mt-6 p-4 bg-surface rounded-md">
              <Paragraph className="text-center">
                Stripe Payments
              </Paragraph>
              <Paragraph className="text-center mt-2">
                Pagos seguros para cooperativas energéticas
              </Paragraph>
              <Paragraph className="text-center mt-2 text-sm text-text-secondary">
                Versión {config.basic.version}
              </Paragraph>
            </View>
          </View>
        </ScrollView>

        {/* FAB para pago rápido */}
        <FAB
          icon="credit-card"
          onPress={handlePaymentSheet}
          className="absolute bottom-4 right-4"
          style={{ backgroundColor: '#007AFF' }}
        />
      </Screen>
    </StripeProvider>
  );
};

export default PaymentsDemo;
