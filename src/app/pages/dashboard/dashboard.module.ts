import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from '../../_metronic/partials';
import { CalculoPrestacionesModule } from 'src/app/modules/calculo-prestaciones/calculo-prestaciones.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CalculoPrestacionesModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class DashboardModule {}
