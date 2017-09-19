import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class ApiAuthGuard implements CanActivate {

	constructor(private router: Router) { }

	canActivate() {
		if (localStorage.getItem('currentUser')) {
			return true;
		}
		this.router.navigate(['/login']);
		return false;
	}

	isLoggedIn() {
		return localStorage.getItem('currentUser') ? true : false;
	}
}
