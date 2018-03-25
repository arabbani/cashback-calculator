package com.creatives.apsstr.cbcl.service;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.CashbackCalculatorAlgoVersionTwo;
import com.creatives.apsstr.cbcl.helper.model.BroadbandInput;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.DatacardInput;
import com.creatives.apsstr.cbcl.helper.model.DthInput;
import com.creatives.apsstr.cbcl.helper.model.ElectricityInput;
import com.creatives.apsstr.cbcl.helper.model.Expense;
import com.creatives.apsstr.cbcl.helper.model.GasInput;
import com.creatives.apsstr.cbcl.helper.model.LandlineInput;
import com.creatives.apsstr.cbcl.helper.model.MobileInput;
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
	// public List<CashbackInfo> calculateCashbackReechargeWithReechargeCondition(Long subCategoryId,
	// 		Long serviceProviderId, String dateTime, Long circleId, Long reechargePlaneTypeId, Expense expense) {
	// 	List<Offer> offers = offerRepository.findAllCashbackReechargeWithReechargeCondition(true, false, subCategoryId,
	// 			serviceProviderId, dateTime, circleId, reechargePlaneTypeId);
	// 	return this.cashbackCalculatorAlgo.calculate(offers, expense);
	// }

	/**
	 * Calculate cashback for dth, datacard, landline, broadband, electricity, gas
	 *
	 * @return the list of cashbackInfos
	 */
	// public List<CashbackInfo> calculateCashbackReecharge(Long subCategoryId, Long serviceProviderId, String dateTime,
	// 		Expense expense) {
	// 	List<Offer> offers = offerRepository.findAllCashbackReechargeCommon(true, false, subCategoryId,
	// 			serviceProviderId, dateTime);
	// 	return this.cashbackCalculatorAlgo.calculate(offers, expense);
	// }

}
