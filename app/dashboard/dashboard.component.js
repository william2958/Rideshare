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
var auth_service_1 = require('../user/auth.service');
var navbar_service_1 = require('../nav/navbar.service');
var index_1 = require('../trip/index');
var core_2 = require('angular2-cookie/core');
var DashboardComponent = (function () {
    function DashboardComponent(authService, navbarService, tripService, cookieService) {
        this.authService = authService;
        this.navbarService = navbarService;
        this.tripService = tripService;
        this.cookieService = cookieService;
        // Show requests or listing boolean
        this.requests = true;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // this.authService.loginUser('william2958@gmail.com', 'password');
        this.user = this.authService.currentUser;
        console.log(this.authService.currentUser);
        this.auth_token = this.cookieService.get("auth_token");
    };
    DashboardComponent.prototype.showLoginMo = function () {
        this.navbarService.showLoginModal();
    };
    DashboardComponent.prototype.showRequests = function () {
        this.requests = true;
    };
    DashboardComponent.prototype.showListings = function () {
        this.requests = false;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/dashboard/dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, navbar_service_1.NavBarService, index_1.TripService, core_2.CookieService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map