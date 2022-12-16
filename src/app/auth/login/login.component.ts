import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginPage: FormGroup;
  emailSubmitStatus1: any;
  loginStatus: any = false;
  tempTokenArray: any;

  constructor(private routerObject: Router, private service: ApiInfoService,private localstorageObject:LocalstorageDataService) {

  }

  ngOnInit(): void {
    this.loginPage = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitLoginForm(loginData: any) {
    this.emailSubmitStatus1 = true;
    if (
      this.loginPage.controls['email'].valid &&
      this.loginPage.controls['password'].valid
    ) {
      this.service.loginpostData(loginData).subscribe(
        (data: any) => {
          this.localstorageObject.setTokenInLocalStorage(data);
          this.routerObject.navigate(['/my-profile']);
        },
        (err) => {          
          alert(err['error']['message']);
        }
      );
    }
  }
}
