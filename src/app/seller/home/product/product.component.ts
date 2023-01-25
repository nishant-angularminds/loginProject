import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerapiService } from '../../services/sellerapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productGroup: FormGroup;
  imageInfo: any;
  imgData: any;
  watchProduct: any;
  pages: any = [];
  apiResponse: any;
  productEditId: any;
  productimageid: any;
  productName: any;
  queryLine: any;
  sortByVariable: string = '';
  sortStatus: any = false;
  page:any = 1;
  limit:any=10;

  constructor(
    private apiObject: SellerapiService,
    private routerObject: Router
  ) {
    this.productName = '';
    this.getProduct();
  }

  ngOnInit(): void {
    this.productGroup = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      images: new FormControl(),
      price: new FormControl(),
      new_images: new FormControl(),
      searchProductName: new FormControl(),
    });
  }

  getEditProductId(productId: any) {
    this.productEditId = productId;
    console.log(this.productEditId);
  }

  getimgProductId(productId: any, productimgId: any) {
    this.productEditId = productId;
    this.productimageid = productimgId;
  }

  readData(getPid: any) {
    this.getEditProductId(getPid);

    this.apiObject.get(`/products/${this.productEditId}`).subscribe(
      (data) => {
        localStorage.setItem('currentProduct', JSON.stringify(data));
        this.routerObject.navigateByUrl('/seller/home/productdata');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeImage(event: any) {
    this.imgData = event.target.files;
  }

  submitProductForm(productData: any) {
    const formObject = new FormData();

    for (var i = 0; i < this.imgData.length; i++) {
      formObject.append('images', this.imgData[i]);
    }

    formObject.append('name', productData.name);
    formObject.append('description', productData.description);
    formObject.append('price', productData.price);

    this.apiObject.post(`/products`, formObject).subscribe(
      (data) => {
        console.log(data);
        this.getProduct();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitEditImage(imageData: any) {
    delete this.productGroup.value.name;
    delete this.productGroup.value.description;
    delete this.productGroup.value.price;
    delete this.productGroup.value.images;
    delete this.productGroup.value.searchProductName;

    var formInfo = new FormData();

    for (var j = 0; j < this.imgData.length; j++) {
      formInfo.append('new_images', this.imgData[j]);
    }

    formInfo.append('delete', this.productimageid);

    console.log(imageData);

    this.apiObject
      .patch(`/products/images/${this.productEditId}`, formInfo)
      .subscribe(
        (data) => {
          console.log(data);
          this.getProduct();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getProduct() {
    if (this.sortStatus == false) {
      if (this.productName == '') {
        this.queryLine = `?limit=${this.limit}&page=${this.page}`;
      } else {
        this.queryLine = `?limit=${this.limit}&page=${this.page}&name=${this.productName}`;
      }
    } else {
      if (this.sortByVariable != '') {
        this.queryLine = `?limit=${this.limit}&page=${this.page}&sortBy=${this.sortByVariable}`;
      } else {
        this.queryLine = `?limit=${this.limit}&page=${this.page}`;
      }
      this.sortStatus = false;
    }

    this.apiObject.get(`/products${this.queryLine}`).subscribe(
      (data: any) => {
        this.apiResponse = data;
        this.watchProduct = data['results'];

        console.log(this.watchProduct);
        console.log(this.apiResponse);

        this.pages.length = this.apiResponse['totalPages'];
        this.pages.fill(0);
        console.log(this.pages);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchProduct(serchObject: any) {
    delete this.productGroup.value.name;
    delete this.productGroup.value.description;
    delete this.productGroup.value.price;
    delete this.productGroup.value.images;
    delete this.productGroup.value.new_images;
    this.productName = serchObject.searchProductName;
    this.getProduct();
  }

  deleteProduct(productId: any) {
    console.log(productId);

    this.apiObject.delete(`/products/${productId}`).subscribe(
      (data) => {
        console.log(data);
        this.getProduct();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateProductForm(productUpdateData: any) {
    delete this.productGroup.value.images;
    delete this.productGroup.value.searchProductName;
    delete this.productGroup.value.new_images;

    console.log(productUpdateData);

    this.apiObject
      .patch(`/products/${this.productEditId}`, productUpdateData)
      .subscribe(
        (data) => {
          console.log(data);
          this.getProduct();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  previousData() {
    if (this.page != 1) {
      this.page--;
      this.getProduct();
    }
  }

  pageChange(event: any) {
    if (this.page == this.pages.length) {
      if (event.target.value > this.limit) {
        this.page--;
      }
    }
    this.limit = event.target.value;
    this.getProduct();
  }

  pageClick(pageNoInfo: any) {
    console.log(pageNoInfo);
    this.page = pageNoInfo;
    this.getProduct();
  }

  nextData() {
    if (this.page < this.apiResponse['totalPages']) {
      this.page++;
      this.getProduct();
    }
  }

  sortByMethod(eventData: any) {
    console.log(eventData.target.value);

    this.sortStatus = true;
    if (eventData.target.value == 'price') {
      this.sortByVariable = 'price';
    } else if (eventData.target.value == 'name') {
      this.sortByVariable = 'name';
    }

    this.getProduct();
  }
}
