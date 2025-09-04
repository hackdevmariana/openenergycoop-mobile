import { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { svgConfig, getPlatformSVGConfig, getScreenSizeSVGConfig } from '../config/svg';

// Tipos para el hook SVG
export interface SVGElement {
  id: string;
  type: 'path' | 'circle' | 'rect' | 'line' | 'text' | 'g';
  props: Record<string, any>;
  children?: SVGElement[];
}

export interface SVGAnimation {
  type: 'fade' | 'scale' | 'slide' | 'rotate' | 'pulse' | 'flow' | 'spark';
  duration: number;
  delay?: number;
  repeat?: number;
  easing?: string;
}

export interface SVGGradient {
  id: string;
  type: 'linear' | 'radial';
  colors: string[];
  locations: number[];
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  cx?: number;
  cy?: number;
  r?: number;
}

export const useSVG = () => {
  // Estado del hook
  const [svgState, setSvgState] = useState({
    isLoaded: false,
    isLoading: false,
    error: null as string | null,
    dimensions: { width: 0, height: 0 },
    viewBox: '0 0 100 100',
  });

  // Referencias
  const svgRef = useRef<any>(null);
  const animationRef = useRef<any>(null);

  // Configuración
  const config = useMemo(() => {
    return getPlatformSVGConfig();
  }, []);

  const screenSizeConfig = useMemo(() => {
    return getScreenSizeSVGConfig();
  }, []);

  // Función para crear elementos SVG básicos
  const createSVGElement = useCallback((
    type: SVGElement['type'],
    props: Record<string, any> = {},
    children?: SVGElement[]
  ): SVGElement => {
    const defaultProps = config.components[type]?.defaultProps || {};
    
    return {
      id: props.id || `${type}_${Date.now()}`,
      type,
      props: { ...defaultProps, ...props },
      children,
    };
  }, [config]);

  // Función para crear Path
  const createPath = useCallback((
    d: string,
    props: Record<string, any> = {}
  ): SVGElement => {
    return createSVGElement('path', { d, ...props });
  }, [createSVGElement]);

  // Función para crear Circle
  const createCircle = useCallback((
    cx: number,
    cy: number,
    r: number,
    props: Record<string, any> = {}
  ): SVGElement => {
    return createSVGElement('circle', { cx, cy, r, ...props });
  }, [createSVGElement]);

  // Función para crear Rect
  const createRect = useCallback((
    x: number,
    y: number,
    width: number,
    height: number,
    props: Record<string, any> = {}
  ): SVGElement => {
    return createSVGElement('rect', { x, y, width, height, ...props });
  }, [createSVGElement]);

  // Función para crear Line
  const createLine = useCallback((
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    props: Record<string, any> = {}
  ): SVGElement => {
    return createSVGElement('line', { x1, y1, x2, y2, ...props });
  }, [createSVGElement]);

  // Función para crear Text
  const createText = useCallback((
    x: number,
    y: number,
    content: string,
    props: Record<string, any> = {}
  ): SVGElement => {
    return createSVGElement('text', { x, y, children: content, ...props });
  }, [createSVGElement]);

  // Función para crear Group
  const createGroup = useCallback((
    children: SVGElement[],
    props: Record<string, any> = {}
  ): SVGElement => {
    return createSVGElement('g', props, children);
  }, [createSVGElement]);

  // Función para crear gradientes
  const createGradient = useCallback((
    id: string,
    type: 'linear' | 'radial',
    colors: string[],
    locations: number[],
    props: Record<string, any> = {}
  ): SVGGradient => {
    return {
      id,
      type,
      colors,
      locations,
      ...props,
    };
  }, []);

  // Función para obtener colores de energía
  const getEnergyColors = useCallback((type: keyof typeof config.colors.energy) => {
    return config.colors.energy[type];
  }, [config.colors.energy]);

  // Función para obtener colores de estado
  const getStatusColors = useCallback((type: keyof typeof config.colors.status) => {
    return config.colors.status[type];
  }, [config.colors.status]);

  // Función para obtener colores de consumo
  const getConsumptionColors = useCallback((type: keyof typeof config.colors.consumption) => {
    return config.colors.consumption[type];
  }, [config.colors.consumption]);

  // Función para obtener colores de eficiencia
  const getEfficiencyColors = useCallback((type: keyof typeof config.colors.efficiency) => {
    return config.colors.efficiency[type];
  }, [config.colors.efficiency]);

  // Función para crear animaciones
  const createAnimation = useCallback((
    type: SVGAnimation['type'],
    duration: number,
    options: Partial<SVGAnimation> = {}
  ): SVGAnimation => {
    const baseAnimation = config.animations[type] || config.animations.basic;
    
    return {
      type,
      duration,
      delay: options.delay || baseAnimation.delay,
      repeat: options.repeat || baseAnimation.repeat,
      easing: options.easing || baseAnimation.easing,
    };
  }, [config.animations]);

  // Función para crear animación de energía
  const createEnergyAnimation = useCallback((
    type: keyof typeof config.animations.energy,
    options: Partial<SVGAnimation> = {}
  ): SVGAnimation => {
    const energyAnimation = config.animations.energy[type];
    
    return {
      type: type as SVGAnimation['type'],
      duration: energyAnimation.duration,
      delay: options.delay || energyAnimation.delay,
      repeat: options.repeat || energyAnimation.repeat,
      easing: options.easing || energyAnimation.easing,
    };
  }, [config.animations.energy]);

  // Función para crear animación de carga
  const createLoadingAnimation = useCallback((
    type: keyof typeof config.animations.loading,
    options: Partial<SVGAnimation> = {}
  ): SVGAnimation => {
    const loadingAnimation = config.animations.loading[type];
    
    return {
      type: type as SVGAnimation['type'],
      duration: loadingAnimation.duration,
      delay: options.delay || loadingAnimation.delay,
      repeat: options.repeat || loadingAnimation.repeat,
      easing: options.easing || loadingAnimation.easing,
    };
  }, [config.animations.loading]);

  // Función para crear animación de transición
  const createTransitionAnimation = useCallback((
    type: keyof typeof config.animations.transition,
    options: Partial<SVGAnimation> = {}
  ): SVGAnimation => {
    const transitionAnimation = config.animations.transition[type];
    
    return {
      type: type as SVGAnimation['type'],
      duration: transitionAnimation.duration,
      delay: options.delay || transitionAnimation.delay,
      repeat: options.repeat || transitionAnimation.repeat,
      easing: options.easing || transitionAnimation.easing,
    };
  }, [config.animations.transition]);

  // Función para obtener gradientes predefinidos
  const getGradient = useCallback((
    category: keyof typeof config.gradients,
    type: string
  ) => {
    return config.gradients[category]?.[type];
  }, [config.gradients]);

  // Función para obtener patrones predefinidos
  const getPattern = useCallback((
    category: keyof typeof config.patterns,
    type: string
  ) => {
    return config.patterns[category]?.[type];
  }, [config.patterns]);

  // Función para calcular dimensiones responsivas
  const calculateResponsiveDimensions = useCallback((
    baseWidth: number,
    baseHeight: number,
    containerWidth?: number,
    containerHeight?: number
  ) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const targetWidth = containerWidth || screenWidth;
    const targetHeight = containerHeight || screenHeight;
    
    const scaleX = targetWidth / baseWidth;
    const scaleY = targetHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);
    
    return {
      width: baseWidth * scale,
      height: baseHeight * scale,
      scale,
    };
  }, []);

  // Función para crear viewBox dinámico
  const createViewBox = useCallback((
    width: number,
    height: number,
    padding: number = 0
  ) => {
    return `${-padding} ${-padding} ${width + padding * 2} ${height + padding * 2}`;
  }, []);

  // Función para exportar SVG
  const exportSVG = useCallback(async (format: 'png' | 'svg' = 'svg') => {
    if (!svgRef.current) return null;
    
    try {
      if (format === 'png' && config.export.png.enabled) {
        // Exportar como PNG
        return await svgRef.current.toDataURL();
      } else if (format === 'svg' && config.export.svg.enabled) {
        // Exportar como SVG
        return await svgRef.current.toDataURL();
      }
    } catch (error) {
      console.error('Error exporting SVG:', error);
      return null;
    }
  }, [config.export]);

  // Función para cargar SVG desde URL
  const loadSVGFromURL = useCallback(async (url: string) => {
    setSvgState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Aquí implementarías la lógica para cargar SVG desde URL
      // Por ahora es un placeholder
      setSvgState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isLoaded: true,
        dimensions: { width: 100, height: 100 },
        viewBox: '0 0 100 100',
      }));
    } catch (error) {
      setSvgState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Error loading SVG',
      }));
    }
  }, []);

  // Función para limpiar SVG
  const clearSVG = useCallback(() => {
    setSvgState({
      isLoaded: false,
      isLoading: false,
      error: null,
      dimensions: { width: 0, height: 0 },
      viewBox: '0 0 100 100',
    });
  }, []);

  // Función para obtener configuración de componentes
  const getComponentConfig = useCallback((componentType: string) => {
    return config.components[componentType];
  }, [config.components]);

  // Función para obtener variantes de componentes
  const getComponentVariant = useCallback((
    componentType: string,
    variant: string
  ) => {
    return config.components[componentType]?.variants?.[variant];
  }, [config.components]);

  // Función para validar SVG
  const validateSVG = useCallback((svgElement: SVGElement): boolean => {
    if (!config.security.enabled) return true;
    
    const allowedElements = config.security.features.allowList.elements;
    const allowedAttributes = config.security.features.allowList.attributes;
    
    // Validar elemento
    if (!allowedElements.includes(svgElement.type)) {
      return false;
    }
    
    // Validar atributos
    const elementAttributes = Object.keys(svgElement.props);
    const hasInvalidAttributes = elementAttributes.some(attr => 
      !allowedAttributes.includes(attr)
    );
    
    if (hasInvalidAttributes) {
      return false;
    }
    
    // Validar hijos recursivamente
    if (svgElement.children) {
      return svgElement.children.every(child => validateSVG(child));
    }
    
    return true;
  }, [config.security]);

  // Función para sanitizar SVG
  const sanitizeSVG = useCallback((svgElement: SVGElement): SVGElement => {
    if (!config.security.features.sanitizeInput) {
      return svgElement;
    }
    
    const allowedAttributes = config.security.features.allowList.attributes;
    const sanitizedProps: Record<string, any> = {};
    
    // Filtrar solo atributos permitidos
    Object.keys(svgElement.props).forEach(key => {
      if (allowedAttributes.includes(key)) {
        sanitizedProps[key] = svgElement.props[key];
      }
    });
    
    return {
      ...svgElement,
      props: sanitizedProps,
      children: svgElement.children?.map(child => sanitizeSVG(child)),
    };
  }, [config.security]);

  return {
    // Estado
    svgState,
    
    // Referencias
    svgRef,
    animationRef,
    
    // Configuración
    config,
    screenSizeConfig,
    
    // Funciones de creación de elementos
    createSVGElement,
    createPath,
    createCircle,
    createRect,
    createLine,
    createText,
    createGroup,
    
    // Funciones de gradientes
    createGradient,
    getGradient,
    
    // Funciones de colores
    getEnergyColors,
    getStatusColors,
    getConsumptionColors,
    getEfficiencyColors,
    
    // Funciones de animaciones
    createAnimation,
    createEnergyAnimation,
    createLoadingAnimation,
    createTransitionAnimation,
    
    // Funciones de patrones
    getPattern,
    
    // Funciones de utilidad
    calculateResponsiveDimensions,
    createViewBox,
    exportSVG,
    loadSVGFromURL,
    clearSVG,
    
    // Funciones de configuración
    getComponentConfig,
    getComponentVariant,
    
    // Funciones de seguridad
    validateSVG,
    sanitizeSVG,
  };
};
