import React from 'react';
import { PaperProvider as RNPaperProvider } from 'react-native-paper';
import { useTheme } from '../theme';

interface PaperProviderProps {
  children: React.ReactNode;
}

export const PaperProvider: React.FC<PaperProviderProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <RNPaperProvider 
      theme={theme}
      settings={{
        // Configuraciones adicionales de Paper
        rippleEffectEnabled: true,
      }}
    >
      {children}
    </RNPaperProvider>
  );
};
