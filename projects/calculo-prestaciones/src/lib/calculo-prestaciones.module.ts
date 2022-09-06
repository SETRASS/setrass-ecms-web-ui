import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPrintModule } from 'ngx-print';
import { CalculoPrestacionesRoutingModule } from 'src/app/modules/calculo-prestaciones/calculo-prestaciones-routing.module';
import { ServicesModule } from 'projects/calculo-prestaciones/src/lib/services/services.module';
import { LayoutModule } from 'src/app/modules/layout';
import { WidgetsModule } from '@setrass-hn/metronic/partials';
import { CalculoPrestacionesComponent } from './calculo-prestaciones.component';
import { CalculoGeneradoComponent } from './components/calculo-generado/calculo-generado.component';
import { CalculoSalarialComponent } from './components/calculo-salarial/calculo-salarial.component';
import { DatosEmpleadorComponent } from './components/datos-empleador/datos-empleador.component';
import { DatosTrabajadorComponent } from './components/datos-trabajador/datos-trabajador.component';
import { DerechosIdemnizacionesComponent } from './components/derechos-idemnizaciones/derechos-idemnizaciones.component';
import { OtrosDerechosComponent } from './components/otros-derechos/otros-derechos.component';
import { CalculoPrestacionesPage } from './pages/calculo-prestaciones/calculo-prestaciones.component';



@NgModule({
  declarations: [
    CalculoPrestacionesComponent,
    CalculoPrestacionesPage,
    DatosTrabajadorComponent,
    DatosEmpleadorComponent,
    DerechosIdemnizacionesComponent,
    CalculoSalarialComponent,
    OtrosDerechosComponent,
    CalculoGeneradoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    WidgetsModule,
    ServicesModule,
    HttpClientModule,
    NgxPrintModule,
    CalculoPrestacionesRoutingModule
  ],
  exports: [
    CalculoPrestacionesComponent
  ]
})
export class CalculoPrestacionesModule { }
