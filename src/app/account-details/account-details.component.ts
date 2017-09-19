import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as Moment from 'moment';
import 'rxjs/add/operator/switchMap';

import { ApiService } from '../_services/api.service';
import { User } from '../_models/user';
import { Card } from '../_models/card';
import { Account } from '../_models/account';
import { Transaction } from '../_models/transaction';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  providers: [NgbDatepickerConfig]
})
export class AccountDetailsComponent implements OnInit {
	private loading: boolean;
	private user: User;
	private cards: Card[];
	private transactions: Transaction[];
	private account: Account;
	private transactionsFilter: any;
	private isEditMode: boolean = false;
	private cardEditMode: boolean = false;
	private cardAddMode: boolean = false;

	constructor(
		private route: ActivatedRoute, 
		private router: Router, 
		private apiService: ApiService, 
		private modalService: NgbModal,
		config: NgbDatepickerConfig
	) {
		config.minDate = {year: 1990, month: 1, day: 1};
	}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.loading = true;
		this.apiService.getData('/account/' + id).subscribe((user: User) => this.user = user, error => {
			if (error.status === 401) {
				this.router.navigate(['/login']);
			}
		}, () => {
			this.account = {
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				username: this.user.username,
				email: this.user.email,
				enabled: this.user.enabled
			};
			this.transactionsFilter = {};
			this.loading = false;
		});
	}

	edit() {
		this.isEditMode = true;
	}

	update(id: number, model: Account, isValid: boolean) {
		if (isValid) {
			this.loading = true;
			this.apiService.putData('/account/' + id, model).subscribe((user: User) => this.user = user, error => {
				if (error.status === 401) {
					this.router.navigate(['/login']);
				}
			}, () => {
				this.account = {
					firstName: this.user.firstName,
					lastName: this.user.lastName,
					username: this.user.username,
					email: this.user.email,
					enabled: this.user.enabled
				};
				this.loading = false;
				this.isEditMode = false;
			});
		}
	}

	onCardCancel() {
		this.cardEditMode = false;
		this.cardAddMode = false;
	}

	onCardSubmit(cards: Card[]) {
		this.user.cards = cards;
		this.cardEditMode = false;
		this.cardAddMode = false;
	}

	addCreditCard() {
		this.cardAddMode = true;
		this.cardEditMode = false;
	}

	editCreditCard(userId: number, card: any) {
		this.cardEditMode = true;
		this.cardAddMode = false;
	}

	deleteCreditCard(userId: number, cardId: number) {
		const modalRef = this.modalService.open(ConfirmationModalComponent)
		modalRef.componentInstance.title = 'Confirm your action';
		modalRef.componentInstance.confirmationText = 'Are you sure?';
		modalRef.componentInstance.yesBtn = 'Delete';
		modalRef.componentInstance.noBtn = 'Cancel';
		modalRef.result.then((result) => {
			if (result == true) {
				this.loading = true;
				this.apiService
					.deleteData('/account/' + userId + '/card/' + cardId)
					.subscribe((cards: Card[]) => this.cards = cards, error => {
						if (error.status === 401) {
							this.router.navigate(['/login']);
						}
					}, () => {
						this.user.cards = this.cards;
						this.loading = false;
					});
			}
		}, (reason) => {
			console.log('reason: ' + reason);
		});
	}

	filterCardTransactions(userId: number, cardId: number, el: number)
	{
		this.apiService
			.postData('/account/' + userId + '/card/' + cardId + '/transactions', {
				'filters': this.transactionsFilter
			})
			.subscribe((transactions: Transaction[]) => this.transactions = transactions, error => {
				console.log(error);
				if (error.status === 401) {
					this.router.navigate(['/login']);
				}
			}, () => {
				this.user.cards[el].transactions = this.transactions;
			});
	}

	formatCreditCard(number: string) {
		return number.replace(/(.{4})/g, '$1-').replace(/-$/, '');
	}

	formatDate(datetime: Date) {
		return Moment(datetime).format('MMM DD, YYYY hh:mm:ss A');
	}

}
