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
var auth_service_1 = require('../auth.service');
var router_1 = require('@angular/router');
var toastr_service_1 = require('../../common/toastr.service');
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(authService, route, router, toastr) {
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.passwordsDontMatch = false;
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        var parameters = this.route.params;
        this.confirm_token = parameters.value.token;
        console.log("Accepted parameter is: ", parameters.value.token);
    };
    ChangePasswordComponent.prototype.changePassword = function (formValues) {
        var _this = this;
        console.log(formValues);
        if (formValues.password == formValues.confirm_password) {
            this.authService.changePassword(this.confirm_token, formValues.password).subscribe(function (data) {
                console.log("Password Changed!");
                _this.toastr.success("Password Changed!");
                _this.router.navigate(['/']);
            }, function (err) {
                console.log("There was an error changing the password!");
                _this.toastr.error("Password could not be changed!");
            });
        }
        else {
            this.passwordsDontMatch = true;
        }
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/user/password/changepassword.component.html'
        }),
        __param(3, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.ActivatedRoute, router_1.Router, Object])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=changepassword.component.js.map