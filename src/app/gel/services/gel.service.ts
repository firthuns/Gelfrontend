import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Equiposgel} from '../interfaces/equipogel.interface';

@Injectable({
  providedIn: 'root'
})
export class GelService {

  constructor( private http: HttpClient ) { }


  public  getEquipos(): Observable<Equiposgel[]> {
    return this.http.get<Equiposgel[]>('http://localhost:3000/equipos');
  }

}
