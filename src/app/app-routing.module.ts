import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginAuthGuard, RegisterAuthGuard } from './login-auth.guard';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [RegisterAuthGuard],
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginAuthGuard],
  },
  { path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
