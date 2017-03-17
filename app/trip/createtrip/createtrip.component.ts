import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { ITrip } from '../shared/index';
import { TripService } from '../index';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { JQ_TOKEN } from '../../common/jQuery.service';
import { TOASTR_TOKEN, Toastr } from '../../common/toastr.service';

@Component({
	templateUrl: 'app/trip/createtrip/createtrip.component.html',
	styleUrls: ['app/trip/createtrip/createtrip.component.css']
})

export class CreateTripComponent implements OnInit {
	mouseoverForm: boolean = false;
	createFormError: string;

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

	// Placeholders
	fromDetailsPlaceholder: string;
	fromCityPlaceholder: string;
	fromStatePlaceholder: string;
	fromCountryPlaceholder: string;
	toDetailsPlaceholder: string;
	toCityPlaceholder: string;
	toStatePlaceholder: string;
	toCountryPlaceholder: string;
	numPassengersPlaceholder: string;
	datePlaceholder: string;
	pricePlaceholder: string;
	detailsPlaceholder: string;

	constructor (
		private tripService: TripService,
		private router: Router,
		private authService: AuthService,
		@Inject(JQ_TOKEN) private $: any,
		@Inject(TOASTR_TOKEN) private toastr: Toastr
	) {}

	ngOnInit() {
		this.fromDetailsPlaceholder = "Details";
		this.fromCityPlaceholder = "City";
		this.fromStatePlaceholder = "State";
		this.fromCountryPlaceholder = "Country";
		this.toDetailsPlaceholder = "Details";
		this.toCityPlaceholder = "City";
		this.toStatePlaceholder = "State";
		this.toCountryPlaceholder = "Country";
		this.numPassengersPlaceholder = "Number of Passengers";
		this.datePlaceholder = "Departure Date";
		this.pricePlaceholder = "Price";
		this.detailsPlaceholder = "Additional Information";
	}

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
					this.createFormError = err;
					this.toastr.error(err)
				}
			);
		console.log("form Values: ", formValues);
	}

	cancel() {
		this.router.navigate(['/']);
	}

	checkError(form) {
		if (!form.valid) {
			console.log(form.value)
			if (!form.value.fromLocation.fromMetadata) {
				this.fromDetailsPlaceholder = "Details - Required!";
			}
			if (!form.value.fromLocation.fromCity) {
				this.fromCityPlaceholder = "City - Required!";
			}
			if (!form.value.fromLocation.fromState) {
				this.fromStatePlaceholder = "State - Required!";
			}
			if (!form.value.fromLocation.fromCountry) {
				this.fromCountryPlaceholder = "Country - Required!";
			}
			if (!form.value.toLocation.toMetadata) {
				this.toDetailsPlaceholder = "Details - Required!";
			}
			if (!form.value.toLocation.toCity) {
				this.toCityPlaceholder = "City - Required!";
			}
			if (!form.value.toLocation.toState) {
				this.toStatePlaceholder = "State - Required!";
			}
			if (!form.value.toLocation.toCountry) {
				this.toCountryPlaceholder = "Country - Required!";
			}
			if (!form.value.price) {
				this.pricePlaceholder = "Price - Required!";
			}
			if (!form.value.numPassengers) {
				this.numPassengersPlaceholder = "Number of Passengers - Required!";
			}
			if (!form.value.date) {
				this.datePlaceholder = "Departure Date - Required!";
			}
		} else {
			this.confirm(form.value);
		}
	}

}

















