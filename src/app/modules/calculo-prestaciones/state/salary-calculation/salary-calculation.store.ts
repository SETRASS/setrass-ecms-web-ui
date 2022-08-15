import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig} from "@datorama/akita";


export interface SalaryCalculationState extends EntityState<any, string> {
    isLoaded: boolean;
    data: object;
}

export function createInitialState(): SalaryCalculationState {
    
    
    
    return {
        isLoaded: false,
        data: {
            
        },

        cache:{
        
        }
    };
}

@Injectable({providedIn: "root"})
@StoreConfig({name: "salaryCalculation", cache: {ttl: 600000}})
export class SalaryCalculationStore extends EntityStore<SalaryCalculationState> {
    constructor() {
        super(createInitialState());
    }

    updateSalaryCalculation(isLoaded: boolean) {
        this.update((state: SalaryCalculationState) => ({...state, isLoaded}));
    }

    destroy(): void {
        this.updateSalaryCalculation(false);
    }
}