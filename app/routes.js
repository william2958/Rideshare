"use strict";
var landing_component_1 = require('./landing/landing.component');
var _404_component_1 = require('./errors/404.component');
exports.appRoutes = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
    { path: 'trip', loadChildren: 'app/trip/trip.module#TripModule' },
    { path: '**', component: _404_component_1.Error404Component }
];
//# sourceMappingURL=routes.js.map