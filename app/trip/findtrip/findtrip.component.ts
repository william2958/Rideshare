import { Component, OnInit } from '@angular/core';
import { ITrip } from '../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../index';

@Component({
	templateUrl: 'app/trip/findtrip/findtrip.component.html'
})

export class FindTripComponent implements OnInit {
	trips: any[];

	constructor (private route: ActivatedRoute, private tripService: TripService, private router: Router) {}

	ngOnInit() {
		var parameters = <any>this.route.params
		if (this.tripService.cached != parameters.value['from']+parameters.value['to']+parameters.value['date'].toString()) {
			this.trips = JSON.parse(this.route.snapshot.data['trips']._body).results;
		} else {
			this.trips = this.tripService.getFoundTrips();
		}
		console.log("returned trips are: ", this.trips);
	}

	listTrips() {
		console.log(this.tripService.getFoundTrips());
	}

}