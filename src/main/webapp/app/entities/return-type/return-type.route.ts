import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReturnTypeComponent } from './return-type.component';
import { ReturnTypeDetailComponent } from './return-type-detail.component';
import { ReturnTypePopupComponent } from './return-type-dialog.component';
import { ReturnTypeDeletePopupComponent } from './return-type-delete-dialog.component';

export const returnTypeRoute: Routes = [
    {
        path: 'return-type',
        component: ReturnTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'return-type/:id',
        component: ReturnTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const returnTypePopupRoute: Routes = [
    {
        path: 'return-type-new',
        component: ReturnTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-type/:id/edit',
        component: ReturnTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-type/:id/delete',
        component: ReturnTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
