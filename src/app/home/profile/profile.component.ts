import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUserEmail: any;
  data1: any;
  editName:any = '';

  constructor(
    private routerforlogin: Router,
    private apiObject: ApiInfoService,
    private localstorageObject:LocalstorageDataService
  ) {

    this.getLoginInfo();

  }

  ngOnInit(): void {}

  deleteLocal() {
    this.localstorageObject.removeToken();
  }

  getLoginInfo() {

    this.apiObject.getLoginData().subscribe(
      (data) => {
        this.data1 = data;
        console.log(this.data1);
      },
      (error) => {
        console.log(error['message']);
      });
  }

  go(formData:any) {
    
    this.apiObject.patchCompanyName(this.data1,formData['editName']).subscribe((data)=>{

      this.getLoginInfo();

    },(err)=> {

      console.log(err);
      
    });

  }
}
