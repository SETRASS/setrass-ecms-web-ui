import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Custom modules
import {WidgetsModule} from "../../_metronic/partials";
import {CalculoPrestacionesRoutingModule} from "./calculo-prestaciones-routing.module";
// Components
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import { DatosEmpleadorComponent } from './components/datos-empleador/datos-empleador.component';



@NgModule({
  declarations: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    CalculoPrestacionesRoutingModule
  ]
})
export class CalculoPrestacionesModule { }
