import { ColumnaTabla } from "./columna-tabla.interface";

export interface ParametrosExcel {
  titulo: string;
  datosTabla?: any[];
  columnasTabla?: ColumnaTabla[];
  montoTotal?: number; // por el momento solo se usa para el total de la tabla, luego lo ideal es implementar una lógica desacoplada, como podría ser usar otra interfaz
}
