import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BankTypeComponent } from './bank-type.component';
import { BankTypeDetailComponent } from './bank-type-detail.component';
import { BankTypePopupComponent } from './bank-type-dialog.component';
import { BankTypeDeletePopupComponent } from './bank-type-delete-dialog.component';

export const bankTypeRoute: Routes = [
    {
        path: 'bank-type',
        component: BankTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-type/:id',
        component: BankTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankTypePopupRoute: Routes = [
    {
        path: 'bank-type-new',
        component: BankTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-type/:id/edit',
        component: BankTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-type/:id/delete',
        component: BankTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BankTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
