import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReechargeInfoComponent } from './reecharge-info.component';
import { ReechargeInfoDetailComponent } from './reecharge-info-detail.component';
import { ReechargeInfoPopupComponent } from './reecharge-info-dialog.component';
import { ReechargeInfoDeletePopupComponent } from './reecharge-info-delete-dialog.component';

export const reechargeInfoRoute: Routes = [
    {
        path: 'reecharge-info',
        component: ReechargeInfoComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargeInfos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reecharge-info/:id',
        component: ReechargeInfoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargeInfos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reechargeInfoPopupRoute: Routes = [
    {
        path: 'reecharge-info-new',
        component: ReechargeInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargeInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reecharge-info/:id/edit',
        component: ReechargeInfoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargeInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reecharge-info/:id/delete',
        component: ReechargeInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargeInfos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
