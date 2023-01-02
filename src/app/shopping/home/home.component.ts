import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from 'src/app/services/api-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  productData:any;
  p:number=1;

  constructor(private apiObject: ApiInfoService) {
    this.getProductData();
  }

  ngOnInit(): void {}

  getProductData() {
    this.apiObject.get(`/shop/products`).subscribe(
      (data:any) => {
        console.log(data);
        this.productData = data['results'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
