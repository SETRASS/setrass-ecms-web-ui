import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Custom modules
import {WidgetsModule} from "../../_metronic/partials";
import {CalculoPrestacionesRoutingModule} from "./calculo-prestaciones-routing.module";
import { NgSelectModule } from '@ng-select/ng-select';
// Components
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import { DatosEmpleadorComponent } from './components/datos-empleador/datos-empleador.component';
import { CalculoPrestacionesComponent } from './pages/calculo-prestaciones/calculo-prestaciones.component';
import {LayoutModule} from "../../_metronic/layout";
import { DerechosIdemnizacionesComponent } from './components/derechos-idemnizaciones/derechos-idemnizaciones.component';
import { CalculoSalarialComponent } from './components/calculo-salarial/calculo-salarial.component';
import { OtrosDerechosComponent } from './components/otros-derechos/otros-derechos.component';
import { ServicesModule } from '../services/services.module';


@NgModule({
  declarations: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent,
    CalculoPrestacionesComponent,
    DerechosIdemnizacionesComponent,
    CalculoSalarialComponent,
    OtrosDerechosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    WidgetsModule,
    ServicesModule,
    CalculoPrestacionesRoutingModule,
    LayoutModule
  ],
  exports: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent
  ]
})
export class CalculoPrestacionesModule { }
