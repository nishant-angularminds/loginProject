import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerapiService } from '../../services/sellerapi.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userGroup: FormGroup;
  userInformationArray: any;
  currentEditInfo: any;
  roleData: any;
  pageItem: any;
  totalPages1: any;
  userDataArray: any;
  pages: any[] = [];
  // demo: any = 0;
  userToken: any;
  query: any;
  page:any = 1;
  limit:any = 10;
  name:any = "";

  constructor(
    private apiService: SellerapiService,
    private routerObject: Router
  ) {
    this.page = 1;
    this.userInfo();
  }

  ngOnInit(): void {
    this.userGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      role: new FormControl(),
    });
  }

  userSearch(event: any) {
    this.name = event.target.value;
    this.userInfo();
  }

  userInfo() {
    this.query = `?limit=${this.limit}&page=${this.page}`;

    if (this.name == '') {
      this.query = `?limit=${this.limit}&page=${this.page}`;
    } else {
      this.query = `${this.query}&name=${this.name}`;
    }

    this.apiService.get(`/users${this.query}`).subscribe((data: any) => {
      this.userDataArray = data['results'];
      this.userInformationArray = data;
      console.log(this.userInformationArray);

      this.pages.length = this.userInformationArray['totalPages'];
      this.pages.fill(0);
      console.log(this.pages);
    });
  }

  submitUserForm(userFormData: any) {
    this.apiService.post('/users', userFormData.value).subscribe(
      (data) => {
        this.userInfo();
      },
      (err) => {
        alert(err['error']['message']);
      }
    );
  }

  submitEditUserForm(editUserFormInfo: any) {
    delete this.userGroup.value.role;

    console.log(editUserFormInfo);
    this.apiService
      .patch(`/users/${this.userToken}`, editUserFormInfo)
      .subscribe((data) => {
        console.log(data);
        this.userInfo();

        this.userDataArray = data;
      });
  }

  userId(idInfo: any) {
    this.userToken = idInfo['_id'];
  }

  sendRoleData(roleValue: any, userIdInfo: any) {
    this.apiService
      .patch(`/users/role/${userIdInfo}`, { role: roleValue.target.value })
      .subscribe(
        (data: any) => {
          this.userDataArray = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteUser(userIdInfo1: number) {
    this.apiService.delete(`/users/${userIdInfo1}`).subscribe(
      (data) => {
        this.userDataArray = data;
        this.userInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  pageChange(event: any) {
    if (this.page == this.pages.length) {
      if (event.target.value > this.limit) {
        this.page--;
      }
    }
    this.limit = event.target.value;
    this.userInfo();
  }

  pageClick(pageNoInfo: any) {
    console.log(pageNoInfo);
    this.page = pageNoInfo;
    this.userInfo();
  }

  nextData() {
    console.log(this.pages.length);

    if (this.page < this.userInformationArray['totalPages']) {
      this.page++;
      this.userInfo();
    }
  }

  previousData() {
    if (this.page != 1) {
      this.page--;
      this.userInfo();
    }
  }
}
