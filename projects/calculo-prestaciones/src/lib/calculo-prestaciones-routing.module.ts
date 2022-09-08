import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DatosEmpleadorComponent} from "./components/datos-empleador/datos-empleador.component";
import {DatosTrabajadorComponent} from "./components/datos-trabajador/datos-trabajador.component";
import {CalculoPrestacionesPage} from "./pages/calculo-prestaciones/calculo-prestaciones.component";
import { DerechosIdemnizacionesComponent } from "./components/derechos-idemnizaciones/derechos-idemnizaciones.component";
import { CalculoSalarialComponent } from "./components/calculo-salarial/calculo-salarial.component";
import { OtrosDerechosComponent } from "./components/otros-derechos/otros-derechos.component";
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CalculoPrestacionesPage },
      { path: 'empleador', component: DatosEmpleadorComponent },
      { path: 'trabajador', component: DatosTrabajadorComponent },
      { path: 'derechos-indemnizaciones', component: DerechosIdemnizacionesComponent },
      { path: 'calculo-salarial', component: CalculoSalarialComponent },
      { path: 'otros-derechos', component: OtrosDerechosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculoPrestacionesRoutingModule {}
