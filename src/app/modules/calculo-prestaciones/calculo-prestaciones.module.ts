import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Custom modules
import {WidgetsModule} from "../../_metronic/partials";
import {CalculoPrestacionesRoutingModule} from "./calculo-prestaciones-routing.module";
// Components
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import { DatosEmpleadorComponent } from './components/datos-empleador/datos-empleador.component';
import { CalculoPrestacionesComponent } from './pages/calculo-prestaciones/calculo-prestaciones.component';
import {LayoutModule} from "../../_metronic/layout";
import { DerechosIdemnizacionesComponent } from './components/derechos-idemnizaciones/derechos-idemnizaciones.component';


@NgModule({
  declarations: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent,
    CalculoPrestacionesComponent,
    DerechosIdemnizacionesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
