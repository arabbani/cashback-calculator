import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MainReturnComponent } from './main-return.component';
import { MainReturnDetailComponent } from './main-return-detail.component';
import { MainReturnPopupComponent } from './main-return-dialog.component';
import { MainReturnDeletePopupComponent } from './main-return-delete-dialog.component';

export const mainReturnRoute: Routes = [
    {
        path: 'main-return',
        component: MainReturnComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'MainReturns'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'main-return/:id',
        component: MainReturnDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'MainReturns'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mainReturnPopupRoute: Routes = [
    {
        path: 'main-return-new',
        component: MainReturnPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'MainReturns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-return/:id/edit',
        component: MainReturnPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'MainReturns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'main-return/:id/delete',
        component: MainReturnDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'MainReturns'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
