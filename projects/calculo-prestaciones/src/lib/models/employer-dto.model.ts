import {PersonType} from "./enums/person-type.enum";
import {IdentificationType} from "./enums/identification-type.enum";

export interface EmployerDto {
  employerId: string;
  employerName: string;
  personType: PersonType;
  identificationType: IdentificationType;
  identificationNumber: string;
  economicActivity: string;
  companySize: number;
}
