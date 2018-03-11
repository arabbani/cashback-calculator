import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AffiliateCredentialComponent } from './affiliate-credential.component';
import { AffiliateCredentialDetailComponent } from './affiliate-credential-detail.component';
import { AffiliateCredentialPopupComponent } from './affiliate-credential-dialog.component';
import { AffiliateCredentialDeletePopupComponent } from './affiliate-credential-delete-dialog.component';

export const affiliateCredentialRoute: Routes = [
    {
        path: 'affiliate-credential',
        component: AffiliateCredentialComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AffiliateCredentials'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'affiliate-credential/:id',
        component: AffiliateCredentialDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AffiliateCredentials'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const affiliateCredentialPopupRoute: Routes = [
    {
        path: 'affiliate-credential-new',
        component: AffiliateCredentialPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AffiliateCredentials'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'affiliate-credential/:id/edit',
        component: AffiliateCredentialPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AffiliateCredentials'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'affiliate-credential/:id/delete',
        component: AffiliateCredentialDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AffiliateCredentials'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
