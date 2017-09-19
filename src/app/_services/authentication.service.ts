import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfiguration } from '../app.configuration';

export interface ApiResponse {
	token?: string;
	status?: number;
	message?: string;
} 

@Injectable()
export class AuthenticationService {
	public token: string;

	constructor(private http: HttpClient, private _configuration: AppConfiguration) {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.token = currentUser && currentUser.token;
	}

	getToken(): string|boolean {
		return this.token;
	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post(
				this._configuration.getPath('/login_check'), 
				{ _username: username, _password: password }
			).map((response: ApiResponse) => {
				let token = response && response.token;
				if (token) {
					this.token = token;
					localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
					return true;
				}
				return false;
			});
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('currentUser');
	}

}
