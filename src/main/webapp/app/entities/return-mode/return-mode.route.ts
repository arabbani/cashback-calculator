import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReturnModeComponent } from './return-mode.component';
import { ReturnModeDetailComponent } from './return-mode-detail.component';
import { ReturnModePopupComponent } from './return-mode-dialog.component';
import { ReturnModeDeletePopupComponent } from './return-mode-delete-dialog.component';

export const returnModeRoute: Routes = [
    {
        path: 'return-mode',
        component: ReturnModeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnModes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'return-mode/:id',
        component: ReturnModeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnModes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const returnModePopupRoute: Routes = [
    {
        path: 'return-mode-new',
        component: ReturnModePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnModes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-mode/:id/edit',
        component: ReturnModePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnModes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'return-mode/:id/delete',
        component: ReturnModeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ReturnModes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
