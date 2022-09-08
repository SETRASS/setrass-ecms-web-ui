import { Routes } from '@angular/router';
// import { CalculoPrestacionesModule } from '../modules/calculo-prestaciones/calculo-prestaciones.module';

const Routing: Routes = [
  {
    path: "calculo-prestaciones",
    loadChildren: () => import('../modules/calculo-prestaciones/calculo-prestaciones.module').then(m => m.CalculoPrestacionesModule)
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
