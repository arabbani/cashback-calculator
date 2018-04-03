import { BaseEntity } from './../../shared';

export class Offer implements BaseEntity {
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
        public verified?: boolean,
        public dummy?: boolean,
        public apsstrExclusive?: boolean,
        public url?: string,
        public travelInfo?: BaseEntity,
        public rechargeInfo?: BaseEntity,
        public electronicsInfo?: BaseEntity,
        public offerReturns?: BaseEntity[],
        public policy?: BaseEntity,
        public operatingSystems?: BaseEntity[],
        public cities?: BaseEntity[],
        public subCategories?: BaseEntity[],
        public serviceProviders?: BaseEntity[],
        public activeDates?: BaseEntity[],
        public activeDays?: BaseEntity[],
        public affiliate?: BaseEntity,
        public merchant?: BaseEntity,
        public type?: BaseEntity,
    ) {
        this.newUserOnly = false;
        this.appOnly = false;
        this.websiteOnly = false;
        this.active = false;
        this.verified = false;
        this.dummy = false;
        this.apsstrExclusive = false;
    }
}
