import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	private isLoggedIn: boolean;
	private currentUser;

	constructor() { }

	ngOnInit() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser) {
			this.currentUser = currentUser;
			this.isLoggedIn = true;
		} else {
			this.currentUser = null;
			this.isLoggedIn = false;
		}
	}

}
