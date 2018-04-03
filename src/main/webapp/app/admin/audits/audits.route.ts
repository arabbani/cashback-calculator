import { Route } from '@angular/router';

import { AuditsComponent } from './audits.component';

export const auditsRoute: Route = {
    path: 'audits',
    component: AuditsComponent,
    data: {
        meta: {
            title: 'Audits'
        }
    }
};
