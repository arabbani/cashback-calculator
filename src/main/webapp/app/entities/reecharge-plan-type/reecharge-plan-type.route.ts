import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReechargePlanTypeComponent } from './reecharge-plan-type.component';
import { ReechargePlanTypeDetailComponent } from './reecharge-plan-type-detail.component';
import { ReechargePlanTypePopupComponent } from './reecharge-plan-type-dialog.component';
import { ReechargePlanTypeDeletePopupComponent } from './reecharge-plan-type-delete-dialog.component';

export const reechargePlanTypeRoute: Routes = [
    {
        path: 'reecharge-plan-type',
        component: ReechargePlanTypeComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargePlanTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reecharge-plan-type/:id',
        component: ReechargePlanTypeDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargePlanTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reechargePlanTypePopupRoute: Routes = [
    {
        path: 'reecharge-plan-type-new',
        component: ReechargePlanTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargePlanTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reecharge-plan-type/:id/edit',
        component: ReechargePlanTypePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargePlanTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reecharge-plan-type/:id/delete',
        component: ReechargePlanTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ReechargePlanTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
