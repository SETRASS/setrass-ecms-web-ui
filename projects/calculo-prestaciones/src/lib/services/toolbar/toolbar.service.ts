import { EventEmitter, Injectable } from '@angular/core';
import { CalculoPrestacionesRequestType } from '../../models/enums/calculo-prestaciones-request-type.enum';
import { TerminationContractType } from '../../models/enums/termination-contract-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  userTypeOf: CalculoPrestacionesRequestType = CalculoPrestacionesRequestType.WORKER_PERSON;
  terminationContractType: TerminationContractType = TerminationContractType.DESPIDO;

  constructor() {}
}
