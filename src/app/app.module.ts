import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { PageNotFoundComponent } from './seller/home/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { SellershoppingInterceptor } from './sellershopping.interceptor';
import { StoreModule } from '@ngrx/store';
import { HotToastModule } from '@ngneat/hot-toast';
import { cartReducer, oneCartReducer } from './shopping/states/cart.reducer';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    HotToastModule.forRoot(),
    StoreModule.forRoot({state:cartReducer,state1:oneCartReducer}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SellershoppingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
