import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReturnInfoComponent } from './return-info.component';
import { ReturnInfoDetailComponent } from './return-info-detail.component';
import { ReturnInfoPopupComponent } from './return-info-dialog.component';
import { ReturnInfoDeletePopupComponent } from './return-info-delete-dialog.component';

export const returnInfoRoute: Routes = [
    {
        path: 'return-info',
        component: ReturnInfoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'return-info/:id',
        component: ReturnInfoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const returnInfoPopupRoute: Routes = [
    {
        path: 'return-info-new',
        component: ReturnInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-info/:id/edit',
        component: ReturnInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-info/:id/delete',
        component: ReturnInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReturnInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
