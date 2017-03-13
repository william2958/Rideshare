import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Component({
	selector: 'simple-modal',
	template: `
		<div id="{{elementId}}" #modalcontainer class="modal fade" tabIndex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<img class="logo" src="images/friday-square.svg">
						<div class="title">{{title}}</div>
					</div>
					<div class="modal-body" (click)="closeModal()">
						<ng-content></ng-content>
					</div>
				</div>
			</div>
		</div>
	`,
	styles: [`
		.modal-header {
			background-color: #C3DFED;
			text-align: center;
		}
		.modal-body {
			height: 250px;
			overflow-y: scroll;
		}
		.modal-content {
			border-radius: 0px;
		}
		.logo {
			width: 50px;
			height: 50px;
		}
		img {
			vertical-align: bottom;
		}
		.title {
			font-size: 32px;
			color: #005FB5;
			display: inline;
		}
	`]
})

export class SimpleModalComponent {
	@Input() title: string;
	@Input() elementId: string;
	@Input() closeOnBodyClick: string;
	// This allows this class to find the element with the parameter id
	// This points to the #modalcontainer element in the template
	@ViewChild('modalcontainer') containerEl: ElementRef;

	constructor (@Inject(JQ_TOKEN) private $: any) {

	}

	closeModal() {
		if(this.closeOnBodyClick.toLocaleLowerCase() === 'true') {
			this.$( this.containerEl.nativeElement ).modal('hide');
		}
		
	}

}