import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AffiliateComponent } from './affiliate.component';
import { AffiliateDetailComponent } from './affiliate-detail.component';
import { AffiliatePopupComponent } from './affiliate-dialog.component';
import { AffiliateDeletePopupComponent } from './affiliate-delete-dialog.component';

export const affiliateRoute: Routes = [
    {
        path: 'affiliate',
        component: AffiliateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Affiliates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'affiliate/:id',
        component: AffiliateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Affiliates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const affiliatePopupRoute: Routes = [
    {
        path: 'affiliate-new',
        component: AffiliatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Affiliates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'affiliate/:id/edit',
        component: AffiliatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Affiliates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'affiliate/:id/delete',
        component: AffiliateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Affiliates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
