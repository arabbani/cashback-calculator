import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CardProviderComponent } from './card-provider.component';
import { CardProviderDetailComponent } from './card-provider-detail.component';
import { CardProviderPopupComponent } from './card-provider-dialog.component';
import { CardProviderDeletePopupComponent } from './card-provider-delete-dialog.component';

export const cardProviderRoute: Routes = [
    {
        path: 'card-provider',
        component: CardProviderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardProviders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'card-provider/:id',
        component: CardProviderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardProviders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cardProviderPopupRoute: Routes = [
    {
        path: 'card-provider-new',
        component: CardProviderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardProviders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-provider/:id/edit',
        component: CardProviderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardProviders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'card-provider/:id/delete',
        component: CardProviderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CardProviders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
