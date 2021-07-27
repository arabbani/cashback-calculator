import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { OfferAdminViewResolver } from './offer-admin-view-resolver.service';
import { OfferComponent } from './offer.component';
import { MetaGuard } from '@ngx-meta/core';

export const offerRoute: Routes = [
    {
        path: 'offers',
        component: OfferComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            meta: {
                title: 'Offers'
            }
        },
        canActivate: [UserRouteAccessService, MetaGuard]
    },
    {
        path: 'offer',
        component: CreateOfferComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            meta: {
                title: 'Offer'
            }
        },
        canActivate: [UserRouteAccessService, MetaGuard],
        resolve: {
            offer: OfferAdminViewResolver
        }
    }
];
