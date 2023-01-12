import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShoppingapiService } from '../services/shoppingapi.service';
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

  constructor(private apiObject: ShoppingapiService) {
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
        this.queryLine = `?limit=${this.apiObject.limit}&page=${this.apiObject.page}`;
      } else {
        this.queryLine = `?limit=${this.apiObject.limit}&page=${this.apiObject.page}&name=${this.productName1}`;
      }
    } else {
      if (this.sortByVariable != '') {
        this.queryLine = `?limit=${this.apiObject.limit}&page=${this.apiObject.page}&sortBy=${this.sortByVariable}`;
      } else {
        this.queryLine = `?limit=${this.apiObject.limit}&page=${this.apiObject.page}`;
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
    if (this.apiObject.page != 1) {
      this.apiObject.page--;
      this.getProductData();
    }
  }

  pageChange(event: any) {
    if (this.apiObject.page == this.pages.length) {
      if (event.target.value > this.apiResponse['limit']) {
        this.apiObject.page--;
      }
    }
    this.apiObject.limit = event.target.value;
    this.getProductData();
  }

  pageClick(pageNoInfo: any) {
    this.apiObject.page = pageNoInfo;
    this.getProductData();
  }

  nextData() {
    if (this.apiObject.page < this.apiResponse['totalPages']) {
      this.apiObject.page++;
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
}
