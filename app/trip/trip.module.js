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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var trip_routes_1 = require('./trip.routes');
var common_module_1 = require('../common/common.module');
var jQuery_service_1 = require('../common/jQuery.service');
var app_config_1 = require('../app.config');
var index_1 = require('./index');
var TripModule = (function () {
    function TripModule() {
    }
    TripModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MaterialModule,
                common_module_1.CommonRideshareModule,
                router_1.RouterModule.forChild(trip_routes_1.tripRoutes)
            ],
            declarations: [
                index_1.FindTripComponent,
                index_1.TripThumbnailComponent,
                index_1.TripDetailsComponent,
                index_1.CreateTripComponent
            ],
            providers: [
                index_1.FindTripResolver,
                index_1.TripDetailResolver,
                { provide: jQuery_service_1.JQ_TOKEN, useValue: jQuery },
                { provide: app_config_1.APP_CONFIG, useValue: app_config_1.AppConfig }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TripModule);
    return TripModule;
}());
exports.TripModule = TripModule;
//# sourceMappingURL=trip.module.js.map