import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/seller/grid/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ProductdataComponent } from './productdata/productdata.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    ProductComponent,
    ProductdataComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class HomeModule {}
