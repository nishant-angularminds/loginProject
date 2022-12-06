import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './home/profile/profile.component';

const routes: Routes = [{ path: 'Auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

{path:'',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'home/profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
