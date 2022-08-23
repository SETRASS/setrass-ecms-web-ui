import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
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
  requestInfo: any = null;
  todayDate = '';

  //files
  readonly assetsRoute: string = 'assets/templates';
  initialHtmlText = "";
  finalHtmlText: any;

  constructor(private httpClient: HttpClient,
              private sanitize: DomSanitizer) { }

  ngOnInit(): void {
    this.loadHtmlTemplate("calculo-de-prestaciones-doc.html");
    const today = new Date();
    this.todayDate = today.toLocaleDateString('es-HN');
    this.requestInfo = getDataStore('cache');
  }

  loadHtmlTemplate(htmlTemplateName: string): void {
    this.httpClient.get(`${this.assetsRoute}/${htmlTemplateName}`, { responseType: 'text' }).subscribe((data) => {
      this.initialHtmlText = data;
      this.sanitizeHtml();
    });
  }

  stringToHTML = (str: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  }

  sanitizeHtml(): void {
    this.finalHtmlText = this.sanitize.bypassSecurityTrustHtml(this.initialHtmlText);
  }

  printDocument(): void {
    /*
    this.requestInfo = getDataStore('cache');
    console.log(this.requestInfo);
    * */
    const printWindow = window.open('', '', 'height=400,width=800');
    // @ts-ignore
    if (printWindow !== null) {
      printWindow.document.write(this.finalHtmlText);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 1000)
    }
  }
}
