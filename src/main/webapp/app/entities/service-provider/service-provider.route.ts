import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceProviderComponent } from './service-provider.component';
import { ServiceProviderDetailComponent } from './service-provider-detail.component';
import { ServiceProviderPopupComponent } from './service-provider-dialog.component';
import { ServiceProviderDeletePopupComponent } from './service-provider-delete-dialog.component';

export const serviceProviderRoute: Routes = [
    {
        path: 'service-provider',
        component: ServiceProviderComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ServiceProviders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-provider/:id',
        component: ServiceProviderDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ServiceProviders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceProviderPopupRoute: Routes = [
    {
        path: 'service-provider-new',
        component: ServiceProviderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ServiceProviders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-provider/:id/edit',
        component: ServiceProviderPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ServiceProviders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-provider/:id/delete',
        component: ServiceProviderDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ServiceProviders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
