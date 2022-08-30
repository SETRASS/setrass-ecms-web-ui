import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { format } from 'date-fns';

import { LayoutService } from '../../core/layout.service';
import { ToolbarService } from './toolbar.service';
import { CalculoPrestacionesRequestType } from 'projects/calculo-prestaciones/src/lib/models/enums/calculo-prestaciones-request-type.enum';
import { TerminationContractType } from 'projects/calculo-prestaciones/src/lib/models/enums/termination-contract-type.enum';
import { CalculoPrestacionesService } from 'projects/calculo-prestaciones/src/lib/services/calculo-prestaciones/calculo-prestaciones.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';
  userType: CalculoPrestacionesRequestType;
  contractType: TerminationContractType;
  calculoPrestacionesRequestTypeArray: any[] = [];
  terminationContractualArray: any[] = [];

  constructor(
    private layout: LayoutService,
    private toolbarService: ToolbarService,
    private calculoPrestacionesService: CalculoPrestacionesService
  ) {}

  ngOnInit(): void {
    this.calculoPrestacionesService.userTypeOf$.emit(CalculoPrestacionesRequestType.WORKER_PERSON);
    this.calculoPrestacionesService.terminationContractType$.emit(TerminationContractType.DESPIDO);

    for(let item in CalculoPrestacionesRequestType){
      if(isNaN(Number(item))){
        this.calculoPrestacionesRequestTypeArray.push({
          value: CalculoPrestacionesRequestType[item],
          label: item
        });
      }
    }

    for(let item in TerminationContractType){
      if(isNaN(Number(item))){
        this.terminationContractualArray.push({
          value: TerminationContractType[item],
          label: item
        })
      }
    }

    this.toolbarContainerCssClasses = this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
    this.userType = this.toolbarService.userTypeOf;
    this.contractType = this.toolbarService.terminationContractType;
    console.log(this.contractType);
  }

  ngAfterViewInit() {

    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  get getCurrentDateTime(){
    return format(new Date(), "dd/MM/yyyy - hh:mm aaaaa'm'");
  }

  getUserType(event: any){
    let textSelected = event.target[event.target.selectedIndex].innerText;
    this.toolbarService.userTypeOf = textSelected == 'Trabajador' ? CalculoPrestacionesRequestType.WORKER_PERSON : CalculoPrestacionesRequestType.COMPANY;
  }

  getContractType(event: any){
    //this.toolbarService.terminationContractType = event.target.value === '1' ? : TerminationContractType.RENUNCIA;
    if(event.target.value === '1'){
      return this.calculoPrestacionesService.terminationContractType$.emit(TerminationContractType.DESPIDO);
    }
    return this.calculoPrestacionesService.terminationContractType$.emit(TerminationContractType.RENUNCIA);
  }
}
