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
var index_1 = require('../../trip/index');
var router_1 = require('@angular/router');
var jQuery_service_1 = require('../../common/jQuery.service');
var toastr_service_1 = require('../../common/toastr.service');
var auth_service_1 = require('../../user/auth.service');
var ListingDetailsComponent = (function () {
    function ListingDetailsComponent(tripService, authService, route, router, $, toastr) {
        this.tripService = tripService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.$ = $;
        this.toastr = toastr;
    }
    ListingDetailsComponent.prototype.ngOnInit = function () {
        this.trip = this.route.snapshot.data['trip'];
        this.trip = JSON.parse(this.trip._body).trip;
        this.trip_details = this.trip.trip_details;
        this.user_requests = this.trip.user_requests;
        this.accepted_users = this.trip.accepted_users;
        console.log("The listing details are: ", this.trip);
        console.log("The accepted users are: ", this.accepted_users);
        console.log("The requests are: ", this.user_requests);
    };
    ListingDetailsComponent.prototype.accept = function (user) {
        var _this = this;
        this.tripService.acceptRequest(this.trip_details.id, user._id).subscribe(function (data) {
            // If the request was successful
            _this.toastr.success("Request Accepted!");
        }, function (err) {
            // If an error was thrown
            _this.toastr.error(err);
        });
    };
    ListingDetailsComponent.prototype.confirmCancel = function () {
        if (this.accepted_users.length > 0) {
            this.$(this.cancelUserEl.containerEl.nativeElement).modal('show');
        }
        else {
            this.$(this.cancelEl.containerEl.nativeElement).modal('show');
        }
    };
    ListingDetailsComponent.prototype.cancelTrip = function () {
        var _this = this;
        console.log('Trip cancelled');
        this.tripService.cancelTrip(this.trip_details.id).subscribe(function (data) {
            _this.$(_this.cancelUserEl.containerEl.nativeElement).modal('hide');
            _this.$(_this.cancelEl.containerEl.nativeElement).modal('hide');
            _this.tripService.dashboardShowRequests = false;
            // If there is cached data in the dashboard
            if (_this.authService.cached_user_trips) {
                // This runs through the cached items and removes the listing that was just deleted
                for (var i = 0; i < _this.authService.cached_user_trips_response.trips_listed.length; i++) {
                    if (_this.authService.cached_user_trips_response.trips_listed[i].id == _this.trip_details.id) {
                        _this.authService.cached_user_trips_response.trips_listed.splice(i, 1);
                        console.log("index was: ", i);
                        break;
                    }
                }
            }
            _this.toastr.success("Trip deleted.");
            _this.router.navigate(['/', 'dashboard']);
        }, function (err) {
            _this.toastr.error(err);
        });
    };
    ListingDetailsComponent.prototype.back = function () {
        this.tripService.dashboardShowRequests = false;
        this.router.navigate(['/', 'dashboard']);
    };
    __decorate([
        core_1.ViewChild('confirmCancelModal'), 
        __metadata('design:type', Object)
    ], ListingDetailsComponent.prototype, "cancelEl", void 0);
    __decorate([
        core_1.ViewChild('confirmCancelUsersModal'), 
        __metadata('design:type', Object)
    ], ListingDetailsComponent.prototype, "cancelUserEl", void 0);
    ListingDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/dashboard/trip-details/listing-details.component.html'
        }),
        __param(4, core_1.Inject(jQuery_service_1.JQ_TOKEN)),
        __param(5, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [index_1.TripService, auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router, Object, Object])
    ], ListingDetailsComponent);
    return ListingDetailsComponent;
}());
exports.ListingDetailsComponent = ListingDetailsComponent;
//# sourceMappingURL=listing-details.component.js.map