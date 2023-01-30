import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatronoEmpleadorComponent } from './patrono-empleador.component';

const routes: Routes = [
  {
    path: '',
    component: PatronoEmpleadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatronoEmpleadorRoutingModule { }
