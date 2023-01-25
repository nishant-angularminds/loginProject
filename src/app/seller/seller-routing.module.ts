import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerappComponent } from '../layouts/seller/sellerapp/sellerapp.component';
import { SellerauthComponent } from '../layouts/seller/sellerauth/sellerauth.component';
import { SellerComponent } from './seller.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: SellerauthComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },

  {
    path: 'home',
    component: SellerappComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
    ],
  },

  {
    path: 'company',
    component: SellerappComponent,

    children: [
      {

        path:'',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
