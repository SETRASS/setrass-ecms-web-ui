import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
// { StepperComponent } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDataStore  } from '../../../../../../src/app/utils/utils';



import { CalculoPrestacionesService } from 'projects/calculo-prestaciones/src/lib/services/calculo-prestaciones/calculo-prestaciones.service';

import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { Subscription } from 'rxjs';
import { ComputedSalaries } from 'projects/calculo-prestaciones/src/lib/models/computed-salaries.model';
import { LaborOld } from 'projects/calculo-prestaciones/src/lib/models/labor-old.model';


@Component({
  selector: 'ecms-calculo-salarial',
  templateUrl: './calculo-salarial.component.html',
  styleUrls: ['./calculo-salarial.component.scss']
})

export class CalculoSalarialComponent implements OnInit {
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef
  @ViewChild ('salaryData') salaryField: ElementRef;
  @Input() computedSalaries: ComputedSalaries = {
    averageDailySalary: 0,
    averageLastSixMonthsBonusPayment: 0,
    averageMonthlyCommissionsSalary: 0,
    averageMonthlyOvertimeSalary: 0,
    averageMonthlySalary: 0,
    baseMonthSalary: 0,
    ordinaryAverageDailySalary: 0,
    ordinaryAverageMonthlySalary: 0,
    ordinaryDailySalary: 0,
    salaryInKindComputeAmount: 0
  };
  @Input() laborOld: LaborOld = {
    days: 0,
    months: 0,
    totalWorkedDays: 0,
    years: 0
  };


  constructor(
    private calculoPrestacionesService: CalculoPrestacionesService
  ){}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {


  }

}





