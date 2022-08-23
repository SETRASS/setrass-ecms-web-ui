import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { SalaryCalculationState, SalaryCalculationStore } from "./salary-calculation.store";

@Injectable({providedIn: "root"})
export class SalaryCalculationQuery extends QueryEntity<SalaryCalculationState> {
    constructor(protected salaryCalculationStore: SalaryCalculationStore) {
        super(salaryCalculationStore);
    }
    selectLoaded$ = this.select((state) => state.isLoaded);


    getData():Observable<any>{
        return this.select(state=> state.data);
    }

    getCache(): Observable<any>{
        return this.select(state => state.cache);
    }

    getLoaded():Observable<boolean>{
        
        return this.select(state => state.isLoaded);

    }

    getIsLoading(): Observable<boolean>{
        return this.selectLoading();
    }



    
}