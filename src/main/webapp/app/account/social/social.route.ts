import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SocialRegisterComponent } from './social-register.component';

export const socialRegisterRoute: Route = {
    path: 'social-register/:provider?{success:boolean}',
    component: SocialRegisterComponent,
    data: {
        meta: {
            title: 'Register with {{ label }}'
        }
    },
    canActivate: [UserRouteAccessService]
};
