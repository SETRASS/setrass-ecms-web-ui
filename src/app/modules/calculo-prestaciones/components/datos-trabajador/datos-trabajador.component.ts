import { Component, ElementRef, OnInit,Renderer2, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

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
import { WorkerPersonState, WorkerPersonStore } from '../../state/workerperson-employer-request/workerperson-employer-request.store';




@Component({
  selector: 'app-datos-trabajador',
  templateUrl: './datos-trabajador.component.html',
  styleUrls: ['./datos-trabajador.component.scss'],
})

export class DatosTrabajadorComponent implements OnInit {
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef;
  @ViewChild('salary') salaryField: ElementRef;
  @ViewChild('submit') btnSubmit: ElementRef;
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
  currentMunicipioss: any[] = [];
  currentEconomicActivity: any[] = [];
  totalSalaryAverage: 0; 
  totalCommissionsAverage: 0;
  totalExtraHoursAverage: 0;
  totalBonusesAverage: 0;
  totalHistorySalaryAverage: 0;
  isSalaryFieldDisabled: boolean =true;

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
              private locationsQuery: LocationsQuery) {
    this.formBuild();            
    
  }

  ngAfterViewInit(): void{
    this.stepperConfig();
    this.saveButtonText=this.saveButtonIsOk ? "Realizar Calculo" : "Guardar";
    
    }
    
    ngOnInit(): void {
    //search locations

    this.lookusService.getLocations().subscribe((data) =>{

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
    
    // company size
    this.salaryHistoryCatalogService.getCompanySizes().subscribe((data) => {
      this.companySizeList = data.map(val => ({id: val.id, name: `${val.minQty} a ${val.maxQty} Empleados`}));
    }, (error) => {
      const err = error.message | error;
      console.warn(err);
    });
  }
    
    
    stepperConfig()
    {
    this.stepper1 = new StepperComponent(this.stepperSteps.nativeElement, this.stepperOptions);
    this.stepper1.on("kt.stepper.previous", () => this.stepper1.goPrev());
    this.stepper1.on("kt.stepper.next", () =>{
    
    if(this.formEmployee.get('employeeData')?.valid && this.stepper1.getCurrentStepIndex() === 1){
        return this.stepper1.goNext(); 
    }
    if (this.formEmployee.get('employeeData')?.valid && this.stepper1.getCurrentStepIndex() === 2) {
        this.lookusService.getLocations();
        return this.stepper1.goNext();
    }
    
    if(this.formEmployee.get('companyData')?.valid && this.stepper1.getCurrentStepIndex() === 3) {
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
    emloyeeName: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
    employeeLastname: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
    employeeSex: ['Masculino', [Validators.required] ],
    employeeAge:[,[Validators.required, Validators.minLength(14), Validators.maxLength(85), Validators.pattern(/^[0-9]+$/)]],
    typeIdentity: ['DNI', [Validators.required]],
    identityNumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
    employeePhone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    employeeEmail: ['', [Validators.required, Validators.email]],
    department: ['', [Validators.required]],
    municipality: ['', [Validators.required]],
    city: ['', [Validators.required]],
    }),
    
    companyData: this.formBuilder.group({
    companyName: ['', [Validators.required, Validators.minLength(5)]],
    economicActivity: ['', [Validators.required,]],
    companySize:['',[ Validators.required]],
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
    historySalary: this.formBuilder.group({
      historySalary1: [0, []],
      historySalary2: [0, []],
      historySalary3: [0, []],
      historySalary4: [0, []],
      historySalary5: [0, []],
      historySalary6: [0, []],
      historySalary7: [0, []],
      historySalary8: [0, []]
      })
    }),
    
    speciesSalary: this.formBuilder.group({
    optionSpeciesSalary: ['NONE', [Validators.required]],
    foodTime: ['NONE', []]
    }),

    
    
    });
    
    this.formEmployee.get('companyData.fixedSalary')?.valueChanges.subscribe(value => {
      console.log(value);
      if (value === 'NO') {
        for (let item =1; item<= 6; item++) {
          this.formEmployee.get(`companyData.monthlySalaryAverage${item}`)?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
        } 
        this.formEmployee.get('companyData.salary')?.setValue(this.totalSalaryAverage);
        this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'false');
        this.isSalaryFieldDisabled = true;
        }else {
          for (let item = 1; item<= 6; item++) {
            this.formEmployee.get(`companyData.monthlySalaryAverage${item}`)?.setValidators(null);
          }

          this.formEmployee.get('companyData.salary')?.setValue(0);
          this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'false');
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
    
    
    get salaryValue() {
    return this.formEmployee.get('companyData.salary')?.value;
    }
    
    get speciesSalaryValue() {
    return this.formEmployee.get('speciesSalary.optionSpeciesSalary')?.value;
    }
    
    get isSpeciesSalaryValid() {
    return this.formEmployee.get('speciesSalary')?.valid;
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
    
    getMunicipios(id: string) {
    return this.locations.find(val => val.location.id === id).children;
    }
    
    getCompanyEmployeeWeight(economicActivity: string) {
    return this.economicActivityList.filter(val => val.economicActivity === economicActivity);
    }
    
    getLocation(event: any) {
    this.currentMunicipioss = this.getMunicipios(event);
    }
    
    getTotalAverageField(element: string) {
    let month1 = Number(this.formEmployee.get(`${element}1`)?.value);
    let month2 = Number(this.formEmployee.get(`${element}2`)?.value);
    let month3 = Number(this.formEmployee.get(`${element}3`)?.value);
    let month4 = Number(this.formEmployee.get(`${element}4`)?.value);
    let month5 = Number(this.formEmployee.get(`${element}5`)?.value);
    let month6 = Number(this.formEmployee.get(`${element}6`)?.value);

    switch (element){
      case 'companyData.monthlySalaryAverage':
        this.totalSalaryAverage += (month1+ month2 + month3 + month4 + month5 + month6) / 6;
        this.formEmployee.get('companyData.salary')?.setValue(this.totalSalaryAverage.toFixed(2));
        console.log(this.totalSalaryAverage);
        break;

        case 'companyData.commisions.monthlyCommissions':
          this.totalCommissionsAverage += (month1+ month2 + month3 + month4 + month5 + month6) / 6;
          break;

        case 'companyData.extraHours.monthlyExtraHours':
          this.totalExtraHoursAverage += (month1 + month2 + month3 + month4 + month5 + month6) / 6;
          break;

            case 'companyData.bonuses.monthlyBonus':
            this.totalBonusesAverage += (month1+ month2 + month3 + month4 + month5 + month6  ) / 6;
            break;       


    }

    
    }

    getTotalAverageField2(element: string){
      let year1 = Number(this.formEmployee.get(`${element}1`)?.value);
      let year2 = Number(this.formEmployee.get(`${element}2`)?.value);
      let year3 = Number(this.formEmployee.get(`${element}3`)?.value);
      let year4 = Number(this.formEmployee.get(`${element}4`)?.value);
      let year5 = Number(this.formEmployee.get(`${element}5`)?.value);
      let year6 = Number(this.formEmployee.get(`${element}6`)?.value);
      let year7 = Number(this.formEmployee.get(`${element}7`)?.value);   
      let year8 = Number(this.formEmployee.get(`${element}8`)?.value);
    
    this.totalHistorySalaryAverage += (year1+ year2+ year3+ year4+ year5+ year6+ year7+ year8);
    console.log(this.totalHistorySalaryAverage);

    }

    postEmployeeAndEmployer(): void {
      console.log("Ok");
        const {companyData, employeeData, salaryData, employer} = this.formEmployee.value;
        this.calculoPrestacionesService.objectGlobal.startDate = employeeData.startDate;
        this.calculoPrestacionesService.objectGlobal.dismissalDate = employeeData.endDate;
        this.calculoPrestacionesService.objectGlobal.fixedSalary = companyData.fixedSalary === 'SI' ? true : false;


      let employee: WorkerPersonEmployerRequestDto = {
        requestId: 0,
        firstName: employeeData.employeeName,
        lastName: employeeData.employeeLastname,
        gender: employeeData.employeeSex,
        age: employeeData.employeeAge,
        identificationType: IdentificationType.CARNET_RESIDENTE,
        identificationNumber: employeeData.identityNumber,
        phoneNumber: employeeData.employeePhone,
        email: employeeData.employeeEmail,
        localizationId: employeeData.localizationId,
        employer,
        requestType: employeeData.requestType,


      };

      this.workerPersonStore.add(employee);

      let data = {
      companyName: companyData.companyName,
      economicActivity: companyData.economyActivity,
      stardate: companyData.stardate,
      dismissal: companyData.enddate,
      fixedSalary: companyData.fixedSalary,
      salary: companyData.salary,
      
      }

      this.calculoPrestacionesService.sendEmployeeEmployerReq(data).subscribe((response: any)=>{
        console.log(response);
        const { requestId, workerPersonId} = response;
        this.REQUEST_ID = requestId;
        this.WORKER_PERSON_ID = workerPersonId;
        this.calculoPrestacionesService.objectGlobal.requestId = requestId;
        this.calculoPrestacionesService.objectGlobal.workerPersonId = workerPersonId;
        console.log(this.REQUEST_ID);
        console.log(response);
      })

    }

    postSalaryInfoRequest() {
      console.log("Ok");
      const {companyData, speciesSalary} = this.formEmployee.value;
      let data = {
        "breastfeedingPaidHours": 0,
        "daysOffPreAndPostNatalWasPaid": 0,
        "daysPaidWasFiredWhilePregnant": 0,
        "dismissalDate": companyData.endDate,
        "employerId": this.EMPLOYER_ID,
        "fixedSalary": companyData.fixedSalary === 'SI' ? true : false,
        "hasForewarningNotice": true,
        "hasTakeVacationTimeLastYear": true,
        "howMuchOwedHolyDays": 0,
        "howMuchOwedSeventhDay": 0,
        "lastSixMonthsBonusPayment": [
          companyData.bonuses.monthlyBonus1,
          companyData.bonuses.monthlyBonus2,
          companyData.bonuses.monthlyBonus3,
          companyData.bonuses.monthlyBonus4,
          companyData.bonuses.monthlyBonus5,
          companyData.bonuses.monthlyBonus6,
        ],
        "lastSixMonthsSalary": [
          companyData.monthlySalaryAverage1,
          companyData.monthlySalaryAverage2,
          companyData.monthlySalaryAverage3,
          companyData.monthlySalaryAverage4,
          companyData.monthlySalaryAverage5,
          companyData.monthlySalaryAverage6,
        ],
        "lastSixMonthsSalaryCommissions": [
          companyData.commissions.monthlyCommissions1,
          companyData.commissions.monthlyCommissions2,
          companyData.commissions.monthlyCommissions3,
          companyData.commissions.monthlyCommissions4,
          companyData.commissions.monthlyCommissions5,
          companyData.commissions.monthlyCommissions6
        ],
        "lastSixMonthsSalaryOverTime": [
          companyData.extraHours.monthlyExtraHours1,
          companyData.extraHours.monthlyExtraHours2,
          companyData.extraHours.monthlyExtraHours3,
          companyData.extraHours.monthlyExtraHours4,
          companyData.extraHours.monthlyExtraHours5,
          companyData.extraHours.monthlyExtraHours6
        ],
        "owedBonusVacations": true,
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
        "requestId": this.REQUEST_ID,
        "salary": Number(companyData.salary),
        "salaryInKindOptionsType": speciesSalary.foodTime,
        "salaryInKindType": speciesSalary.optionSpeciesSalary,
        "startDate": companyData.startDate,
        "terminationContractType": this.toolbar.terminationContractType,
        "wasFiredWhilePregnant": false,
        "workerPersonId": this.WORKER_PERSON_ID,

        "lastYearsSalary":[
        companyData.historySalary.historysalary1,
        companyData.historySalary.historysalary2,
        companyData.historySalary.historysalary3,
        companyData.historySalary.historysalary4,
        companyData.historySalary.historysalary5,
        companyData.historySalary.historysalary6,
        companyData.historySalary.historysalary7,
        companyData.historySalary.historysalary8,

        ]
        
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

  }

function getTotalAverageField2(element: string, string: any) {
  throw new Error('Function not implemented.');
}

