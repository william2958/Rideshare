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
var auth_service_1 = require('./user/auth.service');
var core_2 = require('angular2-cookie/core');
var RideshareAppComponent = (function () {
    function RideshareAppComponent(authService, cookieService) {
        this.authService = authService;
        this.cookieService = cookieService;
        this.cookie = "";
    }
    RideshareAppComponent.prototype.ngOnInit = function () {
        console.log("Enter token here");
        this.cookie = this.cookieService.get("auth_token");
        console.log("Cookie that was retreived is", this.cookie);
        if (this.cookie) {
            this.authService.loginWithToken(this.cookie).subscribe(function (resp) {
                console.log("After login with token in rideshare component, response from server was: ", resp);
            });
        }
    };
    RideshareAppComponent = __decorate([
        core_1.Component({
            selector: 'rideshare',
            template: "\n\t\t<nav-bar></nav-bar>\n\t\t<router-outlet></router-outlet>\n\t"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, core_2.CookieService])
    ], RideshareAppComponent);
    return RideshareAppComponent;
}());
exports.RideshareAppComponent = RideshareAppComponent;
//# sourceMappingURL=rideshare.component.js.map