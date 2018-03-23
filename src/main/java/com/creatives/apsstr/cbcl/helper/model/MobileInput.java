package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for MOBILE
 */
public class MobileInput extends CommonInput {

	private Long circleId;

	public Long getCircleId() {
		return circleId;
	}

	public void setCircleId(Long circleId) {
		this.circleId = circleId;
	}

	@Override
	public String toString() {
		return "MobileInput [circleId=" + circleId + ", getSubCategoryId()=" + getSubCategoryId()
				+ ", getServiceProviderId()=" + getServiceProviderId() + ", getCityId()=" + getCityId()
				+ ", getDateTime()="
				+ getDateTime() + ", getExpense()=" + getExpense() + "]";
	}

}
