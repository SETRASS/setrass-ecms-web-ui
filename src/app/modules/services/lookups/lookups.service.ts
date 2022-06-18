import { Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class LookupsService extends BaseHttpService {

  readonly baseUrl = environment.API.LOOKUPS;

  constructor(http: HttpClient) {
    super(http);
  }

  getLocations():Observable<any> {
    return this.getRequest<any>(`${this.baseUrl}/v1/all`);
  }
}
