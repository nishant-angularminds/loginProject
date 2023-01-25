import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppinglocalstorageService {
  constructor() {}

  setTokenInLocalStorage(tokenInfo: any) {
    localStorage.setItem('customerToken', tokenInfo);
  }

  getTokenInLocalStorage() {
    var tempToken = localStorage.getItem('customerToken');
    return tempToken;
  }

  removeToken() {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('currentUser');
  }

  setUser(userInfo: any) {
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
  }
}
