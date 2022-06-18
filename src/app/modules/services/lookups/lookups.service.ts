import { Injectable } from '@angular/core';
import {BaseHttpService} from "../base-http.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class LookupsService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getLocations():Observable<any> {
    return this.getRequest<any>(`/v1/all`);
  }
}
