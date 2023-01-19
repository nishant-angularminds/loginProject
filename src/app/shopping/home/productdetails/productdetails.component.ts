import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingapiService } from '../../services/shoppingapi.service';
import { addCart, addTotal } from '../../states/cart.action';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent {
  idInfo: any;
  currentProductInfo: any;

  constructor(
    private apiObject: ShoppingapiService,
    private store: Store<{ state: any }>
  ) {
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

  addCart(productData: any) {
    productData['qty'] = 1;
    productData['subTotal'] = productData['price'];
    productData['productId'] = productData['_id'];

    this.store.dispatch(addCart({ productData: productData }));
    this.store.dispatch(addTotal());
  }
}
