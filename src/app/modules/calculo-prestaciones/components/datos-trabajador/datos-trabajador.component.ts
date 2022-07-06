import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { LookupsService } from 'src/app/modules/services/lookups/lookups.service';
import { SalaryHistoryCatalogService } from 'src/app/modules/services/salary-history-catalog/salary-history-catalog.service';
import { IStepperOptions, StepperComponent, ToggleComponent } from 'src/app/_metronic/kt/components';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';

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
  formEmployee: any;

  constructor(
    private lookupsService: LookupsService,
    private salaryHistoryCatalogService: SalaryHistoryCatalogService,
    private calculoPrestacionesService: CalculoPrestacionesService,
    private toolbar: ToolbarService,
    private formBuilder: FormBuilder,
    private render2: Renderer2
  ) {
    this.formBuild();
  }

  ngAfterViewInit(): void{
    this.stepperConfig();
  }
  ngOnInit(): void {
  
  }

  private stepperConfig(){
    const stepper = new StepperComponent(this.stepper.nativeElement, this.stepperOptions);
    stepper.on("kt.stepper.next", () => {
      stepper.goNext();
    });
    stepper.on("kt.stepper.previous", () => stepper.goPrev());
  }

  private formBuild() {
    this.formEmployee = this.formBuilder.group({
      employeeData: this.formBuilder.group({
        typeIdentity: ['DNI', [Validators.required]],
        identityNumber: ["0801199405879", [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(/^[0-9]+$/)]],
        employeeName: ['Andrea Nicolle', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeLastname: ['Salazar', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
        employeeAge: [21, [Validators.required, Validators.min(14), Validators.max(85), Validators.pattern(/^[0-9]+$/)]],
        employeeSex: ['F', [Validators.required]],
        employeePhone: ['32876905', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        employeeEmail: ['andrea.nicolle@mail.com', [Validators.required, Validators.email]],
        department: ['', [Validators.required]],
        municipality: ['', [Validators.required]]
      }),
    });

  }
}




