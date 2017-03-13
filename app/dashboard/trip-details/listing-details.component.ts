import { Component, OnInit } from '@angular/core';
import { ITrip, TripService } from '../../trip/index';
import { ActivatedRoute } from '@angular/router';

@Component ({
	templateUrl: 'app/dashboard/trip-details/listing-details.component.html'
})

export class ListingDetailsComponent implements OnInit {

	trip: ITrip;

	constructor (
		private tripService: TripService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.trip = this.route.snapshot.data['trip'];
	}

}