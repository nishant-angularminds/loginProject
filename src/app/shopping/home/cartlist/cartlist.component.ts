import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addTotal,
  decrementQuantity,
  incrementQuantity,
  subTotal,
  totalPrice,
} from '../../states/cart.action';
import { ShoppinglocalstorageService } from '../../services/shoppinglocalstorage.service';
import { Router } from '@angular/router';
import { ShoppingapiService } from '../../services/shoppingapi.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css'],
})
export class CartlistComponent implements OnInit {
  state: any;
  totalState: number;

  constructor(
    private store: Store<{ state: any }>,
    private local: ShoppinglocalstorageService,
    private routeObject: Router,
    private apiObject: ShoppingapiService,
    private toast:HotToastService
  ) {
    this.store.select('state').subscribe((data) => {

      this.state = data.items;

      this.totalState = data.total;
    });
  }

  ngOnInit(): void {}

  incrementCount(dataInfo: any) {
    this.store.dispatch(incrementQuantity({ dataInfo: dataInfo }));
    this.store.dispatch(addTotal());
  }

  decrementCount(dataInfo1: any) {
    this.store.dispatch(decrementQuantity({ dataInfo1: dataInfo1 }));
    this.store.dispatch(subTotal());
  }

  createTheOrder() {
    var checkToken = this.local.getTokenInLocalStorage();

    if (checkToken == null) {
      this.toast.warning('Login first before create order');
      this.apiObject.loginCart = true;
      this.routeObject.navigateByUrl('/auth/login');
    } 
    
    else {

      this.routeObject.navigateByUrl('/order-info');

    }
  }
}
