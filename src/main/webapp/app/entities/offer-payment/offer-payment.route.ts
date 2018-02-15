import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OfferPaymentComponent } from './offer-payment.component';
import { OfferPaymentDetailComponent } from './offer-payment-detail.component';
import { OfferPaymentPopupComponent } from './offer-payment-dialog.component';
import { OfferPaymentDeletePopupComponent } from './offer-payment-delete-dialog.component';

export const offerPaymentRoute: Routes = [
    {
        path: 'offer-payment',
        component: OfferPaymentComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPayments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'offer-payment/:id',
        component: OfferPaymentDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPayments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offerPaymentPopupRoute: Routes = [
    {
        path: 'offer-payment-new',
        component: OfferPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPayments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-payment/:id/edit',
        component: OfferPaymentPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPayments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'offer-payment/:id/delete',
        component: OfferPaymentDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'OfferPayments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
