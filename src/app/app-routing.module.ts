import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CalculoPrestacionesModule } from './modules/calculo-prestaciones/calculo-prestaciones.module';
import { AuthModule, RedirectGuard } from '@setrass-hn/auth';


export const routes: Routes = [
  /* {
    path: "calculo-prestaciones",
    loadChildren: () => CalculoPrestacionesModule
    //loadChildren: () => import('./modules/calculo-prestaciones/calculo-prestaciones.module').then(m => m.CalculoPrestacionesModule)
  }, */
  {
    path: 'auth',
    loadChildren: () => AuthModule,
    canActivate: [ RedirectGuard ]
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
