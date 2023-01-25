import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShophomeRoutingModule } from './shophome-routing.module';
import { ShophomeComponent } from './shophome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ShophomeComponent],
  imports: [CommonModule, ShophomeRoutingModule, ReactiveFormsModule,ComponentsModule],
})
export class ShophomeModule {}
