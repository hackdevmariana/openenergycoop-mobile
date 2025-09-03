/**
 * OpenEnergyCoop Mobile App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './src/styles/global.css';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { PaperProvider } from './src/providers/PaperProvider';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeStorage, verifyStorageIntegrity } from './src/services/storageInit';
import { useAppStore } from './src/stores/appStore';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isStorageReady, setIsStorageReady] = useState(false);
  const { loadFromStorage, setInitialized } = useAppStore();

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
    <QueryProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent isReady={isStorageReady} />
        </SafeAreaProvider>
      </PaperProvider>
    </QueryProvider>
  );
}

function AppContent({ isReady }: { isReady: boolean }) {
  if (!isReady) {
    return null; // O un componente de carga
  }
  
  return <AppNavigator />;
}

export default App;
