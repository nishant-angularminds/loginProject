import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerappComponent } from './sellerapp/sellerapp.component';
import { SellerauthComponent } from './sellerauth/sellerauth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SellerappComponent, SellerauthComponent],
  imports: [CommonModule, RouterModule],

  exports: [SellerappComponent, SellerauthComponent],
})
export class SellerModule {}
