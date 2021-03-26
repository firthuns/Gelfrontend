import { Directive, EventEmitter, ElementRef,
  HostListener, Input, Output } from '@angular/core';
import {FileItem} from '../models/file-item';

/*
* EventEmitter -.> Evento que sirve para decirle al padre que algo sucedió haz algo
* ElementRef -> Sirve para tener una relacion directa con el elemennto HTML que
*               contiene esa directiva
* HostListener ->Sirve para crear evento para cuando algo suceda, Ej. cuando hagamos
*               click o en nuestro caso cuando el raton pase por  encima ...
* Input -> recibe informacion del padre
* Output -> relacionado con el eventEmitter, y decirle al padre de que tiene información.
* */


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];
  // evento para hablar con el padre...
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();



  constructor() { }

  // cuando el mouse entra, provocando el cambio de color del recuadro
  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any){
    this.mouseSobre.emit(true);  // mouse pase sobre el cuadro
    this.prevenirDetener( event ); // nos evita que tras dejar la imagen se habra en el navegador
  }



  // mouse se va emite un false, provocando el cambio del color del recuadro a su estado anterior.
  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any){
    this.mouseSobre.emit(false);

  }

  /* evento que detecta cuando se arrastro algo, se solto  y el mouse se marcho*/
  @HostListener('drop', ['$event'])
  public onDrop( event: any){
    this.mouseSobre.emit(false);


    const  transferencia = this._getTransferencia( event);
    if ( !transferencia){     return;   } // si no hay nada salta
    this._extraerArchivos( transferencia.files);
    //
    this.prevenirDetener( event );  // nos evita que tras dejar la imagen se habra en el navegador
    this.mouseSobre.emit( false );

  }
/* funcion que dependiendo en que navegador estemos utilizará un metodo u otro
   tema de compatibilidades, asi que estamos ante un metodo que nos extiende la compatibilidad */
  private _getTransferencia( event: any): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList): void {
    console.log(archivosLista);

    // funcion que nos permite crear un arreglo de imagnes
    for ( const propiedad in Object.getOwnPropertyNames(archivosLista)){
      const archivoTemporal = archivosLista[propiedad];

      if ( this._archivoPuedeSerCargado( archivoTemporal)){
        const nuevoArchivo = new FileItem( archivoTemporal);
        this.archivos.push( nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }


  // VALIDACIONES

  /* 4) */
  private  _archivoPuedeSerCargado( archivo: File): boolean {
    if ( !this._archivoYaFueDroppeado( archivo.name) && this._esImagen(archivo.type)){
      return true;
    }
    else{
      return false;
    }
  }

  /* 1) la primera validacion va tener que evitar que el navegador nos abra la imagen por defecto*/
  private prevenirDetener( event: any )  {
    event.preventDefault();
    event.stopPropagation();
  }

   /* 2) Comprueba si el archivo ya se encuentra cargado */
  private _archivoYaFueDroppeado( nombreArchivo: string): boolean{

    for ( const  archivo of this.archivos){

      if ( archivo.nombreArchivo === nombreArchivo){
        console.log('El archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }
    return  false;
  }
/* 3)  validación que me comprueba si se trata de una imagen, y para ello me mira si la palabra contiene la
palabra image  */
  private _esImagen( tipoArchivo: string ): boolean{
    return ( tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }






}
