import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { AffiliateComponent } from './affiliate.component';

export const affiliateRoute: Route = {
    path: 'affiliate',
    component: AffiliateComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Affiliates'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
