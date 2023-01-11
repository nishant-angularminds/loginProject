import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [SellerComponent],
  imports: [CommonModule, SellerRoutingModule, ReactiveFormsModule],


})
export class SellerModule {}
