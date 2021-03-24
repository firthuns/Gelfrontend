import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Equiposgel} from '../interfaces/equipogel.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GelService {

  private baseUrl: string = environment.basdeURL;


  constructor( private http: HttpClient ) { }


  public  getEquipos(): Observable<Equiposgel[]> {
    return this.http.get<Equiposgel[]>( `${this.baseUrl}/equipos`);
  }

  /* vamos a realizar busqueda similares a nuestro termino, limitandolo
  a un limite = 5  */
  getSugerencias(termino: string ): Observable<Equiposgel[]>{
    return this.http.get<Equiposgel[]>
    (`${ this.baseUrl }/equipos?q=${ termino }&_limit=5`);
  }

  getEquipoPorId( id: string ): Observable<Equiposgel>{
    return this.http.get<Equiposgel>( `${ this.baseUrl}/equipos/${ id }`);
  }

}
