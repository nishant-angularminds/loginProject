import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { UserComponent } from './user/user.component';
import { HomeModule } from '../home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    CompanyComponent,
    UserComponent
      ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CompanyModule { }
