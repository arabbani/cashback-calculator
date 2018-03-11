import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DayComponent } from './day.component';
import { DayDetailComponent } from './day-detail.component';
import { DayPopupComponent } from './day-dialog.component';
import { DayDeletePopupComponent } from './day-delete-dialog.component';

export const dayRoute: Routes = [
    {
        path: 'day',
        component: DayComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Days'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'day/:id',
        component: DayDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Days'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dayPopupRoute: Routes = [
    {
        path: 'day-new',
        component: DayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Days'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'day/:id/edit',
        component: DayPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Days'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'day/:id/delete',
        component: DayDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Days'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
