import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { format } from 'date-fns';

import {IStepperOptions, StepperComponent, ToggleComponent} from 'src/app/_metronic/kt/components';
import {PersonType} from 'src/app/models/enums/person-type.enum';
import { getDataStore, getYearSelect, setDataCacheStore, setDataSalaryCalculationStore } from '../../../../utils/utils';

import {LookupsService} from "../../../services/lookups/lookups.service";
import {SalaryHistoryCatalogService} from "../../../services/salary-history-catalog/salary-history-catalog.service";
import {CalculoPrestacionesService} from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';

import {ToolbarService} from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import {catchError, Observable} from "rxjs";
import { EmployerStore } from '../../state/employer/employers.store';
import { EmployerDto } from 'src/app/models/employer-dto.model';
import { IdentificationType } from 'src/app/models/enums/identification-type.enum';
import { LocationsQuery } from '../../state/locations/locations.query';
import { Locations } from 'src/app/models/locations.model';
import { CalculoPrestacionesRequestType } from 'src/app/models/enums/calculo-prestaciones-request-type.enum';
import { WorkerPersonEmployerRequestDto } from 'src/app/models/worker-person-employer-request-dto.model';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
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

  //SAVE BUTTON / COMPUTE
  saveButtonIsOk = false;
  saveButtonText = '';

  // CONST
  REQUEST_ID: string;
  EMPLOYER_ID: string;
  WORKER_PERSON_ID: string;
  isResponseOk: boolean = false;
  spinnerShow = false;

  // states
  locations$: Observable<Locations[]> = this.locationsQuery.selectAll();
  isLocationsLoaded$: Observable<boolean> = this.locationsQuery.selectLoaded$;

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
    this.saveButtonText = this.saveButtonIsOk ? "Realizar Cálculo" : "Guardar";
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

  private createHistorySalaryFieldYear(anio: string, amount: number){
    return this.formBuilder.group({
      year: [anio],
      amount: [amount, Validators.required],
    });
  }

  private formBuild() {
    this.formEmployer = this.formBuilder.group({
      companyData: this.formBuilder.group({
        companyName: ['La empresa SA', [Validators.required, Validators.minLength(5)]],
        personType: ['JURIDICA', [Validators.required]],
        rtnNumber: ['08011994058778', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]+$/)]],
        dniNumber: ['', []],
        economicActivity: ['', [Validators.required,]],
        companySize: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
      }),
      employeeData: this.formBuilder.group({
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ["0801199405879", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
        employeeName: ['Andrea Nicolle', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastname: ['Salazar', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeAge: [21, [Validators.required, Validators.min(14), Validators.max(85), Validators.pattern(/^[0-9]+$/)]],
        employeeSex: ['F', [Validators.required]],
        employeePhone: ['32876905', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        employeeEmail: ['andrea.nicolle@mail.com', [Validators.required, Validators.email]],
        department: ['', [Validators.required]],
        municipality: ['', [Validators.required]],
      }),
      salaryData: this.formBuilder.group({
        startDate: [this.getFutureDate(5), [Validators.required]],
        endDate: ['2022-09-10', [Validators.required]],
        fixedSalary: ['SI', [Validators.required]],
        salary: ['20000', [Validators.required]],
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
    const {companyData, employeeData, salaryData} = this.formEmployer.value;
    this.calculoPrestacionesService.objectGlobal.startDate = employeeData.startDate;
    this.calculoPrestacionesService.objectGlobal.dismissalDate = employeeData.endDate;
    this.calculoPrestacionesService.objectGlobal.fixedSalary = salaryData.fixedSalary === 'SI' ? true : false;

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
    
    this.calculoPrestacionesService.sendEmployeeEmployerReq(data)
    .subscribe((response: any) => {
      response ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
      const {requestId, workerPersonId, employer} = response;
      setDataCacheStore({employer, requestId, workerPersonId});
      this.currentCacheData = getDataStore('cache');
    })
  }

  postSalaryInfoRequest() {
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
      "terminationContractType": this.toolbarService.terminationContractType,
      "wasFiredWhilePregnant": false,
      "compensationRightsRequest": {
        "hasForewarningNotice": true,
        "hasTakeVacationTimeLastYear": true
      }
    }
    setDataCacheStore(Object.assign(getDataStore('cache'),{historySalary: this.historySalaryValue}));
    this.calculoPrestacionesService.sendCompensationsRightsInfo(data)
    .subscribe(value => {
      value ? this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay') : null;
      setDataSalaryCalculationStore(value);
      this.calculoPrestacionesService.isShowCalculoSalarial$.emit(true);
      this.calculoPrestacionesService.isShowCompensationRights$.emit(true);
      setTimeout(() => {
        this.route.navigate(['/dashboard'], {fragment: 'compensation-rights'});
      }, 2000); 
    });
  }

  getCurrentRequestType(){
    return this.toolbarService.userTypeOf
  }
  
  getCurrentTerminationContract(){
    return this.toolbarService.terminationContractType;
  }

  addHistorySalaryFields(){
    //this.historySalaryField.clear();
    let years = getYearSelect(this.formEmployer.get('salaryData.startDate')?.value,
    this.formEmployer.get('salaryData.endDate')?.value);
    console.log(years);
    years.forEach((year:any) => this.historySalaryField.push(this.createHistorySalaryFieldYear(year,0)));
    const historySalaryElements : any = document.querySelectorAll('.historySalaryInput');
    historySalaryElements.forEach((element:any) => element.setAttribute('disabled','true'));
    
  }

  scrollAnimation() {
    window.addEventListener("scroll", () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if(Math.ceil(scrolled) === scrollable){
        alert('Llegaste al Final');
      }   
    });
  }

  formDataSend() {
    this.postSalaryInfoRequest();
    //this.formEmployer.valid ? console.log(this.formEmployer.value) : this.formEmployer.markAllAsTouched();
  }

}
