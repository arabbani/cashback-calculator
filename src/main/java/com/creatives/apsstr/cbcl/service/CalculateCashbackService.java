package com.creatives.apsstr.cbcl.service;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.CashbackCalculatorAlgoVersionTwo;
import com.creatives.apsstr.cbcl.helper.model.BusInput;
import com.creatives.apsstr.cbcl.helper.model.CabInput;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.Expense;
import com.creatives.apsstr.cbcl.helper.model.FlightInput;
import com.creatives.apsstr.cbcl.repository.OfferRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Arif Rabbani
 *
 *         Implementation for cashback calculator algo
 */
@Service
@Transactional(readOnly = true)
public class CalculateCashbackService {

	private final Logger log = LoggerFactory.getLogger(CalculateCashbackService.class);

	private final OfferRepository offerRepository;
	private final CashbackCalculatorAlgoVersionTwo cashbackCalculatorAlgo;

	public CalculateCashbackService(OfferRepository offerRepository,
			CashbackCalculatorAlgoVersionTwo cashbackCalculatorAlgoVersionTwo) {
		this.offerRepository = offerRepository;
		this.cashbackCalculatorAlgo = cashbackCalculatorAlgoVersionTwo;
	}

	/**
	 * Calculate cashback for mobile, datacard
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackRechargeWithRechargeCondition(Long subCategoryId, Long serviceProviderId,
			String dateTime, Integer activeDate, String activeDay, Long circleId, Long rechargePlaneTypeId,
			Expense expense) {
		List<Offer> offers = offerRepository
				.findDistinctByActiveTrueAndDummyFalseAndSubCategories_IdAndActiveDatesIsNullOrActiveDates_DateAndActiveDaysIsNullOrActiveDays_DayAndServiceProviders_IdAndRechargeInfo_CirclesIsNullOrRechargeInfo_Circles_IdAndRechargeInfo_RechargePlanTypesIsNullOrRechargeInfo_RechargePlanTypes_Id(
						subCategoryId, activeDate, activeDay, serviceProviderId, circleId, rechargePlaneTypeId);
		// List<Offer> offers = offerRepository.cashbackRechargeWithRechargeCondition(true, false, subCategoryId, dateTime,
		// 		activeDate, activeDay, serviceProviderId, circleId, rechargePlaneTypeId);
		return this.cashbackCalculatorAlgo.calculate(offers, expense);
	}

	/**
	 * Calculate cashback for dth, landline, broadband, electricity, gas, metro, water
	 *
	 * @return the list of cashbackInfos
	 */
	// public List<CashbackInfo> calculateCashbackRecharge(Long subCategoryId, Long serviceProviderId, String dateTime,
	// 		Integer activeDate, String activeDay, Expense expense) {
	// 	List<Offer> offers = offerRepository.cashbackRechargeCommon(true, false, subCategoryId, dateTime, activeDate,
	// 			activeDay, serviceProviderId);
	// 	return this.cashbackCalculatorAlgo.calculate(offers, expense);
	// }

	/**
	 * Calculate cashback for flight
	 *
	 * @return the list of cashbackInfos
	 */
	// public List<CashbackInfo> calculateCashbackFlight(FlightInput flightInput) {
	// 	List<Offer> offers = offerRepository.cashbackFlight(true, false, flightInput.getSubCategoryId(),
	// 			flightInput.getDateTime(), flightInput.getActiveDate(), flightInput.getActiveDay(),
	// 			flightInput.getFlightClassId(), flightInput.getFlightTypeId(), flightInput.getFlightOriginId(),
	// 			flightInput.getTravelTypeId());
	// 	return this.cashbackCalculatorAlgo.calculate(offers, flightInput.getExpense());
	// }

	/**
	 * Calculate cashback for bus
	 *
	 * @return the list of cashbackInfos
	 */
	// public List<CashbackInfo> calculateCashbackBus(BusInput busInput) {
	// 	List<Offer> offers = offerRepository.cashbackBus(true, false, busInput.getSubCategoryId(),
	// 			busInput.getDateTime(), busInput.getActiveDate(), busInput.getActiveDay(), busInput.getFrom(),
	// 			busInput.getTo());
	// 	return this.cashbackCalculatorAlgo.calculate(offers, busInput.getExpense());
	// }

	/**
	 * Calculate cashback for cab
	 *
	 * @return the list of cashbackInfos
	 */
	// public List<CashbackInfo> calculateCashbackCab(CabInput cabInput) {
	// 	List<Offer> offers = offerRepository.cashbackCab(true, false, cabInput.getSubCategoryId(),
	// 			cabInput.getDateTime(), cabInput.getActiveDate(), cabInput.getActiveDay(),
	// 			cabInput.getServiceProvidersId(), cabInput.getCityId());
	// 	return this.cashbackCalculatorAlgo.calculate(offers, cabInput.getExpense());
	// }

}
