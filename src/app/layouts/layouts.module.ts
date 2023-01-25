import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerModule } from '../seller/seller.module';
import { ShopModule } from './shop/shop.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports :[

    SellerModule,
    ShopModule
  ]
})
export class LayoutsModule { }
