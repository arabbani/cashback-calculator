import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { FlightClassComponent } from './flight-class.component';

export const flightClassRoute: Route = {
    path: 'flight-class',
    component: FlightClassComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Flight Classes'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
