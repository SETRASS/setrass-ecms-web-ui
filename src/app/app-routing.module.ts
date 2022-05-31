import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosTrabajadorComponent} from "./modules/calculo-prestaciones/components/datos-trabajador/datos-trabajador.component";


export const routes: Routes = [
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'datos-trabajador', component: DatosTrabajadorComponent, pathMatch: 'full'
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
