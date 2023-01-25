import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopheaderComponent } from './shopheader/shopheader.component';
import { SellerheaderComponent } from './sellerheader/sellerheader.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ShopheaderComponent,
    SellerheaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SellerheaderComponent,
    ShopheaderComponent
  ]
})
export class ComponentsModule { }
