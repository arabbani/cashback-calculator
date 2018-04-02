package com.creatives.apsstr.cbcl.web.rest;

import java.util.List;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.helper.model.BroadbandInput;
import com.creatives.apsstr.cbcl.helper.model.BusInput;
import com.creatives.apsstr.cbcl.helper.model.CabInput;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.DatacardInput;
import com.creatives.apsstr.cbcl.helper.model.DthInput;
import com.creatives.apsstr.cbcl.helper.model.ElectricityInput;
import com.creatives.apsstr.cbcl.helper.model.FlightInput;
import com.creatives.apsstr.cbcl.helper.model.GasInput;
import com.creatives.apsstr.cbcl.helper.model.LandlineInput;
import com.creatives.apsstr.cbcl.helper.model.MetroInput;
import com.creatives.apsstr.cbcl.helper.model.MobileInput;
import com.creatives.apsstr.cbcl.helper.model.WaterInput;
import com.creatives.apsstr.cbcl.service.CalculateCashbackService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Arif Rabbani
 *
 *         Rest controller to calculate cashback
 */
@RestController
@RequestMapping("/api/cashback")
public class CalculateCashbackResource {

	private final Logger log = LoggerFactory.getLogger(CalculateCashbackResource.class);

	private final CalculateCashbackService calculateCashbackService;

	public CalculateCashbackResource(CalculateCashbackService calculateCashbackService) {
		this.calculateCashbackService = calculateCashbackService;
	}

	/**
	 * POST /mobile : calculate cashback for mobile
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/mobile")
	@Timed
	public List<CashbackInfo> calculateCashbackForMobile(@RequestBody MobileInput mobileInput) {
		log.debug("REST request to calculate cashback for mobile : {} ", mobileInput);
		return calculateCashbackService.calculateCashbackReechargeWithReechargeCondition(mobileInput.getSubCategoryId(),
				mobileInput.getServiceProviderId(), mobileInput.getDateTime(), mobileInput.getActiveDate(),
				mobileInput.getActiveDay(), mobileInput.getCircleId(), mobileInput.getReechargePlaneTypeId(),
				mobileInput.getExpense());
	}

	/**
	 * POST /dth : calculate cashback for dth
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/dth")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForDth(@RequestBody DthInput dthInput) {
	// 	log.debug("REST request to calculate cashback for dth : {} ", dthInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(dthInput.getSubCategoryId(),
	// 			dthInput.getServiceProviderId(), dthInput.getDateTime(), dthInput.getActiveDate(),
	// 			dthInput.getActiveDay(), dthInput.getExpense());
	// }

	/**
	 * POST /datacard : calculate cashback for datacard
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/datacard")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForDatacard(@RequestBody DatacardInput datacardInput) {
	// 	log.debug("REST request to calculate cashback for datacard : {} ", datacardInput);
	// 	return calculateCashbackService.calculateCashbackReechargeWithReechargeCondition(
	// 			datacardInput.getSubCategoryId(), datacardInput.getServiceProviderId(), datacardInput.getDateTime(),
	// 			datacardInput.getActiveDate(), datacardInput.getActiveDay(), datacardInput.getCircleId(),
	// 			datacardInput.getReechargePlaneTypeId(), datacardInput.getExpense());
	// }

	/**
	 * POST /landline : calculate cashback for landline
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/landline")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForLandline(@RequestBody LandlineInput landlineInput) {
	// 	log.debug("REST request to calculate cashback for landline : {} ", landlineInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(landlineInput.getSubCategoryId(),
	// 			landlineInput.getServiceProviderId(), landlineInput.getDateTime(), landlineInput.getActiveDate(),
	// 			landlineInput.getActiveDay(), landlineInput.getExpense());
	// }

	/**
	 * POST /broadband : calculate cashback for broadband
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/broadband")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForBroadband(@RequestBody BroadbandInput broadbandInput) {
	// 	log.debug("REST request to calculate cashback for broadband : {} ", broadbandInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(broadbandInput.getSubCategoryId(),
	// 			broadbandInput.getServiceProviderId(), broadbandInput.getDateTime(), broadbandInput.getActiveDate(),
	// 			broadbandInput.getActiveDay(), broadbandInput.getExpense());
	// }

	/**
	 * POST /electricity : calculate cashback for electricity
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/electricity")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForElectricity(@RequestBody ElectricityInput electricityInput) {
	// 	log.debug("REST request to calculate cashback for electricity : {} ", electricityInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(electricityInput.getSubCategoryId(),
	// 			electricityInput.getServiceProviderId(), electricityInput.getDateTime(),
	// 			electricityInput.getActiveDate(), electricityInput.getActiveDay(), electricityInput.getExpense());
	// }

	/**
	 * POST /gas : calculate cashback for gas
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/gas")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForGas(@RequestBody GasInput gasInput) {
	// 	log.debug("REST request to calculate cashback for gas : {} ", gasInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(gasInput.getSubCategoryId(),
	// 			gasInput.getServiceProviderId(), gasInput.getDateTime(), gasInput.getActiveDate(),
	// 			gasInput.getActiveDay(), gasInput.getExpense());
	// }

	/**
	 * POST /metro : calculate cashback for metro
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/metro")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForMetro(@RequestBody MetroInput metroInput) {
	// 	log.debug("REST request to calculate cashback for metro : {} ", metroInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(metroInput.getSubCategoryId(),
	// 			metroInput.getServiceProviderId(), metroInput.getDateTime(), metroInput.getActiveDate(),
	// 			metroInput.getActiveDay(), metroInput.getExpense());
	// }

	/**
	 * POST /water : calculate cashback for water
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/water")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForWater(@RequestBody WaterInput waterInput) {
	// 	log.debug("REST request to calculate cashback for water : {} ", waterInput);
	// 	return calculateCashbackService.calculateCashbackReecharge(waterInput.getSubCategoryId(),
	// 			waterInput.getServiceProviderId(), waterInput.getDateTime(), waterInput.getActiveDate(),
	// 			waterInput.getActiveDay(), waterInput.getExpense());
	// }

	/**
	 * POST /flight : calculate cashback for flight
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/flight")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForWater(@RequestBody FlightInput flightInput) {
	// 	log.debug("REST request to calculate cashback for flight : {} ", flightInput);
	// 	return calculateCashbackService.calculateCashbackFlight(flightInput);
	// }

	/**
	 * POST /bus : calculate cashback for bus
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/bus")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForBus(@RequestBody BusInput busInput) {
	// 	log.debug("REST request to calculate cashback for bus : {} ", busInput);
	// 	return calculateCashbackService.calculateCashbackBus(busInput);
	// }

	/**
	 * POST /cab : calculate cashback for cab
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	// @PostMapping("/cab")
	// @Timed
	// public List<CashbackInfo> calculateCashbackForCab(@RequestBody CabInput cabInput) {
	// 	log.debug("REST request to calculate cashback for cab : {} ", cabInput);
	// 	return calculateCashbackService.calculateCashbackCab(cabInput);
	// }

}
