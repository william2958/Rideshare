import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { Error404Component } from './errors/404.component';

export const appRoutes:Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
	{ path: 'trip', loadChildren: 'app/trip/trip.module#TripModule'},
	{ path: '**', component: Error404Component }
]