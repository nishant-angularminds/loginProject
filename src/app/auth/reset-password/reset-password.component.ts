import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetToken: any;
  resetForm: FormGroup;

  constructor(
    private activateObject: ActivatedRoute,
    private serviceObject: ApiInfoService,
    private routeObject:Router
  ) {
    activateObject.queryParams.subscribe((data) => {
      this.resetToken = data;
    });
  }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl(),
      token: new FormControl(),
      captcha: new FormControl(),
    });
  }

  resetPassword(resetData: any) {
    delete this.resetForm.value.token;
    delete this.resetForm.value.captcha;
    console.log(this.resetToken);

    this.serviceObject
      .post(`/auth/reset-password?token=${this.resetToken.token}`, resetData)
      .subscribe(
        (data) => {

          this.routeObject.navigateByUrl('/auth/login');
        },
        (err) => {
          console.log(err);
        }
      );

  }
}
