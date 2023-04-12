import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspeccionComponent } from './inspeccion.component';

const routes: Routes = [
  {
    path: '',
    component: InspeccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionRoutingModule { }
