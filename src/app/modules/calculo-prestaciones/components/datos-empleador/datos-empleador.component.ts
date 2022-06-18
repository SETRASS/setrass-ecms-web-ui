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
  @ViewChild('kt_stepper_vertical') stepper: ElementRef;
  formEmployer: FormGroup;
  public currentStep : Number = 1;
  private stepperOptions: IStepperOptions = {
    startIndex: 1,
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

  constructor(private lookupsService: LookupsService,
              private salaryHistoryCatalogService: SalaryHistoryCatalogService,
              private formBuilder : FormBuilder) {
    this.formBuild();
  }


  ngAfterViewInit(): void{
    const stepper = new StepperComponent(this.stepper.nativeElement, this.stepperOptions);
    stepper.on("kt.stepper.next", () => stepper.goNext());
    stepper.on("kt.stepper.previous", () => stepper.goPrev());
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
        companyName: ['',[Validators.required]],
        rtnNumber: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
        economicActivity: ['', [Validators.required,]],
        companySize:['', [Validators.required]]
      }),
      employeeData: this.formBuilder.group({
        typeIdentity: [['DNI','CARNET RESIDENTE'], [Validators.required]],
        identityNumber: ["", [
          Validators.required,
          Validators.minLength(14)
        ]],
        employeeName: ['', [Validators.required]],
        employeeLastName: ['', [Validators.required]],
        employeeAge: [0, [Validators.required]],
        employeeSex: ['Masculino', [Validators.required]],
        employeeTelephone: ['', [Validators.required, Validators.minLength(8)]],
        employeeEmail: ['', [Validators.required, Validators.email]],
      }),
      salaryData: this.formBuilder.group({
        department: ['', [Validators.required]],
        municipality: [0, [Validators.required]],
        startDate: [0, [Validators.required]],
        endDate: [0, [Validators.required]],
        haveFixedSalary: ['SI', [Validators.required]],
        salary: [0, [Validators.required]],
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

  get isCompanyNameValid(){
    return this.formEmployer.get('companyData.companyName')?.touched &&
    this.formEmployer.get('companyData.companyName')?.valid;
  }

  get isCompanyNameInvalid(){
    return this.formEmployer.get('companyData.companyName')?.touched &&
    this.formEmployer.get('companyData.companyName')?.invalid;
  }

  get companyName(){
    return this.formEmployer.get('companyData.companyName');
  }

  get isRtnNumberValid(){
    return this.formEmployer.get('companyData.rtnNumber')?.touched &&
    this.formEmployer.get('companyData.rtnNumber')?.valid;
  }

  get isRtnNumberInvalid(){
    return this.formEmployer.get('companyData.rtnNumber')?.touched &&
    this.formEmployer.get('companyData.rtnNumber')?.invalid;
  }

  get rtnNumber(){
    return this.formEmployer.get('companyData.rtnNumber');
  }

  get isEconomicActivityValid(){
    return this.formEmployer.get('companyData.economicActivity')?.touched &&
    this.formEmployer.get('companyData.economicActivity')?.valid;
  }

  get isEconomicActivityInvalid(){
    return this.formEmployer.get('companyData.economicActivity')?.touched &&
    this.formEmployer.get('companyData.economicActivity')?.invalid;
  }

  getLocation(){}

}
