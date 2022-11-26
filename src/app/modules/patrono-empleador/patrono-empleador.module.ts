import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatronoEmpleadorRoutingModule } from './patrono-empleador-routing.module';

import { PatronoEmpleadorComponent } from './patrono-empleador.component';
import { PatronoEmpleadorModule as PatronoEmpleadorLibModule  } from '@setrass-hn/patrono-empleador'


@NgModule({
  declarations: [
    PatronoEmpleadorComponent
  ],
  imports: [
    CommonModule,
    PatronoEmpleadorLibModule,
    PatronoEmpleadorRoutingModule
  ]
})
export class PatronoEmpleadorModule { }
