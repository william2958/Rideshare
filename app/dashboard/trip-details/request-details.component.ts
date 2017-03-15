import { Component, OnInit, Inject } from '@angular/core';
import { ITrip } from '../../trip/index';
import { TripService } from '../../trip/index';
import { ActivatedRoute, Router } from '@angular/router';
import { JQ_TOKEN } from '../../common/jQuery.service';
import { TOASTR_TOKEN, Toastr } from '../../common/toastr.service';
import { AuthService } from '../../user/auth.service'; 

@Component ({
	templateUrl: 'app/dashboard/trip-details/request-details.component.html'
})

export class RequestDetailsComponent implements OnInit {

	trip: any;

	constructor (
		private tripService: TripService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		@Inject(JQ_TOKEN) private $: any,
		@Inject(TOASTR_TOKEN) private toastr: Toastr
	) {}

	ngOnInit() {
		this.trip = this.route.snapshot.data['trip'];
		this.trip = JSON.parse(this.trip._body).trip;
		console.log("The trip details are: ", this.trip);
	}

	cancelRequest() {

		this.tripService.cancelTripRequest(this.trip.id).subscribe(
			(data) => {
				if (data) {
					let response = JSON.parse(data._body);
					console.log("response is: ", response);
					// If there is cached data in the dashboard
					if (this.authService.cached_user_trips) {
						// This runs through the cached items and removes the listing that was just deleted
						for (var i=0; i < this.authService.cached_user_trips_response.trips_requested.length; i++) {
							if (this.authService.cached_user_trips_response.trips_requested[i].id == this.trip.id) {
								this.authService.cached_user_trips_response.trips_requested.splice(i, 1);
								console.log("index was: ", i)
								break;
							}
						}
					}
					this.toastr.success("Trip deleted.");
					this.router.navigate(['/', 'dashboard']);
				}, (err) => {
					this.toastr.error(err);
				}
			}
		);
		
	}

}