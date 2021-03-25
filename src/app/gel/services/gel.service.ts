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

  agregarEquipo( equipo: Equiposgel): Observable<Equiposgel>{
    return this.http.post<Equiposgel>(`${ this.baseUrl }/equipos`, equipo );
  }

  actualizarEquipo( equipo: Equiposgel): Observable<Equiposgel>{
    return this.http.put<Equiposgel>(`${ this.baseUrl }/equipos/${equipo.id}`, equipo );
  }

  // de la funcicion nos devolverá un objeto vacion en el momento
  // de haber efectuado el borrado del heroe
  borrarEquipo( id: string ): Observable<any>{
    return this.http.delete<any>(`${ this.baseUrl}/equipos/${ id }`);

  }

}
