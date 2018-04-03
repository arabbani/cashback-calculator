import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import * as moment from 'moment';

import { APP_CONFIG } from '..';

export function metaFactory(): MetaLoader {
    const dateTime = moment();
    const applicationName = APP_CONFIG.appName;
    const title = 'Analyze Coupons';
    const description = `Find the best coupon, offer, deal, discount that matches your requirement without browsing through \
    the latest and special free discount coupons, deals and offers in India. \
    ${applicationName} will ensure you get the right promo codes and coupon codes for ${dateTime.year()}`;
    return new MetaStaticLoader({
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        pageTitleSeparator: ' - ',
        applicationName,
        applicationUrl: APP_CONFIG.appUrl,
        defaults: {
            title,
            description,
            'og:type': 'Website',
            'og:locale': 'en_US',
            'og:site_name': applicationName,
            // 'og:image': '
            'twitter:card': 'Summary',
            'twitter:title': title,
            'twitter:description': description,
            // 'twitter:image': '
        }
    });
}
