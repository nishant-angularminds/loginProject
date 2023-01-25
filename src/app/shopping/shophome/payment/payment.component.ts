import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingapiService } from '../../services/shoppingapi.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentGroup: FormGroup;

  constructor(private apiObject: ShoppingapiService,private toast:HotToastService,private routerObject:Router) {}

  ngOnInit(): void {
    this.paymentGroup = new FormGroup({
      nameOnCard: new FormControl(),
      cardNumber: new FormControl(),
      expiry: new FormControl(),
      cvv: new FormControl(),
    });
  }

  sendPayment(paymentData: any) {
    console.log(paymentData);

    this.apiObject
      .put(`/shop/orders/confirm/${this.apiObject.orderId}`, paymentData)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.toast.success("payment successfull");
          this.routerObject.navigateByUrl('');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
