import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReturnExtrasComponent } from './return-extras.component';
import { ReturnExtrasDetailComponent } from './return-extras-detail.component';
import { ReturnExtrasPopupComponent } from './return-extras-dialog.component';
import { ReturnExtrasDeletePopupComponent } from './return-extras-delete-dialog.component';

export const returnExtrasRoute: Routes = [
    {
        path: 'return-extras',
        component: ReturnExtrasComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnExtras'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'return-extras/:id',
        component: ReturnExtrasDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnExtras'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const returnExtrasPopupRoute: Routes = [
    {
        path: 'return-extras-new',
        component: ReturnExtrasPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-extras/:id/edit',
        component: ReturnExtrasPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-extras/:id/delete',
        component: ReturnExtrasDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnExtras'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
