import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { NavBarService } from '../nav/navbar.service';
import { TripService } from '../trip/index';
import { CookieService } from 'angular2-cookie/core';

@Component({
	templateUrl: 'app/dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit {
	user: any;
	// Show requests or listing boolean
	requests: boolean = true;
	auth_token: string;

	constructor(
		private authService: AuthService,
		private navbarService: NavBarService,
		private tripService: TripService,
		private cookieService: CookieService
	) {}

	ngOnInit() {
		// this.authService.loginUser('william2958@gmail.com', 'password');
		this.user = this.authService.currentUser;
		console.log(this.authService.currentUser)
		this.auth_token = this.cookieService.get("auth_token");
	}

	showLoginMo() {
		this.navbarService.showLoginModal();
	}

	showRequests() {
		this.requests = true;
	}

	showListings() {
		this.requests = false;
	}

}