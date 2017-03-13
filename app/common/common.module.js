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
var simple_modal_component_1 = require('./simple-modal.component');
var modal_trigger_directive_1 = require('./modal-trigger.directive');
var CommonRideshareModule = (function () {
    function CommonRideshareModule() {
    }
    CommonRideshareModule = __decorate([
        core_1.NgModule({
            declarations: [
                simple_modal_component_1.SimpleModalComponent,
                modal_trigger_directive_1.ModalTriggerDirective
            ],
            imports: [],
            exports: [
                simple_modal_component_1.SimpleModalComponent,
                modal_trigger_directive_1.ModalTriggerDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CommonRideshareModule);
    return CommonRideshareModule;
}());
exports.CommonRideshareModule = CommonRideshareModule;
//# sourceMappingURL=common.module.js.map