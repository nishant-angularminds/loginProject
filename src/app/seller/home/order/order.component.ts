import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SellerapiService } from '../../services/sellerapi.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderData: any;
  status = true;
  p:number = 1;
  limit=4;

  constructor(
    private serviceObject: SellerapiService,
    private routerObject: Router
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.serviceObject.get(`/orders`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.orderData = data['results'];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  orderDeatils(data: any) {
    localStorage.setItem('orderid', data);

    this.routerObject.navigateByUrl('/seller/home/orderDetails');
  }

  dispatchOrder(orderId: any, e: any) {
    // this.status = true;
    Swal.fire({
      title: 'Do you want to dispatch the order',
      showDenyButton: true,
      confirmButtonText: 'yes',
      denyButtonText: `no`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.serviceObject
          .patch(`/orders/dispatch/${orderId}`, null)
          .subscribe({
            next: (data: any) => {
              console.log(data);
              // this.orderStatus = data['order']['status'];
              // console.log(this.orderStatus);
              this.getOrder();
              Swal.fire('Dispatched successfully!', '', 'success');
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else if (result.isDenied) {
        Swal.fire('Cancel dispatch', '', 'info');
      }
    });
    console.log(orderId);
    e.stopPropagation();
  }

  cancelOrder(e: any, currentId: any) {
    e.stopPropagation();
    console.log(currentId);

    this.serviceObject.patch(`/orders/cancel/${currentId}`, null).subscribe({
      next: (data) => {
        console.log(data);
        this.getOrder();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deliver(event: any, orderId: any) {
    event.stopPropagation();
    console.log(orderId);
    this.serviceObject.patch(`/orders/deliver/${orderId}`, null).subscribe({
      next: (data) => {
        console.log(data);
        this.getOrder();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
