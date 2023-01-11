import { Component, OnInit } from '@angular/core';
import { SellerapiService } from '../../services/sellerapi.service';
@Component({
  selector: 'app-productdata',
  templateUrl: './productdata.component.html',
  styleUrls: ['./productdata.component.css'],
})
export class ProductdataComponent implements OnInit {
  currentData: any;

  constructor(private apiobject: SellerapiService) {}

  ngOnInit(): void {
    this.callme();
  }

  callme() {
    this.currentData = JSON.parse(localStorage.getItem('currentProduct')!);
    console.log(this.currentData);
  }
}
