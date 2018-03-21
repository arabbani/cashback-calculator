package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 *
 *         Cashback data corresponding to OfferReturn
 */
public class Benefit {

	private Long returnInfoId;

	private Integer minimumReturn;

	private Integer maximumReturn;

	public Long getReturnInfoId() {
		return returnInfoId;
	}

	public void setReturnInfoId(Long returnInfoId) {
		this.returnInfoId = returnInfoId;
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
