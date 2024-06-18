import { PipeFormato } from './pipe-formato.interface';

export interface TicketItem {
  name?: string;
  attribute: string;
  align?: 'left' | 'right' | 'center';
  pipe?: PipeFormato;
  etiquetable?: boolean
}
