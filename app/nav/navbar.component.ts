import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../common/jQuery.service';
import { NavBarService } from './navbar.service';

@Component({
	selector: 'nav-bar',
	templateUrl: 'app/nav/navbar.component.html',
	styleUrls: ['app/nav/navbar.component.css']
})

export class NavBarComponent implements OnInit{

	// An object to store the current user
	currentUser = this.auth.getUser();
	// This shows a message if the user tries to sign in and enters incorrect info
	loginInvalid = false;
	@ViewChild('loginModal') containerEl: any;

	// Boolean to show and hide the login modal
	showLoginModal: boolean;

	constructor (
		private auth:AuthService, 
		private router: Router, 
		private navbarService: NavBarService,
		@Inject(JQ_TOKEN) private $: any){}

	ngOnInit() {
		this.navbarService.showLogin.subscribe((newValue: boolean) => {
			this.showLoginModal = newValue;
			console.log("value changed")
			this.$ ( this.containerEl.containerEl.nativeElement ).modal('show');
		});
	}

	login(formValues) {
		this.auth.loginUser(formValues.userName, formValues.password)
			.subscribe(resp => {
				if(resp) {
					console.log("Successful login");
					this.$ ( this.containerEl.containerEl.nativeElement ).modal('hide');
					this.showLoginModal = false;
					this.currentUser = this.auth.getUser();
				} else {
					this.loginInvalid = true;
				}
			})
	}

	cancel() {
		this.$ ( this.containerEl.containerEl.nativeElement ).modal('hide');
	}

	// if (this.showLoginModal) {
	// 	this.$ ( this.containerEl.containerEl.nativeElement ).modal('show');
	// }
	

}