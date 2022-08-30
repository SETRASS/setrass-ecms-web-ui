import { NgModule } from '@angular/core';
import {CalculoPrestacionesRoutingModule} from "./calculo-prestaciones-routing.module";
// Components
import { CalculoPrestacionesModule as CalculoPrestacionesLibModule} from '../../../../projects/calculo-prestaciones/src/lib/calculo-prestaciones.module'
import { CalculoPrestacionesComponent } from './calculo-prestaciones.component';


@NgModule({
  declarations: [
    CalculoPrestacionesComponent
  ],
  imports: [
    CalculoPrestacionesLibModule,
    CalculoPrestacionesRoutingModule
  ],
  exports: []
})
export class CalculoPrestacionesModule { }
