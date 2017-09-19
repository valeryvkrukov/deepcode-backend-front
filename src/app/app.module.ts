import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppConfiguration } from './app.configuration';
import { ApiAuthGuard } from './api-auth.guard';
import { ApiService, ApiInterceptor } from './_services/api.service';
import { AuthenticationService } from './_services/authentication.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

import { EqualValidator } from './_directives/equal-validator';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { CardFormComponent } from './card-form/card-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent,
    EqualValidator,
    NavbarComponent,
    AccountDetailsComponent,
    ConfirmationModalComponent,
    CardFormComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule
  ],
  providers: [
  	AppConfiguration,
  	ApiAuthGuard,
  	{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  	AuthenticationService,
  	ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
