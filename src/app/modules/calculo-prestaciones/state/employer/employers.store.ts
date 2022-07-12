import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { EmployerDto } from "src/app/models/employer-dto.model";

export interface EmployersState extends EntityState<EmployerDto, string> {
    isLoaded: false;    
}

export function createInitialState(): EmployersState {
    return {
        isLoaded: false
    };
}

@Injectable({providedIn: "root"})
@StoreConfig({name: "employers", cache: {ttl: 600000}})
export class EmployerStore extends EntityStore<EmployersState> {
    constructor() {
        super(createInitialState());
    }
    
    updateEmployer(isLoaded: boolean) {
        this.update((state: EmployersState) => ({...state, isLoaded}));
    }

    destroy(): void {
        this.updateEmployer(false);
    }
}