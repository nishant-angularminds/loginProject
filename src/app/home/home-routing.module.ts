import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthGuard } from '../login-auth.guard';
import { HomeComponent } from './home.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {

    path:'',component:ProfileComponent,canActivate:[LoginAuthGuard]

  },
  
  {

    path:'product',component:ProductComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
