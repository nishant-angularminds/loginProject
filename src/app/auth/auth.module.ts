import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RecaptchaV3Module
  ],
  exports:[

    RegisterComponent,
    LoginComponent
  ],
  providers:[

    ReCaptchaV3Service,{

      provide:RECAPTCHA_V3_SITE_KEY,
      useValue:"6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI",
    }
  ]
})
export class AuthModule { }
