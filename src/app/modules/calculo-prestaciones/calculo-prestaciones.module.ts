import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDatepickerModule} from '@angular/material/datepicker';
// Custom modules
import {WidgetsModule} from "../../_metronic/partials";
import {CalculoPrestacionesRoutingModule} from "./calculo-prestaciones-routing.module";
// Components
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import { DatosEmpleadorComponent } from './components/datos-empleador/datos-empleador.component';
import { CalculoPrestacionesComponent } from './pages/calculo-prestaciones/calculo-prestaciones.component';
import {LayoutModule} from "../../_metronic/layout";
import { DerechosIdemnizacionesComponent } from './components/derechos-idemnizaciones/derechos-idemnizaciones.component';
import { CalculoSalarialComponent } from './components/calculo-salarial/calculo-salarial.component';
import { OtrosDerechosComponent } from './components/otros-derechos/otros-derechos.component';
import { ServicesModule } from '../services/services.module';
import { CalculoGeneradoComponent } from './components/calculo-generado/calculo-generado.component';


@NgModule({
  declarations: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent,
    CalculoPrestacionesComponent,
    DerechosIdemnizacionesComponent,
    CalculoSalarialComponent,
    OtrosDerechosComponent,
    CalculoGeneradoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    WidgetsModule,
    ServicesModule,
    MatDatepickerModule,
    CalculoPrestacionesRoutingModule,
    LayoutModule
  ],
  exports: [
    DatosTrabajadorComponent,
    DatosEmpleadorComponent,
    MatDatepickerModule
  ]
})
export class CalculoPrestacionesModule { }
