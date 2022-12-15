import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataInfoService {
  statusSer: any = false;
  registerData: any;
  registerSave: any = false;

  profileAvailable: any = false;

  constructor(private httpObject: HttpClient, private serviceRouter: Router) {}

  setData(ss: any) {
    this.statusSer = ss;
  }

  getData() {
    return this.statusSer;
  }

  registerpostData(registerObject: any) {
    return this.httpObject.post(
      'https://shop-api.ngminds.com/auth/register?captcha=false',
      registerObject
    );
  }

  loginpostData(loginObject: any) {
    return this.httpObject.post(
      'https://shop-api.ngminds.com/auth/login?captcha=false',
      loginObject
    );
  }

  setTokenInLocalStorage(tokenInfo: any) {
    localStorage.setItem('tokenList', tokenInfo['token']);
  }

  getTokenInLocalStorage() {
    var tempToken = localStorage.getItem('tokenList');
    return tempToken;
  }

  removeToken() {
    localStorage.removeItem('tokenList');
  }

  getLoginData() {
    var tokenInfo = localStorage.getItem('tokenList');

    return this.httpObject.get('https://shop-api.ngminds.com/auth/self', {
      headers: { Authorization: `Bearer ${tokenInfo}` },
    });
  }
}
