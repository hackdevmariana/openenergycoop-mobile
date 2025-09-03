/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Configuración específica para NativeWind v4
  corePlugins: {
    preflight: false,
  },
  // Importar configuración de NativeWind
  presets: [require('nativewind/preset')],
}

