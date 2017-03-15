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
var router_1 = require('@angular/router');
var index_1 = require('../index');
var FindTripComponent = (function () {
    function FindTripComponent(route, tripService, router) {
        this.route = route;
        this.tripService = tripService;
        this.router = router;
    }
    FindTripComponent.prototype.ngOnInit = function () {
        var parameters = this.route.params;
        if (this.tripService.cached != parameters.value['from'] + parameters.value['to'] + parameters.value['date'].toString()) {
            this.trips = JSON.parse(this.route.snapshot.data['trips']._body).results;
        }
        else {
            this.trips = this.tripService.getFoundTrips();
        }
        console.log("returned trips are: ", this.trips);
    };
    FindTripComponent.prototype.listTrips = function () {
        console.log(this.tripService.getFoundTrips());
    };
    FindTripComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/trip/findtrip/findtrip.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.TripService, router_1.Router])
    ], FindTripComponent);
    return FindTripComponent;
}());
exports.FindTripComponent = FindTripComponent;
//# sourceMappingURL=findtrip.component.js.map