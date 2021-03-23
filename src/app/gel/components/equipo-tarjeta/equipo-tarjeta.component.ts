import {Component, Input} from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';

@Component({
  selector: 'app-equipo-tarjeta',
  templateUrl: './equipo-tarjeta.component.html',
  styles: [
    `
        mat-card {
          margin-top: 20px;
        }
    `
  ]
})
export class EquipoTarjetaComponent  {

  // recibimos las caracteristicas del equipo mediante el @Input

  @Input() equipo!: Equiposgel; // ! -> decimos a TS que confie en que habrá info

}
