import { Routes } from '@angular/router';
import { AuthGuard } from '@setrass-hn/auth';
import { AuthModule } from '../modules/auth/auth.module';
import { CalculoPrestacionesModule } from '../modules/calculo-prestaciones/calculo-prestaciones.module';
import { InspeccionModule } from '../modules/inspeccion/inspeccion.module';
import { PatronoEmpleadorModule } from '../modules/patrono-empleador/patrono-empleador.module';
import { StaffModule } from '../modules/staff/staff.module';

const Routing: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: 'inspeccion',
    loadChildren: () => InspeccionModule
  },
  {
    path: 'staff',
    loadChildren: () => StaffModule
  },
  {
    path: 'patrono-empleador',
    loadChildren: () => PatronoEmpleadorModule,
    canLoad: [AuthGuard],
    canActivate: [ AuthGuard ]
  },
  {
    path: "calculo-prestaciones",
    loadChildren: () => CalculoPrestacionesModule
  },
  {
    path: '',
    redirectTo: '/calculo-prestaciones',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
