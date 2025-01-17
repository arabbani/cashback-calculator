import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { UserRouteAccessService } from '../shared';
import { CbclAffiliateCredentialModule } from './affiliate-credential/affiliate-credential.module';
import { CbclAffiliateModule } from './affiliate/affiliate.module';
import { CbclBankTypeModule } from './bank-type/bank-type.module';
import { CbclBankModule } from './bank/bank.module';
import { CbclBrandModule } from './brand/brand.module';
import { CbclCardProviderModule } from './card-provider/card-provider.module';
import { CbclCardTypeModule } from './card-type/card-type.module';
import { CbclCardModule } from './card/card.module';
import { CbclCategoryModule } from './category/category.module';
import { CbclCircleModule } from './circle/circle.module';
import { CbclCityModule } from './city/city.module';
import { CbclDateModule } from './date/date.module';
import { CbclDayModule } from './day/day.module';
import { EntityComponent } from './entity/entity.component';
import { CbclFlightClassModule } from './flight-class/flight-class.module';
import { CbclMerchantModule } from './merchant/merchant.module';
import { CbclOfferPolicyModule } from './offer-policy/offer-policy.module';
import { CbclOfferTypeModule } from './offer-type/offer-type.module';
import { CbclOfferModule } from './offer/offer.module';
import { CbclOperatingSystemTypeModule } from './operating-system-type/operating-system-type.module';
import { CbclOperatingSystemModule } from './operating-system/operating-system.module';
import { CbclRechargePlanTypeModule } from './recharge-plan-type/recharge-plan-type.module';
import { CbclRegionModule } from './region/region.module';
import { CbclReturnModeModule } from './return-mode/return-mode.module';
import { CbclReturnTypeModule } from './return-type/return-type.module';
import { CbclServiceProviderModule } from './service-provider/service-provider.module';
import { CbclStateModule } from './state/state.module';
import { CbclSubCategoryModule } from './sub-category/sub-category.module';
import { CbclTravelTypeModule } from './travel-type/travel-type.module';
import { CbclUserInfoModule } from './user-info/user-info.module';

@NgModule({
    imports: [
        CbclMerchantModule,
        CbclAffiliateCredentialModule,
        CbclAffiliateModule,
        CbclOperatingSystemTypeModule,
        CbclOperatingSystemModule,
        CbclStateModule,
        CbclCityModule,
        CbclOfferPolicyModule,
        CbclOfferTypeModule,
        CbclCategoryModule,
        CbclSubCategoryModule,
        CbclServiceProviderModule,
        CbclDateModule,
        CbclDayModule,
        CbclReturnTypeModule,
        CbclReturnModeModule,
        CbclCircleModule,
        CbclTravelTypeModule,
        CbclRegionModule,
        CbclBankTypeModule,
        CbclBankModule,
        CbclCardTypeModule,
        CbclCardModule,
        CbclRechargePlanTypeModule,
        CbclOfferModule,
        CbclUserInfoModule,
        CbclBrandModule,
        RouterModule.forChild([
            {
                path: 'entities',
                component: EntityComponent,
                data: {
                    authorities: ['ROLE_ADMIN'],
                    meta: {
                        title: 'Entities'
                    }
                },
                canActivate: [UserRouteAccessService, MetaGuard]
            }
        ]),
        CommonModule,
        CbclFlightClassModule,
        CbclCardProviderModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [EntityComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CbclEntityModule { }
