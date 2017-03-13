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
var auth_service_1 = require('../../../user/auth.service');
var index_1 = require('../../index');
var TripDetailsComponent = (function () {
    function TripDetailsComponent(route, router, authService, tripService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.tripService = tripService;
    }
    TripDetailsComponent.prototype.ngOnInit = function () {
        this.trip = this.route.snapshot.data['trip'];
    };
    TripDetailsComponent.prototype.requestRide = function () {
        this.tripService.requestRide(this.trip);
        // commented for testing
        // if (this.authService.currentUser) {
        // 	this.tripService.requestRide(this.trip);
        // }
    };
    TripDetailsComponent.prototype.listTrip = function () {
        console.log(this.trip);
    };
    TripDetailsComponent.prototype.back = function () {
        this.router.navigate(['trip', 'searchtrips', 'abc', 'def', 'ghi']);
    };
    TripDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/trip/findtrip/trip-details/trip-details.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService, index_1.TripService])
    ], TripDetailsComponent);
    return TripDetailsComponent;
}());
exports.TripDetailsComponent = TripDetailsComponent;
//# sourceMappingURL=trip-details.component.js.map