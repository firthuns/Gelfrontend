

export class FileItem{

  public archivo: File;
  public nombreArchivo: string;
  public url: string ;
  public estaSubiendo: boolean; // bandera que me advertira de si esta subiendo una imagen
  public  progreso: number;

  constructor( archiv: File) {

    this.archivo = archiv;
    this.nombreArchivo = archiv.name;
    this.url = '';
    this.estaSubiendo = false;
    this.progreso = 0;
  }

}
