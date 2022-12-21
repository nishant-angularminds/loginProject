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
  pageItem:any;
  totalPages1:any;
  pages:any[] = [];
  demo:any = 0;

  constructor(private apiService:ApiInfoService,private routerObject:Router) {
      
    this.userInfo();
    console.log("hello");
    

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
    // this.totalPages1 = this.userInformationArray['totalPages']
    // console.log(this.totalPages1);
    
    this.pages.length = this.userInformationArray['totalPages'];
    this.pages.fill(0); 
    console.log(this.pages);
    
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
      this.userInfo();

      this.userDataArray = data;
      
    });

  }

  userId(idInfo:any) {
      console.log(idInfo)

    this.userGroup.controls['email'].setValue(idInfo?.email)
    this.apiService.userIdInformation = idInfo?._id;
    
  }

  sendRoleData(roleValue:any,userIdInfo:any) {
    
    this.apiService.editRole(roleValue.target.value,userIdInfo).subscribe((data:any)=> {

      this.userDataArray = data;
      
    },(err)=> {

      console.log(err);
      
    });

  }

  deleteUser(userIdInfo1:number) {

    console.log(userIdInfo1);
    this.apiService.deleteUserApi(userIdInfo1).subscribe((data)=> {

      this.userDataArray = data;
      this.userInfo();

    },(err)=> {

      console.log(err);
      
    })
  }

  pageChange(event:any) {

    this.apiService.limit = event.target.value;
    this.apiService.getUserData().subscribe((data)=> {

      // this.userDataArray = data;
      // console.log(this.userDataArray);
    
      this.userInfo();

    });
    
  }

  pageClick(pageNoInfo:any) {

    console.log(pageNoInfo);
    this.apiService.page = pageNoInfo;
    this.demo = pageNoInfo;
    this.userInfo();
 
  }

  nextData() {

    if(this.pages.length>this.demo) {

    this.apiService.page++;
    this.demo = this.apiService.getPage();
    this.userInfo();

    }

  }

  previousData() {

    if(this.apiService.page!=1) {

      this.apiService.page--;
      this.demo = this.apiService.getPage();
      this.userInfo();

    }

  }

}
