import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { ParametrizacionComponent } from './parametrizacion.component';
import { ParametrizacionModule as PM } from '@setrass-hn/parametrizacion'


@NgModule({
  declarations: [
    ParametrizacionComponent
  ],
  imports: [
    CommonModule,
    ParametrizacionRoutingModule,
    PM
  ]
})
export class ParametrizacionModule { }
