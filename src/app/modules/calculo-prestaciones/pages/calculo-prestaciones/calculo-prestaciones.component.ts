import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalculoPrestacionesRequestType } from 'src/app/models/enums/calculo-prestaciones-request-type.enum';
import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { ToolbarService } from 'src/app/_metronic/layout/components/toolbar/toolbar.service';

@Component({
  selector: 'app-calculo-prestaciones',
  templateUrl: './calculo-prestaciones.component.html',
  styleUrls: ['./calculo-prestaciones.component.scss']
})
export class CalculoPrestacionesComponent implements OnInit, AfterViewInit {

  userType: CalculoPrestacionesRequestType;
  showSalaryCalculation: boolean = false;
  showCompensationRights: boolean = false;
  showOtherRights: boolean = false;
  showExportPdf: boolean = false;

  constructor(public toolbarService: ToolbarService,
    public calculoPrestacionesService: CalculoPrestacionesService) { }
  
    ngAfterViewInit(): void {  
      this.calculoPrestacionesService.isShowCalculoSalarial$.subscribe( val => {  
        setTimeout(() => {
          console.log('Pasados 3 segundos', val);
          this.showSalaryCalculation = true;
          console.log('var showSalaryCalculation: ', this.showSalaryCalculation);
        }, 3000);
      });
    }

  ngOnInit(): void {
    console.log(this.toolbarService.userTypeOf);

    this.calculoPrestacionesService.userTypeOf$.subscribe(value => {
      this.userType = value;
    });

    this.calculoPrestacionesService.isShowCompensationRights$.subscribe(val => {
      console.log('Compensation Rights: ', val);
      this.showCompensationRights = val;
    });
    
    this.calculoPrestacionesService.isShowOtherRights$.subscribe(val => {
      this.showOtherRights = val;
    });
    
    this.calculoPrestacionesService.isShowExportPdf$.subscribe(val => {
      this.showExportPdf = val;
    });

    
    
    
    

    console.log(this.showSalaryCalculation, this.showCompensationRights, this.showOtherRights, this.showExportPdf );
  }


}
