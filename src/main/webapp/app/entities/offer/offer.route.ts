import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferResolver } from './offer-resolver.service';
import { OfferComponent } from './offer.component';

export const offerRoute: Routes = [
    {
        path: 'offers',
        component: OfferComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'offer',
        component: CreateOfferComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Offer'
        },
        canActivate: [UserRouteAccessService],
        resolve: {
            offer: OfferResolver
        }
    }
];

export const offerPopupRoute: Routes = [
    // {
    //     path: 'offer',
    //     component: CreateOfferComponent,
    //     data: {
    //         authorities: ['ROLE_ADMIN'],
    //         pageTitle: 'Offers'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
    // {
    //     path: 'offer/:id/?:edit',
    //     component: CreateOfferComponent,
    //     data: {
    //         authorities: ['ROLE_ADMIN'],
    //         pageTitle: 'Offers'
    //     },
    //     canActivate: [UserRouteAccessService]
    // },
];
