import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DateComponent } from './date.component';
import { DateDetailComponent } from './date-detail.component';
import { DatePopupComponent } from './date-dialog.component';
import { DateDeletePopupComponent } from './date-delete-dialog.component';

export const dateRoute: Routes = [
    {
        path: 'date',
        component: DateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'date/:id',
        component: DateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datePopupRoute: Routes = [
    {
        path: 'date-new',
        component: DatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'date/:id/edit',
        component: DatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'date/:id/delete',
        component: DateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Dates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
