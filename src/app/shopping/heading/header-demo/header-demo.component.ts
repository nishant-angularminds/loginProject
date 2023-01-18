import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingapiService } from '../../services/shoppingapi.service';
@Component({
  selector: 'app-header-demo',
  templateUrl: './header-demo.component.html',
  styleUrls: ['./header-demo.component.css'],
})
export class HeaderDemoComponent {
  statusUser: any;
  buttonShow: any = 'block';
  state:any;

  constructor(private apiObject: ShoppingapiService,private store:Store<{ state: any }>) {
    var check1 = localStorage.getItem('customerToken');

    this.store.select('state').subscribe((data)=> {

      this.state = data.productCartList;
    })

    if (check1 == null) {
      this.statusUser = true;
    } else {
      this.statusUser = false;
    }
  }
}
