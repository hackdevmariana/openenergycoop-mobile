import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Screen } from 'react-native-screens';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Text as SVGText,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { useSVG } from '../hooks/useSVG';
import { usePostHogAnalytics } from '../hooks/usePostHogAnalytics';

const SVGDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const {
    svgState,
    svgRef,
    config,
    createPath,
    createCircle,
    createRect,
    createLine,
    createText,
    createGroup,
    createGradient,
    getEnergyColors,
    getStatusColors,
    getConsumptionColors,
    getEfficiencyColors,
    createAnimation,
    createEnergyAnimation,
    createLoadingAnimation,
    createTransitionAnimation,
    getGradient,
    getPattern,
    calculateResponsiveDimensions,
    createViewBox,
    exportSVG,
    validateSVG,
    sanitizeSVG,
  } = useSVG();

  const [currentDemo, setCurrentDemo] = useState<'basic' | 'energy' | 'gradients' | 'animations' | 'complex'>('basic');
  const [svgSize, setSvgSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');

  const { width: screenWidth } = Dimensions.get('window');
  const svgWidth = config.components.Svg.variants[svgSize].width;
  const svgHeight = config.components.Svg.variants[svgSize].height;

  const handleDemoChange = (demo: typeof currentDemo) => {
    trackUserAction('svg_demo_changed', { demo });
    setCurrentDemo(demo);
  };

  const handleSizeChange = (size: typeof svgSize) => {
    trackUserAction('svg_size_changed', { size });
    setSvgSize(size);
  };

  const handleExport = async (format: 'png' | 'svg') => {
    trackUserAction('svg_export', { format });
    const result = await exportSVG(format);
    if (result) {
      console.log(`SVG exported as ${format}:`, result);
    }
  };

  // Elementos SVG de demostración
  const basicElements = [
    createPath('M10 10 L90 90', { stroke: getStatusColors('info'), strokeWidth: 2 }),
    createCircle(50, 50, 30, { fill: getStatusColors('success'), stroke: getStatusColors('warning'), strokeWidth: 2 }),
    createRect(20, 20, 60, 60, { fill: 'none', stroke: getStatusColors('error'), strokeWidth: 3 }),
    createLine(10, 90, 90, 10, { stroke: getStatusColors('neutral'), strokeWidth: 1 }),
    createText(50, 50, 'SVG', { fill: getStatusColors('info'), fontSize: 16, textAnchor: 'middle' }),
  ];

  const energyElements = [
    createPath('M20 80 Q50 20 80 80', { stroke: getEnergyColors('solar'), strokeWidth: 3, fill: 'none' }),
    createCircle(50, 40, 15, { fill: getEnergyColors('solar'), opacity: 0.8 }),
    createPath('M10 60 Q30 30 50 60 Q70 30 90 60', { stroke: getEnergyColors('wind'), strokeWidth: 2, fill: 'none' }),
    createRect(15, 70, 20, 10, { fill: getEnergyColors('hydro'), opacity: 0.7 }),
    createRect(65, 70, 20, 10, { fill: getEnergyColors('hydro'), opacity: 0.7 }),
  ];

  const gradientElements = [
    createGradient('energyGradient', 'linear', [getEnergyColors('solar'), getEnergyColors('wind')], [0, 1]),
    createCircle(50, 50, 40, { fill: 'url(#energyGradient)' }),
    createGradient('statusGradient', 'radial', [getStatusColors('success'), getStatusColors('warning')], [0, 1]),
    createRect(20, 20, 60, 60, { fill: 'url(#statusGradient)', rx: 10 }),
  ];

  const renderBasicDemo = () => (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
      <Defs>
        <LinearGradient id="basicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={getStatusColors('info')} />
          <Stop offset="100%" stopColor={getStatusColors('success')} />
        </LinearGradient>
      </Defs>
      
      {/* Fondo */}
      <Rect x="0" y="0" width="100" height="100" fill="url(#basicGradient)" opacity="0.1" />
      
      {/* Elementos básicos */}
      {basicElements.map((element, index) => {
        const isValid = validateSVG(element);
        const sanitizedElement = sanitizeSVG(element);
        
        switch (sanitizedElement.type) {
          case 'path':
            return <Path key={index} {...sanitizedElement.props} />;
          case 'circle':
            return <Circle key={index} {...sanitizedElement.props} />;
          case 'rect':
            return <Rect key={index} {...sanitizedElement.props} />;
          case 'line':
            return <Line key={index} {...sanitizedElement.props} />;
          case 'text':
            return <SVGText key={index} {...sanitizedElement.props}>{sanitizedElement.props.children}</SVGText>;
          default:
            return null;
        }
      })}
    </Svg>
  );

  const renderEnergyDemo = () => (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
      <Defs>
        <RadialGradient id="solarGradient" cx="50%" cy="30%" r="50%">
          <Stop offset="0%" stopColor={getEnergyColors('solar')} />
          <Stop offset="100%" stopColor={getEnergyColors('solar')} stopOpacity="0.3" />
        </RadialGradient>
        <LinearGradient id="windGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={getEnergyColors('wind')} />
          <Stop offset="100%" stopColor={getEnergyColors('wind')} stopOpacity="0.5" />
        </LinearGradient>
      </Defs>
      
      {/* Fondo de energía */}
      <Rect x="0" y="0" width="100" height="100" fill="#f8f9fa" />
      
      {/* Elementos de energía */}
      {energyElements.map((element, index) => {
        const sanitizedElement = sanitizeSVG(element);
        
        switch (sanitizedElement.type) {
          case 'path':
            return <Path key={index} {...sanitizedElement.props} />;
          case 'circle':
            return <Circle key={index} {...sanitizedElement.props} />;
          case 'rect':
            return <Rect key={index} {...sanitizedElement.props} />;
          default:
            return null;
        }
      })}
      
      {/* Texto de energía */}
      <SVGText x="50" y="95" fill={getEnergyColors('solar')} fontSize="8" textAnchor="middle">
        Energía Solar
      </SVGText>
      <SVGText x="25" y="85" fill={getEnergyColors('wind')} fontSize="6" textAnchor="middle">
        Viento
      </SVGText>
      <SVGText x="75" y="85" fill={getEnergyColors('hydro')} fontSize="6" textAnchor="middle">
        Hidro
      </SVGText>
    </Svg>
  );

  const renderGradientsDemo = () => (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
      <Defs>
        <LinearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={getEnergyColors('solar')} />
          <Stop offset="50%" stopColor={getEnergyColors('wind')} />
          <Stop offset="100%" stopColor={getEnergyColors('hydro')} />
        </LinearGradient>
        <RadialGradient id="statusGradient" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={getStatusColors('success')} />
          <Stop offset="50%" stopColor={getStatusColors('warning')} />
          <Stop offset="100%" stopColor={getStatusColors('error')} />
        </RadialGradient>
        <LinearGradient id="consumptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={getConsumptionColors('low')} />
          <Stop offset="50%" stopColor={getConsumptionColors('medium')} />
          <Stop offset="100%" stopColor={getConsumptionColors('high')} />
        </LinearGradient>
      </Defs>
      
      {/* Gradientes de energía */}
      <Circle cx="30" cy="30" r="20" fill="url(#energyGradient)" />
      <SVGText x="30" y="60" fill={getStatusColors('info')} fontSize="6" textAnchor="middle">
        Energía
      </SVGText>
      
      {/* Gradientes de estado */}
      <Rect x="60" y="10" width="30" height="30" fill="url(#statusGradient)" rx="5" />
      <SVGText x="75" y="50" fill={getStatusColors('info')} fontSize="6" textAnchor="middle">
        Estado
      </SVGText>
      
      {/* Gradientes de consumo */}
      <Rect x="10" y="70" width="20" height="20" fill="url(#consumptionGradient)" rx="3" />
      <SVGText x="20" y="95" fill={getStatusColors('info')} fontSize="5" textAnchor="middle">
        Consumo
      </SVGText>
    </Svg>
  );

  const renderAnimationsDemo = () => (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
      <Defs>
        <LinearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={getEnergyColors('solar')} />
          <Stop offset="100%" stopColor={getEnergyColors('wind')} />
        </LinearGradient>
      </Defs>
      
      {/* Animación de pulso */}
      <Circle cx="30" cy="30" r="15" fill="url(#pulseGradient)">
        {/* Aquí irían las animaciones con react-native-reanimated */}
      </Circle>
      
      {/* Animación de flujo */}
      <Path d="M10 60 Q30 40 50 60 Q70 40 90 60" stroke={getEnergyColors('wind')} strokeWidth="3" fill="none">
        {/* Aquí irían las animaciones de flujo */}
      </Path>
      
      {/* Animación de chispa */}
      <Line x1="70" y1="20" x2="80" y2="30" stroke={getEnergyColors('solar')} strokeWidth="2">
        {/* Aquí irían las animaciones de chispa */}
      </Line>
      
      <SVGText x="50" y="90" fill={getStatusColors('info')} fontSize="8" textAnchor="middle">
        Animaciones SVG
      </SVGText>
    </Svg>
  );

  const renderComplexDemo = () => (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 100 100" ref={svgRef}>
      <Defs>
        <LinearGradient id="complexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={getEnergyColors('solar')} />
          <Stop offset="33%" stopColor={getEnergyColors('wind')} />
          <Stop offset="66%" stopColor={getEnergyColors('hydro')} />
          <Stop offset="100%" stopColor={getStatusColors('success')} />
        </LinearGradient>
        <RadialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor={getStatusColors('info')} />
          <Stop offset="100%" stopColor={getStatusColors('info')} stopOpacity="0.1" />
        </RadialGradient>
      </Defs>
      
      {/* Fondo complejo */}
      <Rect x="0" y="0" width="100" height="100" fill="url(#complexGradient)" opacity="0.2" />
      
      {/* Grupo de elementos complejos */}
      <G>
        {/* Círculos de energía */}
        <Circle cx="25" cy="25" r="8" fill={getEnergyColors('solar')} opacity="0.8" />
        <Circle cx="75" cy="25" r="8" fill={getEnergyColors('wind')} opacity="0.8" />
        <Circle cx="25" cy="75" r="8" fill={getEnergyColors('hydro')} opacity="0.8" />
        <Circle cx="75" cy="75" r="8" fill={getStatusColors('success')} opacity="0.8" />
        
        {/* Líneas de conexión */}
        <Line x1="25" y1="25" x2="75" y2="25" stroke={getStatusColors('neutral')} strokeWidth="1" />
        <Line x1="25" y1="25" x2="25" y2="75" stroke={getStatusColors('neutral')} strokeWidth="1" />
        <Line x1="75" y1="25" x2="75" y2="75" stroke={getStatusColors('neutral')} strokeWidth="1" />
        <Line x1="25" y1="75" x2="75" y2="75" stroke={getStatusColors('neutral')} strokeWidth="1" />
        
        {/* Círculo central */}
        <Circle cx="50" cy="50" r="15" fill="url(#centerGradient)" />
        
        {/* Texto central */}
        <SVGText x="50" y="55" fill={getStatusColors('info')} fontSize="6" textAnchor="middle">
          SVG
        </SVGText>
      </G>
      
      {/* Textos de etiquetas */}
      <SVGText x="25" y="15" fill={getEnergyColors('solar')} fontSize="4" textAnchor="middle">
        Solar
      </SVGText>
      <SVGText x="75" y="15" fill={getEnergyColors('wind')} fontSize="4" textAnchor="middle">
        Viento
      </SVGText>
      <SVGText x="25" y="95" fill={getEnergyColors('hydro')} fontSize="4" textAnchor="middle">
        Hidro
      </SVGText>
      <SVGText x="75" y="95" fill={getStatusColors('success')} fontSize="4" textAnchor="middle">
        Éxito
      </SVGText>
    </Svg>
  );

  const renderCurrentDemo = () => {
    switch (currentDemo) {
      case 'basic':
        return renderBasicDemo();
      case 'energy':
        return renderEnergyDemo();
      case 'gradients':
        return renderGradientsDemo();
      case 'animations':
        return renderAnimationsDemo();
      case 'complex':
        return renderComplexDemo();
      default:
        return renderBasicDemo();
    }
  };

  return (
    <Screen style={{ flex: 1 }}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              React Native SVG Demo
            </Title>
            <Paragraph className="text-text-secondary">
              Demostración de capacidades de SVG en React Native
            </Paragraph>
          </View>

          {/* Información del sistema */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title>Información del Sistema</Title>
              <Paragraph className="mb-4">
                Configuración actual de react-native-svg
              </Paragraph>
              
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Versión:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{config.basic.version}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Plataforma:</Text>
                  <Text className={themedClasses.textPrimary + ' font-bold'}>{Platform.OS}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Optimización:</Text>
                  <Text className={themedClasses.textSuccess + ' font-bold'}>
                    {config.performance.optimization.enableOptimization ? 'Habilitada' : 'Deshabilitada'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Caché:</Text>
                  <Text className={themedClasses.textSuccess + ' font-bold'}>
                    {config.performance.cache.enableCache ? 'Habilitada' : 'Deshabilitada'}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className={themedClasses.textSecondary}>Seguridad:</Text>
                  <Text className={themedClasses.textSuccess + ' font-bold'}>
                    {config.security.enabled ? 'Habilitada' : 'Deshabilitada'}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Selector de demostración */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Tipo de Demostración</Title>
              <Paragraph className="mb-4">
                Selecciona el tipo de demostración SVG:
              </Paragraph>
              
              <View className="flex-row flex-wrap gap-2">
                {(['basic', 'energy', 'gradients', 'animations', 'complex'] as const).map((demo) => (
                  <TouchableOpacity
                    key={demo}
                    onPress={() => handleDemoChange(demo)}
                    className={`px-3 py-2 rounded-md ${
                      currentDemo === demo ? themedClasses.btnPrimary : themedClasses.btnSecondary
                    }`}
                  >
                    <Text className={currentDemo === demo ? 'text-white' : themedClasses.textPrimary}>
                      {demo.charAt(0).toUpperCase() + demo.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Selector de tamaño */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Tamaño del SVG</Title>
              <Paragraph className="mb-4">
                Selecciona el tamaño del SVG:
              </Paragraph>
              
              <View className="flex-row flex-wrap gap-2">
                {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => handleSizeChange(size)}
                    className={`px-3 py-2 rounded-md ${
                      svgSize === size ? themedClasses.btnPrimary : themedClasses.btnSecondary
                    }`}
                  >
                    <Text className={svgSize === size ? 'text-white' : themedClasses.textPrimary}>
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Demostración SVG */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Demostración SVG</Title>
              <Paragraph className="mb-4">
                {currentDemo.charAt(0).toUpperCase() + currentDemo.slice(1)} - {svgSize} ({svgWidth}x{svgHeight})
              </Paragraph>
              
              <View className="items-center justify-center p-4 bg-surface rounded-md">
                {renderCurrentDemo()}
              </View>
            </Card.Content>
          </Card>

          {/* Botones de acción */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Acciones</Title>
              <Paragraph className="mb-4">
                Funciones disponibles para SVG:
              </Paragraph>
              
              <View className="space-y-3">
                <Button
                  mode="contained"
                  onPress={() => handleExport('svg')}
                  className={themedClasses.btnPrimary}
                >
                  Exportar como SVG
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => handleExport('png')}
                  className={themedClasses.btnSecondary}
                >
                  Exportar como PNG
                </Button>
                
                <Button
                  mode="outlined"
                  onPress={() => {
                    trackUserAction('svg_validation_test');
                    const testElement = createCircle(50, 50, 25);
                    const isValid = validateSVG(testElement);
                    console.log('SVG validation test:', isValid);
                  }}
                  className={themedClasses.btnSecondary}
                >
                  Probar Validación
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Colores disponibles */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Colores Disponibles</Title>
              <Paragraph className="mb-4">
                Paleta de colores predefinida:
              </Paragraph>
              
              <View className="space-y-3">
                <View>
                  <Text className={themedClasses.textPrimary + ' font-bold mb-2'}>Energía:</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {Object.entries(config.colors.energy).map(([key, color]) => (
                      <View key={key} className="items-center">
                        <View style={{ width: 20, height: 20, backgroundColor: color, borderRadius: 10 }} />
                        <Text className={themedClasses.textSecondary + ' text-xs'}>{key}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View>
                  <Text className={themedClasses.textPrimary + ' font-bold mb-2'}>Estado:</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {Object.entries(config.colors.status).map(([key, color]) => (
                      <View key={key} className="items-center">
                        <View style={{ width: 20, height: 20, backgroundColor: color, borderRadius: 10 }} />
                        <Text className={themedClasses.textSecondary + ' text-xs'}>{key}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              React Native SVG
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Gráficos vectoriales escalables
            </Paragraph>
            <Paragraph className="text-center mt-2 text-sm text-text-secondary">
              Versión {config.basic.version}
            </Paragraph>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SVGDemo;
