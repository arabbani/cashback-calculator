package com.creatives.apsstr.cbcl.helper.constants;

/**
 * @author Arif Rabbani
 *
 */
public class OfferRepositoryConstants {

	public static final String SELF = "select distinct offer from Offer offer";

	/* ####################### RELATIONS ####################### */

	public static final String OPERATING_SYSTEMS = " left join fetch offer.operatingSystems operatingSystems";

	public static final String CITIES = " left join fetch offer.cities cities";

	public static final String STATES = " left join fetch offer.states states";

	public static final String SUB_CATEGORIES = " left join fetch offer.subCategories subCategories";

	public static final String SERVICE_PROVIDERS = " left join fetch offer.serviceProviders serviceProviders";

	public static final String ACTIVE_DATES = " left join fetch offer.activeDates";

	public static final String ACTIVE_DAYS = " left join fetch offer.activeDays";

	public static final String REECHERGE_INFO = " left join fetch offer.reechargeInfo reechargeInfo";

	public static final String TRAVEL_INFO = " left join fetch offer.travelInfo travelInfo";

	/* ####################### CHILD RELATIONNS ####################### */

	public static final String SERVICE_PROVIDERS_SUB_CATEGORIES = " left join fetch serviceProviders.subCategories serviceProviderSubCategories";

	public static final String REECHERGE_INFO_CIRCLES = " left join fetch reechargeInfo.circles reechargeInfoCircles";

	public static final String REECHERGE_INFO_REECHARGE_TYPES = " left join fetch reechargeInfo.reechargeTypes reechargeInfoReechargeTypes";

	public static final String TRAVEL_INFO_TYPES = " left join fetch travelInfo.types travelInfoTypes";

	public static final String TRAVEL_INFO_REGIONS = " left join fetch travelInfo.regions travelInfoRegions";

	public static final String TRAVEL_INFO_ORIGINS = " left join fetch travelInfo.origins travelInfoOrigins";

	/*
	 * ####################### CHILD RELATIONNS BY CATEGORY #######################
	 */

	public static final String REECHERGE_INFO_CHILDS = REECHERGE_INFO + REECHERGE_INFO_CIRCLES
			+ REECHERGE_INFO_REECHARGE_TYPES;

	public static final String TRAVEL_INFO_CHILDS = TRAVEL_INFO + TRAVEL_INFO_TYPES + TRAVEL_INFO_REGIONS
			+ TRAVEL_INFO_ORIGINS;

	public static final String SERVICE_PROVIDERS_CHILDS = SERVICE_PROVIDERS + SERVICE_PROVIDERS_SUB_CATEGORIES;

	/* ####################### SELECT ####################### */

	public static final String DEFAULT = SELF + OPERATING_SYSTEMS + CITIES + SUB_CATEGORIES + SERVICE_PROVIDERS
			+ ACTIVE_DATES + ACTIVE_DAYS;

	public static final String INFO = REECHERGE_INFO + TRAVEL_INFO;

	public static final String CHILD_RELATIONS = REECHERGE_INFO_CHILDS + TRAVEL_INFO_CHILDS
			+ SERVICE_PROVIDERS_SUB_CATEGORIES;

	/* ####################### CASHBACK SELECT ####################### */

	public static final String CASHBACK_SELECT_MOBILE = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_DTH = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_DATACARD = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_BROADBAND = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_LANDLINE = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_ELECTRICITY = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_GAS = DEFAULT + REECHERGE_INFO_CHILDS;

	/* ####################### CONDITIONS ####################### */

	public static final String WHERE_ID = " offer.id =:id";

	public static final String WHERE_ACTIVE = " offer.active=:active" + SharedRepositoryConstants.AND
			+ " offer.dummy=:dummy";

	public static final String WHERE_DATE_BOUND = " TIMESTAMP(:dateTime)" + SharedRepositoryConstants.BETWEEN
			+ " TIMESTAMP(offer.startDate)" + SharedRepositoryConstants.AND + " TIMESTAMP(offer.endDate)";

	public static final String WHERE_SUBCATEGORY = " subCategories.id =:subCategoryId";

	public static final String WHERE_SERVICE_PROVIDER = " serviceProviders.id =:serviceProviderId";

	public static final String WHERE_CITY = " cities.id =:cityId";

	/* ####################### CHILD CONDITIONS ####################### */

	public static final String WHERE_REECHARGE_INFO_CIRCLE = " reechargeInfoCircles.id =:circleId";

	public static final String WHERE_REECHARGE_INFO_REECHARGE_TYPE = " reechargeInfoReechargeTypes.id =:reechargeTypeId";

	/* ####################### CASHBACK CONDITIONS ####################### */

	public static final String CASHBACK_CONDITION_COMMON = WHERE_ACTIVE + SharedRepositoryConstants.AND
			+ WHERE_SUBCATEGORY + SharedRepositoryConstants.AND + WHERE_SERVICE_PROVIDER + SharedRepositoryConstants.AND
			+ WHERE_DATE_BOUND;

	public static final String CASHBACK_CONDITION_MOBILE = CASHBACK_CONDITION_COMMON + SharedRepositoryConstants.AND
			+ WHERE_REECHARGE_INFO_CIRCLE;
	//  + SharedRepositoryConstants.AND + WHERE_REECHARGE_INFO_REECHARGE_TYPE;

	public static final String CASHBACK_CONDITION_DTH = CASHBACK_CONDITION_COMMON;

	public static final String CASHBACK_CONDITION_DATACARD = CASHBACK_CONDITION_COMMON;

	public static final String CASHBACK_CONDITION_BROADBAND = CASHBACK_CONDITION_COMMON;

	public static final String CASHBACK_CONDITION_LANDLINE = CASHBACK_CONDITION_COMMON;

	public static final String CASHBACK_CONDITION_ELECTRICITY = CASHBACK_CONDITION_COMMON;

	public static final String CASHBACK_CONDITION_GAS = CASHBACK_CONDITION_COMMON;
	/*
	 * ####################### CASHBACK SELECT WITH CONDITIONS #######################
	 */
	public static final String CASHBACK_MOBILE = CASHBACK_SELECT_MOBILE + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_MOBILE;

	public static final String CASHBACK_DTH = CASHBACK_SELECT_DTH + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_DTH;

	public static final String CASHBACK_DATACARD = CASHBACK_SELECT_DATACARD + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_DATACARD;

	public static final String CASHBACK_BROADBAND = CASHBACK_SELECT_BROADBAND + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_BROADBAND;

	public static final String CASHBACK_LANDLINE = CASHBACK_SELECT_LANDLINE + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_LANDLINE;

	public static final String CASHBACK_ELECTRICITY = CASHBACK_SELECT_ELECTRICITY + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_ELECTRICITY;

	public static final String CASHBACK_GAS = CASHBACK_SELECT_GAS + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_GAS;

}
