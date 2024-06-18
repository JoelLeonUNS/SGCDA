import { ColumnaTabla } from "./columna-tabla.interface";

export interface TablaFormato {
    titulo?: string;
    nombre: string;
    columnas: ColumnaTabla[];
    total?: string;
}