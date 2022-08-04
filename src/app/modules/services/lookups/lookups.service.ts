import { Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import { LocationStore } from '../../calculo-prestaciones/state/locations/locations.store';
import { Locations } from 'src/app/models/locations.model';

@Injectable()
export class LookupsService extends BaseHttpService {

  readonly baseUrl = environment.API.LOOKUPS;

  constructor(http: HttpClient,
    private locationStore: LocationStore) {
    super(http);
  }

  getLocations():Observable<Locations[]> {
    return this.getRequest<Locations[]>(`${this.baseUrl}/v1/all`).pipe(
      map((locations) => {
        let hnLocations = locations.filter((l) => l.location.isoName === "HN");
        let data = hnLocations[0].children.map(location => location);
        console.log(data);
        this.locationStore.set(data);
        return data;
      }), tap(() => console.log(''))
    );
  }
}
