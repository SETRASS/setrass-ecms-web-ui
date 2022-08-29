import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { WorkerPersonState, WorkerPersonStore } from "./workerperson.store";

@Injectable({providedIn: "root"})
export class WorkerPersonQuery extends QueryEntity<WorkerPersonState> {
    constructor(protected workerPersonStore: WorkerPersonStore) {
        super(workerPersonStore);
    }
    selectLoaded$ = this.select((state) => state.isLoaded);
}