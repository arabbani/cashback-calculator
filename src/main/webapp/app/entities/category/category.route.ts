import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CategoryComponent } from './category.component';

export const categoryRoute: Route = {
    path: 'category',
    component: CategoryComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Categories'
    },
    canActivate: [UserRouteAccessService]
};
