export interface ColumnaBusqueda {
  name: string;
  columnKey: string;
  type?:'DATE' | 'MONTH' | 'YEAR' | 'NUMBER' | 'TEXT';
  default?: boolean;
}
