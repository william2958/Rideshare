import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { tripRoutes } from './trip.routes';

import { CommonRideshareModule } from '../common/common.module';
import { JQ_TOKEN } from '../common/jQuery.service';
import { APP_CONFIG, AppConfig } from '../app.config';
declare let jQuery : Object;

import {
	FindTripComponent,
	FindTripResolver,
	TripThumbnailComponent,
	TripDetailsComponent,
	TripDetailResolver,
	CreateTripComponent
} from './index';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		CommonRideshareModule,
		RouterModule.forChild(tripRoutes)
	],
	declarations: [
		FindTripComponent,
		TripThumbnailComponent,
		TripDetailsComponent,
		CreateTripComponent
	],
	providers: [
		FindTripResolver,
		TripDetailResolver,
		{ provide: JQ_TOKEN, useValue: jQuery},
		{ provide: APP_CONFIG, useValue: AppConfig}
	]
})

export class TripModule {}