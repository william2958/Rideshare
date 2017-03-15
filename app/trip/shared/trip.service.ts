import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ITrip } from './trip.model';
import { Subject, Observable } from 'rxjs/Rx';
import { AuthService } from '../../user/auth.service';
import { APP_CONFIG, IAppConfig } from '../../app.config'; 

@Injectable()
export class TripService {

	foundTrips: any[];
	cached: string;
	dashboardShowRequests: boolean = true;

	constructor (
		private http: Http, 
		private authService: AuthService,
		@Inject(APP_CONFIG) private config: IAppConfig
	) {}

	searchTrips(from: string, to: string, date: Date):Observable<any[]> {
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this.http.post(`${this.config.apiEndpoint}/search_trips?from_location=${from}&to_location=${to}&date=${date}`, options)
			.do((resp: any) => {
				if(resp) {
					// Set the cached key
					this.cached = from+to+date;
					// Cache the trips into the foundTrips variable
					this.foundTrips = JSON.parse(resp._body).results;
				}
			}).catch((err: any) => {
				return Observable.of([false, false]);
			})
	}

	setFoundTrips(trips: ITrip[]) {
		this.foundTrips = trips;
	}

	getFoundTrips() {
		return this.foundTrips;
	}

	createTrip(tripValues: any):Observable<any> {
		if (this.authService.currentUser.auth_token) {
			let headers = new Headers();
			headers.append('Authorization', this.authService.currentUser.auth_token);
			let options = new RequestOptions({headers: headers});

			return this.http.post(
				`${this.config.apiEndpoint}/create_trip
				?driver=${this.authService.currentUser.id}
				&date=${(tripValues.date/1000).toString()}
				&spaces=${tripValues.numPassengers}
				&price=${tripValues.price}
				&from_country=${tripValues.fromLocation.fromCountry.toLocaleLowerCase()}
				&from_state=${tripValues.fromLocation.fromState.toLocaleLowerCase()}
				&from_city=${tripValues.fromLocation.fromCity.toLocaleLowerCase()}
				&from_metadata=${tripValues.fromLocation.fromMetadata}
				&to_country=${tripValues.toLocation.toCountry.toLocaleLowerCase()}
				&to_state=${tripValues.toLocation.toState.toLocaleLowerCase()}
				&to_city=${tripValues.toLocation.toCity.toLocaleLowerCase()}
				&to_metadata=${tripValues.toLocation.toMetadata}
				&trip_details=${tripValues.tripDetails}`
				, options, {headers: headers})
				.do((resp: any) => {
					console.log("the resp after creating was: ", resp);
				}).catch(this.handleError);
		}
	}

	cancelTrip(id: string):Observable<any> {
		if (this.authService.currentUser.auth_token) {
			let headers = new Headers();
			headers.append('Authorization', this.authService.currentUser.auth_token);
			let options = new RequestOptions({headers: headers});

			return this.http.post(`${this.config.apiEndpoint}/delete_trip?trip_id=${id}`, options, {headers: headers})
				.do((resp: any) => {
					console.log("The trip was successfully cancelled and the resposne was: ", resp)
				}).catch(this.handleError);
		}
	}

	getTripListing(id: string):Observable<any> {
		
		if (this.authService.currentUser.auth_token) {
			let headers = new Headers();
			headers.append('Authorization', this.authService.currentUser.auth_token);
			let options = new RequestOptions({headers: headers});

			return this.http.post(`${this.config.apiEndpoint}/get_trip_listing?trip_id=${id}`, options, {headers: headers});
		}
	}

	getTrip(id: string):Observable<any> {
		let headers = new Headers();
		let options = new RequestOptions();

		return this.http.post(`${this.config.apiEndpoint}/get_trip?trip_id=${id}`, options)
			.do((resp:any) => {
				console.log("Get trip response: ", resp);
			});
	}

	requestRide(trip_id: string): Observable<any> {

		if (this.authService.currentUser.auth_token) {

			let headers = new Headers();
			headers.append('Authorization', this.authService.currentUser.auth_token);
			let options = new RequestOptions({headers: headers});

			return this.http.post(`${this.config.apiEndpoint}/request_trip?trip_id=${trip_id}&user_id=${this.authService.currentUser.id}`, options, {headers: headers});
		
		} else {
			return Observable.of(false);
		}

	}

	cancelTripRequest(trip_id: string): Observable<any> {
		if (this.authService.currentUser.auth_token) {

			let headers = new Headers();
			headers.append('Authorization', this.authService.currentUser.auth_token);
			let options = new RequestOptions({headers: headers});

			return this.http.post(`${this.config.apiEndpoint}/cancel_request?trip_id=${trip_id}`, options, {headers: headers});
		
		} else {
			return Observable.of(false);
		}
	}

	acceptRequest(trip_id: string, user_id: string): Observable<any> {
		if (this.authService.currentUser.auth_token) {
			let headers = new Headers();
			headers.append('Authorization', this.authService.currentUser.auth_token);
			let options = new RequestOptions({headers: headers});

			return this.http.post(`${this.config.apiEndpoint}/accept_request?trip_id=${trip_id}&user_id=${user_id}`, options, {headers: headers})
				.do((resp: any) => {
					console.log("the resp after accepting the request was: ", resp);
				}).catch(this.handleError);
		}
	}

	private handleError (error: Response | any) {
	  // In a real world app, you might use a remote logging infrastructure
	  let err = JSON.parse(error._body)
	  let errMsg: string;
	  console.log("error handling", err)
	  if (err.status == "error") {
	  	errMsg = err.message
	  }
	  // if (error instanceof Response) {
	  //   const body = error.json() || '';
	  //   const err = body.error || JSON.stringify(body);
	  //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	  // } else {
	  //   errMsg = error.message ? error.message : error.toString();
	  // }
	  console.error(errMsg);
	  return Observable.throw(errMsg);
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