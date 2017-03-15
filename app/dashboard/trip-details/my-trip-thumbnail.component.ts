import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITrip } from '../../trip/index';
import { Router } from '@angular/router';

@Component({
	selector: 'my-trip-thumbnail',
	templateUrl: 'app/dashboard/trip-details/my-trip-thumbnail.component.html',
	styles: [`
		h6 { border: 1px solid black; }
	`]
})

export class MyTripThumbnailComponent {

	@Input() trip: ITrip;
	@Input() request: boolean;
	@Input() listing: boolean;
	@Output() cancelRequest = new EventEmitter();

	constructor (private router: Router) {

	}

	cancel() {
		this.cancelRequest.emit(this.trip);
	}

	showDetails() {
		if (this.request) {
			this.router.navigate(['dashboard', 'request', this.trip.id]);
		} else {
			this.router.navigate(['dashboard', 'listing', this.trip.id]);
		}
	}

}