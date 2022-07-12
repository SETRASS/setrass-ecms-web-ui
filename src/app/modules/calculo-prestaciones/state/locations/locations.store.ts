import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Locations } from "src/app/models/locations.model";

export interface LocationState extends EntityState<Locations, string> {
    isLoaded: false;
}

export function createInitialState(): LocationState {
    return {
        isLoaded: false
    };
}

@Injectable({providedIn: "root"})
@StoreConfig({name: "locations", cache: {ttl: 600000}})
export class LocationStore extends EntityStore<LocationState> {
    constructor() {
        super(createInitialState());
    }

    updateLocations(isLoaded: boolean) {
        this.update((state: LocationState) => ({...state, isLoaded}));
    }

    // 

    destroy(): void {
        this.updateLocations(false);
    }
}