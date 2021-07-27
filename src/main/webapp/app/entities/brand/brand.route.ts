import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { BrandComponent } from './brand.component';

export const brandRoute: Route = {
    path: 'brand',
    component: BrandComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Brands'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
