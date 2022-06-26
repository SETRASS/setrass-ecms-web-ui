import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { IStepperOptions, StepperComponent, ToggleComponent } from 'src/app/_metronic/kt/components';
import {LookupsService} from "../../../services/lookups/lookups.service";
import {SalaryHistoryCatalogService} from "../../../services/salary-history-catalog/salary-history-catalog.service";


@Component({
  selector: 'app-datos-empleador',
  templateUrl: './datos-empleador.component.html',
  styleUrls: ['./datos-empleador.component.scss']
})
export class DatosEmpleadorComponent implements OnInit {

  // Variables
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef;
  @ViewChild('salary') salaryField: ElementRef;
  stepper: any;
  formEmployer: FormGroup;
  public currentStep : Number = 1;
  private stepperOptions: IStepperOptions = {
    startIndex: 3,
    animation: false,
    animationSpeed: '',
    animationNextClass: '',
    animationPreviousClass: ''
  };
  salaryOptions:String[] = ['SI', 'NO'];
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

  constructor(private lookupsService: LookupsService,
              private salaryHistoryCatalogService: SalaryHistoryCatalogService,
              private formBuilder : FormBuilder,
              private render2: Renderer2) {
    this.formBuild();
  }


  ngAfterViewInit(): void{
    this.stepper = new StepperComponent(this.stepperSteps.nativeElement, this.stepperOptions);
    this.stepper.on("kt.stepper.previous", () => this.stepper.goPrev());
    this.stepper.on("kt.stepper.next", () => {
      this.formEmployer.get('companyData')?.valid ? this.stepper.goNext() : this.formEmployer.get('companyData')?.markAllAsTouched();
      this.formEmployer.get('employeeData')?.valid ? this.stepper.goNext() : this.formEmployer.get('employeeData')?.markAllAsTouched();
      this.formEmployer.get('salaryData')?.valid ? this.stepper.goNext() : this.formEmployer.get('salaryData')?.markAllAsTouched();
      this.formEmployer.get('speciesSalary')?.valid ? 'this.stepper.goNext()' : this.formEmployer.get('speciesSalary')?.markAllAsTouched(); 
    });
  }


  ngOnInit(): void {
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
      this.companySizeList = data;
    }, (error) => {
      const err = error.message | error;
      console.warn(err);
    });
  }

  private formBuild () {
    this.formEmployer = this.formBuilder.group({
      companyData: this.formBuilder.group({
        companyName: ['',[Validators.required, Validators.minLength(5)]],
        rtnNumber: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(/^[0-9]+$/)]],
        economicActivity: ['', [Validators.required,]],
        companySize:['', [Validators.required]]
      }),
      employeeData: this.formBuilder.group({
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
        employeeName: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastname: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeAge: [, [Validators.required, Validators.min(14), Validators.max(85), Validators.pattern(/^[0-9]+$/)]],
        employeeSex: ['Masculino', [Validators.required]],
        employeePhone: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
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
          monthlyCommissions1: [0, []],
          monthlyCommissions2: [0, []],
          monthlyCommissions3: [0, []],
          monthlyCommissions4: [0, []],
          monthlyCommissions5: [0, []],
          monthlyCommissions6: [0, []]
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

      })
    });

    this.formEmployer.get('salaryData.fixedSalary')?.valueChanges
    .subscribe(value => {
      console.log(value);
      if(value === 'NO'){
        for(let item = 1; item <= 6; item++){
          this.formEmployer.get(`salaryData.monthlySalaryAverage${item}`)?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
        }
        this.formEmployer.get('salaryData.salary')?.setValue(this.totalSalaryAverage);
        this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'true');
        this.isSalaryFieldDisabled = true;
      }else{
        for(let item = 1; item <= 6; item++){
          this.formEmployer.get(`salaryData.monthlySalaryAverage${item}`)?.setValidators(null);
        }
        this.formEmployer.get('salaryData.salary')?.setValue(0);  
        this.render2.setAttribute(this.salaryField.nativeElement, 'disabled', 'false');
        this.isSalaryFieldDisabled = false;
      }
      this.haveSalary = value;
    });
  }

  getErrorField(element: string, errorName: string){
    return this.formEmployer.get(element)?.hasError(errorName);
  }

  isValidField(formControlName: string){
    return this.formEmployer.get(formControlName)?.touched &&
    this.formEmployer.get(formControlName)?.valid
  }

  isInvalidField(formControlName: string){
    return this.formEmployer.get(formControlName)?.touched &&
    this.formEmployer.get(formControlName)?.invalid
  }

  getMunicipios(id:string){
    return this.locations.find(val => val.location.id === id).children;
  }

  getCompanyEmployeeWeight(economicActivity: string){
    return this.economicActivityList.filter(val => val.economicActivity === economicActivity);
  }

  getLocation(event: any){
    this.currentMunicipios = this.getMunicipios(event);
  }

  getEconomicActivity(event: string){
    console.log(event);
    console.log(this.getCompanyEmployeeWeight(event));
    this.currentEconomicActivity = this.getCompanyEmployeeWeight(event);
  }

  getTotalAverageField(element: string){
    let month1 = Number(this.formEmployer.get(`${element}1`)?.value);
    let month2 = Number(this.formEmployer.get(`${element}2`)?.value);
    let month3 = Number(this.formEmployer.get(`${element}3`)?.value);
    let month4 = Number(this.formEmployer.get(`${element}4`)?.value);
    let month5 = Number(this.formEmployer.get(`${element}5`)?.value);
    let month6 = Number(this.formEmployer.get(`${element}6`)?.value);
    switch(element){
      case 'salaryData.monthlySalaryAverage':
        this.totalSalaryAverage += (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        this.formEmployer.get('salaryData.salary')?.setValue(this.totalSalaryAverage.toFixed(2));
        break;
      case 'salaryData.commissions.monthlyCommissions':
        this.totalCommissionsAverage = (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        this.totalCommissionsAverage.toFixed(2);
        break;
      case 'salaryData.extraHours.monthlyExtraHours':
        this.totalExtraHoursAverage = (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        this.totalExtraHoursAverage.toFixed(2);
        break;
      case 'salaryData.bonuses.monthlyBonus':
        this.totalBonusesAverage = (month1 + month2 + month3 + month4 + month5 + month6) / 6;
        this.totalBonusesAverage.toFixed(2);
        break;
    }
  }

  formDataSend(){
    this.formEmployer.valid ? console.log(this.formEmployer.value) : this.formEmployer.markAllAsTouched();
  }

}
