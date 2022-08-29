import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CalculoPrestacionesModule } from './modules/calculo-prestaciones/calculo-prestaciones.module';


export const routes: Routes = [
  /* {
    path: "calculo-prestaciones",
    loadChildren: () => CalculoPrestacionesModule
    //loadChildren: () => import('./modules/calculo-prestaciones/calculo-prestaciones.module').then(m => m.CalculoPrestacionesModule)
  }, */
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
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    /* useHash: true, */
    /* enableTracing: false,
    preloadingStrategy: PreloadAllModules */
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
