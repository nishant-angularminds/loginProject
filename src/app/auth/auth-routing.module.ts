import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAuthGuard } from '../login-auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RegisterAuthGuard]
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterAuthGuard]
    
  },

  {

    path:'reset-password',
    component:ResetPasswordComponent,
    canActivate: [RegisterAuthGuard]

  },

  {
    path:'verify-email',
    component:VerifyEmailComponent
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
