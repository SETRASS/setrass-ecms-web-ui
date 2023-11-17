import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionesRoutingModule } from './atenciones-routing.module';
import { AtencionesComponent } from './atenciones.component';
import { AtencionesModule as AM } from '@setrass-hn/atenciones';


@NgModule({
  declarations: [
    AtencionesComponent
  ],
  imports: [
    CommonModule,
    AtencionesRoutingModule,
    AtencionesModule
  ]
})
export class AtencionesModule { }
