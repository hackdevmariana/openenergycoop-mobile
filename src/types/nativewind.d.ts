/// <reference types="nativewind/types" />

declare module '*.css' {
  const content: any;
  export default content;
}

// Extender los tipos de React Native para incluir las clases de Tailwind
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
}

