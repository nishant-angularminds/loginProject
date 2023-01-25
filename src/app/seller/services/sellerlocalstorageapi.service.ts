import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerlocalstorageapiService {

  constructor() { }

  setTokenInLocalStorage(tokenInfo: any) {
    localStorage.setItem('tokenList', tokenInfo['token']);
  }

  getTokenInLocalStorage() {
    var tempToken = localStorage.getItem('tokenList');
    return tempToken;
  }

  removeToken() {
    localStorage.removeItem('tokenList');
    localStorage.removeItem('currentProduct');

  }
}
