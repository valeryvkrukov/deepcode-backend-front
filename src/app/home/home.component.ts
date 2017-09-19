import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as Moment from 'moment';

import { User } from '../_models/user';
import { ApiService } from '../_services/api.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private loading: boolean = true;
	private users: User[];
	private momentInst;

	constructor(private router: Router, private apiService: ApiService, private modalService: NgbModal) { }

	ngOnInit() {
		this.momentInst = Moment;
		this.loading = true;
		this.apiService.getData('/account').subscribe((users: User[]) => this.users = users, error => {
			console.log(error);
		}, () => {
			this.loading = false;
		});
	}

	delete(id: number) {
		const modalRef = this.modalService.open(ConfirmationModalComponent)
		modalRef.componentInstance.title = 'Confirm your action';
		modalRef.componentInstance.confirmationText = 'Are you sure?';
		modalRef.componentInstance.yesBtn = 'Delete';
		modalRef.componentInstance.noBtn = 'Cancel';
		modalRef.result.then((result) => {
			if (result == true) {
				this.loading = true;
				this.apiService.deleteData('/account/' + id).subscribe((users: User[]) => this.users = users, error => {
					console.log(error);
					if (error.status === 401) {
						this.router.navigate(['/login']);
					}
				}, () => {
					this.loading = false;
				});
			}
		}, (reason) => {
			console.log('reason' + reason);
		});
	}

	formatDate(datetime: Date) {
		return Moment(datetime).format('MMM DD, YYYY hh:mm:ss A');
	}

}
