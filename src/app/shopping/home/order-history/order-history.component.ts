import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ShoppingapiService } from '../../services/shoppingapi.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderInfo: any;
  paymentGroup: FormGroup;
  orderId: any;
  currentOrder: any;
  currentOrderProducts: any;
  page:any=1;
  limit:any=6;

  constructor(
    private apiObject: ShoppingapiService,
    private toast: HotToastService,
    private routeObject: Router
  ) {
    this.getOrderHistory();
  }

  ngOnInit(): void {
    this.paymentGroup = new FormGroup({
      nameOnCard: new FormControl(),
      cardNumber: new FormControl(),
      expiry: new FormControl(),
      cvv: new FormControl(),
    });
  }

  getOrderHistory() {

    this.apiObject.get(`/shop/orders?page=${this.page}&limit=${this.limit}`).subscribe({
      next: (data: any) => {
        this.orderInfo = data['results'];
        console.log(this.orderInfo);
        console.log(data);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  paymentInHistory(impId: any) {
    console.log(impId);
    this.orderId = impId;
  }

  getOrder(idInfo: any) {
    this.apiObject.get(`/shop/orders/${idInfo}`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentOrder = data;
        this.currentOrderProducts = data['items'];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendPayment(data: any) {
    console.log(data);

    this.apiObject.put(`/shop/orders/confirm/${this.orderId}`, data).subscribe({
      next: (data) => {
        console.log(data);
        this.toast.success('payment successfull');
        this.getOrderHistory();
        this.routeObject.navigateByUrl('');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancelOrder(cancelId: any,index:any) {
    this.apiObject.patch(`/shop/orders/cancel/${cancelId}`, null).subscribe({
      next: (data:any) => {
      this.orderInfo[index]['status'] = data['order']['status'];
      this.getOrderHistory();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  onTableDataChange(event:any) {

    console.log(event);
    this.page = event;
    this.getOrderHistory();
    
  }
}
