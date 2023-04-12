import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspeccionRoutingModule } from './inspeccion-routing.module';
import { InspeccionModule as InspeccionMfModule} from '@setrass-hn/inspeccion';
import { InspeccionComponent } from './inspeccion.component';


@NgModule({
  declarations: [
    InspeccionComponent
  ],
  imports: [
    CommonModule,
    InspeccionRoutingModule,
    InspeccionMfModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class InspeccionModule { }
