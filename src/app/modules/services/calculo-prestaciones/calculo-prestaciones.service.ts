import { EventEmitter, Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, map, tap, Subject} from "rxjs";
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';
import { Gender } from 'src/app/models/enums/gender.enum';
import { WorkerPersonEmployerRequestDto } from 'src/app/models/worker-person-employer-request-dto.model';
import { WorkerPersonStore } from '../../../../../projects/calculo-prestaciones/src/lib/state/workerperson/workerperson.store';
import { SalaryCalculationQuery } from '../../../../../projects/calculo-prestaciones/src/lib/state/salary-calculation/salary-calculation.query';
import { SalaryCalculationStore } from '../../../../../projects/calculo-prestaciones/src/lib/state/salary-calculation/salary-calculation.store';
import { CalculoPrestacionesRequestType } from 'src/app/models/enums/calculo-prestaciones-request-type.enum';


@Injectable({
  providedIn: 'root'
})
export class CalculoPrestacionesService extends BaseHttpService {

  readonly baseUrl = environment.API.SALARY_INFO_REQ;
  isShowCalculoSalarial = false;
  isShowIndemnizaciones = false;
  isShowOtrosDerechos = false;
  isShowExportPdf = false;
  userTypeOf$ = new EventEmitter<CalculoPrestacionesRequestType>();

  terminationContractType$ = new EventEmitter<TerminationContractType>();
  isShowCalculoSalarial$ = new EventEmitter<boolean>(true);
  isShowCompensationRights$ = new EventEmitter<boolean>(true);
  isShowOtherRights$ = new EventEmitter<boolean>(true);
  isShowExportPdf$ = new EventEmitter<boolean>();

  private _refresh$ = new Subject<void>();

  constructor(http: HttpClient,
    private workerPersonStore: WorkerPersonStore,
    ) {
    super(http);

  }

  get refresh$(){
    return this._refresh$;
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
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/salary-info-req/v1/compensations-rights/compute`, data)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  /* Sending a request to the backend to compute the salary. */
  sendOtherRightsCompute(data: any): Observable<any[]> {
    return this.postRequest<any[]>(`${this.baseUrl}/calculo-prestaciones/salary-info-req/v1/other-rights/compute`, data);
  }
}
