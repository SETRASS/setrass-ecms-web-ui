import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompensationRights } from 'src/app/models/compensation-rights.model';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { getDataStore, setDataCacheStore, setDataSalaryCalculationStore } from 'src/app/utils/utils';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { CalculoPrestacionesComponent } from '../../pages/calculo-prestaciones/calculo-prestaciones.component';



@Component({
  selector: 'ecms-derechos-idemnizaciones',
  templateUrl: './derechos-idemnizaciones.component.html',
  styleUrls: ['./derechos-idemnizaciones.component.scss']
})
export class DerechosIdemnizacionesComponent implements OnInit {

  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('ForewarningNotice') $preaviso: ElementRef;
  @Input() compensationRights: CompensationRights = {
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
  };
  currentContractType: TerminationContractType;
  formCompensationRight: FormGroup;

  hasForewarningNotice: boolean = true; 
  hasProportionalVacationPay: boolean = false;

  constructor(
    public contractType: ToolbarService, 
    private calculoPrestacionesService: CalculoPrestacionesService,
    private render2: Renderer2,
    private route: Router
  ) {}

  ngOnInit(): void {
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
    if(getDataStore('cache').requestId){
      this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
      const store = getDataStore('cache');
      store.compensationRightsRequest = {
        "hasForewarningNotice": this.hasForewarningNotice,
        "hasTakeVacationTimeLastYear": this.hasProportionalVacationPay
      };
      console.log(store);
      setDataCacheStore(store);
      this.calculoPrestacionesService.sendCompensationsRightsInfo(store)
      .subscribe((res:any) => {
        res?this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'):null;
        this.compensationRights = res.compensationRights
      });
    }
  }

  nextStep(){
    this.route.navigateByUrl('/dashboard#other-rights');
  }  
}
