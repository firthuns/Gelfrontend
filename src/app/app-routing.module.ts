import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HidrogelPageComponent} from './shared/hidrogel-page/hidrogel-page.component';
import {AuthGuardGuard} from './auth/guards/auth-guard.guard';


/* Aqui empezamos la base del árbol.....
*
* introducimod rutas hijas ... /equipos*/
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)

  },
  {
    path: 'equipos',
    loadChildren: () => import('./gel/gel.module').then( m => m.GelModule),
    canLoad: [ AuthGuardGuard ],
    canActivate: [ AuthGuardGuard  ]
  },
{
  path: '404',
  component: HidrogelPageComponent
},
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


