import {Component,  OnInit} from '@angular/core';
import {Equiposgel} from '../../interfaces/equipogel.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {GelService} from '../../services/gel.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 15px;
      }
    `
  ]
})
export class EquipoComponent  implements OnInit{


  // con el el signo '!', le indico a TS que confie en que llegará info
  equipo!: Equiposgel;
  id: string = '';

  /*leemos nuestra Url, utilizando ActivateRoute */
      constructor(private activateRoute: ActivatedRoute,
                  private router       : Router,
                  private gelServices  : GelService) {  }

  ngOnInit(): void {

        // this.activateRoute.params
        //   .subscribe(  ({ id }) => console.log( id ) );
    this.activateRoute.params
      .pipe(
        switchMap(({ id })  => this.gelServices.getEquipoPorId(id))
      )
      .subscribe( resp => this.equipo = resp);

  }


  regresar() {
    this.router.navigate(['/equipos/listado']);
  }
}
