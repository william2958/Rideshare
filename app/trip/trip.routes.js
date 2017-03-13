"use strict";
var index_1 = require('./index');
exports.tripRoutes = [
    { path: 'searchtrips/:from/:to/:date', component: index_1.FindTripComponent, resolve: { trips: index_1.FindTripResolver } },
    { path: 'searchtrips/:from/:to/:date/:id', component: index_1.TripDetailsComponent, resolve: { trip: index_1.TripDetailResolver } },
    { path: 'createtrip', component: index_1.CreateTripComponent }
];
//# sourceMappingURL=trip.routes.js.map