import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajadoresRoutingModule } from './trabajadores-routing.module';
import { TrabajadoresComponent } from './trabajadores.component';
import { TrabajadoresModule as WorkerLibModule } from '@setrass-hn/trabajadores';

@NgModule({
  declarations: [
    TrabajadoresComponent
  ],
  imports: [
    CommonModule,
    TrabajadoresRoutingModule,
    WorkerLibModule
  ]
})
export class TrabajadoresModule { }
