import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Custom modules
import {WidgetsModule} from "../../_metronic/partials";
import {CalculoPrestacionesRoutingModule} from "./calculo-prestaciones-routing.module";
// Components
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import { DatosEmpleadorComponent } from './components/datos-empleador/datos-empleador.component';
import { CalculoPrestacionesComponent } from './pages/calculo-prestaciones/calculo-prestaciones.component';
import {LayoutModule} from "../../_metronic/layout";
import { CalculoSalarialComponent } from './components/calculo-salarial/calculo-salarial.component';


@NgModule({
  declarations: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent,
    CalculoPrestacionesComponent,
    CalculoSalarialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    CalculoPrestacionesRoutingModule,
    LayoutModule
  ],
  exports: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent
  ]
})
export class CalculoPrestacionesModule { }
