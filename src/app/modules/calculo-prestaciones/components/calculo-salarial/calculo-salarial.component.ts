import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
// { StepperComponent } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';

import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';


@Component({
  selector: 'app-calculo-salarial',
  templateUrl: './calculo-salarial.component.html',
  styleUrls: ['./calculo-salarial.component.scss']
})

export class CalculoSalarialComponent implements OnInit {
  @ViewChild('kt_stepper_vertical') stepperSteps: ElementRef
  @ViewChild ('salaryData') salaryField: ElementRef;

              
ngAfterViewInit(): void {

              }

  ngOnInit(): void {

}


}





