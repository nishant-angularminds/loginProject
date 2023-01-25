import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopappComponent } from './shopapp/shopapp.component';
import { ShopauthComponent } from './shopauth/shopauth.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ShopappComponent,
    ShopauthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ]
})
export class ShopModule { }
