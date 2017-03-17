"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var index_1 = require('../index');
var FindTripComponent = (function () {
    function FindTripComponent(route, tripService, router) {
        this.route = route;
        this.tripService = tripService;
        this.router = router;
        this.time = "time";
        this.price = "price";
        this.spots = "spots";
        this.todays_trips = [];
        this.future_trips = [];
        this.yesterday_trips = [];
    }
    FindTripComponent.prototype.ngOnInit = function () {
        var parameters = this.route.params;
        if (this.tripService.cached != parameters.value['from'] + parameters.value['to'] + parameters.value['date'].toString()) {
            this.trips = JSON.parse(this.route.snapshot.data['trips']._body).results;
        }
        else {
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
    };
    FindTripComponent.prototype.reSort = function () {
        if (this.trips) {
            if (this.sortByOption == 'spots') {
                this.todays_trips.sort(sortBySpots);
                this.yesterday_trips.sort(sortBySpots);
                this.future_trips.sort(sortBySpots);
            }
            else if (this.sortByOption == 'time') {
                this.todays_trips.sort(sortByTime);
                this.yesterday_trips.sort(sortByTime);
                this.future_trips.sort(sortByTime);
            }
            else if (this.sortByOption == 'price') {
                this.todays_trips.sort(sortByPrice);
                this.yesterday_trips.sort(sortByPrice);
                this.future_trips.sort(sortByPrice);
            }
        }
    };
    FindTripComponent.prototype.search = function (formValues) {
        var _this = this;
        console.log(formValues);
        console.log("Date 2 is: ", formValues.date);
        var date = new Date(formValues.date);
        console.log(date.getTime());
        var epochDate = date.getTime().toString();
        if (this.tripService.cached != formValues.fromLocation + formValues.toLocation + date) {
            // Get New data
            this.router.navigate(['/', 'trip', 'searchtrips', formValues.fromLocation, formValues.toLocation, epochDate]);
            console.log("Getting fresh data");
            this.tripService.searchTrips(formValues.fromLocation, formValues.toLocation, epochDate).subscribe(function (data) {
                _this.trips = JSON.parse(data._body).results;
                _this.sortTrips(epochDate);
            }, function (err) {
                console.log("Could not find trips");
            });
        }
        else {
            // Fetching Cached Data
            console.log("Fetching Cached Data");
            this.trips = this.tripService.getFoundTrips();
        }
    };
    FindTripComponent.prototype.sortTrips = function (date) {
        // If we pass in a date, say from the search, then reset the searchDate to the proper value
        // The value passed in here is either from this.search(), where the date is fetched from the form
        // and turned into epoch time. It can also come directly from the url parameters, which is also 
        // in epoch time.
        var dateEpoch = date;
        // Add 86400000 for a day in milliseconds
        // This is because for some reason javascript has base 0 dates
        this.searchDate = new Date(parseInt(dateEpoch) + 86400000);
        // Set the default values so that the date field will be already filled in
        var defaultYear = this.searchDate.getFullYear().toString();
        // If less than 10 append a zero to the start
        if (this.searchDate.getMonth() < 10) {
            // Because months are 0 based too for some reason
            this.defaultMonth = "0" + (this.searchDate.getMonth() + 1);
        }
        else {
            this.defaultMonth = (this.searchDate.getMonth() + 1).toString();
        }
        // If less than 10 append a zero to the start
        if (this.searchDate.getDate() < 10) {
            this.defaultDate = "0" + this.searchDate.getDate();
        }
        else {
            this.defaultDate = (this.searchDate.getDate()).toString();
        }
        // This is for the default date in the date picker on the findtrip form
        this.date = defaultYear + "-" + this.defaultMonth + "-" + this.defaultDate;
        // Reset all these variables
        this.todays_trips = [];
        this.future_trips = [];
        this.yesterday_trips = [];
        // Run through all the trips given
        for (var _i = 0, _a = this.trips; _i < _a.length; _i++) {
            var trip = _a[_i];
            // Get the date from the trip (stored in epoch time)
            var dateEpoch_1 = trip.date;
            // Get the time of it, multiply by 1000 because javascript like milliseconds
            // And the date sent from rails is in seconds
            var time = new Date(dateEpoch_1 * 1000);
            // Get the date and the month
            var date_1 = (time.getDate());
            var month = (time.getMonth() + 1);
            // Start sorting the trips into today, tomorrow, and yesterday
            if (date_1 == parseInt(this.defaultDate)) {
                // If the trip's today
                this.todays_trips.push(trip);
            }
            else if ((date_1 < parseInt(this.defaultDate) && month == parseInt(this.defaultMonth)) || (month < parseInt(this.defaultMonth))) {
                // If the trip's before today
                this.yesterday_trips.push(trip);
            }
            else if ((date_1 > parseInt(this.defaultDate) && month == parseInt(this.defaultMonth)) || (month > parseInt(this.defaultMonth))) {
                // If the trip's after today
                this.future_trips.push(trip);
            }
        }
        console.log("Trips on today: ", this.todays_trips);
        console.log("Tomorrow's trips: ", this.future_trips);
        console.log("Trips before today: ", this.yesterday_trips);
    };
    FindTripComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/trip/findtrip/findtrip.component.html',
            styleUrls: ['app/trip/findtrip/findtrip.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.TripService, router_1.Router])
    ], FindTripComponent);
    return FindTripComponent;
}());
exports.FindTripComponent = FindTripComponent;
// These sorting functions expect a function in which two parameters can be passed
// in, and you must return either a positive, negative, or zero value in
// response to the two parameters given.
// positive: switch
// zero: keep the same
// negative: keep the samea
function sortBySpots(trip1, trip2) {
    if (trip1.spaces < trip2.spaces)
        return 1;
    else if (trip1.spaces === trip2.spaces)
        return 0;
    else
        return -1;
}
function sortByPrice(trip1, trip2) {
    if (trip1.price > trip2.price)
        return 1;
    else if (trip1.price === trip2.price)
        return 0;
    else
        return -1;
}
function sortByTime(trip1, trip2) {
    if (trip1.date > trip2.date)
        return 1;
    else if (trip1.date === trip2.date)
        return 0;
    else
        return -1;
}
//# sourceMappingURL=findtrip.component.js.map