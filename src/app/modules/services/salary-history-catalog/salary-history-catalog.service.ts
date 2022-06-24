import { Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class SalaryHistoryCatalogService extends BaseHttpService {
  readonly baseUrl = environment.API.SALARY_HISTORY_CATALOG;

  constructor(http: HttpClient) {
    super(http);
  }

  getEconomicActivities(): Observable<any[]> {
    return this.getRequest<any[]>(`${this.baseUrl}/salary-rate-per-year/v1/getTable`);
  }

  getCompanySizes(): Observable<any[]> {
    return this.getRequest<any[]>(`${this.baseUrl}/employee-qty-waves/v1/all`);
    
  }

}
