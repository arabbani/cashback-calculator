import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AffiliateComponent } from './affiliate.component';

export const affiliateRoute: Route = {
    path: 'affiliate',
    component: AffiliateComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Affiliates'
    },
    canActivate: [UserRouteAccessService]
};
