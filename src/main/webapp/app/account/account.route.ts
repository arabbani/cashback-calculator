import { Routes } from '@angular/router';
import {
    activateRoute, passwordResetFinishRoute, passwordResetInitRoute, passwordRoute, registerRoute,
    sessionsRoute, settingsRoute, socialRegisterRoute
} from './';
import { profileRoute } from './profile';
import { MetaGuard } from '@ngx-meta/core';

const ACCOUNT_ROUTES = [
    activateRoute,
    passwordRoute,
    passwordResetFinishRoute,
    passwordResetInitRoute,
    registerRoute,
    sessionsRoute,
    socialRegisterRoute,
    settingsRoute,
    profileRoute
];

export const accountState: Routes = [{
    path: '',
    canActivateChild: [MetaGuard],
    children: ACCOUNT_ROUTES
}];
