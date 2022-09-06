import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { format } from 'date-fns';

import {IStepperOptions, StepperComponent, ToggleComponent} from 'src/app/_metronic/kt/components';
import {PersonType} from 'projects/calculo-prestaciones/src/lib/models/enums/person-type.enum';
import { getDataStore, getYearSelect, scrollAnimationGoTo, setDataCacheStore, setDataEmployeeStore, setDataGender } from '../../../../../../src/app/utils/utils';

import {LookupsService} from "../../services/lookups/lookups.service";
import {SalaryHistoryCatalogService} from "../../services/salary-history-catalog/salary-history-catalog.service";
import {CalculoPrestacionesService} from 'projects/calculo-prestaciones/src/lib/services/calculo-prestaciones/calculo-prestaciones.service';

import {ToolbarService} from 'src/app/modules/layout/components/toolbar/toolbar.service';
import {catchError, Observable} from "rxjs";
import { EmployerStore } from '../../state/employer/employers.store';
import { EmployerDto } from 'projects/calculo-prestaciones/src/lib/models/employer-dto.model';
import { IdentificationType } from 'projects/calculo-prestaciones/src/lib/models/enums/identification-type.enum';
import { LocationsQuery } from '../../state/locations/locations.query';
import { Locations } from 'projects/calculo-prestaciones/src/lib/models/locations.model';
import { CalculoPrestacionesRequestType } from 'projects/calculo-prestaciones/src/lib/models/enums/calculo-prestaciones-request-type.enum';
import { WorkerPersonEmployerRequestDto } from 'projects/calculo-prestaciones/src/lib/models/worker-person-employer-request-dto.model';
import { TerminationContractType } from 'projects/calculo-prestaciones/src/lib/models/enums/termination-contract-type.enum';
import { Router } from '@angular/router';



@Component({
  selector: 'ecms-datos-empleador',
  templateUrl: './datos-empleador.component.html',
  styleUrls: ['./datos-empleador.component.scss']
})
export class DatosEmpleadorComponent implements OnInit {

  // Variables
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef;
  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('salary') salaryField: ElementRef;
  @ViewChild('submit') btnSubmit: ElementRef;
  @ViewChild('historySalaryYearField') txtHistorySalary: ElementRef;
  @Output() calculoResponseEvent = new EventEmitter<any>();
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

  locationSelected: string;
  currentMunicipios: any[];
  currentEconomicActivity: any[];
  currentTerminationContractType: TerminationContractType;
  currentCacheData: any;
  totalSalaryAverage = 0;
  totalCommissionsAverage = 0;
  totalExtraHoursAverage = 0;
  totalBonusesAverage = 0;
  isSalaryFieldDisabled: boolean = true;
  minDate: string;


  // states
  //locations$: Observable<Locations[]> = this.locationsQuery.selectAll();
  //isLocationsLoaded$: Observable<boolean> = this.locationsQuery.selectLoaded$;

  constructor(
    private lookupsService: LookupsService,
    private salaryHistoryCatalogService: SalaryHistoryCatalogService,
    private calculoPrestacionesService: CalculoPrestacionesService,
    private toolbarService: ToolbarService,
    private formBuilder: FormBuilder,
    private render2: Renderer2,
    private employerStore: EmployerStore,
    private locationsQuery: LocationsQuery,
    private route: Router
    ) {
    this.formBuild();
  }


  ngAfterViewInit(): void {
    this.stepperConfig();
  }

  ngOnInit(): void {

    // locations
    this.lookupsService.getLocations().subscribe((data) => {
      this.locations = data;
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

    this.calculoPrestacionesService.terminationContractType$
    .subscribe((option:TerminationContractType) => this.currentTerminationContractType = option);
    this.currentTerminationContractType = this.toolbarService.terminationContractType;
  }

  stepperConfig() {
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
        this.addHistorySalaryFields();
        return this.stepper.goNext();
      }

      if (this.formEmployer.get('speciesSalary')?.valid && this.stepper.getCurrentStepIndex() === 4) {
        return this.stepper.goNext();
      }

      if (this.formEmployer.get('historySalary')?.valid && this.stepper.getCurrentStepIndex() === 5) {
        return this.stepper.goNext();
      }
    });
  }

  private createHistorySalaryFieldYear(anio: string, amount: any){
    return this.formBuilder.group({
      year: [anio],
      salary: [amount, [Validators.required]],
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
        companySize: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
      }),
      employeeData: this.formBuilder.group({
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
        employeeName: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastname: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeAge: ['', [Validators.required, Validators.min(14), Validators.max(85), Validators.pattern(/^[0-9]+$/)]],
        employeeSex: ['F', [Validators.required]],
        employeePhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        employeeEmail: ['', [Validators.required, Validators.email]],
        department: ['', [Validators.required]],
        municipality: ['', [Validators.required]],
      }),
      salaryData: this.formBuilder.group({
        startDate: ['2020-09-10', [Validators.required]],
        endDate: [this.getFutureDate(), [Validators.required]],
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
        optionSpeciesSalary: ['', [Validators.required]],
        foodTime: ['NONE', []]
      }),
      historySalary: this.formBuilder.array([])
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
          this.formEmployer.get('companyData.rtnNumber')?.setValidators([]);
          this.formEmployer.get('companyData.dniNumber')?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]);
        }
        if (value === '1') {
          this.formEmployer.get('companyData.rtnNumber')?.setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]+$/)]);
          this.formEmployer.get('companyData.dniNumber')?.setValidators([]);
        }
      });

    this.formEmployer.get('speciesSalary.optionSpeciesSalary')?.valueChanges
    .subscribe(value => {
      if(value === 'FEED'){
        this.formEmployer.get('speciesSalary.foodTime')?.setValidators([Validators.required]);
      }else{
        this.formEmployer.get('speciesSalary.foodTime')?.setValidators([]);
      }
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

  get historySalaryField(){
    return this.formEmployer.get('historySalary') as FormArray;
  }

  get historySalaryValue() {
    return this.formEmployer.get('historySalary')?.value;
  }

  /**
   * It takes a number of days and returns a date in the future
   * @param {number} majorDays - number - The number of days you want to add to the current date.
   * @returns A string in the format of yyyy-MM-dd
   */
  getFutureDate(majorDays?: number){
    if(majorDays){
      let totalDay = (new Date().getDate()) + majorDays;
      return format(new Date().setDate(totalDay),'yyyy-MM-dd');
    }
    return format(new Date(),'yyyy-MM-dd');
  }

  setMinDate(){
    this.minDate = this.formEmployer.get('salaryData.startDate')?.value;
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

  postEmployeeAndEmployer(): void {
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    const {companyData, employeeData} = this.formEmployer.value;
    let employer: EmployerDto = {
      companySize: 0,
      economicActivity: companyData.economicActivity,
      employerId: "",
      employerName: companyData.companyName,
      identificationNumber: companyData.rtnNumber,
      identificationType: IdentificationType.DNI,
      personType: companyData.personType
    };

    // call employer store
    this.employerStore.add(employer);


    let data = {
      age: employeeData.employeeAge,
      email: employeeData.employeeEmail,
      employer,
      firstName: employeeData.employeeName,
      gender: employeeData.employeeSex,
      identificationNumber: employeeData.identityNumber,
      identificationType: employeeData.typeIdentity,
      lastName: employeeData.employeeLastname,
      localizationId: employeeData.municipality,
      phoneNumber: employeeData.employeePhone,
      requestId: 0,
      requestType: this.getCurrentRequestType(),
      terminationContractType: this.getCurrentTerminationContract()
    }
    setDataEmployeeStore(data);
    let req = getDataStore('cache');
    setDataGender(employeeData.employeeSex);
    this.calculoPrestacionesService.sendEmployeeEmployerReq(data)
    .subscribe((response: any) => {
      response ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
      const {requestId, workerPersonId, employer} = response;
      setDataCacheStore(Object.assign(req, { requestId, workerPersonId, employer}));
      this.currentCacheData = getDataStore('cache');
    })
  }

  postSalaryInfoRequest() {
    if (this.formEmployer.get('historySalary')?.valid && this.stepper.getCurrentStepIndex() === 5) {
      this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
      const {salaryData, speciesSalary} = this.formEmployer.value;
      let data = {
        "dismissalDate": salaryData.endDate,
        "employerId": this.currentCacheData.employer.employerId,
        "fixedSalary": salaryData.fixedSalary === 'SI' ? true : false,
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
        "requestId": this.currentCacheData.requestId,
        "workerPersonId": this.currentCacheData.workerPersonId,
        "salary": Number(salaryData.salary),
        "salaryInKindOptionsType": speciesSalary.foodTime,
        "salaryInKindType": speciesSalary.optionSpeciesSalary,
        "startDate": salaryData.startDate,
        endDate: salaryData.endDate,
        "terminationContractType": this.toolbarService.terminationContractType,
        "wasFiredWhilePregnant": false,
        "compensationRightsRequest": {
          "hasForewarningNotice": true,
          "hasTakeVacationTimeLastYear": false
        }
      }
      let storeOld = getDataStore('cache');
      storeOld.historySalaries = this.historySalaryValue;
      setDataCacheStore(Object.assign(storeOld, data));
      this.calculoPrestacionesService.sendCompensationsRightsInfo(data)
      .subscribe(value => {
        value ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
        this.calculoResponseEvent.emit(value);
        setTimeout(() => scrollAnimationGoTo('calculo-salarial'), 550);
      }, (catchError) => console.warn(catchError));
    }
  }

  getCurrentRequestType(){
    return this.toolbarService.userTypeOf
  }

  getCurrentTerminationContract(){
    return this.toolbarService.terminationContractType;
  }

  addHistorySalaryFields(){
    if(this.historySalaryField.controls.length > 0){
      this.historySalaryField.controls.splice(0,this.historySalaryField.controls.length);
    }
    let years = getYearSelect(this.formEmployer.get('salaryData.startDate')?.value,
    this.formEmployer.get('salaryData.endDate')?.value);
    years.forEach((year:any) => this.historySalaryField.push(this.createHistorySalaryFieldYear(year,'')));
    const historySalaryElements = document.querySelectorAll('.historySalaryInput');
    historySalaryElements.forEach((element:any) => element.setAttribute('disabled','true'));

  }

  formDataSend() {
    this.postSalaryInfoRequest();
  }

}
