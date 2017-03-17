import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { Error404Component } from './errors/404.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './user/password/changepassword.component';

export const appRoutes:Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
	{ path: 'trip', loadChildren: 'app/trip/trip.module#TripModule'},
	{ path: 'changepassword/:token', component: ChangePasswordComponent },
	{ path: '**', component: Error404Component }
]