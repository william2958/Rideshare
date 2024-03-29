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
var auth_service_1 = require('../user/auth.service');
var LandingComponent = (function () {
    function LandingComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.mouseoverForm = false;
    }
    LandingComponent.prototype.ngOnInit = function () {
    };
    LandingComponent.prototype.search = function (formValues) {
        var date = new Date(formValues.date);
        console.log("Date 1 is: ", formValues.date);
        this.router.navigate(['trip', 'searchtrips', formValues.fromLocation.toLocaleLowerCase(), formValues.toLocation.toLocaleLowerCase(), date.getTime()]);
    };
    LandingComponent.prototype.cancel = function () {
        // console.log(this.containerEl)
    };
    LandingComponent.prototype.checkError = function (formValues) {
        if (formValues.invalid) {
            this.mouseoverForm = true;
        }
        else {
            this.search(formValues.value);
        }
    };
    LandingComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/landing/landing.component.html',
            styleUrls: ['app/landing/landing.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map