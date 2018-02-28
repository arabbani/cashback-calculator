import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferDeletePopupComponent } from './offer-delete-dialog.component';
import { OfferDetailComponent } from './offer-detail.component';
import { OfferPopupComponent } from './offer-dialog.component';
import { OfferComponent } from './offer.component';

export const offerRoute: Routes = [
    {
        path: 'offer',
        component: OfferComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer/:id',
        component: OfferDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerPopupRoute: Routes = [
    {
        path: 'offer-new',
        component: CreateOfferComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offer/:id/edit',
        component: OfferPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offer/:id/delete',
        component: OfferDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
