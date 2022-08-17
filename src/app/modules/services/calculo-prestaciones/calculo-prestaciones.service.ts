import { EventEmitter, Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, map, tap} from "rxjs";
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { Gender } from 'src/app/models/enums/gender.enum';
import { WorkerPersonEmployerRequestDto } from 'src/app/models/worker-person-employer-request-dto.model';
import { WorkerPersonStore } from '../../calculo-prestaciones/state/workerperson/workerperson.store';
import { SalaryCalculationQuery } from '../../calculo-prestaciones/state/salary-calculation/salary-calculation.query';
import { SalaryCalculationStore } from '../../calculo-prestaciones/state/salary-calculation/salary-calculation.store';


@Injectable({
  providedIn: 'root'
})
export class CalculoPrestacionesService extends BaseHttpService {

  readonly baseUrl = environment.API.SALARY_INFO_REQ;
  isShowEmployerData = true;
  isShowCalculoSalarial = true;
  isShowIndemnizaciones = true;
  isShowOtrosDerechos = true;
  isShowExportPdf = true;
  objectGlobal = {
    userTypeOf: 'empleador',
    terminationContractType: TerminationContractType.DESPIDO,
    gender: Gender.Masculino ? 'M' : 'F',
    requestId: '',
    employerId: '',
    workerPersonId: '',
    fixedSalary: true,
    startDate: '',
    dismissalDate: '',
    employer: {}
  }

  terminationContractType$ = new EventEmitter<TerminationContractType>();

  constructor(http: HttpClient,
    private workerPersonStore: WorkerPersonStore,
    ) {
    super(http);
  }

  sendEmployeeEmployerReq(data: WorkerPersonEmployerRequestDto): Observable<WorkerPersonEmployerRequestDto> {
    return this.postRequest<WorkerPersonEmployerRequestDto>(`${this.baseUrl}/calculo-prestaciones/employee-and-employer-data/v1/add-new`, data)
    .pipe(
      map( (workerPerson: WorkerPersonEmployerRequestDto) => { 
        this.workerPersonStore.add(workerPerson);
        return workerPerson;
      }), tap(() => this.workerPersonStore.updateWorkerPerson(true))
    )
  }
  
  // Salary Info Request
  sendCompensationsRightsInfo(data: any): Observable<any[]> {
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/salary-info-req/v1/compensations-rights/compute`, data);
  }

  /* Sending a request to the backend to compute the salary. */
  sendOtherRightsCompute(data: any): Observable<any[]> {
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/salary-info-req/v1/other-rights/compute`, data);
  }
}
