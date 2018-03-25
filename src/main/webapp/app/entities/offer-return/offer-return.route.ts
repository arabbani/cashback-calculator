import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OfferReturnComponent } from './offer-return.component';
import { OfferReturnDetailComponent } from './offer-return-detail.component';
import { OfferReturnPopupComponent } from './offer-return-dialog.component';
import { OfferReturnDeletePopupComponent } from './offer-return-delete-dialog.component';

export const offerReturnRoute: Routes = [
    {
        path: 'offer-return',
        component: OfferReturnComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferReturns'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer-return/:id',
        component: OfferReturnDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferReturns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerReturnPopupRoute: Routes = [
    {
        path: 'offer-return-new',
        component: OfferReturnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferReturns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-return/:id/edit',
        component: OfferReturnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferReturns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-return/:id/delete',
        component: OfferReturnDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OfferReturns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
