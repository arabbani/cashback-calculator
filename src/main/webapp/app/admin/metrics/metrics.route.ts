import { Route } from '@angular/router';

import { ApsstrMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'apsstr-metrics',
    component: ApsstrMetricsMonitoringComponent,
    data: {
        pageTitle: 'Application Metrics'
    }
};