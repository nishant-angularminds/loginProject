import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustAuthGuard, CustProfileAuth } from './services/cust-auth.guard';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping.component';
import { ProductdetailsComponent } from './home/productdetails/productdetails.component';
import { CartlistComponent } from './home/cartlist/cartlist.component';
import { PaymentComponent } from './home/payment/payment.component';
import { OrderComponent } from './home/order/order.component';
import { OrderHistoryComponent } from './home/order-history/order-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cartlist', component: CartlistComponent },

  {
    path: 'payment',
    component: PaymentComponent,
    canActivate:[CustProfileAuth]
  },

  {

    path:'orderHistory',
    component:OrderHistoryComponent,
    canActivate:[CustProfileAuth]

  },

  {
    path: 'order-info',
    component: OrderComponent,
    canActivate:[CustProfileAuth]
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [CustAuthGuard],
  },

  {
    path: 'customer-profile',
    component: CustomerprofileComponent,
    canActivate: [CustProfileAuth],
  },

  {
    path: 'address-list',
    component: AddresslistComponent,
  },
  {
    path: 'product-details',
    component: ProductdetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
