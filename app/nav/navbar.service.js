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
var Rx_1 = require('rxjs/Rx');
var NavBarService = (function () {
    function NavBarService() {
        this.showLoginSubject = new Rx_1.Subject();
        this.showLogin = this.showLoginSubject.asObservable();
        this.updateNavSubject = new Rx_1.Subject();
        this.updateNav = this.updateNavSubject.asObservable();
    }
    NavBarService.prototype.showLoginModal = function () {
        this.showLoginSubject.next(true);
    };
    NavBarService.prototype.showSignUpModal = function () {
        this.showSignUp = true;
    };
    NavBarService.prototype.update = function () {
        this.updateNavSubject.next(true);
    };
    NavBarService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NavBarService);
    return NavBarService;
}());
exports.NavBarService = NavBarService;
//# sourceMappingURL=navbar.service.js.map