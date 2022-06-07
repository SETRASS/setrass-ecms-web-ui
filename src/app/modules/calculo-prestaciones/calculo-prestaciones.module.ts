import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import {WidgetsModule} from "../../_metronic/partials";
import {LayoutModule} from "../../_metronic/layout";



@NgModule({
  declarations: [
    DatosTrabajadorComponent,
  ],
    imports: [
        CommonModule,
        WidgetsModule,
        LayoutModule,
    ]
})
export class CalculoPrestacionesModule { }
