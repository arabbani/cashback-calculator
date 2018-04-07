package com.creatives.apsstr.cbcl.web.rest;

import java.util.List;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.domain.Offer;
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
import com.creatives.apsstr.cbcl.service.CashbackService;

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
public class CashbackResource {

	private final Logger log = LoggerFactory.getLogger(CashbackResource.class);

	private final CashbackService cashbackService;

	public CashbackResource(CashbackService cashbackService) {
		this.cashbackService = cashbackService;
	}

	/**
	 * POST /mobile : calculate cashback for mobile
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/mobile")
	@Timed
	public List<CashbackInfo> mobile(@RequestBody MobileInput mobileInput) {
		log.debug("REST request to calculate cashback for mobile : {} ", mobileInput);
		return cashbackService.rechargeWithRechargeCondition(mobileInput.getDateTime(), mobileInput.getActiveDate(),
				mobileInput.getActiveDay(), mobileInput.getExpense(), mobileInput.getSubCategoryId(),
				mobileInput.getServiceProviderId(), mobileInput.getCircleId(), mobileInput.getRechargePlaneTypeId());
	}

	/**
	 * POST /dth : calculate cashback for dth
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/dth")
	@Timed
	public List<CashbackInfo> dth(@RequestBody DthInput dthInput) {
		log.debug("REST request to calculate cashback for dth : {} ", dthInput);
		return cashbackService.recharge(dthInput.getDateTime(), dthInput.getActiveDate(), dthInput.getActiveDay(),
				dthInput.getExpense(), dthInput.getSubCategoryId(), dthInput.getServiceProviderId());
	}

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
	// 	return cashbackService.calculateCashbackRechargeWithRechargeCondition(
	// 			datacardInput.getSubCategoryId(), datacardInput.getServiceProviderId(), datacardInput.getDateTime(),
	// 			datacardInput.getActiveDate(), datacardInput.getActiveDay(), datacardInput.getCircleId(),
	// 			datacardInput.getRechargePlaneTypeId(), datacardInput.getExpense());
	// }

	/**
	 * POST /landline : calculate cashback for landline
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/landline")
	@Timed
	public List<CashbackInfo> landline(@RequestBody LandlineInput landlineInput) {
		log.debug("REST request to calculate cashback for landline : {} ", landlineInput);
		return cashbackService.recharge(landlineInput.getDateTime(), landlineInput.getActiveDate(),
				landlineInput.getActiveDay(), landlineInput.getExpense(), landlineInput.getSubCategoryId(),
				landlineInput.getServiceProviderId());
	}

	/**
	 * POST /broadband : calculate cashback for broadband
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/broadband")
	@Timed
	public List<CashbackInfo> broadband(@RequestBody BroadbandInput broadbandInput) {
		log.debug("REST request to calculate cashback for broadband : {} ", broadbandInput);
		return cashbackService.recharge(broadbandInput.getDateTime(), broadbandInput.getActiveDate(),
				broadbandInput.getActiveDay(), broadbandInput.getExpense(), broadbandInput.getSubCategoryId(),
				broadbandInput.getServiceProviderId());
	}

	/**
	 * POST /electricity : calculate cashback for electricity
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/electricity")
	@Timed
	public List<CashbackInfo> electricity(@RequestBody ElectricityInput electricityInput) {
		log.debug("REST request to calculate cashback for electricity : {} ", electricityInput);
		return cashbackService.recharge(electricityInput.getDateTime(), electricityInput.getActiveDate(),
				electricityInput.getActiveDay(), electricityInput.getExpense(), electricityInput.getSubCategoryId(),
				electricityInput.getServiceProviderId());
	}

	/**
	 * POST /gas : calculate cashback for gas
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/gas")
	@Timed
	public List<CashbackInfo> gas(@RequestBody GasInput gasInput) {
		log.debug("REST request to calculate cashback for gas : {} ", gasInput);
		return cashbackService.recharge(gasInput.getDateTime(), gasInput.getActiveDate(), gasInput.getActiveDay(),
				gasInput.getExpense(), gasInput.getSubCategoryId(), gasInput.getServiceProviderId());
	}

	/**
	 * POST /metro : calculate cashback for metro
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/metro")
	@Timed
	public List<CashbackInfo> metro(@RequestBody MetroInput metroInput) {
		log.debug("REST request to calculate cashback for metro : {} ", metroInput);
		return cashbackService.recharge(metroInput.getDateTime(), metroInput.getActiveDate(), metroInput.getActiveDay(),
				metroInput.getExpense(), metroInput.getSubCategoryId(), metroInput.getServiceProviderId());
	}

	/**
	 * POST /water : calculate cashback for water
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/water")
	@Timed
	public List<CashbackInfo> water(@RequestBody WaterInput waterInput) {
		log.debug("REST request to calculate cashback for water : {} ", waterInput);
		return cashbackService.recharge(waterInput.getDateTime(), waterInput.getActiveDate(), waterInput.getActiveDay(),
				waterInput.getExpense(), waterInput.getSubCategoryId(), waterInput.getServiceProviderId());
	}

	/**
	 * POST /flight : calculate cashback for flight
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/flight")
	@Timed
	public List<CashbackInfo> flight(@RequestBody FlightInput flightInput) {
		log.debug("REST request to calculate cashback for flight : {} ", flightInput);
		return cashbackService.flight(flightInput);
	}

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
	// 	return cashbackService.calculateCashbackBus(busInput);
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
	// 	return cashbackService.calculateCashbackCab(cabInput);
	// }

}
