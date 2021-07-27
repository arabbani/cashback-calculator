import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { BankTypeComponent } from './bank-type.component';

export const bankTypeRoute: Route = {
    path: 'bank-type',
    component: BankTypeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Bank Types'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
