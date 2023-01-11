import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderDemoComponent } from './heading/header-demo/header-demo.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    ShoppingComponent,
    HomeComponent,
    HeaderDemoComponent,
    CustomerprofileComponent,
    AddresslistComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderDemoComponent],

})
export class ShoppingModule {}
