import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { IStepperOptions, StepperComponent, ToggleComponent } from 'src/app/_metronic/kt/components';

@Component({
  selector: 'app-datos-trabajador',
  templateUrl: './datos-trabajador.component.html',
  styleUrls: ['./datos-trabajador.component.scss'],
})

export class DatosTrabajadorComponent implements OnInit {

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

  constructor() {}

  ngAfterViewInit(): void{

    const stepper = new StepperComponent(this.stepper.nativeElement, this.stepperOptions);

    stepper.on("kt.stepper.next", () => stepper.goNext());
    stepper.on("kt.stepper.previous", () => stepper.goPrev());
  }

  ngOnInit(): void {
  }
}




