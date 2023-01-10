import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  custLogin: FormGroup;

  constructor(
    private apiObject: ApiInfoService,
    private routerObject: Router
  ) {}

  ngOnInit(): void {
    this.custLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  submitCustLogin(custLoginData: any) {
    console.log(custLoginData);

    this.apiObject.post(`/shop/auth/login`, custLoginData).subscribe(
      (data: any) => {
        // console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        localStorage.setItem('tokenList', data['token']);
        this.routerObject.navigateByUrl('');
      },
      (err) => {
        console.log(err);
        alert(err['error']['message']);

        this.routerObject.navigateByUrl('');
      }
    );
  }
}
