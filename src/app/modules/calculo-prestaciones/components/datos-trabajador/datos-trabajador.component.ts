import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';


import {IStepperOptions, StepperComponent, ToggleComponent } from 'src/app/_metronic/kt/components';
import {PersonType } from 'src/app/models/enums/person-type.enum';

import {LookupsService} from "../../../services/lookups/lookups.service";
import {SalaryHistoryCatalogService} from "../../../services/salary-history-catalog/salary-history-catalog.service";
import {CalculoPrestacionesService} from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';

import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';
import { Observable } from 'rxjs';
import { IdentificationType } from 'src/app/models/enums/identification-type.enum';
import { LocationsQuery } from '../../state/locations/locations.query';
import { Locations} from 'src/app/models/locations.model';
import { WorkerPersonEmployerRequestDto } from 'src/app/models/worker-person-employer-request-dto.model';
import { EmployerDto } from 'src/app/models/employer-dto.model';
import { WorkerPersonStore } from '../../state/workerperson-employer-request/workerperson-employer-request.store';
import { getYearSelect } from 'src/app/utils/utils';
import { format } from 'date-fns';
import { CalculoPrestacionesRequestType } from 'src/app/models/enums/calculo-prestaciones-request-type.enum';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { SalaryCalculationStore } from '../../state/salary-calculation/salary-calculation.store';
import { SalaryCalculationQuery } from '../../state/salary-calculation/salary-calculation.query';





@Component({
  selector: 'ecms-datos-trabajador',
  templateUrl: './datos-trabajador.component.html',
  styleUrls: ['./datos-trabajador.component.scss'], 
})

export class DatosTrabajadorComponent implements OnInit {



  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef;
  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('salary') salaryField: ElementRef;
  @ViewChild('submit') btnSubmit: ElementRef;
  @ViewChild('historySalaryYearField') txtHistorySalary: ElementRef;
  stepper1: any;
  formEmployee:FormGroup;


  //public currentStep : Number = 1;
  stepperOptions: IStepperOptions = {
    startIndex: 1,
    animation: false,
    animationSpeed: '',
    animationNextClass: '',
    animationPreviousClass: ''
  };
  personTypeList = Object.values(PersonType).splice(0, 2);
  salaryOptions:String[] = ['SI', 'NO'];
  haveSalary: string = 'SI';
  economicActivityList:any []= [];
  salaryRatesList: any[] = []; 
  locations: any[] = [];
  companySizeList: any[] = [];
  
  locationSelected:string;
  currentMunicipios: any[] = [];
  currentEconomicActivity: any[] = [];
  currentTerminationContractType: TerminationContractType;
  totalSalaryAverage = 0;
  totalCommissionsAverage = 0;
  totalExtraHoursAverage = 0;
  totalBonusesAverage = 0;
  isSalaryFieldDisabled: boolean =true;
  minDate: string;
  currentDataStore:object;
  currentCacheData: object;
  

  //SAVE-BUTTON
  saveButtonIsOk =false;
  saveButtonText ='';

//CONST
  REQUEST_ID:string;
  EMPLOYER_ID:string;
  WORKER_PERSON_ID: string;
  isResponseOk: boolean = false;
  spinnerShow = false;

  locations$: Observable<Locations[]> = this.locationsQuery.selectAll();
  isLocationsLoaded$: Observable<boolean> = this.locationsQuery.selectLoaded$;
  



  constructor(private lookusService: LookupsService,
              private salaryHistoryCatalogService: SalaryHistoryCatalogService,
              private calculoPrestacionesService: CalculoPrestacionesService,
              private toolbar: ToolbarService,
              private formBuilder: FormBuilder,
              private render2: Renderer2,
              private workerPersonStore: WorkerPersonStore,
              private locationsQuery: LocationsQuery,
              private salaryCalculationStore: SalaryCalculationStore,
              private salaryCalculationQuery: SalaryCalculationQuery)
              {
    this.formBuild();            
    
  }

  ngAfterViewInit(): void{
    this.stepperConfig();
    this.saveButtonText=this.saveButtonIsOk ? "Realizar Calculo" : "Guardar";
    
    }
    
    ngOnInit(): void {
    //search locations



    this.lookusService.getLocations().subscribe((data) =>{
      this.locations = data;
    }, ((error?: any)=> {
      const err = error.message | error;
      console.warn(err);
    }));

    this.locations$.subscribe((locations)=>{
      this.locations = locations;  
    }); 
    
    //economicActivityList
    this.salaryHistoryCatalogService.getEconomicActivities().subscribe((data)=> {
    this.economicActivityList = data;
    },((error)=> {
    const err=error.message | error; 
    console.warn(err);
    }));
    
    this.calculoPrestacionesService.terminationContractType$
    .subscribe((option:TerminationContractType) => this.currentTerminationContractType = option);
    this.currentTerminationContractType = this.toolbar.terminationContractType;

    this.salaryCalculationQuery.getData().subscribe(res => this.currentDataStore=res);
    this.salaryCalculationQuery.getCache().subscribe(res => this.currentCacheData=res);
  }
    
    
    stepperConfig()
    {
    this.stepper1 = new StepperComponent(this.stepperSteps.nativeElement, this.stepperOptions);
    this.stepper1.on("kt.stepper.previous", () => this.stepper1.goPrev());
    this.stepper1.on("kt.stepper.next", () =>{
    
    if(this.formEmployee.get('employeeData')?.valid && this.stepper1.getCurrentStepIndex() === 1){
        return this.stepper1.goNext(); 
    }
    if (this.formEmployee.get('companyData')?.valid && this.stepper1.getCurrentStepIndex() === 2) {
        this.postEmployeeAndEmployer();
        return this.stepper1.goNext();
    }
    
    if(this.formEmployee.get('salaryData')?.valid && this.stepper1.getCurrentStepIndex() === 3) {
      this.addHistorySalaryFields();
      return this.stepper1.goNext();
    }
    
    if(this.formEmployee.get('speciesSalary') ?.valid && this.stepper1.getCurrentStepIndex() === 4) {
      return this.stepper1.goNext();
    }
    
    });
    
    }
    private formBuild(){
    this.formEmployee= this.formBuilder.group({
      employeeData: this.formBuilder.group({
        employeeName: ['', [Validators.required,Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastName: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeSex: ['Masculino', [Validators.required] ],
        employeeAge:[,[Validators.required, Validators.minLength(14), Validators.maxLength(85), Validators.pattern(/^[0-9]+$/)]],
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
        employeePhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        employeeEmail: ['', [Validators.required, Validators.email]],
      
      }),

    companyData:this.formBuilder.group({
      department: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      companyName: ['', [Validators.required, Validators.minLength(5)]],
      economicActivity: ['', [Validators.required,]],
      companySize:['',[ Validators.required, Validators.pattern(/^[0-9]+$/)]],
      personType: ['JURIDICA', [Validators.required]],
    }), 
    
    salaryData: this.formBuilder.group({
      startDate: ['2019-06-12', [Validators.required]],
      endDate: [this.getFutureDate(5), [Validators.required]],
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
    }),
    historySalary: this.formBuilder.array([])    
    });
    
    this.formEmployee.get('salaryData.fixedSalary')?.valueChanges.
    subscribe(value => {
      console.log(value);
      if (value === 'NO') {
        for (let item =1; item<= 6; item++) {
          this.formEmployee.get(`salaryData.monthlySalaryAverage${item}`)?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
        } 
        this.formEmployee.get('salaryData.salary')?.setValue(this.totalSalaryAverage);
        this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'false');
        this.isSalaryFieldDisabled = true;
        }else {
          for (let item = 1; item<= 6; item++) {
            this.formEmployee.get(`salaryData.monthlySalaryAverage${item}`)?.setValidators(null);
          }

          this.formEmployee.get('salaryData.salary')?.setValue(0);
          this.render2.removeAttribute(this.salaryField.nativeElement, 'disabled');
          this.isSalaryFieldDisabled =false;

        }
        this.haveSalary = value;
    });

    this.formEmployee.get('employeeData.identityNumber')?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]);
    
    this.formEmployee.get(`species.Salary.optionsSpeciesSalary`)?.valueChanges.subscribe(value => {
        if (value=== 'alimetacion'){
          return this.formEmployee.get('speciesSalary.foodTime')?.setValidators([Validators.required]);
        }
        this.formEmployee.get('speciesSalary.foodTime')?.setValidators([]);
    });
    
    }
    
    private createHistorySalaryFieldYear(anio: string, amount: number){
      return this.formBuilder.group({
        year: [anio],
        amount: [amount, Validators.required],
      });
    }
    
    get salaryValue() {
    return this.formEmployee.get('salaryData.salary')?.value;
    }
    
    get speciesSalaryValue() {
    return this.formEmployee.get('speciesSalary.optionSpeciesSalary')?.value;
    }
    
    get isSpeciesSalaryValid() {
    return this.formEmployee.get('speciesSalary')?.valid;
    }

    getEconomicActivity(event: string) {
      console.log(event);
      console.log(this.getCompanyEmployeeWeight(event));
      this.currentEconomicActivity = this.getCompanyEmployeeWeight(event);
    }
    
    totalySpeciesSalary(percentage: string) {
    if (percentage ==='20%') return (Number(this.salaryValue) * 0.20).toFixed(2);
    if (percentage === '30%') return (Number(this.salaryValue) * 0.30).toFixed(2);
    }
    
    getErrorField(element: string, errorName: string) {
    return this.formEmployee.get(element)?.hasError(errorName);
    }
    
    isValidField(formControlName: string) {
    return this.formEmployee.get(formControlName)?.touched &&
    this.formEmployee.get(formControlName)?.valid
    }

    isInvalidField(formControlName: string) {
      return this.formEmployee.get(formControlName)?.touched && 
      this.formEmployee.get(formControlName)?.invalid
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

    
    
    getTotalAverageField(element: string) {
      let month1 = Number(this.formEmployee.get(`${element}1`)?.value);
      let month2 = Number(this.formEmployee.get(`${element}2`)?.value);
      let month3 = Number(this.formEmployee.get(`${element}3`)?.value);
      let month4 = Number(this.formEmployee.get(`${element}4`)?.value);
      let month5 = Number(this.formEmployee.get(`${element}5`)?.value);
      let month6 = Number(this.formEmployee.get(`${element}6`)?.value);
      switch (element) {
        case 'salaryData.monthlySalaryAverage':
          this.totalSalaryAverage += (month1 + month2 + month3 + month4 + month5 + month6) / 6;
          this.formEmployee.get('salaryData.salary')?.setValue(this.totalSalaryAverage.toFixed(2));
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

    get historySalaryField(){
      return this.formEmployee.get('historySalary') as FormArray;
    }
    
    getCurrentRequestType(){
      return this.toolbar.userTypeOf
    }

    getCurrentTerminationContract(){
      return this.toolbar.terminationContractType;
    }
    

    postEmployeeAndEmployer(): void {
      this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
        const {salaryData, employeeData, companyData} = this.formEmployee.value;
        this.calculoPrestacionesService.objectGlobal.startDate = employeeData.startDate;
        this.calculoPrestacionesService.objectGlobal.dismissalDate = employeeData.endDate;
        this.calculoPrestacionesService.objectGlobal.fixedSalary = salaryData.fixedSalary === 'SI' ? true : false;

       //this.workerPersonStore.add(employee);
      
      let employer:EmployerDto = {
        companySize: companyData.companySize,
          economicActivity: companyData.economicActivity,
          employerId: "",
          employerName: companyData.companyName,
          identificationNumber: "",
          identificationType: IdentificationType.DNI,
          personType: PersonType.JURIDICA
      }

      let data:WorkerPersonEmployerRequestDto = {
        age: employeeData.employeeAge,
        email: employeeData.employeeEmail,
        employer,
        firstName: employeeData.employeeName,
        gender: employeeData.employeeSex,
        identificationNumber: employeeData.identityNumber,
        identificationType: employeeData.typeIdentity,
        lastName: employeeData.employeeLastName,
        localizationId: companyData.municipality,
        phoneNumber: employeeData.employeePhone,
        requestId: 0,
        requestType: this.getCurrentRequestType(),
        terminationContractType: this.getCurrentTerminationContract()
      }
        
      //this.workerPersonStore.add(data);
      
      console.log(data);

      this.calculoPrestacionesService.sendEmployeeEmployerReq(data).subscribe((response: any)=>{
        if(response){
          this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay');
        }
        console.log(response);
        const { requestId, workerPersonId, employer} = response;
        let cache ={
          requestId,
          workerPersonId,
          employer
        }
        this.salaryCalculationStore.update(state => {
          return {
            cache : {
              ...state.cache,
              cache
            }
          };
        });
        console.log(this.currentCacheData);

        

      })

      }

      /*companyName: companyData.companyName,
        economicActivity: companyData.economyActivity,
        stardate: companyData.stardate,
        dismissal: companyData.enddate,
        fixedSalary: companyData.fixedSalary,
        salary: companyData.salary,*/

    
    postSalaryInfoRequest() {
      console.log("Ok");
      const {salaryData, speciesSalary} = this.formEmployee.value;

      let data = {
        /*"breastfeedingPaidHours": 0,
        "daysOffPreAndPostNatalWasPaid": 0,
        "daysPaidWasFiredWhilePregnant": 0,*/
        "dismissalDate": salaryData.endDate,
        "employerId": this.EMPLOYER_ID,
        "fixedSalary": salaryData.fixedSalary === 'SI' ? true : false,
        /*"hasForewarningNotice": true,
        "hasTakeVacationTimeLastYear": true,
        "howMuchOwedHolyDays": 0,
        "howMuchOwedSeventhDay": 0,*/
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
        /*"owedBonusVacations": true,
        "owedBonusVacationsAmount": 0,
        "owedBreastfeedingHours": false,
        "owedDaysOffPreAndPostNatal": false,
        "owedHolyDays": true,
        "owedOtherPayments": true,
        "owedOtherPaymentsAmount": 0,
        "owedOvertime": true,
        "owedOvertimeType": "DIURNA",
        "owedOvertimeWork": 0,
        "owedPaidPendingVacations": true,
        "owedPendingVacationsYears": 0,
        "owedSalary": false,
        "owedSalaryAmount": 0,
        "owedSeventhDay": false,
        "wasFiredWhilePregnant": false,*/
        
        "requestId": this.REQUEST_ID,
        "salary": Number(salaryData.salary),
        "salaryInKindOptionsType": speciesSalary.foodTime,
        "salaryInKindType": speciesSalary.optionSpeciesSalary,
        "startDate": salaryData.startDate,
        "terminationContractType": this.toolbar.terminationContractType,
        "workerPersonId": this.WORKER_PERSON_ID,
        
      }

      this.saveButtonText ="";

      if(!this.saveButtonText){
        this.saveButtonIsOk = true;
        this.spinnerShow = true;
        this.calculoPrestacionesService.sendSalaryEmployeeInfo(data).subscribe(value => {
        this.saveButtonText = "Realizar Calculo";
        this.spinnerShow = false;
        });
      }

      if (this.saveButtonIsOk) {
        this.spinnerShow = false;
        this.calculoPrestacionesService.sendSalaryEmployeeCompute(data)
          .subscribe((response: any) => {
            this.calculoPrestacionesService.objectGlobal = Object.assign(this.calculoPrestacionesService.objectGlobal, response);
            console.log('Global',this.calculoPrestacionesService.objectGlobal);
            this.calculoPrestacionesService.isShowCalculoSalarial = true;
            this.calculoPrestacionesService.isShowIndemnizaciones = true;
          }, (catchError) => {
            console.warn(catchError);
          });
      }
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
      //his.formEmployee.valid ? console.log(this.formEmployee.value) : this.formEmployee.markAllAsTouched();
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
      this.minDate = this.formEmployee.get('salaryData.startDate')?.value;
    }
    
    addHistorySalaryFields(){ 
      if(this.historySalaryField.controls.length > 0){
        this.historySalaryField.controls.splice(0,this.historySalaryField.controls.length);
      }
      let years = getYearSelect(this.formEmployee.get('salaryData.startDate')?.value,
      this.formEmployee.get('salaryData.endDate')?.value);
      console.log(years);
      years.forEach((year:any) => this.historySalaryField.push(this.createHistorySalaryFieldYear(year,0)));
      const historySalaryElements : any = document.querySelectorAll('.historySalaryInput');
      historySalaryElements.forEach((element:any) => element.setAttribute('disabled','true')); 
    }

}



  

  



