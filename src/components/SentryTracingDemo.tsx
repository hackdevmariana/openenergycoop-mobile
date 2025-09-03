import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Switch } from 'react-native-paper';
import { Icon } from '../config/icons';
import {
  useComponentTracing,
  useAsyncTracing,
  useNavigationTracing,
  usePerformanceTracing,
  useErrorTracing,
  useMetricsTracing,
  useUserEventTracing,
} from '../hooks/useSentryTracing';

const SentryTracingDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);

  // Hooks de tracing
  const { addSpan, finishSpan } = useComponentTracing('SentryTracingDemo');
  const { traceAsync } = useAsyncTracing();
  const { startNavigationTrace, finishNavigationTrace } = useNavigationTracing();
  const { tracePerformance } = usePerformanceTracing();
  const { traceError } = useErrorTracing();
  const { traceMetric } = useMetricsTracing();
  const { traceUserEvent } = useUserEventTracing();

  // Función para simular operación asíncrona
  const simulateAsyncOperation = async () => {
    const span = addSpan('Async Operation', 'async.operation', {
      operation: 'simulate_async',
      timestamp: new Date().toISOString(),
    });

    try {
      await traceAsync(
        'Operación Asíncrona Simulada',
        'async.simulation',
        async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return { success: true, data: 'Operación completada' };
        },
        { userInput: inputValue }
      );

      finishSpan(span, 'ok');
    } catch (error) {
      finishSpan(span, 'error');
      throw error;
    }
  };

  // Función para simular operación de rendimiento
  const simulatePerformanceOperation = async () => {
    await tracePerformance(
      'Operación de Rendimiento',
      'performance.simulation',
      async () => {
        // Simular trabajo pesado
        const start = Date.now();
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
          result += Math.random();
        }
        const end = Date.now();
        
        return {
          result,
          duration: end - start,
          iterations: 1000000,
        };
      },
      { complexity: 'high', iterations: 1000000 }
    );
  };

  // Función para simular error
  const simulateError = () => {
    try {
      throw new Error('Error simulado para testing de Sentry');
    } catch (error) {
      traceError(error as Error, {
        context: 'demo',
        userAction: 'simulate_error',
        inputValue,
      });
    }
  };

  // Función para simular navegación
  const simulateNavigation = () => {
    const transaction = startNavigationTrace('DemoScreen', {
      from: 'SentryTracingDemo',
      timestamp: new Date().toISOString(),
    });

    // Simular tiempo de navegación
    setTimeout(() => {
      finishNavigationTrace('ok');
    }, 1000);
  };

  // Función para registrar métrica
  const registerMetric = () => {
    const value = Math.random() * 100;
    traceMetric('demo_metric', value, 'percentage', {
      category: 'demo',
      source: 'user_action',
    });
  };

  // Función para registrar evento de usuario
  const registerUserEvent = () => {
    traceUserEvent('button_click', {
      button: 'demo_button',
      inputValue,
      timestamp: new Date().toISOString(),
    }, 'demo_user_123');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Title className="text-2xl font-bold mb-4 text-center">
          Sentry Tracing Demo
        </Title>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Configuración</Title>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-base">Tracing Habilitado</Text>
              <Switch
                value={isEnabled}
                onValueChange={setIsEnabled}
              />
            </View>
            <TextInput
              label="Valor de entrada para contexto"
              value={inputValue}
              onChangeText={setInputValue}
              mode="outlined"
              className="mb-4"
            />
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Operaciones Asíncronas</Title>
            <Paragraph className="mb-4">
              Simula operaciones asíncronas con tracing completo
            </Paragraph>
            <Button
              mode="contained"
              onPress={simulateAsyncOperation}
              className="mb-2"
              icon={() => <Icon name="play" size={20} color="white" />}
            >
              Simular Operación Asíncrona
            </Button>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Rendimiento</Title>
            <Paragraph className="mb-4">
              Monitorea el rendimiento de operaciones pesadas
            </Paragraph>
            <Button
              mode="contained"
              onPress={simulatePerformanceOperation}
              className="mb-2"
              icon={() => <Icon name="chart" size={20} color="white" />}
            >
              Simular Operación de Rendimiento
            </Button>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Navegación</Title>
            <Paragraph className="mb-4">
              Traza la navegación entre pantallas
            </Paragraph>
            <Button
              mode="contained"
              onPress={simulateNavigation}
              className="mb-2"
              icon={() => <Icon name="navigation" size={20} color="white" />}
            >
              Simular Navegación
            </Button>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Errores</Title>
            <Paragraph className="mb-4">
              Captura y traza errores con contexto completo
            </Paragraph>
            <Button
              mode="contained"
              onPress={simulateError}
              className="mb-2"
              icon={() => <Icon name="warning" size={20} color="white" />}
            >
              Simular Error
            </Button>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Métricas</Title>
            <Paragraph className="mb-4">
              Registra métricas personalizadas
            </Paragraph>
            <Button
              mode="contained"
              onPress={registerMetric}
              className="mb-2"
              icon={() => <Icon name="analytics" size={20} color="white" />}
            >
              Registrar Métrica
            </Button>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Eventos de Usuario</Title>
            <Paragraph className="mb-4">
              Traza eventos específicos del usuario
            </Paragraph>
            <Button
              mode="contained"
              onPress={registerUserEvent}
              className="mb-2"
              icon={() => <Icon name="user" size={20} color="white" />}
            >
              Registrar Evento de Usuario
            </Button>
          </Card.Content>
        </Card>

        <Card className="mb-4">
          <Card.Content>
            <Title className="text-lg mb-2">Información de Tracing</Title>
            <Paragraph className="mb-2">
              Este componente demuestra las capacidades avanzadas de tracing de Sentry:
            </Paragraph>
            <View className="ml-4">
              <Text className="text-sm mb-1">• Tracing de componentes</Text>
              <Text className="text-sm mb-1">• Operaciones asíncronas</Text>
              <Text className="text-sm mb-1">• Monitoreo de rendimiento</Text>
              <Text className="text-sm mb-1">• Tracking de navegación</Text>
              <Text className="text-sm mb-1">• Captura de errores con contexto</Text>
              <Text className="text-sm mb-1">• Métricas personalizadas</Text>
              <Text className="text-sm mb-1">• Eventos de usuario</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SentryTracingDemo;
