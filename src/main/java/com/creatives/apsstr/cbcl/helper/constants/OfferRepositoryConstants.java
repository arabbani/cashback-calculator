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

	public static final String SUB_CATEGORIES = " left join fetch offer.subCategories subCategories";

	public static final String SERVICE_PROVIDERS = " left join fetch offer.serviceProviders serviceProviders";

	public static final String ACTIVE_DATES = " left join fetch offer.activeDates";

	public static final String ACTIVE_DAYS = " left join fetch offer.activeDays";

	public static final String REECHERGE_INFO = " left join fetch offer.reechargeInfo reechargeInfo";

	public static final String TRAVEL_INFO = " left join fetch offer.travelInfo travelInfo";

	/* ####################### CHILD RELATIONNS ####################### */

	public static final String SERVICE_PROVIDER_SUB_CATEGORIES = " left join fetch serviceProviders.subCategories serviceProviderSubCategories";

	public static final String REECHERGE_INFO_CIRCLES = " left join fetch reechargeInfo.circles reechargeInfoCircles";

	public static final String REECHERGE_INFO_REECHARGE_TYPES = " left join fetch reechargeInfo.reechargePlanTypes reechargeInfoReechargeTypes";

	public static final String TRAVEL_INFO_TYPES = " left join fetch travelInfo.types travelInfoTypes";

	public static final String TRAVEL_INFO_FLIGHT = " left join fetch travelInfo.flightInfo flightInfo";

	public static final String TRAVEL_INFO_BUS = " left join fetch travelInfo.busInfo busInfo";

	public static final String FLIGHT_INFO_TYPES = " left join fetch flightInfo.types flightInfoTypes";

	public static final String FLIGHT_INFO_ORIGINS = " left join fetch flightInfo.origins flightInfoOrigins";

	public static final String FLIGHT_INFO_CLASS = " left join fetch flightInfo.travelClasses flightInfoClass";

	/*
	 * ####################### CHILD RELATIONNS BY CATEGORY #######################
	 */

	public static final String REECHERGE_INFO_CHILDS = REECHERGE_INFO + REECHERGE_INFO_CIRCLES
			+ REECHERGE_INFO_REECHARGE_TYPES;

	public static final String FLIGHT_INFO_CHILDS = TRAVEL_INFO_FLIGHT + FLIGHT_INFO_TYPES + FLIGHT_INFO_ORIGINS
			+ FLIGHT_INFO_CLASS;

	public static final String TRAVEL_INFO_CHILDS = TRAVEL_INFO + TRAVEL_INFO_TYPES;

	public static final String TRAVEL_INFO_NESTED_CHILDS = TRAVEL_INFO_CHILDS + FLIGHT_INFO_CHILDS + TRAVEL_INFO_BUS;

	/* ####################### SELECT ####################### */

	public static final String DEFAULT = SELF + OPERATING_SYSTEMS + CITIES + SUB_CATEGORIES + SERVICE_PROVIDERS
			+ ACTIVE_DATES + ACTIVE_DAYS;

	// public static final String INFO = REECHERGE_INFO + TRAVEL_INFO;

	public static final String CHILD_RELATIONS = REECHERGE_INFO_CHILDS + TRAVEL_INFO_NESTED_CHILDS
			+ SERVICE_PROVIDER_SUB_CATEGORIES;

	/* ####################### CASHBACK SELECT ####################### */

	public static final String CASHBACK_SELECT_REECHARGE = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String CASHBACK_SELECT_TRAVEL = DEFAULT + TRAVEL_INFO_CHILDS;

	public static final String CASHBACK_SELECT_FLIGHT = CASHBACK_SELECT_TRAVEL + FLIGHT_INFO_CHILDS;

	public static final String CASHBACK_SELECT_BUS = CASHBACK_SELECT_TRAVEL + TRAVEL_INFO_BUS;

	/* ####################### CONDITIONS ####################### */

	public static final String WHERE_ID = " offer.id =:id";

	public static final String WHERE_ACTIVE = " offer.active=:active" + SharedRepositoryConstants.AND
			+ " offer.dummy=:dummy";

	public static final String WHERE_DATE_BOUND = " TIMESTAMP(:dateTime)" + SharedRepositoryConstants.BETWEEN
			+ " TIMESTAMP(offer.startDate)" + SharedRepositoryConstants.AND + " TIMESTAMP(offer.endDate)";

	public static final String WHERE_SUBCATEGORY = " subCategories.id =:subCategoryId";

	public static final String WHERE_SERVICE_PROVIDER = " serviceProviders.id =:serviceProviderId";

	public static final String WHERE_CITY = " cities.id =:cityId";

	/*
	 * ####################### ADMIN #######################
	 */

	public static final String ADMIN_VIEW_SINGLE = DEFAULT + CHILD_RELATIONS + SharedRepositoryConstants.WHERE
			+ WHERE_ID;

	/* ####################### CHILD CONDITIONS ####################### */

	public static final String WHERE_REECHARGE_INFO_CIRCLE = " reechargeInfoCircles.id =:circleId";

	public static final String WHERE_REECHARGE_INFO_REECHARGE_TYPE = " reechargeInfoReechargeTypes.id =:reechargePlaneTypeId";

	public static final String WHERE_TRAVEL_INFO_TYPE = " travelInfoTypes.id =:travelInfoTypeId";

	public static final String WHERE_FLIGHT_INFO_TYPE = " flightInfoTypes.id =:flightInfoTypeId";

	public static final String WHERE_FLIGHT_INFO_CLASS = " flightInfoClass.id =:flightInfoClassId";

	public static final String WHERE_FLIGHT_INFO_ORIGINS = " flightInfoOrigins.id =:flightInfoOriginId";

	/* ####################### CASHBACK CONDITIONS ####################### */

	public static final String CASHBACK_CONDITION_COMMON = WHERE_ACTIVE + SharedRepositoryConstants.AND
			+ WHERE_SUBCATEGORY + SharedRepositoryConstants.AND + WHERE_DATE_BOUND;

	public static final String CASHBACK_CONDITION_REECHARGE_COMMON = CASHBACK_CONDITION_COMMON
			+ SharedRepositoryConstants.AND + WHERE_SERVICE_PROVIDER;

	public static final String CASHBACK_CONDITION_REECHARGE_CHILDS = WHERE_REECHARGE_INFO_CIRCLE
			+ SharedRepositoryConstants.AND + WHERE_REECHARGE_INFO_REECHARGE_TYPE;

	public static final String CASHBACK_CONDITION_FLIGHT = WHERE_TRAVEL_INFO_TYPE + SharedRepositoryConstants.AND
			+ WHERE_FLIGHT_INFO_TYPE + SharedRepositoryConstants.AND + WHERE_FLIGHT_INFO_CLASS;

	/*
	 * ####################### CASHBACK SELECT WITH CONDITIONS #######################
	 */

	public static final String CASHBACK_REECHARGE_COMMON = DEFAULT + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_REECHARGE_COMMON;

	public static final String CASHBACK_REECHARGE_WITH_CHILDS = CASHBACK_SELECT_REECHARGE
			+ SharedRepositoryConstants.WHERE + CASHBACK_CONDITION_REECHARGE_COMMON + SharedRepositoryConstants.AND
			+ CASHBACK_CONDITION_REECHARGE_CHILDS;

	public static final String CASHBACK_TRAVEL_DEFAULT = CASHBACK_SELECT_TRAVEL + SharedRepositoryConstants.WHERE
			+ WHERE_TRAVEL_INFO_TYPE;

	public static final String CASHBACK_TRAVEL_FLIGHT = CASHBACK_SELECT_FLIGHT + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_FLIGHT;

}
