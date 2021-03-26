import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Equiposgel} from '../../interfaces/equipogel.interface';

@Component({
  selector: 'app-confirmar-borrar',
  templateUrl: './confirmar-borrar.component.html',
  styles: [
  ]
})
export class ConfirmarBorrarComponent  {

  constructor( private dialogRef: MatDialogRef<ConfirmarBorrarComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Equiposgel) {}

  // si se se produce la acción de borrar, enviamos al padre un boolean = true
  borrar(): void{
    this.dialogRef.close(true);
  }

  cerrar(): void{
    this.dialogRef.close( false );
  }

}
