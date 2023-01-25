import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShoppingapiService } from 'src/app/shopping/services/shoppingapi.service';

@Component({
  selector: 'app-shopheader',
  templateUrl: './shopheader.component.html',
  styleUrls: ['./shopheader.component.css']
})
export class ShopheaderComponent {

  statusUser: any;
  buttonShow: any = 'block';
  state:any;

  constructor(private apiObject: ShoppingapiService,private store:Store<{ state: any }>) {
    var check1 = localStorage.getItem('customerToken');

    console.log(check1+"hdasdjsha");
    

    this.store.select('state').subscribe((data)=> {

      this.state = data.items;
    })

    if (check1 == null) {
      this.statusUser = true;
    } else {
      this.statusUser = false;
    }
  }

}
