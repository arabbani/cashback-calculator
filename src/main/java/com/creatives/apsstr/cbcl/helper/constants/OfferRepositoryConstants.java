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

	public static final String ACTIVE_DATES = " left join fetch offer.activeDates activeDates";

	public static final String ACTIVE_DAYS = " left join fetch offer.activeDays activeDays";

	public static final String REECHERGE_INFO = " left join fetch offer.rechargeInfo rechargeInfo";

	public static final String TRAVEL_INFO = " left join fetch offer.travelInfo travelInfo";

	public static final String OFFER_RETURNS = " left join fetch offer.offerReturns offerReturns";

	/* ####################### CHILD RELATIONNS ####################### */

	public static final String SERVICE_PROVIDER_SUB_CATEGORIES = " left join fetch serviceProviders.subCategories serviceProviderSubCategories";

	public static final String REECHERGE_INFO_CIRCLES = " left join fetch rechargeInfo.circles rechargeInfoCircles";

	public static final String REECHERGE_INFO_RECHARGE_TYPES = " left join fetch rechargeInfo.rechargePlanTypes rechargeInfoRechargeTypes";

	public static final String TRAVEL_INFO_TYPES = " left join fetch travelInfo.types travelInfoTypes";

	public static final String TRAVEL_INFO_FLIGHT = " left join fetch travelInfo.flightInfo flightInfo";

	public static final String TRAVEL_INFO_BUS = " left join fetch travelInfo.busInfo busInfo";

	public static final String FLIGHT_INFO_TYPES = " left join fetch flightInfo.types flightInfoTypes";

	public static final String FLIGHT_INFO_ORIGINS = " left join fetch flightInfo.origins flightInfoOrigins";

	public static final String FLIGHT_INFO_CLASS = " left join fetch flightInfo.travelClasses flightInfoClasses";

	public static final String BUS_INFO_FROMS = " left join fetch busInfo.froms busInfoFroms";

	public static final String BUS_INFO_TOS = " left join fetch busInfo.tos busInfoTos";

	/*
	 * ####################### CHILD RELATIONNS BY CATEGORY #######################
	 */

	public static final String REECHERGE_INFO_CHILDS = REECHERGE_INFO + REECHERGE_INFO_CIRCLES
			+ REECHERGE_INFO_RECHARGE_TYPES;

	public static final String TRAVEL_INFO_CHILDS = TRAVEL_INFO + TRAVEL_INFO_TYPES;

	public static final String FLIGHT_INFO_CHILDS = TRAVEL_INFO_FLIGHT + FLIGHT_INFO_TYPES + FLIGHT_INFO_ORIGINS
			+ FLIGHT_INFO_CLASS;

	public static final String BUS_INFO_CHILDS = TRAVEL_INFO_BUS + BUS_INFO_FROMS + BUS_INFO_TOS;

	public static final String TRAVEL_INFO_NESTED_CHILDS = TRAVEL_INFO_CHILDS + FLIGHT_INFO_CHILDS + BUS_INFO_CHILDS;

	/* ####################### SELECT ####################### */

	public static final String DEFAULT = SELF + OPERATING_SYSTEMS + CITIES + SUB_CATEGORIES + SERVICE_PROVIDERS
			+ ACTIVE_DATES + ACTIVE_DAYS;

	public static final String CHILD_RELATIONS = REECHERGE_INFO_CHILDS + TRAVEL_INFO_NESTED_CHILDS
			+ SERVICE_PROVIDER_SUB_CATEGORIES;

	/* ####################### CASHBACK SELECT ####################### */

	public static final String SELECT_RECHARGE = DEFAULT + REECHERGE_INFO_CHILDS;

	public static final String SELECT_TRAVEL = DEFAULT + TRAVEL_INFO_CHILDS;

	public static final String SELECT_FLIGHT = SELECT_TRAVEL + FLIGHT_INFO_CHILDS;

	public static final String SELECT_BUS = SELECT_TRAVEL + BUS_INFO_CHILDS;

	/* ####################### CONDITIONS ####################### */

	public static final String WHERE_ID = " offer.id =:id";

	public static final String WHERE_ACTIVE = " offer.active=:active" + SharedRepositoryConstants.AND
			+ " offer.dummy=:dummy";

	public static final String WHERE_DATE_BOUND = " TIMESTAMP(:dateTime)" + SharedRepositoryConstants.BETWEEN
			+ " TIMESTAMP(offer.startDate)" + SharedRepositoryConstants.AND + " TIMESTAMP(offer.endDate)";

	public static final String WHERE_ACTIVE_DATE = " activeDates IS NULL OR activeDates.date =:activeDate";

	public static final String WHERE_ACTIVE_DAY = " activeDays IS NULL OR activeDays.day =:activeDay";

	public static final String WHERE_SUBCATEGORY = " subCategories.id =:subCategoryId";

	public static final String WHERE_SERVICE_PROVIDER = " serviceProviders.id =:serviceProviderId";

	public static final String WHERE_SERVICE_PROVIDERS = " serviceProviders.id IN (:serviceProvidersId)";

	public static final String WHERE_CITY = " cities IS NULL OR cities.id =:cityId";

	/*
	 * ####################### ADMIN #######################
	 */

	public static final String ADMIN_VIEW_SINGLE = DEFAULT + CHILD_RELATIONS + SharedRepositoryConstants.WHERE
			+ WHERE_ID;

	/* ####################### CHILD CONDITIONS ####################### */

	public static final String WHERE_RECHARGE_INFO_CIRCLE = " rechargeInfoCircles IS NULL OR rechargeInfoCircles.id =:circleId";

	public static final String WHERE_RECHARGE_INFO_RECHARGE_TYPE = " rechargeInfoRechargeTypes.id =:rechargePlaneTypeId";

	public static final String WHERE_TRAVEL_INFO_TYPE = " travelInfoTypes.id =:travelTypeId";

	public static final String WHERE_FLIGHT_INFO_TYPE = " flightInfoTypes.id =:flightTypeId";

	public static final String WHERE_FLIGHT_INFO_CLASS = " flightInfoClasses.id =:flightClassId";

	public static final String WHERE_FLIGHT_INFO_ORIGINS = " flightInfoOrigins.id =:flightOriginId";

	public static final String WHERE_BUS_INFO_FROM = " busInfoFroms.id =:from";

	public static final String WHERE_BUS_INFO_TO = " busInfoTos.id =:to";

	/* ####################### CASHBACK CONDITIONS ####################### */

	public static final String CASHBACK_CONDITION_COMMON = WHERE_ACTIVE + SharedRepositoryConstants.AND
			+ WHERE_SUBCATEGORY + SharedRepositoryConstants.AND + WHERE_DATE_BOUND + SharedRepositoryConstants.AND
			+ WHERE_ACTIVE_DATE + SharedRepositoryConstants.AND + WHERE_ACTIVE_DAY;

	public static final String CONDITION_RECHARGE_COMMON = CASHBACK_CONDITION_COMMON;
	// +SharedRepositoryConstants.AND+WHERE_SERVICE_PROVIDER;

	public static final String CONDITION_RECHARGE_CHILDS = WHERE_RECHARGE_INFO_CIRCLE + SharedRepositoryConstants.AND
			+ WHERE_RECHARGE_INFO_RECHARGE_TYPE;

	public static final String CONDITION_FLIGHT = CASHBACK_CONDITION_COMMON + SharedRepositoryConstants.AND
			+ WHERE_TRAVEL_INFO_TYPE + SharedRepositoryConstants.AND + WHERE_FLIGHT_INFO_TYPE
			+ SharedRepositoryConstants.AND + WHERE_FLIGHT_INFO_CLASS + SharedRepositoryConstants.AND
			+ WHERE_FLIGHT_INFO_ORIGINS;

	public static final String CONDITION_BUS = CASHBACK_CONDITION_COMMON + SharedRepositoryConstants.AND
			+ WHERE_BUS_INFO_FROM + SharedRepositoryConstants.AND + WHERE_BUS_INFO_TO;

	public static final String CONDITION_CAB = CASHBACK_CONDITION_COMMON + SharedRepositoryConstants.AND
			+ WHERE_SERVICE_PROVIDERS + SharedRepositoryConstants.AND + WHERE_CITY;

	/*
	 * ####################### CASHBACK SELECT WITH CONDITIONS #######################
	 */

	public static final String CASHBACK_RECHARGE = DEFAULT + OFFER_RETURNS + SharedRepositoryConstants.WHERE
			+ CONDITION_RECHARGE_COMMON;

	public static final String CASHBACK_RECHARGE_WITH_CHILDS = SELECT_RECHARGE + OFFER_RETURNS
			+ SharedRepositoryConstants.WHERE + CONDITION_RECHARGE_COMMON + SharedRepositoryConstants.AND
			+ CONDITION_RECHARGE_CHILDS;

	public static final String CASHBACK_TRAVEL_DEFAULT = SELECT_TRAVEL + SharedRepositoryConstants.WHERE
			+ CASHBACK_CONDITION_COMMON + SharedRepositoryConstants.AND + WHERE_TRAVEL_INFO_TYPE;

	public static final String CASHBACK_FLIGHT = SELECT_FLIGHT + SharedRepositoryConstants.WHERE + CONDITION_FLIGHT;

	public static final String CASHBACK_BUS = SELECT_BUS + SharedRepositoryConstants.WHERE + CONDITION_BUS;

	public static final String CASHBACK_CAB = DEFAULT + SharedRepositoryConstants.WHERE + CONDITION_CAB;

}
