import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TripService } from '../index';

@Injectable()
export class FindTripResolver implements Resolve<any> {

	constructor ( private tripService: TripService ) {

	}

	// put :any because there are two different return types
	resolve(route: ActivatedRouteSnapshot) : any {
		if (this.tripService.cached != route.params['from']+route.params['to']+route.params['date']) {
			// Get New data
			console.log("Getting fresh data");
			return this.tripService.searchTrips(route.params['from'], route.params['to'], route.params['date'])
		} else {
			// Fetching Cached Data
			console.log("Fetching Cached Data");
			return this.tripService.getFoundTrips();
		}
		
	}

}