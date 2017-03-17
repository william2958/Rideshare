import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
	selector: 'simple-modal',
	templateUrl: 'app/common/simple-modal.component.html',
	styleUrls: ['app/common/simple-modal.component.css']
})

export class SimpleModalComponent {
	@Input() title: string;
	@Input() elementId: string;
	@Input() closeOnBodyClick: string;
	@Input() bodyHeight: string;
	// This allows this class to find the element with the parameter id
	// This points to the #modalcontainer element in the template
	@ViewChild('modalcontainer') containerEl: ElementRef;

	constructor (@Inject(JQ_TOKEN) private $: any) {

	}

	getHeight() {
		if (this.bodyHeight == 'large') {
			return '400px';
		} else if (this.bodyHeight == 'medium') {
			return '340px';
		} else {
			return '280px';
		}
	}

	closeModal() {
		if(this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
			this.$( this.containerEl.nativeElement ).modal('hide');
		}
		
	}

}