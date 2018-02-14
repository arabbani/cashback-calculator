import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CircleComponent } from './circle.component';
import { CircleDetailComponent } from './circle-detail.component';
import { CirclePopupComponent } from './circle-dialog.component';
import { CircleDeletePopupComponent } from './circle-delete-dialog.component';

export const circleRoute: Routes = [
    {
        path: 'circle',
        component: CircleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Circles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'circle/:id',
        component: CircleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Circles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const circlePopupRoute: Routes = [
    {
        path: 'circle-new',
        component: CirclePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Circles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'circle/:id/edit',
        component: CirclePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Circles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'circle/:id/delete',
        component: CircleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Circles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
