import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  // private db: baseDatos mysql
  constructor() { }

  private guardarImage ( imagen: { nombre: string, url: string } ){

    // this.db.collection(`/${ this.CARPETA_IMAGENES}`).add( imagen);


  }
}
