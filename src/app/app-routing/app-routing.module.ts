import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { AccountComponent } from '../account/account.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { ApiAuthGuard } from '../api-auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
	{ path: '', component: HomeComponent, canActivate: [ ApiAuthGuard ] },
	{ path: 'account', component: AccountComponent, canActivate: [ ApiAuthGuard ] },
    { path: 'account/:id', component: AccountDetailsComponent, canActivate: [ ApiAuthGuard ] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes/*, { enableTracing: true }*/)
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }
