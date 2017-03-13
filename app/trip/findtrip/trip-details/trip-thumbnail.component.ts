import { Component, Input } from '@angular/core';
import { ITrip } from '../../shared/index';

@Component({
	selector: 'trip-thumbnail',
	templateUrl: 'app/trip/findtrip/trip-details/trip-thumbnail.component.html'
})

export class TripThumbnailComponent {

	@Input() trip:ITrip;

}