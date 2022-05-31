import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import {WidgetsModule} from "../../_metronic/partials";


@NgModule({
  declarations: [
    DatosTrabajadorComponent
  ],
  imports: [
    CommonModule,
    WidgetsModule
  ]
})
export class CalculoPrestacionesModule { }
