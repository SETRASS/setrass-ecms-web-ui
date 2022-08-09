import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule ,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otros-derechos',
  templateUrl: './otros-derechos.component.html',
  styleUrls: ['./otros-derechos.component.scss']
})
export class OtrosDerechosComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder) { }

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
        break;
    }
  }

}
