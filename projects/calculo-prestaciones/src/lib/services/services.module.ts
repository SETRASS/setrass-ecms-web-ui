import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsService } from './lookups/lookups.service';
import {SalaryHistoryCatalogService} from "./salary-history-catalog/salary-history-catalog.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    LookupsService,
    SalaryHistoryCatalogService
  ]
})
export class ServicesModule { }
