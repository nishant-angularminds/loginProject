import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingapiService } from '../../services/shoppingapi.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentGroup: FormGroup;

  constructor(private apiObject: ShoppingapiService) {}

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
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
