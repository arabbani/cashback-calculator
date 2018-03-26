import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OperatingSystemComponent } from './operating-system.component';
import { OperatingSystemDetailComponent } from './operating-system-detail.component';
import { OperatingSystemPopupComponent } from './operating-system-dialog.component';
import { OperatingSystemDeletePopupComponent } from './operating-system-delete-dialog.component';

export const operatingSystemRoute: Routes = [
    {
        path: 'operating-system',
        component: OperatingSystemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystems'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'operating-system/:id',
        component: OperatingSystemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operatingSystemPopupRoute: Routes = [
    {
        path: 'operating-system-new',
        component: OperatingSystemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operating-system/:id/edit',
        component: OperatingSystemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operating-system/:id/delete',
        component: OperatingSystemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OperatingSystems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
