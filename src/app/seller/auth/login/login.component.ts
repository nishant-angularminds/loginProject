import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

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
  queryParamsLogin: any;
  httpService: any;
  authService: any;
  captchaToken: any;

  constructor(
    private routerObject: Router,
    private service: ApiInfoService,
    private localstorageObject: LocalstorageDataService,
    private loginCaptcha: ReCaptchaV3Service,
    private authservice: SocialAuthService
  ) {
    this.setCaptchaToken();
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
      captcha: new FormControl('', Validators.required),
    });
  }
  setCaptchaToken() {
    this.loginCaptcha.execute('importantAction').subscribe((token) => {
      this.captchaToken = token;
    });
  }

  submitLoginForm(loginData: any) {
    this.loginPage.value.captcha = this.captchaToken;

    this.emailSubmitStatus1 = true;
    if (
      this.loginPage.controls['email'].valid &&
      this.loginPage.controls['password'].valid
    ) {
      this.service.post(`/auth/login`, loginData).subscribe({
        next: (data: any) => {
          this.localstorageObject.setTokenInLocalStorage(data);
          this.routerObject.navigate(['/seller/home']);
        },
        error: (err) => {
          console.log('i am login');

          console.log(err);

          alert(err['error']['message']);
          this.setCaptchaToken();
        },
      });
    }
  }

  forgetPassword(forgetData: any) {
    delete this.loginPage.value.password;

    console.log(forgetData);

    this.service.post(`/auth/forgot-password`, forgetData).subscribe(
      (data) => {
        this.routerObject.navigateByUrl('/auth/reset-password');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // googleSignIn() {
  //   console.log("bat");

  //   this.authservice
  //     .signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then((data: { idToken: any }) => {
  //       localStorage.setItem('loggedInUser', JSON.stringify(data));
  //       this.service
  //         .post(`/auth/login/google`, { token: data.idToken })
  //         .subscribe({
  //           next: (res: any) => { localStorage.setItem("tokenList",res.token)
  //           this.routerObject.navigateByUrl('/home')
  //         },
  //           error: (err: any) => console.log(err),
  //         });
  //     });
  // }
}
