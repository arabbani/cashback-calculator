import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OfferTypeComponent } from './offer-type.component';

export const offerTypeRoute: Route = {
    path: 'offer-type',
    component: OfferTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'OfferTypes'
    },
    canActivate: [UserRouteAccessService]
};
