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
var auth_service_1 = require('../../user/auth.service');
var toastr_service_1 = require('../../common/toastr.service');
var navbar_service_1 = require('../../nav/navbar.service');
var ProfileComponent = (function () {
    function ProfileComponent(authService, navbarService, toastr) {
        this.authService = authService;
        this.navbarService = navbarService;
        this.toastr = toastr;
        this.edit_mode = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authService.getUser();
        console.log(this.currentUser);
        this.firstNamePlaceholder = "First Name";
        this.lastNamePlaceholder = "Last Name";
        this.phonePlaceholder = "Phone number";
        this.facebookPlaceholder = "Facebook Profile Link";
        this.first_name = this.currentUser.first_name;
        this.last_name = this.currentUser.last_name;
        this.phone_number = this.currentUser.phone_number;
        this.facebook_link = this.currentUser.facebook_link;
    };
    ProfileComponent.prototype.edit = function () {
        this.edit_mode = true;
    };
    ProfileComponent.prototype.updateUser = function (formValues) {
        var _this = this;
        console.log(formValues);
        this.authService.updateUser(this.currentUser.id, formValues.first_name, formValues.last_name, formValues.phone_number, formValues.facebook_link)
            .subscribe(function (data) {
            console.log("Successfully updated the user's data");
            _this.currentUser = _this.authService.getUser();
            _this.navbarService.update();
            _this.edit_mode = false;
        }, function (err) {
            _this.toastr.error(err);
        });
    };
    ProfileComponent.prototype.cancel = function () {
        this.edit_mode = false;
    };
    ProfileComponent.prototype.checkError = function (form) {
        if (!form.valid) {
            if (!form.value.first_name) {
                this.firstNamePlaceholder = "First Name - Required!";
            }
            if (!form.value.last_name) {
                this.lastNamePlaceholder = "Last Name - Required!";
            }
            if (!form.value.phone_number) {
                this.phonePlaceholder = "Phone Number - Required!";
            }
            if (!form.value.facebook_link) {
                this.facebookPlaceholder = "Facebook Link - Required!";
            }
        }
        else {
            if (form.value.first_name != this.currentUser.first_name ||
                form.value.last_name != this.currentUser.last_name ||
                form.value.phone_number != this.currentUser.phone_number ||
                form.value.facebook_link != this.currentUser.facebook_link) {
                this.updateUser(form.value);
            }
            else {
                this.cancel();
            }
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/dashboard/profile/profile.component.html',
            styleUrls: ['app/dashboard/profile/profile.component.css']
        }),
        __param(2, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, navbar_service_1.NavBarService, Object])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map