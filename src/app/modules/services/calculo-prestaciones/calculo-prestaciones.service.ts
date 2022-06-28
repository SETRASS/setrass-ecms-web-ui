import { Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CalculoPrestacionesService extends BaseHttpService {
  readonly baseUrl = environment.API.SALARY_INFO_REQ;

  constructor(http: HttpClient) {
    super(http);
  }

  sendEmployeeEmployerReq(data: any): Observable<any[]> {
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/employee-and-employer-data/v1/add-new`, data);
  }
  
  // Salary Info Request
  sendSalaryEmployeeInfo(data: any): Observable<any[]> {
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/salary-info-req/v1/add-new`, data);
  }

  sendSalaryEmployeeCompute(data: any): Observable<any[]> {
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/salary-info-req/v1/compute`, data);
  }
}
