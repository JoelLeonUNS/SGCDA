import { PipeFormato } from "./pipe-formato.interface";

export interface TicketFormato {
    nombre: string;
    secciones: TicketSeccion[];
}

export interface TicketSeccion {
    divisor?: DivisorTicket; // puede ser un array de divisores o un solo divisor
    lista?: ListaTicket; // lista es el contenido
    tipo?: 'DIVISOR' | 'LISTA' | 'TABLA' | 'ENCABEZADO' | 'PIE'; // tipo de seccion
}

export interface ListaTicket {
    y?: number;
    x?: number;
    width?: number;
    margenY?: number;
    filas: FilaTicket[];
    config?: any;
}

export interface FilaTicket {
    nombre?: string | string[];
    atributo: string; 
    atributos?: string[]; // si se quiere mostrar mas de un atributo
    maxFilas?: number; // el numero maximo de filas que puede tener la lista
    pipe?: PipeFormato;
    pipes?: PipeFormato[]; // si se quiere mostrar mas de un atributo
}

export interface DivisorTicket {
    y?: number;
    x?:number;
    width?:number;
    margenY?: number;
    titulo?: string;
    tipo: 'SIMPLE' | 'DOBLE';
    config?: any;
}