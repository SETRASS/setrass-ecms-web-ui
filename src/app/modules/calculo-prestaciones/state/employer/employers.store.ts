import { EntityState, EntityStore } from "@datorama/akita";
import { EmployerDto } from "src/app/models/employer-dto.model";

export interface EmployersState extends EntityState<EmployerDto, string>{
    
}

export class EmployerStore extends EntityStore<EmployersState> {
    update(){
        this.update((state) => ({...state, }));
    }
}