import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AffiliateCredentialComponent } from './affiliate-credential.component';

export const affiliateCredentialRoute: Route = {
    path: 'affiliate-credential',
    component: AffiliateCredentialComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'AffiliateCredentials'
    },
    canActivate: [UserRouteAccessService]
};
