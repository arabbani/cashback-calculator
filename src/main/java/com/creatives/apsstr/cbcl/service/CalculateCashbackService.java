package com.creatives.apsstr.cbcl.service;

import java.util.List;

import com.creatives.apsstr.cbcl.domain.Offer;
import com.creatives.apsstr.cbcl.helper.CashbackCalculatorAlgoVersionTwo;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.DatacardInput;
import com.creatives.apsstr.cbcl.helper.model.DthInput;
import com.creatives.apsstr.cbcl.helper.model.ElectricityInput;
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
	 * Calculate cashback for mobile
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackForMobile(MobileInput mobileInput) {
		log.debug("REST request to calculate cashback for mobile : {} ", mobileInput);
		List<Offer> offers = offerRepository.findAllToCalculateCashbackForMobile(true, false,
				mobileInput.getSubCategoryId(), mobileInput.getServiceProviderId(), mobileInput.getDateTime(),
				mobileInput.getCircleId(), mobileInput.getReechargePlaneTypeId());
		return this.cashbackCalculatorAlgo.calculate(offers, mobileInput.getExpense());
	}

	/**
	 * Calculate cashback for dth
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackForDth(DthInput dthInput) {
		log.debug("REST request to calculate cashback for dth : {} ", dthInput);
		List<Offer> offers = offerRepository.findAllToCalculateCashbackForDth(true, false, dthInput.getSubCategoryId(),
				dthInput.getServiceProviderId(), dthInput.getDateTime());
		return this.cashbackCalculatorAlgo.calculate(offers, dthInput.getExpense());
	}

	/**
	 * Calculate cashback for datacard
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackForDatacard(DatacardInput datacardInput) {
		log.debug("REST request to calculate cashback for datacard : {} ", datacardInput);
		List<Offer> offers = offerRepository.findAllToCalculateCashbackForDatacard(true, false,
				datacardInput.getSubCategoryId(), datacardInput.getServiceProviderId(), datacardInput.getDateTime(),
				datacardInput.getCircleId(), datacardInput.getReechargePlaneTypeId());
		return this.cashbackCalculatorAlgo.calculate(offers, datacardInput.getExpense());
	}

	/**
	 * Calculate cashback for landline
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackForLandline(LandlineInput landlineInput) {
		log.debug("REST request to calculate cashback for landline : {} ", landlineInput);
		List<Offer> offers = offerRepository.findAllToCalculateCashbackForLandline(true, false,
				landlineInput.getSubCategoryId(), landlineInput.getServiceProviderId(), landlineInput.getDateTime());
		return this.cashbackCalculatorAlgo.calculate(offers, landlineInput.getExpense());
	}

	/**
	 * Calculate cashback for electricity
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackForElectricity(ElectricityInput electricityInput) {
		log.debug("REST request to calculate cashback for electricity : {} ", electricityInput);
		List<Offer> offers = offerRepository.findAllToCalculateCashbackForElectricity(true, false,
				electricityInput.getSubCategoryId(), electricityInput.getServiceProviderId(),
				electricityInput.getDateTime());
		return this.cashbackCalculatorAlgo.calculate(offers, electricityInput.getExpense());
	}

	/**
	 * Calculate cashback for gas
	 *
	 * @return the list of cashbackInfos
	 */
	public List<CashbackInfo> calculateCashbackForGas(GasInput gasInput) {
		log.debug("REST request to calculate cashback for gas : {} ", gasInput);
		List<Offer> offers = offerRepository.findAllToCalculateCashbackForGas(true, false, gasInput.getSubCategoryId(),
				gasInput.getServiceProviderId(), gasInput.getDateTime());
		return this.cashbackCalculatorAlgo.calculate(offers, gasInput.getExpense());
	}

}
