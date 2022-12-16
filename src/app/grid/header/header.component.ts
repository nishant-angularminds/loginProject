import { Component } from '@angular/core';
import { LocalstorageDataService } from 'src/app/services/localstorage-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private localObject:LocalstorageDataService) {


  }

  logoutData() {

    this.localObject.removeToken();

  }

}
