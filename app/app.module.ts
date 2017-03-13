import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { appRoutes } from './routes';

import { AuthService } from './user/auth.service';
import { TripService } from './trip/index';

import { Error404Component } from './errors/404.component';
import { RideshareAppComponent } from './rideshare.component';
import { LandingComponent } from './landing/landing.component';
import { NavBarComponent } from './nav/navbar.component';
import { NavBarService } from './nav/navbar.service';

import { CommonRideshareModule } from './common/common.module';

import { JQ_TOKEN } from './common/jQuery.service';
import { APP_CONFIG, AppConfig } from './app.config';
declare let jQuery : Object;

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		CommonRideshareModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [
		Error404Component,
		RideshareAppComponent,
		LandingComponent,
		NavBarComponent
	],
	providers: [
		CookieService,
		AuthService,
		TripService,
		NavBarService,
		{ provide: JQ_TOKEN, useValue: jQuery},
		{ provide: APP_CONFIG, useValue: AppConfig}
	],
	bootstrap: [RideshareAppComponent]
})

export class AppModule {}