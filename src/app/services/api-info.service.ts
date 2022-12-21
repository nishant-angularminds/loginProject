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
  limit:any=3;
  page:any=1;

  profileAvailable: any = false;

  constructor(
    private httpObject: HttpClient,
    private serviceRouter: Router,
    private localObject: LocalstorageDataService
  ) {}

  registerpostData(registerObject: any) {
    return this.httpObject.post(
      'https://shop-api.ngminds.com/auth/register',
      registerObject
    );
  }

  loginpostData(loginObject: any) {
    return this.httpObject.post(
      'https://shop-api.ngminds.com/auth/login',
      loginObject
    );
  }

  getLoginData() {
    var tokenInfo = localStorage.getItem('tokenList');

    return this.httpObject.get('https://shop-api.ngminds.com/auth/self', {
      headers: { Authorization: `Bearer ${tokenInfo}` },
    });
  }

  getPage() {

    return this.page;
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

    var query = `?limit=${this.limit}&page=${this.page}`;

    return this.httpObject.get(`https://shop-api.ngminds.com/users${query}`, {
      headers: { Authorization: `Bearer ${getTokenInfoUser}` },
    });
  }

  editUserName(editFormInfo: any) {
    var getTokeneditInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.patch(
      `https://shop-api.ngminds.com/users/${this.userIdInformation}`,
      editFormInfo,
      {
        headers: { Authorization: `Bearer ${getTokeneditInfoUser}` },
      }
    );
  }

  editRole(roleInfo:any,userId:any) {

    var getTokeneditRoleInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.patch(`https://shop-api.ngminds.com/users/role/${userId}`,{'role' : roleInfo}, {
      headers: { Authorization: `Bearer ${getTokeneditRoleInfoUser}` },
    })

  }

  deleteUserApi(userDeleteToken:any) {

    var getTokenInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.delete(`https://shop-api.ngminds.com/users/${userDeleteToken}`, {
      headers: { Authorization: `Bearer ${getTokenInfoUser}` },
    })

  }

  changePassword(passwordDataInfo:any) {

    var getPasswordInfoUser = localStorage.getItem('tokenList');

    return this.httpObject.post('https://shop-api.ngminds.com/auth/change-password',passwordDataInfo,{
      headers: { Authorization: `Bearer ${getPasswordInfoUser}` },
    })

  }
    
  }

