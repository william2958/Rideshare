import { Injectable, Inject } from '@angular/core';
import { IUser } from './user.model';
import { IPublicUser } from './publicuser.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthService {

	currentUser: any = temp_user;

	constructor(
		@Inject(APP_CONFIG) private config: IAppConfig, 
		private http:Http,
		private cookieService: CookieService
	) {}

	loginUser(email: string, password: string) {
		let headers = new Headers({ 'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		let loginInfo = {email: email, password: password};

		return this.http.post(this.config.apiEndpoint + '/sign_in', JSON.stringify(loginInfo), options)
		.do((resp: any) => {
			if (resp) {
				this.currentUser = <IUser>resp.json();
				this.cookieService.put("auth_token", this.currentUser.auth_token);
			}
		}).catch(error => {
			return Observable.of(false);
		})
	}

	getUser() {
		return temp_user;
	}

}

const temp_user:any = {
	id: "idstring",
	first_name: "William",
	last_name: "Huang",
	trips_driving: [
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
	],
	trips_requested: [
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
	],
	past_trips_requested: [
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
	],
	past_trips_driven: [
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
	],
	facebook_link: "facebook.com/william.huang.7737",
	phone_number: "416-555-7485"
}