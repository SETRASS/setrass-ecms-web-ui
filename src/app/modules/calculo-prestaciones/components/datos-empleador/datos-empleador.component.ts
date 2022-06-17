import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { IStepperOptions, StepperComponent, ToggleComponent } from 'src/app/_metronic/kt/components';

@Component({
  selector: 'app-datos-empleador',
  templateUrl: './datos-empleador.component.html',
  styleUrls: ['./datos-empleador.component.scss']
})
export class DatosEmpleadorComponent implements OnInit {

  @ViewChild('kt_stepper_vertical') stepper: ElementRef;

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
  formEmployer: FormGroup;
  
  constructor(private formBuilder : FormBuilder) {
    this.formBuild();
  }


  ngAfterViewInit(): void{
    const stepper = new StepperComponent(this.stepper.nativeElement, this.stepperOptions);
    stepper.on("kt.stepper.next", () => stepper.goNext());
    stepper.on("kt.stepper.previous", () => stepper.goPrev());
  }
  

  ngOnInit(): void { 

  }

  private formBuild () {
    this.formEmployer = this.formBuilder.group({
      companyData: this.formBuilder.group({
        companyName: ['',[Validators.required]],
        rtnNumber: ['', [
          Validators.required, 
          Validators.minLength(14), 
          Validators.maxLength(14)
        ]],
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
        employeeAge: [0, [Validators.required]],
        employeeSex: ['Masculino', [Validators.required]]
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

  get isRtnNumberValid(){
    return this.formEmployer.get('companyData.rtnNumber')?.touched && 
    this.formEmployer.get('companyData.rtnNumber')?.valid;
  }
  
  get isRtnNumberInvalid(){
    return this.formEmployer.get('companyData.rtnNumber')?.touched && 
    this.formEmployer.get('companyData.rtnNumber')?.invalid;
  }
  
  get isEconomicActivityValid(){
    return this.formEmployer.get('companyData.economicActivity')?.touched && 
    this.formEmployer.get('companyData.economicActivity')?.valid;
  }
  
  get isEconomicActivityInvalid(){
    return this.formEmployer.get('companyData.economicActivity')?.touched && 
    this.formEmployer.get('companyData.economicActivity')?.invalid;
  }

}
