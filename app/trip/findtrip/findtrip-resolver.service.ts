import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TripService } from '../index';

@Injectable()
export class FindTripResolver implements Resolve<any> {

	constructor ( private tripService: TripService ) {

	}

	resolve(route: ActivatedRouteSnapshot) {
		return this.tripService.searchTrips(route.params['from'], route.params['to'], route.params['date'])
	}

}