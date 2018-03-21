import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SubCategoryComponent } from './sub-category.component';

export const subCategoryRoute: Route = {
    path: 'sub-category',
    component: SubCategoryComponent,
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'SubCategories'
    },
    canActivate: [UserRouteAccessService]
};
