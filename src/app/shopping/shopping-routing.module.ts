import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustAuth, CustProfileAuth } from '../login-auth.guard';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [CustAuth],
  },

  {
    path: 'customerprofile',
    component: CustomerprofileComponent,
    canActivate: [CustProfileAuth],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
