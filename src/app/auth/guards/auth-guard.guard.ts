import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanLoad, CanActivate {

  constructor( private authService: AuthService,
               private  router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean > | boolean  {

    return  this.authService.verificaAutentificacion()
      .pipe(
        tap( estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigate(['./auth/login']);
          }
        })
      );


    // // perguntado si existe el auth.id
    //
    //
    //
    // if ( this.authService.auth.id){
    //   return true;
    // }
    // console.log('Bloqueado por el AuthGuard - CanActivate');
    // return false;
    // return  this.authService.verificaAutentificacion()
    //   .pipe(
    //     tap( estaAutenticado => {
    //       if (!estaAutenticado){
    //         this.router.navigate(['./auth/login']);
    //       }
    //     })
    //   );
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> |  boolean {

return  this.authService.verificaAutentificacion()
  .pipe(
    tap( estaAutenticado => {
      if (!estaAutenticado){
        this.router.navigate(['./auth/login']);
      }
    })
  );
    //  // perguntado si existe el auth.id
    //    if ( this.authService.auth.id){
    //      return true;
    //    }
    // console.log('Bloqueado por el AuthGuard -CanLoad');
    //
    // // console.log('canload', false);
    // // console.log(route);
    // // console.log(segments);
    //
    // return false;
  }




}

