import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CompensationRights} from 'projects/calculo-prestaciones/src/lib/models/compensation-rights.model';
import {ComputedSalaries} from 'projects/calculo-prestaciones/src/lib/models/computed-salaries.model';
import {CalculoPrestacionesRequestType} from 'projects/calculo-prestaciones/src/lib/models/enums/calculo-prestaciones-request-type.enum';
import {LaborOld} from 'projects/calculo-prestaciones/src/lib/models/labor-old.model';
import {OtherRights} from 'projects/calculo-prestaciones/src/lib/models/other-rights.model';
import {CalculoPrestacionesService} from 'projects/calculo-prestaciones/src/lib/services/calculo-prestaciones/calculo-prestaciones.service';
import {setDataCacheStore, setDataGender} from 'src/app/utils/utils';
import {ToolbarService} from 'src/app/_metronic/layout/components/toolbar/toolbar.service';

@Component({
  selector: 'ecms-calculo-prestaciones',
  templateUrl: './calculo-prestaciones.component.html',
  styleUrls: ['./calculo-prestaciones.component.scss']
})
export class CalculoPrestacionesPage implements OnInit, AfterViewInit {

  userType: CalculoPrestacionesRequestType;
  showSalaryCalculation: boolean = false;
  showCompensationRights: boolean = false;
  showOtherRights: boolean = false;
  showExportPdf: boolean = false;

  computedSalaries: ComputedSalaries = {
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
  laborOld: LaborOld = {
    days: 0,
    months: 0,
    totalWorkedDays: 0,
    years: 0
  };
  compensationRights: CompensationRights = {
    forewarningNotice: {
      objectKeyName: "",
      itemName: "",
      amount: 0.00,
      time: "60 dias",
      factorAmount: 0.00,
      formula: "60 dias X 0.00",
      currency: "L."
    },
    proportionalFourteenthMonthRight: {
      objectKeyName: "",
      itemName: "",
      amount: 0.00,
      time: "",
      factorAmount: 0.00,
      formula: "",
      currency: "L."
    },
    proportionalThirteenthMonthRight: {
      objectKeyName: "",
      itemName: "",
      amount: 0.00,
      time: "",
      factorAmount: 0.00,
      formula: "",
      currency: "L."
    },
    proportionalVacation: {
      objectKeyName: "",
      itemName: "",
      amount: 0.00,
      time: "",
      factorAmount: 0.00,
      formula: "",
      currency: "L."
    },
    unemploymentAid: {
      objectKeyName: "",
      itemName: "",
      amount: 0.00,
      time: "",
      factorAmount: 0.00,
      formula: "",
      currency: "L."
    },
    unemploymentAidProportional: {
      objectKeyName: "",
      itemName: "",
      amount: 0.00,
      time: "",
      factorAmount: 0.00,
      formula: "",
      currency: "L."
    }
  }
  otherRights: OtherRights = {
    daysOffPreAndPostNatal: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    educationalBonusResponse: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    firedForWhilePregnant: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedBonusVacations: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedBreastfeedingHours: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedFourteenthMonth: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedHolyDays: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedOtherPayments: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedOvertime: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedPaidPendingVacations: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedPendingFourteenthMonth: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedPendingThirteenthMonth: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedSalary: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedSeventhDay: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    owedThirteenthMonth: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    salaryReadjustment: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    severanceSavings: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    }
  };

  compensationRightSubTotal = 0.00;
  otherRightSubTotal = 0.00;

  constructor(public toolbarService: ToolbarService,
              public calculoPrestacionesService: CalculoPrestacionesService) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    console.log(this.toolbarService.userTypeOf);

    this.calculoPrestacionesService.userTypeOf$.subscribe(value => {
      this.userType = value;
    });

    setDataGender("F");
    setDataCacheStore({
      historySalaries: [
        {year: '1821', salary: 2000},
        {year: '1822', salary: 3000}
      ],
      startDate: '2020-05-10',
      endDate: '2022-05-10'
    });
  }

  calculoResponseListener(data: any) {
    this.computedSalaries = data.computedSalaries;
    this.laborOld = data.laborOld;
    this.compensationRights = data.compensationRights;
    this.compensationRightSubTotal = data.compensationRightSubTotal;
    this.showSalaryCalculation = true;
    this.showCompensationRights = true;
    //this.otherRights = data.otherRights;
  }

  compensationRightsListener(data: any) {
    this.compensationRights = data.compensationRights;
    this.compensationRightSubTotal = data.compensationRightSubTotal;
  }

  otherRightsListener(data: any) {
    this.otherRights = data.otherRights;
    this.otherRightSubTotal = data.otherRightSubTotal;
  }

  showOtherRightsListener(data: boolean) {
    this.showOtherRights = true;
  }

  showCalculoGeneradoListener(data: any) {
    this.showExportPdf = true;
  }

}
