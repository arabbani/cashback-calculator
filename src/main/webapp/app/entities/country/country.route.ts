import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CountryComponent } from './country.component';

export const countryRoute: Route = {
    path: 'country',
    component: CountryComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Countries'
    },
    canActivate: [UserRouteAccessService]
};
