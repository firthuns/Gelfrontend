import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthResponse} from '../interfaces/interfaces';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseURl: string = environment.basdeURL;
  private _auth: AuthResponse | undefined; // como esta privado haremos un getter
  /*lo Hemos desestructurado para evitar que accidentalmente se transforme
  * el valor */
  get auth(): AuthResponse {
    return { ...this._auth! }; // como estamos en el modo estricto de angular
                              // hay que decir que siempre tendrá un valor
  }

  constructor( private http: HttpClient ) { }


  verificaAutentificacion(): Observable<boolean>  {

    if ( !localStorage.getItem('token')){
      return of (false); // obligo que devuyelva un observable siempre
    }

    return  this.http.get<AuthResponse>(`${ this.baseURl }/usuarios/1`)
      .pipe(
        map( auth => {
          // console.log( 'map', auth);
          this._auth = auth;
          return true;
          // operador map-> transforma valores....en nuestro caso si usuario existe devuelve true..
        })
      );
  }

  /* Vamos a almacenar el resultado del login para que podamos utilizar
   * los datos del usuario a lo largo de la ejecución del programa, utilizando un pipe,
   * ya que si utilizo ewl subscribe, posteriormente no lo pondría utilizar,
   * y por jerarquia cuando utilicemos la función get.... se ejecutara primeramente
   * el pipe(tap) , luego el subscribe donde se implemente */

  login(){
      return  this.http.get<AuthResponse>(`${ this.baseURl }/usuarios/1`)
        .pipe(
          tap( auth => this._auth = auth),
          tap( auth =>  localStorage.setItem('token', auth.id)), // hemos guardado
        );
  }

  /*el operador tap, se ejecutara ante del subscribe en el parte del login.ts*/

  logout() {
    localStorage.clear();
  }

}
