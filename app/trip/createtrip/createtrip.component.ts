import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { ITrip } from '../shared/index';
import { TripService } from '../index';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../../common/jQuery.service';

@Component({
	templateUrl: 'app/trip/createtrip/createtrip.component.html'
})

export class CreateTripComponent {

	fromMetadata = "Western University"
	fromCity = "London"
	fromState = "Ontario"
	fromCountry = "Canada"
	toMetadata = "Western University"
	toCity = "London"
	toState = "Ontario"
	toCountry = "Canada"
	numPassengers = "4"
	date = "April 4"
	price = "20"

	@ViewChild('confirmModal') containerEl: any;

	constructor (
		private tripService: TripService,
		private router: Router,
		private authService: AuthService,
		@Inject(JQ_TOKEN) private $: any
	) {}

	confirm(formValues) {
		this.$ ( this.containerEl.containerEl.nativeElement ).modal('show');
		// console.log(this.containerEl)
		console.log(formValues, this.authService.currentUser);
	}

	create(formValues) {
		console.log(formValues);
	}

	cancel() {
		this.router.navigate(['/']);
	}

}