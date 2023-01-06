import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css'],
})
export class CustomerprofileComponent {
  userData: any;

  constructor(
    private apiobject: ApiInfoService,
    private localObject: LocalstorageDataService
  ) {

    this.apiobject.dem = 'profile';
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userData = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.userData);
  }

  deleteUser() {
    this.localObject.removeCustToken();
  }
}
