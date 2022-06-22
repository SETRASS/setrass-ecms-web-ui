import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  locations: any[] = [];
  companySizeList: any[] = [];

  locationSelected: string;
  currentMunicipios: any[];

  constructor(private lookupsService: LookupsService,
              private salaryHistoryCatalogService: SalaryHistoryCatalogService,
              private formBuilder : FormBuilder) {
    this.formBuild();
  }


  ngAfterViewInit(): void{
    this.stepper = new StepperComponent(this.stepperSteps.nativeElement, this.stepperOptions);
    this.stepper.on("kt.stepper.previous", () => this.stepper.goPrev());
    this.stepper.on("kt.stepper.next", () => {
      this.formEmployer.get('companyData')?.valid ? this.stepper.goNext() : this.formEmployer.get('companyData')?.markAllAsTouched();
      this.formEmployer.get('employeeData')?.valid ? this.stepper.goNext() : this.formEmployer.get('employeeData')?.markAllAsTouched();
      this.formEmployer.get('salaryData')?.valid ? 'this.stepper.goNext()' : this.formEmployer.get('salaryData')?.markAllAsTouched();
      this.formEmployer.get('speciesSalary')?.valid ? 'this.stepper.goNext()' : this.formEmployer.get('speciesSalary')?.markAllAsTouched(); 
    });
  }


  ngOnInit(): void {
    this.lookupsService.getLocations().subscribe((data) => {
      this.locations = data[0].children;
      console.log(this.locations);
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
        rtnNumber: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        economicActivity: ['', [Validators.required,]],
        companySize:['', [Validators.required]]
      }),
      employeeData: this.formBuilder.group({
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ["", [Validators.required, Validators.minLength(14)]],
        employeeName: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastname: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeAge: [, [Validators.required, Validators.min(14), Validators.max(85), Validators.pattern(/^[0-9]+$/)]],
        employeeSex: ['Masculino', [Validators.required]],
        employeePhone: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
        employeeEmail: ['', [Validators.required, Validators.email]],
        department: ['Francisco Morazan', [Validators.required]],
        municipality: ['Tatumbla', [Validators.required]],
      }),
      salaryData: this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        fixedSalary: ['SI', [Validators.required]],
        salary: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        monthlySalaryAverage1: [0, []],
        monthlySalaryAverage2: [0, []],
        monthlySalaryAverage3: [0, []],
        monthlySalaryAverage4: [0, []],
        monthlySalaryAverage5: [0, []],
        monthlySalaryAverage6: [0, []],
      }),
      speciesSalary: this.formBuilder.group({

      })
    });

    this.formEmployer.get('salaryData.haveFixedSalary')?.valueChanges
    .subscribe(value => {
      console.log(value);
      if(value === 'NO'){
        this.formEmployer.get('salaryData.monthlySalaryAverage1')?.setValidators([Validators.required]);
        this.formEmployer.get('salaryData.monthlySalaryAverage2')?.setValidators([Validators.required]);
        this.formEmployer.get('salaryData.monthlySalaryAverage3')?.setValidators([Validators.required]);
        this.formEmployer.get('salaryData.monthlySalaryAverage4')?.setValidators([Validators.required]);
        this.formEmployer.get('salaryData.monthlySalaryAverage5')?.setValidators([Validators.required]);
        this.formEmployer.get('salaryData.monthlySalaryAverage6')?.setValidators([Validators.required]);
      }else{
        this.formEmployer.get('salaryData.monthlySalaryAverage1')?.setValidators(null);
        this.formEmployer.get('salaryData.monthlySalaryAverage2')?.setValidators(null);
        this.formEmployer.get('salaryData.monthlySalaryAverage3')?.setValidators(null);
        this.formEmployer.get('salaryData.monthlySalaryAverage4')?.setValidators(null);
        this.formEmployer.get('salaryData.monthlySalaryAverage5')?.setValidators(null);
        this.formEmployer.get('salaryData.monthlySalaryAverage6')?.setValidators(null);
      }
    });
  }

  get isFormGroupCompanyDataValid(){
    return this.formEmployer.get('companyData')?.invalid;
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

  getLocation(event: any){
    this.currentMunicipios = this.getMunicipios(event);
  }

  formDataSend(){
    this.formEmployer.valid ? console.log(this.formEmployer.value) : this.formEmployer.markAllAsTouched();
  }

}
