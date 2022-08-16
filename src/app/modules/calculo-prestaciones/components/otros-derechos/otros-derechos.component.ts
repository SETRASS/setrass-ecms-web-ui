import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule ,FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

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

  
  
  
  otherRightsRequest: any = {
    haveSchoolAgeChildren: true,
    historySalaries: [
      {
        salary: 0,
        year: 0
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
    breastFeedingHours: new FormControl('',[]),  
    salaryReadjustment: new FormArray([]),
    owedHolyDays: new FormControl ('',[])
  });
  isActivePregnancyStatus: boolean = false;
  isActiveDaysOffPregnancy: boolean = false;
  isActiveBreastFeedingHours: boolean = false;
  isActiveSalaryReadjustment: boolean = false;
  isActiveOwedHolyDays: boolean = false;
  isActiveOwedSeventhDay: boolean = false;

  

  constructor(private formBuilder: FormBuilder, private render2: Renderer2) { }

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

      
      

    }
  }

  recalculo(){
    this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
    
    /*this.calculoPrestacionesService
    .sendSalaryEmployeeCompute().subscribe();*/

    setTimeout(() => this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay'), 4000);
  }

}
