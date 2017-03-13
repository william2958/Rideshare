import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
	templateUrl: 'app/landing/landing.component.html',
	styleUrls: ['app/landing/landing.component.css']
})

export class LandingComponent implements OnInit {

	constructor (private authService: AuthService, private router: Router) {}

	ngOnInit() {
	}

	search(formValues) {
		console.log(formValues.fromLocation);
		console.log(formValues.toLocation);
		this.router.navigate(['trip', 'searchtrips', formValues.fromLocation, formValues.toLocation, formValues.date]);
	}

	cancel() {
		// console.log(this.containerEl)
		
	}

}