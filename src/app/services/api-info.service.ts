import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalstorageDataService } from './localstorage-data.service';

@Injectable({
  providedIn: 'root',
})
export class ApiInfoService {
  registerData: any;
  registerSave: any = false;
  userIdInformation: any;
  baseUrl = 'https://shop-api.ngminds.com';
  limit: any = 8;
  page: any = 1;
  name: any = '';
  status:any = false;
  dem:any;

  profileAvailable: any = false;

  constructor(
    private httpObject: HttpClient,
    private serviceRouter: Router,
    private localObject: LocalstorageDataService
  ) {}

  get(normalUrl: any) {
    return this.httpObject.get(`${this.baseUrl}${normalUrl}`);
  }

  patch(normalUrl: any, payload: object) {
    return this.httpObject.patch(`${this.baseUrl}${normalUrl}`, payload);
  }

  post(normalUrl: string, payload: object) {
    return this.httpObject.post(`${this.baseUrl}${normalUrl}`, payload);
  }

  delete(normalUrl: any) {
    return this.httpObject.delete(`${this.baseUrl}${normalUrl}`);
  }

  put(normalUrl: any, payload: object) {

    return this.httpObject.put(`${this.baseUrl}${normalUrl}`, payload);

  }
}
