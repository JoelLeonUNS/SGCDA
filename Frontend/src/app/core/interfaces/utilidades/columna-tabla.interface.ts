import { PipeFormato } from "./pipe-formato.interface";

export interface ColumnaTabla {
    encabezado: string;
    atributo: string;
    ancho?: 'auto' | 'wrap' | number;
    alineacion?: 'left' | 'center' | 'right' | 'justify';
    pipe?: PipeFormato;
}
