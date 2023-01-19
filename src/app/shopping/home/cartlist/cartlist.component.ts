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
  count = 1;
  s: any;
  items: [];
  total: number;
  deliveryFee: number;
  address: object;
  createOrder: any = {};

  constructor(
    private store: Store<{ state: any }>,
    private local: ShoppinglocalstorageService,
    private routeObject: Router,
    private apiObject: ShoppingapiService,
    private toast:HotToastService
  ) {
    this.store.select('state').subscribe((data) => {
      this.items = data.items;
      this.total = data.total;
      this.deliveryFee = data.deliveryFee;

      console.log(this.total);
      console.log(this.deliveryFee);
      console.log(this.items);

      this.s = JSON.parse(localStorage.getItem('address')!);

      this.address = this.s[0];
      console.log(this.address);

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

  placeTheOrder() {
    var checkToken = this.local.getTokenInLocalStorage();

    if (checkToken == null) {
      alert('Login first');
      this.apiObject.loginCart = true;
      this.routeObject.navigateByUrl('/auth/login');
    } else if (this.s[0] == null) {
      alert('Enter address first');
      this.apiObject.addressCart = true;
      this.routeObject.navigateByUrl('/address-list');
    } else {
      this.createOrder['items'] = this.items;
      this.createOrder['deliveryFee'] = this.deliveryFee;
      this.createOrder['total'] = this.total;
      this.createOrder['address'] = this.address;

      this.apiObject.post(`/shop/orders`, this.createOrder).subscribe({
        next: (data:any) => {
          this.toast.success('placed successfully');
         this.apiObject.orderId = data['order']['_id'];
          this.routeObject.navigateByUrl('/payment');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
