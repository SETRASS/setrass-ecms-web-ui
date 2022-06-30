import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import {IStepperOptions, StepperComponent, ToggleComponent} from 'src/app/_metronic/kt/components';
import {PersonType} from 'src/app/models/enums/person-type.enum';

import {LookupsService} from "../../../services/lookups/lookups.service";
import {SalaryHistoryCatalogService} from "../../../services/salary-history-catalog/salary-history-catalog.service";
import {CalculoPrestacionesService} from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';

import {ToolbarService} from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import {catchError} from "rxjs";

@Component({
  selector: 'app-datos-empleador',
  templateUrl: './datos-empleador.component.html',
  styleUrls: ['./datos-empleador.component.scss']
})
export class DatosEmpleadorComponent implements OnInit {

  // Variables
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef;
  @ViewChild('salary') salaryField: ElementRef;
  @ViewChild('submit') btnSubmit: ElementRef;
  stepper: any;
  formEmployer: FormGroup;
  stepperOptions: IStepperOptions = {
    startIndex: 1,
    animation: false,
    animationSpeed: '',
    animationNextClass: '',
    animationPreviousClass: ''
  };
  personTypeList = Object.values(PersonType).splice(0, 2);
  salaryOptions: String[] = ['SI', 'NO'];
  haveSalary: string = 'SI';
  economicActivityList: any[] = [];
  salaryRatesList: any[] = [];
  locations: any[] = [];
  companySizeList: any[] = [];

  locationSelected: string;
  currentMunicipios: any[];
  currentEconomicActivity: any[];
  totalSalaryAverage = 0;
  totalCommissionsAverage = 0;
  totalExtraHoursAverage = 0;
  totalBonusesAverage = 0;
  isSalaryFieldDisabled: boolean = true;

  //SAVE BUTTON / COMPUTE
  saveButtonIsOk = false;
  saveButtonText = this.saveButtonIsOk ? "Realizar Calculo" : "Guardar";

  // CONST
  REQUEST_ID: string;
  EMPLOYER_ID: string;
  WORKER_PERSON_ID: string;
  isResponseOk: boolean = false;

  constructor(private lookupsService: LookupsService,
              private salaryHistoryCatalogService: SalaryHistoryCatalogService,
              private calculoPrestacionesService: CalculoPrestacionesService,
              private toolbar: ToolbarService,
              private formBuilder: FormBuilder,
              private render2: Renderer2) {
    this.formBuild();
  }


  ngAfterViewInit(): void {

  }


  ngOnInit(): void {

    setTimeout(() => this.stepperConfig(), 3000);

    // locations
    this.lookupsService.getLocations().subscribe((data) => {
      this.locations = data[0].children;
    }, ((error?: any) => {
      const err = error.message | error;
      console.warn(err);
    }));

    // initialize economic activities
    this.salaryHistoryCatalogService.getEconomicActivities().subscribe(
      (data) => {
        this.economicActivityList = data;
      },
      (error) => {
        const err = error.message | error;
        console.warn(err);
      });

    // company size
    this.salaryHistoryCatalogService.getCompanySizes().subscribe((data) => {
      this.companySizeList = data.map(val => ({id: val.id, name: `${val.minQty} a ${val.maxQty} Empleados`}));
    }, (error) => {
      const err = error.message | error;
      console.warn(err);
    });
  }

  async stepperConfig() {
    //this.render2.setAttribute(this.btnSubmit.nativeElement, 'disabled', 'true');
    this.stepper = new StepperComponent(this.stepperSteps.nativeElement, this.stepperOptions);
    this.stepper.on("kt.stepper.previous", () => this.stepper.goPrev());
    this.stepper.on("kt.stepper.next", () => {

      if (this.formEmployer.get('companyData')?.valid && this.stepper.getCurrentStepIndex() === 1) {
        return this.stepper.goNext();
      }

      if (this.formEmployer.get('employeeData')?.valid && this.stepper.getCurrentStepIndex() === 2) {
        this.postEmployeeAndEmployer();
        return this.stepper.goNext();
      }

      if (this.formEmployer.get('salaryData')?.valid && this.stepper.getCurrentStepIndex() === 3) {
        return this.stepper.goNext();
      }

      if (this.formEmployer.get('speciesSalary')?.valid && this.stepper.getCurrentStepIndex() === 4) {
        this.postSalaryInfoRequest();
        return this.stepper.goNext();
      }
    });
  }

  private formBuild() {
    this.formEmployer = this.formBuilder.group({
      companyData: this.formBuilder.group({
        companyName: ['', [Validators.required, Validators.minLength(5)]],
        personType: ['JURIDICA', [Validators.required]],
        rtnNumber: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]+$/)]],
        dniNumber: ['', []],
        economicActivity: ['', [Validators.required,]],
        companySize: ['', [Validators.required]]
      }),
      employeeData: this.formBuilder.group({
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
        employeeName: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastname: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeAge: [, [Validators.required, Validators.min(14), Validators.max(85), Validators.pattern(/^[0-9]+$/)]],
        employeeSex: ['Masculino', [Validators.required]],
        employeePhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        employeeEmail: ['', [Validators.required, Validators.email]],
        department: ['', [Validators.required]],
        municipality: ['', [Validators.required]],
      }),
      salaryData: this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        fixedSalary: ['SI', [Validators.required]],
        salary: ['', [Validators.required]],
        monthlySalaryAverage1: [0, []],
        monthlySalaryAverage2: [0, []],
        monthlySalaryAverage3: [0, []],
        monthlySalaryAverage4: [0, []],
        monthlySalaryAverage5: [0, []],
        monthlySalaryAverage6: [0, []],
        commissions: this.formBuilder.group({
          monthlyCommissions1: [0, [Validators.pattern(/^[0-9]+$/)]],
          monthlyCommissions2: [0, [Validators.pattern(/^[0-9]+$/)]],
          monthlyCommissions3: [0, [Validators.pattern(/^[0-9]+$/)]],
          monthlyCommissions4: [0, [Validators.pattern(/^[0-9]+$/)]],
          monthlyCommissions5: [0, [Validators.pattern(/^[0-9]+$/)]],
          monthlyCommissions6: [0, [Validators.pattern(/^[0-9]+$/)]]
        }),
        extraHours: this.formBuilder.group({
          monthlyExtraHours1: [0, []],
          monthlyExtraHours2: [0, []],
          monthlyExtraHours3: [0, []],
          monthlyExtraHours4: [0, []],
          monthlyExtraHours5: [0, []],
          monthlyExtraHours6: [0, []]
        }),
        bonuses: this.formBuilder.group({
          monthlyBonus1: [0, []],
          monthlyBonus2: [0, []],
          monthlyBonus3: [0, []],
          monthlyBonus4: [0, []],
          monthlyBonus5: [0, []],
          monthlyBonus6: [0, []]
        }),
      }),
      speciesSalary: this.formBuilder.group({
        optionSpeciesSalary: ['NONE', [Validators.required]],
        foodTime: ['NONE', []]
      })
    });

    this.formEmployer.get('salaryData.fixedSalary')?.valueChanges
      .subscribe(value => {
        console.log(value);
        if (value === 'NO') {
          for (let item = 1; item <= 6; item++) {
            this.formEmployer.get(`salaryData.monthlySalaryAverage${item}`)?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
          }
          this.formEmployer.get('salaryData.salary')?.setValue(this.totalSalaryAverage);
          this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'true');
          this.isSalaryFieldDisabled = true;
        } else {
          for (let item = 1; item <= 6; item++) {
            this.formEmployer.get(`salaryData.monthlySalaryAverage${item}`)?.setValidators(null);
          }
          this.formEmployer.get('salaryData.salary')?.setValue(0);
          this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'false');
          this.isSalaryFieldDisabled = false;
        }
        this.haveSalary = value;
      });

    this.formEmployer.get('companyData.personType')?.valueChanges
      .subscribe(value => {
        if (value === '0') {
          this.formEmployer.get('companyData.rtnNumber')?.setValidators(null);
          this.formEmployer.get('companyData.dniNumber')?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]);
        }
        if (value === '1') {
          this.formEmployer.get('companyData.rtnNumber')?.setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]+$/)]);
          this.formEmployer.get('companyData.dniNumber')?.setValidators(null);
        }
        /* switch(value){
          case '0':
            break;
          case '1':
            break;
        } */
      });

    this.formEmployer.get('speciesSalary.optionSpeciesSalary')?.valueChanges
      .subscribe(value => {
        if (value === 'alimentacion') {
          return this.formEmployer.get('speciesSalary.foodTime')?.setValidators([Validators.required]);
        }
        this.formEmployer.get('speciesSalary.foodTime')?.setValidators([]);
      });
  }

  get typePersonValue() {
    return this.formEmployer.get('companyData.personType')?.value;
  }

  get salaryValue() {
    return this.formEmployer.get('salaryData.salary')?.value;
  }

  get speciesSalaryValue() {
    return this.formEmployer.get('speciesSalary.optionSpeciesSalary')?.value;
  }

  get isSpeciesSalaryValid() {
    return this.formEmployer.get('speciesSalary')?.valid;
  }

  totalSpeciesSalary(percentage: string) {
    if (percentage === '20%') return (Number(this.salaryValue) * 0.20).toFixed(2);
    if (percentage === '30%') return (Number(this.salaryValue) * 0.30).toFixed(2);
  }

  getErrorField(element: string, errorName: string) {
    return this.formEmployer.get(element)?.hasError(errorName);
  }

  isValidField(formControlName: string) {
    return this.formEmployer.get(formControlName)?.touched &&
      this.formEmployer.get(formControlName)?.valid
  }

  isInvalidField(formControlName: string) {
    return this.formEmployer.get(formControlName)?.touched &&
      this.formEmployer.get(formControlName)?.invalid
  }

  getMunicipios(id: string) {
    return this.locations.find(val => val.location.id === id).children;
  }

  getCompanyEmployeeWeight(economicActivity: string) {
    return this.economicActivityList.filter(val => val.economicActivity === economicActivity);
  }

  getLocation(event: any) {
    this.currentMunicipios = this.getMunicipios(event);
  }

  getEconomicActivity(event: string) {
    console.log(event);
    console.log(this.getCompanyEmployeeWeight(event));
    this.currentEconomicActivity = this.getCompanyEmployeeWeight(event);
  }

  getTotalAverageField(element: string) {
    let month1 = Number(this.formEmployer.get(`${element}1`)?.value);
    let month2 = Number(this.formEmployer.get(`${element}2`)?.value);
    let month3 = Number(this.formEmployer.get(`${element}3`)?.value);
    let month4 = Number(this.formEmployer.get(`${element}4`)?.value);
    let month5 = Number(this.formEmployer.get(`${element}5`)?.value);
    let month6 = Number(this.formEmployer.get(`${element}6`)?.value);
    switch (element) {
      case 'salaryData.monthlySalaryAverage':
        this.totalSalaryAverage += (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        this.formEmployer.get('salaryData.salary')?.setValue(this.totalSalaryAverage.toFixed(2));
        console.log(this.totalSalaryAverage);
        break;
      case 'salaryData.commissions.monthlyCommissions':
        this.totalCommissionsAverage = (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        break;
      case 'salaryData.extraHours.monthlyExtraHours':
        this.totalExtraHoursAverage = (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        break;
      case 'salaryData.bonuses.monthlyBonus':
        this.totalBonusesAverage = (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        break;
    }
  }

  postEmployeeAndEmployer() {
    console.log("Ok");
    const {companyData, employeeData, salaryData} = this.formEmployer.value;
    this.calculoPrestacionesService.objectGlobal.startDate = employeeData.startDate;
    this.calculoPrestacionesService.objectGlobal.dismissalDate = employeeData.endDate;
    this.calculoPrestacionesService.objectGlobal.fixedSalary = salaryData.fixedSalary === 'SI' ? true : false;
    let data = {
      age: employeeData.employeeAge,
      email: employeeData.employeeEmail,
      employer: {
        companySize: 0,
        economicActivity: companyData.economicActivity,
        employerId: "",
        employerName: companyData.companyName,
        identificationNumber: companyData.rtnNumber,
        identificationType: "CARNET_RESIDENTE",
        personType: companyData.personType
      },
      firstName: employeeData.employeeName,
      gender: employeeData.employeeSex,
      identificationNumber: employeeData.identityNumber,
      identificationType: employeeData.typeIdentity,
      lastName: employeeData.employeeLastname,
      localizationId: employeeData.municipality,
      phoneNumber: employeeData.employeePhone,
      requestId: 0,
      requestType: this.toolbar.userTypeOf,
      terminationContractType: this.toolbar.terminationContractType
    }
    this.calculoPrestacionesService.sendEmployeeEmployerReq(data).subscribe((response: any) => {
      console.log(response);
      const {employerId, requestId, workerPersonId} = response;
      this.EMPLOYER_ID = employerId;
      this.REQUEST_ID = requestId;
      this.WORKER_PERSON_ID = workerPersonId;
      this.calculoPrestacionesService.objectGlobal.employerId = employerId;
      this.calculoPrestacionesService.objectGlobal.requestId = requestId;
      this.calculoPrestacionesService.objectGlobal.workerPersonId = workerPersonId;
      console.log(this.REQUEST_ID);
    })
  }

  postSalaryInfoRequest() {
    console.log("Ok");
    const {salaryData, speciesSalary} = this.formEmployer.value;
    let data = {
      "breastfeedingPaidHours": 0,
      "daysOffPreAndPostNatalWasPaid": 0,
      "daysPaidWasFiredWhilePregnant": 0,
      "dismissalDate": salaryData.endDate,
      "employerId": this.EMPLOYER_ID,
      "fixedSalary": salaryData.fixedSalary === 'SI' ? true : false,
      "hasForewarningNotice": true,
      "hasTakeVacationTimeLastYear": true,
      "howMuchOwedHolyDays": 0,
      "howMuchOwedSeventhDay": 0,
      "lastSixMonthsBonusPayment": [
        salaryData.bonuses.monthlyBonus1,
        salaryData.bonuses.monthlyBonus2,
        salaryData.bonuses.monthlyBonus3,
        salaryData.bonuses.monthlyBonus4,
        salaryData.bonuses.monthlyBonus5,
        salaryData.bonuses.monthlyBonus6,
      ],
      "lastSixMonthsSalary": [
        salaryData.monthlySalaryAverage1,
        salaryData.monthlySalaryAverage2,
        salaryData.monthlySalaryAverage3,
        salaryData.monthlySalaryAverage4,
        salaryData.monthlySalaryAverage5,
        salaryData.monthlySalaryAverage6,
      ],
      "lastSixMonthsSalaryCommissions": [
        salaryData.commissions.monthlyCommissions1,
        salaryData.commissions.monthlyCommissions2,
        salaryData.commissions.monthlyCommissions3,
        salaryData.commissions.monthlyCommissions4,
        salaryData.commissions.monthlyCommissions5,
        salaryData.commissions.monthlyCommissions6
      ],
      "lastSixMonthsSalaryOverTime": [
        salaryData.extraHours.monthlyExtraHours1,
        salaryData.extraHours.monthlyExtraHours2,
        salaryData.extraHours.monthlyExtraHours3,
        salaryData.extraHours.monthlyExtraHours4,
        salaryData.extraHours.monthlyExtraHours5,
        salaryData.extraHours.monthlyExtraHours6
      ],
      "owedBonusVacations": true,
      "owedBonusVacationsAmount": 0,
      "owedBreastfeedingHours": true,
      "owedDaysOffPreAndPostNatal": true,
      "owedHolyDays": true,
      "owedOtherPayments": true,
      "owedOtherPaymentsAmount": 0,
      "owedOvertime": true,
      "owedOvertimeType": "DIURNA",
      "owedOvertimeWork": 0,
      "owedPaidPendingVacations": true,
      "owedPendingVacationsYears": 0,
      "owedSalary": true,
      "owedSalaryAmount": 0,
      "owedSeventhDay": true,
      "requestId": this.REQUEST_ID,
      "salary": Number(salaryData.salary),
      "salaryInKindOptionsType": speciesSalary.foodTime,
      "salaryInKindType": speciesSalary.optionSpeciesSalary,
      "startDate": salaryData.startDate,
      "terminationContractType": this.toolbar.terminationContractType,
      "wasFiredWhilePregnant": true,
      "workerPersonId": this.WORKER_PERSON_ID
    }
    if (!this.saveButtonIsOk) {
      this.calculoPrestacionesService.sendSalaryEmployeeInfo(data).subscribe(value => {
        console.log(value);
        this.saveButtonIsOk = true;
      });
    }

    if (this.saveButtonIsOk) {
      this.calculoPrestacionesService.sendSalaryEmployeeCompute(data)
        .subscribe((response: any) => {
          console.log(response);
        }, (catchError) => {
          console.warn(catchError);
        });
    }
  }

  formDataSend() {
    this.formEmployer.valid ? console.log(this.formEmployer.value) : this.formEmployer.markAllAsTouched();
  }

}
