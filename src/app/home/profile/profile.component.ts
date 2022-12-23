import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  companyForm: FormGroup;

  constructor(
    private routerforlogin: Router,
    private apiObject: ApiInfoService,
    private localstorageObject: LocalstorageDataService
  ) {
    this.getLoginInfo();
  }

  ngOnInit(): void {
    this.companyForm = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      old_password: new FormControl(),
      new_password: new FormControl(),
    });
  }

  deleteLocal() {
    this.localstorageObject.removeToken();
  }

  getLoginInfo() {
    this.apiObject.get(`/auth/self`).subscribe(
      (data) => {
        this.data1 = data;
        console.log(this.data1);
      },
      (error) => {
        console.log(error['message']);
      }
    );
  }

  editCompany(formData: any) {
    delete this.companyForm.value.old_password;
    delete this.companyForm.value.new_password;
    console.log(formData);

    this.apiObject.patch('/users/org', formData).subscribe(
      (data) => {
        this.getLoginInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendPasswordData(passwordData: any) {
    delete this.companyForm.value.email;
    delete this.companyForm.value.name;

    console.log(passwordData);
    this.apiObject.post(`/users/auth/change-password`, passwordData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
