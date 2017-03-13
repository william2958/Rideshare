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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var auth_service_1 = require('../../user/auth.service');
var TripService = (function () {
    function TripService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    TripService.prototype.searchTrips = function (from, to, date) {
        var subject = new Rx_1.Subject();
        setTimeout(function () {
            subject.next(RETURNED_TRIPS);
            subject.complete();
        }, 200);
        return subject;
    };
    TripService.prototype.setFoundTrips = function (trips) {
        this.foundTrips = trips;
    };
    TripService.prototype.getFoundTrips = function () {
        return this.foundTrips;
    };
    TripService.prototype.getTrip = function (id) {
        var subject = new Rx_1.Subject();
        setTimeout(function () {
            subject.next(RETURNED_TRIPS[0]);
            subject.complete();
        }, 200);
        return subject;
    };
    TripService.prototype.requestRide = function (trip) {
        console.log(trip.id, this.authService.currentUser);
    };
    TripService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
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