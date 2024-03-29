import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppingapiService } from '../services/shoppingapi.service';
import { addCart, addOneCart, subTotal, subTotal1 } from '../states/cart.action';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchGroup: FormGroup;
  productData: any;
  apiResponse: any;
  pages: any = [];
  queryLine: any;
  sortByVariable: any = '';
  productSort: any = false;
  productName1: any = '';
  p: any = 1;
  limit: any = 10;
  counter: Observable<any>;

  constructor(
    private apiObject: ShoppingapiService,
    private store: Store<{ state: any }>
  ) {
    localStorage.removeItem('productId');

    this.getProductData();
  }

  ngOnInit(): void {
    this.searchGroup = new FormGroup({
      searchProductName: new FormControl(),
    });
  }

  searchProduct(productName: any) {
    this.productName1 = productName.searchProductName;
    this.getProductData();
  }

  getProductData() {
    if (this.productSort == false) {
      if (this.productName1 == '') {
        this.queryLine = `?limit=${this.limit}&page=${this.p}`;
      } else {
        this.queryLine = `?limit=${this.limit}&page=${this.p}&name=${this.productName1}`;
      }
    } else {
      if (this.sortByVariable != '') {
        this.queryLine = `?limit=${this.limit}&page=${this.p}&sortBy=${this.sortByVariable}`;
      } else {
        this.queryLine = `?limit=${this.limit}&page=${this.p}`;
      }
      this.productSort = false;
    }

    this.apiObject.get(`/shop/products${this.queryLine}`).subscribe(
      (data: any) => {
        this.apiResponse = data;

        console.log(data);

        this.productData = data['results'];

        this.pages.length = this.apiResponse['totalPages'];
        this.pages.fill(0);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkId(idData: any) {
    console.log(idData);
    localStorage.setItem(`productId`, idData);
  }

  previousData() {
    if (this.p != 1) {
      this.p--;
      this.getProductData();
    }
  }

  pageChange(event: any) {
    if (this.p == this.pages.length) {
      if (event.target.value > this.apiResponse['limit']) {
        this.p--;
      }
    }
    this.limit = event.target.value;
    this.getProductData();
  }

  pageClick(pageNoInfo: any) {
    this.p = pageNoInfo;
    this.getProductData();
  }

  nextData() {
    if (this.p < this.apiResponse['totalPages']) {
      this.p++;
      this.getProductData();
    }
  }

  sortByMethod(eventData: any) {
    console.log(eventData.target.value);

    this.productSort = true;
    if (eventData.target.value == 'price') {
      this.sortByVariable = 'price';
    } else if (eventData.target.value == 'name') {
      this.sortByVariable = 'name';
    }

    this.getProductData();
  }

  addOneProduct(dataInfo11: any) {

    console.log(dataInfo11);
    

    dataInfo11['qty'] = 1;
    dataInfo11['subTotal'] = dataInfo11['price'];
    dataInfo11['productId'] = dataInfo11['_id'];
    this.apiObject.status = true;
    this.store.dispatch(addOneCart({ dataInfo11: dataInfo11 }));
    this.store.dispatch(subTotal1());
    console.log(dataInfo11);
  }
}
