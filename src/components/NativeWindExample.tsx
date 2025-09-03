import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const NativeWindExample: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
          ¡NativeWind Funciona!
        </Text>
        
        <Text className="text-gray-600 text-center mb-6">
          Este componente usa clases de Tailwind CSS directamente en React Native
        </Text>
        
        <TouchableOpacity 
          className="bg-blue-500 rounded-lg py-3 px-6 active:bg-blue-600"
          onPress={() => console.log('Botón presionado')}
        >
          <Text className="text-white font-semibold text-center">
            Presionar
          </Text>
        </TouchableOpacity>
        
        <View className="mt-4 flex-row justify-center space-x-2">
          <View className="w-4 h-4 bg-red-500 rounded-full" />
          <View className="w-4 h-4 bg-green-500 rounded-full" />
          <View className="w-4 h-4 bg-blue-500 rounded-full" />
        </View>
      </View>
    </View>
  );
};

