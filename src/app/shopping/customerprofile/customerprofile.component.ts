import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css'],
})
export class CustomerprofileComponent implements OnInit {
  userData: any;
  edituser: FormGroup;

  constructor(
    private apiobject: ApiInfoService,
    private localObject: LocalstorageDataService,
    private routerObj: Router
  ) {
    this.apiobject.get(`/customers/address`).subscribe(
      (data) => {
        console.log(data);
        // console.log("run");
      },
      (err) => {
        console.log(err);
      }
    );
    this.userData = JSON.parse(localStorage.getItem('currentUser')!);
  }

  ngOnInit(): void {
    this.edituser = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
    });

    this.edituser['controls']['email'].setValue(
      this.userData['customer']['email']
    );
  }

  deleteUser() {
    this.localObject.removeToken();
    this.routerObj.navigateByUrl('shopping');
  }

  sendEditData(data1: any) {
    this.apiobject.patch(`/customers/update-profile`, data1).subscribe(
      (data: any) => {
        this.userData['customer']['name'] = data['name'];
        localStorage.setItem('currentUser', JSON.stringify(this.userData));
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(data1);
  }
}
