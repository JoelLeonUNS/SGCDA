import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { PipeFormato } from './pipe-formato.interface';

export interface ColumnItem {
  name: string;
  columnKey?: string;
  attribute?: string;
  width?: string | null;
  showSort?: boolean;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: boolean | NzTableSortFn<any> | null;
  sortDirections?: NzTableSortOrder[];
  listOfFilter?: NzTableFilterList;
  showFilter?: boolean;
  filterFn?: NzTableFilterFn<any> | boolean | null;
  filterMultiple?: boolean;
  left?: boolean | string;
  right?: boolean | string;
  align?: 'left' | 'right' | 'center';
  pipe?: PipeFormato;
  etiquetable?: boolean
  editable?: boolean;
  checkeable?: boolean;
}
