import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ITrip } from '../../index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../user/auth.service';
import { TripService } from '../../index'
import { JQ_TOKEN } from '../../../common/jQuery.service';

@Component ({
	templateUrl: 'app/trip/findtrip/trip-details/trip-details.component.html'
})

export class TripDetailsComponent implements OnInit {

	trip: any; 
	errorMessage: string;
	requestsRemaining: number;

	@ViewChild('confirmModal') containerEl: any;

	constructor (
		private route: ActivatedRoute, 
		private router: Router,
		private authService: AuthService,
		private tripService: TripService,
		@Inject(JQ_TOKEN) private $: any
	) {}

	ngOnInit() {
		console.log("Getting trip");
		this.trip = this.route.snapshot.data['trip'];
		this.trip = JSON.parse(this.trip._body).trip
		this.requestsRemaining = 5 - this.authService.currentUser.trips_requested.length
	}

	requestRide() {
		// this.tripService.requestRide(this.trip);
		// commented for testing
		if (this.authService.currentUser) {
			this.tripService.requestRide(this.trip.id).subscribe(
				(data) => {
					if (data) {
						if (this.authService.cached_user_trips) {
							// Set the cached to false so that the function can go get 
							// fresh data
							this.authService.cached_user_trips = false;
							this.authService.getTrips().subscribe();
						}
						console.log("The response is: ", data);
						this.$ ( this.containerEl.containerEl.nativeElement ).modal('hide');
					}
				},
				(err) => {
					console.log("Error with requesting ride: ", err);
					this.errorMessage = JSON.parse(err._body).message;
					this.$ ( this.containerEl.containerEl.nativeElement ).modal('hide');
				}
			);
		}
	}

	confirmRequest() {
		this.$ ( this.containerEl.containerEl.nativeElement ).modal('show');
	}

	back() {
		console.log("params: ", this.route.params)
		let parameters = <any>this.route.params;
		this.router.navigate(['trip', 'searchtrips', parameters.value.from, parameters.value.to, parameters.value.date])
	}

}