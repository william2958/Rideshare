import { Component, OnInit } from '@angular/core';
import { ITrip } from '../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../index';

@Component({
	templateUrl: 'app/trip/findtrip/findtrip.component.html',
	styleUrls: ['app/trip/findtrip/findtrip.component.css']
})

export class FindTripComponent implements OnInit {
	trips: any[];

	// Variables for sorting, default is by spots
	sortByOption: string;
	time: string = "time";
	price: string = "price";
	spots: string = "spots";

	// Variables for searching
	fromLocation: string;
	toLocation: string;
	date: string;

	// For organizing the trips by date
	searchDate: any;
	defaultDate: string;
	defaultMonth: string;
	todays_trips: any[] = [];
	future_trips: any[] = [];
	yesterday_trips: any[] = [];

	constructor (
		private route: ActivatedRoute, 
		private tripService: TripService, 
		private router: Router
	) {}

	ngOnInit() {
		var parameters = <any>this.route.params

		if (this.tripService.cached != parameters.value['from']+parameters.value['to']+parameters.value['date'].toString()) {
			this.trips = JSON.parse(this.route.snapshot.data['trips']._body).results;
		} else {
			this.trips = this.tripService.getFoundTrips();
		}

		// Set up the default values
		this.fromLocation = parameters.value['from'];
		this.toLocation = parameters.value['to'];
		this.sortTrips(parameters.value['date']);

		console.log("returned trips are: ", this.trips);
		// Sort by spots initially
		this.sortByOption = 'spots';
		this.reSort();
	}

	reSort() {
		if (this.trips) {
			if (this.sortByOption == 'spots') {
				this.todays_trips.sort(sortBySpots);
				this.yesterday_trips.sort(sortBySpots);
				this.future_trips.sort(sortBySpots);
			} else if (this.sortByOption == 'time') {
				this.todays_trips.sort(sortByTime);
				this.yesterday_trips.sort(sortByTime);
				this.future_trips.sort(sortByTime);
			} else if (this.sortByOption == 'price') {
				this.todays_trips.sort(sortByPrice);
				this.yesterday_trips.sort(sortByPrice);
				this.future_trips.sort(sortByPrice);
			} 
		}
	}

	search(formValues) {
		console.log(formValues);
		console.log("Date 2 is: ", formValues.date);
		let date:Date = new Date(formValues.date);
		console.log(date.getTime());
		var epochDate = date.getTime().toString();
		if (this.tripService.cached != formValues.fromLocation+formValues.toLocation+date) {
			// Get New data
			this.router.navigate(['/', 'trip', 'searchtrips', formValues.fromLocation, formValues.toLocation, epochDate]);
			console.log("Getting fresh data");
			this.tripService.searchTrips(formValues.fromLocation, formValues.toLocation, epochDate).subscribe(
				(data: any) => {
					this.trips = JSON.parse(data._body).results;
					this.sortTrips(epochDate);
				}, (err) => {
					console.log("Could not find trips");
				}
			)
		} else {
			// Fetching Cached Data
			console.log("Fetching Cached Data");
			this.trips = this.tripService.getFoundTrips();
		}
		
	}

	sortTrips(date?: any) {

		// If we pass in a date, say from the search, then reset the searchDate to the proper value
		// The value passed in here is either from this.search(), where the date is fetched from the form
		// and turned into epoch time. It can also come directly from the url parameters, which is also 
		// in epoch time.
		var dateEpoch = date
		// Add 86400000 for a day in milliseconds
		// This is because for some reason javascript has base 0 dates
		this.searchDate = new Date(parseInt(dateEpoch)+86400000);

		// Set the default values so that the date field will be already filled in
		var defaultYear = this.searchDate.getFullYear().toString();
		// If less than 10 append a zero to the start
		if (this.searchDate.getMonth() < 10) {
			// Because months are 0 based too for some reason
			this.defaultMonth = `0${this.searchDate.getMonth()+1}`
		} else {
			this.defaultMonth = (this.searchDate.getMonth()+1).toString();
		}
		// If less than 10 append a zero to the start
		if (this.searchDate.getDate() < 10) {
			this.defaultDate = `0${this.searchDate.getDate()}`
		} else {
			this.defaultDate = (this.searchDate.getDate()).toString();
		}
		
		// This is for the default date in the date picker on the findtrip form
		this.date = `${defaultYear}-${this.defaultMonth}-${this.defaultDate}`;

		// Reset all these variables
		this.todays_trips = [];
		this.future_trips = [];
		this.yesterday_trips = [];

		// Run through all the trips given
		for(let trip of this.trips) {
			// Get the date from the trip (stored in epoch time)
			let dateEpoch = trip.date;
			// Get the time of it, multiply by 1000 because javascript like milliseconds
			// And the date sent from rails is in seconds
			let time = new Date(dateEpoch*1000);
			// Get the date and the month
			let date = (time.getDate());
			let month = (time.getMonth()+1);
			// Start sorting the trips into today, tomorrow, and yesterday
			if (date == parseInt(this.defaultDate)) {
				// If the trip's today
				this.todays_trips.push(trip);
			} else if ((date < parseInt(this.defaultDate) && month == parseInt(this.defaultMonth)) || (month < parseInt(this.defaultMonth))) {
				// If the trip's before today
				this.yesterday_trips.push(trip);
			} else if ((date > parseInt(this.defaultDate) && month == parseInt(this.defaultMonth)) || (month > parseInt(this.defaultMonth))) {
				// If the trip's after today
				this.future_trips.push(trip);
			}
		}
		console.log("Trips on today: ", this.todays_trips);
		console.log("Tomorrow's trips: ", this.future_trips);
		console.log("Trips before today: ", this.yesterday_trips);
	}

}


// These sorting functions expect a function in which two parameters can be passed
// in, and you must return either a positive, negative, or zero value in
// response to the two parameters given.
// positive: switch
// zero: keep the same
// negative: keep the samea

function sortBySpots(trip1: any, trip2: any) {
	if (trip1.spaces < trip2.spaces) return 1
	else if (trip1.spaces === trip2.spaces) return 0
	else return -1
}

function sortByPrice(trip1: any, trip2: any) {
	if (trip1.price > trip2.price) return 1
	else if (trip1.price === trip2.price) return 0
	else return -1
}

function sortByTime(trip1: any, trip2: any) {
	if (trip1.date > trip2.date) return 1
	else if (trip1.date === trip2.date) return 0
	else return -1
}








