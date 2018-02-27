import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BrandComponent } from './brand.component';

export const brandRoute: Route = {
    path: 'brand',
    component: BrandComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Brands'
    },
    canActivate: [UserRouteAccessService]
};
