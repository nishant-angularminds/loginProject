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
  imgData: any;
  imageData: any;

  constructor(
    private apiobject: ApiInfoService,
    private localObject: LocalstorageDataService,
    private routerObj: Router
  ) {
    this.getUser();
    console.log(this.userData);
  }

  ngOnInit(): void {
    this.edituser = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      picture: new FormControl(),
      old_password: new FormControl(),
      new_password: new FormControl(),
    });

    console.log(this.edituser.value);
  }

  go2() {
    this.edituser['controls']['email'].setValue(
      this.userData['customer']['email']
    );

    console.log(this.userData['customer']['email']);
    console.log(this.edituser.value);
  }

  getUser() {
    this.userData = JSON.parse(localStorage.getItem('currentUser')!);
  }

  fileChoose(event: any) {
    this.imageData = event.target.files;
  }

  deleteUser() {
    this.localObject.removeToken();
    this.routerObj.navigateByUrl('');
  }

  sendEditData(data1: any) {
    delete this.edituser.value.picture;
    delete this.edituser.value.old_password;
    delete this.edituser.value.new_password;


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

  sendImgData(imgData: any) {
    delete this.edituser.value.name;
    delete this.edituser.value.email;

    var formData = new FormData();

    formData.append('picture', this.imageData[0]);

    this.apiobject.post(`/customers/profile-picture`, formData).subscribe(
      (data: any) => {
        this.userData['customer']['picture'] = data['picture'];

        localStorage.setItem('currentUser', JSON.stringify(this.userData));
        this.getUser();
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removePic() {
    this.apiobject.delete(`/customers/profile-picture`).subscribe(
      (data) => {
        this.userData['customer']['picture'] = data;

        localStorage.setItem('currentUser', JSON.stringify(this.userData));

        this.getUser();

        this.edituser['controls']['picture'].setValue(null);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changedData(changedPassword: any) {
    delete this.edituser.value.picture;
    delete this.edituser.value.name;
    delete this.edituser.value.email;

    console.log(changedPassword);

    this.apiobject
      .post(`/customers/auth/change-password`, changedPassword)
      .subscribe(
        (data) => {
          console.log(data);
          console.log('changed password by nishu');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteAccount() {
    this.apiobject.delete(`/customers/account`).subscribe(
      (data) => {
        console.log(data);
        console.log('deleted successfully');
        this.deleteUser();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
