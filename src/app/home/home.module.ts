import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

@NgModule({
  declarations: [HomeComponent, ProfileComponent, MyProfileComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
