import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

import { APP_CONFIG } from '..';

export function metaFactory(): MetaLoader {
    return new MetaStaticLoader({
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        pageTitleSeparator: ' - ',
        applicationName: APP_CONFIG.appName,
        applicationUrl: APP_CONFIG.appUrl,
        defaults: {
            title: 'Analyze Coupons',
            description: 'Analyze Coupons and Deals',
            'og:type': 'website',
            'og:locale': 'en_US',
            'og:site_name': APP_CONFIG.appName,
            // 'og:image': '
            'twitter:card': 'Summary',
            'twitter:title': 'Analyze Coupons',
            'twitter:description': 'Analyze Coupons and Deals',
            // 'twitter:image': '
        }
    });
}
