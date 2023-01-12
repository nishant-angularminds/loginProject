import { Component } from '@angular/core';
import { ShoppingapiService } from '../../services/shoppingapi.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent {
  idInfo: any;
  currentProductInfo: any;
  constructor(private apiObject: ShoppingapiService) {
    this.idInfo = localStorage.getItem('productId');
    this.getCurrentProduct();
  }

  getCurrentProduct() {
    this.apiObject.get(`/shop/products/${this.idInfo}`).subscribe({
      next: (data) => {
        console.log(data);
        this.currentProductInfo = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
