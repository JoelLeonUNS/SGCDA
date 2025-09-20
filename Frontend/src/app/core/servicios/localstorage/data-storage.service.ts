import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DataStorageService {
  private claveRaiz = 'data_storage';

  // Obtener el objeto de almacenamiento raíz o un objeto vacío si no existe
  private obtenerRaiz(): Record<string, any> {
    const raizSerializada = localStorage.getItem(this.claveRaiz);
    return raizSerializada ? JSON.parse(raizSerializada) : {};
  }

  // Guardar el objeto de almacenamiento raíz
  private guardarRaiz(data: Record<string, any>): void {
    const datosSerializados = JSON.stringify(data, this.getCircularReplacer());
    localStorage.setItem(this.claveRaiz, datosSerializados);
  }

  // Función que elimina referencias circulares
  getCircularReplacer() {
    const seen = new WeakSet();
    return (key: any, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]"; // Evita el bucle
        }
        seen.add(value);
      }
      return value;
    };
  }

  // Guardar o actualizar un valor dentro de un namespace y contexto opcional
  guardarEnNamespace<T>(namespace: string, clave: string, valor: T, contexto: string | null = null): void {
    const raiz = this.obtenerRaiz();
    if (!raiz[namespace]) {
      raiz[namespace] = {};
    }
    if (contexto) {
      if (!raiz[namespace][contexto]) {
        raiz[namespace][contexto] = {};
      }
      raiz[namespace][contexto][clave] = valor;
    } else {
      raiz[namespace][clave] = valor;
    }
    this.guardarRaiz(raiz);
  }

  // Recuperar un valor específico dentro de un namespace y contexto opcional
  obtenerDeNamespace<T>(namespace: string, clave: string, valorPorDefecto: T, contexto: string | null = null): T {
    const raiz = this.obtenerRaiz();
    if (contexto) {
      return raiz[namespace] && raiz[namespace][contexto] && clave in raiz[namespace][contexto]
        ? raiz[namespace][contexto][clave]
        : valorPorDefecto;
    }
    return raiz[namespace] && clave in raiz[namespace] ? raiz[namespace][clave] : valorPorDefecto;
  }

  // Eliminar una clave específica dentro de un namespace y contexto opcional
  eliminarDeNamespace(namespace: string, clave: string, contexto: string | null = null): void {
    const raiz = this.obtenerRaiz();
    if (contexto && raiz[namespace] && raiz[namespace][contexto]) {
      delete raiz[namespace][contexto][clave];
      if (Object.keys(raiz[namespace][contexto]).length === 0) {
        delete raiz[namespace][contexto];
      }
    } else if (raiz[namespace] && clave in raiz[namespace]) {
      delete raiz[namespace][clave];
    }
    this.guardarRaiz(raiz);
  }

  // Limpiar todos los datos dentro de un namespace o contexto opcional
  limpiarNamespace(namespace: string, contexto: string | null = null): void {
    const raiz = this.obtenerRaiz();
    if (contexto && raiz[namespace]) {
      delete raiz[namespace][contexto];
      if (Object.keys(raiz[namespace]).length === 0) {
        delete raiz[namespace];
      }
    } else if (raiz[namespace]) {
      delete raiz[namespace];
    }
    this.guardarRaiz(raiz);
  }

  // Limpiar todos los valores de un contexto específico de todos los namespaces
  limpiarContexto(contexto: string): void {
    const raiz = this.obtenerRaiz();
    for (const namespace in raiz) {
      if (raiz[namespace] && raiz[namespace][contexto]) {
        delete raiz[namespace][contexto];
      }
    }
    this.guardarRaiz(raiz);
  }

  // Limpiar todos los datos (reinicia todo el data_storage)
  limpiarTodo(): void {
    localStorage.removeItem(this.claveRaiz);
  }
}

