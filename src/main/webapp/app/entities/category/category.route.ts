import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { CategoryComponent } from './category.component';

export const categoryRoute: Route = {
    path: 'category',
    component: CategoryComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Categories'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
