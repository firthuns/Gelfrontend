import { Component, OnInit } from '@angular/core';
import {GelService} from '../../services/gel.service';
import {Equiposgel} from '../../interfaces/equipogel.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  equipos: Equiposgel[] = [];

  constructor( private gelService: GelService) { }

  ngOnInit(): void {
    this.gelService.getEquipos()
      .subscribe( resp => {
        this.equipos = resp;
        console.log( this.equipos );
      });
  }

}
