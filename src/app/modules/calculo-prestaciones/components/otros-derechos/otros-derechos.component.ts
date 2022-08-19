import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CalculoPrestacionesService } from 'src/app/modules/services/calculo-prestaciones/calculo-prestaciones.service';
import { getDataGender, getDataStore, setDataCacheStore } from 'src/app/utils/utils';
import { OtherRights } from 'src/app/models/other-rights.model';


@Component({
  selector: 'ecms-otros-derechos',
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
  
  @Input() otherRights: OtherRights = {
    daysOffPreAndPostNatal: {
      amount: 0,
      currency: "string",
      factorAmount: 0,
      formula: "string",
      itemName: "string",
      objectKeyName: "string",
      time: "string"
    },
    educationalBonusResponse: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    firedForWhilePregnant: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedBonusVacations: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedBreastfeedingHours: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedFourteenthMonth: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedHolyDays: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedOtherPayments: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedOvertime: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedPaidPendingVacations: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedPendingFourteenthMonth: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedPendingThirteenthMonth: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedSalary: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedSeventhDay: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    owedThirteenthMonth: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    salaryReadjustment: {
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    },
    severanceSavings:{
      "amount": 0,
      "currency": "string",
      "factorAmount": 0,
      "formula": "string",
      "itemName": "string",
      "objectKeyName": "string",
      "time": "string"
    }
  }

  formOtherRights= new FormGroup({
    pregnancyStatus: new FormControl(0,[]),
    daysOffPregnancy: new FormControl (0,[]),
    breastFeedingHours: new FormControl(0, []),  
    owedHolyDays: new FormControl (0),
    owedSeventhDay: new FormControl (0),
    owedPaidPendingVacations: new FormControl (0,[]),
    owedBonusVacations: new FormControl(0,[]),
    owedPendingThirteenthMonth: new FormControl(0,[]),
    owedThirteenthMonth: new FormControl(0, []),
    owedThirteenthMonth2: new FormControl(0, []),
    owedPendingFourteenthMonth: new FormControl(0,[]),
    owedFourteenthMonth: new FormControl(0,[]),
    owedFourteenthMonth2: new FormControl(0,[]),
    owedSalary: new FormControl(0, []),
    owedOverTime: new FormControl(0, []),
    owedOverTimeType: new FormControl('DIURNA'),
    haveSchoolAgeChildren: new FormControl(0,[]),
    owedOtherPayments: new FormControl(0,[])
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
  isActiveOwedOverTime: boolean = false;
  isActiveOwedSalary: boolean = false;
  isActiveHaveSchoolAgeChildren: boolean = false;
  isActiveOwedHistorySalaries: boolean = false;
  isActiveOwedOtherPayments: boolean = false;


  constructor( 
    private render2: Renderer2,
    private route: Router,
    private calculoPrestacionesService: CalculoPrestacionesService
  ) { }

  ngOnInit(): void {
    console.log(getDataGender());
  }

  hiddenPanel(className: string){
    document.querySelector(`.${className}`)?.classList.remove('active');
  }

  editPanel(className: string){
    let isCheckElememt= document.getElementById(className);
    console.log(isCheckElememt);
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

  get getLastTwoYearsSalaryReadjustment(){
    let historySalaryArray = getDataStore('cache').historySalaries;
    return historySalaryArray.length > 2?
    historySalaryArray.splice(historySalaryArray.length-2, 2):
    historySalaryArray;
  }
  
  get currentSex(){
    return localStorage.gender;
  }  

  getValueFormField(fieldName: string){
    return this.formOtherRights.get(fieldName)?.value; 
  } 

  validFieldButton(fieldArray: string[], classPanel: string) {
    let validateArray = fieldArray.map(field => this.formOtherRights.get(field)?.valid );
    let isFieldAllTrue = (arr: any) => arr.every( (v: any) => v === true );
    if(isFieldAllTrue(validateArray)){
      this.hiddenPanel(classPanel);
    }
  }

  
  getYearsHistoryArray(){
    return getDataStore('cache').historySalaries;
    }

  isActiveControl(controlName: string){
    switch(controlName){
      case 'pregnancyStatus':
        this.isActivePregnancyStatus =! this.isActivePregnancyStatus;
        this.isActivePregnancyStatus?
        this.render2.addClass(this.$panelPregnancyStatus.nativeElement, 'active'):
        this.render2.removeClass(this.$panelPregnancyStatus.nativeElement, 'active');
        this.isActivePregnancyStatus?
        this.formOtherRights.get(controlName)?.addValidators([Validators.min(1),]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'daysOffPregnancy':
        this.isActiveDaysOffPregnancy =! this.isActiveDaysOffPregnancy;
        this.isActiveDaysOffPregnancy? 
        this.render2.addClass(this.$panelDaysOffPregnancy.nativeElement, 'active'):
        this.render2.removeClass(this.$panelDaysOffPregnancy.nativeElement, 'active');
        this.isActiveDaysOffPregnancy?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'breastFeedingHours':
        this.isActiveBreastFeedingHours =! this.isActiveBreastFeedingHours;
        this.isActiveBreastFeedingHours? 
        this.render2.addClass(this.$panelBreastFeedingHours.nativeElement, 'active'):
        this.render2.removeClass(this.$panelBreastFeedingHours.nativeElement, 'active');
        this.isActiveBreastFeedingHours?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'salaryReadjustment':
        this.isActiveSalaryReadjustment =! this.isActiveSalaryReadjustment;
        break;
      case 'owedHolyDays':
        this.isActiveOwedHolyDays =! this.isActiveOwedHolyDays;
        this.isActiveOwedHolyDays?
        this.render2.addClass(this.$panelOwedHolyDays.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedHolyDays.nativeElement, 'active');
        this.isActiveOwedHolyDays?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedSeventhDay':
        this.isActiveOwedSeventhDay =! this.isActiveOwedSeventhDay;
        this.isActiveOwedSeventhDay?
        this.render2.addClass(this.$panelOwedSeventhDay.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedSeventhDay.nativeElement, 'active');
        this.isActiveOwedSeventhDay?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedPaidPendingVacations':
        this.isActiveOwedPaidPendingVacations =! this.isActiveOwedPaidPendingVacations;
        this.isActiveOwedPaidPendingVacations?
        this.render2.addClass(this.$panelOwedPaidPendingVacations.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedPaidPendingVacations.nativeElement, 'active');
        this.isActiveOwedPaidPendingVacations?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedBonusVacations':
        this.isActiveOwedBonusVacations =! this.isActiveOwedBonusVacations;
        this.isActiveOwedBonusVacations?
        this.render2.addClass(this.$panelOwedBonusVacations.nativeElement,'active'):
        this.render2.removeClass(this.$panelOwedBonusVacations.nativeElement, 'active');
        this.isActiveOwedBonusVacations?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedPendingThirteenthMonth':
        this.isActiveOwedPendingThirteenthMonth =! this.isActiveOwedPendingThirteenthMonth;
        this.isActiveOwedPendingThirteenthMonth?
        this.render2.addClass(this.$panelOwedPendingThirteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedPendingThirteenthMonth.nativeElement, 'active');
        this.isActiveOwedPendingThirteenthMonth?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedThirteenthMonth':
        this.isActiveOwedThirteenthMonth =! this.isActiveOwedThirteenthMonth;
        this.isActiveOwedThirteenthMonth?
        this.render2.addClass(this.$panelOwedThirteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedThirteenthMonth.nativeElement, 'active');
        this.isActiveOwedThirteenthMonth?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedPendingFourteenthMonth':
        this.isActiveOwedPendingFourteenthMonth =! this.isActiveOwedPendingFourteenthMonth;
        this.isActiveOwedPendingFourteenthMonth?
        this.render2.addClass(this.$panelOwedPendingFourteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedPendingFourteenthMonth.nativeElement, 'active');
        this.isActiveOwedPendingFourteenthMonth?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedFourteenthMonth':
        this.isActiveOwedFourteenthMonth =! this.isActiveOwedFourteenthMonth;
        this.isActiveOwedFourteenthMonth?
        this.render2.addClass(this.$panelOwedFourteenthMonth.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedFourteenthMonth.nativeElement, 'active');
        this.isActiveOwedFourteenthMonth?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedSalary':
        this.isActiveOwedSalary =! this.isActiveOwedSalary;
        this.isActiveOwedSalary?
        this.render2.addClass(this.$panelOwedSalary.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedSalary.nativeElement, 'active');
        this.isActiveOwedSalary?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedOverTime':
        this.isActiveOwedOverTime =! this.isActiveOwedOverTime;
        this.isActiveOwedOverTime?
        this.render2.addClass(this.$panelOwedOverTime.nativeElement, 'active'):
        this.render2.removeClass(this.$panelOwedOverTime.nativeElement, 'active');
        this.isActiveOwedOverTime?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'haveSchoolAgeChildren':
        this.isActiveHaveSchoolAgeChildren =! this.isActiveHaveSchoolAgeChildren;
        this.isActiveHaveSchoolAgeChildren?
        this.render2.addClass(this.$panelHaveSchoolAgeChildren.nativeElement, 'active'):
        this.render2.removeClass(this.$panelHaveSchoolAgeChildren.nativeElement, 'active');
        this.isActiveHaveSchoolAgeChildren?
        this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]):
        this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        break;
      case 'owedHistorySalaries':
        this.isActiveOwedHistorySalaries =! this.isActiveOwedHistorySalaries;
        break; 
      case 'owedOtherPayments' :
        this.isActiveOwedOtherPayments =! this.isActiveOwedOtherPayments;
        if(this.isActiveOwedOtherPayments){
          this.render2.addClass(this.$panelOwedOtherPayments.nativeElement, 'active');
          this.formOtherRights.get(controlName)?.addValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
        }else{
          this.render2.removeClass(this.$panelOwedOtherPayments.nativeElement, 'active');
          this.formOtherRights.get(controlName)?.removeValidators([Validators.required,Validators.pattern(/^[0-9]+$/)]);
          this.formOtherRights.get(controlName)?.setValue(0);
        }
        break;
    }
  }

  recalculo(){
    if(getDataStore('cache').requestId){
      this.render2.addClass(this.$overlay.nativeElement, 'active-overlay');
      let requestOld = getDataStore('cache');
      let keyToDelete = 'compensationRightsRequest';      
      const newRequest = Object.keys(requestOld)
        .reduce((prev, next) => { 
          return next === keyToDelete ? prev : {...prev, [next]: requestOld[next]}
        },{otherRightsRequest:{}});
      
        newRequest.otherRightsRequest = {
        haveSchoolAgeChildren: this.isActiveHaveSchoolAgeChildren ,
        historySalaries: requestOld.historySalaries,
        owedBonusVacationsRequest: {
          owedBonusVacations: this.isActiveOwedBonusVacations,
          owedBonusVacationsAmount: this.formOtherRights.get('owedBonusVacations')?.value
        },
        owedFourteenthMonthRequest: [
          {
            "salary": 0,
            "year": 0
          }
        ],
        owedHolyRequest: {
          howMuchOwedHolyDays: this.formOtherRights.get('owedHolyDays'),
          owedHolyDays: this.isActiveOwedHolyDays
        },
        owedOtherPaymentsRequest: {
          owedOtherPayments: this.isActiveOwedOtherPayments,
          owedOtherPaymentsAmount: this.formOtherRights.get('owedOtherPayments')?.value
        },
        owedOvertimeRequest: {
          owedOvertime: this.isActiveOwedOverTime,
          owedOvertimeType: this.formOtherRights.get('owedOverTimeType')?.value,
          owedOvertimeWork: this.formOtherRights.get('owedOverTime')?.value
        },
        owedPaidPendingVacationsRequest: {
          owedPaidPendingVacations: this.isActiveOwedPaidPendingVacations,
          owedPendingVacationsYears: this.formOtherRights.get('owedPaidPendingVacations')?.value
        },
        owedPendingFourteenthMonthRequest: {
          fourteenthMonthPaid: this.formOtherRights.get('owedPendingFourteenthMonth')?.value,
          owedPendingFourteenthMonth: this.isActiveOwedPendingFourteenthMonth,
        },
        owedPendingThirteenthMonthRequest: {
          owedPendingThirteenthMonth: this.isActiveOwedPendingThirteenthMonth,
          thirteenthMonthPaid: this.formOtherRights.get('owedPendingThirteenthMonth')?.value
        },
        owedSalaryRequest: {
          owedSalary: this.isActiveOwedSalary,
          owedSalaryAmount: this.formOtherRights.get('owedSalary')?.value
        },
        owedSeventhDayRequest: {
          howMuchOwedSeventhDay: this.formOtherRights.get('owedSeventhDay')?.value,
          owedSeventhDay: this.isActiveOwedSeventhDay
        },
        owedThirteenthMonthRequest: [
          {
            "salary": 0,
            "year": 0
          }
        ],
        pregnantRequest: {
          breastfeedingPaidHours: this.formOtherRights.get('breastFeedingHours')?.value,
          daysOffPreAndPostNatalWasPaid: this.formOtherRights.get('daysOffPregnancy')?.value,
          daysPaidWasFiredWhilePregnant: this.formOtherRights.get('pregnancyStatus')?.value,
          owedBreastfeedingHours: this.isActiveBreastFeedingHours,
          owedDaysOffPreAndPostNatal: this.isActiveDaysOffPregnancy,
          wasFiredWhilePregnant: this.isActivePregnancyStatus
        }
      }
      console.log(newRequest);
      setDataCacheStore(newRequest);
      this.calculoPrestacionesService
      .sendOtherRightsCompute(newRequest).subscribe((response: any) => {
        this.render2.removeClass(this.$overlay.nativeElement, 'active-overlay');
        this.otherRights = response.otherRights;
      });
    }
  }

  nextStep(){
    this.route.navigateByUrl('/dashboard#export-pdf');
  }

}
