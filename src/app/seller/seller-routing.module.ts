import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';

const routes: Routes = [{ path: '',redirectTo:'auth',pathMatch:'full' },
{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
},

{
  path: 'home',
  loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
},

{

  path:'company',
  loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule),

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
