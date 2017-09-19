import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../_services/api.service';
import { Account } from '../_models/account';
import { EqualValidator } from '../_directives/equal-validator';

export interface ApiResponse {
	status: string;
	message: string;
	params?: any[];
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	public account: Account;

	constructor(private router: Router, private apiService: ApiService) { }

	save(model: Account, isValid: boolean) {
		if (isValid) {
			this.apiService.postData('/account', model)
				.subscribe((resp: ApiResponse) => {
					if (resp.status == 'ok') {
						this.router.navigate(['/']);
					}
				}, error => {
					console.log(error);
					if (error.status === 401) {
						this.router.navigate(['/login']);
					}
				});
		}
	}

	ngOnInit() {
		this.account = {
			username: '',
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			passwordConfirm: ''
		};
	}

}
