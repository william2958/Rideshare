"use strict";
var dashboard_component_1 = require('./dashboard.component');
var index_1 = require('../trip/index');
var request_details_component_1 = require('./trip-details/request-details.component');
var listing_details_component_1 = require('./trip-details/listing-details.component');
exports.dashboardRoutes = [
    { path: '', component: dashboard_component_1.DashboardComponent },
    { path: 'request/:id', component: request_details_component_1.RequestDetailsComponent, resolve: { trip: index_1.TripDetailResolver } },
    { path: 'listing/:id', component: listing_details_component_1.ListingDetailsComponent, resolve: { trip: index_1.TripDetailResolver } }
];
//# sourceMappingURL=dashboard.routes.js.map