import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustAuthGuard, CustProfileAuth } from './services/cust-auth.guard';
import { AddresslistComponent } from './shophome/addresslist/addresslist.component';
import { CustomerprofileComponent } from './shophome/customerprofile/customerprofile.component';
import { ShophomeComponent } from './shophome/shophome.component';
import { ShoppingComponent } from './shopping.component';
import { ProductdetailsComponent } from './shophome/productdetails/productdetails.component';
import { CartlistComponent } from './shophome/cartlist/cartlist.component';
import { PaymentComponent } from './shophome/payment/payment.component';
import { OrderComponent } from './shophome/order/order.component';
import { OrderHistoryComponent } from './shophome/order-history/order-history.component';
import { ShopappComponent } from '../layouts/shop/shopapp/shopapp.component';
import { ShopauthComponent } from '../layouts/shop/shopauth/shopauth.component';

const routes: Routes = [
  {
    path: '',
    component: ShopappComponent,
    children: [

      { path: '', loadChildren: () => import('./shophome/shophome.module').then(m => m.ShophomeModule) },

    ],
  },
  {
    path: 'auth',
    component: ShopauthComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [CustAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
