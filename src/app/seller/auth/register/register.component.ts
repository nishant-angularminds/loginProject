import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerapiService } from '../../services/sellerapi.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerPage: FormGroup;
  emailSubmitStatus: any;
  queryParams: any;
  // captchaToken: any;

  constructor(
    private router1: Router,
    private serviceObject: SellerapiService,
    private captchaObject: ReCaptchaV3Service,
    private toast:HotToastService
  ) {

    // this.captchaObject.execute('importantAction').subscribe((token: any) => {
    //   // console.log(token);

    //   this.captchaToken = token;
    // });
    
  }

  ngOnInit(): void {
    this.registerPage = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      company: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),

      // captcha: new FormControl('', Validators.required),
    });
  }

  submitForm(formData: any) {

    // this.registerPage.value.captcha = this.captchaToken;

    this.emailSubmitStatus = true;

    if (
      this.registerPage.controls['name'].valid &&
      this.registerPage.controls['email'].valid &&
      this.registerPage.controls['password'].valid &&
      this.registerPage.controls['company'].valid     ) {
      this.serviceObject.post(`/auth/register?captcha=false`, formData).subscribe(
        (data) => {

          this.router1.navigateByUrl('/seller/auth/login');
          this.toast.success('Register successfully')
        },
        (err) => {
          alert(err['error']['message']);
          this.router1.navigateByUrl('/seller/auth/login');
        }
      );
    }
  }

  onCaptchaChecked(event: any) {
    // if (event.target.checked == true) {
    //   this.captchaObject.execute('importantAction').subscribe((token) => {
    //     this.registerPage.value.captcha = token;
    //   });
    // }
  }
}
