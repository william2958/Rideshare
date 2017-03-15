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
var router_1 = require('@angular/router');
var auth_service_1 = require('../../../user/auth.service');
var index_1 = require('../../index');
var jQuery_service_1 = require('../../../common/jQuery.service');
var TripDetailsComponent = (function () {
    function TripDetailsComponent(route, router, authService, tripService, $) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.tripService = tripService;
        this.$ = $;
    }
    TripDetailsComponent.prototype.ngOnInit = function () {
        console.log("Getting trip");
        this.trip = this.route.snapshot.data['trip'];
        this.trip = JSON.parse(this.trip._body).trip;
        this.requestsRemaining = 5 - this.authService.currentUser.trips_requested.length;
    };
    TripDetailsComponent.prototype.requestRide = function () {
        var _this = this;
        // this.tripService.requestRide(this.trip);
        // commented for testing
        if (this.authService.currentUser) {
            this.tripService.requestRide(this.trip.id).subscribe(function (data) {
                if (data) {
                    if (_this.authService.cached_user_trips) {
                        // Set the cached to false so that the function can go get 
                        // fresh data
                        _this.authService.cached_user_trips = false;
                        _this.authService.getTrips().subscribe();
                    }
                    console.log("The response is: ", data);
                    _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
                }
            }, function (err) {
                console.log("Error with requesting ride: ", err);
                _this.errorMessage = JSON.parse(err._body).message;
                _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
            });
        }
    };
    TripDetailsComponent.prototype.confirmRequest = function () {
        this.$(this.containerEl.containerEl.nativeElement).modal('show');
    };
    TripDetailsComponent.prototype.back = function () {
        console.log("params: ", this.route.params);
        var parameters = this.route.params;
        this.router.navigate(['trip', 'searchtrips', parameters.value.from, parameters.value.to, parameters.value.date]);
    };
    __decorate([
        core_1.ViewChild('confirmModal'), 
        __metadata('design:type', Object)
    ], TripDetailsComponent.prototype, "containerEl", void 0);
    TripDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/trip/findtrip/trip-details/trip-details.component.html'
        }),
        __param(4, core_1.Inject(jQuery_service_1.JQ_TOKEN)), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService, index_1.TripService, Object])
    ], TripDetailsComponent);
    return TripDetailsComponent;
}());
exports.TripDetailsComponent = TripDetailsComponent;
//# sourceMappingURL=trip-details.component.js.map