import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../_services/api.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Card } from '../_models/card';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
	@Input() customerId: number;
	@Input() creditCard: Card;
	@Input() isNew: boolean;
	@Output() onCardCancel = new EventEmitter<boolean>();
	@Output() onCardSubmit = new EventEmitter<Card[]>();
	private customerCards: Card[];
	private cardEditMode: boolean = false;
	private cardAddMode: boolean = false;

	constructor(private router: Router, private apiService: ApiService, private modalService: NgbModal) { }

	ngOnInit() {
		if (this.isNew) {
			this.creditCard = {
				id: 0,
				card: '',
				cardType: '',
				balance: 0
			};
			this.cardAddMode = true;
		} else {
			this.cardEditMode = true;
		}
	}

	onCancel(cardEditMode: boolean) {
		this.onCardCancel.emit();
	}

	addCreditCard() {
		this.cardAddMode = true;
	}

	editCreditCard(userId: number, card: Card) {
		this.cardEditMode = true;
	}

	updateCreditCard(userId: number, model: Card, isValid: boolean)
	{
		if (isValid) {
			if (this.isNew) {
				this.apiService.postData('/account/' + userId + '/card', model)
					.subscribe((cards: Card[]) => this.customerCards = cards, error => {
						console.log(error);
						if (error.status === 401) {
							this.router.navigate(['/login']);
						}
					}, () => {
						this.onCardSubmit.emit(this.customerCards);
						this.cardAddMode = false;
					});
			} else {
				this.apiService.putData('/account/' + userId + '/card/' + this.creditCard.id, model)
					.subscribe((cards: Card[]) => this.customerCards = cards, error => {
						console.log(error);
						if (error.status === 401) {
							this.router.navigate(['/login']);
						}
					}, () => {
						this.onCardSubmit.emit(this.customerCards);
						this.cardEditMode = false;
					});
			}

		}
	}

	deleteCreditCard(userId: number, cardId: number) {
		const modalRef = this.modalService.open(ConfirmationModalComponent)
		modalRef.componentInstance.title = 'Confirm your action';
		modalRef.componentInstance.confirmationText = 'Are you sure?';
		modalRef.componentInstance.yesBtn = 'Delete';
		modalRef.componentInstance.noBtn = 'Cancel';
		modalRef.result.then((result) => {
			if (result == true) {
				//this.loading = true;
				this.apiService
					.deleteData('/account/' + userId + '/card/' + cardId)
					.subscribe((cards: Card[]) => this.customerCards = cards, error => {
						console.log(error);
						if (error.status === 401) {
							this.router.navigate(['/login']);
						}
					});
			}
		}, (reason) => {
			console.log('reason' + reason);
		});
	}

}
