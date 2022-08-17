import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule ,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ecms-otros-derechos',
  templateUrl: './otros-derechos.component.html',
  styleUrls: ['./otros-derechos.component.scss']
})
export class OtrosDerechosComponent implements OnInit {

  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('panelPregnancyStatus') $panelPregnancyStatus: ElementRef;
  @ViewChild('panelDaysOffPregnancy') $panelDaysOffPregnancy: ElementRef;
  otherRights: any[] = [
    {
      right: '¿La despidieron en estado de embarazo?',
      timeField: '',
      panel: ""
    }
  ];

  formOtherRights: FormGroup;
  isActivePregnancyStatus: boolean = false;
  isActiveDaysOffPregnancy: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private render2: Renderer2,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  buildForm(){
    this.formOtherRights = this.formBuilder.group({
      pregnancyStatus: ['',[]],
      daysOffPregnancy: ['',[]],
      breastfeedingHours: ['',[]],
      salaryReadjustment: {
        year1: ['2017',[]],
        amountYear1: ['',[]],
        year2: ['2016',[]],
        amountYear2: ['',[]]
      },
    })
  }

  isActiveControl(controlName: string){
    switch(controlName){
      case 'pregnancyStatus':
        this.isActivePregnancyStatus =! this.isActivePregnancyStatus;
        this.isActivePregnancyStatus?
        this.render2.addClass(this.$panelPregnancyStatus.nativeElement, 'active'):
        this.render2.removeClass(this.$panelPregnancyStatus.nativeElement, 'active');
        break;
      case 'daysOffPregnancy':
        this.isActiveDaysOffPregnancy =! this.isActiveDaysOffPregnancy;
        this.isActiveDaysOffPregnancy? 
        this.render2.addClass(this.$panelDaysOffPregnancy.nativeElement, 'active'):
        this.render2.removeClass(this.$panelDaysOffPregnancy.nativeElement, 'active');
        break;
    }
  }

  recalculo(){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    this.route.navigateByUrl('/dashboard#compensation-rights');
    
    /*this.calculoPrestacionesService
    .sendSalaryEmployeeCompute().subscribe();*/

    setTimeout(() => this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'), 4000);
  }

}
