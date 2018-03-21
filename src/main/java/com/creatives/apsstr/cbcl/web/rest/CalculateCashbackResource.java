package com.creatives.apsstr.cbcl.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.creatives.apsstr.cbcl.helper.model.CashbackInfo;
import com.creatives.apsstr.cbcl.helper.model.MobileInput;
import com.creatives.apsstr.cbcl.service.CalculateCashbackService;

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
	
}
