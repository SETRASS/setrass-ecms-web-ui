import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { SalaryCalculationState, SalaryCalculationStore } from "./salary-calculation.store";

@Injectable({providedIn: "root"})
export class SalaryCalculationQuery extends QueryEntity<SalaryCalculationState> {
    constructor(protected salaryCalculationStore: SalaryCalculationStore) {
        super(salaryCalculationStore);
    }
    selectLoaded$ = this.select((state) => state.isLoaded);
}