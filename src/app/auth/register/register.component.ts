import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiInfoService } from 'src/app/services/api-info.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerPage: FormGroup;
  emailSubmitStatus: any;

  constructor(private router1: Router,private serviceObject:ApiInfoService) {
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
    });
  }

  submitForm(formData: any) {
    console.log(formData);
    
    this.emailSubmitStatus = true;


    if (
      this.registerPage.controls['name'].valid &&
      this.registerPage.controls['email'].valid &&
      this.registerPage.controls['password'].valid &&
      this.registerPage.controls['company'].valid
    ) {

       this.serviceObject.registerpostData(formData).subscribe((data)=> {

        this.router1.navigateByUrl('/auth/login');
        
       },(err)=>{

        alert(err['error']['message']);        
        this.router1.navigateByUrl('register');

        });

    }

  }
}
