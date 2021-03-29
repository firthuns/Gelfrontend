import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// ['./pages.component.css']
export class LoginComponent  {

  // le damos valores por defecto para evitar asi estar tecleando a cada prueba
  miFormulario: FormGroup = this.fb.group({
  email: ['pepito@gmail.com', [ Validators.required, Validators.email]],
  password: ['123456', [ Validators.required, Validators.minLength(6)]],
  });


  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) { }




  login(){
    // ir al backend y verificar que el usuario existe
    this.authService.login()
      .subscribe( resp => {
        console.log( resp);

        if ( resp.id){
          this.router.navigate(['./equipos']);
        }

      } );


  }

}
