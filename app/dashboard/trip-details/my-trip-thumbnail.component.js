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
var auth_service_1 = require('../../user/auth.service');
var MyTripThumbnailComponent = (function () {
    function MyTripThumbnailComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.cancelRequest = new core_1.EventEmitter();
    }
    MyTripThumbnailComponent.prototype.ngOnInit = function () {
        console.log("Trip comopnoent: ", this.trip);
        if (this.trip.accepted_users.indexOf(this.authService.currentUser.id) > -1) {
            this.accepted = true;
        }
        else {
            this.accepted = false;
        }
    };
    MyTripThumbnailComponent.prototype.cancel = function () {
        this.cancelRequest.emit(this.trip);
    };
    MyTripThumbnailComponent.prototype.showDetails = function () {
        if (this.request) {
            this.router.navigate(['dashboard', 'request', this.trip.id]);
        }
        else {
            this.router.navigate(['dashboard', 'listing', this.trip.id]);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MyTripThumbnailComponent.prototype, "trip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MyTripThumbnailComponent.prototype, "request", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], MyTripThumbnailComponent.prototype, "listing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MyTripThumbnailComponent.prototype, "cancelRequest", void 0);
    MyTripThumbnailComponent = __decorate([
        core_1.Component({
            selector: 'my-trip-thumbnail',
            templateUrl: 'app/dashboard/trip-details/my-trip-thumbnail.component.html',
            styleUrls: ['app/dashboard/trip-details/my-trip-thumbnail.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
    ], MyTripThumbnailComponent);
    return MyTripThumbnailComponent;
}());
exports.MyTripThumbnailComponent = MyTripThumbnailComponent;
//# sourceMappingURL=my-trip-thumbnail.component.js.map