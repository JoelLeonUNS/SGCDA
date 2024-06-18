import { ColumnaTabla } from "./columna-tabla.interface";

export interface ParametrosPdf {
    titulo: string;
    mostrarTitulo?: boolean;
    datosTabla?: any[] | any;
    montoTotal?: number;
    columnasTabla?: ColumnaTabla[];
    orientacion?: 'portrait' | 'landscape';
    mostrarPaginaInicial?: boolean;
    mostrarPaginaFinal?: boolean;
    mostrarLogo?: boolean;
    mostrarMarcaAgua?: boolean;
    mostrarPaginacion?: boolean;
    mostrarTotalPaginas?: boolean;
    contenidoPiePagina?: string;
    mostrarPiePagina?: boolean;
    mostrarFecha?: boolean;
    contenidoEncabezado?: string;
    mostrarEncabezado?: boolean;
}