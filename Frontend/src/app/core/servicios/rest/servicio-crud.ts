import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ParametroPaginado } from '../../interfaces/utilidades/parametro-paginado';
import { HttpClient } from '@angular/common/http';

export abstract class ServicioCrud<T> {

  protected constructor(
    protected http: HttpClient,
    protected API_URL: string
  ) {}

  protected getStorage(): T[] {
    const key = this.API_URL.split('/').pop();
    const data = localStorage.getItem(key??'');
    return data ? JSON.parse(data) : [];
  }

  protected setStorage(data: T[]): void {
    const key = this.API_URL.split('/').pop();
    localStorage.setItem(key??'', JSON.stringify(data));
  }

  obtenerTodos(): Observable<T[]> {
    return of(this.getStorage()).pipe(delay(300));
  }

  obtenerTodosConNombre(): Observable<any[]> {
    // Implementa según tus necesidades
    return this.obtenerTodos();
  }

  obtenerPorId(id: number): Observable<T | null> {
    const item = this.getStorage().find(i => (i as any).id === id);
    return of(item || null).pipe(delay(300));
  }

  crear(data: T): Observable<T> {
    const items = this.getStorage();
    const newItem = { ...data, id: this.getNextId() };
    items.push(newItem);
    this.setStorage(items);
    return of(newItem).pipe(delay(300));
  }

  actualizar(id: number, data: T): Observable<T | null> {
    let items = this.getStorage();
    const index = items.findIndex(i => (i as any).id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...data };
      this.setStorage(items);
      return of(items[index]).pipe(delay(300));
    }
    return of(null).pipe(delay(300));
  }

  eliminar(id: number): Observable<any> {
    let items = this.getStorage();
    items = items.filter(i => (i as any).id !== id);
    this.setStorage(items);
    return of({ success: true }).pipe(delay(300));
  }

  cambiarEstado(id: number, data: any): Observable<any> {
    return this.actualizar(id, data);
  }

  obtenerActivos(): Observable<T[]> {
    const items = this.getStorage().filter(i => (i as any).estado === 1);
    return of(items).pipe(delay(300));
  }

  obtenerUltimaId(): Observable<any> {
    const items = this.getStorage();
    const lastId = items.length > 0 ? Math.max(...items.map(i => (i as any).id)) : 0;
    return of({ id: lastId }).pipe(delay(300));
  }

  obtenerTodoPag(p: ParametroPaginado): Observable<any> {
    let items = this.getStorage();
    // Implementa la lógica de paginación, ordenamiento y filtrado aquí
    // Este es un ejemplo básico
    const startIndex = p.pageIndex - 1;
    const endIndex = startIndex + p.pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);
    console.log('paginado', paginatedItems);
    return of({
      data: paginatedItems,
      total: items.length
    }).pipe(delay(300));
  }

  private getNextId(): number {
    const items = this.getStorage();
    return items.length > 0 ? Math.max(...items.map(i => (i as any).id)) + 1 : 1;
  }
}
