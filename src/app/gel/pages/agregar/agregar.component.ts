import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';
import {ConfirmarBorrarComponent} from '../../components/confirmar-borrar/confirmar-borrar.component';
import {FileItem} from '../../models/file-item';
import {CargaImagenesService} from '../../services/carga-imagenes.service';



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

  // crearemos una bandera q nos identifique cuando el mouse este sobre la zona
  estaSobreElemento = false  ;
  archivos: FileItem[] = [] ;



  equipo: Equiposgel = {
  equipo:      '',
  modelo:      '',
  lugarInstalacion: '',
  fechacompra:  '',
  ticketcompra: '' // http:// ... direccion .. .com/img.png
};

  constructor(private gelServicio: GelService,
              private activateRoute: ActivatedRoute,
              private cargaImagenesService: CargaImagenesService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog  ) { }

  ngOnInit(): void {
  // console.log( this.router.url.includes('editar'));

    if ( !this.router.url.includes('editar')){
        return;
    }

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

  guardar(): void {

    if ( this.equipo.equipo.trim().length === 0 ||
         this.equipo.modelo.trim().length === 0 ||
         this.equipo.fechacompra.trim().length === 0 ||
         this.equipo.lugarInstalacion.trim().length === 0 ||
         this.archivos.length !== 1   ){
      // añadir un mesaje emergente para indicar que rellene todos los campos
      this.mostrarSnabar('Rellena todos los campos');
      return;   }
      // console.log( this.equipo);


    if ( this.equipo.id){
        // actualizamos valores
         this.gelServicio.actualizarEquipo( this.equipo)
           .subscribe( resp => {

             this.mostrarSnabar('Registro actualizado');
             this.router.navigate( ['/equipos']);
           });
      }else {
        // creamos un nuevo registro
      this.gelServicio.agregarEquipo( this.equipo)
        .subscribe( resp => {
          // console.log( 'respuesta', resp );
          this.router.navigate( ['/equipos']);
          this.mostrarSnabar('Registro creado');
        });
      }

  }



  borrarEquipo(): void {

    const dialog = this.dialog.open( ConfirmarBorrarComponent, {
      width: '350px',
      data: this.equipo
    });

    dialog.afterClosed().subscribe(
      ( result ) => {
        console.log( result );

        if ( result ){
          // tslint:disable-next-line:no-non-null-assertion
          this.gelServicio.borrarEquipo(  this.equipo.id! )
            .subscribe( resp => {
              this.mostrarSnabar('Registro eliminado') ;
              this.router.navigate( ['/equipos']);
            });
        } else {  this.router.navigate( ['/equipos']); }
      }
    );



  }

  private mostrarSnabar( mensaje: string): void {
    // this.snackBar.open( mensaje, 'ok!', {
    this.snackBar.open( mensaje, 'Ok!' , {
      duration: 1000
    });
  }


// funciones para controlar la carga de imagenes

  cargaArchivo():void {
    console.log('subiendo imagen: ' , this.archivos);
    this.cargaImagenesService.cargarImagenBaseDatos( this.archivos );
  }

  // tslint:disable-next-line:typedef
  pruebaSobreElemento( event: any ) {
    console.log(event );

  }


 limpiarArchivo(): void {
    this.archivos = [ ];
    console.log('Arraylist vacío: ' + this.archivos.length);
  }








}
