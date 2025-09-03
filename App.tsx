/**
 * OpenEnergyCoop Mobile App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './src/styles/global.css';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { PaperProvider } from './src/providers/PaperProvider';
import { NativeWindExample } from './src/components/NativeWindExample';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </SafeAreaProvider>
      </PaperProvider>
    </QueryProvider>
  );
}

function AppContent() {
  return <NativeWindExample />;
}



export default App;
