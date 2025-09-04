import { useMemo, useCallback } from 'react';
import { usePaperTheme } from '../config/paperTheme';
import { useTheme } from './useTheme';
import { usePostHogAnalytics } from './usePostHogAnalytics';
import { componentConfig, customStyles } from '../config/paperTheme';

// Hook para componentes de React Native Paper
export const usePaperComponents = () => {
  const paperTheme = usePaperTheme();
  const { themedClasses } = useTheme();
  const { trackUserAction } = usePostHogAnalytics();

  // Configuración de botones
  const buttonConfig = useMemo(() => ({
    ...componentConfig.button,
    style: {
      ...componentConfig.button.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de tarjetas
  const cardConfig = useMemo(() => ({
    ...componentConfig.card,
    style: {
      ...componentConfig.card.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de campos de texto
  const textInputConfig = useMemo(() => ({
    ...componentConfig.textInput,
    style: {
      ...componentConfig.textInput.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de switches
  const switchConfig = useMemo(() => ({
    ...componentConfig.switch,
    style: {
      ...componentConfig.switch.style,
    },
  }), []);

  // Configuración de sliders
  const sliderConfig = useMemo(() => ({
    ...componentConfig.slider,
    style: {
      ...componentConfig.slider.style,
    },
  }), []);

  // Configuración de chips
  const chipConfig = useMemo(() => ({
    ...componentConfig.chip,
    style: {
      ...componentConfig.chip.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de listas
  const listConfig = useMemo(() => ({
    ...componentConfig.list,
    style: {
      ...componentConfig.list.style,
    },
  }), []);

  // Configuración de modales
  const modalConfig = useMemo(() => ({
    ...componentConfig.modal,
    style: {
      ...componentConfig.modal.style,
    },
  }), []);

  // Configuración de snackbars
  const snackbarConfig = useMemo(() => ({
    ...componentConfig.snackbar,
    style: {
      ...componentConfig.snackbar.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de tooltips
  const tooltipConfig = useMemo(() => ({
    ...componentConfig.tooltip,
    style: {
      ...componentConfig.tooltip.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de badges
  const badgeConfig = useMemo(() => ({
    ...componentConfig.badge,
    style: {
      ...componentConfig.badge.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de avatars
  const avatarConfig = useMemo(() => ({
    ...componentConfig.avatar,
    style: {
      ...componentConfig.avatar.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de dividers
  const dividerConfig = useMemo(() => ({
    ...componentConfig.divider,
    style: {
      ...componentConfig.divider.style,
    },
  }), []);

  // Configuración de progress bars
  const progressBarConfig = useMemo(() => ({
    ...componentConfig.progressBar,
    style: {
      ...componentConfig.progressBar.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de activity indicators
  const activityIndicatorConfig = useMemo(() => ({
    ...componentConfig.activityIndicator,
    style: {
      ...componentConfig.activityIndicator.style,
    },
  }), []);

  // Configuración de data tables
  const dataTableConfig = useMemo(() => ({
    ...componentConfig.dataTable,
    style: {
      ...componentConfig.dataTable.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de searchbars
  const searchbarConfig = useMemo(() => ({
    ...componentConfig.searchbar,
    style: {
      ...componentConfig.searchbar.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de bottom sheets
  const bottomSheetConfig = useMemo(() => ({
    ...componentConfig.bottomSheet,
    style: {
      ...componentConfig.bottomSheet.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de dialogs
  const dialogConfig = useMemo(() => ({
    ...componentConfig.dialog,
    style: {
      ...componentConfig.dialog.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de menus
  const menuConfig = useMemo(() => ({
    ...componentConfig.menu,
    style: {
      ...componentConfig.menu.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de navigation bars
  const navigationBarConfig = useMemo(() => ({
    ...componentConfig.navigationBar,
    style: {
      ...componentConfig.navigationBar.style,
    },
  }), []);

  // Configuración de pagination
  const paginationConfig = useMemo(() => ({
    ...componentConfig.pagination,
    style: {
      ...componentConfig.pagination.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de rating bars
  const ratingBarConfig = useMemo(() => ({
    ...componentConfig.ratingBar,
    style: {
      ...componentConfig.ratingBar.style,
    },
  }), []);

  // Configuración de time pickers
  const timePickerConfig = useMemo(() => ({
    ...componentConfig.timePicker,
    style: {
      ...componentConfig.timePicker.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Configuración de date pickers
  const datePickerConfig = useMemo(() => ({
    ...componentConfig.datePicker,
    style: {
      ...componentConfig.datePicker.style,
      borderRadius: paperTheme.roundness,
    },
  }), [paperTheme.roundness]);

  // Funciones para crear botones con estilos específicos
  const createButton = useCallback((
    variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'energy',
    energyType?: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal'
  ) => {
    const baseConfig = { ...buttonConfig };
    
    if (variant === 'energy' && energyType) {
      const energyStyle = customStyles.button.energy[energyType];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: energyStyle.backgroundColor,
        },
        labelStyle: {
          ...baseConfig.labelStyle,
          color: energyStyle.color,
        },
      };
    }
    
    const variantStyle = customStyles.button[variant];
    return {
      ...baseConfig,
      style: {
        ...baseConfig.style,
        backgroundColor: variantStyle.backgroundColor,
      },
      labelStyle: {
        ...baseConfig.labelStyle,
        color: variantStyle.color,
      },
    };
  }, [buttonConfig]);

  // Funciones para crear tarjetas con estilos específicos
  const createCard = useCallback((
    variant: 'energy' | 'consumption',
    type?: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal' | 'low' | 'medium' | 'high' | 'critical'
  ) => {
    const baseConfig = { ...cardConfig };
    
    if (variant === 'energy' && type) {
      const energyStyle = customStyles.card.energy[type];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: energyStyle.backgroundColor,
          borderColor: energyStyle.borderColor,
          borderWidth: 1,
        },
      };
    }
    
    if (variant === 'consumption' && type) {
      const consumptionStyle = customStyles.card.consumption[type];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: consumptionStyle.backgroundColor,
          borderColor: consumptionStyle.borderColor,
          borderWidth: 1,
        },
      };
    }
    
    return baseConfig;
  }, [cardConfig]);

  // Funciones para crear chips con estilos específicos
  const createChip = useCallback((
    variant: 'energy' | 'status',
    type?: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal' | 'success' | 'warning' | 'error' | 'info'
  ) => {
    const baseConfig = { ...chipConfig };
    
    if (variant === 'energy' && type) {
      const energyStyle = customStyles.chip.energy[type];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: energyStyle.backgroundColor,
        },
        textStyle: {
          ...baseConfig.textStyle,
          color: energyStyle.color,
        },
      };
    }
    
    if (variant === 'status' && type) {
      const statusStyle = customStyles.chip.status[type];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: statusStyle.backgroundColor,
        },
        textStyle: {
          ...baseConfig.textStyle,
          color: statusStyle.color,
        },
      };
    }
    
    return baseConfig;
  }, [chipConfig]);

  // Funciones para crear badges con estilos específicos
  const createBadge = useCallback((
    variant: 'energy' | 'consumption',
    type?: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal' | 'low' | 'medium' | 'high' | 'critical'
  ) => {
    const baseConfig = { ...badgeConfig };
    
    if (variant === 'energy' && type) {
      const energyStyle = customStyles.badge.energy[type];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: energyStyle.backgroundColor,
        },
      };
    }
    
    if (variant === 'consumption' && type) {
      const consumptionStyle = customStyles.badge.consumption[type];
      return {
        ...baseConfig,
        style: {
          ...baseConfig.style,
          backgroundColor: consumptionStyle.backgroundColor,
        },
      };
    }
    
    return baseConfig;
  }, [badgeConfig]);

  // Funciones para crear progress bars con estilos específicos
  const createProgressBar = useCallback((
    variant: 'energy' | 'consumption',
    type?: 'solar' | 'wind' | 'hydro' | 'nuclear' | 'biomass' | 'geothermal' | 'low' | 'medium' | 'high' | 'critical'
  ) => {
    const baseConfig = { ...progressBarConfig };
    
    if (variant === 'energy' && type) {
      const energyStyle = customStyles.progressBar.energy[type];
      return {
        ...baseConfig,
        color: energyStyle.color,
        style: {
          ...baseConfig.style,
        },
      };
    }
    
    if (variant === 'consumption' && type) {
      const consumptionStyle = customStyles.progressBar.consumption[type];
      return {
        ...baseConfig,
        color: consumptionStyle.color,
        style: {
          ...baseConfig.style,
        },
      };
    }
    
    return baseConfig;
  }, [progressBarConfig]);

  // Funciones para manejar eventos de componentes
  const handleButtonPress = useCallback((action: string, data?: any) => {
    trackUserAction('button_pressed', { action, data });
  }, [trackUserAction]);

  const handleCardPress = useCallback((action: string, data?: any) => {
    trackUserAction('card_pressed', { action, data });
  }, [trackUserAction]);

  const handleChipPress = useCallback((action: string, data?: any) => {
    trackUserAction('chip_pressed', { action, data });
  }, [trackUserAction]);

  const handleTextInputChange = useCallback((action: string, data?: any) => {
    trackUserAction('text_input_changed', { action, data });
  }, [trackUserAction]);

  const handleSwitchToggle = useCallback((action: string, data?: any) => {
    trackUserAction('switch_toggled', { action, data });
  }, [trackUserAction]);

  const handleSliderChange = useCallback((action: string, data?: any) => {
    trackUserAction('slider_changed', { action, data });
  }, [trackUserAction]);

  const handleModalOpen = useCallback((action: string, data?: any) => {
    trackUserAction('modal_opened', { action, data });
  }, [trackUserAction]);

  const handleModalClose = useCallback((action: string, data?: any) => {
    trackUserAction('modal_closed', { action, data });
  }, [trackUserAction]);

  const handleSnackbarShow = useCallback((action: string, data?: any) => {
    trackUserAction('snackbar_shown', { action, data });
  }, [trackUserAction]);

  const handleSnackbarDismiss = useCallback((action: string, data?: any) => {
    trackUserAction('snackbar_dismissed', { action, data });
  }, [trackUserAction]);

  const handleTooltipShow = useCallback((action: string, data?: any) => {
    trackUserAction('tooltip_shown', { action, data });
  }, [trackUserAction]);

  const handleTooltipHide = useCallback((action: string, data?: any) => {
    trackUserAction('tooltip_hidden', { action, data });
  }, [trackUserAction]);

  const handleMenuOpen = useCallback((action: string, data?: any) => {
    trackUserAction('menu_opened', { action, data });
  }, [trackUserAction]);

  const handleMenuClose = useCallback((action: string, data?: any) => {
    trackUserAction('menu_closed', { action, data });
  }, [trackUserAction]);

  const handleDialogOpen = useCallback((action: string, data?: any) => {
    trackUserAction('dialog_opened', { action, data });
  }, [trackUserAction]);

  const handleDialogClose = useCallback((action: string, data?: any) => {
    trackUserAction('dialog_closed', { action, data });
  }, [trackUserAction]);

  const handleBottomSheetOpen = useCallback((action: string, data?: any) => {
    trackUserAction('bottom_sheet_opened', { action, data });
  }, [trackUserAction]);

  const handleBottomSheetClose = useCallback((action: string, data?: any) => {
    trackUserAction('bottom_sheet_closed', { action, data });
  }, [trackUserAction]);

  const handleSearchbarChange = useCallback((action: string, data?: any) => {
    trackUserAction('searchbar_changed', { action, data });
  }, [trackUserAction]);

  const handleSearchbarSubmit = useCallback((action: string, data?: any) => {
    trackUserAction('searchbar_submitted', { action, data });
  }, [trackUserAction]);

  const handlePaginationChange = useCallback((action: string, data?: any) => {
    trackUserAction('pagination_changed', { action, data });
  }, [trackUserAction]);

  const handleRatingChange = useCallback((action: string, data?: any) => {
    trackUserAction('rating_changed', { action, data });
  }, [trackUserAction]);

  const handleTimePickerConfirm = useCallback((action: string, data?: any) => {
    trackUserAction('time_picker_confirmed', { action, data });
  }, [trackUserAction]);

  const handleDatePickerConfirm = useCallback((action: string, data?: any) => {
    trackUserAction('date_picker_confirmed', { action, data });
  }, [trackUserAction]);

  return {
    // Tema
    paperTheme,
    
    // Configuraciones de componentes
    buttonConfig,
    cardConfig,
    textInputConfig,
    switchConfig,
    sliderConfig,
    chipConfig,
    listConfig,
    modalConfig,
    snackbarConfig,
    tooltipConfig,
    badgeConfig,
    avatarConfig,
    dividerConfig,
    progressBarConfig,
    activityIndicatorConfig,
    dataTableConfig,
    searchbarConfig,
    bottomSheetConfig,
    dialogConfig,
    menuConfig,
    navigationBarConfig,
    paginationConfig,
    ratingBarConfig,
    timePickerConfig,
    datePickerConfig,
    
    // Funciones para crear componentes con estilos específicos
    createButton,
    createCard,
    createChip,
    createBadge,
    createProgressBar,
    
    // Funciones para manejar eventos
    handleButtonPress,
    handleCardPress,
    handleChipPress,
    handleTextInputChange,
    handleSwitchToggle,
    handleSliderChange,
    handleModalOpen,
    handleModalClose,
    handleSnackbarShow,
    handleSnackbarDismiss,
    handleTooltipShow,
    handleTooltipHide,
    handleMenuOpen,
    handleMenuClose,
    handleDialogOpen,
    handleDialogClose,
    handleBottomSheetOpen,
    handleBottomSheetClose,
    handleSearchbarChange,
    handleSearchbarSubmit,
    handlePaginationChange,
    handleRatingChange,
    handleTimePickerConfirm,
    handleDatePickerConfirm,
    
    // Estilos personalizados
    customStyles,
  };
};
