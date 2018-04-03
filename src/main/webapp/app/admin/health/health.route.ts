import { Route } from '@angular/router';

import { ApsstrHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'apsstr-health',
    component: ApsstrHealthCheckComponent,
    data: {
        meta: {
            title: 'Health Checks'
        }
    }
};
