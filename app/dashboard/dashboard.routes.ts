import { DashboardComponent } from './dashboard.component';
import { TripDetailResolver } from '../trip/index';
import { RequestDetailsComponent } from './trip-details/request-details.component';
import { ListingDetailsComponent } from './trip-details/listing-details.component';

export const dashboardRoutes = [
	{ path: '', component: DashboardComponent },
	{ path: 'request/:id', component: RequestDetailsComponent, resolve: {trip: TripDetailResolver} },
	{ path: 'listing/:id', component: ListingDetailsComponent, resolve: {trip: TripDetailResolver} }
]