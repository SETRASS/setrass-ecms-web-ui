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
import { CalculoPrestacionesRequestType } from 'src/app/models/enums/calculo-prestaciones-request-type.enum';


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
  contractType: any;
  calculoPrestacionesRequestTypeArray: any[] = [];

  constructor(private layout: LayoutService, private toolbarService: ToolbarService) {}

  ngOnInit(): void {
    
    for(let item in CalculoPrestacionesRequestType){
      if(isNaN(Number(item))){
        this.calculoPrestacionesRequestTypeArray.push({
          value: CalculoPrestacionesRequestType[item], 
          label: item
        });
      }
    }

    console.log(this.calculoPrestacionesRequestTypeArray);

    this.toolbarContainerCssClasses = this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
    this.userType = this.toolbarService.userTypeOf;
    console.log(this.userType);
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
    this.toolbarService.terminationContractType = event.target.value;
  }
}
