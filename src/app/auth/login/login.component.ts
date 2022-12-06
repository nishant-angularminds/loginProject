import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPage:FormGroup;
  emailSubmitStatus1:any;
  loginStatus:any=false;

  constructor(private routerObject:Router) {
    
  }

  ngOnInit(): void {

    this.loginPage = new FormGroup({

      'loginEmail':new FormControl('',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'loginPassword':new FormControl('',[Validators.required, Validators.minLength(6)])
    })
      
  }

  submitLoginForm(loginData:any) {

    this.emailSubmitStatus1 = true;

    if(this.loginPage.controls['loginEmail'].valid && this.loginPage.controls['loginPassword'].valid) {

     var tempArray = JSON.parse(localStorage.getItem('userList')!);
      
     if(tempArray==null) {

      alert("no anyone register,first register!!")
      console.log(loginData);
      
     }

     else {

     tempArray.find((data:any)=> {

        if(data.email==loginData.loginEmail && data.password==loginData.loginPassword) {

          console.log("success");
          this.routerObject.navigateByUrl('home/profile')
          this.loginStatus = true;
          
        }
        

      });
      console.log(tempArray);

      if(this.loginStatus==false) {

      alert("you are not register")

     }

     else{

      this.routerObject.navigateByUrl('home/profile')
      this.loginStatus = false;

     }

     this.loginStatus = false;


    }

  }

}

}