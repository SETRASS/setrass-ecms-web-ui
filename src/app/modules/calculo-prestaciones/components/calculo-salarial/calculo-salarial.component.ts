import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
// { StepperComponent } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDataStore  } from '../../../../utils/utils';



import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';

import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ecms-calculo-salarial',
  templateUrl: './calculo-salarial.component.html',
  styleUrls: ['./calculo-salarial.component.scss']
})

export class CalculoSalarialComponent implements OnInit, OnDestroy {
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef
  @ViewChild ('salaryData') salaryField: ElementRef;

  suscription: Subscription;


  response: any ={
    "computedSalaries": {
      "averageDailySalary": 0,
      "averageLastSixMonthsBonusPayment": 0,
      "averageMonthlyCommissionsSalary": 0,
      "averageMonthlyOvertimeSalary": 0,
      "averageMonthlySalary": 0,
      "baseMonthSalary": 0, 
      "ordinaryAverageDailySalary": 0,
      "ordinaryAverageMonthlySalary": 0,
      "ordinaryDailySalary": 0,
      "salaryInKindComputeAmount": 0
    },
    "laborOld": {
      "days": 0,
      "months": 0,
      "totalWorkedDays": 0,
      "years": 0
    },
    
  }

  constructor(
    private calculoPrestacionesService: CalculoPrestacionesService
  ){}

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.response = getDataStore('salary-calculation') ? getDataStore('salary-calculation') : this.response;

    this.suscription = this.calculoPrestacionesService.refresh$.subscribe(() => {
      this.response = getDataStore('salary-calculation');
    });

  }

  ngOnDestroy(): void{
    this.suscription.unsubscribe();
  }


}





