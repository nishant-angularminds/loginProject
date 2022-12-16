import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAuthGuard } from '../login-auth.guard';

const routes: Routes = [{ path:'',redirectTo:'login', pathMatch:'full' },

{

  path:'login',
  component:LoginComponent
},

{
  path:'register',
  component:RegisterComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
