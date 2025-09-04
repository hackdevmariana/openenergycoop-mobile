/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.js"
  ],
  theme: {
    extend: {
      // Colores del sistema de temas
      colors: {
        // Colores primarios
        primary: {
          light: '#007AFF',
          dark: '#0A84FF',
          DEFAULT: '#007AFF',
        },
        secondary: {
          light: '#5856D6',
          dark: '#5E5CE6',
          DEFAULT: '#5856D6',
        },
        accent: {
          light: '#FF9500',
          dark: '#FF9F0A',
          DEFAULT: '#FF9500',
        },
        
        // Colores de estado
        success: {
          light: '#34C759',
          dark: '#30D158',
          DEFAULT: '#34C759',
        },
        warning: {
          light: '#FF9500',
          dark: '#FF9F0A',
          DEFAULT: '#FF9500',
        },
        error: {
          light: '#FF3B30',
          dark: '#FF453A',
          DEFAULT: '#FF3B30',
        },
        info: {
          light: '#007AFF',
          dark: '#0A84FF',
          DEFAULT: '#007AFF',
        },
        
        // Colores de fondo
        background: {
          light: '#FFFFFF',
          dark: '#000000',
          DEFAULT: '#FFFFFF',
        },
        surface: {
          light: '#F2F2F7',
          dark: '#1C1C1E',
          DEFAULT: '#F2F2F7',
        },
        card: {
          light: '#FFFFFF',
          dark: '#2C2C2E',
          DEFAULT: '#FFFFFF',
        },
        
        // Colores de texto
        text: {
          light: '#000000',
          dark: '#FFFFFF',
          DEFAULT: '#000000',
        },
        'text-secondary': {
          light: '#6B7280',
          dark: '#8E8E93',
          DEFAULT: '#6B7280',
        },
        'text-tertiary': {
          light: '#9CA3AF',
          dark: '#636366',
          DEFAULT: '#9CA3AF',
        },
        
        // Colores de borde
        border: {
          light: '#E5E7EB',
          dark: '#38383A',
          DEFAULT: '#E5E7EB',
        },
        divider: {
          light: '#F3F4F6',
          dark: '#2C2C2E',
          DEFAULT: '#F3F4F6',
        },
        
        // Colores de energía específicos
        energy: {
          solar: '#FFD700',
          wind: '#87CEEB',
          hydro: '#4169E1',
          battery: '#32CD32',
          grid: '#FF6347',
        },
      },
      
      // Espaciado personalizado
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      
      // Bordes personalizados
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
      
      // Tipografía personalizada
      fontSize: {
        'xs': ['12px', { lineHeight: '1.2' }],
        'sm': ['14px', { lineHeight: '1.4' }],
        'md': ['16px', { lineHeight: '1.4' }],
        'lg': ['18px', { lineHeight: '1.4' }],
        'xl': ['20px', { lineHeight: '1.2' }],
        'xxl': ['24px', { lineHeight: '1.2' }],
        'xxxl': ['32px', { lineHeight: '1.2' }],
      },
      
      // Sombras personalizadas
      boxShadow: {
        'small': {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
        'medium': {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
        'large': {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 4,
        },
      },
    },
  },
  plugins: [],
  // Configuración específica para NativeWind v4
  corePlugins: {
    preflight: false,
  },
  // Importar configuración de NativeWind
  presets: [require('nativewind/preset')],
}

