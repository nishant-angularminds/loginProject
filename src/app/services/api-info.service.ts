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
  baseUrl = 'https://shop-api.ngminds.com'
  limit:any=3;
  page:any=1;

  profileAvailable: any = false;

  constructor(
    private httpObject: HttpClient,
    private serviceRouter: Router,
    private localObject: LocalstorageDataService
  ) {}

  get(normalUrl:any) {
    var tokenInfo = localStorage.getItem('tokenList');

    return this.httpObject.get(`${this.baseUrl}${normalUrl}`, {
      headers: { Authorization: `Bearer ${tokenInfo}` },
    });
  }

  patch(normalUrl:any,payload:object) {

    var tokenInfo1 = this.localObject.getTokenInLocalStorage();

    return this.httpObject.patch(
      `${this.baseUrl}${normalUrl}`,
      payload,
      { headers: { Authorization: `Bearer ${tokenInfo1}` } }
    );
  }

  post(normalUrl:string,payload:object) {

    var tokenInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.post(
      `${this.baseUrl}${normalUrl}` ,
      payload,
      { headers: { Authorization: `Bearer ${tokenInfoUser}` } }
    );
  }

  delete(normalUrl:any) {

    var getTokenInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.delete(`${this.baseUrl}${normalUrl}`, {
      headers: { Authorization: `Bearer ${getTokenInfoUser}` },
    })

  }

    
  }

