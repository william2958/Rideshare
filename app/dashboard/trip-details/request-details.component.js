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
var RequestDetailsComponent = (function () {
    function RequestDetailsComponent(tripService, authService, route, router, $, toastr) {
        this.tripService = tripService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.$ = $;
        this.toastr = toastr;
    }
    RequestDetailsComponent.prototype.ngOnInit = function () {
        this.trip = this.route.snapshot.data['trip'];
        var body = JSON.parse(this.trip._body);
        this.trip = body.trip;
        this.driver = body.driver;
        console.log("The trip details are: ", this.trip);
    };
    RequestDetailsComponent.prototype.confirmCancel = function () {
        this.$(this.containerEl.containerEl.nativeElement).modal('show');
    };
    RequestDetailsComponent.prototype.cancelRequest = function () {
        var _this = this;
        this.$(this.containerEl.containerEl.nativeElement).modal('hide');
        this.tripService.cancelTripRequest(this.trip.id).subscribe(function (data) {
            if (data) {
                var response = JSON.parse(data._body);
                console.log("response is: ", response);
                // If there is cached data in the dashboard
                if (_this.authService.cached_user_trips) {
                    // This runs through the cached items and removes the listing that was just deleted
                    for (var i = 0; i < _this.authService.cached_user_trips_response.trips_requested.length; i++) {
                        if (_this.authService.cached_user_trips_response.trips_requested[i].id == _this.trip.id) {
                            _this.authService.cached_user_trips_response.trips_requested.splice(i, 1);
                            console.log("index was: ", i);
                            break;
                        }
                    }
                }
                _this.toastr.success("Trip cancelled.");
                _this.router.navigate(['/', 'dashboard']);
            }
        }, function (err) {
            _this.toastr.error(err);
        });
    };
    __decorate([
        core_1.ViewChild('confirmModal'), 
        __metadata('design:type', Object)
    ], RequestDetailsComponent.prototype, "containerEl", void 0);
    RequestDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/dashboard/trip-details/request-details.component.html',
            styleUrls: ['app/dashboard/trip-details/request-details.component.css']
        }),
        __param(4, core_1.Inject(jQuery_service_1.JQ_TOKEN)),
        __param(5, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [index_1.TripService, auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router, Object, Object])
    ], RequestDetailsComponent);
    return RequestDetailsComponent;
}());
exports.RequestDetailsComponent = RequestDetailsComponent;
//# sourceMappingURL=request-details.component.js.map