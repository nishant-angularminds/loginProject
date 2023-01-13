import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingapiService } from '../../services/shoppingapi.service';
import { ShoppinglocalstorageService } from '../../services/shoppinglocalstorage.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  custLogin: FormGroup;

  constructor(
    private apiObject: ShoppingapiService,
    private routerObject: Router,
    private local: ShoppinglocalstorageService,
    private toast:HotToastService
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

        // this.local.setUser(data);

        this.local.setTokenInLocalStorage(data['token']);

        this.toast.success("login successfully")

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
