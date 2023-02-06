import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductdataComponent } from './productdata/productdata.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    ProductComponent,
    ProductdataComponent,
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule,ComponentsModule],
})
export class HomeModule {}
