import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { UserComponent } from './user/user.component';
import { ShophomeModule } from 'src/app/shopping/shophome/shophome.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CompanyComponent, UserComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ShophomeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class CompanyModule {}
