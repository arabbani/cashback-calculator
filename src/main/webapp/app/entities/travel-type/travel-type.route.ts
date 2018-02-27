import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TravelTypeComponent } from './travel-type.component';

export const travelTypeRoute: Route = {
    path: 'travel-type',
    component: TravelTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'TravelTypes'
    },
    canActivate: [UserRouteAccessService]
};
