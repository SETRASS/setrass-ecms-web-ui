import { Injectable } from '@angular/core';
import { CalculoPrestacionesRequestType } from 'src/app/models/enums/calculo-prestaciones-request-type.enum';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  userTypeOf: CalculoPrestacionesRequestType = CalculoPrestacionesRequestType.WORKER_PERSON;
  terminationContractType: string;

  constructor() {
    this.terminationContractType = 'DESPIDO';
   }
}
