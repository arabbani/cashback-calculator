import { Route } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../../shared';
import { SubCategoryComponent } from './sub-category.component';

export const subCategoryRoute: Route = {
    path: 'sub-category',
    component: SubCategoryComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        meta: {
            title: 'Sub Categories'
        }
    },
    canActivate: [UserRouteAccessService, MetaGuard]
};
