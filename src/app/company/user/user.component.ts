import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userGroup:FormGroup;
  userInformationArray:any;
  userDataArray:any;
  currentEditInfo:any;

  constructor(private apiService:ApiInfoService,private routerObject:Router) {
      
    this.userInfo();

    }

ngOnInit(): void {
    
  this.userGroup = new FormGroup({

    'email':new FormControl(),
    'password':new FormControl(),
    'name':new FormControl(),
    'role':new FormControl()

  })

}

userInfo() {

  this.apiService.getUserData().subscribe((data:any)=> {

    this.userDataArray = data['results'];
    console.log(this.userDataArray);
       
    
  })
}

  submitUserForm(userFormData:any) {

    this.apiService.sendUserData(userFormData.value).subscribe((data)=> {

      this.userInfo();

    },(err)=> {

      alert(err['error']['message']);      
      
    });

  
  }

  submitEditUserForm(editUserFormInfo:any) {

    delete this.userGroup.value.role;

    console.log(editUserFormInfo);
    this.apiService.editUserName(editUserFormInfo).subscribe((data)=>{

      console.log(data);
      console.log("success");

      this.userDataArray = data;
      
    });

  }

  userId(idInfo:any) {
      console.log(idInfo)

    this.userGroup.controls['email'].setValue(idInfo?.email)
    this.userGroup.controls['name'].setValue(idInfo?.name)
    this.apiService.userIdInformation = idInfo?._id;
    
  }

}
