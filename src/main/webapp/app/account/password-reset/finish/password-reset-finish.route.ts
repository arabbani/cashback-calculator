import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { PasswordResetFinishComponent } from './password-reset-finish.component';

export const passwordResetFinishRoute: Route = {
    path: 'reset/finish',
    component: PasswordResetFinishComponent,
    data: {
        meta: {
            title: 'Password'
        }
    },
    canActivate: [UserRouteAccessService]
};
