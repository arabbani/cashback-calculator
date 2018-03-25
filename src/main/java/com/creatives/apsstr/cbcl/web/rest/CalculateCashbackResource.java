package com.creatives.apsstr.cbcl.web.rest;

import java.util.List;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.DatacardInput;
import com.creatives.apsstr.cbcl.helper.model.DthInput;
import com.creatives.apsstr.cbcl.helper.model.MobileInput;
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
		return calculateCashbackService.calculateCashbackForMobile(mobileInput);
	}

	/**
	 * POST /dth : calculate cashback for dth
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/dth")
	@Timed
	public List<CashbackInfo> calculateCashbackForDth(@RequestBody DthInput dthInput) {
		log.debug("REST request to calculate cashback for dth : {} ", dthInput);
		return calculateCashbackService.calculateCashbackForDth(dthInput);
	}

	/**
	 * POST /datacard : calculate cashback for datacard
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of
	 *         cashbackResults in body
	 */
	@PostMapping("/datacard")
	@Timed
	public List<CashbackInfo> calculateCashbackForDatacard(@RequestBody DatacardInput datacardInput) {
		log.debug("REST request to calculate cashback for datacard : {} ", datacardInput);
		return calculateCashbackService.calculateCashbackForDatacard(datacardInput);
	}

}
