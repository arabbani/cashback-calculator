package com.creatives.apsstr.cbcl.helper.model;

/**
 * @author Arif Rabbani
 * 
 *         Calculate cashback input model for DATACARD
 */
public class DatacardInput extends CommonRechargeInput {

	private Long circleId;
	private Long rechargePlaneTypeId;

	/**
	 * @return the circleId
	 */
	public Long getCircleId() {
		return circleId;
	}

	/**
	 * @param circleId
	 *            the circleId to set
	 */
	public void setCircleId(Long circleId) {
		this.circleId = circleId;
	}

	/**
	 * @return the rechargePlaneTypeId
	 */
	public Long getRechargePlaneTypeId() {
		return rechargePlaneTypeId;
	}

	/**
	 * @param rechargePlaneTypeId
	 *            the rechargePlaneTypeId to set
	 */
	public void setRechargePlaneTypeId(Long rechargePlaneTypeId) {
		this.rechargePlaneTypeId = rechargePlaneTypeId;
	}

	@Override
	public String toString() {
		return "DatacardInput [circleId=" + circleId + ", rechargePlaneTypeId=" + rechargePlaneTypeId
				+ ", getServiceProviderId()=" + getServiceProviderId() + ", getSubCategoryId()=" + getSubCategoryId()
				+ ", getDateTime()=" + getDateTime() + ", getExpense()=" + getExpense() + ", getActiveDate()="
				+ getActiveDate() + ", getActiveDay()=" + getActiveDay() + ", getMerchantIds()=" + getMerchantIds()
				+ "]";
	}

}
