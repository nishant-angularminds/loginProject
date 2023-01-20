import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ShoppingapiService } from '../../services/shoppingapi.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  state: any;
  items: [];
  total: number;
  deliveryFee: number;
  address1: [];
  createOrder: any = {};
  addressUser: FormGroup;
  addressInfo: any;
  editAddressId: any;

  constructor(
    private store: Store<{ state: any }>,
    private apiObject: ShoppingapiService,
    private routerObject: Router,
    private toast: HotToastService
  ) {
    this.store.select('state').subscribe((data) => {
      this.items = data.items;
      this.total = data.total;
      this.deliveryFee = data.deliveryFee;

      console.log(this.items);
      console.log(this.total);
      console.log(this.deliveryFee);
    });

    if(this.items.length==0) {

      this.routerObject.navigateByUrl('')
    }
    

    this.getAddressData();
  }

  ngOnInit(): void {

    this.addressUser = new FormGroup({
      addressLine2: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      pin: new FormControl(),
    });
  }


  getAddressData() {
    this.apiObject.get(`/customers/address`).subscribe(
      (data: any) => {
        // this.address = data;
        console.log(data);
        this.address1 = data;
        console.log(this.address1);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getData(data:any) {

    this.addressInfo =  data;
    console.log(this.addressInfo);
    
  }

  sendAddressData(addressData: any) {
    console.log(addressData);

    this.apiObject.post(`/customers/address`, addressData).subscribe(
      (data) => {
        console.log(data);
        this.getAddressData();

      },
      (err) => {
        console.log(err);
      }
    );
  }

  placeOrder() {
    
    if(this.addressInfo==undefined) {

      alert('select address first')
    }

    else {

    this.createOrder['items'] = this.items;
    this.createOrder['deliveryFee'] = this.deliveryFee;
    this.createOrder['total'] = this.total;
    this.createOrder['address'] = this.addressInfo;

    this.apiObject.post(`/shop/orders`, this.createOrder).subscribe({
      next: (data: any) => {
        this.toast.success('placed successfully');
        this.apiObject.orderId = data['order']['_id'];
        this.routerObject.navigateByUrl('/payment');
      },
      error: (err) => {
        console.log(err);
      },
    });

    }

    console.log(this.createOrder);
    
  }
}
