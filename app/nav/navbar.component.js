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
var toastr_service_1 = require('../common/toastr.service');
var NavBarComponent = (function () {
    function NavBarComponent(auth, router, navbarService, $, toastr) {
        this.auth = auth;
        this.router = router;
        this.navbarService = navbarService;
        this.$ = $;
        this.toastr = toastr;
        // This shows a message if the user tries to sign in and enters incorrect info
        this.loginInvalid = false;
        // Signup Form Fields
        this.signupInvalid = false;
        this.passwordMatch = false;
        this.forgotPasswordEmailInvalid = false;
    }
    NavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.auth.getUser();
        // This makes the service listen to when other components want to show the login modal
        this.navbarService.showLogin.subscribe(function (newValue) {
            _this.showLoginModal = newValue;
            console.log("Login guard element is: ", _this.loginGuardEl);
            _this.$(_this.loginGuardEl.containerEl.nativeElement).modal('show');
        });
        this.navbarService.updateNav.subscribe(function (newValue) {
            _this.currentUser = _this.auth.getUser();
            console.log("Updating navbar...");
        });
        this.firstNamePlaceholder = "First Name";
        this.lastNamePlaceholder = "Last Name";
        this.emailPlaceholder = "Email";
        this.passwordPlaceholder = "Password";
        this.confirmPasswordPlaceholder = "Confirm Password";
        this.phonePlaceholder = "Phone number";
        this.facebookPlaceholder = "Facebook Profile Link";
    };
    NavBarComponent.prototype.login = function (formValues) {
        var _this = this;
        this.auth.loginUser(formValues.userName, formValues.password)
            .subscribe(function (data) {
            if (data) {
                _this.$(_this.loginEl.containerEl.nativeElement).modal('hide');
                _this.$(_this.loginGuardEl.containerEl.nativeElement).modal('hide');
                _this.showLoginModal = false;
                _this.currentUser = _this.auth.getUser();
            }
        }, function (err) {
            _this.loginInvalid = true;
        });
    };
    NavBarComponent.prototype.signup = function (form) {
        var _this = this;
        console.log(form);
        console.log(form.valid);
        if (!form.valid) {
            if (!form.value.first_name) {
                console.log("Invalid first name");
                this.firstNamePlaceholder = "First Name - Required!";
            }
            if (!form.value.last_name) {
                this.lastNamePlaceholder = "Last Name - Required!";
            }
            if (!form.value.email) {
                this.emailPlaceholder = "Email - Required!";
            }
            if (!form.value.password) {
                this.passwordPlaceholder = "Password - Required!";
            }
            if (!form.value.password_confirm) {
                this.confirmPasswordPlaceholder = "Confirm Password - Required!";
            }
            if (!form.value.phone_number) {
                this.phonePlaceholder = "Phone Number - Required!";
            }
            if (!form.value.facebook_link) {
                this.facebookPlaceholder = "Facebook Link - Required!";
            }
            if (form.value.password != form.value.password_confirm) {
                this.passwordPlaceholder = "Password - Passwords don't match!";
                this.confirmPasswordPlaceholder = "Confirm - Passwords don't match!";
            }
        }
        else {
            if (form.value.password != form.value.password_confirm) {
                this.passwordPlaceholder = "Password - Passwords don't match!";
                this.confirmPasswordPlaceholder = "Confirm - Passwords don't match!";
            }
            else {
                var formValues = form.value;
                this.auth.signUp(formValues.email, formValues.first_name, formValues.last_name, formValues.password, formValues.phone_number, formValues.facebook_link)
                    .subscribe(function (data) {
                    console.log("Sign up Successful");
                    _this.$(_this.signupEl.containerEl.nativeElement).modal('hide');
                    _this.toastr.success("Sign Up Successful!", "Please check your email for the confirmation link.");
                }, function (err) {
                    console.log("Sign up Unsuccessful");
                    _this.signupInvalid = true;
                });
            }
        }
    };
    NavBarComponent.prototype.logout = function () {
        this.auth.logout();
        this.currentUser = null;
        this.toastr.success("Logged Out");
    };
    NavBarComponent.prototype.cancel = function () {
        this.$(this.signupEl.containerEl.nativeElement).modal('hide');
        this.$(this.loginEl.containerEl.nativeElement).modal('hide');
        this.$(this.loginGuardEl.containerEl.nativeElement).modal('hide');
    };
    NavBarComponent.prototype.signupRedirect = function () {
        this.$(this.loginGuardEl.containerEl.nativeElement).modal('hide');
        this.$(this.signupEl.containerEl.nativeElement).modal('show');
    };
    NavBarComponent.prototype.forgotPasswordRedirect = function () {
        this.cancel();
        this.$(this.forgotPasswordEl.containerEl.nativeElement).modal('show');
    };
    NavBarComponent.prototype.forgotPassword = function (form) {
        var _this = this;
        this.auth.forgotPassword(form.email).subscribe(function (data) {
            console.log("Forgot password email sent.");
            _this.$(_this.forgotPasswordEl.containerEl.nativeElement).modal('hide');
            _this.toastr.success("Reset Password Email Sent!", "Please check your email for a reset link.");
        }, function (err) {
            console.log("Unable to send the reset email.");
            _this.forgotPasswordEmailInvalid = true;
            _this.toastr.error(err);
        });
        console.log("Forgot password triggered, form is: ", form);
    };
    __decorate([
        core_1.ViewChild('signupModal'), 
        __metadata('design:type', Object)
    ], NavBarComponent.prototype, "signupEl", void 0);
    __decorate([
        core_1.ViewChild('loginModal'), 
        __metadata('design:type', Object)
    ], NavBarComponent.prototype, "loginEl", void 0);
    __decorate([
        core_1.ViewChild('loginGuardModal'), 
        __metadata('design:type', Object)
    ], NavBarComponent.prototype, "loginGuardEl", void 0);
    __decorate([
        core_1.ViewChild('forgotPasswordModal'), 
        __metadata('design:type', Object)
    ], NavBarComponent.prototype, "forgotPasswordEl", void 0);
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'nav-bar',
            templateUrl: 'app/nav/navbar.component.html',
            styleUrls: ['app/nav/navbar.component.css']
        }),
        __param(3, core_1.Inject(jQuery_service_1.JQ_TOKEN)),
        __param(4, core_1.Inject(toastr_service_1.TOASTR_TOKEN)), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, navbar_service_1.NavBarService, Object, Object])
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navbar.component.js.map