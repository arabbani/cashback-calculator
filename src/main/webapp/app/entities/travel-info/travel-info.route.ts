import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TravelInfoComponent } from './travel-info.component';
import { TravelInfoDetailComponent } from './travel-info-detail.component';
import { TravelInfoPopupComponent } from './travel-info-dialog.component';
import { TravelInfoDeletePopupComponent } from './travel-info-delete-dialog.component';

export const travelInfoRoute: Routes = [
    {
        path: 'travel-info',
        component: TravelInfoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'travel-info/:id',
        component: TravelInfoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const travelInfoPopupRoute: Routes = [
    {
        path: 'travel-info-new',
        component: TravelInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'travel-info/:id/edit',
        component: TravelInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'travel-info/:id/delete',
        component: TravelInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TravelInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
