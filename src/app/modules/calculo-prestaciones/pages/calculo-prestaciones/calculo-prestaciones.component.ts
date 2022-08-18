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
  showSalaryCalculation: boolean = true;
  showCompensationRights: boolean = true;
  showOtherRights: boolean = true;
  showExportPdf: boolean = true;

  constructor(public toolbarService: ToolbarService,
    public calculoPrestacionesService: CalculoPrestacionesService) { }
  
    ngAfterViewInit(): void {  
      
    }

  ngOnInit(): void {
    console.log(this.toolbarService.userTypeOf);
    
    this.calculoPrestacionesService.userTypeOf$.subscribe(value => {
      this.userType = value;
    });

    this.calculoPrestacionesService.isShowCalculoSalarial$.subscribe( val => {     
      this.showSalaryCalculation = true;
    });

    this.calculoPrestacionesService.isShowCompensationRights$.subscribe(val => {
      this.showCompensationRights = true;
    });
    
    this.calculoPrestacionesService.isShowOtherRights$.subscribe(val => {
      this.showOtherRights = true;
    });
    
    this.calculoPrestacionesService.isShowExportPdf$.subscribe(val => {
      this.showExportPdf = true;
    });

    
    
    
    

    console.log(this.showSalaryCalculation, this.showCompensationRights, this.showOtherRights, this.showExportPdf );
  }


}
