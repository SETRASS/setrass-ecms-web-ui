import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { getDataStore } from 'src/app/utils/utils';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { CalculoPrestacionesComponent } from '../../pages/calculo-prestaciones/calculo-prestaciones.component';



@Component({
  selector: 'app-derechos-idemnizaciones',
  templateUrl: './derechos-idemnizaciones.component.html',
  styleUrls: ['./derechos-idemnizaciones.component.scss']
})
export class DerechosIdemnizacionesComponent implements OnInit {

  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('ForewarningNotice') $preaviso: ElementRef;
  currentContractType: TerminationContractType;
  formCompensationRight: FormGroup;

  store = {
    "compensationRights":{
      forewarningNotice: {
        amount: 0.00,
        time: "60 dias",
        factorAmount: 0.00,
        formula: "60 dias X 0.00",
        currency: "L."
      },
      proportionalFourteenthMonthRight: {
          amount: 0.00,
          time: "",
          factorAmount: 0.00,
          formula: "",
          currency: "L."
      },
      proportionalThirteenthMonthRight: {
          amount: 0.00,
          time: "",
          factorAmount: 0.00,
          formula: "",
          currency: "L."
      },
      proportionalVacation: {
          amount: 0.00,
          time: "",
          factorAmount: 0.00,
          formula: "",
          currency: "L."
      },
      total: 0,
      unemploymentAid: {
          amount: 0.00,
          time: "",
          factorAmount: 0.00,
          formula: "",
          currency: "L."
      },
      unemploymentAidProportional: {
          amount: 0.00,
          time: "",
          factorAmount: 0.00,
          formula: "",
          currency: "L."
      }
    }
  }

  hasForewarningNotice: boolean = true; 
  hasProportionalVacationPay: boolean = true;

  constructor(
    public contractType: ToolbarService, 
    private render2: Renderer2,
    private calculoPrestacionesService: CalculoPrestacionesService,
    private route: Router
    ) {
      
   }

  ngOnInit(): void {

    
    this.store = getDataStore('salary-calculation');

    this.currentContractType = this.contractType.terminationContractType;
    this.calculoPrestacionesService
    .terminationContractType$.subscribe((option: TerminationContractType) => {
      this.currentContractType = option;
      if(this.currentContractType === 1){
        this.render2.setAttribute(this.$preaviso.nativeElement, 'disabled', 'true');        
      }else{
        this.render2.removeAttribute(this.$preaviso.nativeElement, 'disabled');        
      }
    });
  }


  recalculo(){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');

    /*this.calculoPrestacionesService
    .sendSalaryEmployeeCompute().subscribe();*/

    setTimeout(() => this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'), 4000);
  }

  nextStep(){
    this.route.navigateByUrl('/dashboard#other-rights');
  }


}
