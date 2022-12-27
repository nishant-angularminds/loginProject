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
      Confirmpassword: new FormControl(),
    });
  }

  resetPassword(resetData: any) {
    delete this.resetForm.value.token;
    // console.log(resetData);

    if(resetData.password==resetData.Confirmpassword) {
      // console.log("success password");
      delete this.resetForm.value.Confirmpassword;

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

    else {

      alert("password wrong")
    }

  }
}
