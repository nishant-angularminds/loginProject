import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerPage:FormGroup;
  emailSubmitStatus:any;
  addData:any;

  constructor() {


  }

  ngOnInit(): void {
      
    this.registerPage = new FormGroup({

      'email':new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'password':new FormControl('',[Validators.required, Validators.minLength(6)]),
      'fullname':new FormControl('',[ Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')]),
      'companyname':new FormControl('',[ Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')])
    })

  }

  submitForm(formData:any) {

    console.log(formData);
    this.emailSubmitStatus = true;

    if(this.registerPage.controls['fullname'].valid && this.registerPage.controls['email'].valid && this.registerPage.controls['password'].valid && this.registerPage.controls['companyname'].valid) {

          var tempArrayR = JSON.parse(localStorage.getItem('userList')!);
          
          if(tempArrayR==null) {

            this.addData = [];

          }

          else {

            this.addData = tempArrayR;
          }

          this.addData.push(formData);

          localStorage.setItem('userList',JSON.stringify(this.addData));
      
    }

  }


}
