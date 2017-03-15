import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TripService } from '../../index';

@Injectable()
export class TripDetailResolver implements Resolve<any> {

	constructor (private tripService: TripService) {

	}

	resolve(route: ActivatedRouteSnapshot) {
		console.log("Getting a trip detail", route.params['id'])
		return this.tripService.getTrip(route.params['id'])
			.do((resp: any) => {
				console.log("The response from the server is: ", resp)
			});
	}

}