import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {AuthResponse} from '../../../auth/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent  implements OnInit{



  get auth(){
    return this.authservice.auth;
  }


  constructor( private  router: Router,
               private authservice: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    // ir al backend y verificar que el usuario existe
    this.authservice.logout();
    this.router.navigate( ['./auth/login']);
    // this.router.navigateByUrl('/auth'):
  }


}
