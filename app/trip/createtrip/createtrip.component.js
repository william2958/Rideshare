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
var index_1 = require('../index');
var auth_service_1 = require('../../user/auth.service');
var router_1 = require('@angular/router');
var jQuery_service_1 = require('../../common/jQuery.service');
var toastr_service_1 = require('../../common/toastr.service');
var CreateTripComponent = (function () {
    function CreateTripComponent(tripService, router, authService, $, toastr) {
        this.tripService = tripService;
        this.router = router;
        this.authService = authService;
        this.$ = $;
        this.toastr = toastr;
        this.fromMetadata = "Western University";
        this.fromCity = "London";
        this.fromState = "Ontario";
        this.fromCountry = "Canada";
        this.toMetadata = "Western University";
        this.toCity = "London";
        this.toState = "Ontario";
        this.toCountry = "Canada";
        this.numPassengers = "4";
        this.date = '2017-03-15T12:03';
        this.price = "20";
        this.tripDetails = "Details";
    }
    CreateTripComponent.prototype.confirm = function (formValues) {
        formValues.date = new Date(formValues.date).getTime();
        this.$(this.containerEl.containerEl.nativeElement).modal('show');
    };
    CreateTripComponent.prototype.create = function (formValues) {
        var _this = this;
        this.tripService.createTrip(formValues)
            .subscribe(function (data) {
            if (data) {
                _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
                _this.toastr.success("Event Created!");
                _this.tripService.dashboardShowRequests = false;
                _this.authService.cached_user_trips = false;
                _this.router.navigate(['/', 'dashboard']);
                console.log("Subscribed create function returns: ", data);
            }
        }, function (err) {
            _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
            _this.toastr.error(err);
        });
        console.log("form Values: ", formValues);
    };
    CreateTripComponent.prototype.cancel = function () {
        this.router.navigate(['/']);
    };
    __decorate([
        core_1.ViewChild('confirmModal'), 
        __metadata('design:type', Object)
    ], CreateTripComponent.prototype, "containerEl", void 0);
    CreateTripComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/trip/createtrip/createtrip.component.html'
        }),
        __param(3, core_1.Inject(jQuery_service_1.JQ_TOKEN)),
        __param(4, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [index_1.TripService, router_1.Router, auth_service_1.AuthService, Object, Object])
    ], CreateTripComponent);
    return CreateTripComponent;
}());
exports.CreateTripComponent = CreateTripComponent;
//# sourceMappingURL=createtrip.component.js.map