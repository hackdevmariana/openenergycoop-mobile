/**
 * OpenEnergyCoop Mobile App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './src/styles/global.css';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { PaperProvider } from './src/providers/PaperProvider';
import AppNavigator from './src/navigation/AppNavigator';
import SentryErrorBoundary from './src/components/SentryErrorBoundary';
import { initializeStorage, verifyStorageIntegrity } from './src/services/storageInit';
import { initSentry } from './src/config/sentry';
import { useAppStore } from './src/stores/appStore';
import { useLoadTheme } from './src/hooks/useTheme';

function App() {
  const [isStorageReady, setIsStorageReady] = useState(false);
  const { loadFromStorage, setInitialized } = useAppStore();
  const { isLoading: isThemeLoading } = useLoadTheme();

  // Inicializar Sentry al inicio de la aplicación
  useEffect(() => {
    try {
      initSentry();
      console.log('✅ Sentry inicializado correctamente');
    } catch (error) {
      console.error('❌ Error inicializando Sentry:', error);
    }
  }, []);

  // Inicializar AsyncStorage al inicio de la aplicación
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Iniciando aplicación...');
        
        // Inicializar AsyncStorage
        const storageInitialized = await initializeStorage();
        if (!storageInitialized) {
          console.error('❌ Error inicializando AsyncStorage');
          return;
        }
        
        // Verificar integridad del almacenamiento
        await verifyStorageIntegrity();
        
        // Cargar datos del store desde AsyncStorage
        await loadFromStorage();
        
        // Marcar como inicializado
        setInitialized(true);
        setIsStorageReady(true);
        
        console.log('✅ Aplicación inicializada correctamente');
      } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
        // Aún así, marcar como listo para evitar bloqueos
        setIsStorageReady(true);
      }
    };

    initializeApp();
  }, [loadFromStorage, setInitialized]);

  return (
    <SentryErrorBoundary>
      <QueryProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <AppContent isReady={isStorageReady && !isThemeLoading} />
          </SafeAreaProvider>
        </PaperProvider>
      </QueryProvider>
    </SentryErrorBoundary>
  );
}

function AppContent({ isReady }: { isReady: boolean }) {
  if (!isReady) {
    return null; // O un componente de carga
  }
  
  return <AppNavigator />;
}

export default App;
