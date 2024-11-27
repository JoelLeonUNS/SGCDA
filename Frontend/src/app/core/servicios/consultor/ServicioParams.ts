import { ParametroPaginado } from "../../interfaces/utilidades/parametro-paginado";
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class ServicioParams<T> {
  
  private paramsSubject = new BehaviorSubject<ParametroPaginado>({
    pageIndex: 1,
    pageSize: 10,
    sortField: null,
    sortOrder: null,
    searchTerm: '',
    searchColumn: null,
    range: null,
    filter: [],
  });

  constructor() {
  }

  // Observable global
  params$ = this.paramsSubject.asObservable();

  // Observables específicos por propiedad
  pageIndex$ = this.params$.pipe(
    map((params) => params.pageIndex),
    distinctUntilChanged() // Solo emite si cambia el valor
  );

  pageSize$ = this.params$.pipe(
    map((params) => params.pageSize),
    distinctUntilChanged()
  );

  sortField$ = this.params$.pipe(
    map((params) => params.sortField),
    distinctUntilChanged()
  );

  sortOrder$ = this.params$.pipe(
    map((params) => params.sortOrder),
    distinctUntilChanged()
  );

  searchTerm$ = this.params$.pipe(
    map((params) => params.searchTerm),
    distinctUntilChanged()
  );

  searchColumn$ = this.params$.pipe(
    map((params) => params.searchColumn),
    distinctUntilChanged()
  );

  range$ = this.params$.pipe(
    map((params) => params.range),
    distinctUntilChanged()
  );

  filter$ = this.params$.pipe(
    map((params) => params.filter),
    distinctUntilChanged()
  );

  // Emisor para eventos personalizados
  cambios$ = new Subject<string>();

  // Obtener el valor actual de los parámetros
  get params(): ParametroPaginado {
    return this.paramsSubject.value;
  }

  // Método para actualizar todos los parámetros
  updateParametros(params: Partial<ParametroPaginado>): void {
    const updatedParams = { ...this.paramsSubject.value, ...params };
    this.paramsSubject.next(updatedParams);
  }

  // Métodos para actualizar parámetros
  updateParametro(key: keyof ParametroPaginado, value: any): void {
    const updatedParams = { ...this.paramsSubject.value, [key]: value };

    // Validar antes de emitir si es necesario
    if (this.validarParametro(key, value)) {
      this.paramsSubject.next(updatedParams);
      this.cambios$.next(`Se actualizó ${key} a ${value}`);
    }
  }

  // Validación personalizada
  private validarParametro(key: keyof ParametroPaginado, value: any): boolean {
    // Ejemplo de validación: el tamaño de página debe ser mayor a 0
    switch (key) {
      case 'pageSize':
      if (value <= 0) {
        console.warn(`El valor de ${key} debe ser mayor a 0.`);
        return false;
      }
      break;
      case 'pageIndex':
      if (value <= 0) {
        console.warn(`El valor de ${key} debe ser mayor a 0.`);
        return false;
      }
      break;
      case 'searchColumn':
      if (value == null) {
        console.warn(`El valor de ${key} no puede ser vacío.`);
        return false;
      }
      // Se puede agregar más validaciones aquí según sea necesario
    }
    return true;
  }

}