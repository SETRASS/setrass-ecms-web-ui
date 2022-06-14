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
      companyName: ['',[Validators.required]],
      rtnNumber: [0, [Validators.required, Validators.maxLength(14)]],
      economicActivity: [['Industria','Ganaderia'], [Validators.required]],
      typeIdentity: [['DNI','CARNET RESIDENTE'], [Validators.required]],
      identityNumber: [0, [Validators.required]],
      employeeName: ['', [Validators.required]],
      employeeAge: [0, [Validators.required]],
      employeeSex: ['Masculino', [Validators.required]],
      department: ['', [Validators.required]],
      municipality: [0, [Validators.required]],
      startDate: [0, [Validators.required]],
      endDate: [0, [Validators.required]],
      haveFixedSalary: ['SI', [Validators.required]],
      salary: [0, [Validators.required]],
      monthlySalaryAverage1: [0, [Validators.required]],
      monthlySalaryAverage2: [0, [Validators.required]],
      monthlySalaryAverage3: [0, [Validators.required]],
      monthlySalaryAverage4: [0, [Validators.required]],
      monthlySalaryAverage5: [0, [Validators.required]],
      monthlySalaryAverage6: [0, [Validators.required]],
    });
  }

  get isCompanyNameValid(){
    return this.formEmployer.controls.companyName.touched && 
    this.formEmployer.controls.companyName.valid; 
  }

  get isCompanyNameInvalid(){
    return this.formEmployer.controls.companyName.touched && 
    this.formEmployer.controls.companyName.invalid;
  }

  get isRtnNumberValid(){
    return this.formEmployer.controls.rtnNumber.touched && 
    this.formEmployer.controls.rtnNumber.valid;
  }
  
  get isRtnNumberInvalid(){
    return this.formEmployer.controls.rtnNumber.touched && 
    this.formEmployer.controls.rtnNumber.invalid;
  }

}
