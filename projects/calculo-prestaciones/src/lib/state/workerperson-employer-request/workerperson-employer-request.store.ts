import {state} from "@angular/animations";
import { Injectable } from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import { WorkerPersonEmployerRequestDto } from "projects/calculo-prestaciones/src/lib/models/worker-person-employer-request-dto.model";

export interface WorkerPersonState extends EntityState<WorkerPersonEmployerRequestDto, string> {
isLoaded:false;
}

export function createInitialState(): WorkerPersonState{
    return {
        isLoaded: false
    };
}

@Injectable({providedIn: "root"})
@StoreConfig({name: "workerpersons", cache: {ttl: 600000}})
export class WorkerPersonStore extends EntityStore<WorkerPersonState>{
    constructor(){
        super(createInitialState());
    }

    updateWorkerPerson(isLoaded:boolean){
        this.update((state: WorkerPersonState) => ({...state, isLoaded}));
    }

    destroy(): void{
        this.updateWorkerPerson(false);
    }
}
