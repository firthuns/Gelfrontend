import { Component, OnInit } from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

equipo: Equiposgel = {
  equipo:      '',
  modelo:      '',
  fechacompra:  '',
  ticketcompra: '' // http:// ... direccion .. .com/img.png
}

  constructor(private gelServicio: GelService,
              private activateRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  // console.log( this.router.url.includes('editar'));

    // if ( this.equipo.equipo.trim().length === 0){
    //     return;
    // }

    // desestructuracion ({ id })
    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.gelServicio.getEquipoPorId( id ))
      )
      .subscribe( resp => this.equipo = resp );
    console.log( this.equipo);
    // como this.heroe esta asociado a los campos menidante el [ (ngModel)], se autorellenara
    // los campos

  }

  guardar() {

  }



  borrarEquipo() {

  }

  cargaArchivo() {

  }

  limpiarArchivo() {

  }
}
