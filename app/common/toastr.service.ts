import { OpaqueToken } from '@angular/core';

// This tells angular to use toastr when referenceing TOASTR_TOKEN
export let TOASTR_TOKEN = new OpaqueToken('toastr');

// Example of use in modal-trigger.directive

export interface Toastr {
	success (msg: string, title?: string): void;
	info (msg: string, title?: string): void;
	warning (msg: string, title?: string): void;
	error (msg: string, title?: string): void;
}