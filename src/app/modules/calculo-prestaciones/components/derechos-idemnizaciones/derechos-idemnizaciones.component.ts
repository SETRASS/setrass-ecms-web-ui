import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { CalculoPrestacionesComponent } from '../../pages/calculo-prestaciones/calculo-prestaciones.component';


@Component({
  selector: 'app-derechos-idemnizaciones',
  templateUrl: './derechos-idemnizaciones.component.html',
  styleUrls: ['./derechos-idemnizaciones.component.scss']
})
export class DerechosIdemnizacionesComponent implements OnInit {



  currentContractType: any;

  constructor(
    public contractType: ToolbarService,
    public calculoPrestacionesService: CalculoPrestacionesComponent
    ) {

   }

  ngOnInit(): void {
    this.currentContractType = this.contractType.terminationContractType;
    console.log(this.currentContractType);
  }



}
