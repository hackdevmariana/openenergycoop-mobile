import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { usePostHogAnalytics } from '../../hooks/usePostHogAnalytics';
import { HelpType } from '../../hooks/useHelpGestures';

interface HelpPanelProps {
  isVisible: boolean;
  helpType: HelpType;
  content: any;
  position?: { x: number; y: number };
  onClose: () => void;
  onElementPress?: (element: string) => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({
  isVisible,
  helpType,
  content,
  position,
  onClose,
  onElementPress,
}) => {
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Animaciones
  const translateY = useSharedValue(-screenHeight);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else {
      translateY.value = withSpring(-screenHeight, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withSpring(0.8, { damping: 15, stiffness: 150 });
    }
  }, [isVisible, screenHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const handleClose = () => {
    trackUserAction('help_panel_closed', { helpType });
    onClose();
  };

  const handleElementPress = (element: string) => {
    trackUserAction('help_element_pressed', { element, helpType });
    onElementPress?.(element);
  };

  const renderFullPanel = () => (
    <View className="flex-1 p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Title className="text-xl font-bold">{content.title}</Title>
        <IconButton
          icon="close"
          size={24}
          onPress={handleClose}
          className={themedClasses.btnSecondary}
        />
      </View>

      <Paragraph className="text-text-secondary mb-6">{content.description}</Paragraph>

      {/* Secciones */}
      <ScrollView className="flex-1">
        {content.sections?.map((section: any, index: number) => (
          <Card key={index} className={themedClasses.card + ' mb-4'}>
            <Card.Content>
              <Title className="text-lg mb-2">{section.title}</Title>
              <Paragraph className="text-text-secondary mb-3">{section.description}</Paragraph>
              
              <View className="space-y-2">
                {section.elements?.map((element: string, elementIndex: number) => (
                  <TouchableOpacity
                    key={elementIndex}
                    onPress={() => handleElementPress(element)}
                    className="p-3 bg-surface rounded-md border border-border"
                  >
                    <Text className={themedClasses.textPrimary + ' font-medium'}>{element}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}

        {/* Gestos */}
        {content.gestures && (
          <Card className={themedClasses.card + ' mb-4'}>
            <Card.Content>
              <Title className="text-lg mb-3">Gestos Disponibles</Title>
              <View className="space-y-2">
                {content.gestures.map((gesture: any, index: number) => (
                  <View key={index} className="flex-row justify-between items-center p-3 bg-surface rounded-md">
                    <Text className={themedClasses.textSecondary}>{gesture.gesture}</Text>
                    <Text className={themedClasses.textPrimary + ' font-medium'}>{gesture.action}</Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );

  const renderTooltip = () => (
    <View className="p-4 max-w-xs">
      <Card className={themedClasses.card}>
        <Card.Content>
          <Title className="text-lg mb-2">{content.title}</Title>
          <Paragraph className="text-text-secondary mb-3">{content.description}</Paragraph>
          
          <Text className={themedClasses.textPrimary + ' font-medium mb-2'}>Uso:</Text>
          <Text className={themedClasses.textSecondary}>{content.usage}</Text>
          
          {content.tips && (
            <>
              <Text className={themedClasses.textPrimary + ' font-medium mt-3 mb-2'}>Consejos:</Text>
              {content.tips.map((tip: string, index: number) => (
                <Text key={index} className={themedClasses.textSecondary + ' mb-1'}>
                  • {tip}
                </Text>
              ))}
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );

  const renderQuickHelp = () => (
    <View className="p-4 max-w-xs">
      <Card className={themedClasses.card}>
        <Card.Content>
          <Title className="text-lg mb-2">{content.title}</Title>
          <Paragraph className="text-text-secondary mb-3">{content.description}</Paragraph>
          
          <View className="space-y-2">
            {content.actions?.map((action: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleElementPress(action.gesture)}
                className="p-3 bg-surface rounded-md border border-border"
              >
                <Text className={themedClasses.textPrimary + ' font-medium'}>{action.gesture}</Text>
                <Text className={themedClasses.textSecondary + ' text-sm'}>{action.action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderTutorial = () => (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Title className="text-xl font-bold">{content.title}</Title>
        <IconButton
          icon="close"
          size={24}
          onPress={handleClose}
          className={themedClasses.btnSecondary}
        />
      </View>

      <Paragraph className="text-text-secondary mb-6">{content.description}</Paragraph>

      <ScrollView className="flex-1">
        {content.steps?.map((step: any, index: number) => (
          <Card key={index} className={themedClasses.card + ' mb-4'}>
            <Card.Content>
              <View className="flex-row items-center mb-2">
                <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">{index + 1}</Text>
                </View>
                <Title className="text-lg">{step.gesture}</Title>
              </View>
              <Paragraph className="text-text-secondary">{step.action}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    switch (helpType) {
      case 'fullPanel':
        return renderFullPanel();
      case 'tooltip':
        return renderTooltip();
      case 'quick':
        return renderQuickHelp();
      case 'tutorial':
        return renderTutorial();
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={handleClose}
        activeOpacity={1}
      >
        <View
          style={{
            position: 'absolute',
            top: helpType === 'tooltip' ? position?.y || 100 : 0,
            left: helpType === 'tooltip' ? position?.x || 20 : 0,
            right: helpType === 'tooltip' ? 20 : 0,
            bottom: 0,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {renderContent()}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default HelpPanel;
