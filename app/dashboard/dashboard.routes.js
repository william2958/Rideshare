"use strict";
var dashboard_component_1 = require('./dashboard.component');
var index_1 = require('../trip/index');
var listing_details_resolver_service_1 = require('./trip-details/listing-details-resolver.service');
var request_details_component_1 = require('./trip-details/request-details.component');
var listing_details_component_1 = require('./trip-details/listing-details.component');
var profile_component_1 = require('./profile/profile.component');
exports.dashboardRoutes = [
    { path: '', component: dashboard_component_1.DashboardComponent },
    { path: 'request/:id', component: request_details_component_1.RequestDetailsComponent, resolve: { trip: index_1.TripDetailResolver } },
    { path: 'listing/:id', component: listing_details_component_1.ListingDetailsComponent, resolve: { trip: listing_details_resolver_service_1.ListingDetailResolver } },
    { path: 'profile', component: profile_component_1.ProfileComponent }
];
//# sourceMappingURL=dashboard.routes.js.map