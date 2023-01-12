import { Component, OnInit } from '@angular/core';
import { ShoppingapiService } from '../services/shoppingapi.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData: any;
  apiResponse: any;
  pages: any = [];
  queryLine: any;
  sortByVariable: any = '';

  constructor(private apiObject: ShoppingapiService) {
    this.getProductData();
  }

  ngOnInit(): void {}

  getProductData() {
    if (this.sortByVariable != '') {
      this.queryLine = `?limit=${this.apiObject.limit}&page=${this.apiObject.page}&sortBy=${this.sortByVariable}`;
    } else {
      this.queryLine = `?limit=${this.apiObject.limit}&page=${this.apiObject.page}`;
    }

    this.apiObject.get(`/shop/products${this.queryLine}`).subscribe(
      (data: any) => {
        this.apiResponse = data;

        this.productData = data['results'];

        this.pages.length = this.apiResponse['totalPages'];
        this.pages.fill(0);
      },
      (err) => {
        console.log(err);
      }
    );
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

    if (eventData.target.value == 'price') {
      this.sortByVariable = 'price';
    } else if (eventData.target.value == 'name') {
      this.sortByVariable = 'name';
    }

    this.getProductData();
  }
}
