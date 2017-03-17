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
var navbar_service_1 = require('../../../nav/navbar.service');
var toastr_service_1 = require('../../../common/toastr.service');
var TripDetailsComponent = (function () {
    function TripDetailsComponent(route, router, authService, tripService, navbarService, $, toastr) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.tripService = tripService;
        this.navbarService = navbarService;
        this.$ = $;
        this.toastr = toastr;
    }
    TripDetailsComponent.prototype.ngOnInit = function () {
        console.log("Getting trip");
        this.trip = this.route.snapshot.data['trip'];
        console.log("Trip is: ", this.trip);
        var body = JSON.parse(this.trip._body);
        this.trip = body.trip;
        this.driver = body.driver;
        console.log("Driver: ", this.driver);
        var dateEpoch = this.trip.date;
        this.time = new Date(dateEpoch * 1000);
        this.hours = this.time.getHours();
        this.minutes = this.time.getMinutes();
        console.log("minutes: ", this.minutes);
        // Filter the hours so it displays properly
        if (this.hours == 0) {
            this.hours = 12;
        }
        if (this.minutes < 10) {
            this.minutes = "0" + this.minutes;
        }
        if (this.hours > 12) {
            this.hours = this.hours - 12;
            this.pm = "PM";
        }
        else {
            this.pm = "AM";
        }
        console.log(this.trip);
    };
    TripDetailsComponent.prototype.requestRide = function () {
        var _this = this;
        this.tripService.requestRide(this.trip.id).subscribe(function (data) {
            if (data) {
                if (_this.authService.cached_user_trips) {
                    // Set the cached to false so that the function can go get 
                    // fresh data
                    _this.authService.cached_user_trips = false;
                    _this.authService.getTrips().subscribe();
                }
                _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
                _this.toastr.success("Request Sent!");
            }
        }, function (err) {
            console.log("Error with requesting ride: ", err);
            _this.errorMessage = JSON.parse(err._body).message;
            _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
            _this.toastr.error(_this.errorMessage);
        });
    };
    TripDetailsComponent.prototype.confirmRequest = function () {
        if (this.authService.currentUser) {
            this.$(this.containerEl.containerEl.nativeElement).modal('show');
            this.requestsRemaining = 5 - this.authService.currentUser.trips_requested.length;
        }
        else {
            this.navbarService.showLoginModal();
        }
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
            templateUrl: 'app/trip/findtrip/trip-details/trip-details.component.html',
            styleUrls: ['app/trip/findtrip/trip-details/trip-details.component.css']
        }),
        __param(5, core_1.Inject(jQuery_service_1.JQ_TOKEN)),
        __param(6, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService, index_1.TripService, navbar_service_1.NavBarService, Object, Object])
    ], TripDetailsComponent);
    return TripDetailsComponent;
}());
exports.TripDetailsComponent = TripDetailsComponent;
//# sourceMappingURL=trip-details.component.js.map