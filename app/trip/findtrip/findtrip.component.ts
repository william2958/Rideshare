import { Component, OnInit } from '@angular/core';
import { ITrip } from '../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../index';

@Component({
	templateUrl: 'app/trip/findtrip/findtrip.component.html'
})

export class FindTripComponent implements OnInit {
	trips: ITrip[];

	constructor (private route: ActivatedRoute, private tripService: TripService, private router: Router) {}

	ngOnInit() {
		if (!this.tripService.getFoundTrips()) {
			this.trips = this.route.snapshot.data['trips'];
			this.tripService.setFoundTrips(this.trips);
		} else {
			this.trips = this.tripService.getFoundTrips();
		}
	}

	listTrips() {
		console.log(this.tripService.getFoundTrips());
	}

	tripDemo() {
		this.router.navigate(['trip', 'searchtrips', 'from', 'to', 'time', "blah" ])
	}

}