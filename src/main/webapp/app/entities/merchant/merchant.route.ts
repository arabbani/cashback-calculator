import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { MerchantComponent } from './merchant.component';

export const merchantRoute: Route = {
    path: 'merchant',
    component: MerchantComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Merchants'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
