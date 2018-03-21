import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CityComponent } from './city.component';

export const cityRoute: Route = {
    path: 'city',
    component: CityComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Cities'
    },
    canActivate: [UserRouteAccessService]
};
