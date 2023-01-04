import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
HeaderpartComponent
import { HeaderpartComponent } from './grid/headerpart/headerpart.component';


@NgModule({
  declarations: [
    ShoppingComponent,
    HomeComponent,
    HeaderpartComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    NgxPaginationModule
  ]
})
export class ShoppingModule { }
