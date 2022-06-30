import {Gender} from "./enums/gender.enum";
import {IdentificationType} from "./enums/identification-type.enum";
import {CalculoPrestacionesRequestType} from "./enums/calculo-prestaciones-request-type.enum";
import {EmployerDto} from "./employer-dto.model";

export interface WorkerPersonEmployerRequestDto {
  requestId: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  identificationType: IdentificationType;
  identificationNumber: string;
  phoneNumber: string;
  email: string;
  requestType: CalculoPrestacionesRequestType;
  employer: EmployerDto;
  localizationId: string;
  
}
