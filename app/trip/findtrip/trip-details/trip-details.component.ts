import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../index';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../user/auth.service';
import { TripService } from '../../index'

@Component ({
	templateUrl: 'app/trip/findtrip/trip-details/trip-details.component.html'
})

export class TripDetailsComponent implements OnInit {

	trip: ITrip;

	constructor (
		private route: ActivatedRoute, 
		private router: Router,
		private authService: AuthService,
		private tripService: TripService
	) {}

	ngOnInit() {
		this.trip = this.route.snapshot.data['trip'];
	}

	requestRide() {
		this.tripService.requestRide(this.trip);
		// commented for testing
		// if (this.authService.currentUser) {
		// 	this.tripService.requestRide(this.trip);
		// }
	}

	listTrip() {
		console.log(this.trip);
	}

	back() {
		this.router.navigate(['trip', 'searchtrips', 'abc', 'def', 'ghi'])
	}

}