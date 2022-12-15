import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataInfoService } from 'src/app/data-info.service';

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

  constructor(private routerObject: Router, private service: DataInfoService) {

    if (this.service.getTokenInLocalStorage() == null) {
      this.routerObject.navigateByUrl('');
    } else {
      this.routerObject.navigateByUrl('home/profile');
    }   

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
          this.service.setTokenInLocalStorage(data);
          this.routerObject.navigate(['/home/profile']);
        },
        (err) => {          
          alert(err['error']['message']);
        }
      );
    }
  }
}
