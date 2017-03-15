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
var index_1 = require('../../trip/index');
var ListingDetailResolver = (function () {
    function ListingDetailResolver(tripService) {
        this.tripService = tripService;
    }
    ListingDetailResolver.prototype.resolve = function (route) {
        return this.tripService.getTripListing(route.params['id'])
            .do(function (resp) {
            console.log("The response from the server is: ", JSON.parse(resp._body));
        });
    };
    ListingDetailResolver = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.TripService])
    ], ListingDetailResolver);
    return ListingDetailResolver;
}());
exports.ListingDetailResolver = ListingDetailResolver;
//# sourceMappingURL=listing-details-resolver.service.js.map