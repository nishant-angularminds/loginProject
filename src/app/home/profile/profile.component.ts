import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataInfoService } from 'src/app/data-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUserEmail:any;

  constructor(private routerforlogin:Router,private serviceForProfile:DataInfoService) {

    var tempArray = JSON.parse(localStorage.getItem('loginUser')!);

    if(tempArray==null) {

      this.routerforlogin.navigateByUrl('');
      
    }

    else {

      this.currentUserEmail = tempArray['email'];
      
      this.routerforlogin.navigateByUrl('home/profile');

    }

    console.log("i am profile");
   

  }


  ngOnInit(): void {
  

  }

 


  deleteLocal() {

    localStorage.removeItem('loginUser')
    this.routerforlogin.navigateByUrl('');


  }

}
