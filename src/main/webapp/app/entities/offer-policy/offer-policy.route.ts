import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { OfferPolicyComponent } from './offer-policy.component';

export const offerPolicyRoute: Route = {
    path: 'offer-policy',
    component: OfferPolicyComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Offer Policies'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
