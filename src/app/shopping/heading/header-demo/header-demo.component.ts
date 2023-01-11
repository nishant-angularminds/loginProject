import { Component } from '@angular/core';
import { ShoppingapiService } from '../../services/shoppingapi.service';
@Component({
  selector: 'app-header-demo',
  templateUrl: './header-demo.component.html',
  styleUrls: ['./header-demo.component.css'],
})
export class HeaderDemoComponent {
  statusUser: any;
  buttonShow: any = 'block';

  constructor(private apiObject: ShoppingapiService) {
    var check1 = localStorage.getItem('customerToken');

    if (check1 == null) {
      this.statusUser = true;
    } else {
      this.statusUser = false;
    }
  }
}
