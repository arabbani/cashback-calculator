import { Route } from '@angular/router';

import { ApsstrConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'apsstr-configuration',
    component: ApsstrConfigurationComponent,
    data: {
        meta: {
            title: 'Configuration'
        }
    }
};
