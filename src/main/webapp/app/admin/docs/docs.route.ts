import { Route } from '@angular/router';

import { ApsstrDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: ApsstrDocsComponent,
    data: {
        meta: {
            title: 'API'
        }
    }
};
