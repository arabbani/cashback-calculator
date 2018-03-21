import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OperatingSystemTypeComponent } from './operating-system-type.component';
import { OperatingSystemTypeDetailComponent } from './operating-system-type-detail.component';
import { OperatingSystemTypePopupComponent } from './operating-system-type-dialog.component';
import { OperatingSystemTypeDeletePopupComponent } from './operating-system-type-delete-dialog.component';

export const operatingSystemTypeRoute: Routes = [
    {
        path: 'operating-system-type',
        component: OperatingSystemTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystemTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'operating-system-type/:id',
        component: OperatingSystemTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystemTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operatingSystemTypePopupRoute: Routes = [
    {
        path: 'operating-system-type-new',
        component: OperatingSystemTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystemTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operating-system-type/:id/edit',
        component: OperatingSystemTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystemTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operating-system-type/:id/delete',
        component: OperatingSystemTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystemTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
