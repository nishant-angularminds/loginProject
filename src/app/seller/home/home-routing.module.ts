import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthGuard } from '../services/seller-auth.guard';
import { HomeComponent } from './home.component';
import { ProductComponent } from './product/product.component';
import { ProductdataComponent } from './productdata/productdata.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [SellerAuthGuard],
  },

  {
    path: 'product',
    component: ProductComponent,
  },

  {
    path: 'productdata',
    component: ProductdataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
