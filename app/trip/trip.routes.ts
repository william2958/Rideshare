import { 
	FindTripComponent,
	FindTripResolver,
	TripDetailsComponent,
	TripDetailResolver,
	CreateTripComponent
} from './index';

export const tripRoutes = [
	{ path: 'searchtrips/:from/:to/:date', component: FindTripComponent, resolve: {trips: FindTripResolver} },
	{ path: 'searchtrips/:from/:to/:date/:id', component: TripDetailsComponent, resolve: {trip: TripDetailResolver} },
	{ path: 'createtrip', component: CreateTripComponent }
]