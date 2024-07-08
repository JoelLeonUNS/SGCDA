import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  UserOutline,
  LockOutline,
  HomeOutline,
  PlusOutline,
  FileExcelOutline,
  FilePdfOutline,
  UsergroupAddOutline,
  SearchOutline,
  DatabaseOutline,
  ToolOutline,
  SaveOutline,
  CheckOutline,
  RedoOutline,
  ControlOutline,
  CalculatorOutline,
  BuildOutline,
  SwapOutline,
  CalendarOutline,
  SettingOutline,
  ProjectOutline,
  FileTextOutline,
  ReadOutline,
  FileSyncOutline,
  DollarOutline,
  ApartmentOutline,
  IdcardOutline,
  CreditCardOutline,
  ProfileOutline,
  ScheduleOutline,
  BarChartOutline,
  DashOutline,
  EuroOutline,
  BgColorsOutline,
  NumberOutline,
  PercentageOutline,
  LoadingOutline,
  DownloadOutline,
  WalletOutline,
  BankOutline,
  FileDoneOutline,
  CarryOutOutline,
  SelectOutline,
  FileOutline,
  MehOutline,
  SendOutline,
  SlidersOutline,
  EyeInvisibleOutline,
  EyeOutline,
  TeamOutline,
  LogoutOutline,
  EditOutline,
  ExportOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  UserOutline,
  LockOutline,
  HomeOutline,
  PlusOutline,
  FileExcelOutline,
  FilePdfOutline,
  UsergroupAddOutline,
  SearchOutline,
  DatabaseOutline,
  ToolOutline,
  SaveOutline,
  CheckOutline,
  RedoOutline,
  ControlOutline,
  CalculatorOutline,
  BuildOutline,
  SwapOutline,
  CalendarOutline,
  SettingOutline,
  ProjectOutline,
  FileTextOutline,
  ReadOutline,
  FileSyncOutline,
  DollarOutline,
  ApartmentOutline,
  IdcardOutline,
  CreditCardOutline,
  ProfileOutline,
  ScheduleOutline,
  BarChartOutline,
  DashOutline,
  EuroOutline,
  BgColorsOutline,
  NumberOutline,
  PercentageOutline,
  LoadingOutline,
  DownloadOutline,
  WalletOutline,
  BankOutline,
  FileDoneOutline,
  CarryOutOutline,
  SelectOutline,
  FileOutline,
  MehOutline,
  SendOutline,
  SlidersOutline,
  EyeInvisibleOutline,
  EyeOutline,
  TeamOutline,
  LogoutOutline,
  EditOutline,
  ExportOutline,
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}
