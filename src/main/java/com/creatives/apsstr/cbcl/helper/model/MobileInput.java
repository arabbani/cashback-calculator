package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for MOBILE
 */
public class MobileInput extends CommonRechargeInput {

	private Long circleId;
	private Long rechargePlaneTypeId;

	public Long getCircleId() {
		return circleId;
	}

	public void setCircleId(Long circleId) {
		this.circleId = circleId;
	}

	public Long getRechargePlaneTypeId() {
		return rechargePlaneTypeId;
	}

	public void setRechargePlaneTypeId(Long rechargePlaneTypeId) {
		this.rechargePlaneTypeId = rechargePlaneTypeId;
	}

	@Override
	public String toString() {
		return "MobileInput [circleId=" + circleId + ", rechargePlaneTypeId=" + rechargePlaneTypeId
				+ ", getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()=" + getSubCategoryId()
				+ ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + ", getActiveDate()="
				+ getActiveDate() + ", getActiveDay()=" + getActiveDay() + "]";
	}

}
