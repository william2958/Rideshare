import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../common/jQuery.service';
import { NavBarService } from './navbar.service';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

@Component({
	selector: 'nav-bar',
	templateUrl: 'app/nav/navbar.component.html',
	styleUrls: ['app/nav/navbar.component.css']
})

export class NavBarComponent implements OnInit{

	// An object to store the current user
	currentUser;
	// This shows a message if the user tries to sign in and enters incorrect info
	loginInvalid = false;
	@ViewChild('loginModal') loginEl: any;
	@ViewChild('loginGuardModal') loginGuardEl: any;

	// Boolean to show and hide the login modal
	showLoginModal: boolean;

	constructor (
		private auth:AuthService, 
		private router: Router, 
		private navbarService: NavBarService,
		@Inject(JQ_TOKEN) private $: any,
		@Inject(TOASTR_TOKEN) private toastr: Toastr
	){}

	ngOnInit() {
		this.currentUser = this.auth.getUser();

		// This makes the service listen to when other components want to show the login modal
		this.navbarService.showLogin.subscribe((newValue: boolean) => {
			this.showLoginModal = newValue;
			console.log("Login guard element is: ", this.loginGuardEl)
			this.$ ( this.loginGuardEl.containerEl.nativeElement ).modal('show');
		});

		this.navbarService.updateNav.subscribe((newValue: boolean) => {
			this.currentUser = this.auth.getUser();
			console.log("Updating navbar...");
		})
	}

	login(formValues) {
		this.auth.loginUser(formValues.userName, formValues.password)
			.subscribe(resp => {
				if(resp) {
					this.$ ( this.loginEl.containerEl.nativeElement ).modal('hide');
					this.$ ( this.loginGuardEl.containerEl.nativeElement ).modal('hide');
					
					this.showLoginModal = false;
					this.currentUser = this.auth.getUser();
				} else {
					this.loginInvalid = true;
				}
			})
	}

	logout() {
		this.auth.logout();
		this.currentUser = null;
		this.toastr.success("Logged Out");
	}

	cancel() {
		this.$ ( this.loginEl.containerEl.nativeElement ).modal('hide');
		this.$ ( this.loginGuardEl.containerEl.nativeElement ).modal('hide');
	}

	// if (this.showLoginModal) {
	// 	this.$ ( this.loginEl.loginEl.nativeElement ).modal('show');
	// }
	

}