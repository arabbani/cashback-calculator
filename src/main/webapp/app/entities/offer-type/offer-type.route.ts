import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OfferTypeComponent } from './offer-type.component';
import { OfferTypeDetailComponent } from './offer-type-detail.component';
import { OfferTypePopupComponent } from './offer-type-dialog.component';
import { OfferTypeDeletePopupComponent } from './offer-type-delete-dialog.component';

export const offerTypeRoute: Routes = [
    {
        path: 'offer-type',
        component: OfferTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer-type/:id',
        component: OfferTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerTypePopupRoute: Routes = [
    {
        path: 'offer-type-new',
        component: OfferTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-type/:id/edit',
        component: OfferTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-type/:id/delete',
        component: OfferTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
