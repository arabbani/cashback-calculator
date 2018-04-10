package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 *
 *         Cashback data corresponding to OfferReturn
 */
public class Benefit {

	private Long returnInfoId;

	private Integer minimum;

	private Integer maximum;

	public Long getReturnInfoId() {
		return returnInfoId;
	}

	public void setReturnInfoId(Long returnInfoId) {
		this.returnInfoId = returnInfoId;
	}

	public Integer getMinimum() {
		return minimum;
	}

	public void setMinimum(Integer minimum) {
		this.minimum = minimum;
	}

	public Integer getMaximum() {
		return maximum;
	}

	public void setMaximum(Integer maximum) {
		this.maximum = maximum;
	}
}
