import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { CalculoPrestacionesComponent } from '../../pages/calculo-prestaciones/calculo-prestaciones.component';



@Component({
  selector: 'app-derechos-idemnizaciones',
  templateUrl: './derechos-idemnizaciones.component.html',
  styleUrls: ['./derechos-idemnizaciones.component.scss']
})
export class DerechosIdemnizacionesComponent implements OnInit {

  @ViewChild('overlay') $overlay: ElementRef;

  currentContractType: TerminationContractType;

  constructor(
    public contractType: ToolbarService, 
    private render2: Renderer2,
    private calculoPrestacionesService: CalculoPrestacionesService
    ) {

   }

  ngOnInit(): void {

    this.currentContractType = this.contractType.terminationContractType;

    this.calculoPrestacionesService
    .terminationContractType$.subscribe((option: TerminationContractType) => this.currentContractType = option);
    console.log(this.currentContractType);
  }

  recalculo(){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    setTimeout(() => this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'), 8000);
    
  }


}
