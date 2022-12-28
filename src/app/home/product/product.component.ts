import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiInfoService } from 'src/app/services/api-info.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productGroup: FormGroup;
  imageInfo: any;
  arr: any = [];
  imgData: any;
  watchProduct:any;

  constructor(private apiObject: ApiInfoService) {

    this.getProduct();

  }

  ngOnInit(): void {
    this.productGroup = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      images: new FormControl(),
      price: new FormControl(),
    });
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
    this.arr = [];

    console.log(this.arr);

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

  getProduct() {

    this.apiObject.get(`/products`).subscribe((data:any)=>{

      console.log(data);
      this.watchProduct = data['results'];
      
    },(err)=> {

      console.log(err);
      
    })
  }
}
