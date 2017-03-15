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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var auth_service_1 = require('../../user/auth.service');
var app_config_1 = require('../../app.config');
var TripService = (function () {
    function TripService(http, authService, config) {
        this.http = http;
        this.authService = authService;
        this.config = config;
        this.dashboardShowRequests = true;
    }
    TripService.prototype.searchTrips = function (from, to, date) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.config.apiEndpoint + "/search_trips?from_location=" + from + "&to_location=" + to + "&date=" + date, options)
            .do(function (resp) {
            if (resp) {
                // Set the cached key
                _this.cached = from + to + date;
                // Cache the trips into the foundTrips variable
                _this.foundTrips = JSON.parse(resp._body).results;
            }
        }).catch(function (err) {
            return Rx_1.Observable.of([false, false]);
        });
    };
    TripService.prototype.setFoundTrips = function (trips) {
        this.foundTrips = trips;
    };
    TripService.prototype.getFoundTrips = function () {
        return this.foundTrips;
    };
    TripService.prototype.createTrip = function (tripValues) {
        if (this.authService.currentUser.auth_token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', this.authService.currentUser.auth_token);
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.config.apiEndpoint + "/create_trip\n\t\t\t\t?driver=" + this.authService.currentUser.id + "\n\t\t\t\t&date=" + (tripValues.date / 1000).toString() + "\n\t\t\t\t&spaces=" + tripValues.numPassengers + "\n\t\t\t\t&price=" + tripValues.price + "\n\t\t\t\t&from_country=" + tripValues.fromLocation.fromCountry.toLocaleLowerCase() + "\n\t\t\t\t&from_state=" + tripValues.fromLocation.fromState.toLocaleLowerCase() + "\n\t\t\t\t&from_city=" + tripValues.fromLocation.fromCity.toLocaleLowerCase() + "\n\t\t\t\t&from_metadata=" + tripValues.fromLocation.fromMetadata + "\n\t\t\t\t&to_country=" + tripValues.toLocation.toCountry.toLocaleLowerCase() + "\n\t\t\t\t&to_state=" + tripValues.toLocation.toState.toLocaleLowerCase() + "\n\t\t\t\t&to_city=" + tripValues.toLocation.toCity.toLocaleLowerCase() + "\n\t\t\t\t&to_metadata=" + tripValues.toLocation.toMetadata + "\n\t\t\t\t&trip_details=" + tripValues.tripDetails, options, { headers: headers })
                .do(function (resp) {
                console.log("the resp after creating was: ", resp);
            }).catch(this.handleError);
        }
    };
    TripService.prototype.cancelTrip = function (id) {
        if (this.authService.currentUser.auth_token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', this.authService.currentUser.auth_token);
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.config.apiEndpoint + "/delete_trip?trip_id=" + id, options, { headers: headers })
                .do(function (resp) {
                console.log("The trip was successfully cancelled and the resposne was: ", resp);
            }).catch(this.handleError);
        }
    };
    TripService.prototype.getTripListing = function (id) {
        if (this.authService.currentUser.auth_token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', this.authService.currentUser.auth_token);
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.config.apiEndpoint + "/get_trip_listing?trip_id=" + id, options, { headers: headers });
        }
    };
    TripService.prototype.getTrip = function (id) {
        var headers = new http_1.Headers();
        var options = new http_1.RequestOptions();
        return this.http.post(this.config.apiEndpoint + "/get_trip?trip_id=" + id, options)
            .do(function (resp) {
            console.log("Get trip response: ", resp);
        });
    };
    TripService.prototype.requestRide = function (trip_id) {
        if (this.authService.currentUser.auth_token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', this.authService.currentUser.auth_token);
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.config.apiEndpoint + "/request_trip?trip_id=" + trip_id + "&user_id=" + this.authService.currentUser.id, options, { headers: headers });
        }
        else {
            return Rx_1.Observable.of(false);
        }
    };
    TripService.prototype.cancelTripRequest = function (trip_id) {
        if (this.authService.currentUser.auth_token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', this.authService.currentUser.auth_token);
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.config.apiEndpoint + "/cancel_request?trip_id=" + trip_id, options, { headers: headers });
        }
        else {
            return Rx_1.Observable.of(false);
        }
    };
    TripService.prototype.acceptRequest = function (trip_id, user_id) {
        if (this.authService.currentUser.auth_token) {
            var headers = new http_1.Headers();
            headers.append('Authorization', this.authService.currentUser.auth_token);
            var options = new http_1.RequestOptions({ headers: headers });
            return this.http.post(this.config.apiEndpoint + "/accept_request?trip_id=" + trip_id + "&user_id=" + user_id, options, { headers: headers })
                .do(function (resp) {
                console.log("the resp after accepting the request was: ", resp);
            }).catch(this.handleError);
        }
    };
    TripService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var err = JSON.parse(error._body);
        var errMsg;
        console.log("error handling", err);
        if (err.status == "error") {
            errMsg = err.message;
        }
        // if (error instanceof Response) {
        //   const body = error.json() || '';
        //   const err = body.error || JSON.stringify(body);
        //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        // } else {
        //   errMsg = error.message ? error.message : error.toString();
        // }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    TripService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(app_config_1.APP_CONFIG)), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, Object])
    ], TripService);
    return TripService;
}());
exports.TripService = TripService;
var RETURNED_TRIPS = [
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
];
//# sourceMappingURL=trip.service.js.map