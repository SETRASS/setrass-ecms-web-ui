import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { EmployersState, EmployerStore } from "./employers.store";

@Injectable({providedIn: "root"})
export class EmployersQuery extends QueryEntity<EmployersState> {
    constructor(protected employerStore: EmployerStore) {
        super(employerStore);
    }
    selectLoaded$ = this.select((state) => state.isLoaded);
}