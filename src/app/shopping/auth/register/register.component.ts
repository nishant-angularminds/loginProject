import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customerForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      address: new FormGroup({
        street: new FormControl(),
        addressLine2: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
        pin: new FormControl(),
      }),
    });
  }

  customerCall(customerData: any) {
    console.log(customerData);
  }
}
