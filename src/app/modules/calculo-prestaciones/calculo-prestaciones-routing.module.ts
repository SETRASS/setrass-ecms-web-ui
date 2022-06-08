import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DatosEmpleadorComponent} from "./components/datos-empleador/datos-empleador.component";
import {DatosTrabajadorComponent} from "./components/datos-trabajador/datos-trabajador.component";
import {CalculoPrestacionesComponent} from "./pages/calculo-prestaciones/calculo-prestaciones.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CalculoPrestacionesComponent },
      { path: 'empleador', component: DatosEmpleadorComponent },
      { path: 'trabajador', component: DatosTrabajadorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoPrestacionesRoutingModule {}
