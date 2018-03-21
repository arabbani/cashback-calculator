import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardTypeComponent } from './card-type.component';
import { CardTypeDetailComponent } from './card-type-detail.component';
import { CardTypePopupComponent } from './card-type-dialog.component';
import { CardTypeDeletePopupComponent } from './card-type-delete-dialog.component';

export const cardTypeRoute: Routes = [
    {
        path: 'card-type',
        component: CardTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-type/:id',
        component: CardTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardTypePopupRoute: Routes = [
    {
        path: 'card-type-new',
        component: CardTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-type/:id/edit',
        component: CardTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-type/:id/delete',
        component: CardTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
