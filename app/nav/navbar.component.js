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
var router_1 = require('@angular/router');
var jQuery_service_1 = require('../common/jQuery.service');
var navbar_service_1 = require('./navbar.service');
var NavBarComponent = (function () {
    function NavBarComponent(auth, router, navbarService, $) {
        this.auth = auth;
        this.router = router;
        this.navbarService = navbarService;
        this.$ = $;
        // An object to store the current user
        this.currentUser = this.auth.getUser();
        // This shows a message if the user tries to sign in and enters incorrect info
        this.loginInvalid = false;
    }
    NavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.navbarService.showLogin.subscribe(function (newValue) {
            _this.showLoginModal = newValue;
            console.log("value changed");
            _this.$(_this.containerEl.containerEl.nativeElement).modal('show');
        });
    };
    NavBarComponent.prototype.login = function (formValues) {
        var _this = this;
        this.auth.loginUser(formValues.userName, formValues.password)
            .subscribe(function (resp) {
            if (resp) {
                console.log("Successful login");
                _this.$(_this.containerEl.containerEl.nativeElement).modal('hide');
                _this.showLoginModal = false;
                _this.currentUser = _this.auth.getUser();
            }
            else {
                _this.loginInvalid = true;
            }
        });
    };
    NavBarComponent.prototype.cancel = function () {
        this.$(this.containerEl.containerEl.nativeElement).modal('hide');
    };
    __decorate([
        core_1.ViewChild('loginModal'), 
        __metadata('design:type', Object)
    ], NavBarComponent.prototype, "containerEl", void 0);
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'nav-bar',
            templateUrl: 'app/nav/navbar.component.html',
            styleUrls: ['app/nav/navbar.component.css']
        }),
        __param(3, core_1.Inject(jQuery_service_1.JQ_TOKEN)), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, navbar_service_1.NavBarService, Object])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navbar.component.js.map