import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import { WorkerPersonEmployerRequestDto } from "src/app/models/worker-person-employer-request-dto.model";

export interface WorkerPersonState extends EntityState<WorkerPersonEmployerRequestDto, string> {
    isLoaded: boolean;
}

export function createInitialState(): WorkerPersonState {
    return {
        isLoaded: false,
    };
}

@Injectable({providedIn: "root"})
@StoreConfig({name: "workerperson", cache: {ttl: 600000}})
export class WorkerPersonStore extends EntityStore<WorkerPersonState> {
    constructor() {
        super(createInitialState());
    }

    updateWorkerPerson(isLoaded: boolean) {
        this.update((state: WorkerPersonState) => ({...state, isLoaded}));
    }

    destroy(): void {
        this.updateWorkerPerson(false);
    }
}