import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { ITrip } from '../shared/index';
import { TripService } from '../index';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../../common/jQuery.service';
import { TOASTR_TOKEN, Toastr } from '../../common/toastr.service';

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
	date = '2017-03-15T12:03';
	price = "20"
	tripDetails = "Details"

	@ViewChild('confirmModal') containerEl: any;

	constructor (
		private tripService: TripService,
		private router: Router,
		private authService: AuthService,
		@Inject(JQ_TOKEN) private $: any,
		@Inject(TOASTR_TOKEN) private toastr: Toastr
	) {}

	confirm(formValues) {
		formValues.date = new Date(formValues.date).getTime();
		this.$ ( this.containerEl.containerEl.nativeElement ).modal('show');
	}

	create(formValues) {
		this.tripService.createTrip(formValues)
			.subscribe(
				(data) => {
					if (data) {
						this.$ ( this.containerEl.containerEl.nativeElement ).modal('hide');
						this.toastr.success("Event Created!");
						this.tripService.dashboardShowRequests = false;
						this.authService.cached_user_trips = false;
						this.router.navigate(['/', 'dashboard']);
						console.log("Subscribed create function returns: ", data);
					}
				},
				(err) => {
					this.$ ( this.containerEl.containerEl.nativeElement ).modal('hide');
					this.toastr.error(err)
				}
			);
		console.log("form Values: ", formValues);
	}

	cancel() {
		this.router.navigate(['/']);
	}

}