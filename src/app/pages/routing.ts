import { Routes } from '@angular/router';
import { AuthGuard, RedirectGuard } from '@setrass-hn/auth';
import { AuthModule } from '../modules/auth/auth.module';
import { CalculoPrestacionesModule } from '../modules/calculo-prestaciones/calculo-prestaciones.module';
import { InspeccionModule } from '../modules/inspeccion/inspeccion.module';
import { PatronoEmpleadorModule } from '../modules/patrono-empleador/patrono-empleador.module';
import { StaffModule } from '../modules/staff/staff.module';
import { TrabajadoresModule } from '../modules/trabajadores/trabajadores.module';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { ParametrizacionModule } from '@setrass-hn/parametrizacion';
import { AtencionesModule } from '@setrass-hn/atenciones';
import { IndicadoresModule } from '@setrass-hn/indicadores';

const Routing: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate: [ RedirectGuard ]
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardModule
  },
  {
    path: 'inspeccion',
    loadChildren: () => InspeccionModule
  },
  {
    path: 'trabajadores',
    loadChildren: () => TrabajadoresModule
  },
  {
    path: 'staff',
    loadChildren: () => StaffModule,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patrono-empleador',
    loadChildren: () => PatronoEmpleadorModule,
    canActivate: [ AuthGuard ]
  },
  {
    path: "calculo-prestaciones",
    loadChildren: () => CalculoPrestacionesModule
  },
  {
    path: "indicadores",
    loadChildren: () => IndicadoresModule
  },
  {
    path: "parametrizacion",
    loadChildren: () => ParametrizacionModule
  },
  {
    path: "atenciones",
    loadChildren: () => AtencionesModule
  },
  {
    path: '',
    loadChildren: () => DashboardModule,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
