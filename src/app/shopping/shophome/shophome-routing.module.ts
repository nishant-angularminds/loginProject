import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustProfileAuth } from '../services/cust-auth.guard';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ShophomeComponent } from './shophome.component';

const routes: Routes = [{ path: '', component: ShophomeComponent },

{ path: 'cartlist', component: CartlistComponent },

{
  path: 'payment',
  component: PaymentComponent,
  canActivate: [CustProfileAuth],
},

{
  path: 'orderHistory',
  component: OrderHistoryComponent,
  canActivate: [CustProfileAuth],
},

{
  path: 'order-info',
  component: OrderComponent,
  canActivate: [CustProfileAuth],
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
  exports: [RouterModule]
})
export class ShophomeRoutingModule { }
