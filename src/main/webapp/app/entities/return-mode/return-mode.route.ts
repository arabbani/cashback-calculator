import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { ReturnModeComponent } from './return-mode.component';

export const returnModeRoute: Route =  {
    path: 'return-mode',
    component: ReturnModeComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Return Modes'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
