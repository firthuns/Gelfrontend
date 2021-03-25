import { Component, OnInit } from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
        img {
          width: 100%;
          border-radius:  25px;
        }
    `
  ]
})
export class AgregarComponent implements OnInit {

equipo: Equiposgel = {
  equipo:      '',
  modelo:      '',
  lugarInstalacion: '',
  fechacompra:  '',
  ticketcompra: '' // http:// ... direccion .. .com/img.png
};

  constructor(private gelServicio: GelService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog  ) { }

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
      .subscribe( resp => {
        this.equipo = resp;
        // console.log( this.equipo);
      });

    // como this.equipo esta asociado a los campos mediante el [ (ngModel)], se autorellenara
    // los campos

  }

  guardar() {

    if ( this.equipo.equipo.trim().length === 0||
         this.equipo.modelo.trim().length === 0 ||
         this.equipo.fechacompra.trim().length === 0 ||
         this.equipo.lugarInstalacion.trim().length === 0 ){
      // añadir un mesaje emergente para indicar que rellene todos los campos
      this.mostrarSnabar('Rellena todos los campos');
      return;   }
      // console.log( this.equipo);

      if ( this.equipo.id){
        // actualizamos valores
         this.gelServicio.actualizarEquipo( this.equipo)
           .subscribe( resp => this.mostrarSnabar('Registro actualizado'));
      }else {
        // creamos un nuevo registro
      this.gelServicio.agregarEquipo( this.equipo)
        .subscribe( resp => {
          console.log( 'respuesta', resp );
          this.router.navigate( ['/equipos/editar', resp.id]);
          this.mostrarSnabar('Registro creado');
        });
      }

  }



  borrarEquipo() {

  }

  cargaArchivo() {

  }

  limpiarArchivo() {

  }

  private mostrarSnabar( mensaje: string) {
    // this.snackBar.open( mensaje, 'ok!', {
    this.snackBar.open( mensaje, 'Aceptar' , {
      duration: 1000
    });
  }
}
