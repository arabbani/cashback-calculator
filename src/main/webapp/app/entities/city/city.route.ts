import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CityComponent } from './city.component';
import { CityDetailComponent } from './city-detail.component';
import { CityPopupComponent } from './city-dialog.component';
import { CityDeletePopupComponent } from './city-delete-dialog.component';

export const cityRoute: Routes = [
    {
        path: 'city',
        component: CityComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'city/:id',
        component: CityDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityPopupRoute: Routes = [
    {
        path: 'city-new',
        component: CityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city/:id/edit',
        component: CityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city/:id/delete',
        component: CityDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Cities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
