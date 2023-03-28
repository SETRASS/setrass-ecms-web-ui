import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';

import { StaffModule as StaffLibModule } from '@setrass-hn/staff';


@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    StaffLibModule
  ]
})
export class StaffModule { }
