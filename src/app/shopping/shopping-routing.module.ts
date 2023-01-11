import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustAuthGuard, CustProfileAuth } from './services/cust-auth.guard';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

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

    path:'address-list',
    component:AddresslistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
