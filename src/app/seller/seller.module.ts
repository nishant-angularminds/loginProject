import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SellerauthComponent } from '../layouts/seller/sellerauth/sellerauth.component';
import { SellerappComponent } from '../layouts/seller/sellerapp/sellerapp.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [SellerComponent,SellerauthComponent,SellerappComponent],
  imports: [CommonModule, SellerRoutingModule, ReactiveFormsModule,ComponentsModule],


})
export class SellerModule {}
