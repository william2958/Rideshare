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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var jQuery_service_1 = require('./jQuery.service');
var SimpleModalComponent = (function () {
    function SimpleModalComponent($) {
        this.$ = $;
    }
    SimpleModalComponent.prototype.getHeight = function () {
        if (this.bodyHeight == 'large') {
            return '400px';
        }
        else if (this.bodyHeight == 'medium') {
            return '340px';
        }
        else {
            return '280px';
        }
    };
    SimpleModalComponent.prototype.closeModal = function () {
        if (this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
            this.$(this.containerEl.nativeElement).modal('hide');
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SimpleModalComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SimpleModalComponent.prototype, "elementId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SimpleModalComponent.prototype, "closeOnBodyClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SimpleModalComponent.prototype, "bodyHeight", void 0);
    __decorate([
        core_1.ViewChild('modalcontainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], SimpleModalComponent.prototype, "containerEl", void 0);
    SimpleModalComponent = __decorate([
        core_1.Component({
            selector: 'simple-modal',
            templateUrl: 'app/common/simple-modal.component.html',
            styleUrls: ['app/common/simple-modal.component.css']
        }),
        __param(0, core_1.Inject(jQuery_service_1.JQ_TOKEN)), 
        __metadata('design:paramtypes', [Object])
    ], SimpleModalComponent);
    return SimpleModalComponent;
}());
exports.SimpleModalComponent = SimpleModalComponent;
//# sourceMappingURL=simple-modal.component.js.map