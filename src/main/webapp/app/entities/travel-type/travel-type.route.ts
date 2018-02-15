import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TravelTypeComponent } from './travel-type.component';
import { TravelTypeDetailComponent } from './travel-type-detail.component';
import { TravelTypePopupComponent } from './travel-type-dialog.component';
import { TravelTypeDeletePopupComponent } from './travel-type-delete-dialog.component';

export const travelTypeRoute: Routes = [
    {
        path: 'travel-type',
        component: TravelTypeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'travel-type/:id',
        component: TravelTypeDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const travelTypePopupRoute: Routes = [
    {
        path: 'travel-type-new',
        component: TravelTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'travel-type/:id/edit',
        component: TravelTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'travel-type/:id/delete',
        component: TravelTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
