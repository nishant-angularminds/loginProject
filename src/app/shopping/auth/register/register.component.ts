import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customerRegisterForm: FormGroup;

  constructor(private apiobject: ApiInfoService,private routerObject:Router) {}

  ngOnInit(): void {
    this.customerRegisterForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      address: new FormGroup({
        addressLine2: new FormControl(),
        city: new FormControl(),
        street: new FormControl(),
        state: new FormControl(),
        pin: new FormControl(),
      }),
    });
  }

  submitCustData(custData: any) {
    this.apiobject.post(`/shop/auth/register`, custData).subscribe(
      (data) => {
        console.log(data);
        this.routerObject.navigateByUrl('');

      },
      (err) => {
        console.log(err);
      }
    );
  }
}
