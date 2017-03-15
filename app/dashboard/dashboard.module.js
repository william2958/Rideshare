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
var dashboard_routes_1 = require('./dashboard.routes');
var dashboard_component_1 = require('./dashboard.component');
var my_trip_thumbnail_component_1 = require('./trip-details/my-trip-thumbnail.component');
var request_details_component_1 = require('./trip-details/request-details.component');
var listing_details_component_1 = require('./trip-details/listing-details.component');
var index_1 = require('../trip/index');
var listing_details_resolver_service_1 = require('./trip-details/listing-details-resolver.service');
var common_module_1 = require('../common/common.module');
var jQuery_service_1 = require('../common/jQuery.service');
var app_config_1 = require('../app.config');
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_module_1.CommonRideshareModule,
                router_1.RouterModule.forChild(dashboard_routes_1.dashboardRoutes)
            ],
            declarations: [
                dashboard_component_1.DashboardComponent,
                my_trip_thumbnail_component_1.MyTripThumbnailComponent,
                request_details_component_1.RequestDetailsComponent,
                listing_details_component_1.ListingDetailsComponent
            ],
            providers: [
                index_1.TripDetailResolver,
                listing_details_resolver_service_1.ListingDetailResolver,
                { provide: jQuery_service_1.JQ_TOKEN, useValue: jQuery },
                { provide: app_config_1.APP_CONFIG, useValue: app_config_1.AppConfig }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map