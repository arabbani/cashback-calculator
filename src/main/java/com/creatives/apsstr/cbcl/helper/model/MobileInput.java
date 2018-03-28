package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for MOBILE
 */
public class MobileInput extends CommonReechargeInput {

	private Long circleId;
	private Long reechargePlaneTypeId;

	public Long getCircleId() {
		return circleId;
	}

	public void setCircleId(Long circleId) {
		this.circleId = circleId;
	}

	public Long getReechargePlaneTypeId() {
		return reechargePlaneTypeId;
	}

	public void setReechargePlaneTypeId(Long reechargePlaneTypeId) {
		this.reechargePlaneTypeId = reechargePlaneTypeId;
	}

	@Override
	public String toString() {
		return "MobileInput [circleId=" + circleId + ", reechargePlaneTypeId=" + reechargePlaneTypeId
				+ ", getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()=" + getSubCategoryId()
				+ ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + ", getActiveDate()="
				+ getActiveDate() + ", getActiveDay()=" + getActiveDay() + "]";
	}

}
