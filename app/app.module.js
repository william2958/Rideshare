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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var routes_1 = require('./routes');
var auth_service_1 = require('./user/auth.service');
var index_1 = require('./trip/index');
var _404_component_1 = require('./errors/404.component');
var rideshare_component_1 = require('./rideshare.component');
var landing_component_1 = require('./landing/landing.component');
var navbar_component_1 = require('./nav/navbar.component');
var navbar_service_1 = require('./nav/navbar.service');
var common_module_1 = require('./common/common.module');
var jQuery_service_1 = require('./common/jQuery.service');
var app_config_1 = require('./app.config');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MaterialModule,
                common_module_1.CommonRideshareModule,
                router_1.RouterModule.forRoot(routes_1.appRoutes)
            ],
            declarations: [
                _404_component_1.Error404Component,
                rideshare_component_1.RideshareAppComponent,
                landing_component_1.LandingComponent,
                navbar_component_1.NavBarComponent
            ],
            providers: [
                cookies_service_1.CookieService,
                auth_service_1.AuthService,
                index_1.TripService,
                navbar_service_1.NavBarService,
                { provide: jQuery_service_1.JQ_TOKEN, useValue: jQuery },
                { provide: app_config_1.APP_CONFIG, useValue: app_config_1.AppConfig }
            ],
            bootstrap: [rideshare_component_1.RideshareAppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map