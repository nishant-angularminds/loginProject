import { Component } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';

@Component({
  selector: 'app-header-demo',
  templateUrl: './header-demo.component.html',
  styleUrls: ['./header-demo.component.css'],
})
export class HeaderDemoComponent {
  statusUser: any ;
  buttonShow: any = 'block';
  mj:any;

  constructor(private apiObject: ApiInfoService) {
    var check1 = localStorage.getItem('tokenList');

    if (check1 == null) {
      this.statusUser = true;
    } else {
      this.statusUser = false;
    }

    // this.statusUser = this.apiObject.status;
   this.mj =  this.apiObject.dem;
    console.log(this.statusUser);
  }

 
}
