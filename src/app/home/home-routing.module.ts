import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthGuard } from '../login-auth.guard';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {

    path:'',component:ProfileComponent,canActivate:[LoginAuthGuard]

  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
