import { Routes } from '@angular/router';
import { CalculoPrestacionesModule } from '../modules/calculo-prestaciones/calculo-prestaciones.module';
import { PatronoEmpleadorModule } from '../modules/patrono-empleador/patrono-empleador.module';
import { StaffModule } from '../modules/staff/staff.module';

const Routing: Routes = [
  {
    path: 'staff',
    loadChildren: () => StaffModule
  },
  {
    path: 'patrono-empleador',
    loadChildren: () => PatronoEmpleadorModule
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
