import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { CalculoPrestacionesComponent } from "./calculo-prestaciones.component";

const routes: Routes = [
  {
    path: '',
    component: CalculoPrestacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoPrestacionesRoutingModule {}
