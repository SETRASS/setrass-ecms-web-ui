import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicadoresRoutingModule } from './indicadores-routing.module';
import { IndicadoresComponent } from './indicadores.component';
import { IndicadoresModule as indicadores } from '@setrass-hn/indicadores'


@NgModule({
  declarations: [
    IndicadoresComponent
  ],
  imports: [
    CommonModule,
    IndicadoresRoutingModule,
    indicadores
  ]
})
export class IndicadoresModule { }
