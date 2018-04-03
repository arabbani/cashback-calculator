import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { BankComponent } from './bank.component';

export const bankRoute: Route = {
    path: 'bank',
    component: BankComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Banks'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
