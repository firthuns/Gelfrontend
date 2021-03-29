import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent  {

  // le damos valores por defecto para evitar asi estar tecleando a cada prueba
  miFormulario: FormGroup = this.fb.group({
    name: ['pepito3', [ Validators.required]],
    email: ['pepito3@gmail.com', [ Validators.required, Validators.email]],
    password: ['123456', [ Validators.required, Validators.minLength(6)]],
  });


  constructor( private fb: FormBuilder,
               private router: Router ) { }

  registro() {

    console.log( this.miFormulario.value);
    // console.log( this.miFormulario.valid);
    this.router.navigateByUrl('/equipos');
  }

}
