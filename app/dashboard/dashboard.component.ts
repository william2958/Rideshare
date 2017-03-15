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
	requests: boolean = this.tripService.dashboardShowRequests;
	auth_token: string;

	trips_accepted: any[];
	trips_requested: any[];
	trips_listed: any[];

	constructor(
		private authService: AuthService,
		private navbarService: NavBarService,
		private tripService: TripService,
		private cookieService: CookieService
	) {}

	ngOnInit() {
		// If there is cached data, don't send another request to get the trips
		if (!this.authService.cached_user_trips) {
			this.user = this.authService.currentUser;
			this.authService.getTrips().subscribe(resp => {
				let trips = JSON.parse(resp._body);
				console.log('resp is:' ,JSON.parse(resp._body))
				this.trips_accepted = trips.trip_accepted;
				this.trips_requested = trips.trips_requested;
				this.trips_listed = trips.trips_listed;
				console.log("Trips accepted are: ", this.trips_accepted);
				console.log("Trips requested are: ", this.trips_requested);
				console.log("Trips listed are: ", this.trips_listed);
			});
		} else {
			console.log("There was cached trips and so no http request was sent")
			this.user = this.authService.currentUser;
			let response = <any>this.authService.getTrips();
			let trips = response;
			console.log('resp is:' , trips)
			this.trips_accepted = trips.trip_accepted;
			this.trips_requested = trips.trips_requested;
			this.trips_listed = trips.trips_listed;
		}
				
		// 	}
		// });
		// this.user = this.authService.currentUser;
		console.log("Trips: ", this.trips_listed);
		this.auth_token = this.cookieService.get("auth_token");
	}

	cancelRequest(event) {
		// Call tripService's cancel Request here
		console.log("Outputted event is: ", event);
		this.tripService.cancelTripRequest(event.id).subscribe(
			(data) => {
				if (data) {
					let response = JSON.parse(data._body);
					console.log("response is: ", response);
					if (response.status == "success") {
						console.log("It was a successful delete")
						console.log("Index of event is: ", this.trips_requested.indexOf(event))
						this.trips_requested.splice(this.trips_requested.indexOf(event), 1)
						console.log("After removing request, trip requested array is: ", this.trips_requested)

					}
				}
			}, (err) => {
				console.log("There was an error cancelling the trip request and the error is: ", err);
			}
		);
	}

	login() {
		this.authService.loginUser('william2958@gmail.com', 'password').subscribe();
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