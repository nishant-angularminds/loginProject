import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SellerAuthGuard } from '../services/seller-auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SellerRAuthGuard } from '../services/seller-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SellerRAuthGuard],
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SellerRAuthGuard],
  },

  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [SellerRAuthGuard],
  },

  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
