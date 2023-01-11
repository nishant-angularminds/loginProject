import { Component } from '@angular/core';
import { SellerapiService } from '../../services/sellerapi.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  verifyToken:any;

  constructor(private apiObject:SellerapiService,private routerObject:Router,private activeObject:ActivatedRoute) {

    activeObject.queryParams.subscribe((data)=> {

      this.verifyToken = data;

    })

    this.apiObject.post(`/auth/verify-email?token=${this.verifyToken['token']}`,{}).subscribe((data)=> {

      console.log("i am mad");
      this.routerObject.navigateByUrl('/home');

    },(err)=> {
  
      console.log(err);
      
    })
  

  }


}
