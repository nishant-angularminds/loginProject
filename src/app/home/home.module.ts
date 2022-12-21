import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../grid/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ProfileComponent,HeaderComponent],
  imports: [CommonModule, HomeRoutingModule,FormsModule,ReactiveFormsModule],
  exports:[HeaderComponent]
})
export class HomeModule {}
