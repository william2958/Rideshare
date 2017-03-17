import { NgModule } from '@angular/core';

import { SimpleModalComponent } from './simple-modal.component';
import { ModalTriggerDirective } from './modal-trigger.directive';
import { MaterialModule } from '@angular/material';

@NgModule ({
	declarations: [
		SimpleModalComponent,
		ModalTriggerDirective
	],
	imports: [
		MaterialModule
	],
	exports: [
		SimpleModalComponent,
		ModalTriggerDirective
	]
})

export class CommonRideshareModule {}