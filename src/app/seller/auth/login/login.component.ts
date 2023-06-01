import { JsonPipe } from '@angular/common';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerapiService } from '../../services/sellerapi.service';
import { SellerlocalstorageapiService } from '../../services/sellerlocalstorageapi.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { HotToastService } from '@ngneat/hot-toast';

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
    private service: SellerapiService,
    private localstorageObject: SellerlocalstorageapiService,
    private loginCaptcha: ReCaptchaV3Service,
    private authservice: SocialAuthService,
    private toast:HotToastService
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
    });
  }
  setCaptchaToken() {
    // this.loginCaptcha.execute('importantAction').subscribe((token) => {
    //   this.captchaToken = token;
    // });
  }

  submitLoginForm(loginData: any) {
    // this.loginPage.value.captcha = this.captchaToken;

    this.emailSubmitStatus1 = true;
    if (
      this.loginPage.controls['email'].valid &&
      this.loginPage.controls['password'].valid
    ) {
      this.service.post(`/auth/login?captcha=false`, loginData).subscribe(
        (data: any) => {
          this.localstorageObject.setTokenInLocalStorage(data);
          this.routerObject.navigate(['/seller/home']);
          this.toast.success('login successfully');

        },
        (err) => {

          console.log(err);

        }
      );
    }
  }

  forgetPassword(forgetData: any) {
    delete this.loginPage.value.password;

    console.log(forgetData);

    this.service.post(`/auth/forgot-password`, forgetData).subscribe(
      (data) => {
        this.routerObject.navigateByUrl('/seller/auth/reset-password');
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
