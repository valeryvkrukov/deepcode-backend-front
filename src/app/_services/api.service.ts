import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppConfiguration } from '../app.configuration';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ApiService {

	constructor(private http: HttpClient, private _configuration: AppConfiguration) { }

	getData(path: string) {
		return this.http.get(this._configuration.getPath(path));
	}

	postData(path: string, data: any) {
		return this.http.post(this._configuration.getPath(path), data);
	}

	putData(path: string, data: any) {
		return this.http.put(this._configuration.getPath(path), data);
	}

	deleteData(path: string) {
		return this.http.delete(this._configuration.getPath(path));
	}

}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor(private router: Router) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		let token = currentUser && currentUser.token;
		if (token) {
			req = req.clone({
				headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
			});
	    } else {
	    	this.router.navigate(['/login']);
	    }
	    return next.handle(req);
	}
}
