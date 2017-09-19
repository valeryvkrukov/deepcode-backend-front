import { Component, Input, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
	@Input() title;
	@Input() confirmationText;
	@Input() yesBtn;
	@Input() noBtn;

	constructor(public activeModal: NgbActiveModal) { }

}
