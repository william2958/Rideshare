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
var auth_service_1 = require('../user/auth.service');
var navbar_service_1 = require('../nav/navbar.service');
var index_1 = require('../trip/index');
var core_2 = require('angular2-cookie/core');
var jQuery_service_1 = require('../common/jQuery.service');
var toastr_service_1 = require('../common/toastr.service');
var DashboardComponent = (function () {
    function DashboardComponent(authService, navbarService, tripService, cookieService, $, toastr) {
        this.authService = authService;
        this.navbarService = navbarService;
        this.tripService = tripService;
        this.cookieService = cookieService;
        this.$ = $;
        this.toastr = toastr;
        // Show requests or listing boolean
        this.requests = this.tripService.dashboardShowRequests;
        this.isSelected = true;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // If there is cached data, don't send another request to get the trips
        if (!this.authService.cached_user_trips) {
            this.user = this.authService.currentUser;
            this.authService.getTrips().subscribe(function (resp) {
                var trips = JSON.parse(resp._body);
                console.log('resp is:', JSON.parse(resp._body));
                _this.trips_accepted = trips.trip_accepted;
                _this.trips_requested = trips.trips_requested;
                _this.trips_listed = trips.trips_listed;
                console.log("Trips accepted are: ", _this.trips_accepted);
                console.log("Trips requested are: ", _this.trips_requested);
                console.log("Trips listed are: ", _this.trips_listed);
            });
        }
        else {
            console.log("There was cached trips and so no http request was sent");
            this.user = this.authService.currentUser;
            var response = this.authService.getTrips();
            var trips = response;
            console.log('resp is:', trips);
            this.trips_accepted = trips.trip_accepted;
            this.trips_requested = trips.trips_requested;
            this.trips_listed = trips.trips_listed;
        }
        // 	}
        // });
        // this.user = this.authService.currentUser;
        console.log("Trips: ", this.trips_listed);
        this.auth_token = this.cookieService.get("auth_token");
    };
    DashboardComponent.prototype.confirmCancelRequest = function (event) {
        this.$(this.containerEl.containerEl.nativeElement).modal('show');
        this.event = event;
    };
    DashboardComponent.prototype.cancelRequest = function (event) {
        var _this = this;
        this.$(this.containerEl.containerEl.nativeElement).modal('hide');
        // Call tripService's cancel Request here
        console.log("Outputted event is: ", event);
        this.tripService.cancelTripRequest(event.id).subscribe(function (data) {
            if (data) {
                var response = JSON.parse(data._body);
                console.log("response is: ", response);
                if (response.status == "success") {
                    console.log("It was a successful delete");
                    console.log("Index of event is: ", _this.trips_requested.indexOf(event));
                    _this.trips_requested.splice(_this.trips_requested.indexOf(event), 1);
                    console.log("After removing request, trip requested array is: ", _this.trips_requested);
                    _this.toastr.success("Successfully cancelled the request");
                }
            }
        }, function (err) {
            _this.toastr.error("Could not cancel this request!");
            console.log("There was an error cancelling the trip request and the error is: ", err);
        });
    };
    DashboardComponent.prototype.showRequests = function () {
        this.requests = true;
    };
    DashboardComponent.prototype.showListings = function () {
        this.requests = false;
    };
    __decorate([
        core_1.ViewChild('confirmCancelModal'), 
        __metadata('design:type', Object)
    ], DashboardComponent.prototype, "containerEl", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/dashboard/dashboard.component.html',
            styleUrls: ['app/dashboard/dashboard.component.css']
        }),
        __param(4, core_1.Inject(jQuery_service_1.JQ_TOKEN)),
        __param(5, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, navbar_service_1.NavBarService, index_1.TripService, core_2.CookieService, Object, Object])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map