import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { FormBuilder, FormsModule ,FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-otros-derechos',
  templateUrl: './otros-derechos.component.html',
  styleUrls: ['./otros-derechos.component.scss']
})
export class OtrosDerechosComponent implements OnInit {

  @ViewChild('overlay') $overlay: ElementRef;
  @ViewChild('panelPregnancyStatus') $panelPregnancyStatus: ElementRef;
  @ViewChild('panelDaysOffPregnancy') $panelDaysOffPregnancy: ElementRef;
  @ViewChild('panelBreastFeedingHours') $panelBreastFeedingHours: ElementRef;
  @ViewChild('panelSalaryReadjustment') $panelSalaryReadjustment: ElementRef;
  @ViewChild('panelOwedHolyDays') $panelOwedHolyDays: ElementRef;
  @ViewChild('panelOwedSeventhDay') $panelOwedSeventhDay: ElementRef;
  @ViewChild('panelOwedPaidPendingVacations') $panelOwedPaidPendingVacations: ElementRef;
  @ViewChild('panelOwedBonusVacations') $panelOwedBonusVacations: ElementRef;
  @ViewChild('panelOwedPendingThirteenthMonth') $panelOwedPendingThirteenthMonth: ElementRef;
  @ViewChild('panelOwedThirteenthMonth') $panelOwedThirteenthMonth: ElementRef;
  @ViewChild('panelOwedPendingFourteenthMonth') $panelOwedPendingFourteenthMonth: ElementRef;
  @ViewChild('panelOwedFourteenthMonth') $panelOwedFourteenthMonth: ElementRef;
  @ViewChild('panelOwedSalary') $panelOwedSalary: ElementRef;
  @ViewChild('panelOwedOverTime') $panelOwedOverTime: ElementRef;
  @ViewChild('panelHaveSchoolAgeChildren') $panelHaveSchoolAgeChildren: ElementRef;
  @ViewChild('panelOwedHistorySalaries') $panelOwedHistorySalaries: ElementRef;
  @ViewChild('panelOwedOtherPayments') $panelOwedOtherPayments: ElementRef;
  
  otherRightsRequest: any = {
    haveSchoolAgeChildren: true,
    historySalaries: [
      {
        "salary": 0,
        "year": 0
      }
    ],
    owedBonusVacationsRequest: {
      owedBonusVacations: true,
      owedBonusVacationsAmount: 0
    },
    owedFourteenthMonthRequest: [
      {
        salary: 0,
        year: 0
      }
    ],
    owedHolyRequest: {
      howMuchOwedHolyDays: 0,
      owedHolyDays: true
    },
    owedOtherPaymentsRequest: {
      owedOtherPayments: true,
      owedOtherPaymentsAmount: 0
    },
    owedOvertimeRequest: {
      owedOvertime: true,
      owedOvertimeType: "DIURNA",
      owedOvertimeWork: 0
    },
    owedPaidPendingVacationsRequest: {
      owedPaidPendingVacations: true,
      owedPendingVacationsYears: 0
    },
    owedPendingFourteenthMonthRequest: {
      fourteenthMonthPaid: 0,
      owedPendingFourteenthMonth: true
    },
    owedPendingThirteenthMonthRequest: {
      owedPendingThirteenthMonth: true,
      thirteenthMonthPaid: 0
    },
    owedSalaryRequest: {
      owedSalary: true,
      owedSalaryAmount: 0
    },
    owedSeventhDayRequest: {
      howMuchOwedSeventhDay: 0,
      owedSeventhDay: true
    },
    owedThirteenthMonthRequest: [
      {
        salary: 0,
        year: 0
      }
    ],
    pregnantRequest: {
      breastfeedingPaidHours: 0,
      daysOffPreAndPostNatalWasPaid: 0,
      daysPaidWasFiredWhilePregnant: 0,
      owedBreastfeedingHours: true,
      owedDaysOffPreAndPostNatal: true,
      wasFiredWhilePregnant: true
    }
  };
    
  

  formOtherRights= new FormGroup({
   
    pregnancyStatus: new FormControl('',[Validators.pattern(/^[0-9]+$/)]),
    daysOffPregnancy: new FormControl ('',[Validators.pattern(/^[0-9]+$/)]),
    breastFeedingHours: new FormControl('',[Validators.pattern(/^[0-9]+$/)]),  
    salaryReadjustment: new FormArray([]),
    owedHolyDays: new FormControl ('',[Validators.pattern(/^[0-9]+$/)]),
    owedSeventhDay: new FormControl ('',[Validators.pattern(/^[0-9]+$/)]),
    owedPaidPendingVacations: new FormControl ('',[Validators.pattern(/^[0-9]+$/)]),
    owedBonusVacations: new FormControl('',Validators.required),
    owedPendingThirteenthMonth: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/)]),
    owedThirteenthMonth: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    owedPendingFourteenthMonth: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
    owedFourteenthMonth: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)]),
    owedSalary: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    owedOverTime: new FormControl('HORA DIURNA', [Validators.required]),
    haveSchoolAgeChildren: new FormControl('',[]),
    owedhistorySalaries: new FormArray([]),
    owedOtherPayments: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/)])
  
  });


  isActivePregnancyStatus: boolean = false;
  isActiveDaysOffPregnancy: boolean = false;
  isActiveBreastFeedingHours: boolean = false;
  isActiveSalaryReadjustment: boolean = false;
  isActiveOwedHolyDays: boolean = false;
  isActiveOwedSeventhDay: boolean = false;
  isActiveOwedPaidPendingVacations: boolean = false;
  isActiveOwedBonusVacations: boolean = false;
  isActiveOwedPendingThirteenthMonth: boolean =false;
  isActiveOwedThirteenthMonth: boolean=false;
  isActiveOwedPendingFourteenthMonth: boolean=false;
  isActiveOwedFourteenthMonth: boolean=false;
  isActiveOwedSalary: boolean = false;
  isActiveHaveSchoolAgeChildren: boolean = false;
  isActiveOwedHistorySalaries: boolean = false;
  isActiveOwedOtherPayments: boolean = false;
  
  

  constructor(
    private formBuilder: FormBuilder, 
    private render2: Renderer2,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  

  buildForm(){
    
  }

  hiddenPanel(className: string){
    document.querySelector(`.${className}`)?.classList.remove('active');
    
  }

  editPanel(className: string){
    document.querySelector(`.${className}`)?.classList.add('active');
  }

  isValidField(formControlName: string) {
    return this.formOtherRights
    .get(formControlName)?.touched &&
      this.formOtherRights
      .get(formControlName)?.valid
  }

  isInvalidField(formControlName: string) {
    return this.formOtherRights
    .get(formControlName)?.touched &&
      this.formOtherRights
      .get(formControlName)?.invalid
  }

  getErrorField(element: string, errorName: string) {
    return this.formOtherRights.get(element)?.hasError(errorName);
  }

  /*totalOverTime(percentage: string) {
    if (percentage === '25%') return (Number(this.salaryValue) * 0.25).toFixed(2);
    if (percentage === '50%') return (Number(this.salaryValue) * 0.50).toFixed(2);
    if (percentage === '75%') return (Number(this.salaryValue) * 0.75).toFixed(2);
  }
  }*/


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
      case 'breastFeedingHours':
        this.isActiveBreastFeedingHours =! this.isActiveBreastFeedingHours;
        this.isActiveBreastFeedingHours? 
        this.render2.addClass(this.$panelBreastFeedingHours.nativeElement, 'active'):
        this.render2.removeClass(this.$panelBreastFeedingHours.nativeElement, 'active');
        break;
      case 'salaryReadjustment':
        this.isActiveSalaryReadjustment =! this.isActiveSalaryReadjustment;
        this.isActiveSalaryReadjustment?
        this.render2.addClass(this.$panelSalaryReadjustment.nativeElement, 'active'):
        this.render2.removeClass(this.$panelSalaryReadjustment.nativeElement, 'active');
        break;
      case 'owedHolyDays':
        this.isActiveOwedHolyDays =! this.isActiveOwedHolyDays;
        this.isActiveOwedHolyDays?
        this.render2.addClass(this.$panelOwedHolyDays.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedHolyDays.nativeElement, 'active');
        break;
      case 'owedSeventhDay':
        this.isActiveOwedSeventhDay =! this.isActiveOwedSeventhDay;
        this.isActiveOwedSeventhDay?
        this.render2.addClass(this.$panelOwedSeventhDay.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedSeventhDay.nativeElement, 'active');
        break;
      case 'owedPaidPendingVacations':
        this.isActiveOwedPaidPendingVacations =! this.isActiveOwedPaidPendingVacations;
        this.isActiveOwedPaidPendingVacations?
        this.render2.addClass(this.$panelOwedPaidPendingVacations.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedPaidPendingVacations.nativeElement, 'active');
        break;
      case 'owedBonusVacations':
        this.isActiveOwedBonusVacations =! this.isActiveOwedBonusVacations;
        this.isActiveOwedBonusVacations?
        this.render2.addClass(this.$panelOwedBonusVacations.nativeElement,'active'):
        this.render2.removeClass(this.$panelOwedBonusVacations.nativeElement, 'active');
        break;
      case 'owedPendingThirteenthMonth':
        this.isActiveOwedPendingThirteenthMonth =! this.isActiveOwedPendingThirteenthMonth;
        this.isActiveOwedPendingThirteenthMonth?
        this.render2.addClass(this.$panelOwedPendingThirteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedPendingThirteenthMonth.nativeElement, 'active');
        break;
      case 'owedThirteenthMonth':
        this.isActiveOwedThirteenthMonth =! this.isActiveOwedThirteenthMonth;
        this.isActiveOwedThirteenthMonth?
        this.render2.addClass(this.$panelOwedThirteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedThirteenthMonth.nativeElement, 'active');
        break;
      case 'owedPendingFourteenthMonth':
        this.isActiveOwedPendingFourteenthMonth =! this.isActiveOwedPendingFourteenthMonth;
        this.isActiveOwedPendingFourteenthMonth?
        this.render2.addClass(this.$panelOwedPendingFourteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedPendingFourteenthMonth.nativeElement, 'active');
        break;
      case 'owedFourteenthMonth':
        this.isActiveOwedFourteenthMonth =! this.isActiveOwedFourteenthMonth;
        this.isActiveOwedFourteenthMonth?
        this.render2.addClass(this.$panelOwedFourteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedFourteenthMonth.nativeElement, 'active');
        break;
      case 'owedSalary':
        this.isActiveOwedSalary =! this.isActiveOwedSalary;
        this.isActiveOwedSalary?
        this.render2.addClass(this.$panelOwedSalary.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedSalary.nativeElement, 'active');
        break;
      case 'owedHaveSchoolAgeChildren':
        this.isActiveHaveSchoolAgeChildren =! this.isActiveHaveSchoolAgeChildren;
        this.isActiveHaveSchoolAgeChildren?
        this.render2.addClass(this.$panelHaveSchoolAgeChildren.nativeElement, 'active'):
        this.render2.removeClass(this.$panelHaveSchoolAgeChildren.nativeElement, 'active');
        break;
      case 'owedHistorySalaries':
        this.isActiveOwedHistorySalaries =! this.isActiveOwedHistorySalaries;
        this.isActiveOwedHistorySalaries?
        this.render2.addClass(this.$panelOwedHistorySalaries.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedHistorySalaries.nativeElement, 'active');
        break; 
      case 'owedOtherPayments' :
        this.isActiveOwedOtherPayments =! this.isActiveOwedOtherPayments;
        this.isActiveOwedOtherPayments?
        this.render2.addClass(this.$panelOwedOtherPayments.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedOtherPayments.nativeElement, 'active');
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
