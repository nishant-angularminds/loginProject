import { Component } from '@angular/core';
import { SellerapiService } from '../../services/sellerapi.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  currentData: any;
  orderid:any;
  itemInfo:any;
  address:any;

  constructor(private apiObject: SellerapiService) {
    this.orderid = localStorage.getItem('orderid');
    this.getOneOrder();
  }

  getOneOrder() {
    this.apiObject.get(`/orders/${this.orderid}`).subscribe({
      next: (data:any) => {
        this.currentData = data;
        this.address = data[0]['address'];
       this.itemInfo = data[0]['items'];
       console.log(this.itemInfo);
       
        
        console.log(this.currentData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
