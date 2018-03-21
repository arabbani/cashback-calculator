package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 *
 *         Cashback data corresponding to OfferReturn
 */
public class Benefit {

	private Long offerReturnId;

	private Integer minimumReturn;

	private Integer maximumReturn;

	public Long getOfferReturnId() {
		return offerReturnId;
	}

	public void setOfferReturnId(Long offerReturnId) {
		this.offerReturnId = offerReturnId;
	}

	public Integer getMinimumReturn() {
		return minimumReturn;
	}

	public void setMinimumReturn(Integer minimumReturn) {
		this.minimumReturn = minimumReturn;
	}

	public Integer getMaximumReturn() {
		return maximumReturn;
	}

	public void setMaximumReturn(Integer maximumReturn) {
		this.maximumReturn = maximumReturn;
	}
}
