import { Routes } from '@angular/router';
import {
    activateRoute, passwordResetFinishRoute, passwordResetInitRoute, passwordRoute, registerRoute,
    sessionsRoute, settingsRoute, socialRegisterRoute
} from './';
import { profileRoute } from './profile';

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
    children: ACCOUNT_ROUTES
}];
