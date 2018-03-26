import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FlightClassComponent } from './flight-class.component';

export const flightClassRoute: Route = {
    path: 'flight-class',
    component: FlightClassComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'FlightClasses'
    },
    canActivate: [UserRouteAccessService]
};
