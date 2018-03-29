import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BusInfoComponent } from './bus-info.component';
import { BusInfoDetailComponent } from './bus-info-detail.component';
import { BusInfoPopupComponent } from './bus-info-dialog.component';
import { BusInfoDeletePopupComponent } from './bus-info-delete-dialog.component';

export const busInfoRoute: Routes = [
    {
        path: 'bus-info',
        component: BusInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bus-info/:id',
        component: BusInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const busInfoPopupRoute: Routes = [
    {
        path: 'bus-info-new',
        component: BusInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bus-info/:id/edit',
        component: BusInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bus-info/:id/delete',
        component: BusInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BusInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
