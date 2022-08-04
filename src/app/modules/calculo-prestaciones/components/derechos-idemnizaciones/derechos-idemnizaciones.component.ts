import { Component, OnInit } from '@angular/core';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';


@Component({
  selector: 'app-derechos-idemnizaciones',
  templateUrl: './derechos-idemnizaciones.component.html',
  styleUrls: ['./derechos-idemnizaciones.component.scss']
})
export class DerechosIdemnizacionesComponent implements OnInit {

  currentContractType: TerminationContractType;

  constructor(public contractType: ToolbarService) {

   }

  ngOnInit(): void {
    this.currentContractType = this.contractType.terminationContractType;
    console.log(this.currentContractType);
  }

}
