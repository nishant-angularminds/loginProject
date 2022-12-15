import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataInfoService } from 'src/app/data-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUserEmail: any;
  data1: any;

  constructor(
    private routerforlogin: Router,
    private serviceForProfile: DataInfoService
  ) {
    console.log('hello');
    console.log(localStorage.getItem('tokenList'));

    this.serviceForProfile.getLoginData().subscribe(
      (data) => {
        this.data1 = data;
        console.log(this.data1);
      },
      (error) => {
        console.log(error['message']);
      }
    );

    // var tokenCheck = localStorage.getItem('tokenList');

    // if (this.serviceForProfile.getTokenInLocalStorage() == null) {
    //   console.log('blank');

    //   this.routerforlogin.navigateByUrl('');
    // } else {
    //   this.routerforlogin.navigateByUrl('home/profile');
    // }
  }

  ngOnInit(): void {}

  deleteLocal() {
    this.serviceForProfile.removeToken();
  }
}
