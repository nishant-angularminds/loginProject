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

  profileAvailable: any = false;

  constructor(
    private httpObject: HttpClient,
    private serviceRouter: Router,
    private localObject: LocalstorageDataService
  ) {}

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

  getLoginData() {
    var tokenInfo = localStorage.getItem('tokenList');

    return this.httpObject.get('https://shop-api.ngminds.com/auth/self', {
      headers: { Authorization: `Bearer ${tokenInfo}` },
    });
  }

  patchCompanyName(formInfo: any, editInfo: any) {
    var editObject = {
      email: formInfo['email'],
      name: editInfo,
    };

    var tokenInfo1 = this.localObject.getTokenInLocalStorage();

    return this.httpObject.patch(
      'https://shop-api.ngminds.com/users/org',
      editObject,
      { headers: { Authorization: `Bearer ${tokenInfo1}` } }
    );
  }

  sendUserData(userData: any) {
    var tokenInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.post(
      'https://shop-api.ngminds.com/users',
      userData,
      { headers: { Authorization: `Bearer ${tokenInfoUser}` } }
    );
  }

  getUserData() {
    var getTokenInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.get('https://shop-api.ngminds.com/users/?limit=30', {
      headers: { Authorization: `Bearer ${getTokenInfoUser}` },
    });
  }

  editUserName(editFormInfo: any) {
    var getTokeneditInfoUser = localStorage.getItem('tokenList');
    console.log(editFormInfo);

    return this.httpObject.patch(
      `https://shop-api.ngminds.com/users/${this.userIdInformation}`,
      editFormInfo,
      {
        headers: { Authorization: `Bearer ${getTokeneditInfoUser}` },
      }
    );
  }
}
