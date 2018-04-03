import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { AffiliateCredentialComponent } from './affiliate-credential.component';

export const affiliateCredentialRoute: Route = {
    path: 'affiliate-credential',
    component: AffiliateCredentialComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Affiliate Credentials'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
