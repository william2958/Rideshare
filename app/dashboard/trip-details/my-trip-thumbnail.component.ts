import { Component, Input } from '@angular/core';
import { ITrip } from '../../trip/index';

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

}