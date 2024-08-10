import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { ServicioCrud } from '../servicio-crud';

@Injectable({
  providedIn: 'root'
})

export class PabellonService  extends ServicioCrud<any> {
  
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/pabellones`);
  }

}