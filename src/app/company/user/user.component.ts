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
  roleData:any;
  p:any=1;

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
    this.userInformationArray = data;
    console.log(this.userInformationArray);
    
       
    
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
    this.apiService.userIdInformation = idInfo?._id;
    
  }

  sendRoleData(roleValue:any,indexInfo:any) {
    
    this.apiService.editRole(roleValue.target.value,this.userDataArray[indexInfo]['_id']).subscribe((data:any)=> {

      this.userDataArray = data;
      
    },(err)=> {

      console.log(err);
      
    });

  }

  deleteUser(userIndex:number) {

    console.log(this.userDataArray[userIndex]['_id']);
    // this.apiService.deleteUserApi(this.userDataArray[userIndex]['_id']).subscribe((data)=> {

    //   this.userDataArray = data;
    //   this.userInfo();

    // },(err)=> {

    //   console.log(err);
      
    // })
  }

}
