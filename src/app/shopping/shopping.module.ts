import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { ShophomeComponent } from './shophome/shophome.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { CustomerprofileComponent } from './shophome/customerprofile/customerprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ProductdetailsComponent } from './shophome/productdetails/productdetails.component';
import { CartlistComponent } from './shophome/cartlist/cartlist.component';
import { PaymentComponent } from './shophome/payment/payment.component';
import { OrderComponent } from './shophome/order/order.component';
import { OrderHistoryComponent } from './shophome/order-history/order-history.component';
import { ShopModule } from '../layouts/shop/shop.module';
import { AddresslistComponent } from './shophome/addresslist/addresslist.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ShoppingComponent,
    CustomerprofileComponent,
    ProductdetailsComponent,
    CartlistComponent,
    PaymentComponent,
    OrderComponent,
    AddresslistComponent,
    OrderHistoryComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ShopModule,
    ComponentsModule
  ]
})
export class ShoppingModule {}
