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
var TripThumbnailComponent = (function () {
    function TripThumbnailComponent() {
    }
    TripThumbnailComponent.prototype.ngOnInit = function () {
        var dateEpoch = this.trip.date;
        var time = new Date(dateEpoch * 1000);
        this.hours = time.getHours();
        this.minutes = time.getMinutes();
        this.date = time;
        if (this.minutes < 10) {
            this.minutes = "0" + this.minutes;
        }
        // Filter the hours so it displays properly
        if (this.hours == 0) {
            this.hours = 12;
        }
        if (this.hours > 12) {
            this.hours = this.hours - 12;
            this.pm = "PM";
        }
        else {
            this.pm = "AM";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TripThumbnailComponent.prototype, "trip", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TripThumbnailComponent.prototype, "showDate", void 0);
    TripThumbnailComponent = __decorate([
        core_1.Component({
            selector: 'trip-thumbnail',
            templateUrl: 'app/trip/findtrip/trip-details/trip-thumbnail.component.html',
            styleUrls: ['app/trip/findtrip/trip-details/trip-thumbnail.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TripThumbnailComponent);
    return TripThumbnailComponent;
}());
exports.TripThumbnailComponent = TripThumbnailComponent;
//# sourceMappingURL=trip-thumbnail.component.js.map