import {
    Affiliate,
    City,
    Date,
    Day,
    Merchant,
    OfferPolicy,
    OfferReturn,
    OfferType,
    OperatingSystem,
    ReechargeInfo,
    ServiceProvider,
    SubCategory,
    TravelInfo,
} from '..';
import { ElectronicsInfo } from '../electronics-info';

export class Offer {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public adminDescription?: string,
        public code?: string,
        public startDate?: any,
        public endDate?: any,
        public maximumUsesPerUser?: number,
        public maximumUsesPerDay?: number,
        public maximumUsesPerWeek?: number,
        public maximumUsesPerMonth?: number,
        public maximumUsesPerNumber?: number,
        public newUserOnly?: boolean,
        public appOnly?: boolean,
        public websiteOnly?: boolean,
        public numberOfUses?: number,
        public active?: boolean,
        public dummy?: boolean,
        public apsstrExclusive?: boolean,
        public url?: string,
        public travelInfo?: TravelInfo,
        public reechargeInfo?: ReechargeInfo,
        public electronicsInfo?: ElectronicsInfo,
        public offerReturns?: OfferReturn[],
        public policy?: OfferPolicy,
        public operatingSystems?: OperatingSystem[],
        public cities?: City[],
        public subCategories?: SubCategory[],
        public serviceProviders?: ServiceProvider[],
        public activeDates?: Date[],
        public activeDays?: Day[],
        public affiliate?: Affiliate,
        public merchant?: Merchant,
        public type?: OfferType,
    ) {
        this.newUserOnly = false;
        this.appOnly = false;
        this.websiteOnly = false;
        this.active = false;
        this.dummy = false;
        this.apsstrExclusive = false;
    }
}
