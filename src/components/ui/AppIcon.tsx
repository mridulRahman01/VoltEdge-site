'use client';

import React from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Home,
  Cpu,
  ArrowRight,
  Package,
  ChevronRight,
  Star,
  Shield,
  CreditCard,
  Truck,
  RefreshCw,
  Calculator,
  Laptop,
  Zap,
  HardDrive,
  Monitor,
  Wind,
  Box,
  CircuitBoard,
  MemoryStick,
  Check,
  MapPin,
  Eye,
  EyeOff,
  GitCompare,
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  Minus,
  Share2,
  Save,
  AlertTriangle,
  Info,
  TrendingUp,
  Award,
  Clock,
  Tag,
  Percent,
  Bell,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  Palette,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  ArrowLeft,
  ExternalLink,
  Copy,
  Download,
  Upload,
  BarChart2,
  PieChart,
  Activity,
  Globe,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Headphones,
  Wifi,
  Camera,
  Gamepad2,
  Printer,
  Lock,
  Unlock,
  RotateCcw,
  RefreshCcw,
  Loader2,
  ChevronLeft,
  MoreHorizontal,
  Bookmark,
  Edit,
  Send,
  Calendar,
  Navigation,
  Building,
  Store,
  Package2,
  Image,
  Video,
  File,
  FileText,
  Folder,
  Database,
  Server,
  Cloud,
  Bluetooth,
  Keyboard,
  Mouse,
  Speaker,
  Mic,
  Volume2,
  Power,
  Tv,
  Smartphone,
  Tablet,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  // Search & Navigation
  SearchIcon: Search,
  HomeIcon: Home,
  ArrowRightIcon: ArrowRight,
  ArrowLeftIcon: ArrowLeft,
  ChevronRightIcon: ChevronRight,
  ChevronLeftIcon: ChevronLeft,
  ChevronDownIcon: ChevronDown,
  ChevronUpIcon: ChevronUp,
  ExternalLinkIcon: ExternalLink,

  // Shopping
  ShoppingCartIcon: ShoppingCart,
  HeartIcon: Heart,
  BookmarkIcon: Bookmark,
  TagIcon: Tag,
  PercentIcon: Percent,

  // User & Auth
  UserIcon: User,
  LogInIcon: LogIn,
  LogOutIcon: LogOut,
  UserPlusIcon: UserPlus,
  LockIcon: Lock,
  UnlockIcon: Unlock,
  EyeIcon: Eye,
  EyeOffIcon: EyeOff,
  ShieldIcon: Shield,
  ShieldCheckIcon: ShieldCheck,

  // UI Controls
  MenuIcon: Menu,
  XIcon: X,
  PlusIcon: Plus,
  MinusIcon: Minus,
  MoreHorizontalIcon: MoreHorizontal,
  FilterIcon: Filter,
  SlidersIcon: SlidersHorizontal,
  GridIcon: Grid,
  ListIcon: List,

  // Theme
  SunIcon: Sun,
  MoonIcon: Moon,
  PaletteIcon: Palette,

  // PC Components
  CpuIcon: Cpu,
  CircuitBoardIcon: CircuitBoard,
  MemoryStickIcon: MemoryStick,
  MonitorIcon: Monitor,
  HardDriveIcon: HardDrive,
  ZapIcon: Zap,
  BoxIcon: Box,
  WindIcon: Wind,

  // Products
  PackageIcon: Package,
  Package2Icon: Package2,
  LaptopIcon: Laptop,
  SmartphoneIcon: Smartphone,
  TabletIcon: Tablet,
  HeadphonesIcon: Headphones,
  CameraIcon: Camera,
  PrinterIcon: Printer,
  TvIcon: Tv,
  GamepadIcon: Gamepad2,
  KeyboardIcon: Keyboard,
  MouseIcon: Mouse,
  SpeakerIcon: Speaker,
  WifiIcon: Wifi,
  BluetoothIcon: Bluetooth,

  // Actions
  CheckIcon: Check,
  TrashIcon: Trash2,
  EditIcon: Edit,
  ShareIcon: Share2,
  SaveIcon: Save,
  CopyIcon: Copy,
  DownloadIcon: Download,
  UploadIcon: Upload,
  SendIcon: Send,

  // Status & Info
  AlertTriangleIcon: AlertTriangle,
  InfoIcon: Info,
  StarIcon: Star,
  TrendingUpIcon: TrendingUp,
  AwardIcon: Award,
  ActivityIcon: Activity,
  LoaderIcon: Loader2,
  RefreshCwIcon: RefreshCw,
  RefreshCcwIcon: RefreshCcw,
  RotateCcwIcon: RotateCcw,

  // Commerce
  CreditCardIcon: CreditCard,
  TruckIcon: Truck,
  CalculatorIcon: Calculator,
  MapPinIcon: MapPin,
  BuildingIcon: Building,
  StoreIcon: Store,

  // Communication
  BellIcon: Bell,
  MailIcon: Mail,
  MessageSquareIcon: MessageSquare,
  PhoneIcon: Phone,

  // Social
  FacebookIcon: Globe,
  TwitterIcon: Globe,
  InstagramIcon: Globe,
  YoutubeIcon: Globe,
  LinkedinIcon: Globe,
  GithubIcon: Globe,
  GlobeIcon: Globe,

  // Compare & Analytics
  GitCompareIcon: GitCompare,
  BarChart2Icon: BarChart2,
  PieChartIcon: PieChart,

  // Settings
  SettingsIcon: Settings,

  // Time
  ClockIcon: Clock,
  CalendarIcon: Calendar,

  // Power
  PowerIcon: Power,

  // Media
  VolumeIcon: Volume2,
  MicIcon: Mic,
  ImageIcon: Image,
  VideoIcon: Video,

  // Files
  FileIcon: File,
  FileTextIcon: FileText,
  FolderIcon: Folder,
  DatabaseIcon: Database,
  ServerIcon: Server,
  CloudIcon: Cloud,
};

interface IconProps {
  name: string;
  variant?: 'outline' | 'solid';
  size?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}

export default function AppIcon({
  name,
  variant = 'outline',
  size = 24,
  className = '',
  onClick,
  disabled = false,
  ...props
}: IconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    // Fallback to Info icon instead of question mark
    const FallbackIcon = Info;
    return (
      <FallbackIcon
        width={size}
        height={size}
        className={`text-muted-foreground ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        onClick={disabled ? undefined : onClick}
      />
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
    />
  );
}
