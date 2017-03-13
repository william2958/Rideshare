import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TripService } from '../../index';

@Injectable()
export class TripDetailResolver implements Resolve<any> {

	constructor (private tripService: TripService) {

	}

	resolve(route: ActivatedRouteSnapshot) {
		return this.tripService.getTrip(route.params['id']);
	}

}