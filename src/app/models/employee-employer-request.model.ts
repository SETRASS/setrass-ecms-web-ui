import {IdentificationType} from "./enums/identification-type.enum";
import { PersonType } from "./enums/person-type.enum";
import { TerminationContractType } from "./enums/termination-contract-type.enum";

export interface EmployeeAndEmployerRequest{
    "age": 0,
    "email": "string",
    "employer": {
      "companySize": 0,
      "economicActivity": "string",
      "employerId": "string",
      "employerName": "string",
      "identificationNumber": "string",
      "identificationType": IdentificationType,
      "personType": PersonType
    },
    "firstName": "string",
    "gender": "F",
    "identificationNumber": "string",
    "identificationType": IdentificationType,
    "lastName": "string",
    "localizationId": "string",
    "phoneNumber": "string",
    "requestId": 0,
    "requestType": "COMPANY",
    "terminationContractType": TerminationContractType
}