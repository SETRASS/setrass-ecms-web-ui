import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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


  constructor() { }


  ngAfterViewInit(): void{
    
    const stepper = new StepperComponent(this.stepper.nativeElement, this.stepperOptions);

    stepper.on("kt.stepper.next", () => stepper.goNext());
    stepper.on("kt.stepper.previous", () => stepper.goPrev());
  }
  
  ngOnInit(): void {

  }

}
