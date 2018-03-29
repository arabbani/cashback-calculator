import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FlightInfoComponent } from './flight-info.component';
import { FlightInfoDetailComponent } from './flight-info-detail.component';
import { FlightInfoPopupComponent } from './flight-info-dialog.component';
import { FlightInfoDeletePopupComponent } from './flight-info-delete-dialog.component';

export const flightInfoRoute: Routes = [
    {
        path: 'flight-info',
        component: FlightInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'flight-info/:id',
        component: FlightInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightInfoPopupRoute: Routes = [
    {
        path: 'flight-info-new',
        component: FlightInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flight-info/:id/edit',
        component: FlightInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flight-info/:id/delete',
        component: FlightInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
