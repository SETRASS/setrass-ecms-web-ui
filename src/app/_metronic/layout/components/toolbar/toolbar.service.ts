import { Injectable } from '@angular/core';
import { TerminationContractType } from 'src/app/models/enums/termination-contract-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  userTypeOf: string = 'empleador';
  terminationContractType: TerminationContractType;

  constructor() {
    this.terminationContractType = TerminationContractType.DESPIDO;
   }
}
