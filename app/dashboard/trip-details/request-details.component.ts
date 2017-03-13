import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../trip/index';
import { TripService } from '../../trip/index';
import { ActivatedRoute } from '@angular/router';

@Component ({
	templateUrl: 'app/dashboard/trip-details/request-details.component.html'
})

export class RequestDetailsComponent implements OnInit {

	trip: ITrip;

	constructor (
		private tripService: TripService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.trip = this.route.snapshot.data['trip'];
	}

}