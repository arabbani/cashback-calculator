import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ElectronicsInfoComponent } from './electronics-info.component';
import { ElectronicsInfoDetailComponent } from './electronics-info-detail.component';
import { ElectronicsInfoPopupComponent } from './electronics-info-dialog.component';
import { ElectronicsInfoDeletePopupComponent } from './electronics-info-delete-dialog.component';

export const electronicsInfoRoute: Routes = [
    {
        path: 'electronics-info',
        component: ElectronicsInfoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ElectronicsInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'electronics-info/:id',
        component: ElectronicsInfoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ElectronicsInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const electronicsInfoPopupRoute: Routes = [
    {
        path: 'electronics-info-new',
        component: ElectronicsInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ElectronicsInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'electronics-info/:id/edit',
        component: ElectronicsInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ElectronicsInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'electronics-info/:id/delete',
        component: ElectronicsInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ElectronicsInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
