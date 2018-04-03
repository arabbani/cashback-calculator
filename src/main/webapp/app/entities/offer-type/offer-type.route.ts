import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { OfferTypeComponent } from './offer-type.component';

export const offerTypeRoute: Route = {
    path: 'offer-type',
    component: OfferTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Offer Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
