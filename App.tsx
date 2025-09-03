/**
 * OpenEnergyCoop Mobile App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import './src/styles/global.css';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { QueryProvider } from './src/providers/QueryProvider';
import { PaperProvider } from './src/providers/PaperProvider';
import IconShowcase from './src/components/IconShowcase';

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
  return <IconShowcase />;
}

export default App;
