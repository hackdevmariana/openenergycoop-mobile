import React from 'react';
import {
  Home,
  BarChart3,
  Zap,
  User,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Share2,
  Download,
  Upload,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Camera,
  Image,
  Video,
  Music,
  File,
  Folder,
  Database,
  Server,
  Wifi,
  Signal,
  Battery,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  HardDrive,
  Cpu,
  MemoryStick,
  Power,
  PowerOff,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Key,
  KeyRound,
  Fingerprint,
  CreditCard,
  Wallet,
  PiggyBank,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  Activity,
  Pulse,
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Moon,
  CloudLightning,
  Umbrella,
  Snowflake,
  Leaf,
  Tree,
  Flower,
  Seedling,
  Sprout,
  Bug,
  Fish,
  Bird,
  Cat,
  Dog,
  Horse,
  Cow,
  Pig,
  Sheep,
  Chicken,
  Egg,
  Milk,
  Apple,
  Carrot,
  Bread,
  Coffee,
  Tea,
  Wine,
  Beer,
  Pizza,
  Hamburger,
  IceCream,
  Cake,
  Cookie,
  Candy,
  Gift,
  PartyPopper,
  Balloon,
  CakeSlice,
  Birthday,
  CalendarDays,
  Clock3,
  Timer,
  Stopwatch,
  AlarmClock,
  Bell,
  BellOff,
  BellRing,
  Volume,
  Volume1,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Shuffle,
  Repeat,
  Repeat1,
  Shuffle2,
  SkipBack2,
  SkipForward2,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipBackCircle,
  SkipForwardCircle,
  RewindCircle,
  FastForwardCircle,
  ShuffleCircle,
  RepeatCircle,
  Repeat1Circle,
  Shuffle2Circle,
  SkipBack2Circle,
  SkipForward2Circle,
  PlaySquare,
  PauseSquare,
  StopSquare,
  SkipBackSquare,
  SkipForwardSquare,
  RewindSquare,
  FastForwardSquare,
  ShuffleSquare,
  RepeatSquare,
  Repeat1Square,
  Shuffle2Square,
  SkipBack2Square,
  SkipForward2Square,
  LucideIcon,
} from 'lucide-react';

// Tipos para iconos
export type IconName = 
  | 'home' | 'chart' | 'energy' | 'profile' | 'settings'
  | 'search' | 'plus' | 'edit' | 'delete' | 'view' | 'hide'
  | 'lock' | 'unlock' | 'mail' | 'phone' | 'location' | 'calendar' | 'clock'
  | 'star' | 'heart' | 'share' | 'download' | 'upload' | 'refresh'
  | 'alert' | 'success' | 'error' | 'info' | 'help' | 'external'
  | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevron-down'
  | 'menu' | 'close' | 'filter' | 'sort-asc' | 'sort-desc'
  | 'grid' | 'list' | 'maximize' | 'minimize' | 'rotate-left' | 'rotate-right'
  | 'zoom-in' | 'zoom-out' | 'camera' | 'image' | 'video' | 'music'
  | 'file' | 'folder' | 'database' | 'server' | 'wifi' | 'signal'
  | 'battery' | 'volume' | 'volume-off' | 'mic' | 'mic-off'
  | 'headphones' | 'speaker' | 'monitor' | 'smartphone' | 'tablet'
  | 'watch' | 'keyboard' | 'mouse' | 'printer' | 'scanner'
  | 'hard-drive' | 'cpu' | 'memory' | 'power' | 'power-off'
  | 'shield' | 'shield-check' | 'shield-alert' | 'shield-x'
  | 'key' | 'key-round' | 'fingerprint' | 'credit-card' | 'wallet'
  | 'piggy-bank' | 'trending-up' | 'trending-down' | 'dollar' | 'euro'
  | 'pound' | 'bitcoin' | 'activity' | 'pulse' | 'thermometer'
  | 'droplets' | 'wind' | 'cloud' | 'cloud-rain' | 'cloud-snow'
  | 'sun' | 'moon' | 'cloud-lightning' | 'umbrella' | 'snowflake'
  | 'leaf' | 'tree' | 'flower' | 'seedling' | 'sprout'
  | 'bug' | 'fish' | 'bird' | 'cat' | 'dog' | 'horse' | 'cow'
  | 'pig' | 'sheep' | 'chicken' | 'egg' | 'milk' | 'apple'
  | 'carrot' | 'bread' | 'coffee' | 'tea' | 'wine' | 'beer'
  | 'pizza' | 'hamburger' | 'ice-cream' | 'cake' | 'cookie'
  | 'candy' | 'gift' | 'party' | 'balloon' | 'cake-slice'
  | 'birthday' | 'calendar-days' | 'clock3' | 'timer' | 'stopwatch'
  | 'alarm' | 'bell' | 'bell-off' | 'bell-ring' | 'volume1'
  | 'play' | 'pause' | 'stop' | 'skip-back' | 'skip-forward'
  | 'rewind' | 'fast-forward' | 'shuffle' | 'repeat' | 'repeat1'
  | 'shuffle2' | 'skip-back2' | 'skip-forward2' | 'rewind-circle'
  | 'fast-forward-circle' | 'shuffle-circle' | 'repeat-circle'
  | 'repeat1-circle' | 'shuffle2-circle' | 'skip-back2-circle'
  | 'skip-forward2-circle' | 'play-circle' | 'pause-circle'
  | 'stop-circle' | 'skip-back-circle' | 'skip-forward-circle'
  | 'play-square' | 'pause-square' | 'stop-square' | 'skip-back-square'
  | 'skip-forward-square' | 'rewind-square' | 'fast-forward-square'
  | 'shuffle-square' | 'repeat-square' | 'repeat1-square'
  | 'shuffle2-square' | 'skip-back2-square' | 'skip-forward2-square';

// Mapeo de nombres a componentes de iconos
export const ICON_MAP: Record<IconName, LucideIcon> = {
  // Navegación
  home: Home,
  chart: BarChart3,
  energy: Zap,
  profile: User,
  settings: Settings,
  
  // Acciones básicas
  search: Search,
  plus: Plus,
  edit: Edit,
  delete: Trash2,
  view: Eye,
  hide: EyeOff,
  
  // Seguridad
  lock: Lock,
  unlock: Unlock,
  key: Key,
  'key-round': KeyRound,
  fingerprint: Fingerprint,
  shield: Shield,
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  'shield-x': ShieldX,
  
  // Comunicación
  mail: Mail,
  phone: Phone,
  location: MapPin,
  calendar: Calendar,
  clock: Clock,
  
  // Interacción
  star: Star,
  heart: Heart,
  share: Share2,
  download: Download,
  upload: Upload,
  refresh: RefreshCw,
  
  // Estados
  alert: AlertCircle,
  success: CheckCircle,
  error: XCircle,
  info: Info,
  help: HelpCircle,
  external: ExternalLink,
  
  // Navegación
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  menu: Menu,
  close: X,
  
  // Organización
  filter: Filter,
  'sort-asc': SortAsc,
  'sort-desc': SortDesc,
  grid: Grid,
  list: List,
  maximize: Maximize,
  minimize: Minimize,
  
  // Manipulación
  'rotate-left': RotateCcw,
  'rotate-right': RotateCw,
  'zoom-in': ZoomIn,
  'zoom-out': ZoomOut,
  
  // Multimedia
  camera: Camera,
  image: Image,
  video: Video,
  music: Music,
  
  // Archivos
  file: File,
  folder: Folder,
  database: Database,
  server: Server,
  
  // Dispositivos
  wifi: Wifi,
  signal: Signal,
  battery: Battery,
  volume: Volume2,
  'volume-off': VolumeX,
  volume1: Volume,
  mic: Mic,
  'mic-off': MicOff,
  headphones: Headphones,
  speaker: Speaker,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  watch: Watch,
  keyboard: Keyboard,
  mouse: Mouse,
  printer: Printer,
  scanner: Scanner,
  'hard-drive': HardDrive,
  cpu: Cpu,
  memory: MemoryStick,
  power: Power,
  'power-off': PowerOff,
  
  // Finanzas
  'credit-card': CreditCard,
  wallet: Wallet,
  'piggy-bank': PiggyBank,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  dollar: DollarSign,
  euro: Euro,
  pound: PoundSterling,
  bitcoin: Bitcoin,
  
  // Salud y actividad
  activity: Activity,
  pulse: Pulse,
  thermometer: Thermometer,
  
  // Naturaleza
  droplets: Droplets,
  wind: Wind,
  cloud: Cloud,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  sun: Sun,
  moon: Moon,
  'cloud-lightning': CloudLightning,
  umbrella: Umbrella,
  snowflake: Snowflake,
  leaf: Leaf,
  tree: Tree,
  flower: Flower,
  seedling: Seedling,
  sprout: Sprout,
  
  // Animales
  bug: Bug,
  fish: Fish,
  bird: Bird,
  cat: Cat,
  dog: Dog,
  horse: Horse,
  cow: Cow,
  pig: Pig,
  sheep: Sheep,
  chicken: Chicken,
  egg: Egg,
  milk: Milk,
  
  // Comida
  apple: Apple,
  carrot: Carrot,
  bread: Bread,
  coffee: Coffee,
  tea: Tea,
  wine: Wine,
  beer: Beer,
  pizza: Pizza,
  hamburger: Hamburger,
  'ice-cream': IceCream,
  cake: Cake,
  cookie: Cookie,
  candy: Candy,
  
  // Celebración
  gift: Gift,
  party: PartyPopper,
  balloon: Balloon,
  'cake-slice': CakeSlice,
  birthday: Birthday,
  
  // Tiempo
  'calendar-days': CalendarDays,
  clock3: Clock3,
  timer: Timer,
  stopwatch: Stopwatch,
  alarm: AlarmClock,
  
  // Notificaciones
  bell: Bell,
  'bell-off': BellOff,
  'bell-ring': BellRing,
  
  // Reproducción
  play: Play,
  pause: Pause,
  stop: Stop,
  'skip-back': SkipBack,
  'skip-forward': SkipForward,
  rewind: Rewind,
  'fast-forward': FastForward,
  shuffle: Shuffle,
  repeat: Repeat,
  repeat1: Repeat1,
  shuffle2: Shuffle2,
  'skip-back2': SkipBack2,
  'skip-forward2': SkipForward2,
  
  // Reproducción con círculo
  'rewind-circle': RewindCircle,
  'fast-forward-circle': FastForwardCircle,
  'shuffle-circle': ShuffleCircle,
  'repeat-circle': RepeatCircle,
  'repeat1-circle': Repeat1Circle,
  'shuffle2-circle': Shuffle2Circle,
  'skip-back2-circle': SkipBack2Circle,
  'skip-forward2-circle': SkipForward2Circle,
  'play-circle': PlayCircle,
  'pause-circle': PauseCircle,
  'stop-circle': StopCircle,
  'skip-back-circle': SkipBackCircle,
  'skip-forward-circle': SkipForwardCircle,
  
  // Reproducción con cuadrado
  'play-square': PlaySquare,
  'pause-square': PauseSquare,
  'stop-square': StopSquare,
  'skip-back-square': SkipBackSquare,
  'skip-forward-square': SkipForwardSquare,
  'rewind-square': RewindSquare,
  'fast-forward-square': FastForwardSquare,
  'shuffle-square': ShuffleSquare,
  'repeat-square': RepeatSquare,
  'repeat1-square': Repeat1Square,
  'shuffle2-square': Shuffle2Square,
  'skip-back2-square': SkipBack2Square,
  'skip-forward2-square': SkipForward2Square,
};

// Props para el componente Icon
export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  fill?: string;
  onClick?: () => void;
  style?: any;
}

// Componente Icon principal
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  fill = 'none',
  onClick,
  style,
}) => {
  const IconComponent = ICON_MAP[name];
  
  if (!IconComponent) {
    console.warn(`Icono no encontrado: ${name}`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
      fill={fill}
      onClick={onClick}
      style={style}
    />
  );
};

// Hook para obtener icono
export const useIcon = (name: IconName) => {
  return ICON_MAP[name];
};

// Función para verificar si un icono existe
export const hasIcon = (name: string): name is IconName => {
  return name in ICON_MAP;
};

// Función para obtener lista de iconos disponibles
export const getAvailableIcons = (): IconName[] => {
  return Object.keys(ICON_MAP) as IconName[];
};

// Configuración por defecto
export const defaultIconConfig = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  fill: 'none',
};

// Exportar tipos
export type { LucideIcon };
