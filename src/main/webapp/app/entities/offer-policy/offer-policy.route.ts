import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OfferPolicyComponent } from './offer-policy.component';

export const offerPolicyRoute: Route = {
    path: 'offer-policy',
    component: OfferPolicyComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'OfferPolicies'
    },
    canActivate: [UserRouteAccessService]
};
