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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

// Google Api Login Imports

// const google_clientid =
//   '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
  ],
  exports: [RegisterComponent, LoginComponent],
  providers: [
    ReCaptchaV3Service,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI',
    },

    // {
    //   provide: "SocialAuthServiceConfig",
    //   useValue: {
    //      authLogin: false,
    //      providers: [{
    //       id: GoogleLoginProvider.PROVIDER_ID,
    //       provider: new GoogleLoginProvider(
    //         google_clientid
    //       )
    //      }]
    //   }as SocialAuthServiceConfig
    // }
  ],
})
export class AuthModule {}
