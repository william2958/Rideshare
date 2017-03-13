import { NgModule } from '@angular/core';

import { SimpleModalComponent } from './simple-modal.component';
import { ModalTriggerDirective } from './modal-trigger.directive';

@NgModule ({
	declarations: [
		SimpleModalComponent,
		ModalTriggerDirective
	],
	imports: [],
	exports: [
		SimpleModalComponent,
		ModalTriggerDirective
	]
})

export class CommonRideshareModule {}