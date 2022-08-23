import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ComputedSalaries} from "../../../../models/computed-salaries.model";
import {LaborOld} from "../../../../models/labor-old.model";
import {CompensationRights} from "../../../../models/compensation-rights.model";
import {OtherRights} from "../../../../models/other-rights.model";
import {getDataStore} from "../../../../utils/utils";

@Component({
  selector: 'ecms-calculo-generado',
  templateUrl: './calculo-generado.component.html',
  styleUrls: ['./calculo-generado.component.scss']
})
export class CalculoGeneradoComponent implements OnInit {

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
  @Input() compensationRights: CompensationRights = {
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
  @Input() otherRights: OtherRights = {
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
  @Input() compensationRightSubTotal = 0.00;
  @Input() otherRightSubTotal = 0.00;

  requestInfo: any = null;
  requestEmployeeInfo: any = null;
  todayDate = '';
  terminationContractType: string;
  requestType: string;

  //files
  readonly assetsRoute: string = 'assets/templates';
  initialHtmlText = "";
  finalHtmlText: any;

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    this.todayDate = today.toLocaleDateString('es-HN');
    this.requestInfo = getDataStore('cache');
    this.requestEmployeeInfo = getDataStore('employee');
    this.terminationContractType = this.terminationContractTypeGetter(this.requestEmployeeInfo?.terminationContractType ?? -1);
    this.requestType = this.requestTypeGetter(this.requestEmployeeInfo?.requestType ?? -1);
  }

  requestTypeGetter(requestType: number) : string {
    switch (requestType) {
      case 0: return "TRABAJADOR";
      case 1: return "EMPLEADOR";
      default: return "";
    }
  }

  terminationContractTypeGetter(terminationContractType: number) : string {
    switch (terminationContractType) {
      case 0: return "RENUNCIA";
      case 1: return "DESPIDO";
      default: return "";
    }
  }
}
