import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OfferPolicyComponent } from './offer-policy.component';
import { OfferPolicyDetailComponent } from './offer-policy-detail.component';
import { OfferPolicyPopupComponent } from './offer-policy-dialog.component';
import { OfferPolicyDeletePopupComponent } from './offer-policy-delete-dialog.component';

export const offerPolicyRoute: Routes = [
    {
        path: 'offer-policy',
        component: OfferPolicyComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPolicies'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer-policy/:id',
        component: OfferPolicyDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPolicies'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerPolicyPopupRoute: Routes = [
    {
        path: 'offer-policy-new',
        component: OfferPolicyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPolicies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-policy/:id/edit',
        component: OfferPolicyPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPolicies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-policy/:id/delete',
        component: OfferPolicyDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPolicies'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
