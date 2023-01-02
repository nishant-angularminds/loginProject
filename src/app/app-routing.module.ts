import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './seller/auth/login/login.component';
import { RegisterComponent } from './seller/auth/register/register.component';
import { LoginAuthGuard, RegisterAuthGuard } from './login-auth.guard';
import { PageNotFoundComponent } from './seller/home/page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: 'seller', pathMatch: 'full' },

  {
    path: 'company',
    loadChildren: () =>
      import('./seller/company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
