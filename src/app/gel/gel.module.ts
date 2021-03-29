import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';

import { GelRoutingModule } from './gel-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EquipoComponent } from './pages/equipo/equipo.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { EquipoTarjetaComponent } from './components/equipo-tarjeta/equipo-tarjeta.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmarBorrarComponent } from './components/confirmar-borrar/confirmar-borrar.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    EquipoComponent,
    HomeComponent,
    ListadoComponent,
    EquipoTarjetaComponent,
    ImagenPipe,
    ConfirmarBorrarComponent,
    NgDropFilesDirective
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    GelRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class GelModule { }
