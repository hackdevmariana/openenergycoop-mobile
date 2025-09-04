import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import {
  Provider as PaperProvider,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
  Switch,
  Slider,
  Chip,
  List,
  Modal,
  Portal,
  Snackbar,
  Tooltip,
  Badge,
  Avatar,
  Divider,
  ProgressBar,
  ActivityIndicator,
  DataTable,
  Searchbar,
  BottomSheet,
  Dialog,
  Menu,
  NavigationBar,
  Pagination,
  RatingBar,
  TimePicker,
  DatePicker,
  FAB,
  IconButton,
  SegmentedButtons,
  Checkbox,
  RadioButton,
  Banner,
  Surface,
  Appbar,
  Drawer,
  ToggleButton,
  SegmentedButtons as SegmentedButtonsV4,
} from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import { usePaperComponents } from '../hooks/usePaperComponents';
import { usePaperTheme } from '../config/paperTheme';

const ReactNativePaperDemo: React.FC = () => {
  const { themedClasses } = useTheme();
  const { paperTheme } = usePaperTheme();
  const {
    createButton,
    createCard,
    createChip,
    createBadge,
    createProgressBar,
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
  } = usePaperComponents();

  // Estados para componentes interactivos
  const [text, setText] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rating, setRating] = useState(3);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState('solar');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [segmentedValue, setSegmentedValue] = useState('solar');
  const [toggleValue, setToggleValue] = useState(false);

  // Datos de ejemplo para la tabla
  const [dataTableData] = useState([
    { id: 1, name: 'Solar Panel A', efficiency: '85%', status: 'active' },
    { id: 2, name: 'Wind Turbine B', efficiency: '92%', status: 'active' },
    { id: 3, name: 'Hydro Plant C', efficiency: '78%', status: 'maintenance' },
    { id: 4, name: 'Nuclear Reactor D', efficiency: '95%', status: 'active' },
  ]);

  // Configuraciones de componentes
  const primaryButtonConfig = createButton('primary');
  const secondaryButtonConfig = createButton('secondary');
  const successButtonConfig = createButton('success');
  const warningButtonConfig = createButton('warning');
  const errorButtonConfig = createButton('error');
  const solarButtonConfig = createButton('energy', 'solar');
  const windButtonConfig = createButton('energy', 'wind');
  const hydroButtonConfig = createButton('energy', 'hydro');

  const solarCardConfig = createCard('energy', 'solar');
  const windCardConfig = createCard('energy', 'wind');
  const lowConsumptionCardConfig = createCard('consumption', 'low');
  const highConsumptionCardConfig = createCard('consumption', 'high');

  const solarChipConfig = createChip('energy', 'solar');
  const windChipConfig = createChip('energy', 'wind');
  const successChipConfig = createChip('status', 'success');
  const warningChipConfig = createChip('status', 'warning');

  const solarBadgeConfig = createBadge('energy', 'solar');
  const lowConsumptionBadgeConfig = createBadge('consumption', 'low');

  const solarProgressBarConfig = createProgressBar('energy', 'solar');
  const highConsumptionProgressBarConfig = createProgressBar('consumption', 'high');

  return (
    <PaperProvider theme={paperTheme}>
      <ScrollView className={themedClasses.container}>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-2xl font-bold mb-2">
              React Native Paper Demo
            </Title>
            <Paragraph className="text-text-secondary">
              Demostración de componentes Material Design y configuración avanzada
            </Paragraph>
          </View>

          {/* Información del tema */}
          <Card className={themedClasses.card}>
            <Card.Content>
              <Title>Información del Tema</Title>
              <Paragraph>
                Tema actual: {paperTheme.dark ? 'Oscuro' : 'Claro'}
              </Paragraph>
              <Paragraph>
                Redondeo: {paperTheme.roundness}px
              </Paragraph>
              <Paragraph>
                Versión: {paperTheme.version}
              </Paragraph>
            </Card.Content>
          </Card>

          {/* Botones */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Botones</Title>
              <Paragraph>Diferentes variantes de botones con estilos personalizados</Paragraph>
              
              <View className="mt-4 space-y-3">
                <Button
                  {...primaryButtonConfig}
                  onPress={() => handleButtonPress('primary', 'primary_button')}
                >
                  Botón Primario
                </Button>
                
                <Button
                  {...secondaryButtonConfig}
                  onPress={() => handleButtonPress('secondary', 'secondary_button')}
                >
                  Botón Secundario
                </Button>
                
                <Button
                  {...successButtonConfig}
                  onPress={() => handleButtonPress('success', 'success_button')}
                >
                  Botón de Éxito
                </Button>
                
                <Button
                  {...warningButtonConfig}
                  onPress={() => handleButtonPress('warning', 'warning_button')}
                >
                  Botón de Advertencia
                </Button>
                
                <Button
                  {...errorButtonConfig}
                  onPress={() => handleButtonPress('error', 'error_button')}
                >
                  Botón de Error
                </Button>
                
                <Button
                  {...solarButtonConfig}
                  onPress={() => handleButtonPress('energy', 'solar_button')}
                >
                  🌞 Energía Solar
                </Button>
                
                <Button
                  {...windButtonConfig}
                  onPress={() => handleButtonPress('energy', 'wind_button')}
                >
                  💨 Energía Eólica
                </Button>
                
                <Button
                  {...hydroButtonConfig}
                  onPress={() => handleButtonPress('energy', 'hydro_button')}
                >
                  💧 Energía Hidráulica
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Tarjetas */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Tarjetas</Title>
              <Paragraph>Tarjetas con estilos específicos para energía y consumo</Paragraph>
              
              <View className="mt-4 space-y-4">
                <Card
                  {...solarCardConfig}
                  onPress={() => handleCardPress('energy', 'solar_card')}
                >
                  <Card.Content>
                    <Title>🌞 Energía Solar</Title>
                    <Paragraph>Generación de energía mediante paneles solares</Paragraph>
                  </Card.Content>
                </Card>
                
                <Card
                  {...windCardConfig}
                  onPress={() => handleCardPress('energy', 'wind_card')}
                >
                  <Card.Content>
                    <Title>💨 Energía Eólica</Title>
                    <Paragraph>Generación de energía mediante turbinas eólicas</Paragraph>
                  </Card.Content>
                </Card>
                
                <Card
                  {...lowConsumptionCardConfig}
                  onPress={() => handleCardPress('consumption', 'low_consumption_card')}
                >
                  <Card.Content>
                    <Title>✅ Consumo Bajo</Title>
                    <Paragraph>Consumo de energía dentro de los límites normales</Paragraph>
                  </Card.Content>
                </Card>
                
                <Card
                  {...highConsumptionCardConfig}
                  onPress={() => handleCardPress('consumption', 'high_consumption_card')}
                >
                  <Card.Content>
                    <Title>⚠️ Consumo Alto</Title>
                    <Paragraph>Consumo de energía por encima de los límites recomendados</Paragraph>
                  </Card.Content>
                </Card>
              </View>
            </Card.Content>
          </Card>

          {/* Campos de texto */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Campos de Texto</Title>
              <Paragraph>Diferentes tipos de campos de entrada</Paragraph>
              
              <View className="mt-4 space-y-4">
                <TextInput
                  label="Nombre del dispositivo"
                  value={text}
                  onChangeText={(value) => {
                    setText(value);
                    handleTextInputChange('device_name', { value });
                  }}
                  mode="outlined"
                />
                
                <TextInput
                  label="Consumo de energía (kWh)"
                  value={text}
                  onChangeText={(value) => {
                    setText(value);
                    handleTextInputChange('energy_consumption', { value });
                  }}
                  mode="outlined"
                  keyboardType="numeric"
                />
                
                <TextInput
                  label="Descripción"
                  value={text}
                  onChangeText={(value) => {
                    setText(value);
                    handleTextInputChange('description', { value });
                  }}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Switches y Sliders */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Switches y Sliders</Title>
              <Paragraph>Controles interactivos para configuraciones</Paragraph>
              
              <View className="mt-4 space-y-4">
                <View className="flex-row justify-between items-center">
                  <Paragraph>Modo automático</Paragraph>
                  <Switch
                    value={switchValue}
                    onValueChange={(value) => {
                      setSwitchValue(value);
                      handleSwitchToggle('auto_mode', { value });
                    }}
                  />
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Paragraph>Notificaciones</Paragraph>
                  <Switch
                    value={!switchValue}
                    onValueChange={(value) => {
                      setSwitchValue(!value);
                      handleSwitchToggle('notifications', { value });
                    }}
                  />
                </View>
                
                <View>
                  <Paragraph>Nivel de eficiencia: {sliderValue}%</Paragraph>
                  <Slider
                    value={sliderValue}
                    onValueChange={(value) => {
                      setSliderValue(value);
                      handleSliderChange('efficiency_level', { value });
                    }}
                    minimumValue={0}
                    maximumValue={100}
                    step={5}
                  />
                </View>
                
                <View>
                  <Paragraph>Umbral de alerta: {sliderValue} kWh</Paragraph>
                  <Slider
                    value={sliderValue}
                    onValueChange={(value) => {
                      setSliderValue(value);
                      handleSliderChange('alert_threshold', { value });
                    }}
                    minimumValue={0}
                    maximumValue={1000}
                    step={10}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Chips */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Chips</Title>
              <Paragraph>Etiquetas para categorizar contenido</Paragraph>
              
              <View className="mt-4 space-y-3">
                <View className="flex-row flex-wrap gap-2">
                  <Chip
                    {...solarChipConfig}
                    onPress={() => handleChipPress('energy', 'solar_chip')}
                  >
                    🌞 Solar
                  </Chip>
                  
                  <Chip
                    {...windChipConfig}
                    onPress={() => handleChipPress('energy', 'wind_chip')}
                  >
                    💨 Eólica
                  </Chip>
                  
                  <Chip
                    {...successChipConfig}
                    onPress={() => handleChipPress('status', 'success_chip')}
                  >
                    ✅ Activo
                  </Chip>
                  
                  <Chip
                    {...warningChipConfig}
                    onPress={() => handleChipPress('status', 'warning_chip')}
                  >
                    ⚠️ Mantenimiento
                  </Chip>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Listas */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Listas</Title>
              <Paragraph>Listas de elementos con iconos y acciones</Paragraph>
              
              <View className="mt-4">
                <List.Section>
                  <List.Item
                    title="Panel Solar A"
                    description="Eficiencia: 85% | Estado: Activo"
                    left={(props) => <List.Icon {...props} icon="solar-panel" />}
                    right={(props) => <Badge {...solarBadgeConfig}>85%</Badge>}
                  />
                  <List.Item
                    title="Turbina Eólica B"
                    description="Eficiencia: 92% | Estado: Activo"
                    left={(props) => <List.Icon {...props} icon="wind-turbine" />}
                    right={(props) => <Badge {...lowConsumptionBadgeConfig}>92%</Badge>}
                  />
                  <List.Item
                    title="Planta Hidráulica C"
                    description="Eficiencia: 78% | Estado: Mantenimiento"
                    left={(props) => <List.Icon {...props} icon="water" />}
                    right={(props) => <Badge {...highConsumptionProgressBarConfig}>78%</Badge>}
                  />
                </List.Section>
              </View>
            </Card.Content>
          </Card>

          {/* Progress Bars */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Barras de Progreso</Title>
              <Paragraph>Indicadores de progreso con colores específicos</Paragraph>
              
              <View className="mt-4 space-y-4">
                <View>
                  <Paragraph>Generación Solar: 75%</Paragraph>
                  <ProgressBar
                    {...solarProgressBarConfig}
                    progress={0.75}
                    style={{ height: 8 }}
                  />
                </View>
                
                <View>
                  <Paragraph>Consumo Actual: 85%</Paragraph>
                  <ProgressBar
                    {...highConsumptionProgressBarConfig}
                    progress={0.85}
                    style={{ height: 8 }}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Activity Indicators */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Indicadores de Actividad</Title>
              <Paragraph>Indicadores de carga y procesamiento</Paragraph>
              
              <View className="mt-4 space-y-4">
                <View className="flex-row justify-around">
                  <ActivityIndicator size="small" />
                  <ActivityIndicator size="large" />
                  <ActivityIndicator size="small" color={paperTheme.colors.primary} />
                  <ActivityIndicator size="large" color={paperTheme.colors.secondary} />
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Data Table */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Tabla de Datos</Title>
              <Paragraph>Tabla para mostrar datos estructurados</Paragraph>
              
              <View className="mt-4">
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Dispositivo</DataTable.Title>
                    <DataTable.Title numeric>Eficiencia</DataTable.Title>
                    <DataTable.Title>Estado</DataTable.Title>
                  </DataTable.Header>

                  {dataTableData.map((item) => (
                    <DataTable.Row key={item.id}>
                      <DataTable.Cell>{item.name}</DataTable.Cell>
                      <DataTable.Cell numeric>{item.efficiency}</DataTable.Cell>
                      <DataTable.Cell>{item.status}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </View>
            </Card.Content>
          </Card>

          {/* Searchbar */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Barra de Búsqueda</Title>
              <Paragraph>Búsqueda de dispositivos y datos</Paragraph>
              
              <View className="mt-4">
                <Searchbar
                  placeholder="Buscar dispositivos..."
                  onChangeText={(query) => {
                    setSearchQuery(query);
                    handleSearchbarChange('device_search', { query });
                  }}
                  onIconPress={() => handleSearchbarSubmit('device_search', { query: searchQuery })}
                  value={searchQuery}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Checkboxes y Radio Buttons */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Checkboxes y Radio Buttons</Title>
              <Paragraph>Controles de selección múltiple y única</Paragraph>
              
              <View className="mt-4 space-y-4">
                <View className="flex-row items-center">
                  <Checkbox
                    status={checkboxValue ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckboxValue(!checkboxValue);
                      handleSwitchToggle('notifications_enabled', { value: !checkboxValue });
                    }}
                  />
                  <Paragraph className="ml-2">Habilitar notificaciones</Paragraph>
                </View>
                
                <View className="flex-row items-center">
                  <Checkbox
                    status={!checkboxValue ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setCheckboxValue(!checkboxValue);
                      handleSwitchToggle('auto_optimization', { value: !checkboxValue });
                    }}
                  />
                  <Paragraph className="ml-2">Optimización automática</Paragraph>
                </View>
                
                <View>
                  <Paragraph>Tipo de energía preferida:</Paragraph>
                  <RadioButton.Group
                    onValueChange={(value) => {
                      setRadioValue(value);
                      handleSwitchToggle('preferred_energy_type', { value });
                    }}
                    value={radioValue}
                  >
                    <View className="flex-row items-center">
                      <RadioButton value="option1" />
                      <Paragraph className="ml-2">Solar</Paragraph>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="option2" />
                      <Paragraph className="ml-2">Eólica</Paragraph>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="option3" />
                      <Paragraph className="ml-2">Hidráulica</Paragraph>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Segmented Buttons */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Botones Segmentados</Title>
              <Paragraph>Selección de tipo de energía</Paragraph>
              
              <View className="mt-4">
                <SegmentedButtons
                  value={segmentedValue}
                  onValueChange={(value) => {
                    setSegmentedValue(value);
                    handleSwitchToggle('energy_type_selection', { value });
                  }}
                  buttons={[
                    { value: 'solar', label: '🌞 Solar' },
                    { value: 'wind', label: '💨 Eólica' },
                    { value: 'hydro', label: '💧 Hidráulica' },
                  ]}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Toggle Buttons */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Botones de Alternancia</Title>
              <Paragraph>Botones para activar/desactivar funciones</Paragraph>
              
              <View className="mt-4">
                <ToggleButton
                  icon="solar-panel"
                  value="solar"
                  status={toggleValue ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setToggleValue(!toggleValue);
                    handleSwitchToggle('solar_mode', { value: !toggleValue });
                  }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Avatars */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Avatars</Title>
              <Paragraph>Avatares para usuarios y dispositivos</Paragraph>
              
              <View className="mt-4 flex-row space-x-4">
                <Avatar.Text size={40} label="JS" />
                <Avatar.Icon size={40} icon="solar-panel" />
                <Avatar.Image size={40} source={{ uri: 'https://example.com/avatar.jpg' }} />
                <Badge {...solarBadgeConfig}>
                  <Avatar.Text size={40} label="SP" />
                </Badge>
              </View>
            </Card.Content>
          </Card>

          {/* Dividers */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Separadores</Title>
              <Paragraph>Separadores visuales entre secciones</Paragraph>
              
              <View className="mt-4">
                <Paragraph>Sección superior</Paragraph>
                <Divider />
                <Paragraph>Sección inferior</Paragraph>
              </View>
            </Card.Content>
          </Card>

          {/* Botones de acción */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Botones de Acción</Title>
              <Paragraph>Botones para abrir modales y diálogos</Paragraph>
              
              <View className="mt-4 space-y-3">
                <Button
                  mode="contained"
                  onPress={() => {
                    setModalVisible(true);
                    handleModalOpen('settings_modal', {});
                  }}
                >
                  Abrir Modal
                </Button>
                
                <Button
                  mode="contained"
                  onPress={() => {
                    setDialogVisible(true);
                    handleDialogOpen('confirmation_dialog', {});
                  }}
                >
                  Abrir Diálogo
                </Button>
                
                <Button
                  mode="contained"
                  onPress={() => {
                    setBottomSheetVisible(true);
                    handleBottomSheetOpen('options_sheet', {});
                  }}
                >
                  Abrir Bottom Sheet
                </Button>
                
                <Button
                  mode="contained"
                  onPress={() => {
                    setSnackbarVisible(true);
                    handleSnackbarShow('success_message', { message: 'Operación completada' });
                  }}
                >
                  Mostrar Snackbar
                </Button>
                
                <Button
                  mode="contained"
                  onPress={() => {
                    setTimePickerVisible(true);
                    handleTimePickerConfirm('schedule_time', {});
                  }}
                >
                  Seleccionar Hora
                </Button>
                
                <Button
                  mode="contained"
                  onPress={() => {
                    setDatePickerVisible(true);
                    handleDatePickerConfirm('schedule_date', {});
                  }}
                >
                  Seleccionar Fecha
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Pagination */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Paginación</Title>
              <Paragraph>Navegación entre páginas de datos</Paragraph>
              
              <View className="mt-4">
                <Pagination
                  page={currentPage}
                  numberOfPages={5}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    handlePaginationChange('data_pagination', { page });
                  }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Rating Bar */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Barra de Calificación</Title>
              <Paragraph>Calificación de eficiencia</Paragraph>
              
              <View className="mt-4">
                <RatingBar
                  value={rating}
                  onValueChange={(value) => {
                    setRating(value);
                    handleRatingChange('efficiency_rating', { value });
                  }}
                  maxValue={5}
                />
                <Paragraph>Calificación: {rating}/5</Paragraph>
              </View>
            </Card.Content>
          </Card>

          {/* FAB */}
          <Card className={themedClasses.card + ' mt-4'}>
            <Card.Content>
              <Title>Floating Action Button</Title>
              <Paragraph>Botón de acción flotante</Paragraph>
              
              <View className="mt-4 h-20">
                <FAB
                  icon="plus"
                  onPress={() => handleButtonPress('fab', 'add_device')}
                  style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Footer */}
          <View className="mt-6 p-4 bg-surface rounded-md">
            <Paragraph className="text-center">
              React Native Paper está configurado y funcionando
            </Paragraph>
            <Paragraph className="text-center mt-2">
              Todos los componentes se integran con el sistema de temas y analytics
            </Paragraph>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            handleModalClose('settings_modal', {});
          }}
          contentContainerStyle={{
            backgroundColor: paperTheme.colors.surface,
            padding: 20,
            margin: 20,
            borderRadius: paperTheme.roundness,
          }}
        >
          <Title>Configuración</Title>
          <Paragraph>Este es un modal de ejemplo para configuraciones.</Paragraph>
          <Button
            mode="contained"
            onPress={() => {
              setModalVisible(false);
              handleModalClose('settings_modal', {});
            }}
            className="mt-4"
          >
            Cerrar
          </Button>
        </Modal>
      </Portal>

      {/* Dialog */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => {
            setDialogVisible(false);
            handleDialogClose('confirmation_dialog', {});
          }}
        >
          <Dialog.Title>Confirmación</Dialog.Title>
          <Dialog.Content>
            <Paragraph>¿Estás seguro de que quieres realizar esta acción?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogVisible(false);
                handleDialogClose('confirmation_dialog', { confirmed: false });
              }}
            >
              Cancelar
            </Button>
            <Button
              onPress={() => {
                setDialogVisible(false);
                handleDialogClose('confirmation_dialog', { confirmed: true });
              }}
            >
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Bottom Sheet */}
      <Portal>
        <BottomSheet
          visible={bottomSheetVisible}
          onDismiss={() => {
            setBottomSheetVisible(false);
            handleBottomSheetClose('options_sheet', {});
          }}
        >
          <View style={{ padding: 20 }}>
            <Title>Opciones</Title>
            <List.Item
              title="Opción 1"
              onPress={() => {
                setBottomSheetVisible(false);
                handleBottomSheetClose('options_sheet', { selected: 'option1' });
              }}
            />
            <List.Item
              title="Opción 2"
              onPress={() => {
                setBottomSheetVisible(false);
                handleBottomSheetClose('options_sheet', { selected: 'option2' });
              }}
            />
            <List.Item
              title="Opción 3"
              onPress={() => {
                setBottomSheetVisible(false);
                handleBottomSheetClose('options_sheet', { selected: 'option3' });
              }}
            />
          </View>
        </BottomSheet>
      </Portal>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
          handleSnackbarDismiss('success_message', {});
        }}
        duration={3000}
      >
        Operación completada exitosamente
      </Snackbar>

      {/* Time Picker */}
      <TimePicker
        visible={timePickerVisible}
        onDismiss={() => {
          setTimePickerVisible(false);
          handleTimePickerConfirm('schedule_time', { dismissed: true });
        }}
        onConfirm={({ hours, minutes }) => {
          setTimePickerVisible(false);
          handleTimePickerConfirm('schedule_time', { hours, minutes });
        }}
      />

      {/* Date Picker */}
      <DatePicker
        visible={datePickerVisible}
        onDismiss={() => {
          setDatePickerVisible(false);
          handleDatePickerConfirm('schedule_date', { dismissed: true });
        }}
        onConfirm={({ year, month, day }) => {
          setDatePickerVisible(false);
          handleDatePickerConfirm('schedule_date', { year, month, day });
        }}
      />
    </PaperProvider>
  );
};

export default ReactNativePaperDemo;
