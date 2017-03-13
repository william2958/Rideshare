import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ITrip } from './trip.model';
import { Subject, Observable } from 'rxjs/Rx';
import { AuthService } from '../../user/auth.service';

@Injectable()
export class TripService {

	foundTrips: ITrip[];

	constructor (private http: Http, private authService: AuthService) {}

	searchTrips(from: string, to: string, date: Date):Observable<ITrip[]> {
		let subject = new Subject<ITrip[]>();
		setTimeout(() => {
			subject.next(RETURNED_TRIPS);
			subject.complete();
		}, 200);
		return subject;
	}

	setFoundTrips(trips: ITrip[]) {
		this.foundTrips = trips;
	}

	getFoundTrips() {
		return this.foundTrips;
	}

	getTrip(id: string):Observable<ITrip> {
		let subject = new Subject<ITrip>();
		setTimeout(() => {
			subject.next(RETURNED_TRIPS[0]);
			subject.complete();
		}, 200);
		return subject;
	}

	requestRide(trip: ITrip) {
		console.log(trip.id, this.authService.currentUser);
	}
	
}

const RETURNED_TRIPS: any[] = [
	{
		id: "58bf35b56a48864d1494d88f",
		driver: {
			id: "58bf35996a48864ce84696b1",
			first_name: "Ted",
			last_name: "Mosby"
		},
		date: new Date('4/15/2017'),
		spaces: 2,
		price: 20,
		user_requests: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Lily",
				last_name: "Scherbazky"
			}
		],
		accepted_users: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			}
		],
		location: {
			from: {
				from_country: "Canada",
				from_state: "Ontario",
				from_city: "London",
				from_metadata: "Western University",
				pickup_location: "Anywhere on main campus"
			}, 
			destination: {
				to_country: "Canada",
				to_state: "Ontario",
				to_city: "Toronto",
				to_metadata: "Fairview"
			}
		}
	},
	{
		id: "58bf35b56a48864d1494d88f",
		driver: {
			id: "58bf35996a48864ce84696b1",
			first_name: "Ted",
			last_name: "Mosby"
		},
		date: new Date('4/15/2017'),
		spaces: 2,
		price: 20,
		user_requests: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Lily",
				last_name: "Scherbazky"
			}
		],
		accepted_users: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			}
		],
		location: {
			from: {
				from_country: "Canada",
				from_state: "Ontario",
				from_city: "London",
				from_metadata: "Western University",
				pickup_location: "Anywhere on main campus"
			}, 
			destination: {
				to_country: "Canada",
				to_state: "Ontario",
				to_city: "Toronto",
				to_metadata: "Fairview"
			}
		}
	},
	{
		id: "58bf35b56a48864d1494d88f",
		driver: {
			id: "58bf35996a48864ce84696b1",
			first_name: "Ted",
			last_name: "Mosby"
		},
		date: new Date('4/15/2017'),
		spaces: 2,
		price: 20,
		user_requests: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Lily",
				last_name: "Scherbazky"
			}
		],
		accepted_users: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			}
		],
		location: {
			from: {
				from_country: "Canada",
				from_state: "Ontario",
				from_city: "London",
				from_metadata: "Western University",
				pickup_location: "Anywhere on main campus"
			}, 
			destination: {
				to_country: "Canada",
				to_state: "Ontario",
				to_city: "Toronto",
				to_metadata: "Fairview"
			}
		}
	},
	{
		id: "58bf35b56a48864d1494d88f",
		driver: {
			id: "58bf35996a48864ce84696b1",
			first_name: "Ted",
			last_name: "Mosby"
		},
		date: new Date('4/15/2017'),
		spaces: 2,
		price: 20,
		user_requests: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Lily",
				last_name: "Scherbazky"
			}
		],
		accepted_users: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			}
		],
		location: {
			from: {
				from_country: "Canada",
				from_state: "Ontario",
				from_city: "London",
				from_metadata: "Western University",
				pickup_location: "Anywhere on main campus"
			}, 
			destination: {
				to_country: "Canada",
				to_state: "Ontario",
				to_city: "Toronto",
				to_metadata: "Fairview"
			}
		}
	},
	{
		id: "58bf35b56a48864d1494d88f",
		driver: {
			id: "58bf35996a48864ce84696b1",
			first_name: "Ted",
			last_name: "Mosby"
		},
		date: new Date('4/15/2017'),
		spaces: 2,
		price: 20,
		user_requests: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Lily",
				last_name: "Scherbazky"
			}
		],
		accepted_users: [
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Robin",
				last_name: "Scherbazky"
			},
			{
				id: "58bf35996a48864ce84696b1",
				first_name: "Marshall",
				last_name: "Scherbazky"
			}
		],
		location: {
			from: {
				from_country: "Canada",
				from_state: "Ontario",
				from_city: "London",
				from_metadata: "Western University",
				pickup_location: "Anywhere on main campus"
			}, 
			destination: {
				to_country: "Canada",
				to_state: "Ontario",
				to_city: "Toronto",
				to_metadata: "Fairview"
			}
		}
	}
]