import { Component, OnInit } from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {GelService} from '../../services/gel.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  equipo: Equiposgel[] = [];
  /* equipoSeleccionado!: any; -> Hemos quitado el signo de admiración para que
  * en la funcion opcionSeleccionada, el condicional if, me pueda aceptar una variable
  * con el estado undefined  */
  equipoSeleccionado: Equiposgel | undefined;

  constructor( private gelService: GelService) { }

  ngOnInit(): void {
  }

  buscando(): any {
    this.gelService.getSugerencias( this.termino.trim())
      .subscribe(  resp => {
        console.log( resp );
        this.equipo = resp;
      });
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ): any {

    // si viene un string vacio,...
    if (!event.option.value){
      // console.log('no hay valor');
      this.equipoSeleccionado = undefined;
      return;
    }

    const  equipo: Equiposgel = event.option.value;
    this.termino = equipo.modelo;

    // tslint:disable-next-line:no-non-null-assertion
    this.gelService.getEquipoPorId( equipo.id!)
      .subscribe(  e => this.equipoSeleccionado = e );

  }
}
