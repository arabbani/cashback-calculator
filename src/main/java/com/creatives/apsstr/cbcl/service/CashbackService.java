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
public class CashbackService {

	private final Logger log = LoggerFactory.getLogger(CashbackService.class);

	private final OfferRepository offerRepository;
	private final CashbackCalculatorAlgoVersionTwo cashbackCalculatorAlgo;

	public CashbackService(OfferRepository offerRepository,
			CashbackCalculatorAlgoVersionTwo cashbackCalculatorAlgoVersionTwo) {
		this.offerRepository = offerRepository;
		this.cashbackCalculatorAlgo = cashbackCalculatorAlgoVersionTwo;
	}

	/**
	 * Calculate cashback for mobile, datacard
	 *
	 * @return the list of cashbackInfos
	 */
	@Transactional(readOnly = true)
	public List<CashbackInfo> rechargeWithRechargeCondition(String dateTime, Integer activeDate, String activeDay,
			Expense expense, Long subCategoryId, Long serviceProviderId, Long circleId, Long rechargePlaneTypeId) {
		List<Offer> offers = offerRepository.cashbackRechargeWithRechargeCondition(true, false, dateTime, activeDate,
				activeDay, subCategoryId, serviceProviderId, circleId, rechargePlaneTypeId);
		return this.cashbackCalculatorAlgo.calculate(offers, expense);
	}

	/**
	 * Calculate cashback for dth, landline, broadband, electricity, gas, metro, water
	 *
	 * @return the list of cashbackInfos
	 */
	@Transactional(readOnly = true)
	public List<CashbackInfo> recharge(String dateTime, Integer activeDate, String activeDay, Expense expense,
			Long subCategoryId, Long serviceProviderId) {
		List<Offer> offers = offerRepository.cashbackRecharge(true, false, dateTime, activeDate, activeDay,
				subCategoryId, serviceProviderId);
		return this.cashbackCalculatorAlgo.calculate(offers, expense);
	}

	/**
	 * Calculate cashback for flight
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> flight(FlightInput flightInput) {
		List<Offer> offers = offerRepository.cashbackFlight(true, false, flightInput.getDateTime(),
				flightInput.getActiveDate(), flightInput.getActiveDay(), flightInput.getSubCategoryId(),
				flightInput.getTravelTypeId(), flightInput.getFlightTypeId(), flightInput.getFlightClassId(),
				flightInput.getFlightOriginId());
		return this.cashbackCalculatorAlgo.calculate(offers, flightInput.getExpense());
	}

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
