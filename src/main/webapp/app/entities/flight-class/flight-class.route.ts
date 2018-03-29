import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FlightClassComponent } from './flight-class.component';
import { FlightClassDetailComponent } from './flight-class-detail.component';
import { FlightClassPopupComponent } from './flight-class-dialog.component';
import { FlightClassDeletePopupComponent } from './flight-class-delete-dialog.component';

export const flightClassRoute: Routes = [
    {
        path: 'flight-class',
        component: FlightClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightClasses'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'flight-class/:id',
        component: FlightClassDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightClasses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightClassPopupRoute: Routes = [
    {
        path: 'flight-class-new',
        component: FlightClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flight-class/:id/edit',
        component: FlightClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'flight-class/:id/delete',
        component: FlightClassDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightClasses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
